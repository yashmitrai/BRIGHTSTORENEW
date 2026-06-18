"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Store } from "lucide-react";
import Link from "next/link";
import { basketItems } from "@/lib/data";
import { money } from "@/lib/utils";
import { Button, Pill } from "./ui";

export function SmartDemo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl sm:p-7 dark:border-slate-700">
      <div className="absolute -right-28 -top-28 size-72 rounded-full bg-brand-500/25 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div><Pill className="border-brand-400/30 bg-brand-400/10 text-brand-300"><Sparkles size={12} /> Smart Basket Engine™</Pill><h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Your smartest way to shop.</h3></div>
          <motion.div animate={{ rotate: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="grid size-12 place-items-center rounded-2xl bg-brand-500 shadow-glow"><Sparkles /></motion.div>
        </div>
        <div className={`mt-7 grid gap-5 ${compact ? "" : "lg:grid-cols-[1.2fr_.8fr]"}`}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.06]">
            <div className="grid grid-cols-[1fr_repeat(3,54px)] border-b border-white/10 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:grid-cols-[1fr_repeat(3,75px)]"><span>Item</span><span>Gupta</span><span>Fresh</span><span>Apna</span></div>
            {basketItems.map((item, i) => <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: .15 * i }} key={item.name} className="grid grid-cols-[1fr_repeat(3,54px)] items-center border-b border-white/10 px-4 py-3 text-xs last:border-0 sm:grid-cols-[1fr_repeat(3,75px)] sm:text-sm"><span className="font-medium">{item.name}</span>{[item.a, item.b, item.c].map((price) => <span key={price} className={price === Math.min(item.a, item.b, item.c) ? "font-bold text-brand-300" : "text-slate-400"}>{money(price)}</span>)}</motion.div>)}
          </div>
          {!compact && <div className="rounded-2xl bg-white p-5 text-ink">
            <div className="flex items-center gap-2 text-sm font-bold"><span className="grid size-8 place-items-center rounded-lg bg-brand-50 text-brand-600"><Store size={16} /></span>Best combination found</div>
            <div className="my-5 grid gap-2 text-sm">{basketItems.map((item) => <div key={item.name} className="flex justify-between"><span className="text-slate-500">{item.name}</span><span className="flex items-center gap-1 font-semibold"><Check size={13} className="text-brand-500" />{item.best}</span></div>)}</div>
            <div className="border-t pt-4"><div className="flex items-end justify-between"><div><p className="text-xs text-slate-500">Optimized total</p><p className="font-display text-3xl font-extrabold">₹350</p></div><div className="rounded-xl bg-brand-50 px-3 py-2 text-right"><p className="text-[10px] font-bold uppercase text-brand-600">You save</p><p className="font-bold text-brand-700">₹40</p></div></div></div>
            <Link href="/smart-basket"><Button className="mt-5 w-full">Optimize my basket <ArrowRight size={16} /></Button></Link>
          </div>}
        </div>
      </div>
    </div>
  );
}
