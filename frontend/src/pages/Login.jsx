import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { LogIn, Mail, Lock, Car, ArrowRight } from 'lucide-react';
import logo from '../assets/logo1.png';

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
        background: 'radial-gradient(circle at 20% 20%, rgba(30, 144, 255, 0.15), transparent), #0B0B0D'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#1E90FF] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#00E5FF] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 w-full max-w-md px-4 ac-enter">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center mb-8 group">
          <img src={logo} alt="AutoCare Logo" className="h-20 transition-all duration-300 group-hover:scale-105" style={{ filter: 'drop-shadow(0 0 20px rgba(30, 144, 255, 0.4))' }} />
        </Link>

        {/* Glass Card */}
        <div className="card-glass p-8">
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Welcome Back
          </h2>
          <p className="text-secondary mb-8">Sign in to your account to continue</p>

          {/* Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl mb-8" style={{ background: 'rgba(255,255,255,0.03)' }}>
            {['user', 'admin'].map(type => (
              <button
                key={type}
                type="button"
                onClick={() => { setLoginType(type); clearError(); setLocalError(''); }}
                className={`rounded-lg py-3 text-sm font-semibold transition-all duration-300 ${
                  loginType === type
                    ? 'bg-gradient-to-r from-[#1E90FF] to-[#00E5FF] text-white shadow-[0_0_20px_rgba(30,144,255,0.4)]'
                    : 'text-secondary hover:text-white'
                }`}
              >
                {type === 'user' ? 'User Login' : 'Admin Login'}
              </button>
            ))}
          </div>

          {(error || localError) && (
            <div className="mb-6 p-4 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171' }}>
              {localError || error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B6B70] pointer-events-none z-10" />
              <input
                type="email" required placeholder="Email address"
                value={email} onChange={e => setEmail(e.target.value)}
                className="input-premium pl-12 w-full"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B6B70] pointer-events-none z-10" />
              <input
                type="password" required placeholder="Password"
                value={password} onChange={e => setPassword(e.target.value)}
                className="input-premium pl-12 w-full"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-secondary cursor-pointer hover:text-white transition">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <a href="#" className="text-[#00E5FF] hover:text-[#1E90FF] transition">Forgot password?</a>
            </div>

            <button
              type="submit" disabled={isLoading}
              className="btn-premium btn-premium-primary w-full py-4 text-base mt-2"
            >
              {isLoading ? (
                <div className="spinner-premium mx-auto" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  {loginType === 'admin' ? 'Sign In as Admin' : 'Sign In'}
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {loginType === 'user' && (
            <p className="text-center text-secondary text-sm mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#00E5FF] hover:text-[#1E90FF] font-semibold transition">
                Create one
              </Link>
            </p>
          )}
        </div>

        {/* Back to Home */}
        <Link to="/" className="block text-center text-secondary hover:text-white transition mt-6">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
