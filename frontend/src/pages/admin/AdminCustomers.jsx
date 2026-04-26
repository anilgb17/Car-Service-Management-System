import { useEffect, useState } from 'react';
import useAdminStore from '../../store/adminStore';
import { Search, UsersRound } from 'lucide-react';

export default function AdminCustomers() {
  const { allCustomers, fetchAllCustomers, isLoading } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchAllCustomers(); }, [fetchAllCustomers]);

  const filteredCustomers = allCustomers.filter(c =>
    c.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const thCls = "px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left";
  const tdCls = "px-5 py-4";

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Customer Directory</h1>
          <p className="text-gray-400 mt-1">View and manage registered customers.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2.5 text-sm rounded-lg outline-none w-full md:w-72"
            style={{ background: '#2A2A2A', border: '1.5px solid #374151', color: '#E5E7EB' }} />
        </div>
      </div>

      <div className="dark-card overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">Loading customers...</div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-12 text-center">
            <UsersRound className="h-12 w-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No customers found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead style={{ borderBottom: '1px solid #2D2D2D' }}>
                <tr>
                  <th className={thCls}>Customer</th>
                  <th className={thCls}>Contact</th>
                  <th className={thCls}>Location</th>
                  <th className={`${thCls} text-center`}>Bookings</th>
                  <th className={`${thCls} text-center`}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.user_id} className="hover:bg-white/2 transition" style={{ borderBottom: '1px solid #1E1E1E' }}>
                    <td className={tdCls}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0A84FF, #0066CC)' }}>
                          {customer.first_name[0]}{customer.last_name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{customer.first_name} {customer.last_name}</p>
                          <p className="text-xs text-gray-500">Joined {new Date(customer.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className={tdCls}>
                      <p className="text-sm text-white">{customer.email}</p>
                      <p className="text-xs text-gray-500">{customer.phone || 'N/A'}</p>
                    </td>
                    <td className={`${tdCls} text-sm text-gray-400`}>
                      {customer.city ? `${customer.city}, ${customer.state || ''}` : 'Not provided'}
                    </td>
                    <td className={`${tdCls} text-center`}>
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ background: 'rgba(10,132,255,0.12)', color: '#0A84FF' }}>
                        {customer.totalBookings}
                      </span>
                    </td>
                    <td className={`${tdCls} text-center`}>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${customer.status === 'Active' ? 'badge-completed' : 'badge-cancelled'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${customer.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`} />
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
