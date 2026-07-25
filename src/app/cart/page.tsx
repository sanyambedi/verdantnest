"use client";

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { PLANTS } from '@/app/lib/data';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight, Trash2, Sprout, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  
  const cartProducts = cart.map(id => PLANTS.find(p => p.id === id)).filter(Boolean) as any[];
  const subtotal = cartProducts.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:py-32 max-w-6xl flex-grow">
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-2 md:mb-4">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary">Your Basket</h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-lg">Review your curated botanical selection before checkout.</p>
        </header>

        {cartProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {cartProducts.map((plant, index) => (
                <div key={`${plant.id}-${index}`} className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white rounded-[1.5rem] md:rounded-[2rem] border border-primary/5 shadow-sm group">
                  <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-xl md:rounded-2xl overflow-hidden shrink-0 bg-muted/20">
                    <Image src={plant.image} alt={plant.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-xl font-bold text-primary">{plant.name}</h3>
                    <p className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest">{plant.category}</p>
                    <p className="text-base md:text-lg font-black text-primary mt-0.5 md:mt-1">${plant.price.toFixed(2)}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 h-10 w-10 md:h-12 md:w-12"
                    onClick={() => removeFromCart(plant.id)}
                  >
                    <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </div>
              ))}
            </div>

            <aside className="space-y-6 md:space-y-8">
              <div className="p-6 md:p-8 bg-primary rounded-[2rem] md:rounded-[3rem] text-white space-y-4 md:space-y-6 shadow-2xl">
                <h2 className="text-xl md:text-2xl font-headline font-bold">Order Summary</h2>
                <div className="space-y-3 md:space-y-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="opacity-70">Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="opacity-70">Shipping</span>
                    <span className="font-bold text-secondary">Free</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between text-xl md:text-2xl font-black">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full h-14 md:h-16 rounded-xl md:rounded-2xl bg-secondary text-white hover:bg-secondary/90 font-black text-lg md:text-xl shadow-xl shadow-secondary/20 group" asChild>
                  <Link href="/checkout">
                    Secure Checkout
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                
                <div className="flex items-center justify-center gap-2 opacity-60 text-[8px] md:text-[10px] font-black uppercase tracking-widest pt-2 md:pt-4">
                  <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
                  Encrypted SSL Checkout
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <section className="text-center py-20 md:py-32 bg-white/50 backdrop-blur-sm rounded-[2rem] md:rounded-[3rem] border border-dashed border-primary/20">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Sprout className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h2 className="text-xl md:text-2xl font-headline font-bold text-primary mb-3">Your Basket is Empty</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xs md:max-w-md mx-auto mb-8 px-4">
              Looks like your basket is waiting for its first green friend. Explore our collection and start building your indoor jungle.
            </p>
            <Button size="lg" className="rounded-xl px-8 h-12 md:h-14 font-bold gap-2" asChild>
              <Link href="/shop">
                Explore Collection <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </section>
        )}
      </main>

      <footer className="bg-primary text-primary-foreground py-10 mt-auto">
        <div className="container mx-auto px-4 text-center opacity-70 text-[10px] md:text-xs">
          © {new Date().getFullYear()} VerdantNest. Selections are saved locally to your browser.
        </div>
      </footer>
    </div>
  );
}