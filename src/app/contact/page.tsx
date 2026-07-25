
"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Send, Instagram, Twitter, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;

    setLoading(true);
    const contactRef = collection(db, 'contacts');

    addDoc(contactRef, {
      ...formData,
      createdAt: serverTimestamp()
    })
    .then(() => {
      setSubmitted(true);
      toast({
        title: "Message Sent",
        description: "Our botanists will get back to you shortly.",
      });
    })
    .catch(async (error) => {
      const permissionError = new FirestorePermissionError({
        path: contactRef.path,
        operation: 'create',
        requestResourceData: formData,
      });
      errorEmitter.emit('permission-error', permissionError);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-7xl">
        <header className="mb-20 space-y-4">
          <Badge variant="secondary" className="bg-secondary text-white px-6 py-2 rounded-full font-black text-[10px] tracking-[0.2em] uppercase">
            Communication Hub
          </Badge>
          <h1 className="text-6xl md:text-8xl font-headline font-bold text-primary leading-[0.85]">
            Let's Start a <br /> <span className="text-secondary italic">Conversation.</span>
          </h1>
          <p className="text-2xl text-muted-foreground max-w-2xl font-medium leading-relaxed italic">
            Whether you're a seasoned collector or choosing your first green companion, our botanists are here to guide you.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <section className="space-y-12">
            <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-primary/5 border border-primary/5">
              {submitted ? (
                <div className="text-center py-20 space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-headline font-bold text-primary">Message Transmitted</h2>
                  <p className="text-muted-foreground">Thank you for reaching out. A botanist will respond within 24 hours.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-xl">Send Another Message</Button>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h2 className="text-4xl font-headline font-bold text-primary mb-2">Send a Message</h2>
                    <p className="text-muted-foreground">Expect a response from our head botanist within 24 hours.</p>
                  </div>
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Full Name</label>
                        <Input 
                          required
                          placeholder="Jane Doe" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="h-14 rounded-2xl bg-muted/20 border-none outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Email Address</label>
                        <Input 
                          required
                          type="email" 
                          placeholder="jane@verdantnest.com" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="h-14 rounded-2xl bg-muted/20 border-none outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Subject</label>
                      <Input 
                        required
                        placeholder="Order Inquiry, Care Advice, etc." 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="h-14 rounded-2xl bg-muted/20 border-none outline-none focus:ring-2 focus:ring-primary/20" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Your Message</label>
                      <Textarea 
                        required
                        placeholder="Tell us how we can help you grow..." 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="min-h-[200px] rounded-[2rem] bg-muted/20 border-none outline-none focus:ring-2 focus:ring-primary/20 p-6" 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full h-16 rounded-2xl text-xl font-black gap-3 shadow-xl shadow-primary/20 group"
                    >
                      {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          Transmit Message
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </section>

          <section className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Phone, title: "Phone Support", content: "+1 (555) GROW-PLNT\nMon-Fri, 9am - 6pm", color: "text-blue-500" },
                { icon: Mail, title: "Digital Correspondence", content: "hello@verdantnest.com\ncare@verdantnest.com", color: "text-orange-500" },
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl border border-primary/5 group hover:-translate-y-2 transition-transform duration-500">
                  <div className={`p-4 rounded-2xl bg-muted/50 w-fit mb-6 ${item.color}`}><item.icon className="w-6 h-6" /></div>
                  <h3 className="text-xl font-headline font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="space-y-8">
               <div className="p-12 bg-primary rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h3 className="text-3xl font-headline font-bold mb-2">Join the Community</h3>
                    <p className="opacity-70">Follow our growth on social platforms.</p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="secondary" size="icon" className="h-14 w-14 rounded-2xl bg-white/10 hover:bg-white/20 text-white"><Instagram className="w-6 h-6" /></Button>
                    <Button variant="secondary" size="icon" className="h-14 w-14 rounded-2xl bg-white/10 hover:bg-white/20 text-white"><Twitter className="w-6 h-6" /></Button>
                    <Button variant="secondary" size="icon" className="h-14 w-14 rounded-2xl bg-white/10 hover:bg-white/20 text-white"><MessageCircle className="w-6 h-6" /></Button>
                  </div>
               </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white py-24 border-t">
        <div className="container mx-auto px-4 text-center text-xs font-black uppercase tracking-[0.5em] text-muted-foreground/40">
          © {new Date().getFullYear()} VerdantNest • Worldwide Shipping
        </div>
      </footer>
    </div>
  );
}
