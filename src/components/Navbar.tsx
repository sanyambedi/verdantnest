
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, ShoppingBag, Menu, X, Heart, Store, Info, Stethoscope, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/hooks/use-cart';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/shop', label: 'Shop', icon: Store },
    { href: '/about', label: 'About', icon: Info },
    { href: '/care-guides', label: 'Care', icon: Leaf },
    { href: '/ai-doctor', label: 'Doctor', icon: Stethoscope },
    { href: '/contact', label: 'Contact', icon: MessageSquare },
  ];

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500 px-2 py-2 md:px-8 md:py-4",
      scrolled ? "translate-y-0" : "translate-y-2"
    )}>
      <div className={cn(
        "container mx-auto flex items-center justify-between px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-500 border",
        scrolled 
          ? "bg-black/95 backdrop-blur-xl text-white shadow-2xl border-white/10" 
          : "bg-white/70 backdrop-blur-xl text-primary shadow-sm border-primary/5"
      )}>
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Logo size={36} className="transition-transform duration-500 group-hover:rotate-12" />
          <span className="font-headline text-lg md:text-xl font-extrabold tracking-tighter text-primary">VerdantNest</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={cn(
                "px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all rounded-full flex items-center gap-2",
                pathname === link.href 
                  ? "text-secondary" 
                  : (scrolled ? "text-white/60 hover:text-white" : "text-primary/60 hover:text-primary")
              )}
            >
              {link.label}
            </Link>
          ))}
          
          <div className={cn(
            "flex items-center gap-4 ml-2 pl-4 border-l",
            scrolled ? "border-white/10" : "border-primary/10"
          )}>
            <Link href="/wishlist" className="relative group transition-transform hover:scale-110">
              <Heart className={cn("h-5 w-5 transition-colors", wishlist.length > 0 ? "fill-secondary text-secondary" : (scrolled ? "text-white/50 hover:text-white" : "text-primary/50 hover:text-primary"))} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[9px] text-white font-black shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Button className={cn(
              "rounded-full px-6 font-black text-[10px] uppercase tracking-widest h-10 pill-button transition-transform active:scale-95",
              scrolled ? "bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10" : "bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/10"
            )} asChild>
              <Link href="/cart">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Basket ({cart.length})
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Actions (Visible on small screens) */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/cart" className="relative p-2">
            <ShoppingBag className={cn("h-5 w-5", scrolled ? "text-white" : "text-primary")} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[8px] text-white font-black">
                {cart.length}
              </span>
            )}
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-black text-white z-[-1] lg:hidden flex flex-col p-8 pt-24 gap-4 transition-all duration-500 ease-in-out",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        {navLinks.map((link) => (
          <Link 
            key={link.href}
            href={link.href} 
            className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter hover:text-secondary transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-auto space-y-4">
          <Button className="w-full py-7 text-lg font-black rounded-2xl bg-secondary text-white shadow-2xl shadow-secondary/30" asChild>
            <Link href="/shop" onClick={() => setIsOpen(false)}>Start Growing</Link>
          </Button>
          <div className="flex justify-center gap-6 text-[9px] font-black uppercase tracking-[0.3em] opacity-40">
            <Link href="/wishlist">Wishlist ({wishlist.length})</Link>
            <span>Instagram</span>
            <span>Journal</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
