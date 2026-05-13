import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Clock } from 'lucide-react';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

export function Contact() {
  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-accent mb-4">Contact Us</h1>
          <p className="text-muted-foreground">
            Get in touch with our team for any inquiries or support
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg border border-border p-8">
            <h2 className="text-2xl font-bold text-accent mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="078 XXX XXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-border p-8">
              <h2 className="text-2xl font-bold text-accent mb-6">Contact Information</h2>
              <div className="space-y-4">
                <a
                  href="tel:078877375"
                  className="flex items-start space-x-4 p-4 hover:bg-secondary rounded-lg transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-accent mb-1">Phone</div>
                    <div className="text-muted-foreground">078 877 375</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/250788773758"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 p-4 hover:bg-secondary rounded-lg transition-colors"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-accent mb-1">WhatsApp</div>
                    <div className="text-muted-foreground">Chat with us instantly</div>
                  </div>
                </a>

                <div className="flex items-start space-x-4 p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-accent mb-1">Location</div>
                    <div className="text-muted-foreground">Nyarugenge, Carfreezone</div>
                    <div className="text-muted-foreground">Kigali, Rwanda</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-accent mb-1">Business Hours</div>
                    <div className="text-muted-foreground">Mon - Sat: 8:00 AM - 8:00 PM</div>
                    <div className="text-muted-foreground">Sunday: 10:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border p-8">
              <h2 className="text-2xl font-bold text-accent mb-6">Follow Us</h2>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://facebook.com/rujamaphones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-7 h-7 text-white" />
                </a>
                <a
                  href="https://instagram.com/rujamaphones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                  aria-label="Instagram"
                >
                  <Instagram className="w-7 h-7 text-white" />
                </a>
                <a
                  href="https://www.tiktok.com/@rujamaphones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-7 h-7 text-white" />
                </a>
                <a
                  href="https://wa.me/250788773758"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-7 h-7 text-white" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border p-8">
              <h2 className="text-2xl font-bold text-accent mb-6">Visit Our Store</h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5154812803776!2d30.0588!3d-1.9536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTcnMTMuMCJTIDMwwrAwMycxOS43IkU!5e0!3m2!1sen!2srw!4v1234567890!5m2!1sen!2srw"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rujama Phones Shop Location"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-accent">Rujama Phones Shop</strong><br />
                Nyarugenge, Carfreezone<br />
                Kigali, Rwanda
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-border p-8">
              <h3 className="text-xl font-bold text-accent mb-3">Quick Response Guarantee</h3>
              <p className="text-muted-foreground">
                We typically respond to all inquiries within 2 hours during business hours.
                For urgent matters, WhatsApp is the fastest way to reach us!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
