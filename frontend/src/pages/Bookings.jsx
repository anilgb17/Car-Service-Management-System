import { useEffect, useState } from 'react';
import useBookingStore from '../store/bookingStore';
import { CalendarClock, Car, Calendar as CalendarIcon, Download, Clock, Info } from 'lucide-react';
import BookingProgress from '../components/BookingProgress';
import { jsPDF } from 'jspdf';
import useAuthStore from '../store/authStore';

const calcNextService = (name, dateStr) => {
  if (!dateStr || !name) return 'a future date';
  const date = new Date(dateStr);
  const n = name.toLowerCase();
  let m = 6;
  if (n.includes('oil')) m = 3;
  else if (n.includes('tire') || n.includes('wheel')) m = 6;
  else if (n.includes('maintenance') || n.includes('inspection')) m = 12;
  else if (n.includes('battery')) m = 36;
  else if (n.includes('brake')) m = 12;
  date.setMonth(date.getMonth() + m);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function Bookings() {
  const { bookings, fetchBookings, isLoading } = useBookingStore();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Upcoming');

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const handleDownloadInvoice = (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(22); doc.setTextColor(37, 99, 235);
    doc.text('AutoCare Elite', 20, 20);
    doc.setFontSize(10); doc.setTextColor(100, 100, 100);
    doc.text('123 Auto Service Blvd, Tech City, 10012', 20, 28);
    doc.setFontSize(16); doc.setTextColor(0, 0, 0);
    doc.text('SERVICE INVOICE', 140, 20);
    doc.setFontSize(10);
    doc.text(`Invoice: INV-${booking.booking_id.toString().padStart(4, '0')}`, 140, 28);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 33);
    doc.line(20, 45, 190, 45);
    doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.text('Bill To:', 20, 55);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
    doc.text(`${user?.first_name} ${user?.last_name}`, 20, 62);
    doc.text(`${user?.email}`, 20, 67);
    doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.text('Vehicle:', 110, 55);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
    doc.text(`${booking.vehicle?.year} ${booking.vehicle?.make} ${booking.vehicle?.model}`, 110, 62);
    doc.text(`Reg: ${booking.vehicle?.registration_number}`, 110, 67);
    doc.line(20, 80, 190, 80);
    doc.setFont('helvetica', 'bold'); doc.text('Description', 20, 90); doc.text('Date', 120, 90); doc.text('Amount', 170, 90);
    doc.line(20, 93, 190, 93);
    doc.setFont('helvetica', 'normal');
    doc.text(booking.service?.name || 'Service', 20, 103);
    doc.text(`${booking.booking_date}`, 120, 103);
    doc.text(`$${booking.total_price}`, 170, 103);
    doc.line(140, 115, 190, 115);
    doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.text('Total Paid:', 140, 125);
    doc.setTextColor(37, 99, 235); doc.text(`$${booking.total_price}`, 170, 125);
    doc.setTextColor(150, 150, 150); doc.setFontSize(10); doc.setFont('helvetica', 'italic');
    doc.text('Thank you for choosing AutoCare!', 105, 250, null, null, 'center');
    doc.save(`AutoCare_Invoice_${booking.booking_id}.pdf`);
  };

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'Upcoming') return b.status === 'Confirmed' || b.status === 'In Progress';
    if (activeTab === 'Completed') return b.status === 'Completed';
    if (activeTab === 'Cancelled') return b.status === 'Cancelled';
    return true;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>My Bookings</h1>
        <p className="text-gray-400 mt-1">Track and manage your service appointments.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit mb-8" style={{ background: '#1E1E1E', border: '1px solid #2D2D2D' }}>
        {['Upcoming', 'Completed', 'Cancelled'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? 'text-white shadow-md' : 'text-gray-500 hover:text-gray-300'
            }`}
            style={activeTab === tab ? { background: '#0A84FF' } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading bookings...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="dark-card p-12 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(10,132,255,0.12)' }}>
            <CalendarClock className="h-8 w-8 text-[#0A84FF]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No {activeTab.toLowerCase()} bookings</h3>
          <p className="text-gray-400">Nothing in this category yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.booking_id} className="dark-card p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <BookingProgress status={booking.status} />
                  <span className="text-xs text-gray-600 font-mono">#{booking.booking_id}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{booking.service?.name}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5"><Car className="h-3.5 w-3.5 text-gray-600" />{booking.vehicle?.make} {booking.vehicle?.model}</div>
                  <div className="flex items-center gap-1.5"><CalendarIcon className="h-3.5 w-3.5 text-gray-600" />{booking.booking_date}</div>
                  <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-gray-600" />{booking.booking_time}</div>
                </div>
                {booking.status === 'Completed' && (
                  <div className="mt-4 p-3 rounded-xl flex items-start gap-3" style={{ background: 'rgba(10,132,255,0.08)', border: '1px solid rgba(10,132,255,0.2)' }}>
                    <Info className="h-4 w-4 text-[#0A84FF] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-300">
                      Next recommended <span className="font-semibold text-white">{booking.service?.name}</span> around{' '}
                      <span className="font-bold text-[#0A84FF]">{calcNextService(booking.service?.name, booking.booking_date)}</span>.
                    </p>
                  </div>
                )}
              </div>
              <div className="flex md:flex-col items-center md:items-end gap-3 w-full md:w-auto" style={{ borderTop: '1px solid #2D2D2D', paddingTop: '12px' }} >
                <div className="text-2xl font-bold text-white">${booking.total_price}</div>
                <div className="flex gap-2">
                  {booking.status === 'Completed' && (
                    <button onClick={() => handleDownloadInvoice(booking)} className="flex items-center gap-1 text-xs text-[#0A84FF] font-medium hover:bg-blue-500/10 px-3 py-1.5 rounded-lg transition">
                      <Download className="h-3.5 w-3.5" /> Invoice
                    </button>
                  )}
                  {activeTab === 'Upcoming' && (
                    <button className="flex items-center gap-1 text-xs text-red-400 font-medium hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition">Cancel</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
