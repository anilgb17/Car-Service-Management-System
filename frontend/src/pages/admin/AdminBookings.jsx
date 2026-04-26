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
    <div className="ac-enter">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Bookings Management</h1>
          <p className="text-gray-400 mt-1">Manage and update customer service appointments.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input type="text" placeholder="Search by ID or name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2.5 text-sm rounded-lg outline-none w-full md:w-64 input-premium" />
        </div>
      </div>

      <div className="table-premium-container ac-fade-in">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="spinner-premium mx-auto mb-4"></div>
            <p className="text-secondary">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarClock className="h-12 w-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No bookings found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-premium">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Service & Vehicle</th>
                  <th>Schedule</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr key={booking.booking_id} className="ac-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <td className="text-gray-500 font-mono text-sm">#{booking.booking_id}</td>
                    <td>
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
                    <td>
                      <p className="text-sm font-medium text-white">{booking.service?.name}</p>
                      <p className="text-xs text-gray-500">{booking.vehicle?.make} {booking.vehicle?.model}</p>
                    </td>
                    <td>
                      <p className="text-sm text-white">{booking.booking_date}</p>
                      <p className="text-xs text-gray-500">{booking.booking_time}</p>
                    </td>
                    <td><BookingProgress status={booking.status} /></td>
                    <td className="text-right">
                      <button onClick={() => { setSelectedBooking(booking); setNewStatus(booking.status); }}
                        className="btn-premium btn-premium-secondary text-xs">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ac-fade-in" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-lg card-glass overflow-hidden shadow-2xl ac-scale-in">
            <div className="flex justify-between items-center px-6 py-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Manage Booking #{selectedBooking.booking_id}</h2>
              <button onClick={() => setSelectedBooking(null)} className="text-gray-500 hover:text-white transition"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="p-4 rounded-xl grid grid-cols-2 gap-3 text-sm" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Customer</p>
                  <p className="font-bold text-white">{selectedBooking.customer?.first_name} {selectedBooking.customer?.last_name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Email</p>
                  <p className="text-gray-300 text-xs">{selectedBooking.customer?.email}</p>
                </div>
                <div className="col-span-2 pt-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <p className="text-gray-500 text-xs mb-1">Notes</p>
                  <p className="text-gray-300">{selectedBooking.notes || 'No notes provided.'}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Update Status</label>
                <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
                  className="input-premium w-full">
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <button onClick={() => setSelectedBooking(null)} className="btn-premium btn-premium-secondary">Cancel</button>
                <button onClick={handleStatusUpdate} disabled={isLoading || newStatus === selectedBooking.status} className="btn-premium btn-premium-primary">
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
