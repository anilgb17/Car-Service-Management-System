import { useEffect, useState } from 'react';
import useVehicleStore from '../store/vehicleStore';
import { Plus, Car, Trash2, X, Gauge } from 'lucide-react';

export default function Vehicles() {
  const { vehicles, isLoading, fetchVehicles, addVehicle, deleteVehicle } = useVehicleStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ make: '', model: '', year: '', registration_number: '', color: '', mileage: '' });

  useEffect(() => { fetchVehicles(); }, [fetchVehicles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addVehicle(formData);
    if (success) { setIsModalOpen(false); setFormData({ make: '', model: '', year: '', registration_number: '', color: '', mileage: '' }); }
  };

  const inputCls = "w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-all";
  const inputStyle = { background: '#2A2A2A', border: '1.5px solid #374151', color: '#E5E7EB' };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>My Vehicles</h1>
          <p className="text-gray-400 mt-1">Manage your registered vehicles.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2 px-5 py-2.5">
          <Plus className="h-4 w-4" /> Add Vehicle
        </button>
      </div>

      {isLoading && vehicles.length === 0 ? (
        <div className="text-center py-10 text-gray-500">Loading vehicles...</div>
      ) : vehicles.length === 0 ? (
        <div className="dark-card p-12 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(10,132,255,0.12)' }}>
            <Car className="h-8 w-8 text-[#0A84FF]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No vehicles yet</h3>
          <p className="text-gray-400 mb-6">Add your first vehicle to start booking services.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary inline-flex items-center gap-2 px-6 py-2.5">
            <Plus className="h-4 w-4" /> Add Vehicle
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.map((vehicle) => (
            <div key={vehicle.vehicle_id} className="dark-card overflow-hidden">
              {/* Card header */}
              <div className="h-28 relative flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0A84FF22, #0A84FF08)' }}>
                <Car className="h-16 w-16 text-[#0A84FF] opacity-30" />
                <div className="absolute top-3 right-3">
                  <button onClick={() => deleteVehicle(vehicle.vehicle_id)} className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-0.5">{vehicle.make} {vehicle.model}</h3>
                <p className="text-gray-400 text-sm mb-4">{vehicle.year} • <span style={{ color: vehicle.color?.toLowerCase() === 'white' ? '#9CA3AF' : vehicle.color?.toLowerCase() }}>{vehicle.color || 'N/A'}</span></p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2" style={{ borderBottom: '1px solid #2D2D2D' }}>
                    <span className="text-gray-500">Registration</span>
                    <span className="font-mono font-medium text-white">{vehicle.registration_number}</span>
                  </div>
                  <div className="flex justify-between py-2 items-center">
                    <span className="text-gray-500 flex items-center gap-1"><Gauge className="h-3.5 w-3.5" /> Mileage</span>
                    <span className="font-medium text-white">{vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#1E1E1E', border: '1px solid #2D2D2D' }}>
            <div className="flex justify-between items-center px-6 py-4" style={{ borderBottom: '1px solid #2D2D2D' }}>
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Add New Vehicle</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Make</label>
                  <input required type="text" className={inputCls} style={inputStyle} value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} placeholder="Toyota" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Model</label>
                  <input required type="text" className={inputCls} style={inputStyle} value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} placeholder="Camry" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Year</label>
                  <input required type="number" className={inputCls} style={inputStyle} value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="2020" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Color</label>
                  <input type="text" className={inputCls} style={inputStyle} value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} placeholder="Black" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Registration Number</label>
                <input required type="text" className={inputCls} style={inputStyle} value={formData.registration_number} onChange={e => setFormData({...formData, registration_number: e.target.value})} placeholder="ABC-1234" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Mileage (km)</label>
                <input type="number" className={inputCls} style={inputStyle} value={formData.mileage} onChange={e => setFormData({...formData, mileage: e.target.value})} placeholder="45000" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition">Cancel</button>
                <button type="submit" disabled={isLoading} className="btn-primary px-5 py-2 text-sm">
                  {isLoading ? 'Saving...' : 'Save Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
