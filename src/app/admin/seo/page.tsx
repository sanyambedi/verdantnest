"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Wand2, Tag, BookOpen, Loader2 } from 'lucide-react';
import { generateSeoBlogContent, GenerateSeoBlogContentOutput } from '@/ai/flows/generate-seo-blog-content';
import { automateProductSeoMetaTags, AutomateProductSeoMetaTagsOutput } from '@/ai/flows/automate-product-seo-meta-tags';
import { useToast } from '@/hooks/use-toast';

export default function AdminSeoPage() {
  const { toast } = useToast();
  
  // Blog Content State
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogOutput, setBlogOutput] = useState<GenerateSeoBlogContentOutput | null>(null);

  // Meta Tags State
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [metaLoading, setMetaLoading] = useState(false);
  const [metaOutput, setMetaOutput] = useState<AutomateProductSeoMetaTagsOutput | null>(null);

  const handleGenerateBlog = async () => {
    if (!topic) return;
    setBlogLoading(true);
    try {
      const result = await generateSeoBlogContent({
        topic,
        keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
        length: 'medium',
        tone: 'expert'
      });
      setBlogOutput(result);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Generation failed', description: 'Could not generate blog content.' });
    } finally {
      setBlogLoading(false);
    }
  };

  const handleGenerateMeta = async () => {
    if (!productName || !productDesc) return;
    setMetaLoading(true);
    try {
      const result = await automateProductSeoMetaTags({
        productName,
        productDescription: productDesc
      });
      setMetaOutput(result);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Generation failed', description: 'Could not generate meta tags.' });
    } finally {
      setMetaLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="pb-2">
        <h1 className="text-3xl sm:text-4xl font-headline font-black text-white leading-tight">
          AI & SEO Management
        </h1>
        <p className="text-slate-400 text-sm mt-1">Leverage Gemini LLM instances to dynamically draft care wisdom articles and optimize item tags.</p>
      </header>

      <div className="max-w-4xl">
        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#0C0F0A] border border-emerald-950/20 rounded-xl p-1 h-12">
            <TabsTrigger value="blog" className="gap-2 rounded-lg text-xs uppercase font-black tracking-wider data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 data-[state=active]:border-emerald-500/20"><BookOpen className="w-4 h-4" /> AI Care Article</TabsTrigger>
            <TabsTrigger value="meta" className="gap-2 rounded-lg text-xs uppercase font-black tracking-wider data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 data-[state=active]:border-emerald-500/20"><Tag className="w-4 h-4" /> Meta-Tag Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <Card className="bg-[#0C0F0A]/60 backdrop-blur-2xl border-emerald-950/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-white">Generate Care Guide / Blog Article</CardTitle>
                <CardDescription className="text-slate-400 text-xs">Create keyword-rich, expert-level botanical advice to build organic search authority.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Article Topic</label>
                  <Input 
                    placeholder="e.g. Care Guide for Fiddle Leaf Figs" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="bg-[#070905]/80 border-emerald-950/60 focus:border-emerald-500/40 text-white rounded-xl h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Target Keywords (comma separated)</label>
                  <Input 
                    placeholder="e.g. humidity, drainage, bright light" 
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="bg-[#070905]/80 border-emerald-950/60 focus:border-emerald-500/40 text-white rounded-xl h-11"
                  />
                </div>
                <Button 
                  onClick={handleGenerateBlog} 
                  disabled={blogLoading || !topic}
                  className="w-full bg-emerald-500 text-black hover:bg-emerald-400 h-11 rounded-xl font-black text-xs uppercase tracking-widest mt-2"
                >
                  {blogLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Wand2 className="w-4 h-4 mr-2" />}
                  Generate Content
                </Button>

                {blogOutput && (
                  <div className="mt-8 p-6 bg-[#070905]/80 rounded-xl space-y-4 border border-emerald-950/40">
                    <h2 className="text-xl font-headline font-black text-white">{blogOutput.title}</h2>
                    <div className="prose prose-sm max-w-none text-slate-300 space-y-3">
                      {blogOutput.content.split('\n').map((p, i) => (
                        <p key={i} className="whitespace-pre-wrap leading-relaxed">{p}</p>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-emerald-950/20">
                      {blogOutput.suggestedTags.map(tag => (
                        <Badge key={tag} className="rounded-full px-2.5 py-0.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-mono text-[9px]">#{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meta">
            <Card className="bg-[#0C0F0A]/60 backdrop-blur-2xl border-emerald-950/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-white">Meta-Tag Assistant</CardTitle>
                <CardDescription className="text-slate-400 text-xs">Dynamically generate optimized search headers and image ALT descriptions for specimens.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Product Name</label>
                  <Input 
                    placeholder="e.g. Monstera Deliciosa" 
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="bg-[#070905]/80 border-emerald-950/60 focus:border-emerald-500/40 text-white rounded-xl h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Product Description</label>
                  <Textarea 
                    placeholder="Describe the plant's features and benefits..." 
                    className="bg-[#070905]/80 border-emerald-950/60 focus:border-emerald-500/40 text-white rounded-xl min-h-[120px]"
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleGenerateMeta} 
                  disabled={metaLoading || !productName}
                  className="w-full bg-emerald-500 text-black hover:bg-emerald-400 h-11 rounded-xl font-black text-xs uppercase tracking-widest mt-2"
                >
                  {metaLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Wand2 className="w-4 h-4 mr-2" />}
                  Generate Meta Tags
                </Button>

                {metaOutput && (
                  <div className="mt-8 p-6 bg-[#070905]/80 rounded-xl space-y-6 border border-emerald-950/40">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500/40">Meta Title (Max 60 chars)</span>
                      <p className="font-bold text-white text-sm">{metaOutput.metaTitle}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500/40">Meta Description (Max 160 chars)</span>
                      <p className="text-slate-300 leading-relaxed text-xs">{metaOutput.metaDescription}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500/40">Image ALT Text</span>
                      <p className="italic text-slate-300 text-xs">{metaOutput.altText}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
