import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import * as Slider from '@radix-ui/react-slider';

export function Products() {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1500000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');

  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category');
  const conditionParam = searchParams.get('condition');

  useMemo(() => {
    if (categoryParam) {
      setSelectedCategory([categoryParam]);
    }
    if (conditionParam) {
      setSelectedCondition([conditionParam]);
    }
  }, [categoryParam, conditionParam]);

  const brands = [...new Set(products.map(p => p.brand))];
  const storageOptions = [...new Set(products.map(p => p.storage).filter(Boolean))];
  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    if (selectedStorage.length > 0) {
      filtered = filtered.filter(p => p.storage && selectedStorage.includes(p.storage));
    }

    if (selectedCondition.length > 0) {
      filtered = filtered.filter(p => selectedCondition.includes(p.condition));
    }

    if (selectedCategory.length > 0) {
      filtered = filtered.filter(p => selectedCategory.includes(p.category));
    }

    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [searchQuery, priceRange, selectedBrands, selectedStorage, selectedCondition, selectedCategory, sortBy]);

  const toggleFilter = (value: string, selected: string[], setter: (v: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter(v => v !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-accent mb-2">All Products</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden px-4 py-2 bg-white border border-border rounded-lg flex items-center space-x-2 hover:bg-secondary transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {showFilters && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-border p-6 sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-accent flex items-center space-x-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    <span>Filters</span>
                  </h2>
                  <button
                    onClick={() => {
                      setPriceRange([0, 1500000]);
                      setSelectedBrands([]);
                      setSelectedStorage([]);
                      setSelectedCondition([]);
                      setSelectedCategory([]);
                    }}
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    Clear All
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <Slider.Root
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={1500000}
                      step={50000}
                      className="relative flex items-center w-full h-5"
                    >
                      <Slider.Track className="relative bg-secondary rounded-full h-1 flex-grow">
                        <Slider.Range className="absolute bg-primary rounded-full h-full" />
                      </Slider.Track>
                      <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-primary rounded-full hover:bg-primary/10 focus:outline-none" />
                      <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-primary rounded-full hover:bg-primary/10 focus:outline-none" />
                    </Slider.Root>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategory.includes(category)}
                          onChange={() => toggleFilter(category, selectedCategory, setSelectedCategory)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">Brand</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">Storage</h3>
                  <div className="space-y-2">
                    {storageOptions.map(storage => (
                      <label key={storage} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStorage.includes(storage as string)}
                          onChange={() => toggleFilter(storage as string, selectedStorage, setSelectedStorage)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{storage}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">Condition</h3>
                  <div className="space-y-2">
                    {['New', 'Used'].map(condition => (
                      <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCondition.includes(condition)}
                          onChange={() => toggleFilter(condition, selectedCondition, setSelectedCondition)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border border-border">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-accent mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setPriceRange([0, 1500000]);
                    setSelectedBrands([]);
                    setSelectedStorage([]);
                    setSelectedCondition([]);
                    setSelectedCategory([]);
                  }}
                  className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
