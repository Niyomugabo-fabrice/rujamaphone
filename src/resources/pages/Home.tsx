"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Smartphone, Headphones, Speaker, Zap, Shield, Truck } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import Masonry from 'react-responsive-masonry';
import Link from 'next/link';
import type { Product } from '@/types/product';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetching data from your API
    fetch('/api/products?limit=8')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setIsLoading(false);
      });
  }, []);

  const featuredProducts = products.slice(0, 4);
  const galleryImages = products
  .slice(0, 8)
  .map((p) => (Array.isArray(p.image) ? p.image[0] : p.image))
  .filter((img): img is string => typeof img === 'string');

  return (
    <div>
      {/* Hero Section */}
    <section className="relative bg-white py-16">
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
    
    {/* Text Focus */}
    <div className="space-y-6">
      <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
        Tech for Kigali.<br />
        <span className="text-primary">Payment for You.</span>
      </h1>
      
      <p className="text-xl text-gray-600">
        Premium phones and audio at your fingertips. 
        <br className="hidden md:block" />
        <strong>Flexible installments</strong> and same-day delivery.
      </p>

      <div className="flex gap-4">
        <Link href="/products" className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90">
          Browse Shop
        </Link>
        <Link href="/upgrade" className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200">
          Installment Plan
        </Link>
      </div>
    </div>

    {/* Image Focus */}
    <div className="relative">
      <img 
        src="/hero-tech.jpg" 
        alt="Premium Gadgets" 
        className="rounded-3xl shadow-2xl w-full"
      />
      <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
        <p className="text-sm font-bold text-gray-900">⚡ Instant Trade-in</p>
        <p className="text-xs text-gray-500">Upgrade in minutes.</p>
      </div>
    </div>

  </div>
</section>
      {/* Category Links */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/products?category=SMARTPHONE" className="group bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4"><Smartphone className="w-8 h-8 text-white" /></div>
              <h3 className="text-xl font-bold text-accent mb-2">Smartphones</h3>
            </Link>
            <Link href="/products?category=ACCESSORY" className="group bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-4"><Headphones className="w-8 h-8 text-white" /></div>
              <h3 className="text-xl font-bold text-accent mb-2">Accessories</h3>
            </Link>
            <Link href="/products?category=SPEAKER" className="group bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4"><Speaker className="w-8 h-8 text-white" /></div>
              <h3 className="text-xl font-bold text-accent mb-2">Speakers</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">Featured Products</h2>
          </div>
          {isLoading ? (
            <div className="text-center">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section - Only renders if there are images */}
      {galleryImages.length > 0 && (
        <section className="py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">Product Gallery</h2>
            </div>
            <Masonry columnsCount={4} gutter="16px">
              {galleryImages.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg hover:shadow-xl transition-all cursor-pointer">
                  <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-auto hover:scale-110 transition-transform duration-300" />
                </div>
              ))}
            </Masonry>
          </div>
        </section>
      )}
    </div>
  );
}