"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token === 'verdantnest-secure-admin-token') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && pathname !== '/admin/login') {
        router.replace('/admin/login');
      } else if (isAuthenticated && pathname === '/admin/login') {
        router.replace('/admin');
      }
    }
  }, [isAuthenticated, pathname, loading, router]);

  const login = (password: string): boolean => {
    // Simple, clean out-of-the-box credential security for starter
    if (password === 'admin123' || password === 'password') {
      sessionStorage.setItem('admin_token', 'verdantnest-secure-admin-token');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    router.replace('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0D08] flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
          <p className="text-emerald-500/60 font-mono text-xs uppercase tracking-widest mt-6 animate-pulse">Initializing Security...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
