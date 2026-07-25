"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Leaf, Sparkles, History, Users, Globe, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  const storyImg = PlaceHolderImages.find(i => i.id === 'about-hero')?.imageUrl || 'https://picsum.photos/seed/about/1200/800';
  const greenhouseImg = PlaceHolderImages.find(i => i.id === 'greenhouse')?.imageUrl || 'https://picsum.photos/seed/greenhouse/1200/600';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* About Hero */}
        <section className="container mx-auto px-4 py-24 md:py-40 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <Badge variant="secondary" className="bg-secondary text-white px-6 py-2 rounded-full font-black text-[10px] tracking-[0.2em] uppercase">
                About VerdantNest
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold text-primary leading-tight">
                Cultivating <br className="hidden md:block" /> <span className="text-secondary italic">Serenity</span> Since 2020.
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed italic">
                VerdantNest was born from a realization: our souls crave the grounding presence of the botanical world.
              </p>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                What started as a single Monstera cutting has blossomed into a destination for the modern collector. We architect environments that breathe life back into urban spaces.
              </p>
            </div>
            <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl">
              <Image 
                src={storyImg} 
                alt="VerdantNest About" 
                fill 
                className="object-cover" 
                data-ai-hint="botanist greenhouse"
              />
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="bg-primary py-20 md:py-32 rounded-[2.5rem] md:rounded-[5rem] text-white overflow-hidden relative mx-2 md:mx-4">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mb-16 md:mb-24 text-center md:text-left">
              <h2 className="text-3xl md:text-6xl font-headline font-bold mb-4 md:mb-8">Our Botanical Philosophy</h2>
              <p className="text-lg md:text-2xl opacity-80">Three pillars that define every species we bring into your home.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              <div className="space-y-4 md:space-y-6 text-center md:text-left">
                <div className="p-4 md:p-6 bg-white/10 rounded-3xl w-fit mx-auto md:mx-0"><Globe className="w-8 h-8 md:w-10 md:h-10 text-secondary" /></div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold">Ethical Sourcing</h3>
                <p className="text-sm md:text-lg opacity-70 leading-relaxed">We partner with family greenhouses that prioritize sustainable growing and fair labor.</p>
              </div>
              <div className="space-y-4 md:space-y-6 text-center md:text-left">
                <div className="p-4 md:p-6 bg-white/10 rounded-3xl w-fit mx-auto md:mx-0"><Award className="w-8 h-8 md:w-10 md:h-10 text-secondary" /></div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold">Curated Quality</h3>
                <p className="text-sm md:text-lg opacity-70 leading-relaxed">Every plant undergoes a 14-day conditioning process to ensure it thrives in your home.</p>
              </div>
              <div className="space-y-4 md:space-y-6 text-center md:text-left">
                <div className="p-4 md:p-6 bg-white/10 rounded-3xl w-fit mx-auto md:mx-0"><Users className="w-8 h-8 md:w-10 md:h-10 text-secondary" /></div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold">Lifelong Support</h3>
                <p className="text-sm md:text-lg opacity-70 leading-relaxed">Our relationship doesn't end at delivery. We provide AI-driven care tools for the life of your plant.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sanctuary */}
        <section className="container mx-auto px-4 py-20 md:py-32 max-w-7xl">
          <div className="text-center mb-12 md:mb-20 space-y-4">
             <Badge className="bg-primary/5 text-primary border-primary/10 px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest">The Sanctuary</Badge>
             <h2 className="text-3xl md:text-6xl font-headline font-bold text-primary">Where Growth Happens</h2>
          </div>
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl mb-12 md:mb-20">
             <Image 
                src={greenhouseImg} 
                alt="Modern Greenhouse" 
                fill 
                className="object-cover" 
                data-ai-hint="glass greenhouse"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
             <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
                <p className="text-white text-lg md:text-3xl font-headline font-bold">Our Conditioning Sanctuary</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
             <div className="space-y-4 md:space-y-6 p-8 md:p-12 bg-muted/30 rounded-[2rem] md:rounded-[3rem] text-center md:text-left">
                <History className="w-10 h-10 md:w-12 md:h-12 text-secondary mx-auto md:mx-0" />
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-primary">Our Journey</h3>
                <p className="text-sm md:text-xl text-muted-foreground leading-relaxed">
                  We've shipped over 50,000 plants to homes across the country, each one a testament to our love for greenery.
                </p>
             </div>
             <div className="space-y-4 md:space-y-6 p-8 md:p-12 bg-white rounded-[2rem] md:rounded-[3rem] border border-primary/5 shadow-xl text-center md:text-left">
                <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-secondary mx-auto md:mx-0" />
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-primary">The Future</h3>
                <p className="text-sm md:text-xl text-muted-foreground leading-relaxed">
                  We are constantly innovating, from AI-driven health diagnostics to sustainable, biodegradable packaging.
                </p>
             </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-20 md:py-32 text-center">
          <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
             <h2 className="text-3xl md:text-6xl font-headline font-bold text-primary leading-tight">Ready to bring <br className="hidden md:block" /> the <span className="text-secondary italic">outside in?</span></h2>
             <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                <Button size="lg" className="h-16 md:h-20 px-10 md:px-12 text-lg md:text-2xl font-black rounded-2xl md:rounded-3xl shadow-2xl shadow-primary/30" asChild>
                  <Link href="/shop">Shop Collection</Link>
                </Button>
                <Button variant="outline" size="lg" className="h-16 md:h-20 px-10 md:px-12 text-lg md:text-2xl font-black rounded-2xl md:rounded-3xl border-primary/10" asChild>
                  <Link href="/contact">Get In Touch</Link>
                </Button>
             </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center text-[9px] md:text-xs font-black uppercase tracking-[0.4em] text-muted-foreground/40">
            © VerdantNest • Botanical Excellence
          </div>
        </div>
      </footer>
    </div>
  );
}