import { Image } from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { useBrand } from '@/lib/contexts/BrandContext';

// Types
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
}

interface EventCategory {
  id: string;
  name: string;
  events: Event[];
}

// Utility function to get events happening tonight
function getTonightEvents(events: Event[]): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // End of today
  
  return events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate < tomorrow;
  });
}

// Mock event data
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
    isAvailable: true
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
    isAvailable: true
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
    isAvailable: true
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
    isAvailable: false
  }
];

export default function EventsPage() {
  const { brandId } = useBrand();
  
  // Get tonight's events
  const tonightEvents = getTonightEvents(mockEvents);
  
  return (
    <div className="min-h-screen bg-background text-text">
      {/* Header */}
      <header className="bg-bg/90 backdrop-blur-sm p-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold text-text-brand mb-2">
            {brandId === 'secrets-palace' ? 'Secrets Palace Events' : 'Folixx Bukka Events'}
          </h1>
          <p className="text-text-muted max-w-xl text-center">
            Experience the best of Lagos nightlife and entertainment at Secrets Palace
          </p>
        </div>
      </header>
      
      {/* Tonight at Secrets Section (only for Secrets Palace brand) */}
      {brandId === 'secrets-palace' && tonightEvents.length > 0 && (
        <section className="px-4 pt-12 pb-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-text-brand mb-6">
              Tonight at Secrets Palace
            </h2>
            <div className="grid gap-6">
              {/* Palace: 1 column on mobile, 2 on tablet, 3 on desktop */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tonightEvents.map((event) => (
                  <Link 
                    key={event.id} 
                    href="/events/[eventId]" 
                    asItem={{ eventId: event.id }}
                    className="group block hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-card rounded-xl border border-border/50 overflow-hidden hover:border-border/70">
                      {/* Image */}
                      <div className="relative aspect-w-4 aspect-h-3">
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
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-medium text-text mb-2 line-clamp-2">
                          {event.title}
                        </h3>
                        <p className="text-text-sm text-text-muted mb-3 line-clamp-3">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between text-text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-text-muted">??</span>
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-text-muted">??</span>
                            <span>{new Date(event.date).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-text-muted">??</span>
                            <span>{event.time}</span>
                          </div>
                        </div>
                        {event.isAvailable && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-4 w-full"
                            onClick={() => {}}
                          >
                            Get Tickets
                          </Button>
                        )}
                        {!event.isAvailable && (
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="mt-4 w-full" 
                            disabled
                          >
                            Sold Out
                          </Button>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Events Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Upcoming Events Section */}
          <section>
            <h2 className="text-3xl font-semibold text-text mb-6">Upcoming Events</h2>
            <div className="grid gap-6">
              {/* Palace: 1 column on mobile, 2 on tablet, 3 on desktop */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mockEvents.map((event) => (
                  <Link 
                    key={event.id} 
                    href={"/events/" + event.id}
                    className="group block hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-card rounded-xl border border-border/50 overflow-hidden hover:border-border/70">
                      <div className="relative aspect-w-4 aspect-h-3">
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
                      <div className="p-6">
                        <h3 className="text-lg font-medium text-text mb-2 line-clamp-2">
                          {event.title}
                        </h3>
                        <p className="text-text-sm text-text-muted mb-3 line-clamp-3">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between text-text-sm">
                          <div className="flex items-center space-x-2">
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
