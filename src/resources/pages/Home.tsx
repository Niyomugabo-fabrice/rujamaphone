"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Smartphone, Headphones, Speaker, Zap, Shield, Truck } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle } from "lucide-react";
import type { Product } from "@/types/product";

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



const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [speakerProducts, setSpeakerProducts] = useState<Product[]>([]);
  const [accessoryProducts, setAccessoryProducts] = useState<Product[]>([]);

useEffect(() => {
  async function fetchProducts() {
    try {
      const res = await fetch(
        "/api/products/preview?smartphoneLimit=9&speakerLimit=6&accessoryLimit=9"
      );
      const data = await res.json();

      if (data.success) {
        setFeaturedProducts(Array.isArray(data.data.smartphones) ? data.data.smartphones : []);
        setSpeakerProducts(Array.isArray(data.data.speakers) ? data.data.speakers : []);
        setAccessoryProducts(Array.isArray(data.data.accessories) ? data.data.accessories : []);
      } else {
        setFeaturedProducts([]);
        setSpeakerProducts([]);
        setAccessoryProducts([]);
      }
    } catch (err) {
      console.error(err);
      setFeaturedProducts([]);
      setSpeakerProducts([]);
      setAccessoryProducts([]);
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

                    <Image
                      src={img}
                      alt={`Slide ${i + 1}`}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 768px) 280px, 320px"
                      className="object-cover"
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
            { title: "Smartphones", key: "SMARTPHONE", icon: Smartphone },
            { title: "Accessories", key: "ACCESSORY", icon: Headphones },
            { title: "Speakers", key: "SPEAKER", icon: Speaker },
          ].map((item, i) => (
            <Link
              key={i}
              href={`/products?category=${item.key}`}
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

          <div className="space-y-12">
            {featuredProducts.length > 0 && (
              <section className="rounded-3xl bg-white p-8 shadow-sm">
                <div className="mb-8 text-center">
                  
                  <h2 className="mt-4 text-3xl font-bold text-accent">
                    Latest smartphone deals in Kigali
                  </h2>
                  <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                    Browse top phones with great prices, latest specs, and trusted warranties.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link href="/products?category=SMARTPHONE" className="text-sm font-semibold text-primary hover:underline">
                    View all smartphones
                  </Link>
                </div>
              </section>
            )}

            {speakerProducts.length > 0 && (
              <section className="rounded-3xl bg-white p-8 shadow-sm">
                <div className="mb-8 text-center">
                  
                  <h2 className="mt-4 text-3xl font-bold text-accent">
                    Top speaker picks for your home and car
                  </h2>
                  <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                    Discover curated speakers with powerful sound, stylish design, and reliable performance for every room and ride.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {speakerProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link href="/products?category=SPEAKER" className="text-sm font-semibold text-primary hover:underline">
                    View all speakers
                  </Link>
                </div>
              </section>
            )}

            {accessoryProducts.length > 0 && (
              <section className="rounded-3xl bg-white p-8 shadow-sm">
                <div className="mb-8 text-center">
                  
                  <h2 className="mt-4 text-3xl font-bold text-accent">
                    Essential accessories for your device
                  </h2>
                  <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                    Find the perfect charging, protection, and audio accessories to complete your setup.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {accessoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link href="/products?category=ACCESSORY" className="text-sm font-semibold text-primary hover:underline">
                    View all accessories
                  </Link>
                </div>
              </section>
            )}
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