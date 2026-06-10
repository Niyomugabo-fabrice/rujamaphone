import { ArrowRight, Smartphone, Headphones, Speaker, Zap, Shield, Truck } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import Masonry from 'react-responsive-masonry';
import Link from 'next/link';

export function Home() {
  const featuredProducts = products.slice(0, 4);
  const galleryImages = products.slice(0, 8).map(p => p.image);

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary/10 via-white to-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-6">
                Best Phones and Accessories in Kigali
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover premium smartphones, accessories, and speakers at unbeatable prices.
                Quality guaranteed, trusted by thousands.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold flex items-center space-x-2 transition-all"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/upgrade"
                  className="px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-all"
                >
                  Top up
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1756575681817-e497cb0a5cec?w=400"
                  alt="Phone 1"
                  className="rounded-lg shadow-2xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1769174399762-6843bb96d702?w=400"
                  alt="Phone 2"
                  className="rounded-lg shadow-2xl mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/products?category=Smartphones"
              className="group bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-2">Smartphones</h3>
              <p className="text-muted-foreground text-sm">
                Latest models from Apple, Samsung, Tecno, and more
              </p>
            </Link>

            <Link
              href="/products?category=Accessories"
              className="group bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-2">Accessories</h3>
              <p className="text-muted-foreground text-sm">
                Cases, chargers, earbuds, and all your mobile needs
              </p>
            </Link>

            <Link
              href="/products?category=Speakers"
              className="group bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Speaker className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-2">Speakers</h3>
              <p className="text-muted-foreground text-sm">
                Premium Bluetooth speakers with powerful sound
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Check out our most popular phones and accessories
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-semibold"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
              Trade-In & Upgrade
            </h2>
            <p className="text-muted-foreground">
              Get the best value for your old phone
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="font-bold text-accent mb-2">Bring Your Old Phone</h3>
                <p className="text-sm text-muted-foreground">
                  Visit our shop with your current device
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="font-bold text-accent mb-2">Get Instant Quote</h3>
                <p className="text-sm text-muted-foreground">
                  We evaluate and offer fair market value
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="font-bold text-accent mb-2">Upgrade Today</h3>
                <p className="text-sm text-muted-foreground">
                  Add money and get your dream phone
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all"
              >
                Start Upgrade
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
              Product Gallery
            </h2>
            <p className="text-muted-foreground">
              Explore our collection
            </p>
          </div>
          <Masonry columnsCount={4} gutter="16px">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-auto hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </Masonry>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-accent mb-1">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Same-day delivery within Kigali
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-accent mb-1">Warranty Protection</h3>
                <p className="text-sm text-muted-foreground">
                  All products come with warranty
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-accent mb-1">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">
                  7-day return policy on all items
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}