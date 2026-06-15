'use client';

import { useState, useEffect, Suspense, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, ShoppingCart, Menu, X, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Image from "next/image";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import type { Product } from "@/types/product";

interface SearchBarProps {
  className: string;
  isMobile?: boolean;
  onSearchSubmit?: () => void;
}

function SearchBar({ className, isMobile, onSearchSubmit }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLFormElement>(null);
  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    normalizedQuery,
    results,
    isLoading,
    error,
  } = useDebouncedSearch({ delay: 350, enabled: isOpen, limit: 10 });
  const showSuggestions = isOpen && Boolean(normalizedQuery);

  // Synchronize the search input with URL query param
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [results, normalizedQuery]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeIndex >= 0 && results[activeIndex]) {
      selectProduct(results[activeIndex]);
      return;
    }

    if (normalizedQuery) {
      router.push(`/products?search=${encodeURIComponent(normalizedQuery)}`);
    } else {
      router.push('/products');
    }
    closeSearch();
    onSearchSubmit?.();
  };

  const selectProduct = (product: Product) => {
    router.push(`/products/${product.id}`);
    setSearchQuery(product.name);
    closeSearch();
    onSearchSubmit?.();
  };

  const closeSearch = () => {
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      closeSearch();
      return;
    }

    if (!showSuggestions) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, results.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, -1));
    }
  };

  return (
    <form ref={wrapperRef} onSubmit={handleSearch} className={`${className} relative`}>
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search phones..."
          role="combobox"
          aria-expanded={showSuggestions}
          aria-controls={showSuggestions ? `search-suggestions-${isMobile ? "mobile" : "desktop"}` : undefined}
          aria-activedescendant={activeIndex >= 0 ? `search-option-${isMobile ? "mobile" : "desktop"}-${activeIndex}` : undefined}
          className="w-full px-4 py-2 pl-10 pr-10 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
        />
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
        {isLoading && (
          <Loader2 className={`absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-500 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
        )}
      </div>

      {showSuggestions && (
        <div
          id={`search-suggestions-${isMobile ? "mobile" : "desktop"}`}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white py-2 text-gray-900 shadow-xl"
        >
          {isLoading ? (
            <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Searching...</span>
            </div>
          ) : error ? (
            <div className="px-4 py-3 text-sm text-red-600">{error}</div>
          ) : results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">No results found</div>
          ) : (
            results.map((product, index) => (
              <button
                id={`search-option-${isMobile ? "mobile" : "desktop"}-${index}`}
                key={product.id}
                type="button"
                role="option"
                aria-selected={activeIndex === index}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectProduct(product)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeIndex === index ? "bg-red-50" : "hover:bg-gray-50"
                }`}
              >
                <ProductThumb product={product} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-gray-950">
                    <HighlightedText text={product.name} query={normalizedQuery} />
                  </span>
                  <span className="block truncate text-xs text-gray-500">
                    <HighlightedText text={`${product.brand} ${formatCategory(product.category)}`} query={normalizedQuery} />
                  </span>
                </span>
                <span className="shrink-0 text-xs font-semibold text-[#820210]">
                  {formatPrice(product.price)}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </form>
  );
}

function ProductThumb({ product }: { product: Product }) {
  const imageSrc = useMemo(() => {
    if (Array.isArray(product.image)) return product.image[0];
    return product.image;
  }, [product.image]);

  return (
    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-gray-100">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="44px"
          className="object-cover"
        />
      ) : (
        <Search className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
      )}
    </span>
  );
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerQuery);

  if (matchIndex === -1) {
    const token = lowerQuery.split(" ").find((part) => part && lowerText.includes(part));
    if (!token) return <>{text}</>;

    return highlightAt(text, lowerText.indexOf(token), token.length);
  }

  return highlightAt(text, matchIndex, query.length);
}

function highlightAt(text: string, start: number, length: number) {
  return (
    <>
      {text.slice(0, start)}
      <mark className="rounded bg-yellow-100 px-0.5 text-inherit">{text.slice(start, start + length)}</mark>
      {text.slice(start + length)}
    </>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatCategory(category: string) {
  return category.toLowerCase();
}

export function Header() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const navLinkClass = (path: string) => {
    const baseClass = "font-medium transition-all duration-200 px-3 py-2 rounded-lg";
    if (isActive(path)) {
      return `${baseClass} bg-white text-[#820210] shadow-md`;
    }
    return `${baseClass} text-white hover:bg-red-900 hover:text-white`;
  };

  const mobileNavLinkClass = (path: string) => {
    const baseClass = "block py-3 px-4 rounded-lg transition-all duration-200";
    if (isActive(path)) {
      return `${baseClass} bg-white text-[#820210] font-semibold`;
    }
    return `${baseClass} text-white hover:bg-red-900 hover:text-white`;
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
          <Suspense fallback={
            <div className="hidden md:flex flex-1 max-w-lg mx-8 h-10 bg-red-900/50 rounded-lg animate-pulse" />
          }>
            <SearchBar className="hidden md:flex flex-1 max-w-lg mx-8" />
          </Suspense>

          {/* RIGHT SIDE (Links + Cart + Menu) */}
          <div className="flex items-center space-x-2 md:space-x-6 shrink-0">
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center space-x-2">
              <Link href="/" className={navLinkClass('/')}>Home</Link>
              <Link href="/products" className={navLinkClass('/products')}>Products</Link>
              <Link href="/services" className={navLinkClass('/services')}>Services</Link>
              <Link href="/contact" className={navLinkClass('/contact')}>Contact</Link>
            </nav>

            {/* CART */}
            <Link
              href="/cart"
              className={`relative p-2 rounded-lg transition-all duration-300 ${isActive('/cart') ? 'bg-white' : 'hover:bg-red-900'}`}
            >
              <ShoppingCart className={`w-6 h-6 ${isActive('/cart') ? 'text-[#820210]' : 'text-white'}`} />
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
        <Suspense fallback={
          <div className="md:hidden pb-4 h-10 bg-red-900/50 rounded-lg animate-pulse" />
        }>
          <SearchBar className="md:hidden pb-4" isMobile={true} onSearchSubmit={() => setMobileMenuOpen(false)} />
        </Suspense>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#820210] border-t border-red-800">
          <nav className="px-4 py-4 space-y-2">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass('/')}>Home</Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass('/products')}>Products</Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass('/services')}>Services</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass('/contact')}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
