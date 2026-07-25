"use client";

import React, { useState, useEffect } from 'react';
import { PLANTS as initialPlants } from '../../lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  Image as ImageIcon,
  DollarSign,
  Layers
} from 'lucide-react';
import Image from 'next/image';

interface PlantType {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features?: string[];
  image: string;
  category?: string;
  tags?: string[];
  inStock?: boolean;
}

export default function AdminProductsPage() {
  const [plants, setPlants] = useState<PlantType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPlant, setEditingPlant] = useState<PlantType | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { toast } = useToast();

  // Form states
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formCategory, setFormCategory] = useState('Indoor');
  const [formDescription, setFormDescription] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formImage, setFormImage] = useState('');

  useEffect(() => {
    // Check if redirect triggered Add mode
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('add') === 'true') {
        setIsAddingNew(true);
      }
    }
    setPlants(initialPlants as PlantType[]);
  }, []);

  const handleEdit = (plant: PlantType) => {
    setEditingPlant(plant);
    setIsAddingNew(false);
    
    setFormName(plant.name);
    setFormPrice(plant.price.toString());
    setFormOriginalPrice(plant.originalPrice?.toString() || '');
    setFormCategory(plant.category || 'Indoor');
    setFormDescription(plant.description);
    setFormFeatures(plant.features?.join(', ') || '');
    setFormImage(plant.image);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingPlant(null);

    setFormName('');
    setFormPrice('');
    setFormOriginalPrice('');
    setFormCategory('Indoor');
    setFormDescription('');
    setFormFeatures('Air purifying, Low maintenance, Pet friendly');
    setFormImage('https://picsum.photos/seed/plant-specimen/400/400');
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to retire this botanical specimen from inventory?")) {
      setPlants(plants.filter(p => p.id !== id));
      toast({
        title: "Specimen Retired",
        description: "Plant successfully removed from active store catalogs.",
        className: "bg-[#12160F] text-red-400 border border-red-500/20"
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice) {
      toast({ variant: 'destructive', title: 'Validation Alert', description: 'Name and price are required fields.' });
      return;
    }

    const priceNum = parseFloat(formPrice);
    const origPriceNum = formOriginalPrice ? parseFloat(formOriginalPrice) : undefined;
    const featuresArr = formFeatures.split(',').map(f => f.trim()).filter(f => f);

    if (editingPlant) {
      // Edit mode
      setPlants(plants.map(p => p.id === editingPlant.id ? {
        ...p,
        name: formName,
        price: priceNum,
        originalPrice: origPriceNum,
        category: formCategory,
        description: formDescription,
        features: featuresArr,
        image: formImage
      } : p));
      
      toast({
        title: "Specimen Updated",
        description: `${formName} catalogue details successfully saved.`,
        className: "bg-[#12160F] text-emerald-400 border border-emerald-500/20"
      });
      setEditingPlant(null);
    } else {
      // Add mode
      const newPlant: PlantType = {
        id: `plant-${Date.now()}`,
        name: formName,
        price: priceNum,
        originalPrice: origPriceNum,
        category: formCategory,
        description: formDescription,
        features: featuresArr,
        image: formImage || 'https://picsum.photos/seed/plant-specimen/400/400',
        inStock: true
      };

      setPlants([newPlant, ...plants]);
      toast({
        title: "Specimen Cultivated",
        description: `${formName} successfully introduced to live inventories.`,
        className: "bg-[#12160F] text-emerald-400 border border-emerald-500/20"
      });
      setIsAddingNew(false);
    }
  };

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline font-black text-white leading-tight">
            Inventory Auditor
          </h1>
          <p className="text-slate-400 text-sm mt-1">Add, edit, or remove botanical specimens from store catalogs.</p>
        </div>
        <div>
          <Button 
            onClick={handleAddNew}
            className="rounded-xl px-6 h-12 text-xs font-black bg-emerald-500 text-black hover:bg-emerald-400 shadow-xl shadow-emerald-500/10 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4 mr-2" /> INTRODUCE SPECIMEN
          </Button>
        </div>
      </header>

      {/* Grid containing editor forms and specimens list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Editor Form Panel */}
        {(editingPlant || isAddingNew) ? (
          <Card className="bg-[#0C0F0A]/60 backdrop-blur-2xl border-emerald-950/30 shadow-xl relative overflow-hidden lg:col-span-1">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-white">
                  {editingPlant ? "Edit Specimen" : "Cultivate Specimen"}
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">Specify plant metrics and tags.</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => { setEditingPlant(null); setIsAddingNew(false); }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Plant Name</label>
                  <Input 
                    value={formName} 
                    onChange={e => setFormName(e.target.value)} 
                    placeholder="e.g. Fiddle Leaf Fig" 
                    className="bg-[#070905]/80 border-emerald-950/60 focus:border-emerald-500/40 text-white rounded-xl h-11"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Price (USD)</label>
                    <div className="relative">
                      <Input 
                        type="number"
                        value={formPrice} 
                        onChange={e => setFormPrice(e.target.value)} 
                        placeholder="35.00" 
                        className="bg-[#070905]/80 border-emerald-950/60 focus:border-emerald-500/40 text-white rounded-xl h-11 pl-8"
                      />
                      <DollarSign className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Discount Price</label>
                    <div className="relative">
                      <Input 
                        type="number"
                        value={formOriginalPrice} 
                        onChange={e => setFormOriginalPrice(e.target.value)} 
                        placeholder="45.00" 
                        className="bg-[#070905]/80 border-emerald-950/60 focus:border-emerald-500/40 text-white rounded-xl h-11 pl-8"
                      />
                      <DollarSign className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Habitat Category</label>
                  <select 
                    value={formCategory} 
                    onChange={e => setFormCategory(e.target.value)} 
                    className="w-full bg-[#070905]/80 border border-emerald-950/60 focus:border-emerald-500/40 text-white rounded-xl h-11 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Air Purifier">Purifiers</option>
                    <option value="Succulent">Succulents</option>
                    <option value="Bonsai">Bonsai</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Image URL</label>
                  <div className="relative">
                    <Input 
                      value={formImage} 
                      onChange={e => setFormImage(e.target.value)} 
                      placeholder="Image link..." 
                      className="bg-[#070905]/80 border-emerald-950/60 focus:border-emerald-500/40 text-white rounded-xl h-11 pl-8 text-xs font-mono"
                    />
                    <ImageIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Features (comma separated)</label>
                  <Input 
                    value={formFeatures} 
                    onChange={e => setFormFeatures(e.target.value)} 
                    placeholder="e.g. pet friendly, low maintenance" 
                    className="bg-[#070905]/80 border-emerald-950/60 focus:border-emerald-500/40 text-white rounded-xl h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Botanical Description</label>
                  <Textarea 
                    value={formDescription} 
                    onChange={e => setFormDescription(e.target.value)} 
                    placeholder="Provide professional plant care background..." 
                    className="bg-[#070905]/80 border-emerald-950/60 focus:border-emerald-500/40 text-white rounded-xl min-h-[100px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-emerald-500 text-black hover:bg-emerald-400 h-11 rounded-xl font-black text-xs uppercase tracking-widest mt-2"
                >
                  <Check className="w-4 h-4 mr-2" /> Save Catalog Item
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-[#0C0F0A]/20 border-emerald-950/10 p-6 rounded-2xl flex flex-col justify-center items-center text-center border lg:col-span-1 min-h-[300px]">
            <Layers className="w-12 h-12 text-emerald-500/25 mb-4 animate-pulse" />
            <h3 className="text-slate-200 font-headline font-bold text-sm">Operations Console</h3>
            <p className="text-slate-400/60 text-xs mt-1 max-w-[200px]">Select any plant specimen in the stock list to initiate audit operations or add new ones.</p>
          </Card>
        )}

        {/* Live Stock List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Input 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search catalog by name or category..." 
              className="bg-[#0C0F0A]/60 backdrop-blur-2xl border-emerald-950/20 focus:border-emerald-500/40 text-white rounded-xl h-12 pl-11 focus:ring-emerald-500/10"
            />
            <Search className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <Card className="bg-[#0C0F0A]/40 backdrop-blur-2xl border-emerald-950/20 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-emerald-950/40 text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-emerald-950/5">
                      <th className="py-4 pl-6">Specimen</th>
                      <th className="py-4">Category</th>
                      <th className="py-4">Retail Price</th>
                      <th className="py-4 pr-6 text-right font-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950/20 text-xs text-slate-300">
                    {filteredPlants.map((plant) => (
                      <tr key={plant.id} className="hover:bg-emerald-950/5 transition-colors group">
                        <td className="py-4 pl-6">
                          <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-emerald-950/20 shadow shrink-0">
                              <Image 
                                src={plant.image || 'https://picsum.photos/seed/plant/100/100'} 
                                alt={plant.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-white leading-tight">{plant.name}</h4>
                              <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[200px]">{plant.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge className="rounded-full px-2.5 py-0.5 bg-emerald-950/40 border border-emerald-500/20 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                            {plant.category || 'Indoor'}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-black text-white">${plant.price}</span>
                            {plant.originalPrice && (
                              <span className="text-[10px] text-slate-400/50 line-through font-medium">${plant.originalPrice}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 pr-6 text-right">
                          <div className="flex justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleEdit(plant)}
                              className="h-8.5 w-8.5 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDelete(plant.id)}
                              className="h-8.5 w-8.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/30"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredPlants.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-12 text-center text-slate-400/60 font-medium">
                          No matching botanical specimens located in active inventory catalogs.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
