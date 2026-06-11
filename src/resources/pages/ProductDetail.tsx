"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, MessageCircle, ArrowLeft, Check, Share2, ZoomIn, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";



export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      if (!product) return;
      const params = new URLSearchParams();
      params.set("limit", "4");
      if (product.category) params.set("category", product.category);
      if (product.brand) params.set("brand", product.brand);
      
      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();
      setRelatedProducts((data.data || []).filter((p: Product) => p.id !== product.id));
    } catch (error) {
      console.error("Failed to fetch related products:", error);
    }
  };
const { addToCart } = useCart();

const handleAddToCart = (e: React.MouseEvent) => {
  e.preventDefault();

  if (!product) return;

  addToCart(product);
  toast.success(`${product.name} added to cart!`);
};

  // const handleAddToCart = () => {
  //   if (product) {
  //     toast.success(`${product.name} added to cart!`);
  //   }
  // };

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} for ${product.price} RWF`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600">Rujama Shop...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-red-600 hover:text-red-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.image || ["/placeholder.jpg"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Gallery */}
            <div>
              <div
                className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 relative cursor-zoom-in"
                onClick={() => setIsZoomOpen(true)}
              >
                <Image
                  src={images[selectedImage] || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </div>
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? "border-red-600" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2 flex-wrap">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded font-medium">
                    {product.brand}
                  </span>
                  <span className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded font-medium">
                    {product.category}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm rounded font-medium ${
                      product.condition === "NEW"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {product.condition}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-6">
                  {formatPrice(product.price)}
                </div>
              </div>

              {/* Dynamic Specifications */}
              <div className="border-t border-b border-gray-200 py-6 space-y-3">
                <h3 className="font-bold text-gray-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Condition</span>
                    <span className="font-medium text-gray-900">{product.condition}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Brand</span>
                    <span className="font-medium text-gray-900">{product.brand}</span>
                  </div>
                  {product.storage && (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Storage</span>
                      <span className="font-medium text-gray-900">{product.storage}</span>
                    </div>
                  )}
                  {product.batteryLife && (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Battery Life</span>
                      <span className="font-medium text-gray-900">{product.batteryLife}</span>
                    </div>
                  )}
                  {product.type && (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Type</span>
                      <span className="font-medium text-gray-900">{product.type}</span>
                    </div>
                  )}
                </div>
              </div>

              {product.description && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/250788773758"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    onClick={handleShare}
                    className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold flex items-center justify-center transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsZoomOpen(false)} />
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute -top-12 right-0 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src={images[selectedImage] || "/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
