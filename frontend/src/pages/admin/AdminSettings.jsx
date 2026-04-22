import { Save, Building2, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function AdminSettings() {
  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-['Outfit']">System Settings</h1>
        <p className="text-gray-600 mt-1">Configure your business profile and preferences.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900 font-['Outfit'] flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" /> Business Profile
          </h2>
        </div>
        
        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-8">
          {/* General Information */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">General Information</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name</label>
                <input type="text" defaultValue="AutoCare Elite" className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID / Registration</label>
                <input type="text" defaultValue="TAX-987654321" className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Contact Details</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Phone className="h-4 w-4" /> Primary Phone</label>
                <input type="text" defaultValue="(555) 123-4567" className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Mail className="h-4 w-4" /> Support Email</label>
                <input type="email" defaultValue="support@autocare-elite.com" className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><MapPin className="h-4 w-4" /> Physical Address</label>
                <textarea rows={2} defaultValue="123 Mechanic Lane, Auto City, CA 90210" className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Business Hours</h3>
            <div className="bg-gray-50 p-4 rounded-xl space-y-3">
              {['Monday - Friday', 'Saturday', 'Sunday'].map((day, idx) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 flex items-center gap-2"><Clock className="h-4 w-4 text-gray-400" /> {day}</span>
                  <div className="flex items-center gap-2">
                    <input type="time" defaultValue={idx === 2 ? "" : "08:00"} disabled={idx === 2} className="rounded-lg border border-gray-300 px-2 py-1 text-sm bg-white" />
                    <span className="text-gray-500">to</span>
                    <input type="time" defaultValue={idx === 2 ? "" : (idx === 1 ? "14:00" : "18:00")} disabled={idx === 2} className="rounded-lg border border-gray-300 px-2 py-1 text-sm bg-white" />
                  </div>
                </div>
              ))}
              <div className="text-xs text-red-500 mt-2">* Sunday is marked as Closed</div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition flex items-center gap-2">
              <Save className="h-5 w-5" /> Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
