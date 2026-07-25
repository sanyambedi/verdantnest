
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plant } from '@/app/types';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  plant: Plant;
}

export const ProductCard = ({ plant }: ProductCardProps) => {
  const { toast } = useToast();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [reviewCount, setReviewCount] = useState<number | null>(null);

  useEffect(() => {
    // Move side effects to useEffect to avoid hydration mismatch
    setReviewCount(Math.floor(Math.random() * 100) + 20);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(plant.id);
    toast({
      title: "Added to basket",
      description: `${plant.name} added.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(plant.id);
  };

  const isBestSeller = parseInt(plant.id) === 1 || parseInt(plant.id) === 3;
  const isNew = parseInt(plant.id) === 11;
  const hasDiscount = plant.originalPrice && plant.originalPrice > plant.price;
  const discountPercent = hasDiscount 
    ? Math.round(((plant.originalPrice! - plant.price) / plant.originalPrice!) * 100) 
    : 0;

  return (
    <div className="group h-full">
      <Link href={`/products/${plant.slug}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-primary/5 h-full flex flex-col transition-all hover:shadow-md">
          <div className="relative aspect-square bg-[#F9FAF8] overflow-hidden">
            <Image
              src={plant.image}
              alt={plant.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="botanical plant"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
               {isBestSeller && <Badge className="bg-secondary text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-sm">Best Seller</Badge>}
               {isNew && <Badge className="bg-primary text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-sm">New</Badge>}
               {hasDiscount && (
                 <Badge className="bg-red-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-sm flex items-center gap-1">
                   <Tag className="w-2 h-2" /> {discountPercent}% OFF
                 </Badge>
               )}
            </div>
            <button 
              onClick={handleToggleWishlist}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-primary/40 hover:text-secondary transition-colors"
            >
              <Heart className={cn("w-4 h-4", isInWishlist(plant.id) && "fill-secondary text-secondary")} />
            </button>
          </div>
          
          <CardContent className="p-4 flex-grow flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-primary truncate">{plant.name}</h3>
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-3 h-3", i < 5 ? "fill-current" : "text-muted")} />
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground font-bold">
                  ({reviewCount !== null ? reviewCount : '...'})
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-base font-black text-secondary">${plant.price.toFixed(2)}</p>
                {hasDiscount && (
                  <p className="text-[10px] text-muted-foreground line-through decoration-red-400/50">${plant.originalPrice?.toFixed(2)}</p>
                )}
              </div>
              <Button 
                onClick={handleAddToCart}
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-md border-primary/5 hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Link>
    </div>
  );
};
