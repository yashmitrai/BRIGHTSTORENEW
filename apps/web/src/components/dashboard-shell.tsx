"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BarChart3, Boxes, ChevronDown, CreditCard, LayoutDashboard, LogOut, Menu, PackageCheck, Settings, ShieldAlert, Store, Users, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./ui";
import { cn } from "@/lib/utils";

const retailerLinks = [
  ["Overview", "/retailer", LayoutDashboard],
  ["Inventory", "/retailer/inventory", Boxes],
  ["Orders", "/retailer/orders", PackageCheck],
  ["Analytics", "/retailer/analytics", BarChart3],
  ["Customers", "/retailer/customers", Users],
  ["Settings", "/retailer/settings", Settings]
] as const;
const adminLinks = [
  ["Overview", "/admin", LayoutDashboard],
  ["Retailers", "/admin/retailers", Store],
  ["Users", "/admin/users", Users],
  ["Orders", "/admin/orders", PackageCheck],
  ["Subscriptions", "/admin/subscriptions", CreditCard],
  ["Analytics", "/admin/analytics", Activity],
  ["Fraud monitoring", "/admin/fraud", ShieldAlert]
] as const;

export function DashboardShell({ role, children }: { role: "retailer" | "admin"; children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = role === "retailer" ? retailerLinks : adminLinks;
  return <div className="min-h-screen bg-[#f7f8fa] dark:bg-slate-950">
    <aside className={cn("fixed inset-y-0 left-0 z-50 w-64 border-r bg-white p-4 transition-transform dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex h-12 items-center justify-between px-2"><Logo/><button className="lg:hidden" onClick={()=>setOpen(false)}><X size={20}/></button></div>
      <div className="mt-7 rounded-xl border p-3 dark:border-slate-700"><div className="flex items-center gap-3"><span className={`grid size-9 place-items-center rounded-lg ${role==="admin"?"bg-slate-900 text-white":"bg-brand-500 text-white"}`}>{role==="admin"?"B":"G"}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{role==="admin"?"BRIGHTSTORE Admin":"Gupta General Store"}</p><p className="text-[10px] text-slate-400">{role==="admin"?"Platform operations":"Indiranagar · Live"}</p></div><ChevronDown size={14}/></div></div>
      <nav className="mt-7 space-y-1">{links.map(([label,href,Icon])=><Link key={href} href={href} onClick={()=>setOpen(false)} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition", pathname===href?"bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300":"text-slate-500 hover:bg-slate-50 hover:text-ink dark:hover:bg-slate-800 dark:hover:text-white")}><Icon size={18}/>{label}{label==="Orders"&&<span className="ml-auto rounded-full bg-brand-500 px-2 py-0.5 text-[9px] text-white">8</span>}</Link>)}</nav>
      <div className="absolute bottom-4 left-4 right-4"><Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"><LogOut size={18}/>Back to store</Link></div>
    </aside>
    {open&&<button className="fixed inset-0 z-40 bg-ink/30 lg:hidden" onClick={()=>setOpen(false)}/>}
    <div className="lg:pl-64"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/85 px-4 backdrop-blur-xl sm:px-7 dark:border-slate-800 dark:bg-slate-900/85"><button className="lg:hidden" onClick={()=>setOpen(true)}><Menu/></button><div className="ml-auto flex items-center gap-3"><button className="relative grid size-9 place-items-center rounded-lg bg-slate-100 dark:bg-slate-800"><Activity size={16}/><span className="absolute right-1 top-1 size-1.5 rounded-full bg-brand-500"/></button><div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-xs font-bold text-white">{role==="admin"?"YM":"RG"}</div></div></header><main className="p-4 sm:p-7 lg:p-9">{children}</main></div>
  </div>;
}

export function StatCard({ label, value, change, icon: Icon, tone = "green" }: { label: string; value: string; change: string; icon: typeof Activity; tone?: "green"|"amber"|"blue"|"violet" }) {
  const tones = {green:"bg-brand-50 text-brand-600 dark:bg-brand-900/20",amber:"bg-amber-50 text-amber-600 dark:bg-amber-900/20",blue:"bg-blue-50 text-blue-600 dark:bg-blue-900/20",violet:"bg-violet-50 text-violet-600 dark:bg-violet-900/20"};
  return <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between"><span className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`}><Icon size={18}/></span><span className="text-[11px] font-semibold text-brand-600">{change}</span></div><p className="mt-5 font-display text-2xl font-extrabold">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>;
}
