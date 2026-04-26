import { useEffect } from 'react';
import useAdminStore from '../../store/adminStore';
import { DollarSign, Users, CalendarClock, CheckCircle2, TrendingUp, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import BookingProgress from '../../components/BookingProgress';

const mockRevenueData = [
  { name: 'Mon', revenue: 400 }, { name: 'Tue', revenue: 300 }, { name: 'Wed', revenue: 550 },
  { name: 'Thu', revenue: 450 }, { name: 'Fri', revenue: 700 }, { name: 'Sat', revenue: 900 }, { name: 'Sun', revenue: 650 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-sm" style={{ background: '#1E1E1E', border: '1px solid #374151', color: '#E5E7EB' }}>
        <p className="font-bold">{label}</p>
        <p className="text-[#0A84FF]">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const { dashboardData, fetchDashboardData, isLoading } = useAdminStore();

  useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);

  if (isLoading || !dashboardData) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  const { metrics, recentBookings } = dashboardData;

  const kpiCards = [
    { label: 'Total Revenue', value: `$${metrics.totalRevenue}`, icon: DollarSign, color: '#0A84FF', bg: 'rgba(10,132,255,0.12)', badge: '+12%', badgeColor: '#4ADE80' },
    { label: 'Total Bookings', value: metrics.totalBookings, icon: CalendarClock, color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
    { label: 'Completed', value: metrics.completedServices, icon: CheckCircle2, color: '#4ADE80', bg: 'rgba(74,222,128,0.12)' },
    { label: 'Customers', value: metrics.totalCustomers, icon: Users, color: '#FF6B00', bg: 'rgba(255,107,0,0.12)' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Welcome to the AutoCare Admin Portal.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpiCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="dark-card p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                  <Icon className="h-6 w-6" style={{ color: card.color }} />
                </div>
                {card.badge && (
                  <span className="text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1" style={{ background: 'rgba(74,222,128,0.12)', color: '#4ADE80' }}>
                    <TrendingUp className="h-3 w-3" /> {card.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 mb-1">{card.label}</p>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 dark-card p-6">
          <h2 className="text-lg font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Revenue Trend (This Week)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A84FF" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0A84FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D2D2D" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={v => `$${v}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#0A84FF" strokeWidth={2.5} fillOpacity={1} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="dark-card flex flex-col overflow-hidden">
          <div className="p-5 flex justify-between items-center" style={{ borderBottom: '1px solid #2D2D2D' }}>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-xs text-[#0A84FF] hover:text-blue-300 font-medium flex items-center gap-1 transition">
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {recentBookings.length === 0 ? (
              <p className="text-gray-500 text-center py-6 text-sm">No recent bookings.</p>
            ) : (
              <div className="space-y-2">
                {recentBookings.map((booking) => (
                  <div key={booking.booking_id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/3 transition cursor-pointer" style={{ border: '1px solid transparent' }}>
                    <div>
                      <p className="font-bold text-white text-sm">{booking.customer?.first_name} {booking.customer?.last_name}</p>
                      <p className="text-xs text-gray-500">{booking.service?.name}</p>
                    </div>
                    <div className="text-right">
                      <BookingProgress status={booking.status} />
                      <p className="text-xs text-gray-600 mt-1">{booking.booking_date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
