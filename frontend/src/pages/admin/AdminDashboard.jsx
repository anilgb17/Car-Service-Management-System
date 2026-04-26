import { useEffect, useState } from 'react';
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
  const [animatedValues, setAnimatedValues] = useState({ revenue: 0, bookings: 0, completed: 0, customers: 0 });

  useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);

  // Animate numbers on mount
  useEffect(() => {
    if (dashboardData && dashboardData.metrics) {
      const duration = 1000;
      const steps = 30;
      const interval = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setAnimatedValues({
          revenue: dashboardData.metrics.totalRevenue * progress,
          bookings: Math.floor(dashboardData.metrics.totalBookings * progress),
          completed: Math.floor(dashboardData.metrics.completedServices * progress),
          customers: Math.floor(dashboardData.metrics.totalCustomers * progress)
        });
        
        if (step >= steps) clearInterval(timer);
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [dashboardData]);

  if (isLoading || !dashboardData) {
    return (
      <div className="p-12 text-center">
        <div className="spinner-premium mx-auto mb-4"></div>
        <p className="text-secondary">Loading dashboard...</p>
      </div>
    );
  }

  const { metrics, recentBookings } = dashboardData;

  const kpiCards = [
    { label: 'Total Revenue', value: `${animatedValues.revenue.toFixed(2)}`, icon: DollarSign, gradient: 'from-[#1E90FF] to-[#00E5FF]', badge: '+12%' },
    { label: 'Total Bookings', value: animatedValues.bookings, icon: CalendarClock, gradient: 'from-[#A78BFA] to-[#8B5CF6]' },
    { label: 'Completed', value: animatedValues.completed, icon: CheckCircle2, gradient: 'from-[#22C55E] to-[#16A34A]' },
    { label: 'Customers', value: animatedValues.customers, icon: Users, gradient: 'from-[#FF6B00] to-[#E55A00]' },
  ];

  return (
    <div className="ac-enter">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Welcome to the AutoCare Admin Portal.</p>
      </div>

      {/* KPI Cards with Premium Animation */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpiCards.map((card, i) => {
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
                {card.badge && (
                  <span className="text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1" style={{ background: 'rgba(74,222,128,0.12)', color: '#4ADE80' }}>
                    <TrendingUp className="h-3 w-3" /> {card.badge}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-2">{card.label}</p>
                <p className="text-3xl font-bold count-up">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card-premium p-6 ac-fade-in">
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
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={v => `${v}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#0A84FF" strokeWidth={2.5} fillOpacity={1} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="card-premium flex flex-col overflow-hidden ac-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="p-5 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
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
                {recentBookings.map((booking, index) => (
                  <div 
                    key={booking.booking_id} 
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/3 transition cursor-pointer ac-fade-in" 
                    style={{ border: '1px solid transparent', animationDelay: `${index * 0.05}s` }}
                  >
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
