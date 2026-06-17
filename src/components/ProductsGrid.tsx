"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { SlidersHorizontal, ChevronDown, X, Smartphone, Speaker, Headphones } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import FilterDrawer from "@/components/FilterDrawer";
import FilterChips from "@/components/FilterChips";
import { PriceRangeSlider } from "@/components/PriceRangeSlider";
import type { Product, ProductFilters, ProductCategory } from "@/types/product";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ProductsGridProps {
  initialCategory?: ProductCategory;
}

export default function ProductsGrid({ initialCategory }: ProductsGridProps) {
  const searchParams = useSearchParams();
  const defaultLimit = 24;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const categoryParam = searchParams.get("category") as ProductCategory | undefined;
  const initialFilters: ProductFilters = {
    category: initialCategory ?? categoryParam,
  };

  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const [tempFilters, setTempFilters] = useState<ProductFilters>(initialFilters);

  const handleMobileFiltersChange = useCallback((nextFilters: ProductFilters) => {
    setTempFilters(nextFilters);
  }, []);

  const [ignoreUrlSearch, setIgnoreUrlSearch] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt-desc");
  const router = useRouter();
  const pathname = usePathname();
  const searchParamValue = searchParams.get("search") || "";
  const effectiveSearch = ignoreUrlSearch ? "" : searchParamValue;
  const isDefaultGroupedView =
    !effectiveSearch &&
    !filters.category &&
    !filters.minPrice &&
    !filters.maxPrice &&
    !filters.brand &&
    !filters.condition &&
    !filters.storage &&
    !filters.batteryLife &&
    !filters.type;

  const categories: Array<{ key: ProductCategory; label: string; icon: typeof Smartphone }> = [
    { key: "SMARTPHONE", label: "Smartphones", icon: Smartphone },
    { key: "SPEAKER", label: "Speakers", icon: Speaker },
    { key: "ACCESSORY", label: "Accessories", icon: Headphones },
  ];

  const syncFiltersToUrl = useCallback((nextFilters: ProductFilters) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextFilters.search) {
      params.set("search", String(nextFilters.search));
    } else {
      params.delete("search");
    }

    if (nextFilters.category) {
      params.set("category", nextFilters.category);
    } else {
      params.delete("category");
    }

    if (nextFilters.minPrice != null) {
      params.set("minPrice", String(nextFilters.minPrice));
    } else {
      params.delete("minPrice");
    }

    if (nextFilters.maxPrice != null) {
      params.set("maxPrice", String(nextFilters.maxPrice));
    } else {
      params.delete("maxPrice");
    }

    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, {
      scroll: false,
    });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (initialCategory) {
      setFilters((prev) => ({ ...prev, category: initialCategory }));
      setTempFilters((prev) => ({ ...prev, category: initialCategory }));
      return;
    }

    if (categoryParam && filters.category !== categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
      setTempFilters((prev) => ({ ...prev, category: categoryParam }));
      setPage(1);
      return;
    }

    if (!categoryParam && filters.category && !initialCategory) {
      setFilters((prev) => ({ ...prev, category: undefined }));
      setTempFilters((prev) => ({ ...prev, category: undefined }));
      setPage(1);
    }
  }, [initialCategory, categoryParam, filters.category]);

  useEffect(() => {
    if (searchParamValue) {
      setIgnoreUrlSearch(false);
    }
  }, [searchParamValue]);

const clearUrlSearch = useCallback(() => {
  if (!searchParamValue) return;

  setIgnoreUrlSearch(true);
  const params = new URLSearchParams(searchParams.toString());
  params.delete("search");

  const queryString = params.toString();
  router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
}, [pathname, router, searchParamValue, searchParams]);

const fetchProducts = useCallback(async (signal?: AbortSignal) => {
  setIsLoading(true);
  try {
    let response: Response;
    let data: any;

    if (isDefaultGroupedView) {
      response = await fetch(
        "/api/products/preview?smartphoneLimit=9&speakerLimit=6&accessoryLimit=9",
        { signal }
      );
      if (!response.ok) throw new Error("Failed to fetch products preview");
      data = await response.json();

      const smartphones = Array.isArray(data.data?.smartphones) ? data.data.smartphones : [];
      const speakers = Array.isArray(data.data?.speakers) ? data.data.speakers : [];
      const accessories = Array.isArray(data.data?.accessories) ? data.data.accessories : [];
      const combined = [...smartphones, ...speakers, ...accessories];

      setProducts(combined);
      setTotal(combined.length);
      setHasMore(false);
    } else {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      params.set("sort", sortBy);

      if (effectiveSearch) params.set("search", effectiveSearch);
      if (filters.category) params.set("category", filters.category);
      if (filters.minPrice) params.set("minPrice", String(filters.minPrice));
      if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice));

      response = await fetch(`/api/products?${params.toString()}`, { signal });
      if (!response.ok) throw new Error("Failed to fetch products");
      data = await response.json();

      setProducts(Array.isArray(data.data) ? data.data : []);
      setTotal(typeof data.total === "number" ? data.total : 0);
      setHasMore(typeof data.total === "number" ? data.total > (data.data?.length ?? 0) : false);
    }
  } catch (error) {
    if ((error as DOMException).name === "AbortError") return;
    console.error("SEARCH_API_ERROR:", error);
    setProducts([]);
    setTotal(0);
    setHasMore(false);
  } finally {
    if (!signal?.aborted) {
      setIsLoading(false);
    }
  }
}, [effectiveSearch, filters, isDefaultGroupedView, limit, sortBy, page]);

useEffect(() => {
  const controller = new AbortController();
  fetchProducts(controller.signal);
  return () => controller.abort();
}, [fetchProducts]);


 const handleFilterChange = useCallback(<K extends keyof ProductFilters,>(key: K, value: ProductFilters[K]) => {
  const nextFilters = key === "category"
    ? {
        ...filters,
        category: value as ProductCategory,
      }
    : {
        ...filters,
        [key]: value,
      };

  setFilters(nextFilters);
  syncFiltersToUrl(nextFilters);
  setLimit(defaultLimit);
  setPage(1);
}, [filters, syncFiltersToUrl]);

  const handleFilterRemove = useCallback((key: keyof ProductFilters) => {
    clearUrlSearch();
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    setLimit(defaultLimit);
    setPage(1);
    syncFiltersToUrl(newFilters);
  }, [clearUrlSearch, filters, syncFiltersToUrl]);

 
const handleClearAll = useCallback(() => {
  const resetFilters = { category: initialCategory };
  setFilters(resetFilters);
  setTempFilters(resetFilters);
  setLimit(defaultLimit);
  setPage(1);
  router.push(pathname);
}, [initialCategory, pathname, router]);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
  }).format(price);
};



  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Search and Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {filters.category ? `${filters.category.toLowerCase()} products` : "All Products"}
            </h1>
            <p className="text-gray-600">
              {total} {total === 1 ? "product" : "products"} found
            </p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = filters.category === category.key;
              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => {
                    const nextFilters = {
                      ...filters,
                      category: filters.category === category.key ? undefined : category.key,
                    };
                    setFilters(nextFilters);
                    setTempFilters(nextFilters);
                    setLimit(defaultLimit);
                    setPage(1);
                    syncFiltersToUrl(nextFilters);
                  }}
                  className={`rounded-full px-4 py-2 flex items-center gap-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`} />
                  <span>{category.label}</span>
                </button>
              );
            })}
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
              onClick={() => {
                setTempFilters(filters);
                setIsFilterOpen(true);
              }}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        <FilterChips
          filters={effectiveSearch ? { ...filters, search: effectiveSearch } : filters}
          onFilterRemove={(key) => {
            if (key === "search") {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("search");
              params.set("page", "1");
              router.push(`${pathname}?${params.toString()}`);
            } else {
              handleFilterRemove(key);
            }
          }}
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

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Price Range (RWF)</h3>
                <PriceRangeSlider
                  minPrice={filters.minPrice}
                  maxPrice={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div>
                <div className="mb-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 rounded-full bg-[#820210]/10 p-2 shadow-sm flex items-center justify-center">
                        <Image
                          src="/image/logo.jpeg"
                          alt="Rujama Phones Shop logo"
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-36 rounded-full bg-gray-200 animate-pulse" />
                        <div className="h-3 w-24 rounded-full bg-gray-200 animate-pulse" />
                      </div>
                    </div>
                    <div className="h-10 w-28 rounded-full bg-gray-200 animate-pulse" />
                  </div>
                </div>
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
              </div>
            ) : products.length === 0 ? (
              <div className="p-16 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-[#820210] p-4 shadow-inner">
                  <Image
                    src="/image/logo.jpeg"
                    alt="Rujama Phones Shop logo"
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                </div>
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
                {isDefaultGroupedView ? (
                  <div className="space-y-12">
                    {[
                      { title: "Smartphones", category: "SMARTPHONE" as const },
                      { title: "Speakers", category: "SPEAKER" as const },
                      { title: "Accessories", category: "ACCESSORY" as const },
                    ].map((section) => {
                      const sectionProducts = products.filter(
                        (product) => product.category === section.category
                      );

                      if (sectionProducts.length === 0) return null;

                      return (
                        <section key={section.category}>
                          <div className="mb-6 flex items-center justify-between">
                            <div>
                              <h2 className="text-3xl font-bold text-accent">
                                {section.title}
                              </h2>
                              <p className="text-sm text-muted-foreground">
                                Browse the latest {section.title.toLowerCase()}.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.set("category", section.category);
                                router.push(`${pathname}?${params.toString()}`);
                              }}
                              className="text-sm text-primary hover:underline"
                            >
                              View all
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sectionProducts.map((product) => (
                              <ProductCard key={product.id} product={product} />
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    {hasMore && (
                      <div className="flex justify-center mt-8">
                        <button
                          type="button"
                          onClick={() => setLimit((current) => current + defaultLimit)}
                          className="px-6 py-3 bg-primary text-white rounded-xl shadow hover:bg-primary/90 transition"
                        >
                          Load More
                        </button>
                      </div>
                    )}
                  </>
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
        filters={tempFilters}
        onFiltersChange={handleMobileFiltersChange}
        category={tempFilters.category}
        onApply={(nextFilters) => {
          setFilters(nextFilters);
          setTempFilters(nextFilters);
          setLimit(defaultLimit);
          setPage(1);
          syncFiltersToUrl(nextFilters);
          setIsFilterOpen(false);
        }}
      />
    </div>
  );
}
