"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Eye,
  ArrowRight,
  X
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface OrderType {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  address: string;
  items: OrderItem[];
}

export default function AdminOrdersPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Processing' | 'Shipped' | 'Delivered'>('All');
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const [orders, setOrders] = useState<OrderType[]>([
    {
      id: 'VN-8924',
      customer: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      date: 'May 24, 2026',
      total: 124.00,
      status: 'Delivered',
      address: '742 Evergreen Terrace, Springfield',
      items: [
        { name: 'Fiddle Leaf Fig', qty: 1, price: 35.00 },
        { name: 'Monstera Deliciosa', qty: 2, price: 28.00 },
        { name: 'Peace Lily', qty: 1, price: 22.00 }
      ]
    },
    {
      id: 'VN-8925',
      customer: 'David Vance',
      email: 'dvance@example.com',
      date: 'May 24, 2026',
      total: 45.00,
      status: 'Processing',
      address: '102 Baker Street, Apt 4B, London',
      items: [
        { name: 'Bird of Paradise', qty: 1, price: 45.00 }
      ]
    },
    {
      id: 'VN-8926',
      customer: 'Elena Rostova',
      email: 'elena.r@example.com',
      date: 'May 23, 2026',
      total: 210.00,
      status: 'Shipped',
      address: '45 Prospect Boulevard, Brooklyn, NY',
      items: [
        { name: 'Juniper Bonsai', qty: 2, price: 90.00 },
        { name: 'Snake Plant', qty: 1, price: 19.00 },
        { name: 'ZZ Plant', qty: 1, price: 11.00 }
      ]
    },
    {
      id: 'VN-8927',
      customer: 'Marcus Broady',
      email: 'm.broady@example.com',
      date: 'May 22, 2026',
      total: 88.00,
      status: 'Pending',
      address: '8910 Oakwood Drive, Seattle, WA',
      items: [
        { name: 'Snake Plant', qty: 2, price: 19.00 },
        { name: 'Boston Fern', qty: 1, price: 26.00 },
        { name: 'Jade Plant', qty: 1, price: 24.00 }
      ]
    },
    {
      id: 'VN-8928',
      customer: 'Clara Oswald',
      email: 'clara.o@example.com',
      date: 'May 20, 2026',
      total: 54.00,
      status: 'Delivered',
      address: '556 Raven Road, Cardiff, Wales',
      items: [
        { name: 'Monstera Deliciosa', qty: 1, price: 28.00 },
        { name: 'Boston Fern', qty: 1, price: 26.00 }
      ]
    }
  ]);

  const handleStatusChange = (id: string, newStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered') => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    
    // Update active modal order details if open
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }

    toast({
      title: "Order Status Updated",
      description: `Order ${id} is now updated to: ${newStatus}.`,
      className: "bg-[#12160F] text-emerald-400 border border-emerald-500/20"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <Badge className="rounded-full px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[9px] uppercase tracking-wider"><CheckCircle2 className="w-3 h-3 mr-1 inline" /> Delivered</Badge>;
      case 'Shipped':
        return <Badge className="rounded-full px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold text-[9px] uppercase tracking-wider"><Truck className="w-3 h-3 mr-1 inline" /> Shipped</Badge>;
      case 'Processing':
        return <Badge className="rounded-full px-2.5 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-bold text-[9px] uppercase tracking-wider"><Clock className="w-3 h-3 mr-1 inline" /> Processing</Badge>;
      default:
        return <Badge className="rounded-full px-2.5 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-[9px] uppercase tracking-wider"><AlertCircle className="w-3 h-3 mr-1 inline" /> Pending</Badge>;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-headline font-black text-white leading-tight">
            Order Dispatcher
          </h1>
          <p className="text-slate-400 text-sm mt-1">Review active transactions, manage dispatch statuses, and details.</p>
        </div>
      </header>

      {/* Filter Tabs bar */}
      <div className="flex flex-wrap gap-2 pb-1 border-b border-emerald-950/20">
        {(['All', 'Pending', 'Processing', 'Shipped', 'Delivered'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl border ${
              statusFilter === tab
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            {tab}s
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main Orders Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Input 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by Order ID or Client Name..." 
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
                      <th className="py-4 pl-6">ID</th>
                      <th className="py-4">Client</th>
                      <th className="py-4">Order Date</th>
                      <th className="py-4">Total</th>
                      <th className="py-4">Status</th>
                      <th className="py-4 pr-6 text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950/20 text-xs text-slate-300">
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="hover:bg-emerald-950/5 transition-colors group">
                        <td className="py-4.5 pl-6 font-mono font-black text-white">{order.id}</td>
                        <td className="py-4.5 font-semibold">{order.customer}</td>
                        <td className="py-4.5 text-slate-400">{order.date}</td>
                        <td className="py-4.5 font-black text-white">${order.total.toFixed(2)}</td>
                        <td className="py-4.5">{getStatusBadge(order.status)}</td>
                        <td className="py-4.5 pr-6 text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setSelectedOrder(order)}
                            className="h-8 w-8 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400/60 font-medium">
                          No matching orders located in registry.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Dispatch Invoice sidecard */}
        {selectedOrder ? (
          <Card className="bg-[#0C0F0A]/60 backdrop-blur-2xl border-emerald-950/30 shadow-xl relative overflow-hidden lg:col-span-1">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-white">Invoice Details</CardTitle>
                <CardDescription className="text-slate-400 font-mono text-[10px]">{selectedOrder.id}</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1.5 p-4 rounded-xl border border-emerald-950/20 bg-[#070905]/40 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400/80 font-medium">Client:</span>
                  <span className="font-bold text-white">{selectedOrder.customer}</span>
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-slate-400/80 font-medium">Email:</span>
                  <span className="font-mono text-emerald-400">{selectedOrder.email}</span>
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-slate-400/80 font-medium">Shipment Address:</span>
                  <span className="font-semibold text-white text-right max-w-[150px] truncate">{selectedOrder.address}</span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Items Conditioned</span>
                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs p-3 rounded-lg bg-[#0C0F0A]/30 border border-emerald-950/10">
                      <span className="text-slate-200 font-medium">{item.name} <span className="text-slate-400/60 font-black ml-1.5">x{item.qty}</span></span>
                      <span className="font-bold text-white">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-4 border-t border-emerald-950/20">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Invoice</span>
                <span className="text-xl font-black text-white">${selectedOrder.total.toFixed(2)}</span>
              </div>

              {/* Status Update Trigger Console */}
              <div className="space-y-3.5 pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Update Status Pipeline</span>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleStatusChange(selectedOrder.id, 'Processing')}
                    className="rounded-lg h-10 border-emerald-950/60 text-yellow-500 bg-[#0C0F0A] hover:bg-yellow-500/5 text-[10px] uppercase font-bold tracking-widest active:scale-95 transition-transform"
                    disabled={selectedOrder.status === 'Processing'}
                  >
                    Processing
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleStatusChange(selectedOrder.id, 'Shipped')}
                    className="rounded-lg h-10 border-emerald-950/60 text-blue-500 bg-[#0C0F0A] hover:bg-blue-500/5 text-[10px] uppercase font-bold tracking-widest active:scale-95 transition-transform"
                    disabled={selectedOrder.status === 'Shipped'}
                  >
                    Shipped
                  </Button>
                </div>
                <Button 
                  onClick={() => handleStatusChange(selectedOrder.id, 'Delivered')}
                  className="w-full bg-emerald-500 text-black hover:bg-emerald-400 h-10 rounded-lg text-[10px] uppercase font-black tracking-widest active:scale-95 transition-transform"
                  disabled={selectedOrder.status === 'Delivered'}
                >
                  Mark Delivered <CheckCircle2 className="w-3.5 h-3.5 ml-2" />
                </Button>
              </div>

            </CardContent>
          </Card>
        ) : (
          <Card className="bg-[#0C0F0A]/20 border-emerald-950/10 p-6 rounded-2xl flex flex-col justify-center items-center text-center border lg:col-span-1 min-h-[300px]">
            <ClipboardList className="w-12 h-12 text-emerald-500/25 mb-4 animate-pulse" />
            <h3 className="text-slate-200 font-headline font-bold text-sm">Registry Auditor</h3>
            <p className="text-slate-400/60 text-xs mt-1 max-w-[200px]">Select any transaction ID to review shipment invoice, ordered specs, or change routing statuses.</p>
          </Card>
        )}

      </div>
    </div>
  );
}
