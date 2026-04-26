import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, Battery, Car, Settings, Shield, Clock, 
  MapPin, Phone, Mail, Star, ChevronRight, Menu, X, 
  CheckCircle2, DollarSign, Droplet, Gauge, Zap, Users,
  Facebook, Twitter, Instagram, ArrowRight
} from 'lucide-react';

const SERVICES = [
  { icon: <Droplet className="h-10 w-10" />, name: 'Oil Change', time: '45 Mins', price: '$49', desc: 'Premium synthetic oil change with filter replacement and inspection.' },
  { icon: <Droplet className="h-10 w-10" />, name: 'Car Wash', time: '30 Mins', price: '$29', desc: 'Complete exterior and interior detailing service.' },
  { icon: <Wrench className="h-10 w-10" />, name: 'Engine Repair', time: '2-4 Hours', price: '$299', desc: 'Expert engine diagnostics and repair by certified technicians.' },
  { icon: <Shield className="h-10 w-10" />, name: 'General Service', time: '2 Hours', price: '$150', desc: 'Comprehensive multipoint inspection and maintenance service.' },
];

const FEATURES = [
  { icon: <Car className="h-12 w-12" />, title: 'Manage Vehicles', desc: 'Add and track all your vehicles in one place with complete service history.' },
  { icon: <Clock className="h-12 w-12" />, title: 'Easy Booking', desc: 'Book services in seconds with our intuitive scheduling system.' },
  { icon: <Gauge className="h-12 w-12" />, title: 'Admin Dashboard', desc: 'Powerful admin tools to manage bookings, staff, and operations.' },
  { icon: <Zap className="h-12 w-12" />, title: 'Service Tracking', desc: 'Real-time updates on your vehicle service status from start to finish.' },
];

const HOW_IT_WORKS = [
  { step: '1', title: 'Register', desc: 'Create your account in under 2 minutes' },
  { step: '2', title: 'Add Vehicle', desc: 'Enter your vehicle details and preferences' },
  { step: '3', title: 'Book Service', desc: 'Choose service, date, and time slot' },
  { step: '4', title: 'Track Status', desc: 'Monitor progress in real-time' },
];

const TESTIMONIALS = [
  { name: 'John Doe', rating: 5, text: 'Excellent service! Quick, professional, and completely transparent about pricing.', role: 'Toyota Camry Owner' },
  { name: 'Sarah Smith', rating: 5, text: 'The best auto repair experience I have ever had. The tracking feature is amazing.', role: 'Honda Civic Owner' },
  { name: 'Mike Johnson', rating: 5, text: 'Very convenient online booking. Will definitely return for my next oil change.', role: 'Ford F-150 Owner' },
];

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-['Inter'] bg-[#0F172A] text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0F172A]/95 backdrop-blur-md shadow-lg border-b border-gray-800' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0A84FF] to-[#0066CC] rounded-lg flex items-center justify-center shadow-lg">
                <Car className="text-white h-6 w-6" />
              </div>
              <span className="font-['Outfit'] font-bold text-2xl text-white tracking-tight">AutoCare</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="font-medium text-gray-300 hover:text-white transition">Home</a>
              <a href="#services" className="font-medium text-gray-300 hover:text-white transition">Services</a>
              <a href="#about" className="font-medium text-gray-300 hover:text-white transition">About</a>
              <a href="#contact" className="font-medium text-gray-300 hover:text-white transition">Contact</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="font-medium text-white hover:text-[#0A84FF] transition px-4 py-2">
                Login
              </Link>
              <Link to="/register" className="bg-[#0A84FF] hover:bg-[#0066CC] text-white px-6 py-2.5 rounded-lg font-medium transition shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transform">
                Sign Up
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1E293B] border-t border-gray-800">
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className="block text-gray-300 hover:text-white transition">Home</a>
              <a href="#services" className="block text-gray-300 hover:text-white transition">Services</a>
              <a href="#about" className="block text-gray-300 hover:text-white transition">About</a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition">Contact</a>
              <Link to="/login" className="block text-white hover:text-[#0A84FF] transition">Login</Link>
              <Link to="/register" className="block bg-[#0A84FF] text-white px-4 py-2 rounded-lg text-center">Sign Up</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Background Image */}
      <section 
        id="home" 
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/50 via-transparent to-[#0F172A]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-sm mb-6 border border-white/20">
            <Star className="h-4 w-4 fill-current text-yellow-400" /> Top Rated Car Service
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-['Outfit'] leading-tight mb-6 tracking-tight">
            Smart Car Service<br />Management System
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Book, manage, and track your vehicle services بسهولة
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-[#0A84FF] hover:bg-[#0066CC] text-white px-10 py-4 rounded-xl font-semibold text-lg transition shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transform flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
            <a 
              href="#services" 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-4 rounded-xl font-semibold text-lg border border-white/30 transition flex items-center justify-center"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-white rotate-90" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Outfit'] mb-4">Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Everything you need to manage your vehicle services efficiently</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <div 
                key={index} 
                className="card group p-8 rounded-xl bg-[#1E1E1E] border border-[#2D2D2D] hover:border-[#0A84FF] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(10,132,255,0.3)]"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0A84FF]/20 to-[#0066CC]/20 text-[#0A84FF] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-['Outfit']">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="about" className="py-20 bg-gradient-to-b from-[#111827] to-[#1F2937]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Outfit'] mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Get started in 4 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((item, index) => (
              <div key={index} className="relative text-center">
                {index !== 3 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-[2px] bg-gradient-to-r from-[#0A84FF] to-transparent"></div>
                )}
                <div className="relative z-10 w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#0A84FF] to-[#0066CC] flex items-center justify-center text-3xl font-bold text-white mb-6 shadow-[0_0_30px_rgba(10,132,255,0.5)]">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-['Outfit']">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Outfit'] mb-4">Our Services</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Professional maintenance and repair services for all vehicle makes and models</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => (
              <div 
                key={index} 
                className="card group p-8 rounded-xl bg-[#1E1E1E] border border-[#2D2D2D] hover:border-[#FF6B00] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,107,0,0.3)]"
              >
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#FF6B00]/20 to-[#E55A00]/20 text-[#FF6B00] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-['Outfit']">{service.name}</h3>
                <p className="text-gray-400 mb-6">{service.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t border-[#2D2D2D]">
                  <div className="flex items-center gap-2 text-gray-500 font-medium">
                    <Clock className="h-5 w-5" /> {service.time}
                  </div>
                  <div className="text-[#FF6B00] font-bold text-xl">
                    {service.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-[#111827] to-[#1F2937]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Outfit'] mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Real feedback from real customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div 
                key={index} 
                className="p-8 rounded-xl bg-[#1E1E1E] border border-[#2D2D2D] hover:border-[#0A84FF] transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#0066CC] flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-To-Action Section */}
      <section className="py-24 bg-gradient-to-r from-[#0A84FF] to-[#0066CC] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Outfit'] mb-6">
            Ready to Service Your Car?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their vehicles
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0A84FF] px-10 py-4 rounded-xl font-bold text-lg transition shadow-2xl hover:scale-105 transform"
          >
            Book Now <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer id="contact" className="bg-[#020617] text-gray-400 pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0A84FF] to-[#0066CC] rounded-lg flex items-center justify-center shadow-lg">
                  <Car className="text-white h-6 w-6" />
                </div>
                <span className="font-['Outfit'] font-bold text-2xl text-white tracking-tight">AutoCare</span>
              </div>
              <p className="mb-6 text-gray-500">Professional, reliable, and transparent car service platform for all your automotive needs.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-[#1E1E1E] rounded-full flex items-center justify-center hover:bg-[#0A84FF] cursor-pointer transition">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#1E1E1E] rounded-full flex items-center justify-center hover:bg-[#0A84FF] cursor-pointer transition">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#1E1E1E] rounded-full flex items-center justify-center hover:bg-[#0A84FF] cursor-pointer transition">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#home" className="hover:text-[#0A84FF] transition">Home</a></li>
                <li><a href="#services" className="hover:text-[#0A84FF] transition">Services</a></li>
                <li><a href="#about" className="hover:text-[#0A84FF] transition">About</a></li>
                <li><Link to="/login" className="hover:text-[#0A84FF] transition">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#0A84FF] flex-shrink-0 mt-1" /> 
                  <span>123 Auto Avenue, New York, NY 10001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#0A84FF]" /> 
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#0A84FF]" /> 
                  <span>support@autocare.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Newsletter</h4>
              <p className="mb-4 text-gray-500">Subscribe for tips and exclusive offers.</p>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-[#1E1E1E] text-white px-4 py-3 rounded-lg outline-none w-full border border-[#2D2D2D] focus:border-[#0A84FF] transition" 
                />
                <button className="bg-gradient-to-r from-[#0A84FF] to-[#0066CC] px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition font-semibold text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-500">&copy; 2026 AutoCare. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
