import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Star, ShoppingCart, MessageCircle, ArrowLeft, Check } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/ProductCard';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === id);
  const relatedProducts = products
    .filter(p => p.id !== id && p.category === product?.category)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-accent mb-4">Product Not Found</h1>
          <Link href="/products" className="text-primary hover:text-primary/80">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image];

  const handleAddToCart = () => {
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
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>

        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            <div>
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-secondary rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 bg-secondary text-foreground text-sm rounded">
                    {product.brand}
                  </span>
                  {product.condition === 'Used' && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">
                      Used
                    </span>
                  )}
                  {product.condition === 'New' && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>New</span>
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-accent mb-4">{product.name}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <div className="text-4xl font-bold text-primary mb-6">
                  {formatPrice(product.price)}
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-foreground">{product.description}</p>
              </div>

              {product.specs && (
                <div className="border-t border-b border-border py-6 space-y-3">
                  <h3 className="font-bold text-accent mb-4">Specifications</h3>
                  {product.specs.camera && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Camera:</span>
                      <span className="text-foreground font-medium">{product.specs.camera}</span>
                    </div>
                  )}
                  {product.specs.battery && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Battery:</span>
                      <span className="text-foreground font-medium">{product.specs.battery}</span>
                    </div>
                  )}
                  {product.specs.storage && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="text-foreground font-medium">{product.specs.storage}</span>
                    </div>
                  )}
                  {product.specs.display && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Display:</span>
                      <span className="text-foreground font-medium">{product.specs.display}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <a
                  href="https://wa.me/250788773758"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Contact Seller</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-accent mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
