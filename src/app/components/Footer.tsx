import { useState } from 'react';
import { Link } from 'react-router';
import {
  Facebook,
  Instagram,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
} from 'lucide-react';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function Footer() {
  const [showMap, setShowMap] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace this with backend or email service
    console.log(formData);

    alert('Message sent successfully!');

    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/250788773754"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      <footer className="bg-[#820210] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Info */}
            <div>
              <div className="flex items-center space-x-3 mb-5">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-[#820210] text-2xl font-bold">
                    R
                  </span>
                </div>

                <div>
                  <h2 className="font-bold text-2xl">
                    Rujama Phones
                  </h2>

                  <p className="text-sm text-gray-300">
                    Best Phones Shop in Kigali
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-7">
                Discover premium smartphones, speakers, accessories,
                and gadgets with trusted quality and affordable prices.
              </p>

              {/* Social Icons */}
              <div className="flex space-x-4 mt-6">
                <a
                  href="https://web.facebook.com/profile.php?id=100077072063658"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white hover:text-[#820210] transition-all duration-300 p-3 rounded-full"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                <a
                  href="https://www.instagram.com/rujama_phones_shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white hover:text-[#820210] transition-all duration-300 p-3 rounded-full"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href="https://www.tiktok.com/@rujamaphones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white hover:text-[#820210] transition-all duration-300 p-3 rounded-full"
                >
                  <TikTokIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-xl mb-5">
                Quick Links
              </h3>

              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/products"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Products
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <Link
                    to="/cart"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Cart
                  </Link>
                </li>
              </ul>

              {/* Business Hours */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Business Hours
                </h3>

                <div className="space-y-2 text-sm text-gray-300">
                  <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-xl mb-5">
                Contact Us
              </h3>

              <div className="space-y-5 text-sm">
                <a
                  href="tel:+250788773754"
                  className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5" />

                  <span>+250 788 773 754</span>
                </a>

                <a
                  href="https://wa.me/250788773754"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mt-0.5" />

                  <span>Chat on WhatsApp</span>
                </a>

                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 mt-0.5" />

                  <span>Kigali, Rwanda</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="font-semibold text-xl mb-5">
                Send Message
              </h3>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 outline-none focus:border-white"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 outline-none focus:border-white"
                />

                <textarea
                  name="message"
                  rows={4}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 outline-none focus:border-white resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-white text-[#820210] hover:bg-gray-100 transition-all duration-300 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Google Map Section */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center mb-8">
              Visit Our Shop
            </h3>

            {!showMap ? (
              <div
                onClick={() => setShowMap(true)}
                className="relative h-[420px] rounded-3xl overflow-hidden cursor-pointer group border border-white/10 shadow-2xl"
              >
                {/* Preview Image */}
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                  alt="Map Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center px-4">
                    <MapPin className="w-16 h-16 text-white mx-auto mb-5" />

                    <h4 className="text-3xl font-bold text-white mb-3">
                      Open Google Map
                    </h4>

                    <p className="text-gray-200 mb-6 max-w-md">
                      Click to load the full interactive map and
                      find our exact shop location in Kigali.
                    </p>

                    <button className="bg-white text-[#820210] px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300">
                      View Location
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <iframe
                  src="https://www.google.com/maps?q=Rujama+Phones+Shop&output=embed"
                  width="100%"
                  height="550"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rujama Phones Shop Location"
                  className="w-full"
                ></iframe>
              </div>
            )}
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 mt-14 pt-8 text-center text-sm text-gray-300">
            <p>
              © {new Date().getFullYear()} Rujama Phones Shop.
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}