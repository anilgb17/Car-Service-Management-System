import { useEffect, useState } from 'react';
import useAdminStore from '../../store/adminStore';
import { CalendarClock, Search, X } from 'lucide-react';
import BookingProgress from '../../components/BookingProgress';

export default function AdminBookings() {
  const { allBookings, fetchAllBookings, updateBookingStatus, isLoading } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => { fetchAllBookings(); }, [fetchAllBookings]);

  const filteredBookings = allBookings.filter(b =>
    b.customer?.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.customer?.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.booking_id.toString().includes(searchTerm)
  );

  const handleStatusUpdate = async () => {
    if (selectedBooking && newStatus) {
      await updateBookingStatus(selectedBooking.booking_id, newStatus);
      setSelectedBooking(null);
    }
  };

  const thCls = "px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left";
  const tdCls = "px-5 py-4";

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Bookings Management</h1>
          <p className="text-gray-400 mt-1">Manage and update customer service appointments.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input type="text" placeholder="Search by ID or name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2.5 text-sm rounded-lg outline-none w-full md:w-64"
            style={{ background: '#2A2A2A', border: '1.5px solid #374151', color: '#E5E7EB' }} />
        </div>
      </div>

      <div className="dark-card overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">Loading bookings...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarClock className="h-12 w-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No bookings found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead style={{ borderBottom: '1px solid #2D2D2D' }}>
                <tr>
                  <th className={thCls}>ID</th>
                  <th className={thCls}>Customer</th>
                  <th className={thCls}>Service & Vehicle</th>
                  <th className={thCls}>Schedule</th>
                  <th className={thCls}>Status</th>
                  <th className={`${thCls} text-right`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.booking_id} className="hover:bg-white/2 transition" style={{ borderBottom: '1px solid #1E1E1E' }}>
                    <td className={`${tdCls} text-gray-500 font-mono text-sm`}>#{booking.booking_id}</td>
                    <td className={tdCls}>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#0A84FF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {booking.customer?.first_name?.[0]}{booking.customer?.last_name?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{booking.customer?.first_name} {booking.customer?.last_name}</p>
                          <p className="text-xs text-gray-500">{booking.customer?.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className={tdCls}>
                      <p className="text-sm font-medium text-white">{booking.service?.name}</p>
                      <p className="text-xs text-gray-500">{booking.vehicle?.make} {booking.vehicle?.model}</p>
                    </td>
                    <td className={tdCls}>
                      <p className="text-sm text-white">{booking.booking_date}</p>
                      <p className="text-xs text-gray-500">{booking.booking_time}</p>
                    </td>
                    <td className={tdCls}><BookingProgress status={booking.status} /></td>
                    <td className={`${tdCls} text-right`}>
                      <button onClick={() => { setSelectedBooking(booking); setNewStatus(booking.status); }}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg transition"
                        style={{ background: 'rgba(10,132,255,0.12)', color: '#0A84FF', border: '1px solid rgba(10,132,255,0.2)' }}>
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#1E1E1E', border: '1px solid #2D2D2D' }}>
            <div className="flex justify-between items-center px-6 py-4" style={{ borderBottom: '1px solid #2D2D2D' }}>
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Manage Booking #{selectedBooking.booking_id}</h2>
              <button onClick={() => setSelectedBooking(null)} className="text-gray-500 hover:text-white transition"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="p-4 rounded-xl grid grid-cols-2 gap-3 text-sm" style={{ background: '#2A2A2A', border: '1px solid #374151' }}>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Customer</p>
                  <p className="font-bold text-white">{selectedBooking.customer?.first_name} {selectedBooking.customer?.last_name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Email</p>
                  <p className="text-gray-300 text-xs">{selectedBooking.customer?.email}</p>
                </div>
                <div className="col-span-2 pt-2" style={{ borderTop: '1px solid #374151' }}>
                  <p className="text-gray-500 text-xs mb-1">Notes</p>
                  <p className="text-gray-300">{selectedBooking.notes || 'No notes provided.'}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Update Status</label>
                <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                  style={{ background: '#2A2A2A', border: '1.5px solid #374151', color: '#E5E7EB' }}>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2" style={{ borderTop: '1px solid #2D2D2D' }}>
                <button onClick={() => setSelectedBooking(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition">Cancel</button>
                <button onClick={handleStatusUpdate} disabled={isLoading || newStatus === selectedBooking.status} className="btn-primary px-5 py-2 text-sm">
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
