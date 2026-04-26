import { useEffect, useState } from 'react';
import useAdminStore from '../../store/adminStore';
import { UsersRound, Plus, Trash2, X, Mail, Phone } from 'lucide-react';

export default function AdminStaff() {
  const { allStaff, fetchAllStaff, createStaff, deleteStaff, isLoading } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', phone: '', role: 'Mechanic' });

  useEffect(() => { fetchAllStaff(); }, [fetchAllStaff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createStaff(formData);
    if (success) { setIsModalOpen(false); setFormData({ first_name: '', last_name: '', email: '', phone: '', role: 'Mechanic' }); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this staff member?')) await deleteStaff(id);
  };

  const ROLE_COLORS = { Manager: '#A78BFA', 'Service Advisor': '#0A84FF', Mechanic: '#4ADE80' };
  const inputStyle = { background: '#2A2A2A', border: '1.5px solid #374151', color: '#E5E7EB', borderRadius: '8px', padding: '10px 14px', outline: 'none', width: '100%' };

  return (
    <div className="ac-enter">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Staff Management</h1>
          <p className="text-gray-400 mt-1">Manage service center employees and roles.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-premium btn-premium-primary">
          <Plus className="h-4 w-4" /> Add Staff
        </button>
      </div>

      {isLoading && allStaff.length === 0 ? (
        <div className="p-12 text-center">
          <div className="spinner-premium mx-auto mb-4"></div>
          <p className="text-secondary">Loading staff...</p>
        </div>
      ) : allStaff.length === 0 ? (
        <div className="card-premium p-12 text-center ac-fade-in">
          <UsersRound className="h-12 w-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500">No staff members found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allStaff.map((staff, index) => {
            const roleColor = ROLE_COLORS[staff.role] || '#6B7280';
            return (
              <div key={staff.user_id} className="card-premium p-5 ac-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: `${roleColor}22`, border: `2px solid ${roleColor}44`, color: roleColor }}>
                      {staff.first_name[0]}{staff.last_name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{staff.first_name} {staff.last_name}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold mt-0.5" style={{ background: `${roleColor}18`, color: roleColor, border: `1px solid ${roleColor}33` }}>
                        {staff.role}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(staff.user_id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail className="h-3.5 w-3.5 text-gray-600" /> {staff.email}
                  </div>
                  {staff.phone && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Phone className="h-3.5 w-3.5 text-gray-600" /> {staff.phone}
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span className="text-xs text-gray-600">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Active
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ac-fade-in" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-md card-glass overflow-hidden shadow-2xl ac-scale-in">
            <div className="flex justify-between items-center px-6 py-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Add Staff Member</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">First Name</label>
                  <input required type="text" className="input-premium" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Last Name</label>
                  <input required type="text" className="input-premium" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
                <input required type="email" className="input-premium" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Phone</label>
                <input required type="tel" className="input-premium" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Role</label>
                <select required className="input-premium" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Service Advisor">Service Advisor</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <p className="text-xs text-gray-600">Default password: "password123"</p>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-premium btn-premium-secondary">Cancel</button>
                <button type="submit" disabled={isLoading} className="btn-premium btn-premium-primary">
                  {isLoading ? 'Saving...' : 'Add Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
