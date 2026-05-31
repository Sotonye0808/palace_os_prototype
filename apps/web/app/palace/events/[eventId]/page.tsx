'use client';

import { Image } from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { useBrand } from '@/lib/contexts/BrandContext';
import { usePaystack } from '@/lib/payments/hooks/usePaystack';
import { useLoyaltyStore } from '@/lib/loyalty/store';
import { useWaitlist } from '@/lib/hooks/useWaitlist';
import { useGuestList } from '@/lib/hooks/useGuestList';
import { useState } from 'react';
import { getEventJsonLd } from '@/lib/seo';
import JsonLd from '@/components/shared/seo/JsonLd';

// Types (same as in events page for now, will be replaced with config-driven data)
interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  time: string;
  image: string;
  location: string;
  price: number;
  isAvailable: boolean;
  ticketTypes: {
    id: string;
    name: string;
    price: number;
    description?: string;
    availableQuantity: number;
    maxPerPerson: number;
  }[];
}

interface EventCategory {
  id: string;
  name: string;
  events: Event[];
}

// Mock event data (same as in events page)
const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Lagos Jazz Night',
    description: 'An evening of smooth jazz featuring top Nigerian and international artists.',
    date: '2026-06-15',
    time: '20:00',
    image: '/images/events/jazz-night.jpg',
    location: 'Secrets Palace Main Hall',
    price: 5000,
    isAvailable: true,
    ticketTypes: [
      {
        id: 'standard',
        name: 'Standard Ticket',
        price: 5000,
        description: 'Access to main hall and performance',
        availableQuantity: 100,
        maxPerPerson: 4
      },
      {
        id: 'vip',
        name: 'VIP Ticket',
        price: 8000,
        description: 'Premium seating, complimentary drink, and meet & greet',
        availableQuantity: 20,
        maxPerPerson: 2
      }
    ]
  },
  {
    id: 'event-2',
    title: 'Afrobeat Fusion',
    description: 'A night of energetic Afrobeat with live band and DJ performances.',
    date: '2026-06-22',
    time: '21:00',
    image: '/images/events/afrobeat.jpg',
    location: 'Secrets Palace Terrace',
    price: 4000,
    isAvailable: true,
    ticketTypes: [
      {
        id: 'general',
        name: 'General Admission',
        price: 4000,
        description: 'Access to terrace and performance',
        availableQuantity: 150,
        maxPerPerson: 6
      },
      {
        id: 'vip',
        name: 'VIP Ticket',
        price: 7000,
        description: 'Premium seating, complimentary bottle service, and backstage access',
        availableQuantity: 30,
        maxPerPerson: 3
      }
    ]
  },
  {
    id: 'event-3',
    title: 'Comedy Night Live',
    description: 'Laugh till you drop with Nigeria\'s top comedians.',
    date: '2026-06-29',
    time: '20:30',
    image: '/images/events/comedy-night.jpg',
    location: 'Secrets Palace Main Hall',
    price: 3000,
    isAvailable: true,
    ticketTypes: [
      {
        id: 'standard',
        name: 'Standard Ticket',
        price: 3000,
        description: 'Access to main hall and comedy show',
        availableQuantity: 200,
        maxPerPerson: 6
      }
    ]
  },
  {
    id: 'event-4',
    title: 'Silk & Soul',
    description: 'An intimate evening of soul music and R&B.',
    date: '2026-07-06',
    time: '20:00',
    image: '/images/events/silk-soul.jpg',
    location: 'Secrets Palace Lounge',
    price: 4500,
    isAvailable: false,
    ticketTypes: [
      {
        id: 'standard',
        name: 'Standard Ticket',
        price: 4500,
        description: 'Access to lounge and performance',
        availableQuantity: 0,
        maxPerPerson: 4
      }
    ]
  }
];

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const router = useRouter();
  const { brandId } = useBrand();
  const { initializeTransaction, isLoading: isPaymentLoading } = usePaystack();
  
  // Find event by ID
  const event = mockEvents.find(e => e.id === eventId);
  
  if (!event) {
    router.replace('/events');
    return null;
  }
  
  // Generate JSON-LD for event
  const eventJsonLd = getEventJsonLd({
    id: event.id,
    name: event.title,
    description: event.description,
    image: event.image,
    startDate: `${event.date}T${event.time}:00+01:00`, // Assuming WAT timezone
    endDate: `${event.date}T${event.time}:00+01:00`, // Simplified - in reality would calculate duration
    location: event.location,
    brand: 'secrets-palace',
  });
  
  // Ticket purchasing state
  const [selectedTicketType, setSelectedTicketType] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [attendeeInfo, setAttendeeInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  
  // Get selected ticket type object
  const selectedTicket = event.ticketTypes.find(t => t.id === selectedTicketType);
  
  // Calculate total amount
  const totalAmount = selectedTicket ? selectedTicket.price * ticketQuantity : 0;
  
  // Handle ticket type selection
  const handleTicketTypeSelect = (ticketTypeId: string) => {
    setSelectedTicketType(ticketTypeId);
    // Reset quantity when ticket type changes
    setTicketQuantity(1);
  };
  
  // Handle quantity change
  const handleQuantityChange = (change: number) => {
    if (!selectedTicket) return;
    
    const newQuantity = ticketQuantity + change;
    if (newQuantity < 1) return;
    if (newQuantity > selectedTicket.maxPerPerson) return;
    if (newQuantity > selectedTicket.availableQuantity) return;
    
    setTicketQuantity(newQuantity);
  };
  
  // Handle attendee info change
  const handleAttendeeInfoChange = (field: keyof typeof attendeeInfo, value: string) => {
    setAttendeeInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
    // Handle payment processing
    const handlePayment = async () => {
      if (!selectedTicketType || !attendeeInfo.name || !attendeeInfo.email || !attendeeInfo.phone) {
        alert('Please select a ticket type and fill in all attendee information');
        return;
      }
      
      setIsProcessing(true);
      
      try {
        // Initialize Paystack transaction
        const response = await initializeTransaction({
          amount: totalAmount * 100, // Convert to kobo
          email: attendeeInfo.email,
          metadata: {
            event_id: event.id,
            event_title: event.title,
            ticket_type: selectedTicketType,
            ticket_quantity: ticketQuantity,
            attendee_name: attendeeInfo.name,
            attendee_phone: attendeeInfo.phone,
            brand_id: brandId
          }
        });
        
        if (response.status && response.data?.authorization_url) {
          // In a real implementation, we would redirect to the authorization URL
          // For now, we'll simulate a successful payment
          setPaymentReference(response.data.reference);
          
          // Simulate payment verification
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Add loyalty points for the ticket purchase (50 points per booking as per loyalty design)
          const pointsEarned = 50; // Fixed amount per booking as shown in the loyalty design
          useLoyaltyStore.getState().addPoints(pointsEarned);
          
          setIsPaymentSuccessful(true);
        } else {
          throw new Error('Failed to initialize payment');
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('Payment processing failed. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    };

    // Waitlist functionality
    const { joinWaitlist: joinWaitlistFn, loading: waitlistLoading, error: waitlistError } = useWaitlist();
    const [waitlistPartySize, setWaitlistPartySize] = useState(1);
    
    const handleJoinWaitlist = async () => {
      if (!eventId) return;
      
      setWaitlistLoading(true);
      try {
        const result = await joinWaitlistFn({
          eventId: eventId,
          partySize: waitlistPartySize
        });
        
        if (result.success) {
          alert(`You've been added to the waitlist! Your position is #${result.data?.position || 'TBD'}`);
          setWaitlistPartySize(1); // Reset after successful join
        } else {
          throw new Error(result.error || 'Failed to join waitlist');
        }
      } catch (err: any) {
        alert(err.message || 'Failed to join waitlist');
      } finally {
        setWaitlistLoading(false);
      }
    };
    
    // Guest list functionality
    const { 
      addGuest: addGuestFn, 
      loading: guestListLoading, 
      error: guestListError,
      guestList,
      fetchEventGuestList,
      updateRSVP,
      removeGuest
    } = useGuestList();
    
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestPhone, setGuestPhone] = useState('');
    const [plusOne, setPlusOne] = useState(false);
    const [plusOneName, setPlusOneName] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [notes, setNotes] = useState('');
    const [showGuestForm, setShowGuestForm] = useState(false);
    
    const handleAddGuest = async () => {
      if (!eventId || !guestName) {
        alert('Please provide at least a guest name');
        return;
      }
      
      setGuestListLoading(true);
      setGuestListError(null);
      try {
        const result = await addGuestFn({
          eventId: eventId,
          guestName,
          guestEmail: guestEmail || undefined,
          guestPhone: guestPhone || undefined,
          plusOne,
          plusOneName: plusOneName || undefined,
          dietaryRestrictions: dietaryRestrictions || undefined,
          notes: notes || undefined
        });
        
        if (result.success) {
          alert('Guest added successfully!');
          // Reset form
          setGuestName('');
          setGuestEmail('');
          setGuestPhone('');
          setPlusOne(false);
          setPlusOneName('');
          setDietaryRestrictions('');
          setNotes('');
          setShowGuestForm(false);
          // Refresh guest list
          await fetchEventGuestList(eventId);
        } else {
          throw new Error(result.error || 'Failed to add guest');
        }
      } catch (err: any) {
        setGuestListError(err.message || 'Failed to add guest');
        alert(err.message || 'Failed to add guest');
      } finally {
        setGuestListLoading(false);
      }
    };
  
  if (!event) {
    return <div>Event not found</div>;
  }
  
  return (
    <div className="min-h-screen bg-background text-text">
      <JsonLd jsonLd={eventJsonLd} />
      {/* Header */}
      <header className="bg-bg/90 backdrop-blur-sm p-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Button variant="outline" size="sm" href="/events">
            ← Back to Events
          </Button>
          <h1 className="text-3xl font-bold text-text-brand">
            {brandId === 'secrets-palace' ? 'Secrets Palace' : 'Folixx Bukka'} Event
          </h1>
        </div>
      </header>
      
      {/* Event Detail */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {!isPaymentSuccessful && (
          <>
            {/* Event Image and Info */}
            <div className="mb-10">
              <div className="relative aspect-w-4 aspect-h-3 mb-6">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                {!event.isAvailable && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-text-inverse text-sm font-medium">Sold Out</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-text mb-2">
                  {event.title}
                </h2>
                <div className="flex items-center space-x-4 text-text-sm text-text-muted">
                  <span>??</span>
                  <span>{event.location}</span>
                  <span>??</span>
                  <span>{new Date(event.date).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>??</span>
                  <span>{event.time}</span>
                </div>
                <p className="text-text-sm text-text-muted mb-4 line-clamp-4">
                  {event.description}
                </p>
              </div>
            </div>
            
            {/* Ticket Selection */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-text mb-6">Select Your Tickets</h2>
              
              <div className="grid gap-6">
                {event.ticketTypes.map(ticketType => (
                  <div 
                    key={ticketType.id} 
                    className={`bg-card rounded-xl border border-border/50 p-6 transition-all hover:border-border/70 \${selectedTicketType === ticketType.id ? 'ring-2 ring-primary/50' : ''}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <input
                          type="radio"
                          id={`ticket-${ticketType.id}`}
                          name="ticketType"
                          checked={selectedTicketType === ticketType.id}
                          onChange={() => handleTicketTypeSelect(ticketType.id)}
                          className="h-4 w-4 text-primary"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium text-text">
                            {ticketType.name}
                          </h3>
                          <span className="text-text-brand font-medium">
                            ₦{ticketType.price.toLocaleString()}
                          </span>
                        </div>
                        {ticketType.description && (
                          <p className="text-text-sm text-text-muted line-clamp-2">
                            {ticketType.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 text-text-sm">
                          <span className="text-text-muted">??</span>
                          <span>Available: {ticketType.availableQuantity}</span>
                          <span className="text-text-muted">??</span>
                          <span>Max per person: {ticketType.maxPerPerson}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quantity Selector (shown when ticket type is selected) */}
                    {selectedTicketType === ticketType.id && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <label className="block text-text-sm font-medium mb-2">Quantity</label>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(-1)}
                            disabled={ticketQuantity <= 1}
                          >
                            -
                          </Button>
                          <span className="w-10 text-center font-medium">{ticketQuantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(1)}
                            disabled={
                              ticketQuantity >= (selectedTicket?.maxPerPerson || 0) ||
                              ticketQuantity >= (selectedTicket?.availableQuantity || 0)
                            }
                          >
                            +
                          </Button>
                        </div>
                        <p className="text-text-sm text-text-muted mt-1">
                          {selectedTicket && (
                            <>
                              Subtotal: ₦{(selectedTicket.price * ticketQuantity).toLocaleString()}
                            </>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            
            {/* Attendee Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-text mb-6">Attendee Information</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-text-sm font-medium mb-2">Full Name</label>
                  <Input
                    type="text"
                    value={attendeeInfo.name}
                    onChange={(e) => handleAttendeeInfoChange('name', e.target.value)}
                    placeholder="Enter attendee full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-text-sm font-medium mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={attendeeInfo.email}
                    onChange={(e) => handleAttendeeInfoChange('email', e.target.value)}
                    placeholder="Enter attendee email"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-text-sm font-medium mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    value={attendeeInfo.phone}
                    onChange={(e) => handleAttendeeInfoChange('phone', e.target.value)}
                    placeholder="Enter attendee phone number"
                    required
                  />
                </div>
              </div>
            </section>
            
            {/* Payment Section */}
            <section>
              <h2 className="text-2xl font-semibold text-text mb-6">Payment</h2>
              
              {selectedTicketType && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-text-lg">
                    <span>Total Amount:</span>
                    <span className="font-bold text-text-brand">₦{totalAmount.toLocaleString()}</span>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="lg"
                    w-full
                    onClick={handlePayment}
                    disabled={isProcessing || !selectedTicketType || !attendeeInfo.name || !attendeeInfo.email || !attendeeInfo.phone}
                    className={`mb-4 \${isPaymentLoading ? 'opacity-50' : ''}`}
                  >
                    {isProcessing ? 'Processing Payment...' : 'Pay Now'}
                  </Button>
                  
                  {isPaymentLoading && (
                    <p className="text-text-sm text-text-muted text-center">
                      Processing your payment securely...
                    </p>
                  )}
                </div>
              )}
              
              {!selectedTicketType && (
                <p className="text-text-sm text-text-muted text-center">
                  Please select a ticket type to proceed with payment
                </p>
              )}
            </section>
          </>
        )}
        
        {/* Payment Success */}
        {isPaymentSuccessful && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto bg-primary/20 rounded-flex items-center justify-center mb-6">
              <span className="text-text-primary text-4xl">✓</span>
            </div>
            <h2 className="text-3xl font-bold text-text-brand mb-4">Payment Successful!</h2>
            <p className="text-text-lg text-text-muted mb-6">
              Thank you for your purchase. Your tickets have been booked successfully.
            </p>
            
            <div className="bg-card rounded-xl border border-border/50 p-8 mb-8">
              <h3 className="text-xl font-semibold text-text mb-4">Booking Details</h3>
              <div className="space-y-4 text-text-sm">
                <div className="flex justify-between">
                  <span>Event:</span>
                  <span>{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date(event.date).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{event.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{event.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ticket Type:</span>
                  <span>{selectedTicket?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{ticketQuantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Paid:</span>
                  <span className="font-medium text-text-brand">₦{totalAmount.toLocaleString()}</span>
                </div>
              <div className="flex justify-between">
                <span>Reference:</span>
                <span className="font-mono text-text-sm">{paymentReference}</span>
              </div>
              <div className="flex justify-between">
                <span>Attendee:</span>
                <span>{attendeeInfo.name}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-text-sm text-text-muted">
                Please save this reference number for future reference. Your tickets will be sent to 
                {attendeeInfo.email} shortly.
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="md"
            href="/events"
            className="w-full md:w-auto"
          >
            Back to Events
          </Button>
        </div>
      )}
      
      {/* Waitlist Section (shown when event is sold out) */}
      {!event.isAvailable && !isPaymentSuccessful && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-text mb-6">Waitlist for Sold Out Event</h2>
          <p className="text-text-sm text-text-muted mb-6">
            This event is currently sold out. Join the waitlist to be notified if tickets become available.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-text-sm font-medium mb-2">Party Size</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setWaitlistPartySize(Math.max(1, waitlistPartySize - 1))}
                  disabled={waitlistPartySize <= 1}
                >
                  -
                </Button>
                <span className="w-10 text-center font-medium">{waitlistPartySize}</span>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setWaitlistPartySize(waitlistPartySize + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => setWaitlistPartySize(1)}
              >
                Reset
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={handleJoinWaitlist}
                disabled={waitlistLoading}
                className={`waitlistLoading ? 'opacity-50' : ''`}
              >
                {waitlistLoading ? 'Joining Waitlist...' : 'Join Waitlist'}
              </Button>
            </div>
            
             {waitlistError && (
               <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                 {waitlistError}
               </div>
             )}
           </div>
         </section>
       )}
       
       {/* Guest List Section (shown when event has guest list functionality) */}
       <section className="mb-10">
         <h2 className="text-2xl font-semibold text-text mb-6">Guest List</h2>
         <p className="text-text-sm text-text-muted mb-6">
           Manage guests for this event
         </p>
         
         <div className="space-y-4">
           {/* Guest Form */}
           <div className={`bg-card rounded-xl border border-border/50 p-6 \${showGuestForm ? 'border-primary/50' : ''}`}>
             <h3 className="text-lg font-medium text-text mb-4">
               {showGuestForm ? 'Add Guest' : 'Guest List'}
             </h3>
             
             {showGuestForm ? (
               <> {/* Guest Form */}
                 <div className="grid gap-4 md:grid-cols-2">
                   <div>
                     <label className="block text-text-sm font-medium mb-2">Guest Name</label>
                     <Input
                       type="text"
                       value={guestName}
                       onChange={(e) => setGuestName(e.target.value)}
                       placeholder="Enter guest name"
                       required
                     />
                   </div>
                   
                   <div>
                     <label className="block text-text-sm font-medium mb-2">Guest Email</label>
                     <Input
                       type="email"
                       value={guestEmail}
                       onChange={(e) => setGuestEmail(e.target.value)}
                       placeholder="Enter guest email (optional)"
                     />
                   </div>
                   
                   <div>
                     <label className="block text-text-sm font-medium mb-2">Guest Phone</label>
                     <Input
                       type="tel"
                       value={guestPhone}
                       onChange={(e) => setGuestPhone(e.target.value)}
                       placeholder="Enter guest phone (optional)"
                     />
                   </div>
                   
                   <div className="md:col-span-2">
                     <label className="block text-text-sm font-medium mb-2">Dietary Restrictions</label>
                     <Input
                       type="text"
                       value={dietaryRestrictions}
                       onChange={(e) => setDietaryRestrictions(e.target.value)}
                       placeholder="Enter any dietary restrictions (optional)"
                     />
                   </div>
                 </div>
                 
                 <div className="mt-4 flex items-center space-x-4">
                   <div className="flex items-center space-x-2">
                     <input
                       type="checkbox"
                       checked={plusOne}
                       onChange={(e) => setPlusOne(e.target.checked)}
                       className="h-4 w-4 text-primary"
                     />
                     <label className="text-text-sm font-medium text-text">Plus One</label>
                   </div>
                   {plusOne && (
                     <div className="ml-4">
                       <label className="block text-text-sm font-medium mb-2">Plus One Name</label>
                       <Input
                         type="text"
                         value={plusOneName}
                         onChange={(e) => setPlusOneName(e.target.value)}
                         placeholder="Enter plus one name"
                       />
                     </div>
                   )}
                 </div>
                 
                 <div className="mt-4">
                   <label className="block text-text-sm font-medium mb-2">Notes</label>
                   <textarea
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                     placeholder="Enter any additional notes (optional)"
                     className="w-full min-h-[80px] p-3 border border-border/50 rounded-lg bg-background text-text resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                   />
                 </div>
               </>
             ) : (
               <> {/* Guest List Display */}
                 {guestListLoading && (
                   <div className="text-center py-8">
                     <p className="text-text-sm text-text-muted">Loading guest list...</p>
                   </div>
                 )}
                 
                 {!guestListLoading && guestList.length === 0 && (
                   <div className="text-center py-8">
                     <p className="text-text-sm text-text-muted">No guests added yet. Be the first to add a guest!</p>
                   </div>
                 )}
                 
                 {!guestListLoading && guestList.length > 0 && (
                   <div className="space-y-4">
                     {guestList.map((guest) => (
                       <div key={guest.id} className="bg-background/50 rounded-lg p-4 border border-border/50">
                         <div className="flex justify-between items-start mb-2">
                           <div className="flex-1">
                             <h4 className="font-medium text-text">{guest.guest_name}</h4>
                             {guest.guest_email && (
                               <p className="text-text-sm text-text-muted">✉️ {guest.guest_email}</p>
                             )}
                             {guest.guest_phone && (
                               <p className="text-text-sm text-text-muted">📱 {guest.guest_phone}</p>
                             )}
                           </div>
                           <div className="text-text-sm">
                             <span className={`px-2 py-1 rounded \${guest.rsvp_status === 'accepted' ? 'bg-green-50 text-green-600' : guest.rsvp_status === 'declined' ? 'bg-red-50 text-red-600' : guest.rsvp_status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-600'}`}>
                               {guest.rsvp_status.charAt(0).toUpperCase() + guest.rsvp_status.slice(1)}
                             </span>
                           </div>
                         </div>
                         
                         {guest.plus_one && guest.plus_one_name && (
                           <div className="mt-2 text-text-sm text-text-muted">
                             +1: {guest.plus_one_name}
                           </div>
                         )}
                         
                         {guest.dietary_restrictions && (
                           <div className="mt-2 text-text-sm text-text-muted">
                             <strong>Dietary:</strong> {guest.dietary_restrictions}
                           </div>
                         )}
                         
                         {guest.notes && (
                           <div className="mt-2 text-text-sm text-text-muted">
                             <strong>Notes:</strong> {guest.notes}
                           </div>
                         )}
                         
                         <div className="mt-4 flex justify-end space-x-3">
                           {!guest.user_id && (
                             <Button
                               variant="outline"
                               size="sm"
                               onClick={() => {
                                 // Prompt user to claim this guest entry
                                 if (window.confirm('Claim this guest entry as yours?')) {
                                   // In a real implementation, we would update the user_id
                                   alert('Feature coming soon: Claim guest entry');
                                 }
                               }}
                             >
                               Claim
                             </Button>
                           )}
                           
                           {guest.user_id && (
                             <>
                               <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() => updateRSVP({ guestListId: guest.id, rsvpStatus: 'accepted' })}
                                 disabled={guest.rsvp_status === 'accepted'}
                               >
                                 Accept
                               </Button>
                               
                               <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() => updateRSVP({ guestListId: guest.id, rsvpStatus: 'declined' })}
                                 disabled={guest.rsvp_status === 'declined'}
                               >
                                 Decline
                               </Button>
                               
                               <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() => updateRSVP({ guestListId: guest.id, rsvpStatus: 'pending' })}
                                 disabled={guest.rsvp_status === 'pending'}
                               >
                                 Pending
                               </Button>
                             </>
                           )}
                           
                           {(guest.user_id === user?.id || guest.invited_by === user?.id) && (
                             <Button
                               variant="outline"
                               size="sm"
                               onClick={() => removeGuest(guest.id)}
                               className="text-text-destructive"
                             >
                               Remove
                             </Button>
                           )}
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
               </>
             )}
             
             <div className="mt-6 flex justify-end">
               <Button
                 variant="outline"
                 size="md"
                 onClick={() => setShowGuestForm(!showGuestForm)}
                 className={`w-full md:w-auto \${showGuestForm ? 'bg-primary/10' : ''}`}
               >
                 {showGuestForm ? 'Cancel' : 'Add Guest'}
               </Button>
             </div>
           </div>
         </div>
       </section>
     </main>
   </div>
 );
}