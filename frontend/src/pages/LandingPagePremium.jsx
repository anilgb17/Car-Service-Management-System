import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, Zap, Shield, Clock, TrendingUp, CheckCircle2, 
  ArrowRight, Menu, X, Star, Gauge, Users, DollarSign,
  Wrench, Calendar, CreditCard, Bell
} from 'lucide-react';
import logo from '../assets/logo1.png';

const FEATURES = [
  { 
    icon: <Zap className="h-10 w-10" />, 
    title: 'Smart Booking', 
    desc: 'AI-powered scheduling that adapts to your needs and preferences.' 
  },
  { 
    icon: <Gauge className="h-10 w-10" />, 
    title: 'Real-Time Tracking', 
    desc: 'Monitor your vehicle service status with live updates and notifications.' 
  },
  { 
    icon: <Users className="h-10 w-10" />, 
    title: 'Staff Management', 
    desc: 'Comprehensive tools to manage technicians, schedules, and performance.' 
  },
  { 
    icon: <Shield className="h-10 w-10" />, 
    title: 'Secure Payments', 
    desc: 'Bank-grade encryption for all transactions with multiple payment options.' 
  },
];

const STEPS = [
  { num: '01', title: 'Select Service', desc: 'Choose from our comprehensive service catalog' },
  { num: '02', title: 'Choose Vehicle', desc: 'Select your vehicle from saved profiles' },
  { num: '03', title: 'Schedule', desc: 'Pick your preferred date and time slot' },
  { num: '04', title: 'Pay & Track', desc: 'Secure payment and real-time tracking' },
];

const TESTIMONIALS = [
  { 
    name: 'Michael Chen', 
    role: 'Tesla Model 3 Owner', 
    text: 'Feels like a luxury platform, not just software. The attention to detail is remarkable.',
    rating: 5 
  },
  { 
    name: 'Sarah Williams', 
    role: 'BMW X5 Owner', 
    text: 'The real-time tracking feature gives me peace of mind. I always know what\'s happening with my car.',
    rating: 5 
  },
  { 
    name: 'David Rodriguez', 
    role: 'Audi A6 Owner', 
    text: 'Premium experience from start to finish. This is how car service should be done.',
    rating: 5 
  },
];

export default function LandingPagePremium() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-deep text-white">
      {/* Premium Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-surface/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logo} alt="AutoCare Logo" className="h-14 transition-all duration-300 group-hover:scale-105" />
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-secondary hover:text-white transition-colors duration-300">Features</a>
              <a href="#how-it-works" className="text-secondary hover:text-white transition-colors duration-300">How It Works</a>
              <a href="#testimonials" className="text-secondary hover:text-white transition-colors duration-300">Testimonials</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-secondary hover:text-white transition-colors duration-300 px-4 py-2">
                Sign In
              </Link>
              <Link to="/register" className="btn-premium btn-premium-primary">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-white/5">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-secondary hover:text-white transition">Features</a>
              <a href="#how-it-works" className="block text-secondary hover:text-white transition">How It Works</a>
              <a href="#testimonials" className="block text-secondary hover:text-white transition">Testimonials</a>
              <Link to="/login" className="block text-white hover:text-glow transition">Sign In</Link>
              <Link to="/register" className="btn-premium btn-premium-primary w-full">Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#1E90FF] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#00E5FF] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="ac-enter">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
                <Star className="h-4 w-4 text-[#00E5FF]" />
                <span className="text-sm font-semibold text-secondary">Premium Automotive Platform</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Smart Car Service,<br />
                <span className="gradient-text">Engineered for Precision</span>
              </h1>
              
              <p className="text-xl text-secondary mb-10 leading-relaxed">
                Book, track, and manage your vehicle services with a premium experience. 
                Designed for those who demand excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-premium btn-premium-primary text-lg px-8 py-4">
                  Book Service <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/login" className="btn-premium btn-premium-secondary text-lg px-8 py-4">
                  View Dashboard
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16">
                {[
                  { value: '10K+', label: 'Services' },
                  { value: '98%', label: 'Satisfaction' },
                  { value: '24/7', label: 'Support' }
                ].map((stat, i) => (
                  <div key={i} className="ac-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="text-3xl font-bold text-glow mb-1">{stat.value}</div>
                    <div className="text-sm text-secondary uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative ac-slide-left">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1E90FF]/20 to-[#00E5FF]/20 rounded-3xl blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Premium Car Service" 
                className="relative rounded-3xl shadow-2xl border border-white/10"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 card-glass p-6 max-w-xs ac-glow-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.9/5</div>
                    <div className="text-sm text-secondary">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Premium Features for<br />
              <span className="gradient-text">Modern Vehicle Care</span>
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Everything you need to manage your vehicle services with precision and ease
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <div 
                key={index} 
                className="card-premium group ac-enter"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1E90FF]/20 to-[#00E5FF]/20 text-[#00E5FF] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {feature.title}
                </h3>
                <p className="text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 relative bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Four simple steps to premium vehicle service
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-[#1E90FF] via-[#00E5FF] to-[#1E90FF] opacity-20" style={{ top: '48px' }}></div>
            
            {STEPS.map((step, index) => (
              <div key={index} className="relative ac-scale-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="relative z-10 w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-[#1E90FF] to-[#00E5FF] flex items-center justify-center text-3xl font-bold mb-6 shadow-[0_0_40px_rgba(30,144,255,0.5)]">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-secondary text-center leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Preview */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E90FF]/5 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Powerful <span className="gradient-text">Admin Dashboard</span>
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Complete control over your automotive service business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <TrendingUp />, label: 'Revenue', value: '$125,430', change: '+12.5%' },
              { icon: <Calendar />, label: 'Bookings', value: '1,234', change: '+8.2%' },
              { icon: <Users />, label: 'Customers', value: '856', change: '+15.3%' }
            ].map((stat, i) => (
              <div key={i} className="kpi-card-premium ac-enter" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E90FF]/20 to-[#00E5FF]/20 text-[#00E5FF] flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <span className="text-[#22C55E] text-sm font-semibold">{stat.change}</span>
                </div>
                <div className="text-3xl font-bold mb-1 count-up">{stat.value}</div>
                <div className="text-sm text-secondary uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 relative bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Trusted by <span className="gradient-text">Premium Owners</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="card-glass ac-enter" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#00E5FF] text-[#00E5FF]" />
                  ))}
                </div>
                <p className="text-secondary mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E90FF] to-[#00E5FF] flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-secondary">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E90FF]/20 via-[#00E5FF]/20 to-[#1E90FF]/20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1E90FF] rounded-full blur-[150px] opacity-30"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00E5FF] rounded-full blur-[150px] opacity-30"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Upgrade Your Garage to<br />
            <span className="neon-text">Premium</span>
          </h2>
          <p className="text-xl text-secondary mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their premium vehicles
          </p>
          <Link to="/register" className="btn-premium btn-premium-primary text-lg px-10 py-5">
            Get Started <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface/50 border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={logo} alt="AutoCare Logo" className="h-12 mb-4" />
              </div>
              <p className="text-secondary text-sm leading-relaxed">
                Premium automotive service platform engineered for precision and excellence.
              </p>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Dashboard', 'API'] },
              { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Status', 'Terms'] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-secondary hover:text-white transition text-sm">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-secondary">
            <p>&copy; 2026 AutoCare. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
