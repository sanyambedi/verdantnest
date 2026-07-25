"use client";

import React, { useState } from 'react';
import { useAdminAuth } from '../auth-context';
import { Lock, ShieldAlert, Sparkles, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Subtle micro-delay to simulate secure authentication handshake
    setTimeout(() => {
      const success = login(password);
      if (success) {
        toast({
          title: "Access Granted",
          description: "Welcome to the VerdantNest Administration Suite.",
          className: "bg-[#12160F] text-emerald-400 border border-emerald-500/20"
        });
      } else {
        setError(true);
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Security Alert",
          description: "Invalid administrator credentials.",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#070905] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),rgba(0,0,0,0))] flex items-center justify-center p-4">
      {/* Dynamic Animated background ambient glow particles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      <Card className="w-full max-w-md bg-[#0D1109]/80 backdrop-blur-2xl border-emerald-950/40 shadow-2xl relative overflow-hidden group">
        {/* Glow border line at the top */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <CardHeader className="space-y-4 pt-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <Logo size={56} />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-headline font-black tracking-tight text-white flex items-center justify-center gap-2">
              VerdantNest <Sparkles className="w-4 h-4 text-emerald-400" />
            </CardTitle>
            <CardDescription className="text-emerald-500/40 font-mono text-[10px] uppercase tracking-widest">
              Core Security Terminal
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest">Passphrase</label>
                <span className="text-[9px] font-mono text-emerald-500/30">Default: admin123</span>
              </div>
              <div className="relative">
                <Input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator passcode..."
                  className={`bg-[#070905]/80 border-emerald-950/60 focus:border-emerald-500/50 text-white rounded-xl h-12 pl-4 pr-10 focus:ring-emerald-500/20 font-mono transition-all duration-300 ${
                    error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10' : ''
                  }`}
                  disabled={loading}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500/30">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-950/20 border border-red-500/10 text-red-400 text-xs animate-shake">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span className="font-medium">Authentication failed. Invalid passcode.</span>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all duration-300 rounded-xl h-12 font-black text-xs uppercase tracking-widest mt-2"
              disabled={loading || !password}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                  <span>Decrypting Session...</span>
                </div>
              ) : (
                "Establish Connection"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
