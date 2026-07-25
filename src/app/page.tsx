"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Logo } from '@/components/Logo';
import { ProductCard } from '@/components/ProductCard';
import { PLANTS } from './lib/data';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { 
  Truck, 
  Leaf, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  ChevronRight,
  Star,
  Zap,
  Timer,
  LayoutGrid
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const featuredPlants = PLANTS.slice(0, 10);
  const salePlants = PLANTS.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const heroImg = PlaceHolderImages.find(i => i.id === 'hero-banner')?.imageUrl || 'https://picsum.photos/seed/hero-collection/1200/800';

  const categories = [
    { label: "Indoor", desc: "Home Habitat", slug: "Indoor", image: PlaceHolderImages.find(i => i.id === 'monstera')?.imageUrl, hint: "monstera plant" },
    { label: "Outdoor", desc: "Garden Art", slug: "Outdoor", image: PlaceHolderImages.find(i => i.id === 'japanese-maple')?.imageUrl, hint: "maple tree" },
    { label: "Purifiers", desc: "Clean Air", slug: "Air Purifier", image: PlaceHolderImages.find(i => i.id === 'snake-plant')?.imageUrl, hint: "snake plant" },
    { label: "Succulents", desc: "Low Water", slug: "Succulent", image: PlaceHolderImages.find(i => i.id === 'succulent')?.imageUrl, hint: "succulent arrangement" },
    { label: "Bonsai", desc: "Living Art", slug: "Bonsai", image: PlaceHolderImages.find(i => i.id === 'juniper-bonsai')?.imageUrl, hint: "juniper bonsai" },
    { label: "Herbs", desc: "Culinary", slug: "Herb", image: PlaceHolderImages.find(i => i.id === 'basil')?.imageUrl, hint: "basil herb" },
    { label: "Fruits", desc: "Harvest", slug: "Fruit", image: PlaceHolderImages.find(i => i.id === 'lemon-tree')?.imageUrl, hint: "lemon tree" },
    { label: "Hanging", desc: "Vertical", slug: "Hanging", image: PlaceHolderImages.find(i => i.id === 'boston-fern')?.imageUrl, hint: "boston fern" },
  ];

  const trustSignals = [
    { icon: Leaf, title: "Curated Quality", desc: "Expert selection" },
    { icon: Truck, title: "Eco-Shipping", desc: "Safe arrival" },
    { icon: ShieldCheck, title: "Secure Checkout", desc: "Vault protected" },
    { icon: Users, title: "Expert Support", desc: "Botanist help" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAF8]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-40 pb-12 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-6 animate-slide-up text-center lg:text-left">
              <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 rounded-full font-black text-[10px] tracking-widest uppercase">
                Botanical Excellence
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold text-primary leading-tight">
                Architect Your <br className="hidden md:block" /> Living Space
              </h1>
              <p className="text-base md:text-lg text-muted-foreground font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Premium botanical specimens conditioned for your home. Purify your air and elevate your aesthetic with our curated collection of 30+ unique species.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
                <Button size="lg" className="rounded-xl px-10 h-14 md:h-16 text-xs font-black bg-primary text-white hover:bg-primary/90 shadow-xl" asChild>
                  <Link href="/shop">SHOP COLLECTION</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-xl px-10 h-14 md:h-16 text-xs font-black text-primary border-primary/20 hover:bg-primary/5" asChild>
                  <Link href="/shop">EXPLORE HABITATS</Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src={heroImg} 
                alt="Verdant Collection" 
                fill 
                className="object-cover" 
                data-ai-hint="monstera pot"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-6 md:py-8 bg-white border-y border-primary/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {trustSignals.map((signal, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-3">
                <div className="p-2 bg-secondary/5 text-secondary rounded-lg shrink-0">
                  <signal.icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-[10px] md:text-xs font-black text-primary uppercase tracking-wider">{signal.title}</h3>
                  <p className="text-[9px] md:text-[10px] text-muted-foreground font-medium">{signal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-24 bg-[#F9FAF8]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3 text-secondary">
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Curated Picks</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-headline font-black text-primary">Rare Finds</h2>
              <p className="text-muted-foreground font-medium max-w-xl mx-auto md:mx-0">
                Discover our signature species, conditioned for botanical perfection.
              </p>
            </div>
            <Button className="rounded-xl px-8 h-12 md:h-14 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 w-full md:w-auto" asChild>
              <Link href="/shop">View All 55 Species <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {featuredPlants.map((plant) => (
              <ProductCard key={plant.id} plant={plant} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightning Deals */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-primary rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-10 hidden md:block">
              <Zap className="w-48 h-48 text-secondary" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center">
              <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                <Badge className="bg-secondary text-white px-4 py-1.5 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest flex items-center gap-2 w-fit mx-auto lg:mx-0">
                  <Timer className="w-3 h-3" /> Growth Sale
                </Badge>
                <h2 className="text-3xl md:text-5xl font-headline font-black text-white leading-tight">Seasonal <br className="hidden md:block" /> Offers</h2>
                <div className="bg-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/5 inline-block mx-auto lg:mx-0">
                  <p className="text-white/50 text-[9px] font-black uppercase tracking-[0.3em] mb-1">Promo Code</p>
                  <p className="text-2xl md:text-3xl font-black text-secondary tracking-tighter">VERDANT20</p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {salePlants.map((plant) => (
                    <div key={plant.id} className="bg-white rounded-xl p-1 shadow-md">
                      <ProductCard plant={plant} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Habitat */}
      <section className="py-16 md:py-24 bg-[#F9FAF8]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-10 text-center md:text-left">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-4xl font-headline font-black text-primary flex items-center gap-2 justify-center md:justify-start">
                <LayoutGrid className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                Shop By Habitat
              </h2>
            </div>
            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest gap-2 text-primary hidden md:flex" asChild>
              <Link href="/shop">Full Catalog <ChevronRight className="w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <Link key={i} href={`/shop?category=${cat.slug}`} className="group relative aspect-square rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-lg border border-white">
                <Image 
                  src={cat.image || 'https://picsum.photos/seed/cat/400/400'} 
                  alt={cat.label} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  data-ai-hint={cat.hint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                  <h3 className="text-white font-black text-sm md:text-lg leading-tight mb-0.5">{cat.label}</h3>
                  <p className="text-white/60 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16 md:py-20 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-7xl text-center md:text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Logo size={36} inverted />
                <span className="font-headline text-2xl font-bold">VerdantNest</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Architecting serene indoor and outdoor sanctuaries with expertly conditioned botanical specimens.
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-6">Explore</h3>
              <ul className="space-y-4 text-xs md:text-sm text-white/70 font-medium">
                <li><Link href="/shop?category=Indoor" className="hover:text-secondary">Indoor Collection</Link></li>
                <li><Link href="/shop?category=Outdoor" className="hover:text-secondary">Outdoor Habitat</Link></li>
                <li><Link href="/shop?category=Air Purifier" className="hover:text-secondary">Air Purifiers</Link></li>
                <li><Link href="/shop?category=Bonsai" className="hover:text-secondary">Bonsai Masterpieces</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-6">Expertise</h3>
              <ul className="space-y-4 text-xs md:text-sm text-white/70 font-medium">
                <li><Link href="/care-guides" className="hover:text-secondary">Care Wisdom</Link></li>
                <li><Link href="/ai-doctor" className="hover:text-secondary">AI Diagnostic</Link></li>
                <li><Link href="/blog" className="hover:text-secondary">Botanical Journal</Link></li>
                <li><Link href="/about" className="hover:text-secondary">About VerdantNest</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-2">Join Our Growth</h3>
              <div className="flex gap-2">
                <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none focus:ring-1 focus:ring-secondary/50 flex-1" placeholder="Email Address" />
                <Button className="bg-secondary text-white rounded-xl px-4 py-2 font-black text-[10px] uppercase">Join</Button>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[9px] text-white/30 uppercase font-black tracking-[0.3em]">
              © {currentYear || '...'} VerdantNest Botanical Co.
            </p>
            <div className="flex gap-6 text-[9px] text-white/30 uppercase font-black tracking-[0.2em]">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
              <Link href="/sustainability" className="hover:text-white">Sustainability</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
