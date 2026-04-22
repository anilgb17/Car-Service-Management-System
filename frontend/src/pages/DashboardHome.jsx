import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useBookingStore from '../store/bookingStore';
import { CalendarClock, CheckCircle2, DollarSign, Star, ChevronRight, Plus } from 'lucide-react';
import BookingProgress from '../components/BookingProgress';

export default function DashboardHome() {
  const { user } = useAuthStore();
  const { bookings, fetchBookings, isLoading } = useBookingStore();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'In Progress');
  const completedBookings = bookings.filter(b => b.status === 'Completed');
  const totalSpent = completedBookings.reduce((sum, b) => sum + parseFloat(b.total_price), 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-['Outfit']">Welcome back, {user?.first_name}</h1>
          <p className="text-gray-600 mt-1">Here is an overview of your account.</p>
        </div>
        <Link 
          to="/dashboard/book-service"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-blue-200 transition flex items-center gap-2"
        >
          <Plus className="h-5 w-5" /> Book New Service
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <CalendarClock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Upcoming Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{upcomingBookings.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Completed Services</p>
            <p className="text-2xl font-bold text-gray-900">{completedBookings.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center">
            <Star className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Loyalty Points</p>
            <p className="text-2xl font-bold text-gray-900">{user?.loyalty_points || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 font-['Outfit']">Recent Bookings</h2>
          <Link to="/dashboard/bookings" className="text-blue-600 text-sm font-medium hover:underline flex items-center">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">You have no recent bookings.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm">
                  <th className="px-6 py-4 font-medium">Service</th>
                  <th className="px-6 py-4 font-medium">Vehicle</th>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.slice(0, 3).map((booking) => (
                  <tr key={booking.booking_id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{booking.service?.name}</td>
                    <td className="px-6 py-4 text-gray-600">{booking.vehicle?.make} {booking.vehicle?.model}</td>
                    <td className="px-6 py-4 text-gray-600">{booking.booking_date} <span className="text-gray-400 text-sm">{booking.booking_time}</span></td>
                    <td className="px-6 py-4">
                      <BookingProgress status={booking.status} />
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
