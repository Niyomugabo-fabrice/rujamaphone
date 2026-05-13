import { Link } from 'react-router';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs px-2 py-1 bg-secondary text-foreground rounded">
            {product.brand}
          </span>
          {product.condition === 'Used' && (
            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
              Used
            </span>
          )}
        </div>
        <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="font-bold text-lg text-primary">
            {formatPrice(product.price)}
          </div>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
