
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { BLOG_POSTS } from '@/app/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogClient({ slug }: { slug: string }) {
  const router = useRouter();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <Button onClick={() => router.push('/blog')}>Back to Journal</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/blog')} 
          className="mb-12 gap-2 pl-0 hover:bg-transparent hover:text-primary transition-colors font-bold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Journal
        </Button>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none px-4 py-1">
                {post.category}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between py-6 border-y border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {post.author[0]}
                </div>
                <div>
                  <p className="font-bold text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Lead Botanist</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" className="rounded-full h-10 w-10 border-primary/20"><Share2 className="w-4 h-4" /></Button>
                <Button size="icon" variant="outline" className="rounded-full h-10 w-10 border-primary/20"><Bookmark className="w-4 h-4" /></Button>
              </div>
            </div>
          </header>

          <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-xl prose-emerald max-w-none">
            {post.content.split('\n\n').map((para, i) => (
              <p key={i} className="mb-6 text-lg leading-relaxed text-foreground/80">
                {para}
              </p>
            ))}
          </div>

          <footer className="mt-16 pt-12 border-t border-primary/10">
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="bg-muted/30 p-8 rounded-3xl border border-dashed border-primary/20 text-center">
              <h3 className="text-2xl font-headline font-bold text-primary mb-4">Enjoyed this article?</h3>
              <p className="text-muted-foreground mb-8">Share it with your fellow plant parents or explore our collection of premium species.</p>
              <Button className="rounded-2xl px-8 h-12 font-bold gap-2" asChild>
                <Link href="/">Shop the Collection</Link>
              </Button>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}
