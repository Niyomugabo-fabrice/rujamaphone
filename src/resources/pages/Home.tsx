"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Smartphone, Headphones, Speaker, Zap, Shield, Truck } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import Masonry from 'react-responsive-masonry';
import Link from 'next/link';
import { CheckCircle } from "lucide-react";
import type { Product } from "@/types/product";




// src/types/product.ts




export function Home() {

  const staticSliders = [
    "/image/hero1.png",
    "/image/hero2.png",
    "/image/hero3.png",
    "/image/hero4.png",
    "/image/hero5.png",
    "/image/rujamashop.jpeg"
  ];

  const [sliderImages, setSliderImages] = useState<string[]>(staticSliders);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [text, setText] = useState("");
  const [serviceIndex, setServiceIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Fetch dynamic sliders from API
  useEffect(() => {
    async function loadSliders() {
      try {
        const res = await fetch("/api/sliders");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setSliderImages(json.data.map((item: any) => item.image));
          setSliderIndex(0);
        }
      } catch (err) {
        console.error("Failed to load dynamic sliders:", err);
      }
    }
    loadSliders();
  }, []);

  // 🔥 IMAGE SLIDER
  useEffect(() => {
    if (sliderImages.length <= 1) return;
    const interval = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderImages]);

  // 🔥 SERVICES ANIMATION
  const services = [
    "Top up your device easily",
    "Get a phone on installment payment",
    "Buy best accessories, smartphones & speakers",
    "Enjoy high quality at low prices",
    "Fast delivery across Kigali"
  ];

useEffect(() => {
  if (subIndex === services[serviceIndex].length + 1 && !deleting) {
    setTimeout(() => setDeleting(true), 1000);
    return;
  }

  if (subIndex === 0 && deleting) {
    setDeleting(false);
    setServiceIndex((prev) => (prev + 1) % services.length);
    return;
  }

  const timeout = setTimeout(() => {
    setSubIndex((prev) => prev + (deleting ? -1 : 1));
  }, deleting ? 40 : 80);

  setText(services[serviceIndex].substring(0, subIndex));

  return () => clearTimeout(timeout);
}, [subIndex, deleting, serviceIndex]);



const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

const featuredProducts = products.slice(0, 4);
const galleryImages = products.slice(0, 8).map(p => p.image);

useEffect(() => {
  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      console.log("API RESPONSE:", data);

      setProducts(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  fetchProducts();
}, []);

  return (
    <div>

      {/* 🔥 HERO SECTION */}
      <section className="relative bg-gradient-to-br from-primary/10 via-white to-secondary pt-10 pb-16 md:pt-14 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div className="space-y-6">

              <h1 className="text-3xl md:text-5xl font-bold text-accent leading-tight">
                Visit <span className="text-primary">Rujama Phones Shop</span>
              </h1>

              <p className="text-lg text-muted-foreground">
                Kigali Car-Free Zone,
              </p>

              {/* 🔥 ANIMATED SERVICES */}
              <div className="flex items-center gap-3 h-12">
  <CheckCircle className="text-primary w-10 h-10" />

<p className="text-2xl font-medium text-gray-700">    {text}
  </p>
</div>
                          {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/products"
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:scale-105 transition"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex items-center">
                 <Link
                  href="/upgrade"
                  className="group inline-flex items-center gap-3 px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span className="relative flex items-center justify-center w-3 h-3">
                    {/* Accelerated Pinging Glow (duration-700) */}
                    <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping [animation-duration:0.7s] shadow-[0_0_15px_5px_rgba(34,211,238,0.7)]"></span>
                    
                    {/* The Core Dot */}
                    <span className="relative inline-flex w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(130,2,16,0.6)]">
  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping [animation-duration:1s]"></span>
  <span className="relative inline-flex w-3 h-3 rounded-full bg-primary"></span>
</span>
{/* <span className="relative inline-flex w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(130,2,16,0.6)]"></span> */}
 </span>

                  <span>Top Up Services</span>
                </Link>
              </div>
             
             
              </div>
            </div>

            {/* RIGHT - IMAGE SLIDER */}
            <div className="relative w-[280px] md:w-[320px] h-[400px] overflow-hidden rounded-2xl shadow-2xl mx-auto">

              <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                 style={{ transform: `translateX(-${sliderIndex * 100}%)` }}              >
                {sliderImages.map((img, i) => (
                  <div key={i} className="relative w-full h-full flex-shrink-0">

                    <img
                      src={img}
                      alt={`Slide ${i}`}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40"></div>

                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">Premium Devices</h3>
                      <p className="text-sm opacity-80">Best deals in Kigali</p>
                    </div>

                  </div>
                ))}
              </div>

              {/* DOTS */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
                {sliderImages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      i === sliderIndex ? "bg-white w-5" : "bg-gray-300 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🔥 CATEGORIES */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 px-4">

          {[
            { title: "Smartphones", icon: Smartphone },
            { title: "Accessories", icon: Headphones },
            { title: "Speakers", icon: Speaker },
          ].map((item, i) => (
            <Link
              key={i}
              href={`/products?category=${item.title}`}
              className="group bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-accent mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                Explore high-quality {item.title.toLowerCase()}
              </p>
            </Link>
          ))}

        </div>
      </section>

      {/* 🔥 FEATURED PRODUCTS */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-accent mb-4">
              Featured Products
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 🔥 GALLERY */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
            Product Gallery
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {galleryImages.map((image, i) => (
              <img
                key={i}
                src={image[0]}
                className="rounded-lg hover:scale-105 transition w-full"
              />
            ))}
          </div>

        </div>
      </section>

      {/* 🔥 FEATURES */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-4">

          <div className="flex space-x-4">
            <Zap className="text-primary" />
            <div>
              <h3 className="font-bold">Fast Delivery</h3>
              <p className="text-sm">Same-day delivery</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <Shield className="text-primary" />
            <div>
              <h3 className="font-bold">Warranty</h3>
              <p className="text-sm">All products protected</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <Truck className="text-primary" />
            <div>
              <h3 className="font-bold">Easy Returns</h3>
              <p className="text-sm">7-day return policy</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}






























// export function Home() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Fetching data from your API
//     fetch('/api/products?limit=8')
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data.data || []);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch products:", err);
//         setIsLoading(false);
//       });
//   }, []);

//   const featuredProducts = products.slice(0, 4);
//   const galleryImages = products
//   .slice(0, 8)
//   .map((p) => (Array.isArray(p.image) ? p.image[0] : p.image))
//   .filter((img): img is string => typeof img === 'string');

//   return (
//     <div>
//       {/* Hero Section */}
//     <section className="relative bg-white py-16">
//   <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
    
//     {/* Text Focus */}
//     <div className="space-y-6">
//       <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
//         Tech for Kigali.<br />
//         <span className="text-primary">Payment for You.</span>
//       </h1>
      
//       <p className="text-xl text-gray-600">
//         Premium phones and audio at your fingertips. 
//         <br className="hidden md:block" />
//         <strong>Flexible installments</strong> and same-day delivery.
//       </p>

//       <div className="flex gap-4">
//         <Link href="/products" className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90">
//           Browse Shop
//         </Link>
//         <Link href="/upgrade" className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200">
//           Installment Plan
//         </Link>
//       </div>
//     </div>

//     {/* Image Focus */}
//     <div className="relative">
//       <img 
//         src="/hero-tech.jpg" 
//         alt="Premium Gadgets" 
//         className="rounded-3xl shadow-2xl w-full"
//       />
//       <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
//         <p className="text-sm font-bold text-gray-900">⚡ Instant Trade-in</p>
//         <p className="text-xs text-gray-500">Upgrade in minutes.</p>
//       </div>
//     </div>

//   </div>
// </section>
//       {/* Category Links */}
//       <section className="py-12 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Link href="/products?category=SMARTPHONE" className="group bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
//               <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4"><Smartphone className="w-8 h-8 text-white" /></div>
//               <h3 className="text-xl font-bold text-accent mb-2">Smartphones</h3>
//             </Link>
//             <Link href="/products?category=ACCESSORY" className="group bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
//               <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-4"><Headphones className="w-8 h-8 text-white" /></div>
//               <h3 className="text-xl font-bold text-accent mb-2">Accessories</h3>
//             </Link>
//             <Link href="/products?category=SPEAKER" className="group bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
//               <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4"><Speaker className="w-8 h-8 text-white" /></div>
//               <h3 className="text-xl font-bold text-accent mb-2">Speakers</h3>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-16 bg-secondary">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">Featured Products</h2>
//           </div>
//           {isLoading ? (
//             <div className="text-center">Loading products...</div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {featuredProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Gallery Section - Only renders if there are images */}
//       {galleryImages.length > 0 && (
//         <section className="py-16 bg-secondary">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">Product Gallery</h2>
//             </div>
//             <Masonry columnsCount={4} gutter="16px">
//               {galleryImages.map((image, index) => (
//                 <div key={index} className="overflow-hidden rounded-lg hover:shadow-xl transition-all cursor-pointer">
//                   <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-auto hover:scale-110 transition-transform duration-300" />
//                 </div>
//               ))}
//             </Masonry>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }