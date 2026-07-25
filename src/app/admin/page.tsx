"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { 
  DollarSign, 
  Sprout, 
  ShoppingBag, 
  BookOpen, 
  ArrowUpRight, 
  Activity,
  ArrowRight,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { PLANTS } from '../lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const totalSales = 12480;
  const specimenCount = PLANTS?.length || 55;
  const pendingOrders = 14;
  const activeGuides = 5;

  const salesData = [
    { name: 'Jan', sales: 1200 },
    { name: 'Feb', sales: 2100 },
    { name: 'Mar', sales: 1800 },
    { name: 'Apr', sales: 3100 },
    { name: 'May', sales: 2600 },
    { name: 'Jun', sales: 4200 },
  ];

  const categoryData = [
    { name: 'Indoor', count: 18, fill: '#10B981' },
    { name: 'Outdoor', count: 12, fill: '#34D399' },
    { name: 'Purifiers', count: 8, fill: '#059669' },
    { name: 'Succulents', count: 10, fill: '#047857' },
    { name: 'Bonsai', count: 7, fill: '#065F46' },
  ];

  const recentOrders = [
    { id: 'VN-8924', customer: 'Sarah Jenkins', date: 'May 24, 2026', total: '$124.00', status: 'Delivered', style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { id: 'VN-8925', customer: 'David Vance', date: 'May 24, 2026', total: '$45.00', status: 'Processing', style: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    { id: 'VN-8926', customer: 'Elena Rostova', date: 'May 23, 2026', total: '$210.00', status: 'Shipped', style: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { id: 'VN-8927', customer: 'Marcus Broady', date: 'May 22, 2026', total: '$88.00', status: 'Pending', style: 'bg-red-500/10 text-red-400 border-red-500/20' },
  ];

  const stats = [
    { label: "Total Revenue", value: `$${totalSales.toLocaleString()}`, change: "+18.4% this month", icon: DollarSign, color: "text-emerald-400" },
    { label: "Botanical Stock", value: `${specimenCount} Species`, change: "6 categories live", icon: Sprout, color: "text-emerald-400" },
    { label: "Active Orders", value: `${pendingOrders} Orders`, change: "4 in shipment pipeline", icon: ShoppingBag, color: "text-yellow-400" },
    { label: "Care Wisdom Guides", value: `${activeGuides} Guides`, change: "1 new draft draft", icon: BookOpen, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline font-black text-white leading-tight">
            HQ Dashboard Overview
          </h1>
          <p className="text-slate-400 text-sm mt-1">Real-time metrics, inventory counts, and sales progression.</p>
        </div>
        <div className="flex gap-3">
          <Button size="lg" className="rounded-xl px-6 h-12 text-xs font-black bg-emerald-500 text-black hover:bg-emerald-400 shadow-xl shadow-emerald-500/10 active:scale-95" asChild>
            <a href="/admin/products?add=true">
              <Plus className="w-4 h-4 mr-2" /> NEW SPECIMEN
            </a>
          </Button>
        </div>
      </header>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-[#0C0F0A]/60 backdrop-blur-2xl border-emerald-950/20 shadow-xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 group-hover:bg-emerald-500/60 transition-colors" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</span>
              <stat.icon className={`h-4.5 w-4.5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
              <p className="text-[10px] font-medium text-slate-400/60 mt-1 flex items-center gap-1.5">
                <span className="text-emerald-400">★</span> {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Graphs Dashboard Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-[#0C0F0A]/40 backdrop-blur-2xl border-emerald-950/20 shadow-xl lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Revenue Progression (USD)
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">Overview of client sales over the past 6 operational months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#12170e" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0C0F0A', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px' }}
                  labelStyle={{ color: '#94A3B8', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#0C0F0A]/40 backdrop-blur-2xl border-emerald-950/20 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-white">Specimens by Category</CardTitle>
            <CardDescription className="text-slate-400 text-xs">Total individual live species categories.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#12170e" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0C0F0A', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px' }}
                  labelStyle={{ color: '#94A3B8', fontWeight: 'bold' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-[#0C0F0A]/40 backdrop-blur-2xl border-emerald-950/20 shadow-xl lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-sm font-black uppercase tracking-widest text-white">Recent Customer Orders</CardTitle>
              <CardDescription className="text-slate-400 text-xs">Most recent purchases waiting for botanical conditioning.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/20 rounded-lg" asChild>
              <a href="/admin/orders">View All <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></a>
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-emerald-950/40 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  <th className="pb-3.5 pl-2">ID</th>
                  <th className="pb-3.5">Customer</th>
                  <th className="pb-3.5">Order Date</th>
                  <th className="pb-3.5">Price</th>
                  <th className="pb-3.5 pr-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/20 text-xs text-slate-300">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-emerald-950/5 transition-colors">
                    <td className="py-4 pl-2 font-mono font-bold text-white">{order.id}</td>
                    <td className="py-4 font-semibold">{order.customer}</td>
                    <td className="py-4 text-slate-400">{order.date}</td>
                    <td className="py-4 font-black text-white">{order.total}</td>
                    <td className="py-4 pr-2 text-right">
                      <Badge className={`rounded-full px-2.5 py-0.5 border-none font-bold text-[9px] uppercase tracking-wider ${order.style}`}>
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Quick Operations Console */}
        <Card className="bg-[#0C0F0A]/40 backdrop-blur-2xl border-emerald-950/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest text-white">HQ Operations</CardTitle>
            <CardDescription className="text-slate-400 text-xs">Direct administrator links and operational nodes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5">
            <a 
              href="/admin/seo" 
              className="flex items-center justify-between p-4 rounded-xl bg-[#0F130C]/60 hover:bg-[#141A10] border border-emerald-950/25 hover:border-emerald-500/20 transition-all group"
            >
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">AI Content Assistant</h4>
                <p className="text-[10px] text-slate-400">Generate high-SEO articles instantly.</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-500/40 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            
            <a 
              href="/admin/products" 
              className="flex items-center justify-between p-4 rounded-xl bg-[#0F130C]/60 hover:bg-[#141A10] border border-emerald-950/25 hover:border-emerald-500/20 transition-all group"
            >
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Catalog Auditor</h4>
                <p className="text-[10px] text-slate-400">Audit pricing, stock numbers, details.</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-500/40 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <div className="p-4.5 rounded-xl border border-emerald-950/30 bg-[#0C0F0A]/30">
              <span className="text-[9px] font-mono uppercase text-emerald-500/40 tracking-wider">Session Audit Log</span>
              <ul className="mt-3.5 space-y-3 text-[10px] text-slate-400/80">
                <li className="flex justify-between font-medium">
                  <span>🔑 Auth handshake success</span>
                  <span className="font-mono text-emerald-500/40">Just now</span>
                </li>
                <li className="flex justify-between font-medium">
                  <span>🌿 Updated site icon configuration</span>
                  <span className="font-mono text-emerald-500/40">2m ago</span>
                </li>
                <li className="flex justify-between font-medium">
                  <span>🍃 Dev port offset triggered (9005)</span>
                  <span className="font-mono text-emerald-500/40">10m ago</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
