"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
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

  const addToCart = (product: Product) => {
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
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => String(item.id) !== String(productId)));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        String(item.id) === String(productId) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
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