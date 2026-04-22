import { useEffect } from 'react';
import useAdminStore from '../../store/adminStore';
import { DollarSign, Users, CalendarClock, CheckCircle2, TrendingUp, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';

const mockRevenueData = [
  { name: 'Mon', revenue: 400 },
  { name: 'Tue', revenue: 300 },
  { name: 'Wed', revenue: 550 },
  { name: 'Thu', revenue: 450 },
  { name: 'Fri', revenue: 700 },
  { name: 'Sat', revenue: 900 },
  { name: 'Sun', revenue: 650 },
];

export default function AdminDashboard() {
  const { dashboardData, fetchDashboardData, isLoading } = useAdminStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading || !dashboardData) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  const { metrics, recentBookings } = dashboardData;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-['Outfit']">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome to the AutoCare Admin Portal.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="h-6 w-6" />
            </div>
            <span className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">
              <TrendingUp className="h-4 w-4 mr-1" /> +12%
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">${metrics.totalRevenue}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CalendarClock className="h-6 w-6" />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Total Bookings</p>
          <p className="text-3xl font-bold text-gray-900">{metrics.totalBookings}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Completed Services</p>
          <p className="text-3xl font-bold text-gray-900">{metrics.completedServices}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Active Customers</p>
          <p className="text-3xl font-bold text-gray-900">{metrics.totalCustomers}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6 font-['Outfit']">Revenue Trend (This Week)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 font-['Outfit']">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-sm text-blue-600 hover:underline font-medium">View All</Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            {recentBookings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent bookings found.</p>
            ) : (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.booking_id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer border border-transparent hover:border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{booking.customer?.first_name} {booking.customer?.last_name}</p>
                      <p className="text-xs text-gray-500">{booking.service?.name}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                        booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">{booking.booking_date}</p>
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
