import { useEffect, useState } from 'react';
import useVehicleStore from '../store/vehicleStore';
import { Plus, Car, Trash2, X } from 'lucide-react';

export default function Vehicles() {
  const { vehicles, isLoading, fetchVehicles, addVehicle, deleteVehicle } = useVehicleStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    make: '', model: '', year: '', registration_number: '', color: '', mileage: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addVehicle(formData);
    if (success) {
      setIsModalOpen(false);
      setFormData({ make: '', model: '', year: '', registration_number: '', color: '', mileage: '' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-['Outfit']">My Vehicles</h1>
          <p className="text-gray-600 mt-1">Manage your registered vehicles.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
        >
          <Plus className="h-5 w-5" /> Add Vehicle
        </button>
      </div>

      {isLoading && vehicles.length === 0 ? (
        <div className="text-center py-10">Loading vehicles...</div>
      ) : vehicles.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found</h3>
          <p className="text-gray-600 mb-6">Add your first vehicle to start booking services.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition inline-flex items-center gap-2"
          >
            <Plus className="h-5 w-5" /> Add New Vehicle
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.vehicle_id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="h-32 bg-gradient-to-r from-blue-500 to-cyan-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="h-16 w-16 text-white opacity-50" />
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{vehicle.make} {vehicle.model}</h3>
                    <p className="text-gray-500">{vehicle.year} • {vehicle.color}</p>
                  </div>
                  <button 
                    onClick={() => deleteVehicle(vehicle.vehicle_id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Registration</span>
                    <span className="font-medium font-mono">{vehicle.registration_number}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span>Mileage</span>
                    <span className="font-medium">{vehicle.mileage ? `${vehicle.mileage} km` : 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 font-['Outfit']">Add New Vehicle</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                  <input required type="text" className="w-full rounded-lg border-gray-300 border px-3 py-2 focus:border-blue-500 outline-none" value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} placeholder="e.g. Toyota" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input required type="text" className="w-full rounded-lg border-gray-300 border px-3 py-2 focus:border-blue-500 outline-none" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} placeholder="e.g. Camry" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input required type="number" className="w-full rounded-lg border-gray-300 border px-3 py-2 focus:border-blue-500 outline-none" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="2020" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <input type="text" className="w-full rounded-lg border-gray-300 border px-3 py-2 focus:border-blue-500 outline-none" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} placeholder="Black" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                <input required type="text" className="w-full rounded-lg border-gray-300 border px-3 py-2 focus:border-blue-500 outline-none" value={formData.registration_number} onChange={e => setFormData({...formData, registration_number: e.target.value})} placeholder="ABC-1234" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mileage (km)</label>
                <input type="number" className="w-full rounded-lg border-gray-300 border px-3 py-2 focus:border-blue-500 outline-none" value={formData.mileage} onChange={e => setFormData({...formData, mileage: e.target.value})} placeholder="45000" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">Cancel</button>
                <button type="submit" disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition disabled:opacity-70">
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
