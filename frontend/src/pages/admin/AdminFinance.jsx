import { useEffect } from 'react';
import useAdminStore from '../../store/adminStore';
import { DollarSign, TrendingUp, CreditCard, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminFinance() {
  const { allBookings, fetchAllBookings, isLoading } = useAdminStore();

  useEffect(() => {
    fetchAllBookings();
  }, [fetchAllBookings]);

  // Derive metrics
  const completedBookings = allBookings.filter(b => b.status === 'Completed');
  const totalRevenue = completedBookings.reduce((sum, b) => sum + parseFloat(b.total_price || 0), 0);
  
  // Group revenue by service category
  const categoryRevenue = completedBookings.reduce((acc, b) => {
    const category = b.service?.category || 'Other';
    acc[category] = (acc[category] || 0) + parseFloat(b.total_price || 0);
    return acc;
  }, {});

  const pieData = Object.keys(categoryRevenue).map(key => ({
    name: key,
    value: categoryRevenue[key]
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-['Outfit']">Financial Overview</h1>
          <p className="text-gray-600 mt-1">Track revenue and financial performance.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium shadow-sm">
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <DollarSign className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Lifetime Revenue</p>
            <p className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <TrendingUp className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Completed Transactions</p>
            <p className="text-3xl font-bold text-gray-900">{completedBookings.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <CreditCard className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Average Order Value</p>
            <p className="text-3xl font-bold text-gray-900">
              ${completedBookings.length > 0 ? (totalRevenue / completedBookings.length).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue by Category */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6 font-['Outfit']">Revenue by Service Category</h2>
          <div className="h-72">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">No revenue data available</div>
            )}
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 font-['Outfit']">Recent Transactions</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {completedBookings.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No completed transactions yet.</div>
            ) : (
              <div className="space-y-1">
                {completedBookings.slice(0, 5).map((booking) => (
                  <div key={booking.booking_id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-xl transition">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">#{booking.booking_id} - {booking.customer?.first_name} {booking.customer?.last_name}</p>
                        <p className="text-xs text-gray-500">{booking.booking_date} • {booking.service?.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+${booking.total_price}</p>
                      <p className="text-xs text-gray-400">Paid</p>
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
