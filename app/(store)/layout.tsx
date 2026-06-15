import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBanner />
      {/* Universal Store Navigation */}
      <Header />
      
      {/* Injected Active Public Store Page Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Public Store Action Widgets */}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
