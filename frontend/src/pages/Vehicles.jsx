import { useEffect, useState } from 'react';
import useVehicleStore from '../store/vehicleStore';
import { Plus, Car, Trash2, X, Gauge, AlertCircle } from 'lucide-react';

export default function Vehicles() {
  const { vehicles, isLoading, error, fetchVehicles, addVehicle, deleteVehicle } = useVehicleStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ make: '', model: '', year: '', registration_number: '', color: '', mileage: '' });

  useEffect(() => { fetchVehicles(); }, [fetchVehicles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addVehicle(formData);
    if (success) { 
      setIsModalOpen(false); 
      setFormData({ make: '', model: '', year: '', registration_number: '', color: '', mileage: '' }); 
    }
  };

  const handleDelete = async (vehicleId, vehicleName) => {
    if (window.confirm(`Are you sure you want to delete ${vehicleName}? This action cannot be undone.`)) {
      await deleteVehicle(vehicleId);
    }
  };

  return (
    <div className="ac-enter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            My <span className="gradient-text">Vehicles</span>
          </h1>
          <p className="text-secondary text-lg">Manage your registered vehicles.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-premium btn-premium-primary">
          <Plus className="h-5 w-5" /> Add Vehicle
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {isLoading && vehicles.length === 0 ? (
        <div className="text-center py-12">
          <div className="spinner-premium mx-auto mb-4"></div>
          <p className="text-secondary">Loading your vehicles...</p>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1E90FF]/20 to-[#00E5FF]/20 flex items-center justify-center mx-auto mb-6">
            <Car className="h-10 w-10 text-[#00E5FF]" />
          </div>
          <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>No vehicles yet</h3>
          <p className="text-secondary mb-6 max-w-md mx-auto">Add your first vehicle to start booking services and track maintenance history.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn-premium btn-premium-primary">
            <Plus className="h-5 w-5" /> Add Your First Vehicle
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle, index) => (
            <div 
              key={vehicle.vehicle_id} 
              className="card-premium overflow-hidden ac-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card header with gradient */}
              <div className="h-32 relative flex items-center justify-center bg-gradient-to-br from-[#1E90FF]/20 to-[#00E5FF]/10">
                <Car className="h-20 w-20 text-[#00E5FF] opacity-40" />
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={() => handleDelete(vehicle.vehicle_id, `${vehicle.make} ${vehicle.model}`)} 
                    className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-300"
                    title="Delete vehicle"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-secondary text-sm mb-5">
                  {vehicle.year} • <span style={{ color: vehicle.color?.toLowerCase() === 'white' ? '#A0A0A8' : vehicle.color?.toLowerCase() }}>{vehicle.color || 'N/A'}</span>
                </p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-secondary">Registration</span>
                    <span className="font-mono font-semibold text-[#00E5FF]">{vehicle.registration_number}</span>
                  </div>
                  <div className="flex justify-between py-2 items-center">
                    <span className="text-secondary flex items-center gap-2">
                      <Gauge className="h-4 w-4" /> Mileage
                    </span>
                    <span className="font-semibold">{vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Vehicle Modal - Premium */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ac-fade-in" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-md card-glass overflow-hidden shadow-2xl ac-scale-in">
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Add New Vehicle
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-secondary hover:text-white transition p-2 hover:bg-white/5 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Make</label>
                  <input 
                    required 
                    type="text" 
                    className="input-premium" 
                    value={formData.make} 
                    onChange={e => setFormData({...formData, make: e.target.value})} 
                    placeholder="Toyota" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Model</label>
                  <input 
                    required 
                    type="text" 
                    className="input-premium" 
                    value={formData.model} 
                    onChange={e => setFormData({...formData, model: e.target.value})} 
                    placeholder="Camry" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Year</label>
                  <input 
                    required 
                    type="number" 
                    className="input-premium" 
                    value={formData.year} 
                    onChange={e => setFormData({...formData, year: e.target.value})} 
                    placeholder="2020" 
                    min="1900"
                    max={new Date().getFullYear() + 1}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Color</label>
                  <input 
                    type="text" 
                    className="input-premium" 
                    value={formData.color} 
                    onChange={e => setFormData({...formData, color: e.target.value})} 
                    placeholder="Black" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Registration Number</label>
                <input 
                  required 
                  type="text" 
                  className="input-premium" 
                  value={formData.registration_number} 
                  onChange={e => setFormData({...formData, registration_number: e.target.value})} 
                  placeholder="ABC-1234" 
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Mileage (km)</label>
                <input 
                  type="number" 
                  className="input-premium" 
                  value={formData.mileage} 
                  onChange={e => setFormData({...formData, mileage: e.target.value})} 
                  placeholder="45000" 
                  min="0"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="btn-premium btn-premium-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="btn-premium btn-premium-primary"
                >
                  {isLoading ? (
                    <>
                      <div className="spinner-premium" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Save Vehicle
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
