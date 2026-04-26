import { useEffect } from 'react';
import useAdminStore from '../../store/adminStore';
import { DollarSign, TrendingUp, CreditCard, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0A84FF', '#4ADE80', '#FF6B00', '#A78BFA', '#FCD34D', '#6B7280'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-sm" style={{ background: '#1E1E1E', border: '1px solid #374151', color: '#E5E7EB' }}>
        <p className="font-bold">{label || payload[0].name}</p>
        <p style={{ color: COLORS[0] }}>${typeof payload[0].value === 'number' ? payload[0].value.toFixed(2) : payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function AdminFinance() {
  const { allBookings, fetchAllBookings, isLoading } = useAdminStore();

  useEffect(() => { fetchAllBookings(); }, [fetchAllBookings]);

  const completedBookings = allBookings.filter(b => b.status === 'Completed');
  const totalRevenue = completedBookings.reduce((sum, b) => sum + parseFloat(b.total_price || 0), 0);

  const categoryRevenue = completedBookings.reduce((acc, b) => {
    const cat = b.service?.category || 'Other';
    acc[cat] = (acc[cat] || 0) + parseFloat(b.total_price || 0);
    return acc;
  }, {});

  const pieData = Object.keys(categoryRevenue).map(key => ({ name: key, value: categoryRevenue[key] }));

  const kpiCards = [
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: '#0A84FF', bg: 'rgba(10,132,255,0.12)' },
    { label: 'Completed Transactions', value: completedBookings.length, icon: TrendingUp, color: '#4ADE80', bg: 'rgba(74,222,128,0.12)' },
    { label: 'Avg Order Value', value: `$${completedBookings.length > 0 ? (totalRevenue / completedBookings.length).toFixed(2) : '0.00'}`, icon: CreditCard, color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Financial Overview</h1>
          <p className="text-gray-400 mt-1">Track revenue and financial performance.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition" style={{ background: '#2A2A2A', border: '1px solid #374151', color: '#E5E7EB' }}>
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        {kpiCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="dark-card p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: card.bg }}>
                <Icon className="h-7 w-7" style={{ color: card.color }} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{card.label}</p>
                <p className="text-2xl font-bold text-white">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="dark-card p-6">
          <h2 className="text-lg font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Revenue by Category</h2>
          <div className="h-64">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={{ stroke: '#374151' }}>
                    {pieData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">No revenue data yet</div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="dark-card flex flex-col overflow-hidden">
          <div className="p-5" style={{ borderBottom: '1px solid #2D2D2D' }}>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Recent Transactions</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {completedBookings.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No completed transactions yet.</div>
            ) : (
              <div className="space-y-1">
                {completedBookings.slice(0, 8).map((booking) => (
                  <div key={booking.booking_id} className="flex justify-between items-center p-3 rounded-xl hover:bg-white/3 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(74,222,128,0.12)' }}>
                        <DollarSign className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">#{booking.booking_id} — {booking.customer?.first_name} {booking.customer?.last_name}</p>
                        <p className="text-xs text-gray-500">{booking.booking_date} • {booking.service?.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">+${booking.total_price}</p>
                      <p className="text-xs text-gray-600">Paid</p>
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
