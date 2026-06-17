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

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] border border-border p-10 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <h2 className="text-3xl font-bold text-accent mb-6 text-center block mx-auto max-w-max">
                Contact Information
              </h2>
              <p className="max-w-2xl text-muted-foreground mb-8 mx-auto text-center">
                Reach out to us any time through phone or WhatsApp. We are here to help with product questions, orders, and support.
              </p>

              <div className="space-y-4">
                <a
                  href="tel:0788773754"
                  className="flex items-center gap-4 rounded-3xl border border-border/80 bg-secondary p-5 transition hover:border-primary hover:bg-primary/5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-accent">Phone</div>
                    <div className="text-muted-foreground">0788773754</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/250788773758"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-3xl border border-border/80 bg-secondary p-5 transition hover:border-emerald-500 hover:bg-emerald-50"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-green-100 text-green-600">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-accent">WhatsApp</div>
                    <div className="text-muted-foreground">Chat with us instantly</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-3xl border border-border/80 bg-secondary p-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-accent">Location</div>
                    <div className="text-muted-foreground">Nyarugenge, Carfreezone</div>
                    <div className="text-muted-foreground">Kigali, Rwanda</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-3xl border border-border/80 bg-secondary p-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-accent">Business Hours</div>
                    <div className="text-muted-foreground">Mon - Sat: 8:00 AM - 8:00 PM</div>
                    <div className="text-muted-foreground">Sunday: 10:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[32px] border border-border p-10 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <h2 className="text-3xl font-bold text-accent mb-6">Quick Response Guarantee</h2>
              <p className="text-muted-foreground leading-7">
                We typically respond to all inquiries within 2 hours during business hours. For urgent matters, WhatsApp is the fastest way to reach us.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[32px] border border-border p-10 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <h2 className="text-3xl font-bold text-accent mb-6 text-center block mx-auto max-w-max">
                Follow Us
              </h2>
              <p className="text-muted-foreground mb-6 text-center mx-auto max-w-2xl">
                Stay updated with our latest offers and product news on social media.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <a
                  href="https://web.facebook.com/search/top?q=rujama_phones_shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 items-center justify-center rounded-3xl bg-blue-600 text-white transition hover:bg-blue-700"
                  aria-label="Facebook"
                >
                  <Facebook className="w-7 h-7" />
                </a>
                <a
                  href="https://www.instagram.com/rujama_phones_shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white transition hover:opacity-90"
                  aria-label="Instagram"
                >
                  <Instagram className="w-7 h-7" />
                </a>
                <a
                  href="https://www.tiktok.com/@rujamaphones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 items-center justify-center rounded-3xl bg-black text-white transition hover:bg-gray-800"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-7 h-7" />
                </a>
                <a
                  href="https://wa.me/250788773758"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 items-center justify-center rounded-3xl bg-green-600 text-white transition hover:bg-green-700"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-7 h-7" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
