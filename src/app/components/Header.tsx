import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Header() {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#820210] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP NAVBAR */}
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <span
                className="text-[#820210] text-3xl font-bold"
                style={{
                  fontFamily: 'sans-serif',
                  lineHeight: 1,
                }}
              >
                R
              </span>
            </div>

            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">
                Rujama Phones
              </h1>

              <p className="text-xs text-gray-200">
                Best in Kigali
              </p>
            </div>
          </Link>

          {/* DESKTOP SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search phones, accessories..."
                className="w-full px-4 py-2.5 pl-12 rounded-lg bg-white text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-white"
              />

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </form>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-gray-200 transition-colors duration-300 font-medium"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-white hover:text-gray-200 transition-colors duration-300 font-medium"
            >
              Products
            </Link>

            <Link
              to="/contact"
              className="text-white hover:text-gray-200 transition-colors duration-300 font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-3">

            {/* CART */}
            <Link
              to="/cart"
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
        <form
          onSubmit={handleSearch}
          className="md:hidden pb-4"
        >
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

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white hover:text-gray-200 transition-colors duration-300"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white hover:text-gray-200 transition-colors duration-300"
            >
              Products
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white hover:text-gray-200 transition-colors duration-300"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}