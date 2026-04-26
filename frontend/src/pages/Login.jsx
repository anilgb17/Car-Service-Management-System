import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { LogIn, Mail, Lock, Car } from 'lucide-react';

export default function Login() {
  const [loginType, setLoginType] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { login, error, isLoading, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setLocalError('');
    const success = await login(email, password);
    if (success) {
      const user = useAuthStore.getState().user;
      const isAdminLogin = loginType === 'admin';
      const isAdminUser = user?.role === 'Admin';
      if (isAdminLogin && !isAdminUser) {
        useAuthStore.getState().logout();
        setLocalError('This account is not an admin account. Please use User Login.');
        return;
      }
      if (!isAdminLogin && isAdminUser) {
        useAuthStore.getState().logout();
        setLocalError('Admin account detected. Please continue via Admin Login.');
        return;
      }
      if (isAdminUser) navigate('/admin');
      else navigate('/dashboard');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(rgba(0,0,0,0.68), rgba(0,0,0,0.78)), url(https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80) center/cover no-repeat'
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0" style={{ backdropFilter: 'blur(3px)' }} />

      <div className="relative z-10 w-full max-w-md px-4 ac-enter">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-11 h-11 bg-[#0A84FF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Car className="text-white h-6 w-6" />
          </div>
          <span className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>AutoCare</span>
        </div>

        {/* Glass card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)'
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Welcome Back</h2>
          <p className="text-gray-400 text-sm mb-6">Sign in to your account to continue</p>

          {/* Toggle */}
          <div className="grid grid-cols-2 gap-1 rounded-xl p-1 mb-6" style={{ background: 'rgba(0,0,0,0.3)' }}>
            {['user', 'admin'].map(type => (
              <button
                key={type}
                type="button"
                onClick={() => { setLoginType(type); clearError(); setLocalError(''); }}
                className={`rounded-lg py-2 text-sm font-semibold transition-all ${
                  loginType === type
                    ? 'bg-[#0A84FF] text-white shadow-md shadow-blue-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {type === 'user' ? 'User Login' : 'Admin Login'}
              </button>
            ))}
          </div>

          {(error || localError) && (
            <div className="mb-4 p-3 rounded-lg text-sm text-red-300" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
              {localError || error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="email" required placeholder="Email address"
                value={email} onChange={e => setEmail(e.target.value)}
                className="dark-input pl-10"
                style={{ background: 'rgba(0,0,0,0.35)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#E5E7EB' }}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="password" required placeholder="Password"
                value={password} onChange={e => setPassword(e.target.value)}
                className="dark-input pl-10"
                style={{ background: 'rgba(0,0,0,0.35)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#E5E7EB' }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <a href="#" className="text-[#0A84FF] hover:text-blue-300 transition">Forgot password?</a>
            </div>

            <button
              type="submit" disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2"
            >
              <LogIn className="h-4 w-4" />
              {isLoading ? 'Signing in...' : loginType === 'admin' ? 'Sign In as Admin' : 'Sign In'}
            </button>
          </form>

          {loginType === 'user' && (
            <p className="text-center text-gray-400 text-sm mt-5">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#0A84FF] hover:text-blue-300 font-medium transition">Create one</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
