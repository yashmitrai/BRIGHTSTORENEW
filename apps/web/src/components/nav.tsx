"use client";

import Link from "next/link";
import { Heart, MapPin, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Button, Logo } from "./ui";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Logo />
        <button className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-left text-xs lg:flex dark:border-slate-700">
          <MapPin size={16} className="text-brand-500" />
          <span><b className="block text-ink dark:text-white">Deliver to Home</b><span className="text-slate-500">Indiranagar, Bengaluru</span></span>
        </button>
        <Link href="/search" className="mx-auto hidden h-11 max-w-xl flex-1 items-center gap-3 rounded-xl bg-slate-100 px-4 text-sm text-slate-500 md:flex dark:bg-slate-900">
          <Search size={18} /> Search rice, milk, detergent...
          <kbd className="ml-auto rounded-md border bg-white px-2 py-0.5 text-[10px] dark:border-slate-700 dark:bg-slate-800">⌘ K</kbd>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <ThemeToggle />
          <Link href="/wishlist"><Button variant="ghost" className="size-10 px-0"><Heart size={18} /></Button></Link>
          <Link href="/cart"><Button variant="ghost" className="relative size-10 px-0"><ShoppingBag size={18} /><span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-brand-500 text-[9px] text-white">3</span></Button></Link>
          <Link href="/profile"><Button variant="secondary" className="ml-2">Sign in</Button></Link>
        </nav>
        <button className="ml-auto md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="border-t bg-white p-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <Link href="/search" className="mb-3 flex h-11 items-center gap-2 rounded-xl bg-slate-100 px-4 text-sm text-slate-500 dark:bg-slate-900"><Search size={17} /> Search products</Link>
          <div className="grid gap-1">
            {["Smart Basket", "Wishlist", "Orders", "Profile", "Retailer portal"].map((item) => <Link key={item} href={`/${item.toLowerCase().replace(" portal", "").replace(" ", "-")}`} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900">{item}</Link>)}
          </div>
        </div>
      )}
    </header>
  );
}
