import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/bookingStore';
import useVehicleStore from '../store/vehicleStore';
import { Settings, Car, Calendar, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function BookService() {
  const [step, setStep] = useState(1);
  const { services, fetchServices, createBooking, isLoading: bookingLoading } = useBookingStore();
  const { vehicles, fetchVehicles, isLoading: vehicleLoading } = useVehicleStore();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    service_ids: [],
    vehicle_id: null,
    booking_date: '',
    booking_time: '',
    notes: '',
    total_price: 0
  });

  useEffect(() => {
    fetchServices();
    fetchVehicles();
  }, [fetchServices, fetchVehicles]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleServiceSelect = (service) => {
    const isSelected = bookingData.service_ids.includes(service.service_id);
    let newServiceIds;
    let newTotalPrice;

    if (isSelected) {
      newServiceIds = bookingData.service_ids.filter(id => id !== service.service_id);
      newTotalPrice = bookingData.total_price - parseFloat(service.base_price);
    } else {
      newServiceIds = [...bookingData.service_ids, service.service_id];
      newTotalPrice = bookingData.total_price + parseFloat(service.base_price);
    }

    setBookingData({ 
      ...bookingData, 
      service_ids: newServiceIds, 
      total_price: parseFloat(newTotalPrice.toFixed(2)) 
    });
  };

  const handleVehicleSelect = (vehicleId) => {
    setBookingData({ ...bookingData, vehicle_id: vehicleId });
    handleNext();
  };

  const handleDateTimeSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  const handlePayment = async () => {
    // Submit using service_ids array
    const success = await createBooking(bookingData);
    if (success) {
      setStep(5);
      setTimeout(() => navigate('/dashboard/bookings'), 3000);
    }
  };

  const selectedServices = services.filter(s => bookingData.service_ids.includes(s.service_id));
  const selectedVehicle = vehicles.find(v => v.vehicle_id === bookingData.vehicle_id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-['Outfit']">Book a Service</h1>
        <p className="text-gray-600 mt-1">Schedule your next maintenance or repair.</p>
      </div>

      {/* Stepper */}
      <div className="mb-8 flex justify-between items-center relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        
        {[
          { num: 1, icon: Settings, label: 'Service' },
          { num: 2, icon: Car, label: 'Vehicle' },
          { num: 3, icon: Calendar, label: 'Schedule' },
          { num: 4, icon: CreditCard, label: 'Payment' }
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-colors duration-300 ${step >= s.num ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-200 text-gray-500'}`}>
              <s.icon className="h-6 w-6" />
            </div>
            <span className={`text-sm font-medium ${step >= s.num ? 'text-gray-900' : 'text-gray-500'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
        {/* Step 1: Services */}
        {step === 1 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-['Outfit']">Select Services</h2>
              <span className="text-gray-500 text-sm font-medium">{bookingData.service_ids.length} selected</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {services.map(service => {
                const isSelected = bookingData.service_ids.includes(service.service_id);
                return (
                  <div 
                    key={service.service_id} 
                    onClick={() => toggleServiceSelect(service)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{service.name}</h3>
                      <span className="text-blue-600 font-bold">${service.base_price}</span>
                    </div>
                    <p className="text-gray-500 text-sm">{service.description}</p>
                  </div>
                );
              })}
              {services.length === 0 && <p className="text-gray-500 col-span-2">No services available currently.</p>}
            </div>
            <div className="flex justify-end">
              <button 
                onClick={handleNext} 
                disabled={bookingData.service_ids.length === 0}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Vehicles */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-6 font-['Outfit']">Select Your Vehicle</h2>
            {vehicles.length === 0 ? (
              <div className="text-center py-8">
                <p className="mb-4">You don't have any vehicles registered.</p>
                <button onClick={() => navigate('/dashboard/vehicles')} className="text-blue-600 font-medium hover:underline">Add a vehicle first</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {vehicles.map(vehicle => (
                  <div 
                    key={vehicle.vehicle_id}
                    onClick={() => handleVehicleSelect(vehicle.vehicle_id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${bookingData.vehicle_id === vehicle.vehicle_id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                  >
                    <h3 className="font-bold text-gray-900">{vehicle.make} {vehicle.model}</h3>
                    <p className="text-gray-500 text-sm">{vehicle.year} • {vehicle.registration_number}</p>
                  </div>
                ))}
              </div>
            )}
            <button onClick={handleBack} className="text-gray-500 hover:text-gray-700 font-medium">Back</button>
          </div>
        )}

        {/* Step 3: Date & Time */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-6 font-['Outfit']">Select Date & Time</h2>
            <form onSubmit={handleDateTimeSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input 
                    type="date" 
                    required 
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    className="w-full rounded-lg border-gray-300 border px-3 py-2 cursor-pointer"
                    value={bookingData.booking_date}
                    onChange={e => setBookingData({...bookingData, booking_date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <input 
                    type="time" 
                    required 
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    className="w-full rounded-lg border-gray-300 border px-3 py-2 cursor-pointer"
                    value={bookingData.booking_time}
                    onChange={e => setBookingData({...bookingData, booking_time: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full rounded-lg border-gray-300 border px-3 py-2"
                  value={bookingData.notes}
                  onChange={e => setBookingData({...bookingData, notes: e.target.value})}
                  placeholder="Any specific issues or requests?"
                ></textarea>
              </div>
              <div className="flex justify-between items-center pt-4">
                <button type="button" onClick={handleBack} className="text-gray-500 hover:text-gray-700 font-medium">Back</button>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">Continue to Payment</button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Payment / Confirm */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-6 font-['Outfit']">Review & Pay</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex flex-col text-gray-600 mb-3">
                  <span className="font-medium mb-1">Services Selected:</span>
                  <ul className="list-disc list-inside ml-2">
                    {selectedServices.map(s => (
                      <li key={s.service_id} className="text-gray-900">{s.name} <span className="text-gray-500 text-sm">(${s.base_price})</span></li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Vehicle</span>
                  <span className="font-medium text-gray-900">{selectedVehicle?.make} {selectedVehicle?.model}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Date & Time</span>
                  <span className="font-medium text-gray-900">{bookingData.booking_date} at {bookingData.booking_time}</span>
                </div>
                {bookingData.notes && (
                  <div className="text-gray-600 text-sm mt-2 border-t border-gray-200 pt-2">
                    <span className="font-medium">Notes:</span> {bookingData.notes}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">${bookingData.total_price}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button onClick={handleBack} className="text-gray-500 hover:text-gray-700 font-medium">Back</button>
              <button 
                onClick={handlePayment} 
                disabled={bookingLoading}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition flex items-center gap-2 shadow-lg shadow-green-200 disabled:opacity-70"
              >
                {bookingLoading ? 'Processing...' : `Pay $${bookingData.total_price} Securely`}
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Outfit']">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-8">Your service appointments have been scheduled successfully. We look forward to seeing you.</p>
            <p className="text-sm text-gray-500">Redirecting to your bookings...</p>
          </div>
        )}
      </div>
    </div>
  );
}
