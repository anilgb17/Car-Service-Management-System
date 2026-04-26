import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { LayoutDashboard, Car, CalendarClock, Settings, LogOut, Menu, X, Bell, User as UserIcon, CheckCircle2, Wrench } from 'lucide-react';

const MENU_ITEMS = [
  { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/dashboard/bookings', name: 'My Bookings', icon: CalendarClock },
  { path: '/dashboard/vehicles', name: 'My Vehicles', icon: Car },
  { path: '/dashboard/book-service', name: 'Book Service', icon: Wrench },
];

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)' }}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}
        style={{ background: 'linear-gradient(180deg, #0D1117 0%, #161B22 100%)', borderRight: '1px solid #21262D' }}>
        <div className="h-16 flex items-center justify-between px-5" style={{ borderBottom: '1px solid #21262D' }}>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0A84FF] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Car className="text-white h-4 w-4" />
            </div>
            <span className="font-bold text-xl text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>AutoCare</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5 px-3">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3 px-3">Navigation</p>
          <nav className="space-y-1">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link key={item.path} to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={isActive ? { background: 'linear-gradient(90deg, #0A84FF22, #0A84FF11)', borderLeft: '3px solid #0A84FF' } : {}}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#0A84FF]' : 'text-gray-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4" style={{ borderTop: '1px solid #21262D' }}>
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#1C2128' }}>
            <div className="w-8 h-8 rounded-full bg-[#0A84FF] flex items-center justify-center text-white text-xs font-bold">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0"
          style={{ background: 'rgba(13,17,23,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #21262D' }}>
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-[#FF6B00]"></span>
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 mt-2 w-72 rounded-xl overflow-hidden z-20 shadow-2xl" style={{ background: '#161B22', border: '1px solid #30363D' }}>
                    <div className="p-3 flex justify-between items-center" style={{ borderBottom: '1px solid #21262D' }}>
                      <h3 className="text-sm font-bold text-white">Notifications</h3>
                      <span className="text-xs text-[#0A84FF] cursor-pointer">Mark all read</span>
                    </div>
                    <div className="p-4 flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Service completed!</p>
                        <p className="text-xs text-gray-500 mt-0.5">Your Oil Change is ready.</p>
                        <p className="text-xs text-gray-600 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <div className="relative" style={{ borderLeft: '1px solid #21262D', paddingLeft: '12px' }}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition">
                <div className="w-7 h-7 rounded-full bg-[#0A84FF] flex items-center justify-center text-white text-xs font-bold">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </div>
                <span className="text-sm font-medium text-gray-300 hidden sm:block">{user?.first_name}</span>
              </button>
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden z-20 shadow-2xl" style={{ background: '#161B22', border: '1px solid #30363D' }}>
                    <div className="p-1.5">
                      <Link to="/dashboard/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition">
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                      <button onClick={() => { setDropdownOpen(false); handleLogout(); }} className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full text-left rounded-lg transition mt-0.5">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="ac-enter"><Outlet /></div>
        </main>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}
