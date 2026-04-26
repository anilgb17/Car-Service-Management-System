import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { UserPlus, Mail, Lock, User, Phone, Car } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: '', password: '', confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const { register, error, isLoading, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setPasswordError('');
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    const { confirmPassword, ...submitData } = formData;
    const success = await register(submitData);
    if (success) navigate('/login');
  };

  const inputStyle = {
    background: 'rgba(0,0,0,0.35)',
    border: '1.5px solid rgba(255,255,255,0.1)',
    color: '#E5E7EB'
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-8 px-4"
      style={{
        background: 'linear-gradient(rgba(0,0,0,0.68), rgba(0,0,0,0.78)), url(https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80) center/cover no-repeat'
      }}
    >
      <div className="absolute inset-0" style={{ backdropFilter: 'blur(3px)' }} />
      <div className="relative z-10 w-full max-w-md ac-enter">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-11 h-11 bg-[#0A84FF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Car className="text-white h-6 w-6" />
          </div>
          <span className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>AutoCare</span>
        </div>

        <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
          <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Create Account</h2>
          <p className="text-gray-400 text-sm mb-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0A84FF] hover:text-blue-300 font-medium">Sign in</Link>
          </p>

          {(error || passwordError) && (
            <div className="mb-4 p-3 rounded-lg text-sm text-red-300" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
              {error || passwordError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input name="first_name" type="text" required placeholder="First Name" value={formData.first_name} onChange={handleChange} className="dark-input pl-9" style={inputStyle} />
              </div>
              <div>
                <input name="last_name" type="text" required placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="dark-input" style={inputStyle} />
              </div>
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input name="email" type="email" required placeholder="Email address" value={formData.email} onChange={handleChange} className="dark-input pl-9" style={inputStyle} />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input name="phone" type="tel" placeholder="Phone (Optional)" value={formData.phone} onChange={handleChange} className="dark-input pl-9" style={inputStyle} />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input name="password" type="password" required placeholder="Password" value={formData.password} onChange={handleChange} className="dark-input pl-9" style={inputStyle} />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input name="confirmPassword" type="password" required placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="dark-input pl-9" style={inputStyle} />
            </div>
            <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
              <input type="checkbox" required className="rounded" />
              I agree to the <a href="#" className="text-[#0A84FF] hover:underline">Terms and Conditions</a>
            </label>
            <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
              <UserPlus className="h-4 w-4" />
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
