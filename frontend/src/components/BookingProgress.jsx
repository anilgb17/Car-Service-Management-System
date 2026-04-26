export default function BookingProgress({ status }) {
  const config = {
    Pending:     { cls: 'badge-premium badge-pending',   label: 'Pending' },
    Confirmed:   { cls: 'badge-premium badge-confirmed', label: 'Confirmed' },
    'In Progress':{ cls: 'badge-premium badge-progress', label: 'In Progress' },
    Completed:   { cls: 'badge-premium badge-completed', label: 'Completed' },
    Cancelled:   { cls: 'badge-premium badge-cancelled', label: 'Cancelled' },
  };
  const c = config[status] || config['Pending'];
  return (
    <span className={c.cls}>
      {c.label}
    </span>
  );
}
