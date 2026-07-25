
"use client";

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Stethoscope, 
  Droplets, 
  Sun, 
  Bug, 
  Wind, 
  Sprout, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CARE_ARTICLES = [
  {
    id: "watering",
    title: "Watering 101",
    icon: Droplets,
    desc: "Master the art of moisture balance.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    image: PlaceHolderImages.find(i => i.id === 'care-watering')?.imageUrl || 'https://picsum.photos/seed/watering/800/600',
    hint: "watering plant",
    content: {
      intro: "Overwatering is the #1 cause of indoor plant death. Understanding when and how to water is critical for long-term health.",
      tips: [
        "The Finger Test: Stick your finger 2 inches into the soil. If it's dry, it's time to water.",
        "Bottom Watering: Set your pot in a tray of water for 30 mins to allow roots to drink upward.",
        "Drainage is Key: Always use pots with drainage holes to prevent root rot.",
        "Water Quality: Some plants (like Calatheas) prefer distilled or rainwater over tap."
      ],
      warning: "Yellowing leaves that feel mushy usually mean too much water. Crispy brown edges usually mean too little."
    }
  },
  {
    id: "lighting",
    title: "Lighting Guide",
    icon: Sun,
    desc: "Finding the perfect spot for every leaf.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    image: PlaceHolderImages.find(i => i.id === 'care-lighting')?.imageUrl || 'https://picsum.photos/seed/sunlight/800/600',
    hint: "sunlight plant",
    content: {
      intro: "Light is a plant's food. Without the right intensity, your plant will stretch (etioalte) or burn.",
      tips: [
        "Bright Indirect Light: Think of a spot near a window where the sun doesn't directly hit the leaves.",
        "Direct Sun: Only for desert dwellers like Cacti and succulents.",
        "Low Light: Plants like ZZ and Snake plants survive here, but grow slower.",
        "Rotation: Turn your plant 90 degrees every month to ensure even growth on all sides."
      ],
      warning: "Pale, translucent leaves often indicate too much sun. Leggy, sparse growth indicates too little."
    }
  },
  {
    id: "pests",
    title: "Pest Control",
    icon: Bug,
    desc: "Safe ways to keep the crawlers away.",
    color: "text-red-500",
    bgColor: "bg-red-50",
    image: PlaceHolderImages.find(i => i.id === 'care-pests')?.imageUrl || 'https://picsum.photos/seed/plant-bug/800/600',
    hint: "plant pest",
    content: {
      intro: "Pests are part of nature, but they don't have to ruin your home. Early detection is your best defense.",
      tips: [
        "Neem Oil: A natural pesticide that works wonders on mites and aphids.",
        "Isolation: Immediately move a sick plant away from others to prevent spreading.",
        "Soil Gnats: Let the soil dry out completely or use yellow sticky traps.",
        "Leaf Cleaning: Wipe leaves with a damp cloth to remove dust and hiding bugs."
      ],
      warning: "Sticky residue on leaves (honeydew) is often a sign of aphids or scale insects."
    }
  },
  {
    id: "climate",
    title: "Air & Temp",
    icon: Wind,
    desc: "Climate control for tropical thrive.",
    color: "text-sky-500",
    bgColor: "bg-sky-50",
    image: PlaceHolderImages.find(i => i.id === 'care-climate')?.imageUrl || 'https://picsum.photos/seed/mist/800/600',
    hint: "tropical humidity",
    content: {
      intro: "Most indoor plants are tropical. They love humidity and hate cold drafts or dry heater air.",
      tips: [
        "Humidity Trays: Fill a tray with pebbles and water; set the pot on top to increase local moisture.",
        "Temperature Range: Most plants prefer 65°F-85°F. Avoid drops below 55°F.",
        "Air Circulation: Good airflow prevents fungal growth and soil mold.",
        "Misting: While it feels good, it only raises humidity for a few minutes. Grouping plants is better."
      ],
      warning: "Brown leaf tips often signal that your home's air is too dry for your tropical friends."
    }
  },
  {
    id: "repotting",
    title: "Repotting",
    icon: Sprout,
    desc: "Give your roots room to grow.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    image: PlaceHolderImages.find(i => i.id === 'care-repotting')?.imageUrl || 'https://picsum.photos/seed/repotting/800/600',
    hint: "repotting plant",
    content: {
      intro: "Repotting isn't just about size—it's about refreshing nutrients and checking root health.",
      tips: [
        "Signs for Change: Roots growing out of drainage holes or water running straight through.",
        "Pot Size: Only go up 1-2 inches in diameter. Too much soil holds too much water.",
        "Soil Mix: Use a chunky mix (perlite/bark) for aroids and sandy mix for succulents.",
        "Timing: Best done in Spring or Summer when the plant is actively growing."
      ],
      warning: "Don't fertilize for 4-6 weeks after repotting; the new soil already has fresh nutrients."
    }
  }
];

export default function CareGuidesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <header className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm rounded-full bg-primary/10 text-primary border-none">Educational Hub</Badge>
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-primary mb-6">Botanical Wisdom</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform your space into a thriving indoor jungle. 
            From beginner basics to expert techniques.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CARE_ARTICLES.map((cat) => (
            <Dialog key={cat.id}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={cat.image} 
                      alt={cat.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      data-ai-hint={cat.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    <div className={cn("absolute bottom-4 left-4 p-3 rounded-xl shadow-lg", cat.bgColor, cat.color)}>
                      <cat.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">{cat.title}</CardTitle>
                    <CardTitle className="text-base font-normal text-muted-foreground mt-2">{cat.desc}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="p-0 text-primary font-bold">
                      Read Article →
                    </Button>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 overflow-hidden border-none">
                <div className="relative aspect-video w-full">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
                <div className="p-8 space-y-6">
                  <DialogHeader>
                    <DialogTitle className="text-4xl font-headline font-bold text-primary">{cat.title}</DialogTitle>
                    <DialogDescription className="text-lg italic pt-2">
                      Expert guide on botanical maintenance
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <div className="bg-muted/30 p-6 rounded-2xl border border-dashed">
                      <p className="text-lg leading-relaxed text-foreground/90 font-medium">
                        {cat.content.intro}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        Pro Growth Tips
                      </h3>
                      <ul className="space-y-3">
                        {cat.content.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-destructive/5 border border-destructive/10 p-4 rounded-xl flex gap-3 items-start">
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                      <p className="text-sm font-semibold text-destructive/80">
                        <span className="font-bold text-destructive">Watch Out:</span> {cat.content.warning}
                      </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}

          {/* AI Plant Doctor Card */}
          <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden border-primary/50 bg-primary/5">
             <div className="relative aspect-video bg-primary flex items-center justify-center overflow-hidden">
                <Stethoscope className="h-20 w-20 text-white/20 absolute -right-4 -bottom-4 rotate-12" />
                <div className="text-white flex flex-col items-center gap-2">
                   <div className="p-4 bg-white/10 rounded-full"><Stethoscope className="w-8 h-8" /></div>
                   <span className="font-black uppercase tracking-widest text-[10px]">AI Diagnostics</span>
                </div>
             </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">AI Plant Doctor</CardTitle>
              <CardDescription className="text-base">Get an instant AI diagnosis for your sick plants.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0 text-primary font-bold" asChild>
                <Link href="/ai-doctor">Launch Tool →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <section className="mt-24 p-8 md:p-16 rounded-3xl bg-primary text-primary-foreground relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
               <BookOpen className="h-6 w-6 opacity-70" />
               <span className="uppercase tracking-widest text-sm font-bold opacity-70">Community Knowledge</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 leading-tight">Can't find what you're looking for?</h2>
            <p className="text-lg opacity-90 mb-10">
              Our botanical experts are constantly writing new guides. Check back weekly for fresh tips, or reach out to our team directly for specific advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <Button size="lg" variant="secondary" className="px-8 py-7 text-lg font-bold rounded-2xl" asChild>
                 <Link href="/ai-doctor">Ask AI Doctor</Link>
               </Button>
               <Button size="lg" variant="outline" className="px-8 py-7 text-lg font-bold rounded-2xl bg-transparent border-white/30 hover:bg-white/10" asChild>
                 <Link href="/contact">Contact Expert</Link>
               </Button>
            </div>
          </div>
          <LeafIcon className="absolute right-[-40px] bottom-[-40px] h-80 w-80 opacity-10 rotate-12" />
        </section>
      </main>
    </div>
  );
}

const LeafIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 22c1.25-1.25 2.272-2.73 3.04-4.336C6.12 15.426 6.8 13.045 6.8 10.5c0-4.694-3.806-8.5-8.5-8.5-4.694 0-8.5 3.806-8.5 8.5 0 2.545.68 4.926 1.76 7.164.768 1.606 1.79 3.086 3.04 4.336L2 22z" />
    <path d="M2 22v-9" />
    <path d="M9 14s1.5-2 4-2 4 2 4 2" />
    <path d="M7 10s1.5-2 4-2 4 2 4 2" />
  </svg>
);

const Badge = ({ children, variant, className }: { children: React.ReactNode, variant?: string, className?: string }) => (
  <div className={cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    variant === "secondary" ? "border-transparent bg-secondary/20 text-secondary" : "border-transparent bg-primary text-primary-foreground",
    className
  )}>
    {children}
  </div>
);
