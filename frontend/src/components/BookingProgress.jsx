export default function BookingProgress({ status }) {
  const config = {
    Pending:     { cls: 'badge-pending',   dot: '#FCD34D', label: 'Pending' },
    Confirmed:   { cls: 'badge-confirmed', dot: '#60A5FA', label: 'Confirmed' },
    'In Progress':{ cls: 'badge-progress', dot: '#A78BFA', label: 'In Progress' },
    Completed:   { cls: 'badge-completed', dot: '#4ADE80', label: 'Completed' },
    Cancelled:   { cls: 'badge-cancelled', dot: '#F87171', label: 'Cancelled' },
  };
  const c = config[status] || config['Pending'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.cls}`}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
      {c.label}
    </span>
  );
}
