import { useState } from 'react';
import useAuthStore from '../store/authStore';
import { Save, User, Lock, MapPin, Mail, Phone } from 'lucide-react';

export default function UserSettings() {
  const { user } = useAuthStore();
  
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    state: user?.state || '',
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Profile updated successfully! (Mock)');
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    alert('Password updated successfully! (Mock)');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-['Outfit']">Account Settings</h1>
        <p className="text-gray-600 mt-1">Manage your personal information and security preferences.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Details Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
              <User className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900 font-['Outfit']">Personal Information</h2>
            </div>
            <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" required value={profileData.first_name} onChange={e => setProfileData({...profileData, first_name: e.target.value})} className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" required value={profileData.last_name} onChange={e => setProfileData({...profileData, last_name: e.target.value})} className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><Mail className="h-4 w-4 text-gray-400"/> Email Address</label>
                  <input type="email" required value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 text-gray-500 cursor-not-allowed" disabled />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><Phone className="h-4 w-4 text-gray-400"/> Phone Number</label>
                  <input type="tel" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><MapPin className="h-4 w-4 text-gray-400"/> City</label>
                  <input type="text" value={profileData.city} onChange={e => setProfileData({...profileData, city: e.target.value})} className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State / Province</label>
                  <input type="text" value={profileData.state} onChange={e => setProfileData({...profileData, state: e.target.value})} className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 transition flex items-center gap-2">
                  <Save className="h-5 w-5" /> Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
              <Lock className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900 font-['Outfit']">Change Password</h2>
            </div>
            <form onSubmit={handleSavePassword} className="p-6 sm:p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input type="password" required className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none max-w-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input type="password" required className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none max-w-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input type="password" required className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none max-w-md" />
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-start">
                <button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2.5 rounded-xl font-medium transition">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-center">
            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg shadow-blue-200">
              {profileData.first_name[0]}{profileData.last_name[0]}
            </div>
            <h3 className="text-lg font-bold text-gray-900">{profileData.first_name} {profileData.last_name}</h3>
            <p className="text-blue-600 text-sm font-medium mb-4">{profileData.email}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 uppercase tracking-wide">
              {user?.role || 'Customer'}
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-500 mb-4">If you need assistance updating your account or have issues with your profile, please contact our support team.</p>
            <a href="mailto:support@autocare.com" className="text-sm font-bold text-blue-600 hover:underline">support@autocare.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
