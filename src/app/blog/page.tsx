"use client";

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { BLOG_POSTS } from '@/app/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <header className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary">Verdant Journal</Badge>
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-primary mb-6">Botanical Insights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deep dives into plant care, species history, and professional tips from our in-house botanists.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full border-none shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1 bg-white/50 backdrop-blur-sm">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-primary hover:bg-white border-none">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                    <span className="flex items-center gap-2 text-xs font-bold text-primary">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <Button variant="link" className="p-0 h-auto text-primary font-bold text-xs gap-1">
                      Read More <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Newsletter Signup in Blog */}
        <section className="mt-24 p-8 md:p-16 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-headline font-bold text-primary mb-4">Never Miss a Growth Tip</h2>
            <p className="text-muted-foreground">Join our community of 10,000+ plant parents and get the latest botanical research sent directly to your inbox.</p>
          </div>
          <div className="flex w-full md:w-auto gap-3">
            <input 
              type="email" 
              placeholder="botanist@example.com" 
              className="bg-white border border-primary/20 rounded-xl px-4 py-3 flex-1 md:w-64 outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button className="rounded-xl px-8 font-bold">Subscribe</Button>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-16 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <h2 className="font-headline text-2xl font-bold mb-4 text-white">VerdantNest</h2>
              <p className="text-white/70">
                Crafting serene spaces with premium indoor plants and expert care since 2020.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2 opacity-80">
                <li><Link href="/" className="hover:underline">Shop Collection</Link></li>
                <li><Link href="/care-guides" className="hover:underline">Care Guides</Link></li>
                <li><Link href="/blog" className="hover:underline">Journal</Link></li>
                <li><Link href="/about" className="hover:underline">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2 opacity-80">
                <li><Link href="#" className="hover:underline">Shipping Policy</Link></li>
                <li><Link href="#" className="hover:underline">Refund Policy</Link></li>
                <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
