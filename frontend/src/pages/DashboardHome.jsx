import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useBookingStore from '../store/bookingStore';
import { CalendarClock, CheckCircle2, DollarSign, Star, ChevronRight, Plus, TrendingUp } from 'lucide-react';
import BookingProgress from '../components/BookingProgress';

export default function DashboardHome() {
  const { user } = useAuthStore();
  const { bookings, fetchBookings, isLoading } = useBookingStore();
  const [animatedValues, setAnimatedValues] = useState({ upcoming: 0, completed: 0, spent: 0, points: 0 });

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed');
  const inProgressBookings = bookings.filter(b => b.status === 'In Progress');
  const completedBookings = bookings.filter(b => b.status === 'Completed');
  const totalSpent = completedBookings.reduce((sum, b) => sum + parseFloat(b.total_price), 0);

  // Animate numbers on mount
  useEffect(() => {
    if (bookings.length > 0) {
      const duration = 1000;
      const steps = 30;
      const interval = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setAnimatedValues({
          upcoming: Math.floor(upcomingBookings.length * progress),
          completed: Math.floor(completedBookings.length * progress),
          spent: totalSpent * progress,
          points: Math.floor((user?.loyalty_points || 0) * progress)
        });
        
        if (step >= steps) clearInterval(timer);
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [bookings, upcomingBookings.length, completedBookings.length, totalSpent, user?.loyalty_points]);

  const cards = [
    { label: 'Upcoming Bookings', value: animatedValues.upcoming, icon: CalendarClock, gradient: 'from-[#1E90FF] to-[#00E5FF]' },
    { label: 'Completed Services', value: animatedValues.completed, icon: CheckCircle2, gradient: 'from-[#22C55E] to-[#16A34A]' },
    { label: 'Total Spent', value: `$${animatedValues.spent.toFixed(2)}`, icon: DollarSign, gradient: 'from-[#A78BFA] to-[#8B5CF6]' },
    { label: 'Loyalty Points', value: animatedValues.points, icon: Star, gradient: 'from-[#F59E0B] to-[#D97706]' },
  ];

  return (
    <div className="ac-enter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Welcome back, <span className="gradient-text">{user?.first_name}</span> 👋
          </h1>
          <p className="text-secondary text-lg">Here's an overview of your automotive services.</p>
        </div>
        <Link to="/dashboard/book-service" className="btn-premium btn-premium-primary">
          <Plus className="h-5 w-5" /> Book Service
        </Link>
      </div>

      {/* Premium KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div 
              key={i} 
              className="kpi-card-premium ac-scale-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-2">{card.label}</p>
                <p className="text-3xl font-bold count-up">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings - Premium Table */}
      <div className="table-premium-container ac-fade-in">
        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <div>
            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Recent Bookings
            </h2>
            <p className="text-secondary text-sm">Track your service history and upcoming appointments</p>
          </div>
          <Link 
            to="/dashboard/bookings" 
            className="btn-premium btn-premium-secondary text-sm"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="spinner-premium mx-auto mb-4"></div>
            <p className="text-secondary">Loading your bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1E90FF]/20 to-[#00E5FF]/20 flex items-center justify-center mx-auto mb-4">
              <CalendarClock className="h-10 w-10 text-[#00E5FF]" />
            </div>
            <p className="text-secondary text-lg mb-4">No bookings yet</p>
            <Link to="/dashboard/book-service" className="btn-premium btn-premium-primary">
              <Plus className="h-4 w-4" /> Book Your First Service
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-premium">
              <thead>
                <tr>
                  {['Service', 'Vehicle', 'Date & Time', 'Status', 'Action'].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((booking, index) => (
                  <tr key={booking.booking_id} className="ac-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <td className="font-semibold">{booking.service?.name || 'N/A'}</td>
                    <td className="text-secondary">
                      {booking.vehicle?.make} {booking.vehicle?.model}
                      <div className="text-xs text-muted mt-1">{booking.vehicle?.license_plate}</div>
                    </td>
                    <td className="text-secondary">
                      {booking.booking_date}
                      <div className="text-xs text-muted mt-1">{booking.booking_time}</div>
                    </td>
                    <td><BookingProgress status={booking.status} /></td>
                    <td>
                      <Link 
                        to="/dashboard/bookings" 
                        className="text-[#00E5FF] hover:text-[#1E90FF] text-sm font-medium transition"
                      >
                        View Details →
                      </Link>
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
