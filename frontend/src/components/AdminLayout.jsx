import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { 
  LayoutDashboard, Users, CalendarClock, Settings as SettingsIcon, 
  LogOut, Menu, X, Bell, User as UserIcon, ShieldAlert,
  Wrench, DollarSign, UsersRound
} from 'lucide-react';

const MENU_ITEMS = [
  { path: '/admin', name: 'Dashboard Overview', icon: LayoutDashboard },
  { path: '/admin/bookings', name: 'Bookings Management', icon: CalendarClock },
  { path: '/admin/customers', name: 'Customer Directory', icon: Users },
  { path: '/admin/services', name: 'Services Management', icon: Wrench },
  { path: '/admin/staff', name: 'Staff Management', icon: UsersRound },
  { path: '/admin/finance', name: 'Financial Overview', icon: DollarSign },
];

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-gray-950">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <ShieldAlert className="text-white h-5 w-5" />
              </div>
              <span className="font-['Outfit'] font-bold text-xl tracking-wide">Admin Portal</span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">Management</p>
            <nav className="space-y-1">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotifOpen(!notifOpen)}
                className="text-gray-400 hover:text-blue-600 transition-colors relative p-2 rounded-full hover:bg-gray-100"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20">
                    <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                      <span className="text-xs text-blue-600 cursor-pointer hover:underline">Mark all read</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      <div className="p-4 hover:bg-gray-50 border-b border-gray-50 transition cursor-pointer">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <CalendarClock className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">New Service Request</p>
                            <p className="text-xs text-gray-500 mt-0.5">Anil Badiger just booked an Oil Change service.</p>
                            <p className="text-[10px] text-gray-400 mt-1">Just now</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="relative border-l border-gray-200 pl-4">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-lg transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white">
                  <UserIcon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.first_name} {user?.last_name}
                </span>
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20">
                    <div className="p-2">
                      <Link 
                        to="/admin/settings" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors"
                      >
                        <SettingsIcon className="h-4 w-4" /> System Settings
                      </Link>
                      <button 
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left rounded-lg transition-colors mt-1"
                      >
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
