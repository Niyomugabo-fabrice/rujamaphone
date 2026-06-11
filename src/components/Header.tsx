import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Image from "next/image";

export function Header() {
  const router = useRouter();
  const { totalItems } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#820210] shadow-md w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* TOP NAVBAR */}
        <div className="flex items-center justify-between h-16 md:h-20 w-full">

          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-3 shrink-0">
            {/* Logo Image: Hidden on mobile (default), visible on sm and up */}
            <div className="hidden sm:flex w-12 h-12 rounded-lg items-center justify-center shadow-md shrink-0">
              <Image
                src="/image/logo.jpeg"
                alt="logo"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </div>

            {/* Shop Title */}
            <div>
              <h1 className="text-lg md:text-xl font-bold text-white whitespace-nowrap" style={{ fontFamily: 'sans-serif' }}>
                Rujama Phones Shop
              </h1>
              <p className="text-[10px] md:text-xs text-gray-200 hidden sm:block">
                Best in Kigali
              </p>
            </div>
          </Link>

          {/* DESKTOP SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-lg mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search phones..."
                className="w-full px-4 py-2 pl-10 rounded-lg bg-white text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </form>

          {/* RIGHT SIDE (Links + Cart + Menu) */}
          <div className="flex items-center space-x-2 md:space-x-6 shrink-0">
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-white hover:text-gray-200 font-medium transition-colors">Home</Link>
              <Link href="/products" className="text-white hover:text-gray-200 font-medium transition-colors">Products</Link>
              <Link href="/contact" className="text-white hover:text-gray-200 font-medium transition-colors">Contact</Link>
            </nav>

            {/* CART */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg hover:bg-red-900 transition-colors duration-300"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-[#820210] text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-red-900 transition-colors duration-300"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phones..."
              className="w-full px-4 py-2 pl-10 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </form>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#820210] border-t border-red-800">
          <nav className="px-4 py-4 space-y-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white">Home</Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white">Products</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}