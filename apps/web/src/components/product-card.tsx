"use client";

import Link from "next/link";
import { Heart, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { money } from "@/lib/utils";
import { Button } from "./ui";

export function ProductCard({ product }: { product: { id: string; name: string; unit: string; price: number; mrp: number; store: string; emoji: string; rating: number } }) {
  return (
    <motion.article whileHover={{ y: -5 }} className="group relative rounded-3xl border border-slate-200/80 bg-white p-3 shadow-sm transition-shadow hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <button className="absolute right-5 top-5 z-10 grid size-8 place-items-center rounded-full bg-white/80 text-slate-400 backdrop-blur hover:text-rose-500 dark:bg-slate-900/80"><Heart size={16} /></button>
      <Link href={`/product/${product.id}`}>
        <div className="grid aspect-[1.1] place-items-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 text-7xl dark:from-slate-800 dark:to-slate-900">{product.emoji}</div>
        <div className="px-1 pb-1 pt-4">
          <p className="text-xs font-medium text-brand-600">{product.store}</p>
          <h3 className="mt-1 line-clamp-2 min-h-12 font-semibold leading-6 text-ink dark:text-white">{product.name}</h3>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-500"><span>{product.unit}</span><span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" />{product.rating}</span></div>
        </div>
      </Link>
      <div className="mt-3 flex items-center justify-between px-1 pb-1">
        <div><span className="font-bold text-ink dark:text-white">{money(product.price)}</span><span className="ml-2 text-xs text-slate-400 line-through">{money(product.mrp)}</span></div>
        <Button className="size-9 rounded-xl px-0" aria-label={`Add ${product.name}`}><Plus size={17} /></Button>
      </div>
    </motion.article>
  );
}
