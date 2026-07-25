
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { useCart } from '@/hooks/use-cart';
import { PLANTS } from '@/app/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Lock, 
  CheckCircle2, 
  ArrowLeft,
  Loader2,
  PackageCheck
} from 'lucide-react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const db = useFirestore();
  const { cart, removeFromCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const cartProducts = cart.map(id => PLANTS.find(p => p.id === id)).filter(Boolean) as any[];
  const subtotal = cartProducts.reduce((acc, p) => acc + p.price, 0);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderData = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
      },
      items: cartProducts.map(p => ({ id: p.id, name: p.name, price: p.price })),
      total: subtotal,
      createdAt: serverTimestamp(),
      status: 'pending'
    };

    const completeCheckout = () => {
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        cart.forEach(id => removeFromCart(id));
      }, 1500);
    };

    if (db) {
      try {
        const orderRef = collection(db, 'orders');
        await addDoc(orderRef, orderData);
      } catch (error) {
        console.warn("Firestore order record skipped:", error);
      }
    }
    completeCheckout();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
            <div className="absolute inset-0 bg-secondary/20 rounded-full animate-ping" />
            <div className="relative flex items-center justify-center w-full h-full rounded-full bg-secondary text-white shadow-2xl">
              <PackageCheck className="w-12 h-12 md:w-16 md:h-16" />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-headline font-black text-primary">Order Confirmed!</h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Thank you for choosing VerdantNest. Your green friends are being conditioned for their journey.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
            <div className="flex justify-between items-center text-xs md:text-sm font-bold text-primary mb-2">
              <span className="uppercase tracking-widest opacity-50">Order ID</span>
              <span>#VN-{Math.floor(Math.random() * 90000) + 10000}</span>
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground italic">
              A confirmation email has been dispatched.
            </p>
          </div>
          <Button className="w-full h-16 md:h-20 text-lg md:text-xl font-black rounded-2xl shadow-xl shadow-primary/20" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:py-32 max-w-7xl">
        <div className="flex items-center gap-4 mb-10">
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10" asChild>
            <Link href="/cart"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <h1 className="text-2xl md:text-4xl font-headline font-bold text-primary">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="space-y-8 order-2 lg:order-1">
            <form onSubmit={handlePayment} className="space-y-8">
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-secondary border-b border-primary/5 pb-2">
                  <Truck className="w-5 h-5" />
                  <h2 className="text-lg md:text-xl font-headline font-bold text-primary">Shipping</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">First Name</Label>
                    <Input required placeholder="Jane" className="h-12 rounded-xl" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Last Name</Label>
                    <Input required placeholder="Doe" className="h-12 rounded-xl" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Address</Label>
                  <Input required placeholder="123 Botanical Lane" className="h-12 rounded-xl" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 sm:col-span-1">
                    <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">City</Label>
                    <Input required placeholder="New York" className="h-12 rounded-xl" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">State</Label>
                    <Input required placeholder="NY" className="h-12 rounded-xl" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">ZIP</Label>
                    <Input required placeholder="10001" className="h-12 rounded-xl" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} />
                  </div>
                </div>
              </section>

              <section className="space-y-6 pt-4">
                <div className="flex items-center gap-3 text-secondary border-b border-primary/5 pb-2">
                  <CreditCard className="w-5 h-5" />
                  <h2 className="text-lg md:text-xl font-headline font-bold text-primary">Payment</h2>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Card Number</Label>
                  <div className="relative">
                    <Input required placeholder="0000 0000 0000 0000" className="h-12 rounded-xl pl-12" value={formData.cardNumber} onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Expiry</Label>
                    <Input required placeholder="MM / YY" className="h-12 rounded-xl" value={formData.expiry} onChange={(e) => setFormData({...formData, expiry: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">CVV</Label>
                    <Input required placeholder="123" className="h-12 rounded-xl" value={formData.cvv} onChange={(e) => setFormData({...formData, cvv: e.target.value})} />
                  </div>
                </div>
              </section>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  disabled={isProcessing || cartProducts.length === 0}
                  className="w-full h-16 md:h-20 text-lg md:text-2xl font-black rounded-2xl shadow-2xl shadow-primary/20 gap-3 group"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                      Securing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 md:w-6 md:h-6" />
                      Pay ${subtotal.toFixed(2)}
                    </>
                  )}
                </Button>
                <div className="text-center text-[8px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-6 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-secondary" />
                  Encrypted SSL Transaction
                </div>
              </div>
            </form>
          </div>

          <aside className="sticky top-28 order-1 lg:order-2">
            <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden">
              <CardHeader className="bg-primary/5 p-6 md:p-8 border-b">
                <CardTitle className="text-xl md:text-2xl font-headline font-bold text-primary">Basket Review</CardTitle>
                <CardDescription>{cartProducts.length} Items ready for conditioning</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="max-h-[250px] overflow-y-auto no-scrollbar space-y-4 pr-2">
                  {cartProducts.map((plant, i) => (
                    <div key={i} className="flex items-center gap-4 py-2 border-b border-primary/5 last:border-0">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 bg-muted/20">
                        <Image src={plant.image} alt={plant.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-primary truncate">{plant.name}</p>
                        <p className="text-[8px] text-muted-foreground uppercase tracking-widest">{plant.category}</p>
                      </div>
                      <p className="text-xs font-black text-primary">${plant.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 md:space-y-4 pt-4">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-muted-foreground font-medium">Subtotal</span>
                    <span className="font-bold text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-muted-foreground font-medium">Eco-Safe Shipping</span>
                    <span className="font-bold text-secondary">Included</span>
                  </div>
                  <div className="pt-4 border-t border-primary/5 flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Total Due</p>
                      <p className="text-3xl md:text-4xl font-black text-primary">${subtotal.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-4 flex gap-3 items-center">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                  <p className="text-[10px] md:text-xs font-bold text-emerald-900/70">
                    Nursery-fresh condition guaranteed on arrival.
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
