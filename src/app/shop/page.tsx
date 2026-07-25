"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { PLANTS } from '@/app/lib/data';
import { Category, Difficulty, Sunlight } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  X, 
  LayoutGrid, 
  ChevronRight, 
  Leaf, 
  Sun, 
  ShieldCheck, 
  Sparkles, 
  Package, 
  Award,
  ChevronDown,
  Droplets,
  Wind
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function ShopContent() {
  const searchParams = useSearchParams();
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'All'>('All');
  const [sunlightFilter, setSunlightFilter] = useState<Sunlight | 'All'>('All');

  useEffect(() => {
    const cat = searchParams.get('category') as Category;
    if (cat) {
      setCategoryFilter(cat);
    }
  }, [searchParams]);

  const filteredPlants = useMemo(() => {
    return PLANTS.filter(plant => {
      const cMatch = categoryFilter === 'All' || plant.category === categoryFilter;
      const dMatch = difficultyFilter === 'All' || plant.difficulty === difficultyFilter;
      const sMatch = sunlightFilter === 'All' || plant.sunlight === sunlightFilter;
      return cMatch && dMatch && sMatch;
    });
  }, [categoryFilter, difficultyFilter, sunlightFilter]);

  const clearFilters = () => {
    setCategoryFilter('All');
    setDifficultyFilter('All');
    setSunlightFilter('All');
  };

  const FilterLink = ({ label, value, current, setter }: { label: string, value: any, current: any, setter: any }) => (
    <button
      onClick={() => setter(value)}
      className={cn(
        "flex items-center justify-between w-full px-4 py-2.5 text-sm transition-all rounded-xl",
        current === value 
          ? "bg-primary text-white font-bold" 
          : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
      )}
    >
      <span>{label}</span>
      {current === value && <ChevronRight className="w-4 h-4" />}
    </button>
  );

  const SidebarContent = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.4em] text-[10px] pb-4 border-b">
        <Filter className="w-4 h-4" />
        Refine Collection
      </div>

      <Accordion type="multiple" defaultValue={['type', 'difficulty', 'location']} className="w-full">
        <AccordionItem value="type" className="border-none">
          <AccordionTrigger className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:no-underline py-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-3 h-3" /> Botanical Category
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-1">
            <FilterLink label="All Species" value="All" current={categoryFilter} setter={setCategoryFilter} />
            <FilterLink label="Indoor" value="Indoor" current={categoryFilter} setter={setCategoryFilter} />
            <FilterLink label="Outdoor" value="Outdoor" current={categoryFilter} setter={setCategoryFilter} />
            <FilterLink label="Air Purifiers" value="Air Purifier" current={categoryFilter} setter={setCategoryFilter} />
            <FilterLink label="Flowering" value="Flowering" current={categoryFilter} setter={setCategoryFilter} />
            <FilterLink label="Succulents" value="Succulent" current={categoryFilter} setter={setCategoryFilter} />
            <FilterLink label="Hanging" value="Hanging" current={categoryFilter} setter={setCategoryFilter} />
            <FilterLink label="Herbs" value="Herb" current={categoryFilter} setter={setCategoryFilter} />
            <FilterLink label="Fruits" value="Fruit" current={categoryFilter} setter={setCategoryFilter} />
            <FilterLink label="Medicinal" value="Medicinal" current={categoryFilter} setter={setCategoryFilter} />
            <FilterLink label="Bonsai" value="Bonsai" current={categoryFilter} setter={setCategoryFilter} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="difficulty" className="border-none">
          <AccordionTrigger className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:no-underline py-4">
            <div className="flex items-center gap-2">
              <Award className="w-3 h-3" /> Care Intensity
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-1">
            <FilterLink label="All Levels" value="All" current={difficultyFilter} setter={setDifficultyFilter} />
            <FilterLink label="Beginner (Easy)" value="Beginner" current={difficultyFilter} setter={setDifficultyFilter} />
            <FilterLink label="Intermediate" value="Intermediate" current={difficultyFilter} setter={setDifficultyFilter} />
            <FilterLink label="Expert (Rare)" value="Expert" current={difficultyFilter} setter={setDifficultyFilter} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location" className="border-none">
          <AccordionTrigger className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:no-underline py-4">
            <div className="flex items-center gap-2">
              <Sun className="w-3 h-3" /> Sunlight Needs
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-1">
            <FilterLink label="Any Light" value="All" current={sunlightFilter} setter={setSunlightFilter} />
            <FilterLink label="Low Light" value="Low" current={sunlightFilter} setter={setSunlightFilter} />
            <FilterLink label="Partial / Indirect" value="Partial" current={sunlightFilter} setter={setSunlightFilter} />
            <FilterLink label="Full Sun" value="Full Sun" current={sunlightFilter} setter={setSunlightFilter} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {(categoryFilter !== 'All' || difficultyFilter !== 'All' || sunlightFilter !== 'All') && (
        <Button 
          variant="ghost" 
          onClick={clearFilters} 
          className="w-full text-destructive hover:bg-destructive/5 font-black h-12 rounded-2xl transition-all"
        >
          <X className="w-4 h-4 mr-2" /> Reset Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 md:py-32 max-w-7xl">
        <header className="mb-12 space-y-4">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-secondary">
            <LayoutGrid className="w-4 h-4" />
            Curated Catalog
          </div>
          <h1 className="text-4xl md:text-7xl font-headline font-bold text-primary">Explore All Species</h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-muted-foreground text-sm md:text-xl max-w-2xl leading-relaxed">
              Every specimen is nursery-conditioned for home architecture. Discover the perfect addition to your sanctuary.
            </p>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Badge variant="outline" className="px-4 py-2 rounded-xl border-primary/20 font-black text-xs h-12 flex-1 md:flex-none justify-center">
                {filteredPlants.length} Botanical Matches
              </Badge>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden rounded-xl h-12 gap-2 border-primary/20 font-bold flex-1">
                    <Filter className="w-4 h-4" /> Filter Results
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] overflow-y-auto">
                  <SheetHeader className="mb-8 text-left">
                    <SheetTitle className="text-2xl font-headline">Refine Selection</SheetTitle>
                    <SheetDescription>Find the perfect plant for your lighting and care capabilities.</SheetDescription>
                  </SheetHeader>
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32">
              <SidebarContent />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredPlants.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
                {filteredPlants.map((plant) => (
                  <ProductCard key={plant.id} plant={plant} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 md:py-32 bg-muted/20 rounded-[2rem] md:rounded-[4rem] border border-dashed border-primary/20 text-center">
                <div className="p-6 bg-white rounded-full shadow-xl mb-6">
                  <X className="w-10 h-10 text-primary opacity-20" />
                </div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-3">No Results Found</h3>
                <p className="text-muted-foreground text-sm md:text-lg max-w-sm mb-8 px-4">Try broadening your filters to discover other amazing botanical specimens.</p>
                <Button 
                  onClick={clearFilters}
                  className="px-10 h-14 rounded-2xl font-black shadow-lg"
                >
                  View Full Collection
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Leaf className="w-8 h-8 text-primary animate-pulse mx-auto" />
          <p className="text-muted-foreground text-sm font-medium">Loading Botanical Collection...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
