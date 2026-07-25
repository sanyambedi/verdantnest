"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Leaf, Globe, Recycle, Zap, Sprout, Wind } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SustainabilityPage() {
  const greenhouseImg = PlaceHolderImages.find(i => i.id === 'greenhouse')?.imageUrl || 'https://picsum.photos/seed/eco/1200/800';

  const pillars = [
    {
      title: "Peat-Free Growth",
      icon: Leaf,
      desc: "Peat bogs are vital carbon sinks. We only use sustainable coco-coir and bark-based mixes to protect these precious ecosystems."
    },
    {
      title: "Circular Packaging",
      icon: Recycle,
      desc: "Our boxes are FSC-certified and our 'plastic' wraps are actually corn-starch based and fully compostable at home."
    },
    {
      title: "Ethical Nurseries",
      icon: Globe,
      desc: "We partner exclusively with family-owned greenhouses that utilize renewable energy and biological pest control."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAF8]">
      <Navbar />
      
      <main>
        {/* Eco Hero */}
        <section className="container mx-auto px-4 py-24 md:py-40 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge className="bg-secondary text-white px-6 py-2 rounded-full font-black text-[10px] tracking-widest uppercase">
                Carbon Neutral by 2030
              </Badge>
              <h1 className="text-5xl md:text-8xl font-headline font-bold text-primary leading-tight">
                Growing a <span className="text-secondary italic">Greener</span> Future.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed italic">
                VerdantNest isn't just about selling plants; it's about protecting the planet they come from.
              </p>
            </div>
            <div className="relative aspect-square rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-2xl">
              <Image 
                src={greenhouseImg} 
                alt="Sustainable Greenhouse" 
                fill 
                className="object-cover" 
                data-ai-hint="glass greenhouse"
              />
              <div className="absolute inset-0 bg-secondary/10" />
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="bg-white py-24 md:py-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-6">Our Sustainability Pillars</h2>
               <p className="text-muted-foreground max-w-2xl mx-auto">Three non-negotiable standards that define our supply chain and shipping operations.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {pillars.map((pillar, i) => (
                <div key={i} className="space-y-6 p-10 bg-[#F9FAF8] rounded-[3rem] transition-all hover:-translate-y-2">
                  <div className="p-4 bg-white rounded-2xl w-fit shadow-sm text-secondary">
                    <pillar.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-primary">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Action Section */}
        <section className="container mx-auto px-4 py-24 md:py-32">
           <div className="bg-primary rounded-[3rem] md:rounded-[5rem] p-12 md:p-24 text-white overflow-hidden relative">
              <Wind className="absolute top-0 right-0 h-96 w-96 opacity-5 -translate-y-20 translate-x-20" />
              <div className="max-w-3xl relative z-10 space-y-10">
                 <h2 className="text-4xl md:text-7xl font-headline font-bold leading-tight">Every plant <br /> shipped is <br /> <span className="text-secondary italic">Climate Positive.</span></h2>
                 <p className="text-xl md:text-2xl opacity-70 leading-relaxed">
                   We offset 110% of the carbon emissions generated from shipping through verified reforestation projects in the Amazon and Sub-Saharan Africa.
                 </p>
                 <div className="flex flex-wrap gap-8">
                    <div className="space-y-1">
                       <p className="text-4xl font-black text-secondary">50k+</p>
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Trees Planted</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-4xl font-black text-secondary">100%</p>
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Plastic Free</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-4xl font-black text-secondary">0</p>
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Peat Usage</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
            VerdantNest • Botanical Responsibility • Earth First
          </p>
        </div>
      </footer>
    </div>
  );
}
