import { useState } from 'react';
import useAuthStore from '../store/authStore';
import { Save, User, Lock, MapPin, Mail, Phone } from 'lucide-react';
// Note: backgroundMode utility removed — dark theme is global

export default function UserSettings() {
  const { user } = useAuthStore();
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || '', last_name: user?.last_name || '',
    email: user?.email || '', phone: user?.phone || '',
    city: user?.city || '', state: user?.state || '',
  });

  const handleSaveProfile = (e) => { e.preventDefault(); alert('Profile updated! (Mock)'); };
  const handleSavePassword = (e) => { e.preventDefault(); alert('Password updated! (Mock)'); };

  const inputStyle = { background: '#2A2A2A', border: '1.5px solid #374151', color: '#E5E7EB', borderRadius: '8px', padding: '10px 14px', outline: 'none', width: '100%' };
  const disabledStyle = { ...inputStyle, background: '#1E1E1E', color: '#6B7280', cursor: 'not-allowed' };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Account Settings</h1>
        <p className="text-gray-400 mt-1">Manage your personal information and security.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile */}
          <div className="dark-card overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid #2D2D2D', background: '#1A1A1A' }}>
              <User className="h-4 w-4 text-[#0A84FF]" />
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Personal Information</h2>
            </div>
            <form onSubmit={handleSaveProfile} className="p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">First Name</label>
                  <input type="text" required style={inputStyle} value={profileData.first_name} onChange={e => setProfileData({...profileData, first_name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Last Name</label>
                  <input type="text" required style={inputStyle} value={profileData.last_name} onChange={e => setProfileData({...profileData, last_name: e.target.value})} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1"><Mail className="h-3 w-3" /> Email</label>
                  <input type="email" style={disabledStyle} value={profileData.email} disabled />
                  <p className="text-xs text-gray-600 mt-1">Email cannot be changed.</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</label>
                  <input type="tel" style={inputStyle} value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1"><MapPin className="h-3 w-3" /> City</label>
                  <input type="text" style={inputStyle} value={profileData.city} onChange={e => setProfileData({...profileData, city: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">State</label>
                  <input type="text" style={inputStyle} value={profileData.state} onChange={e => setProfileData({...profileData, state: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end pt-2" style={{ borderTop: '1px solid #2D2D2D' }}>
                <button type="submit" className="btn-primary flex items-center gap-2 px-5 py-2.5">
                  <Save className="h-4 w-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Password */}
          <div className="dark-card overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid #2D2D2D', background: '#1A1A1A' }}>
              <Lock className="h-4 w-4 text-gray-400" />
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Change Password</h2>
            </div>
            <form onSubmit={handleSavePassword} className="p-6 space-y-4">
              {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => (
                <div key={i}>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
                  <input type="password" required style={{ ...inputStyle, maxWidth: '400px' }} />
                </div>
              ))}
              <div className="flex justify-start pt-2" style={{ borderTop: '1px solid #2D2D2D' }}>
                <button type="submit" className="px-5 py-2.5 text-sm font-medium rounded-lg transition" style={{ background: '#2A2A2A', border: '1px solid #374151', color: '#E5E7EB' }}>
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Avatar card */}
          <div className="dark-card p-6 text-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #0A84FF, #0066CC)', boxShadow: '0 8px 24px rgba(10,132,255,0.3)' }}>
              {profileData.first_name[0]}{profileData.last_name[0]}
            </div>
            <h3 className="text-lg font-bold text-white">{profileData.first_name} {profileData.last_name}</h3>
            <p className="text-[#0A84FF] text-sm mt-0.5">{profileData.email}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mt-3" style={{ background: 'rgba(10,132,255,0.12)', color: '#0A84FF', border: '1px solid rgba(10,132,255,0.2)' }}>
              {user?.role || 'Customer'}
            </span>
          </div>

          {/* Help */}
          <div className="dark-card p-5" style={{ borderLeft: '3px solid #0A84FF' }}>
            <h3 className="font-bold text-white mb-2">Need Help?</h3>
            <p className="text-sm text-gray-400 mb-3">Contact our support team for assistance with your account.</p>
            <a href="mailto:support@autocare.com" className="text-sm font-bold text-[#0A84FF] hover:underline">support@autocare.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
