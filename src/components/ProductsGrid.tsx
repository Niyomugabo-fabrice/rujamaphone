"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import FilterDrawer from "@/components/FilterDrawer";
import FilterChips from "@/components/FilterChips";
import type { Product, ProductFilters, ProductCategory } from "@/types/product";
import { useSearchParams } from "next/navigation";

interface ProductsGridProps {
  initialCategory?: ProductCategory;
}

export default function ProductsGrid({ initialCategory }: ProductsGridProps) {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<ProductFilters>({
  category: initialCategory,
});

const [tempFilters, setTempFilters] = useState<ProductFilters>({
  category: initialCategory,
});

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt-desc");

  useEffect(() => {
    if (initialCategory) {
      setFilters((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

   useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [page, filters, sortBy,searchQuery]);

 

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "12");
      params.set("sort", sortBy);

      if (filters.category) params.set("category", filters.category);
      if (filters.brand) params.set("brand", filters.brand);
      if (filters.condition) params.set("condition", filters.condition);
      if (filters.minPrice) params.set("minPrice", String(filters.minPrice));
      if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice));
      if (filters.storage) params.set("storage", filters.storage);
      if (filters.batteryLife) params.set("batteryLife", filters.batteryLife);
      if (filters.type) params.set("type", filters.type);
      if (searchQuery) params.set("search", searchQuery);

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();

      setProducts(data.data || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };
const handleMobileFiltersChange = (newFilters: ProductFilters) => {
  setTempFilters(newFilters); // ONLY TEMP
};


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };


 const handleFilterChange = <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
  setFilters((prev) => ({
    ...prev,
    [key]: value,
  }));
  setPage(1);
};

  const handleFilterRemove = (key: keyof ProductFilters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    setPage(1);
  };

  const handleClearAll = () => {
    setFilters({ category: initialCategory });
    setSearchQuery("");
    setPage(1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getBrandsForCategory = (category?: ProductCategory): string[] => {
    switch (category) {
      case "SMARTPHONE":
        return ["APPLE", "SAMSUNG", "GOOGLE", "XIAOMI", "ONEPLUS"];
      case "SPEAKER":
        return ["JBL", "SONY", "BOSE", "APPLE", "ANKER"];
      case "ACCESSORY":
        return ["APPLE", "SAMSUNG", "ANKER", "BASEUS", "GENERIC"];
      default:
        return [
          "APPLE",
          "SAMSUNG",
          "GOOGLE",
          "XIAOMI",
          "ONEPLUS",
          "JBL",
          "SONY",
          "BOSE",
          "ANKER",
          "BASEUS",
          "GENERIC",
        ];
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Search and Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">
              {total} {total === 1 ? "product" : "products"} found
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
           
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="createdAt-desc">Newest</option>
                <option value="createdAt-asc">Oldest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        <FilterChips
          filters={filters}
          onFilterRemove={handleFilterRemove}
          onClearAll={handleClearAll}
        />

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  <span>Filters</span>
                </h2>
                <button
                  onClick={handleClearAll}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear All
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {["SMARTPHONE", "SPEAKER", "ACCESSORY"].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={filters.category === cat}
                       onChange={(e) =>
                            handleFilterChange("category", e.target.value as ProductCategory)
                          }
                        className="w-4 h-4 text-red-600"
                      />
                      <span className="capitalize">{cat.toLowerCase()}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Brand</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {getBrandsForCategory(filters.category).map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={filters.brand === brand}
                        onChange={(e) => handleFilterChange("brand", e.target.value)}
                        className="w-4 h-4 text-red-600"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Condition</h3>
                <div className="space-y-2">
                  {["NEW", "USED"].map((cond) => (
                    <label key={cond} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        value={cond}
                        checked={filters.condition === cond}
                        onChange={(e) => handleFilterChange("condition", e.target.value)}
                        className="w-4 h-4 text-red-600"
                      />
                      <span>{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Price Range (RWF)</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Min Price</label>
                    <input
                      type="number"
                      value={filters.minPrice || ""}
                      onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max Price</label>
                    <input
                      type="number"
                      value={filters.maxPrice || ""}
                      onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="1000000"
                    />
                  </div>
                </div>
              </div>

              {/* Category-specific filters */}
              {filters.category === "SMARTPHONE" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Storage</h3>
                  <div className="space-y-2">
                    {["GB64", "GB128", "GB256", "GB512", "TB1"].map((storage) => (
                      <label key={storage} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="storage"
                          value={storage}
                          checked={filters.storage === storage}
                          onChange={(e) => handleFilterChange("storage", e.target.value)}
                          className="w-4 h-4 text-red-600"
                        />
                        <span>{storage}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {filters.category === "SPEAKER" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Battery Life</h3>
                  <input
                    type="text"
                    value={filters.batteryLife || ""}
                    onChange={(e) => handleFilterChange("batteryLife", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., 12 hours"
                  />
                </div>
              )}

              {filters.category === "ACCESSORY" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Type</h3>
                  <div className="space-y-2">
                    {["Cable", "Case", "Charger", "Screen Protector", "Headphones", "Other"].map(
                      (type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="type"
                            value={type}
                            checked={filters.type === type}
                            onChange={(e) => handleFilterChange("type", e.target.value)}
                            className="w-4 h-4 text-red-600"
                          />
                          <span>{type}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="aspect-square bg-gray-200 animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="p-16 text-center bg-white rounded-xl border border-gray-200">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={handleClearAll}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8 p-4 border-t border-gray-200">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
     <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={handleMobileFiltersChange}
        category={filters.category}
        onApply={() => {
    setFilters(tempFilters);   // APPLY HERE
    setPage(1);
  }}
      />
    </div>
  );
}
