import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, Battery, Car, Settings, Shield, Clock, 
  MapPin, Phone, Mail, Star, ChevronRight, Menu, X, 
  CheckCircle2, DollarSign
} from 'lucide-react';
import { useState } from 'react';

const SERVICES = [
  { icon: <Settings className="h-8 w-8" />, name: 'Oil Change', time: '45 Mins', price: '$49', desc: 'Premium synthetic oil change with filter replacement.' },
  { icon: <Car className="h-8 w-8" />, name: 'Wheel Alignment', time: '1 Hour', price: '$89', desc: 'Precision 4-wheel alignment for improved handling.' },
  { icon: <Battery className="h-8 w-8" />, name: 'Battery Replacement', time: '30 Mins', price: '$120', desc: 'High-performance battery installation with warranty.' },
  { icon: <Wrench className="h-8 w-8" />, name: 'Engine Diagnostics', time: '1 Hour', price: '$99', desc: 'Complete computer diagnostic scan and report.' },
  { icon: <Settings className="h-8 w-8" />, name: 'Tire Replacement', time: '1.5 Hours', price: '$400', desc: 'Mounting and balancing of 4 new tires.' },
  { icon: <Shield className="h-8 w-8" />, name: 'General Maintenance', time: '2 Hours', price: '$150', desc: 'Comprehensive multipoint inspection and service.' },
];

const TESTIMONIALS = [
  { name: 'John Doe', rating: 5, text: 'Excellent service! Quick, professional, and completely transparent about pricing.', role: 'Toyota Camry Owner' },
  { name: 'Sarah Smith', rating: 5, text: 'The best auto repair experience I have ever had. The tracking feature is amazing.', role: 'Honda Civic Owner' },
  { name: 'Mike Johnson', rating: 4, text: 'Very convenient online booking. Will definitely return for my next oil change.', role: 'Ford F-150 Owner' },
];

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen font-['Inter'] bg-white text-gray-800 ac-page-bg"
      style={{ '--page-bg-image': 'linear-gradient(135deg, #DBEAFE 0%, #F8FAFC 55%, #CFFAFE 100%)' }}
    >
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="text-white h-6 w-6" />
              </div>
              <span className="font-['Outfit'] font-bold text-2xl text-gray-900 tracking-tight">AutoCare</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="font-medium text-gray-600 hover:text-blue-600 transition">Home</a>
              <a href="#services" className="font-medium text-gray-600 hover:text-blue-600 transition">Services</a>
              <a href="#how-it-works" className="font-medium text-gray-600 hover:text-blue-600 transition">How it Works</a>
              <a href="#contact" className="font-medium text-gray-600 hover:text-blue-600 transition">Contact</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700 transition px-4 py-2">
                Login
              </Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition shadow-lg shadow-blue-200">
                Sign Up
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 bg-[linear-gradient(135deg,#0052CC_0%,#0052CC_50%,#F8FAFC_100%)] overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-cyan-200/30 rounded-full blur-3xl opacity-60 ac-float"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white font-semibold text-sm mb-6 border border-white/30">
              <Star className="h-4 w-4 fill-current" /> Top Rated Car Service
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white font-['Outfit'] leading-tight mb-6 tracking-tight">
              Professional Car Services at Your <span className="text-cyan-200">Convenience</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto lg:mx-0">
              Book, Track, and Manage All Your Vehicle Maintenance in One Place. Experience hassle-free servicing with our certified experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-xl shadow-blue-200 flex items-center justify-center gap-2">
                Book Service Now <ChevronRight className="h-5 w-5" />
              </Link>
              <a href="#services" className="bg-white/95 hover:bg-white text-[#1E293B] px-8 py-4 rounded-xl font-semibold text-lg border border-white/50 transition flex items-center justify-center">
                Explore Services
              </a>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0052CC] to-[#00BCD4] rounded-[2rem] transform rotate-3 scale-105 opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Car Service" 
              className="rounded-[2rem] shadow-2xl relative z-10 w-full object-cover aspect-video lg:aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 font-['Outfit'] mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive maintenance and repair services for all vehicle makes and models.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div key={index} className="group p-8 rounded-xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(5,82,204,0.15)] hover:border-[#0052CC] transition-all duration-300">
                <div className="w-16 h-16 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-['Outfit']">{service.name}</h3>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 font-medium">
                    <Clock className="h-5 w-5" /> {service.time}
                  </div>
                  <div className="text-[#0052CC] font-bold text-xl">
                    Starts at {service.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 font-['Outfit'] mb-6">Why Choose AutoCare?</h2>
              <p className="text-xl text-gray-600 mb-8">We combine expertise with technology to provide you the most transparent and reliable car service experience.</p>
              
              <div className="space-y-6">
                {[
                  { title: 'Expert Technicians', desc: 'Certified professionals with years of experience.' },
                  { title: 'Transparent Pricing', desc: 'No hidden costs. Get upfront estimates.' },
                  { title: 'Real-time Tracking', desc: 'Track your car\'s service status live on our platform.' },
                  { title: 'Quality Guarantee', desc: 'We use only genuine parts with warranty.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               <img 
                src="https://images.unsplash.com/photo-1635784860420-91a27e7e59c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Mechanic" 
                className="rounded-2xl shadow-2xl z-10 relative"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-gray-100">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Star className="h-8 w-8 fill-current" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-gray-600 font-medium">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 font-['Outfit'] mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Select Service', desc: 'Browse available services & choose convenient date/time' },
              { step: '02', title: 'Confirm Booking', desc: 'Enter vehicle details and confirm appointment' },
              { step: '03', title: 'Get Service', desc: 'Visit service center on scheduled date' },
              { step: '04', title: 'Track & Pay', desc: 'Track progress and make online payment securely' }
            ].map((item, i) => (
              <div key={i} className="relative">
                {i !== 3 && <div className="hidden md:block absolute top-1/4 right-0 w-full h-[2px] bg-blue-100 -mr-1/2 transform translate-x-1/2 z-0"></div>}
                <div className="relative z-10 w-[60px] h-[60px] mx-auto rounded-full bg-[linear-gradient(135deg,#0052CC_0%,#00BCD4_100%)] flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-[0_8px_16px_rgba(5,82,204,0.2)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[linear-gradient(135deg,#0F172A_0%,#1E293B_100%)] text-gray-300 pt-16 pb-5 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Car className="text-white h-6 w-6" />
                </div>
                <span className="font-['Outfit'] font-bold text-2xl text-white tracking-tight">AutoCare</span>
              </div>
              <p className="mb-6">Professional, reliable, and transparent car service platform for all your automotive needs.</p>
              <div className="flex space-x-4">
                {/* Social Icons Placeholder */}
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">Fb</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">Tw</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">Ig</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition">Services</a></li>
                <li><a href="#how-it-works" className="hover:text-blue-400 transition">How it Works</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-blue-500" /> 123 Auto Avenue, NY 10001</li>
                <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-blue-500" /> +1 (555) 123-4567</li>
                <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-blue-500" /> support@autocare.com</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Newsletter</h4>
              <p className="mb-4">Subscribe for tips and exclusive offers.</p>
              <div className="flex">
                <input type="email" placeholder="Email Address" className="bg-gray-800 text-white px-4 py-2 rounded-l-lg outline-none w-full border border-gray-700 focus:border-blue-500" />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2026 AutoCare Elite. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
