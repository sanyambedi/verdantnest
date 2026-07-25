"use client";

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information Collection",
      icon: Eye,
      content: "We collect information you provide directly to us, such as when you create an account, place an order, or subscribe to our newsletter. This includes botanical preferences and care history to improve our AI Diagnostic tools."
    },
    {
      title: "Data Security",
      icon: Lock,
      content: "We implement industry-standard SSL encryption and secure payment processing. Your financial data is never stored on our servers; we use certified third-party processors to ensure your safety."
    },
    {
      title: "Botanical AI Usage",
      icon: Shield,
      content: "Images uploaded to our AI Plant Doctor are used solely for diagnostic purposes. We may use anonymized data to improve our identification models for the botanical community."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:py-32 max-w-4xl flex-grow">
        <header className="mb-16">
          <Badge variant="secondary" className="mb-4 bg-secondary/10 text-secondary border-none px-4 py-1.5 rounded-full font-black text-[10px] tracking-widest uppercase">
            Legal & Security
          </Badge>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground leading-relaxed italic">
            Your trust is the soil in which our community grows. We are committed to protecting your data with the same care we give our plants.
          </p>
        </header>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <section key={i} className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/5 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <section.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-headline font-bold text-primary">{section.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-14">
                {section.content}
              </p>
            </section>
          ))}

          <section className="bg-muted/30 p-8 rounded-[2rem] border border-dashed border-primary/10 mt-16">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-secondary" />
              <h3 className="font-bold text-primary">Full Disclosure</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              VerdantNest complies with all global data protection regulations. We do not sell your personal data to third parties. For specific inquiries regarding your data, please contact our privacy officer at <span className="font-bold text-primary">privacy@verdantnest.com</span>.
            </p>
          </section>
        </div>
      </main>

      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
            © VerdantNest Botanical Co. • Last Updated October 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
