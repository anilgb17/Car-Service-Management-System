import { useEffect, useState } from 'react';
import useBookingStore from '../store/bookingStore';
import { CalendarClock, Car, Calendar as CalendarIcon, DollarSign, Download, Clock, Info } from 'lucide-react';
import BookingProgress from '../components/BookingProgress';

const calculateNextServiceDate = (serviceName, dateStr) => {
  if (!dateStr || !serviceName) return 'a future date';
  const date = new Date(dateStr);
  let monthsToAdd = 6; // default 6 months
  
  const name = serviceName.toLowerCase();
  if (name.includes('oil')) monthsToAdd = 3;
  else if (name.includes('tire') || name.includes('wheel') || name.includes('alignment')) monthsToAdd = 6;
  else if (name.includes('maintenance') || name.includes('inspection')) monthsToAdd = 12;
  else if (name.includes('battery')) monthsToAdd = 36;
  else if (name.includes('brake')) monthsToAdd = 12;
  
  date.setMonth(date.getMonth() + monthsToAdd);
  
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

import { jsPDF } from 'jspdf';
import useAuthStore from '../store/authStore';

export default function Bookings() {
  const { bookings, fetchBookings, isLoading } = useBookingStore();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Upcoming');

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleDownloadInvoice = (booking) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235); // Blue-600
    doc.text('AutoCare Elite', 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('123 Auto Service Blvd, Tech City, 10012', 20, 28);
    doc.text('Phone: (555) 123-4567 | Web: autocare.com', 20, 33);
    
    // Invoice Title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('SERVICE INVOICE', 140, 20);
    
    // Invoice Details
    doc.setFontSize(10);
    doc.text(`Invoice Number: INV-${booking.booking_id.toString().padStart(4, '0')}`, 140, 28);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 33);
    doc.text(`Status: PAID`, 140, 38);

    doc.line(20, 45, 190, 45); // horizontal line

    // Customer Info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 20, 55);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${user?.first_name} ${user?.last_name}`, 20, 62);
    doc.text(`${user?.email}`, 20, 67);
    if(user?.phone) doc.text(`${user?.phone}`, 20, 72);

    // Vehicle Info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Vehicle:', 110, 55);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${booking.vehicle?.year} ${booking.vehicle?.make} ${booking.vehicle?.model}`, 110, 62);
    doc.text(`VIN/Reg: ${booking.vehicle?.registration_number}`, 110, 67);
    
    doc.line(20, 80, 190, 80); // horizontal line

    // Table Header
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Description', 20, 90);
    doc.text('Service Date', 120, 90);
    doc.text('Amount', 170, 90);
    doc.line(20, 93, 190, 93);

    // Table Content
    doc.setFont('helvetica', 'normal');
    doc.text(booking.service?.name || 'Automotive Service', 20, 103);
    doc.text(`${booking.booking_date} ${booking.booking_time}`, 120, 103);
    doc.text(`$${booking.total_price}`, 170, 103);
    
    // Total
    doc.line(140, 115, 190, 115);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Paid:', 140, 125);
    doc.setTextColor(37, 99, 235);
    doc.text(`$${booking.total_price}`, 170, 125);

    // Footer
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for choosing AutoCare! We appreciate your business.', 105, 250, null, null, 'center');
    
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
        <h1 className="text-3xl font-bold text-gray-900 font-['Outfit']">My Bookings</h1>
        <p className="text-gray-600 mt-1">Manage and track your service appointments.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-xl w-fit mb-8">
        {['Upcoming', 'Completed', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {isLoading ? (
        <div className="text-center py-10">Loading bookings...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarClock className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No {activeTab.toLowerCase()} bookings</h3>
          <p className="text-gray-600">You don't have any bookings in this category.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.booking_id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:border-blue-100 hover:shadow-md transition">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <BookingProgress status={booking.status} />
                  <span className="text-sm text-gray-500 font-mono ml-4">ID: #{booking.booking_id}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1 font-['Outfit']">{booking.service?.name}</h3>
                
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Car className="h-4 w-4 text-gray-400" />
                    {booking.vehicle?.make} {booking.vehicle?.model} ({booking.vehicle?.registration_number})
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    {booking.booking_date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {booking.booking_time}
                  </div>
                </div>

                {booking.status === 'Completed' && (
                  <div className="mt-5 bg-blue-50/80 rounded-xl p-4 border border-blue-100 flex items-start gap-3">
                    <div className="bg-white p-1.5 rounded-lg shadow-sm border border-blue-100">
                      <Info className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-0.5">Service Recommendation</h4>
                      <p className="text-sm text-gray-600">
                        Based on your recent visit, we recommend scheduling your next <span className="font-semibold">{booking.service?.name}</span> around <span className="font-bold text-blue-700">{calculateNextServiceDate(booking.service?.name, booking.booking_date)}</span>.
                      </p>
                    </div>
                  </div>
                )}
              </div>

                  <div className="flex md:flex-col items-center md:items-end gap-4 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                    <div className="text-2xl font-bold text-gray-900">
                      ${booking.total_price}
                    </div>
                    <div className="flex gap-2">
                      {booking.status === 'Completed' && (
                        <button 
                          onClick={() => handleDownloadInvoice(booking)}
                          className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg transition"
                        >
                          <Download className="h-4 w-4" /> Invoice
                        </button>
                      )}
                      {activeTab === 'Upcoming' && (
                        <button className="flex items-center gap-1 text-sm text-red-600 font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg transition">
                          Cancel
                        </button>
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
