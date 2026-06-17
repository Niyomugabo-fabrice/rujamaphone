import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `
New Order from ${formData.name}

Phone: ${formData.phone}
Location: ${formData.location}

Items:
${cart.map(item => `- ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`).join('\n')}

Total: ${formatPrice(totalPrice)}
    `.trim();

    const whatsappUrl = `https://wa.me/+250788773754?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-accent mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some products to get started
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>

        <h1 className="text-3xl font-bold text-accent mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-border p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={96}
                  height={96}
                  sizes="(max-width: 640px) 80px, 96px"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg bg-secondary shrink-0"
                />
                <div className="flex-1 w-full min-w-0">
                  <Link
                    href={`/products/${item.id}`}
                    className="font-semibold text-accent hover:text-primary transition-colors text-sm sm:text-base"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{item.brand}</p>
                  <div className="mt-2 font-bold text-primary text-sm sm:text-base">
                    {formatPrice(item.price)}
                  </div>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:space-y-3 gap-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-secondary hover:bg-muted rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-secondary hover:bg-muted rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right sm:text-left">
                    <div className="font-bold text-accent mb-1 sm:mb-2 text-sm sm:text-base">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-4 sm:p-6 sticky top-24">
              <h2 className="text-lg sm:text-xl font-bold text-accent mb-4 sm:mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-accent">Total</span>
                    <span className="font-bold text-primary text-xl">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {!showCheckout ? (
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <form onSubmit={handleSubmitOrder} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                      placeholder="078 XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                      placeholder="District, Sector, and street or landmark"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Please include District and Sector in your location.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all text-sm sm:text-base"
                  >
                    Place Order via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="w-full px-4 sm:px-6 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
