"use client";

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { PLANTS } from '@/app/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { useWishlist } from '@/hooks/use-wishlist';
import { Button } from '@/components/ui/button';
import { Heart, Sprout, ArrowRight, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const favoritePlants = PLANTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-7xl flex-grow pt-32">
        <header className="mb-16 space-y-4">
          <div className="flex items-center gap-3">
             <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none px-4 py-1.5 rounded-full font-black text-[10px] tracking-widest uppercase">
                Curated Collection
             </Badge>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary flex items-center gap-4">
                <Heart className="w-10 h-10 md:w-16 md:h-16 fill-secondary text-secondary" />
                My Favorites
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl font-medium italic">
                A private sanctuary of the species you've curated for your future home.
              </p>
            </div>
            {favoritePlants.length > 0 && (
              <Badge variant="outline" className="px-6 py-3 rounded-2xl border-primary/10 bg-white shadow-sm font-black text-sm text-primary">
                {favoritePlants.length} Saved Specimens
              </Badge>
            )}
          </div>
        </header>

        {favoritePlants.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favoritePlants.map((plant) => (
              <div key={plant.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ProductCard plant={plant} />
              </div>
            ))}
          </div>
        ) : (
          <section className="text-center py-32 bg-white rounded-[4rem] border border-dashed border-primary/10 shadow-sm max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 text-primary/20">
              <Sprout className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-headline font-bold text-primary mb-4">Your sanctuary is waiting.</h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10 font-medium">
              You haven't saved any green companions yet. Explore our curated collection to start building your indoor jungle.
            </p>
            <Button size="lg" className="rounded-2xl px-12 h-16 text-lg font-black gap-3 shadow-xl shadow-primary/20" asChild>
              <Link href="/shop">
                Explore Collection <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </section>
        )}

        {favoritePlants.length > 0 && (
          <section className="mt-24 p-12 bg-primary rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md space-y-2">
              <h3 className="text-3xl font-headline font-bold">Ready to bring them home?</h3>
              <p className="text-white/60 font-medium leading-relaxed">
                Add your favorites to your basket to begin the botanical conditioning process for your sanctuary.
              </p>
            </div>
            <Button variant="secondary" size="lg" className="rounded-2xl px-10 h-16 text-lg font-black gap-2 shadow-2xl" asChild>
              <Link href="/cart">Go to Basket <ArrowRight className="w-5 h-5" /></Link>
            </Button>
          </section>
        )}
      </main>

      <footer className="bg-white py-16 mt-auto border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
            © {new Date().getFullYear()} VerdantNest • Private Collection Saved Locally
          </p>
        </div>
      </footer>
    </div>
  );
}
