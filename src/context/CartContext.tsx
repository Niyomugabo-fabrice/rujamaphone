"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import type { Product } from "@/types/product";

export interface CartItem extends Omit<Product, "image"> {
  image: string; // single image for cart UI
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      // We use String() conversion to ensure we are comparing values, 
      // not memory references or mismatched types (e.g., "1" vs 1)
      const targetId = String(product.id);
      const existingItem = prevCart.find(item => String(item.id) === targetId);

      if (existingItem) {
        return prevCart.map(item =>
          String(item.id) === targetId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // If no match, add the new item
      return [
        ...prevCart,
        {
          ...product,
          // Ensure we extract a single string for the image
          image: Array.isArray(product.image) 
            ? (product.image[0] || "") 
            : (product.image || ""), 
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => String(item.id) !== String(productId)));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        String(item.id) === String(productId) ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [addToCart, cart, clearCart, removeFromCart, totalItems, totalPrice, updateQuantity]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
