"use client";

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Gavel, Truck, RotateCcw, Award, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TermsPage() {
  const terms = [
    {
      title: "Botanical Guarantee",
      icon: Award,
      content: "Every plant is nursery-conditioned before shipping. We guarantee our specimens arrive in healthy condition. If your plant arrives damaged, notify us within 48 hours for a replacement."
    },
    {
      title: "Shipping & Delivery",
      icon: Truck,
      content: "We use specialized eco-packaging to minimize transit stress. While we strive for timely delivery, VerdantNest is not liable for carrier delays due to weather or seasonal volume."
    },
    {
      title: "Refund Policy",
      icon: RotateCcw,
      content: "Due to the living nature of our products, we do not accept returns on plants after 14 days. Non-living goods (tools, pots) can be returned within 30 days in original packaging."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:py-32 max-w-4xl flex-grow">
        <header className="mb-16">
          <Badge variant="secondary" className="mb-4 bg-secondary/10 text-secondary border-none px-4 py-1.5 rounded-full font-black text-[10px] tracking-widest uppercase">
            Agreement
          </Badge>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6">Terms of Service</h1>
          <p className="text-xl text-muted-foreground leading-relaxed italic">
            The professional guidelines for our botanical relationship. By using our services, you agree to the conditions outlined below.
          </p>
        </header>

        <div className="space-y-12">
          <div className="bg-destructive/5 border border-destructive/10 p-6 rounded-2xl flex gap-4 items-start mb-12">
            <AlertCircle className="w-6 h-6 text-destructive shrink-0" />
            <div>
              <p className="font-bold text-destructive mb-1">Important Notice</p>
              <p className="text-sm text-destructive/80">
                Plants are living organisms. Their growth and appearance may vary slightly from catalog photography based on season and environmental conditions.
              </p>
            </div>
          </div>

          {terms.map((term, i) => (
            <section key={i} className="group border-l-2 border-primary/5 pl-8 hover:border-secondary transition-colors duration-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white shadow-sm text-primary rounded-xl">
                  <term.icon className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-headline font-bold text-primary">{term.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {term.content}
              </p>
            </section>
          ))}
        </div>
      </main>

      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
            © VerdantNest Botanical Co. • Compliance Verified 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
