"use client";

import { useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'verdantnest_cart';
const CART_EVENT = 'cart_updated';

export function useCart() {
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        setCart([]);
      }
    }

    const handleUpdate = () => {
      const updated = localStorage.getItem(CART_STORAGE_KEY);
      if (updated) setCart(JSON.parse(updated));
    };

    window.addEventListener(CART_EVENT, handleUpdate);
    return () => window.removeEventListener(CART_EVENT, handleUpdate);
  }, []);

  const addToCart = (id: string) => {
    const newCart = [...cart, id];
    setCart(newCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    window.dispatchEvent(new Event(CART_EVENT));
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter(itemId => itemId !== id);
    setCart(newCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    window.dispatchEvent(new Event(CART_EVENT));
  };

  const isInCart = (id: string) => cart.includes(id);

  return { cart, addToCart, removeFromCart, isInCart };
}
