import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock3, MapPin, Search, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { categories, products, stores } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { SmartDemo } from "@/components/smart-demo";
import { Button, Pill, Reveal, SectionHeading } from "@/components/ui";
import { createElement } from "react";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-white pb-20 pt-14 sm:pt-20 dark:bg-slate-950">
        <div className="absolute inset-0 bg-hero-grid bg-[size:28px_28px] opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand-100/50 blur-[120px] dark:bg-brand-900/20" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <Pill><Sparkles size={13} /> Local shopping, brilliantly reimagined</Pill>
            <h1 className="mx-auto mt-7 max-w-5xl text-balance font-display text-5xl font-extrabold leading-[1.05] tracking-[-.045em] text-ink sm:text-7xl lg:text-[5.5rem] dark:text-white">
              Every local store.<br /><span className="bg-gradient-to-r from-brand-500 to-emerald-700 bg-clip-text text-transparent">One smarter basket.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-8 text-slate-500 sm:text-xl">Compare real-time prices from trusted neighbourhood retailers. Save more on every grocery run—and help local businesses thrive.</p>
          </Reveal>
          <Reveal delay={.1} className="mx-auto mt-9 max-w-3xl">
            <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-soft sm:flex-row dark:border-slate-700 dark:bg-slate-900">
              <button className="flex h-13 items-center gap-2 rounded-xl px-4 text-left text-sm sm:border-r dark:border-slate-700"><MapPin size={18} className="text-brand-500" /><span><b className="block text-xs text-ink dark:text-white">Indiranagar</b><span className="text-[11px] text-slate-400">Bengaluru, 560038</span></span></button>
              <Link href="/search" className="flex h-13 flex-1 items-center gap-3 rounded-xl px-4 text-left text-sm text-slate-400"><Search size={20} />What are you looking for?</Link>
              <Link href="/search"><Button className="h-13 w-full rounded-xl px-7 sm:w-auto"><Search size={18} /> Search</Button></Link>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-500">{["20-min delivery", "Real-time inventory", "Best price guaranteed"].map((x, i) => <span key={x} className="flex items-center gap-1.5">{[Clock3, BadgeCheck, ShieldCheck][i]({ size: 14, className: "text-brand-500" })}{x}</span>)}</div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"><Reveal><SmartDemo /></Reveal></section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/40"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Explore" title="Everything you need, nearby." copy="Your daily essentials from stores you already know and trust." action={<Link href="/search" className="hidden items-center gap-1 text-sm font-bold text-brand-600 sm:flex">View all <ArrowRight size={16} /></Link>} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{categories.map((category, i) => <Reveal delay={i*.04} key={category.name}><Link href="/search" className="group block rounded-2xl border border-slate-200 bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900"><div className={`mx-auto grid aspect-square max-w-24 place-items-center rounded-2xl text-4xl ${category.color}`}>{category.icon}</div><h3 className="mt-4 text-sm font-bold text-ink dark:text-white">{category.name}</h3><p className="mt-1 text-[11px] text-slate-400">120+ items</p></Link></Reveal>)}</div>
      </div></section>

      <section className="py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Popular near you" title="Good prices. Great neighbours." copy="Fresh inventory and live prices, updated directly by local retailers." />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </div></section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/40"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Local favourites" title="Stores your neighbourhood loves." />
        <div className="grid gap-4 md:grid-cols-3">{stores.map((store) => <Link href="/store/gupta-general" key={store.name} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center gap-4"><div className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${store.color} font-display text-xl font-black text-white`}>{store.icon}</div><div><h3 className="font-bold text-ink dark:text-white">{store.name}</h3><div className="mt-1 flex gap-3 text-xs text-slate-500"><span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" />{store.rating}</span><span>{store.distance}</span><span>{store.eta}</span></div></div></div><div className="mt-5 flex items-center justify-between border-t pt-4 text-xs dark:border-slate-800"><span className="font-semibold text-brand-600">{store.saving} savings</span><span className="flex items-center gap-1 text-slate-400 group-hover:text-ink dark:group-hover:text-white">Shop store <ArrowRight size={14} /></span></div></Link>)}</div>
      </div></section>

      <section className="py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="overflow-hidden rounded-[2.5rem] bg-ink px-6 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:py-16">
        <div className="max-w-2xl"><Pill className="border-white/10 bg-white/10 text-brand-300">Monthly ration plans</Pill><h2 className="mt-5 text-balance font-display text-4xl font-extrabold sm:text-5xl">Your staples, sorted. Every month.</h2><p className="mt-4 text-slate-300">Build once, auto-optimize every month, and pause anytime. Smart shopping without the weekly spreadsheet.</p><Button className="mt-7">Build my monthly plan <ArrowRight size={16} /></Button></div>
        <div className="mt-10 grid grid-cols-2 gap-3 lg:mt-0">{[["Save up to", "₹1,200/mo"], ["Starting at", "₹999"], ["Delivery", "Always free"], ["Flexibility", "Pause anytime"]].map(([a,b]) => <div key={a} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs text-slate-400">{a}</p><p className="mt-1 font-display text-xl font-bold">{b}</p></div>)}</div>
      </div></div></section>

      <section className="border-y bg-brand-50 py-16 dark:border-slate-800 dark:bg-brand-900/10"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">{[[Truck,"Fast by design","Neighbourhood distance means fresher goods, faster."],[ShieldCheck,"Trusted local stores","Verified retailers and transparent customer ratings."],[Sparkles,"Always the smart price","Our engine checks every combination for your basket."]].map(([Icon,title,copy]) => <div key={title as string} className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-sm dark:bg-slate-900">{createElement(Icon as typeof Truck,{size:20})}</span><div><h3 className="font-bold">{title as string}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{copy as string}</p></div></div>)}</div></section>
    </>
  );
}
