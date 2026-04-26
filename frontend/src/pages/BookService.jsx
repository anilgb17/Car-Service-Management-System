import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/bookingStore';
import useVehicleStore from '../store/vehicleStore';
import { Settings, Car, Calendar, CreditCard, ChevronRight, CheckCircle2, Wrench, Droplets, Zap, Shield, Plus } from 'lucide-react';

const SERVICE_ICONS = { 'Oil': Droplets, 'Tire': Car, 'Battery': Zap, 'Engine': Settings, 'Brake': Shield, 'default': Wrench };
const getIcon = (name) => {
  const key = Object.keys(SERVICE_ICONS).find(k => name?.includes(k)) || 'default';
  return SERVICE_ICONS[key];
};

export default function BookService() {
  const [step, setStep] = useState(1);
  const { services, fetchServices, createBooking, isLoading: bookingLoading } = useBookingStore();
  const { vehicles, fetchVehicles, isLoading: vehiclesLoading } = useVehicleStore();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({ service_ids: [], vehicle_id: null, booking_date: '', booking_time: '', notes: '', total_price: 0 });

  useEffect(() => { 
    fetchServices(); 
    fetchVehicles(); 
  }, [fetchServices, fetchVehicles]);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const toggleService = (service) => {
    const isSelected = bookingData.service_ids.includes(service.service_id);
    setBookingData(prev => ({
      ...prev,
      service_ids: isSelected ? prev.service_ids.filter(id => id !== service.service_id) : [...prev.service_ids, service.service_id],
      total_price: parseFloat((isSelected ? prev.total_price - parseFloat(service.base_price) : prev.total_price + parseFloat(service.base_price)).toFixed(2))
    }));
  };

  const handlePayment = async () => {
    const success = await createBooking(bookingData);
    if (success) { setStep(5); setTimeout(() => navigate('/dashboard/bookings'), 3000); }
  };

  const selectedServices = services.filter(s => bookingData.service_ids.includes(s.service_id));
  const selectedVehicle = vehicles.find(v => v.vehicle_id === bookingData.vehicle_id);

  // Show loading state while fetching initial data
  if (bookingLoading && services.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Book a Service</h1>
          <p className="text-gray-400 mt-1">Schedule your next maintenance or repair.</p>
        </div>
        <div className="card-premium p-12 text-center">
          <div className="spinner-premium mx-auto mb-4"></div>
          <p className="text-secondary">Loading services...</p>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, icon: Settings, label: 'Service' },
    { num: 2, icon: Car, label: 'Vehicle' },
    { num: 3, icon: Calendar, label: 'Schedule' },
    { num: 4, icon: CreditCard, label: 'Payment' },
  ];

  const inputStyle = { background: '#2A2A2A', border: '1.5px solid #374151', color: '#E5E7EB', borderRadius: '8px', padding: '10px 14px', outline: 'none', width: '100%' };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Book a Service</h1>
        <p className="text-gray-400 mt-1">Schedule your next maintenance or repair.</p>
      </div>

      {/* Stepper */}
      {step < 5 && (
        <div className="mb-8 flex justify-between items-center relative">
          <div className="absolute left-0 top-6 w-full h-0.5" style={{ background: '#2D2D2D', zIndex: 0 }} />
          <div className="absolute left-0 top-6 h-0.5 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%`, background: 'linear-gradient(90deg, #0A84FF, #0066CC)', zIndex: 1 }} />
          {steps.map((s) => {
            const Icon = s.icon;
            const done = step > s.num;
            const active = step === s.num;
            return (
              <div key={s.num} className="flex flex-col items-center relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  done ? 'bg-green-500 shadow-lg shadow-green-500/30' :
                  active ? 'bg-[#0A84FF] shadow-lg shadow-blue-500/30' :
                  'bg-[#2D2D2D]'
                }`}>
                  {done ? <CheckCircle2 className="h-5 w-5 text-white" /> : <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-500'}`} />}
                </div>
                <span className={`text-xs font-medium ${active ? 'text-white' : done ? 'text-green-400' : 'text-gray-600'}`}>{s.label}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="card-premium p-6 sm:p-8">
        {/* Step 1: Services */}
        {step === 1 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Select Services</h2>
              <span className="text-sm text-gray-400">{bookingData.service_ids.length} selected</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {services.map(service => {
                const isSelected = bookingData.service_ids.includes(service.service_id);
                const Icon = getIcon(service.name);
                return (
                  <div key={service.service_id} onClick={() => toggleService(service)}
                    className="p-4 rounded-xl cursor-pointer transition-all"
                    style={{
                      background: isSelected ? 'rgba(10,132,255,0.12)' : '#2A2A2A',
                      border: `2px solid ${isSelected ? '#0A84FF' : '#374151'}`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: isSelected ? 'rgba(10,132,255,0.2)' : '#1E1E1E' }}>
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-[#0A84FF]' : 'text-gray-500'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-white text-sm">{service.name}</h3>
                          <span className="text-[#0A84FF] font-bold text-sm">${service.base_price}</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">{service.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {services.length === 0 && <p className="text-gray-500 col-span-2 text-center py-8">No services available.</p>}
            </div>
            {bookingData.service_ids.length > 0 && (
              <div className="flex justify-between items-center mb-4 p-3 rounded-lg" style={{ background: 'rgba(10,132,255,0.08)', border: '1px solid rgba(10,132,255,0.2)' }}>
                <span className="text-sm text-gray-300">{bookingData.service_ids.length} service(s) selected</span>
                <span className="font-bold text-[#0A84FF]">Total: ${bookingData.total_price}</span>
              </div>
            )}
            <div className="flex justify-end">
              <button onClick={handleNext} disabled={bookingData.service_ids.length === 0} className="btn-primary flex items-center gap-2 px-6 py-2.5">
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Vehicles */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Select Your Vehicle</h2>
            {vehicles.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1E90FF]/20 to-[#00E5FF]/20 flex items-center justify-center mx-auto mb-6">
                  <Car className="h-10 w-10 text-[#00E5FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>No Vehicles Found</h3>
                <p className="text-secondary mb-6 max-w-md mx-auto">You need to add a vehicle before booking a service.</p>
                <button 
                  onClick={() => navigate('/dashboard/vehicles')} 
                  className="btn-premium btn-premium-primary"
                >
                  <Plus className="h-5 w-5" /> Add Your First Vehicle
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {vehicles.map(vehicle => {
                    const isSelected = bookingData.vehicle_id === vehicle.vehicle_id;
                    return (
                      <div key={vehicle.vehicle_id} onClick={() => { setBookingData(p => ({...p, vehicle_id: vehicle.vehicle_id})); handleNext(); }}
                        className="p-4 rounded-xl cursor-pointer transition-all"
                        style={{ background: isSelected ? 'rgba(10,132,255,0.12)' : '#2A2A2A', border: `2px solid ${isSelected ? '#0A84FF' : '#374151'}` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#1E1E1E' }}>
                            <Car className="h-5 w-5 text-[#0A84FF]" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white">{vehicle.make} {vehicle.model}</h3>
                            <p className="text-gray-500 text-xs">{vehicle.year} • {vehicle.registration_number}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button onClick={handleBack} className="text-gray-500 hover:text-gray-300 text-sm font-medium transition">← Back</button>
              </>
            )}
          </div>
        )}

        {/* Step 3: Schedule */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Select Date & Time</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Preferred Date</label>
                  <input type="date" required style={inputStyle} value={bookingData.booking_date}
                    onChange={e => setBookingData(p => ({...p, booking_date: e.target.value}))}
                    min={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Preferred Time</label>
                  <input type="time" required style={inputStyle} value={bookingData.booking_time}
                    onChange={e => setBookingData(p => ({...p, booking_time: e.target.value}))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Additional Notes (Optional)</label>
                <textarea rows={3} style={{...inputStyle, resize: 'none'}} value={bookingData.notes}
                  onChange={e => setBookingData(p => ({...p, notes: e.target.value}))}
                  placeholder="Any specific issues or requests?" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <button type="button" onClick={handleBack} className="text-gray-500 hover:text-gray-300 text-sm font-medium transition">← Back</button>
                <button type="submit" className="btn-primary flex items-center gap-2 px-6 py-2.5">
                  Continue <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Review & Confirm</h2>
            <div className="rounded-xl p-5 mb-6 space-y-3" style={{ background: '#2A2A2A', border: '1px solid #374151' }}>
              <h3 className="font-bold text-white pb-2" style={{ borderBottom: '1px solid #374151' }}>Order Summary</h3>
              <div>
                <p className="text-xs text-gray-500 mb-2">Services</p>
                {selectedServices.map(s => (
                  <div key={s.service_id} className="flex justify-between text-sm py-1">
                    <span className="text-gray-300">{s.name}</span>
                    <span className="text-white font-medium">${s.base_price}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm pt-2" style={{ borderTop: '1px solid #374151' }}>
                <span className="text-gray-400">Vehicle</span>
                <span className="text-white">{selectedVehicle?.make} {selectedVehicle?.model}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Date & Time</span>
                <span className="text-white">{bookingData.booking_date} at {bookingData.booking_time}</span>
              </div>
              {bookingData.notes && (
                <div className="text-sm pt-2" style={{ borderTop: '1px solid #374151' }}>
                  <span className="text-gray-400">Notes: </span><span className="text-gray-300">{bookingData.notes}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid #374151' }}>
                <span className="font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-[#0A84FF]">${bookingData.total_price}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button onClick={handleBack} className="text-gray-500 hover:text-gray-300 text-sm font-medium transition">← Back</button>
              <button onClick={handlePayment} disabled={bookingLoading} className="btn-accent flex items-center gap-2 px-8 py-3 text-base font-bold">
                {bookingLoading ? 'Processing...' : `Confirm & Pay $${bookingData.total_price}`}
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(74,222,128,0.15)' }}>
              <CheckCircle2 className="h-10 w-10 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Booking Confirmed!</h2>
            <p className="text-gray-400 mb-4">Your service has been scheduled successfully.</p>
            <p className="text-sm text-gray-600">Redirecting to your bookings...</p>
          </div>
        )}
      </div>
    </div>
  );
}
