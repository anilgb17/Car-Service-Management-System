import { useEffect, useState } from 'react';
import useAdminStore from '../../store/adminStore';
import { Search, UsersRound, Trash2 } from 'lucide-react';

export default function AdminCustomers() {
  const { allCustomers, fetchAllCustomers, deleteCustomer, isLoading } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchAllCustomers(); }, [fetchAllCustomers]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This will also delete all their bookings and vehicles.`)) {
      const success = await deleteCustomer(id);
      if (success) {
        alert(`${name} has been deleted successfully.`);
      } else {
        alert('Failed to delete customer. Please try again.');
      }
    }
  };

  const filteredCustomers = allCustomers.filter(c =>
    c.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const thCls = "px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left";
  const tdCls = "px-5 py-4";

  return (
    <div className="ac-enter">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Customer Directory</h1>
          <p className="text-gray-400 mt-1">View and manage registered customers.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="input-premium pl-9 pr-4 py-2.5 text-sm w-full md:w-72" />
        </div>
      </div>

      <div className="table-premium-container ac-fade-in">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="spinner-premium mx-auto mb-4"></div>
            <p className="text-secondary">Loading customers...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-12 text-center">
            <UsersRound className="h-12 w-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No customers found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-premium">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th className="text-center">Bookings</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={customer.user_id} className="ac-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <td>
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
                    <td>
                      <p className="text-sm text-white">{customer.email}</p>
                      <p className="text-xs text-gray-500">{customer.phone || 'N/A'}</p>
                    </td>
                    <td className="text-sm text-gray-400">
                      {customer.city ? `${customer.city}, ${customer.state || ''}` : 'Not provided'}
                    </td>
                    <td className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ background: 'rgba(10,132,255,0.12)', color: '#0A84FF' }}>
                        {customer.totalBookings}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${customer.status === 'Active' ? 'badge-completed' : 'badge-cancelled'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${customer.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`} />
                        {customer.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <button 
                        onClick={() => handleDelete(customer.user_id, `${customer.first_name} ${customer.last_name}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition font-medium text-sm"
                        title="Delete customer"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
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
