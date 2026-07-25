"use client";

import { useState, useEffect } from 'react';

const WISHLIST_STORAGE_KEY = 'verdantnest_wishlist';
const WISHLIST_EVENT = 'wishlist_updated';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    // Initial load
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        setWishlist([]);
      }
    }

    // Listen for updates from other components
    const handleUpdate = () => {
      const updated = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (updated) setWishlist(JSON.parse(updated));
    };

    window.addEventListener(WISHLIST_EVENT, handleUpdate);
    return () => window.removeEventListener(WISHLIST_EVENT, handleUpdate);
  }, []);

  const toggleWishlist = (id: string) => {
    const newWishlist = wishlist.includes(id)
      ? wishlist.filter(item => item !== id)
      : [...wishlist, id];
    
    setWishlist(newWishlist);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newWishlist));
    window.dispatchEvent(new Event(WISHLIST_EVENT));
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  return { wishlist, toggleWishlist, isInWishlist };
}
