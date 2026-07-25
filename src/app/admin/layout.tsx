"use client";

import React, { useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from './auth-context';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Wand2, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  Sparkles,
  User,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAdminAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  // If user is not authenticated, auth-context redirects to /admin/login.
  // While redirecting, show a black background to keep it premium and flash-free
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070905] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
      </div>
    );
  }

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Inventory', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ClipboardList },
    { href: '/admin/seo', label: 'AI & SEO Suite', icon: Wand2 },
  ];

  return (
    <div className="min-h-screen bg-[#070905] text-slate-100 flex flex-col lg:flex-row font-body antialiased">
      {/* Dynamic glow decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.02] rounded-full blur-[150px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-[#0C0F0A]/95 border-r border-emerald-950/30 p-6 relative z-30">
        <div className="flex items-center gap-3.5 mb-10 pb-6 border-b border-emerald-950/20">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/30 shadow-sm bg-white flex items-center justify-center p-0.5 shrink-0">
            <Logo size={32} />
          </div>
          <div>
            <h1 className="font-headline text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              VerdantNest <span className="text-[9px] font-mono uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">HQ</span>
            </h1>
            <p className="text-emerald-500/40 font-mono text-[9px] uppercase tracking-widest mt-0.5">Control Center</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 border border-transparent",
                  active 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-lg shadow-emerald-950/30" 
                    : "text-slate-400 hover:text-white hover:bg-emerald-950/10"
                )}
              >
                <item.icon className="h-4.5 w-4.5" />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2 pt-6 border-t border-emerald-950/20">
          <a
            href="/"
            className="flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-emerald-950/10 transition-all uppercase tracking-wider"
          >
            <span className="flex items-center gap-3">
              <ExternalLink className="h-4 w-4" />
              Live Store
            </span>
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/10 border border-transparent hover:border-red-950/20 transition-all uppercase tracking-wider text-left"
          >
            <LogOut className="h-4 w-4" />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <header className="lg:hidden flex items-center justify-between bg-[#0C0F0A] border-b border-emerald-950/20 px-6 py-4.5 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/30 shadow-sm bg-white flex items-center justify-center p-0.5 shrink-0">
            <Logo size={24} />
          </div>
          <span className="font-headline text-md font-bold tracking-tight text-white">VerdantNest HQ</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-slate-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside className={cn(
        "lg:hidden fixed top-0 bottom-0 left-0 w-80 bg-[#0C0F0A] z-40 border-r border-emerald-950/30 p-6 flex flex-col transition-transform duration-500 ease-in-out transform",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between pb-6 border-b border-emerald-950/20 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/30 shadow-sm bg-white flex items-center justify-center p-0.5 shrink-0">
              <Logo size={32} />
            </div>
            <div>
              <span className="font-headline text-md font-bold text-white">VerdantNest HQ</span>
              <p className="text-[8px] font-mono uppercase tracking-widest text-emerald-500/40">Mobile Core</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-5 w-5 text-slate-400" />
          </Button>
        </div>

        <nav className="space-y-1.5" onClick={() => setMobileMenuOpen(false)}>
          {menuItems.map((item) => {
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border border-transparent",
                  active 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : "text-slate-400 hover:text-white"
                )}
              >
                <item.icon className="h-4.5 w-4.5" />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2 pt-6 border-t border-emerald-950/20">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 uppercase tracking-wider"
          >
            <ExternalLink className="h-4 w-4" />
            Live Store
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-red-400 uppercase tracking-wider text-left"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Administrative viewport panel */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10 overflow-x-hidden">
        {/* Top desktop control header */}
        <header className="hidden lg:flex items-center justify-between px-10 py-5 bg-[#0C0F0A]/30 border-b border-emerald-950/10">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500/60 font-mono text-[9px] uppercase tracking-widest">Administrator Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#0C0F0A] border border-emerald-950/20 rounded-full px-4 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest">Active Connection Secure</span>
            </div>
            <div className="w-[1.5px] h-4 bg-emerald-950/40" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-950/50 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-300">Admin Staff</span>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Panel Viewport */}
        <div className="flex-1 p-6 sm:p-10 lg:p-12 relative overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
