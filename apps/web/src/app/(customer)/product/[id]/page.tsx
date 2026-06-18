import Link from "next/link";
import { ChevronRight, Heart, Minus, Plus, ShieldCheck, Star, Store, Truck } from "lucide-react";
import { products } from "@/lib/data";
import { money } from "@/lib/utils";
import { Button, Pill } from "@/components/ui";
import { ProductCard } from "@/components/product-card";
import { createElement } from "react";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id) ?? products[0];
  return <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="flex items-center gap-2 text-xs text-slate-400"><Link href="/">Home</Link><ChevronRight size={12}/><Link href="/search">Groceries</Link><ChevronRight size={12}/><span>{product.name}</span></div>
    <div className="mt-8 grid gap-10 lg:grid-cols-2">
      <div className="grid aspect-square place-items-center rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-slate-100 text-[10rem] dark:from-slate-800 dark:to-slate-900">{product.emoji}</div>
      <div className="py-3"><Pill>18% below nearby average</Pill><h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{product.name}</h1><p className="mt-3 text-slate-500">{product.unit} · Premium quality</p><div className="mt-4 flex items-center gap-3"><span className="flex items-center gap-1 rounded-lg bg-brand-50 px-2 py-1 text-sm font-bold text-brand-700"><Star size={14} className="fill-brand-500 text-brand-500"/>{product.rating}</span><span className="text-sm text-slate-500">342 ratings</span></div>
        <div className="mt-7 flex items-end gap-3"><span className="font-display text-4xl font-extrabold">{money(product.price)}</span><span className="mb-1 text-slate-400 line-through">{money(product.mrp)}</span><span className="mb-1 text-sm font-bold text-brand-600">Save {money(product.mrp-product.price)}</span></div>
        <p className="mt-2 text-xs text-slate-400">Inclusive of all taxes</p>
        <div className="mt-8 flex gap-3"><div className="flex h-13 items-center rounded-xl border dark:border-slate-700"><button className="px-4"><Minus size={16}/></button><span className="px-2 font-semibold">1</span><button className="px-4"><Plus size={16}/></button></div><Link href="/cart" className="flex-1"><Button className="h-13 w-full">Add to basket</Button></Link><Button variant="secondary" className="size-13 px-0"><Heart size={19}/></Button></div>
        <div className="mt-8 divide-y rounded-2xl border px-5 dark:divide-slate-700 dark:border-slate-700">{[[Store,"Sold by",product.store],[Truck,"Delivery","18–24 minutes"],[ShieldCheck,"BRIGHTSTORE promise","Freshness or a full refund"]].map(([Icon,label,value])=><div key={label as string} className="flex items-center gap-4 py-4"><span className="grid size-9 place-items-center rounded-lg bg-brand-50 text-brand-600">{createElement(Icon as typeof Store,{size:17})}</span><div><p className="text-[11px] text-slate-400">{label as string}</p><p className="text-sm font-semibold">{value as string}</p></div></div>)}</div>
      </div>
    </div>
    <h2 className="mb-5 mt-20 font-display text-2xl font-bold">You may also like</h2><div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">{products.slice(0,6).map((p)=><ProductCard key={p.id} product={p}/>)}</div>
  </div>;
}
