"use client";

import { useCallback, useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { categories, products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Button, Pill } from "@/components/ui";
import { useInventoryRealtime, type InventoryEvent } from "@/hooks/use-inventory-realtime";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [liveInventory, setLiveInventory] = useState<Record<string, InventoryEvent>>({});
  const onInventoryUpdate = useCallback((inventory: InventoryEvent) => {
    setLiveInventory((current) => ({ ...current, [inventory.productId]: inventory }));
  }, []);
  useInventoryRealtime(onInventoryUpdate);
  const visible = useMemo(() => products
    .filter((p) => liveInventory[p.id]?.isAvailable !== false && (liveInventory[p.id]?.stock ?? p.stock) > 0)
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    .map((p) => ({ ...p, price: liveInventory[p.id] ? liveInventory[p.id].pricePaise / 100 : p.price })), [query, liveInventory]);
  return <div className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div className="max-w-3xl"><Pill>Live prices from 28 stores</Pill><h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Find your everyday essentials.</h1><p className="mt-3 text-slate-500">Compare availability, price, rating, and delivery time across your neighbourhood.</p></div>
    <div className="mt-8 flex gap-3"><label className="flex h-13 flex-1 items-center gap-3 rounded-2xl border bg-white px-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"><Search className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} autoFocus placeholder="Search products, brands, or categories" className="w-full bg-transparent outline-none" /></label><Button variant="secondary" className="h-13"><SlidersHorizontal size={17} /><span className="hidden sm:inline">Filters</span></Button></div>
    <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-2">{["All", ...categories.map((c) => c.name)].map((c, i) => <button key={c} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${i === 0 ? "bg-ink text-white dark:bg-white dark:text-ink" : "border bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900"}`}>{c}</button>)}</div>
    <div className="mt-10 flex items-center justify-between"><p className="text-sm text-slate-500"><b className="text-ink dark:text-white">{visible.length} products</b> available near you · <span className="text-brand-600">live inventory</span></p><button className="flex items-center gap-2 text-sm font-semibold"><Filter size={15} /> Best match</button></div>
    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">{visible.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    {!visible.length && <div className="py-24 text-center"><div className="text-5xl">🔎</div><h2 className="mt-4 text-xl font-bold">No exact match yet</h2><p className="mt-2 text-sm text-slate-500">Try a product type like rice, milk, or atta.</p></div>}
  </div>;
}
