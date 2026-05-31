import { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { useBrand } from '@/src/contexts/BrandContext';

// Types
interface Table {
  id: string;
  name: string;
  capacity: number;
  zoneId: string;
  shape: 'round' | 'square' | 'rectangle';
  x: number;
  y: number;
}

interface Zone {
  id: string;
  name: string;
  description: string;
  color: string;
}

// Mock data (will be replaced with data from config/system)
const mockTables: Table[] = [
  { id: 'table-1', name: 'Table 1', capacity: 2, zoneId: 'main-floor', shape: 'round', x: 100, y: 100 },
  { id: 'table-2', name: 'Table 2', capacity: 4, zoneId: 'main-floor', shape: 'round', x: 200, y: 100 },
  { id: 'table-3', name: 'Table 3', capacity: 6, zoneId: 'main-floor', shape: 'rectangle', x: 150, y: 200 },
  { id: 'table-4', name: 'Table 4', capacity: 8, zoneId: 'vip', shape: 'rectangle', x: 300, y: 150 },
  { id: 'table-5', name: 'Table 5', capacity: 4, zoneId: 'terrace', shape: 'round', x: 100, y: 300 },
  { id: 'table-6', name: 'Table 6', capacity: 6, zoneId: 'terrace', shape: 'round', x: 200, y: 300 },
];

const mockZones: Zone[] = [
  { id: 'main-floor', name: 'Main Floor', description: 'Main dining area', color: '#3B82F6' },
  { id: 'vip', name: 'VIP Section', description: 'Exclusive VIP dining area', color: '#8B5CF6' },
  { id: 'terrace', name: 'Outdoor Terrace', description: 'Alfresco dining area', color: '#10B981' },
];

export default function ReservationPage() {
  const { brandId } = useBrand();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [specialRequests, setSpecialRequests] = useState('');
  const [step, setStep] = useState(1); // 1: date/time, 2: table selection, 3: confirmation
  const [isLoading, setIsLoading] = useState(false);

  // Filter tables by party size
  const availableTables = mockTables.filter(table => table.capacity >= partySize);

  const handleNextStep = () => {
    if (step === 1) {
      if (!date || !time || partySize < 1) return;
      setStep(2);
    } else if (step === 2) {
      if (!selectedTable) return;
      setStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In a real app, this would send data to Supabase
    console.log('Reservation submitted:', { date, time, partySize, selectedTable, specialRequests });
    setIsLoading(false);
    // Reset form
    setDate('');
    setTime('');
    setPartySize(1);
    setSelectedTable(null);
    setSpecialRequests('');
    setStep(1);
    alert('Reservation confirmed!');
  };

  return (
    <div className=\"min-h-screen bg-background text-text\">
      {/* Header */}
      <header className=\"bg-bg/90 backdrop-blur-sm p-6 border-b border-border/50\">
        <div className=\"max-w-7xl mx-auto flex justify-between items-center\">
          <h1 className=\"text-3xl font-bold text-text-brand\">
            {brandId === 'secrets-palace' ? 'Secrets Palace Reservation' : 'Folixx Bukka Reservation'}
          </h1>
          <Button variant=\"secondary\" size=\"sm\" href=\"/events\">
            View Events
          </Button>
        </div>
      </header>

      {/* Reservation Form */}
      <main className=\"max-w-4xl mx-auto px-4 py-12\">
        {step === 1 && (
          <div className=\"space-y-6\">
            <h2 className=\"text-2xl font-semibold text-text mb-4\">When would you like to dine?</h2>
            
            <div className=\"grid gap-4 md:grid-cols-2\">
              <div>
                <label className=\"block text-text-sm font-medium mb-2\">Date</label>
                <Input
                  type=\"date\"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label className=\"block text-text-sm font-medium mb-2\">Time</label>
                <Input
                  type=\"time\"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  min=\"11:00\"
                  max=\"23:00\"
                  required
                />
              </div>
              <div className=\"md:col-span-2\">
                <label className=\"block text-text-sm font-medium mb-2\">Party Size</label>
                <div className=\"flex items-center space-x-3\">
                  <Button
                    variant=\"ghost\"
                    size=\"md\"
                    onClick={() => setPartySize(Math.max(1, partySize - 1))}
                    disabled={partySize <= 1}
                  >
                    -
                  </Button>
                  <span className=\"w-10 text-center font-medium\">{partySize}</span>
                  <Button
                    variant=\"ghost\"
                    size=\"md\"
                    onClick={() => setPartySize(partySize + 1)}
                  >
                    +
                  </Button>
                </div>
                <p className=\"text-text-sm text-text-muted mt-1\">
                  We can accommodate parties of {partySize} or more
                </p>
              </div>
            </div>
            
            <div className=\"mt-6 flex justify-end space-x-3\">
              <Button variant=\"outline\" size=\"md\" onClick={handlePreviousStep}>
                Back
              </Button>
              <Button
                variant=\"primary\"
                size=\"md\"
                onClick={handleNextStep}
                disabled={!date || !time || partySize < 1}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className=\"space-y-6\">
            <h2 className=\"text-2xl font-semibold text-text mb-4\">Select Your Table</h2>
            <p className=\"text-text-muted mb-4\">
              Choose a table that accommodates your party of {partySize}
            </p>
            
            {/* Table Selection by Zone */}
            <div className=\"space-y-6\">
              {mockZones.map((zone) => {
                const zoneTables = availableTables.filter(table => table.zoneId === zone.id);
                if (zoneTables.length === 0) return null;
                
                return (
                  <div key={zone.id} className=\"space-y-4\">
                    <div className=\"flex items-center space-x-3\">
                      <div className=\"w-4 h-4 rounded-full\" style={{ backgroundColor: zone.color }}></div>
                      <h3 className=\"text-lg font-medium text-text\">{zone.name}</h3>
                      <p className=\"text-text-sm text-text-muted\">{zone.description}</p>
                    </div>
                    
                    <div className=\"grid gap-4\">
                      {/* VIP: 1 column, Main Floor: 2 columns, Terrace: 3 columns */}
                      <div className=\"grid gap-4 
                                  sm:grid-cols-[{zone.id === 'vip' ? '1' : zone.id === 'main-floor' ? '2' : '3'}]\">
                        {zoneTables.map((table) => (
                          <div
                            key={table.id}
                            onClick={() => setSelectedTable(table.id)}
                            className={\elative aspect-w-1 aspect-h-1 cursor-pointer border-2 
                              border-border/30 rounded-lg 
                              
                              transition-all\}
                          >
                            {/* Table visualization */}
                            <div className=\"absolute inset-0 flex items-center justify-center\">\n                              <div\n                                className={\w-8 h-8 bg-border/50 rounded-full 
                                  \n                                }\n                              >\n                                <span className=\"text-text text-xs font-medium text-center leading-none\">\n                                  {table.name.replace('Table', 'T')}\n                                </span>\n                              </div>\n                            </div>\n                            <div className=\"mt-2 text-center text-text-sm font-medium\">\n                              {table.capacity} seats\n                            </div>\n                          </div>\n                        ))}\n                      </div>\n                    </div>\n                  </div>\n                );
              })}\n            </div>\n\n            <div className=\"mt-6 flex justify-end space-x-3\">\n              <Button variant=\"outline\" size=\"md\" onClick={handlePreviousStep}>\n                Back\n              </Button>\n              <Button\n                variant=\"primary\"\n                size=\"md\"\n                onClick={handleNextStep}\n                disabled={!selectedTable}\n              >\n                Continue\n              </Button>\n            </div>\n          </div>\n        )}\n\n        {step === 3 && (\n          <div className=\"space-y-6\">\n            <h2 className=\"text-2xl font-semibold text-text mb-4\">Reservation Details</h2>\n            \n            <div className=\"space-y-4\">\n              <div className=\"flex items-center space-x-4\">\n                <div className=\"w-8 h-8 rounded-lg bg-border/50 flex items-center justify-center\">\n                  <span className=\"text-text-primary font-medium\">?</span>\n                </div>\n                <div>\n                  <h3 className=\"text-lg font-medium text-text\">Reservation Confirmed</h3>\n                  <p className=\"text-text-sm text-text-muted\">\n                    Your table is reserved. We look forward to serving you!\n                  </p>\n                </div>\n              </div>\n              \n              <div className=\"border-t border-border/50 pt-6\">\n                <div className=\"space-y-3\">\n                  <div className=\"flex justify-between text-text-sm\">\n                    <span>Date:</span>\n                    <span>{new Date(date).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>\n                  </div>\n                  <div className=\"flex justify-between text-text-sm\">\n                    <span>Time:</span>\n                    <span>{time}</span>\n                  </div>\n                  <div className=\"flex justify-between text-text-sm\">\n                    <span>Party Size:</span>\n                    <span>{partySize} person{partySize !== 1 ? 's' : ''}</span>\n                  </div>\n                  <div className=\"flex justify-between text-text-sm\">\n                    <span>Table:</span>\n                    <span>\n                      {selectedTable && (\n                        mockTables.find(t => t.id === selectedTable)?.name || 'TBD'\n                      )}\n                    </span>\n                  </div>\n                  {specialRequests && (\n                    <div className=\"flex justify-between text-text-sm\">\n                      <span>Special Requests:</span>\n                      <span className=\"text-text-muted\">{specialRequests}</span>\n                    </div>\n                  )}\n                </div>\n              </div>\n            </div>\n            \n            <div className=\"mt-8\">\n              <Button\n                variant=\"secondary\"\n                size=\"md\"\n                href=\"/events\"\n              >\n                Book Another Event\n              </Button>\n              <Button\n                variant=\"primary\"\n                size=\"md\"\n                className=\"ml-4\"\n                onClick={handleSubmit}\n                isLoading={isLoading}\n              >\n                {isLoading ? 'Confirming...' : 'Confirm Reservation'}\n              </Button>\n            </div>\n          </div>\n        )}\n      </main>\n\n      {/* Footer */}\n      <footer className=\"bg-bg/50 backdrop-blur-sm p-8 border-t border-border/50\">\n        <div className=\"max-w-7xl mx-auto text-center\">\n          <p className=\"text-text-sm text-text-muted\">\n            Need help? Contact us at reservations@palaceos.com or call +234 1234 5678\n          </p>\n        </div>\n      </footer>\n    </div>\n  );
}
