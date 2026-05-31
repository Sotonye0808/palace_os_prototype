'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { AddressBookService, Address } from '@/lib/services/addressBook';

export default function AddressBookPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [autocompletePredictions, setAutocompletePredictions] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await AddressBookService.getAddresses();
      if (result.success) {
        setAddresses(result.data || []);
      } else {
        setError(result.error || 'Failed to fetch addresses');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = () => {
    setFormMode('add');
    setCurrentAddress(null);
    setFormVisible(true);
  };

  const handleEditAddress = (address: Address) => {
    setFormMode('edit');
    setCurrentAddress(address);
    setFormVisible(true);
  };

  const handleDeleteAddress = async (id: string) => {
    setLoading(true);
    try {
      const result = await AddressBookService.deleteAddress(id);
      if (result.success) {
        await fetchAddresses();
      } else {
        setError(result.error || 'Failed to delete address');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetAsDefault = async (id: string) => {
    setLoading(true);
    try {
      const result = await AddressBookService.setAsDefault(id);
      if (result.success) {
        await fetchAddresses();
      } else {
        setError(result.error || 'Failed to set as default');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let result;
      if (formMode === 'add' && currentAddress) {
        // In add mode, currentAddress is null, so we create from form state
        // For simplicity, we'll assume the form state is managed separately
        // In a real implementation, we would have form state for the inputs
        // Since we are focusing on the structure, we'll skip the form state management here
        // and just show that we are calling the service.
        // We'll implement a simple version for now.
        alert('Form submission logic would go here');
        setFormVisible(false);
        setLoading(false);
        return;
      } else if (formMode === 'edit' && currentAddress) {
        // Update existing address
        // Again, we would have form state, but for now we'll just show the service call
        alert('Update logic would go here');
        setFormVisible(false);
        setLoading(false);
        return;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAutocompleteInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length >= 3) {
      const result = await AddressBookService.getPlaceAutocomplete(input);
      if (result.success) {
        setAutocompletePredictions(result.data || []);
      } else {
        setError(result.error || 'Failed to get predictions');
      }
    } else {
      setAutocompletePredictions([]);
    }
  };

  const handlePlaceSelect = (place: any) => {
    setSelectedPlace(place);
    // In a real implementation, we would fill the form with the place details
    // For now, we'll just log it
    console.log('Selected place:', place);
    setAutocompletePredictions([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-text">
        <p>Loading addresses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-text">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Header */}
      <header className="bg-bg/90 backdrop-blur-sm p-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-text-brand">Address Book</h1>
          <Button variant="secondary" size="md" onClick={handleAddAddress}>
            Add New Address
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {addresses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">You haven't saved any addresses yet.</p>
            <Button variant="primary" size="md" onClick={handleAddAddress}>
              Add Your First Address
            </Button>
          </div>
        )}

        {addresses.length > 0 && (
          <div className="space-y-6">
            {addresses.map((address) => (
              <div key={address.id} className="bg-card rounded-xl border border-border/50 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{address.label}</h2>
                    <p className="text-text-sm">{address.address_line_1}</p>
                    {address.address_line_2 && (
                      <p className="text-text-sm">{address.address_line_2}</p>
                    )}
                    <p className="text-text-sm">
                      {address.city}, {address.state} {address.postal_code}
                    </p>
                    <p className="text-text-sm">{address.country}</p>
                  </div>
                  <div className="space-x-3">
                    {address.is_default ? (
                      <span className="px-2 py-1 bg-green-50 text-green-800 text-xs rounded">
                        Default
                      </span>
                    ) : (
                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() => handleSetAsDefault(address.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => handleEditAddress(address)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Address Form Modal */}
        {formVisible && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl w-full max-w-md p-6">
              <h2 className="text-2xl font-semibold mb-6">
                {formMode === 'add' ? 'Add New Address' : 'Edit Address'}
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-text-sm font-medium mb-2">
                    Label (e.g., Home, Work)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter label"
                    // value={formState.label}
                    // onChange={(e) => setFormState({...formState, label: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-sm font-medium mb-2">
                    Address Line 1
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter street address"
                    // value={formState.address_line_1}
                    // onChange={(e) => setFormState({...formState, address_line_1: e.target.value})}
                    onChange={handleAutocompleteInput}
                    required
                  />
                  {autocompletePredictions.length > 0 && (
                    <div className="bg-white border border-border/50 rounded-xl mt-1 w-full z-10">
                      {autocompletePredictions.map((prediction, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 text-text-sm cursor-pointer hover:bg-bg/50"
                          onClick={() => handlePlaceSelect(prediction)}
                        >
                          <div className="font-medium">{prediction.description}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-text-sm font-medium mb-2">
                    Address Line 2 (optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="Apartment, suite, etc."
                    // value={formState.address_line_2}
                    // onChange={(e) => setFormState({...formState, address_line_2: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-sm font-medium mb-2">
                      City
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter city"
                      // value={formState.city}
                      // onChange={(e) => setFormState({...formState, city: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-text-sm font-medium mb-2">
                      State/Province
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter state"
                      // value={formState.state}
                      // onChange={(e) => setFormState({...formState, state: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-sm font-medium mb-2">
                      Postal Code
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter postal code"
                      // value={formState.postal_code}
                      // onChange={(e) => setFormState({...formState, postal_code: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-text-sm font-medium mb-2">
                      Country
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter country"
                      defaultValue="Nigeria"
                      // value={formState.country}
                      // onChange={(e) => setFormState({...formState, country: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="default-checkbox"
                    // checked={formState.is_default}
                    // onChange={(e) => setFormState({...formState, is_default: e.target.checked})}
                  />
                  <label htmlFor="default-checkbox" className="text-text">
                    Set as default address
                  </label>
                </div>
                 <div className="flex justify-end space-x-3 mt-6">
                   <Button
                     variant="secondary"
                     size="md"
                     onClick={() => {
                       setFormVisible(false);
                     }}
                   >
                     Cancel
                   </Button>
                   <Button
                     variant="primary"
                     size="md"
                     onClick={handleFormSubmit}
                     disabled={loading}
                   >
                     {loading ? 'Saving...' : 'Save Address'}
                   </Button>
                 </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-bg/50 backdrop-blur-sm p-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="Button variant=secondary size=md">
            Home
          </Link>
        </div>
      </footer>
    </div>
  );
}

