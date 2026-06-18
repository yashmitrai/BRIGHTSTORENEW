import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-14 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">The shared commerce layer helping neighbourhood retailers win the convenience economy.</p>
          <div className="mt-5 flex gap-2">{[Instagram, Twitter, Linkedin].map((Icon, i) => <button key={i} className="grid size-9 place-items-center rounded-lg border bg-white text-slate-500 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900"><Icon size={16} /></button>)}</div>
        </div>
        {[
          ["Shop", "Search", "Smart Basket", "Monthly plans"],
          ["Partners", "Retailer portal", "Pricing", "Resources"],
          ["Company", "About", "Careers", "Contact"]
        ].map(([heading, ...links]) => (
          <div key={heading}><h3 className="text-sm font-bold">{heading}</h3><div className="mt-4 grid gap-3">{links.map((link) => <Link key={link} href="#" className="text-sm text-slate-500 hover:text-brand-600">{link}</Link>)}</div></div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-3 border-t px-4 pt-6 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8 dark:border-slate-800"><span>© 2026 BRIGHTSTORE Technologies</span><span>Privacy · Terms · Made for local India 🇮🇳</span></div>
    </footer>
  );
}
