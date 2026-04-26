import { useEffect, useState } from 'react';
import useAdminStore from '../../store/adminStore';
import { Wrench, Plus, Edit2, Trash2, X, Clock, DollarSign } from 'lucide-react';

export default function AdminServices() {
  const { allServices, fetchAllServices, createService, updateService, deleteService, isLoading } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', description: '', base_price: '', duration_minutes: '' });

  useEffect(() => { fetchAllServices(); }, [fetchAllServices]);

  const handleOpenModal = (service = null) => {
    if (service) { setEditingService(service); setFormData({ name: service.name, category: service.category, description: service.description, base_price: service.base_price, duration_minutes: service.duration_minutes }); }
    else { setEditingService(null); setFormData({ name: '', category: '', description: '', base_price: '', duration_minutes: '' }); }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, base_price: parseFloat(formData.base_price), duration_minutes: parseInt(formData.duration_minutes) };
    const success = editingService ? await updateService(editingService.service_id, data) : await createService(data);
    if (success) setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this service?')) await deleteService(id);
  };

  const CATEGORY_COLORS = { Maintenance: '#0A84FF', Repair: '#FF6B00', Diagnostics: '#A78BFA', Tires: '#4ADE80', Electrical: '#FCD34D', Other: '#6B7280' };

  return (
    <div className="ac-enter">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Services Management</h1>
          <p className="text-gray-400 mt-1">Configure the services offered to customers.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-premium btn-premium-primary">
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      <div className="table-premium-container ac-fade-in">
        {isLoading && allServices.length === 0 ? (
          <div className="p-12 text-center">
            <div className="spinner-premium mx-auto mb-4"></div>
            <p className="text-secondary">Loading services...</p>
          </div>
        ) : allServices.length === 0 ? (
          <div className="p-12 text-center">
            <Wrench className="h-12 w-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No services configured yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-premium">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allServices.map((service, index) => (
                  <tr key={service.service_id} className="ac-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(10,132,255,0.12)' }}>
                          <Wrench className="h-4 w-4 text-[#0A84FF]" />
                        </div>
                        <span className="font-bold text-white">{service.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: `${CATEGORY_COLORS[service.category] || '#6B7280'}18`, color: CATEGORY_COLORS[service.category] || '#6B7280', border: `1px solid ${CATEGORY_COLORS[service.category] || '#6B7280'}33` }}>
                        {service.category}
                      </span>
                    </td>
                    <td className="text-sm text-gray-400 max-w-xs truncate">{service.description}</td>
                    <td>
                      <span className="font-bold text-white flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-[#4ADE80]" />{service.base_price}</span>
                    </td>
                    <td>
                      <span className="text-sm text-gray-400 flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{service.duration_minutes} min</span>
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => handleOpenModal(service)} className="p-2 rounded-lg text-[#0A84FF] hover:bg-blue-500/10 transition"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(service.service_id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ac-fade-in" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-md card-glass overflow-hidden shadow-2xl ac-scale-in">
            <div className="flex justify-between items-center px-6 py-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Service Name</label>
                <input required type="text" className="input-premium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Brake Inspection" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Category</label>
                <select required className="input-premium" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="">Select Category</option>
                  {['Maintenance','Repair','Diagnostics','Tires','Electrical','Other'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Description</label>
                <textarea required rows={3} className="input-premium" style={{ resize: 'none' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the service..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Base Price ($)</label>
                  <input required type="number" step="0.01" className="input-premium" value={formData.base_price} onChange={e => setFormData({...formData, base_price: e.target.value})} placeholder="49.99" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Duration (mins)</label>
                  <input required type="number" className="input-premium" value={formData.duration_minutes} onChange={e => setFormData({...formData, duration_minutes: e.target.value})} placeholder="60" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-premium btn-premium-secondary">Cancel</button>
                <button type="submit" disabled={isLoading} className="btn-premium btn-premium-primary">
                  {isLoading ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
