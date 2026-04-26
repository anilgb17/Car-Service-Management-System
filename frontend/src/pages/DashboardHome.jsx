import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useBookingStore from '../store/bookingStore';
import { CalendarClock, CheckCircle2, DollarSign, Star, ChevronRight, Plus } from 'lucide-react';
import BookingProgress from '../components/BookingProgress';

export default function DashboardHome() {
  const { user } = useAuthStore();
  const { bookings, fetchBookings, isLoading } = useBookingStore();

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'In Progress');
  const completedBookings = bookings.filter(b => b.status === 'Completed');
  const totalSpent = completedBookings.reduce((sum, b) => sum + parseFloat(b.total_price), 0);

  const cards = [
    { label: 'Upcoming Bookings', value: upcomingBookings.length, icon: CalendarClock, color: '#0A84FF', bg: 'rgba(10,132,255,0.12)' },
    { label: 'Completed Services', value: completedBookings.length, icon: CheckCircle2, color: '#4ADE80', bg: 'rgba(74,222,128,0.12)' },
    { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, icon: DollarSign, color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
    { label: 'Loyalty Points', value: user?.loyalty_points || 0, icon: Star, color: '#FF6B00', bg: 'rgba(255,107,0,0.12)' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Welcome back, {user?.first_name} 👋
          </h1>
          <p className="text-gray-400 mt-1">Here is an overview of your account.</p>
        </div>
        <Link to="/dashboard/book-service" className="btn-primary flex items-center gap-2 px-5 py-2.5">
          <Plus className="h-4 w-4" /> Book Service
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="dark-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: card.bg }}>
                <Icon className="h-6 w-6" style={{ color: card.color }} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{card.label}</p>
                <p className="text-2xl font-bold text-white">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="dark-card overflow-hidden">
        <div className="p-5 flex justify-between items-center" style={{ borderBottom: '1px solid #2D2D2D' }}>
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Recent Bookings</h2>
          <Link to="/dashboard/bookings" className="text-[#0A84FF] text-sm font-medium hover:text-blue-300 flex items-center gap-1 transition">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No recent bookings.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: '1px solid #2D2D2D' }}>
                  {['Service', 'Vehicle', 'Date & Time', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.booking_id} className="hover:bg-white/3 transition" style={{ borderBottom: '1px solid #1E1E1E' }}>
                    <td className="px-5 py-4 font-medium text-white">{booking.service?.name}</td>
                    <td className="px-5 py-4 text-gray-400">{booking.vehicle?.make} {booking.vehicle?.model}</td>
                    <td className="px-5 py-4 text-gray-400">{booking.booking_date} <span className="text-gray-600 text-xs">{booking.booking_time}</span></td>
                    <td className="px-5 py-4"><BookingProgress status={booking.status} /></td>
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
