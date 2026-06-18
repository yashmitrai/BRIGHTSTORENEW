import { Heart } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export default function WishlistPage() {
  return <div className="mx-auto min-h-[70vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-rose-50 text-rose-500"><Heart size={20} className="fill-rose-500"/></span><div><h1 className="font-display text-4xl font-extrabold">Your wishlist</h1><p className="mt-1 text-sm text-slate-500">4 products saved for later</p></div></div><div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">{products.slice(0,4).map((p)=><ProductCard key={p.id} product={p}/>)}</div></div>;
}
