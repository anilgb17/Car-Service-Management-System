import { Save, Building2, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function AdminSettings() {
  const handleSave = (e) => { e.preventDefault(); alert('Settings saved!'); };

  const inputStyle = { background: '#2A2A2A', border: '1.5px solid #374151', color: '#E5E7EB', borderRadius: '8px', padding: '10px 14px', outline: 'none', width: '100%' };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>System Settings</h1>
        <p className="text-gray-400 mt-1">Configure your business profile and preferences.</p>
      </div>

      <div className="dark-card overflow-hidden">
        <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid #2D2D2D', background: '#1A1A1A' }}>
          <Building2 className="h-4 w-4 text-[#FF6B00]" />
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Business Profile</h2>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-8">
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pb-2" style={{ borderBottom: '1px solid #2D2D2D' }}>General Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Shop Name</label>
                <input type="text" defaultValue="AutoCare Elite" style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Tax ID / Registration</label>
                <input type="text" defaultValue="TAX-987654321" style={inputStyle} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pb-2" style={{ borderBottom: '1px solid #2D2D2D' }}>Contact Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</label>
                <input type="text" defaultValue="(555) 123-4567" style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1"><Mail className="h-3 w-3" /> Support Email</label>
                <input type="email" defaultValue="support@autocare.com" style={inputStyle} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1"><MapPin className="h-3 w-3" /> Address</label>
                <textarea rows={2} defaultValue="123 Mechanic Lane, Auto City, CA 90210" style={{ ...inputStyle, resize: 'none' }} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pb-2" style={{ borderBottom: '1px solid #2D2D2D' }}>Business Hours</h3>
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#2A2A2A', border: '1px solid #374151' }}>
              {[['Monday - Friday', '08:00', '18:00'], ['Saturday', '08:00', '14:00'], ['Sunday', '', '']].map(([day, open, close], idx) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300 flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-gray-600" />{day}</span>
                  <div className="flex items-center gap-2">
                    {idx === 2 ? (
                      <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(248,113,113,0.12)', color: '#F87171' }}>Closed</span>
                    ) : (
                      <>
                        <input type="time" defaultValue={open} className="rounded-lg px-2 py-1 text-sm outline-none" style={{ background: '#1E1E1E', border: '1px solid #374151', color: '#E5E7EB' }} />
                        <span className="text-gray-600 text-xs">to</span>
                        <input type="time" defaultValue={close} className="rounded-lg px-2 py-1 text-sm outline-none" style={{ background: '#1E1E1E', border: '1px solid #374151', color: '#E5E7EB' }} />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2" style={{ borderTop: '1px solid #2D2D2D' }}>
            <button type="submit" className="btn-primary flex items-center gap-2 px-6 py-2.5">
              <Save className="h-4 w-4" /> Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
