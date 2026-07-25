"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { PLANTS } from '@/app/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Sun, 
  ShieldCheck, 
  Droplets, 
  Star,
  Share2,
  Heart,
  CheckCircle2,
  Sparkles,
  Tag,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

export default function ProductClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const plant = PLANTS.find(p => p.slug === slug);

  if (!plant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">Species Not Found</h1>
        <Button onClick={() => router.push('/shop')} className="rounded-2xl px-10 py-6 text-lg font-bold">Back to Shop</Button>
      </div>
    );
  }

  const hasDiscount = plant.originalPrice && plant.originalPrice > plant.price;
  const discountPercent = hasDiscount 
    ? Math.round(((plant.originalPrice! - plant.price) / plant.originalPrice!) * 100) 
    : 0;

  const handleToggleWishlist = () => {
    toggleWishlist(plant.id);
    const inList = !isInWishlist(plant.id);
    toast({
      title: inList ? "Saved to Favorites" : "Removed from Favorites",
      description: `${plant.name} is now in your wishlist.`,
    });
  };

  const handleAddToCart = () => {
    addToCart(plant.id);
    toast({
      title: "Added to Basket",
      description: `${plant.name} is ready for its new home.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:py-32 max-w-7xl">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/shop')} 
          className="mb-8 md:mb-12 gap-2 pl-0 hover:bg-transparent hover:text-primary transition-colors font-black text-[10px] uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          The Collection
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 xl:gap-32 items-start">
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[4rem] overflow-hidden bg-muted/20 shadow-2xl">
              <Image 
                src={plant.image} 
                alt={plant.name} 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col gap-3 md:gap-4">
                 <Button 
                  size="icon" 
                  className={cn(
                    "rounded-full glass-card h-12 w-12 md:h-14 md:w-14 transition-all duration-500",
                    isInWishlist(plant.id) ? "bg-primary text-white border-primary" : "text-primary hover:bg-white"
                  )}
                  onClick={handleToggleWishlist}
                 >
                   <Heart className={cn("h-6 w-6 md:h-7 md:w-7", isInWishlist(plant.id) ? "fill-current" : "")} />
                 </Button>
                 <Button size="icon" className="rounded-full glass-card h-12 w-12 md:h-14 md:w-14 text-primary hover:bg-white"><Share2 className="h-6 w-6 md:h-7 md:w-7" /></Button>
              </div>
              {hasDiscount && (
                <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
                   <Badge className="bg-red-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-black text-sm md:text-lg shadow-2xl flex items-center gap-2">
                      <Tag className="w-4 h-4 md:w-5 md:h-5" /> {discountPercent}% OFF
                   </Badge>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <header className="mb-10 md:mb-12">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
                <Badge variant="secondary" className="bg-secondary text-white border-none px-4 py-1.5 md:px-6 md:py-2 rounded-full font-black text-[9px] md:text-[10px] tracking-[0.2em] shadow-lg shadow-secondary/20 uppercase">
                  Collector's Edition
                </Badge>
                {hasDiscount && (
                  <Badge className="bg-red-100 text-red-600 border-red-200 px-3 py-1 md:px-4 md:py-1.5 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                    <Zap className="w-3 h-3" /> Flash Deal
                  </Badge>
                )}
                <div className="flex items-center gap-1 ml-auto text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-4 w-4 md:h-5 md:w-5", i < Math.floor(plant.rating) ? "fill-current" : "text-muted")} />
                  ))}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-headline font-bold text-primary mb-4 md:mb-6 leading-tight">
                {plant.name}
              </h1>
              <p className="text-xl md:text-3xl italic text-muted-foreground font-medium mb-8 md:mb-10">{plant.scientificName}</p>
              
              <div className="flex flex-wrap items-baseline gap-4 md:gap-6 mb-8 md:mb-12">
                <p className="text-5xl md:text-7xl font-black text-primary">${plant.price.toFixed(2)}</p>
                {hasDiscount && (
                  <p className="text-2xl md:text-3xl font-bold text-muted-foreground line-through opacity-40">
                    ${plant.originalPrice?.toFixed(2)}
                  </p>
                )}
                <Badge className="bg-primary/5 text-primary border-primary/10 rounded-xl px-4 py-2 font-black uppercase text-[9px] md:text-[10px] tracking-widest">In Stock</Badge>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10 md:mb-12">
                <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col items-center text-center shadow-sm border border-primary/5">
                  <Sun className="h-5 w-5 md:h-6 md:w-6 text-orange-400 mb-2 md:mb-3" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Light</span>
                  <span className="text-xs md:text-sm font-bold text-primary">{plant.sunlight}</span>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col items-center text-center shadow-sm border border-primary/5">
                  <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-secondary mb-2 md:mb-3" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Level</span>
                  <span className="text-xs md:text-sm font-bold text-primary">{plant.difficulty}</span>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col items-center text-center shadow-sm border border-primary/5">
                  <Droplets className="h-5 w-5 md:h-6 md:w-6 text-blue-400 mb-2 md:mb-3" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Water</span>
                  <span className="text-xs md:text-sm font-bold text-primary">Weekly</span>
                </div>
              </div>

              <p className="text-lg md:text-2xl leading-relaxed text-muted-foreground mb-10 md:mb-12 font-medium italic">
                {plant.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleAddToCart} className="flex-1 py-7 md:py-10 text-xl md:text-2xl rounded-2xl md:rounded-3xl gap-3 md:gap-4 font-black shadow-2xl shadow-primary/30 group">
                  <ShoppingBag className="h-6 w-6 md:h-8 md:w-8 transition-transform group-hover:scale-110" />
                  Reserve Now
                </Button>
                <Button onClick={handleToggleWishlist} variant="outline" className="px-10 h-16 md:h-20 text-xl rounded-2xl md:rounded-3xl border-primary/10 hover:bg-primary/5">
                  <Heart className={cn("h-6 w-6 md:h-8 md:w-8", isInWishlist(plant.id) ? "fill-primary text-primary" : "")} />
                </Button>
              </div>
            </header>

            <div className="mt-16 md:mt-20">
              <Tabs defaultValue="care" className="w-full">
                <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 mb-8 md:mb-12 overflow-x-auto no-scrollbar gap-8 md:gap-12">
                  <TabsTrigger value="care" className="rounded-none border-b-4 border-transparent data-[state=active]:border-secondary data-[state=active]:text-primary bg-transparent text-lg md:text-2xl font-black pb-3 md:pb-4 uppercase tracking-tighter">Care</TabsTrigger>
                  <TabsTrigger value="facts" className="rounded-none border-b-4 border-transparent data-[state=active]:border-secondary data-[state=active]:text-primary bg-transparent text-lg md:text-2xl font-black pb-3 md:pb-4 uppercase tracking-tighter">Facts</TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-none border-b-4 border-transparent data-[state=active]:border-secondary data-[state=active]:text-primary bg-transparent text-lg md:text-2xl font-black pb-3 md:pb-4 uppercase tracking-tighter">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="care" className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                    {plant.tips.map((tip, i) => (
                      <div key={i} className="flex gap-4 md:gap-8 items-start p-6 md:p-8 bg-white rounded-[1.5rem] md:rounded-[3rem] border border-primary/5 shadow-sm group">
                        <div className="bg-primary text-white p-3 md:p-4 rounded-xl md:rounded-2xl shrink-0"><CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" /></div>
                        <p className="text-base md:text-xl text-muted-foreground leading-relaxed font-medium">{tip}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="facts" className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                    {plant.facts.map((fact, i) => (
                      <div key={i} className="flex gap-4 md:gap-8 items-start p-6 md:p-8 bg-emerald-50/50 rounded-[1.5rem] md:rounded-[3rem] border border-emerald-100/50 group">
                        <div className="bg-secondary text-white p-3 md:p-4 rounded-xl md:rounded-2xl shrink-0"><Sparkles className="h-5 w-5 md:h-6 md:w-6" /></div>
                        <p className="text-base md:text-xl text-emerald-900/80 leading-relaxed font-bold italic">{fact}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                    {plant.reviews.map((rev) => (
                      <Card key={rev.id} className="rounded-[1.5rem] md:rounded-[3rem] border-none shadow-sm bg-white p-2">
                        <CardHeader className="flex flex-row items-center justify-between pb-3 px-4 md:px-6">
                          <div className="flex flex-col">
                            <span className="font-black text-base md:text-xl text-primary">{rev.user}</span>
                            <span className="text-[8px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">{rev.date}</span>
                          </div>
                          <div className="flex text-secondary">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={cn("h-3 w-3 md:h-4 md:w-4", i < rev.rating ? "fill-current" : "text-muted")} />
                            ))}
                          </div>
                        </CardHeader>
                        <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
                          <p className="text-base md:text-xl text-muted-foreground italic leading-relaxed font-medium">"{rev.comment}"</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}