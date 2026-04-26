import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { UserPlus, Mail, Lock, User, Phone, Car, ArrowRight, CheckCircle2 } from 'lucide-react';
import logo from '../assets/logo1.png';

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

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4"
      style={{
        background: 'radial-gradient(circle at 20% 20%, rgba(30, 144, 255, 0.15), transparent), #0B0B0D'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#1E90FF] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#00E5FF] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 w-full max-w-md ac-enter">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center mb-8 group">
          <img src={logo} alt="AutoCare Logo" className="h-20 transition-all duration-300 group-hover:scale-105" style={{ filter: 'drop-shadow(0 0 20px rgba(30, 144, 255, 0.4))' }} />
        </Link>

        {/* Glass Card */}
        <div className="card-glass p-8">
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Create Account
          </h2>
          <p className="text-secondary mb-8">
            Already have an account?{' '}
            <Link to="/login" className="text-[#00E5FF] hover:text-[#1E90FF] font-semibold transition">
              Sign in
            </Link>
          </p>

          {(error || passwordError) && (
            <div className="mb-6 p-4 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171' }}>
              {error || passwordError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B6B70] pointer-events-none z-10" />
                <input 
                  name="first_name" type="text" required placeholder="First Name" 
                  value={formData.first_name} onChange={handleChange} 
                  className="input-premium pl-12 w-full" 
                />
              </div>
              <div className="relative">
                <input 
                  name="last_name" type="text" required placeholder="Last Name" 
                  value={formData.last_name} onChange={handleChange} 
                  className="input-premium w-full" 
                />
              </div>
            </div>
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B6B70] pointer-events-none z-10" />
              <input 
                name="email" type="email" required placeholder="Email address" 
                value={formData.email} onChange={handleChange} 
                className="input-premium pl-12 w-full" 
              />
            </div>
            
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B6B70] pointer-events-none z-10" />
              <input 
                name="phone" type="tel" placeholder="Phone (Optional)" 
                value={formData.phone} onChange={handleChange} 
                className="input-premium pl-12 w-full" 
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B6B70] pointer-events-none z-10" />
              <input 
                name="password" type="password" required placeholder="Password" 
                value={formData.password} onChange={handleChange} 
                className="input-premium pl-12 w-full" 
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B6B70] pointer-events-none z-10" />
              <input 
                name="confirmPassword" type="password" required placeholder="Confirm Password" 
                value={formData.confirmPassword} onChange={handleChange} 
                className="input-premium pl-12 w-full" 
              />
            </div>
            
            <label className="flex items-start gap-3 text-secondary text-sm cursor-pointer hover:text-white transition">
              <input type="checkbox" required className="rounded mt-1 flex-shrink-0" />
              <span>
                I agree to the{' '}
                <a href="#" className="text-[#00E5FF] hover:text-[#1E90FF] transition">Terms and Conditions</a>
                {' '}and{' '}
                <a href="#" className="text-[#00E5FF] hover:text-[#1E90FF] transition">Privacy Policy</a>
              </span>
            </label>
            
            <button 
              type="submit" disabled={isLoading} 
              className="btn-premium btn-premium-primary w-full py-4 text-base"
            >
              {isLoading ? (
                <div className="spinner-premium mx-auto" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Create Account
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-sm text-secondary mb-4">What you'll get:</p>
            <div className="space-y-3">
              {[
                'Real-time service tracking',
                'Secure payment processing',
                'Service history & reminders',
                '24/7 customer support'
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-[#00E5FF] flex-shrink-0" />
                  <span className="text-secondary">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <Link to="/" className="block text-center text-secondary hover:text-white transition mt-6">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
