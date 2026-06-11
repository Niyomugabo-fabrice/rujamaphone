"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart, Eye, X } from "lucide-react";
import type { Product } from "@/types/product";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const images = product.image || [];
  const currentImage = images[currentImageIndex] || "/placeholder.jpg";

  return (
    <>
      <Link
        href={`/products/${product.id}`}
        className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
      >
        {/* Image Gallery */}
        <div
          className="aspect-square overflow-hidden bg-gray-100 relative"
          onMouseEnter={() => images.length > 1 && setCurrentImageIndex(1)}
          onMouseLeave={() => setCurrentImageIndex(0)}
        >
          <Image
            src={currentImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full ${
                    idx === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleWishlistToggle}
              className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
            </button>
            <button
              onClick={handleQuickView}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Condition Badge */}
          <div className="absolute top-2 left-2">
            <span
              className={`text-xs px-2 py-1 rounded font-semibold ${
                product.condition === "NEW"
                  ? "bg-emerald-500 text-white"
                  : "bg-amber-500 text-white"
              }`}
            >
              {product.condition}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded font-medium">
              {product.brand}
            </span>
            <span className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded font-medium">
              {product.category}
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg text-gray-900">
              {formatPrice(product.price)}
            </div>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsQuickViewOpen(false)} />
          <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Gallery */}
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <Image
                  src={images[0] || "/placeholder.jpg"}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded font-medium">
                    {product.brand}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">{product.name}</h2>
                </div>

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
                  <span className="text-sm text-gray-500 ml-1">({product.reviews} reviews)</span>
                </div>

                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Condition:</span>
                    <span
                      className={`text-xs px-2 py-1 rounded font-semibold ${
                        product.condition === "NEW"
                          ? "bg-emerald-500 text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {product.condition}
                    </span>
                  </div>

                  {product.storage && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Storage:</span>
                      <span className="text-sm font-medium">{product.storage}</span>
                    </div>
                  )}

                  {product.batteryLife && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Battery Life:</span>
                      <span className="text-sm font-medium">{product.batteryLife}</span>
                    </div>
                  )}

                  {product.type && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm font-medium">{product.type}</span>
                    </div>
                  )}
                </div>

                {product.description && (
                  <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
                  >
                    Add to Cart
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-900 rounded-xl font-semibold transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
