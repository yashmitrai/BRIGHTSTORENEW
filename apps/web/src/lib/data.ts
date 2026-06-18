export const categories = [
  { name: "Fresh produce", icon: "🥬", color: "bg-emerald-50" },
  { name: "Dairy & eggs", icon: "🥛", color: "bg-sky-50" },
  { name: "Atta, rice & dal", icon: "🌾", color: "bg-amber-50" },
  { name: "Snacks", icon: "🍿", color: "bg-rose-50" },
  { name: "Beverages", icon: "🧃", color: "bg-orange-50" },
  { name: "Home care", icon: "🫧", color: "bg-violet-50" }
];

export const products = [
  { id: "p1", name: "India Gate Basmati Rice", unit: "1 kg", price: 110, mrp: 145, store: "Gupta General Store", emoji: "🍚", rating: 4.8, stock: 40 },
  { id: "p2", name: "Fortune Sunlite Oil", unit: "1 L", price: 160, mrp: 190, store: "Fresh Basket", emoji: "🌻", rating: 4.7, stock: 22 },
  { id: "p3", name: "Tata Sampann Toor Dal", unit: "1 kg", price: 180, mrp: 215, store: "Apna Bazaar", emoji: "🫘", rating: 4.9, stock: 16 },
  { id: "p4", name: "Amul Taaza Milk", unit: "1 L", price: 68, mrp: 70, store: "Fresh Basket", emoji: "🥛", rating: 4.9, stock: 55 },
  { id: "p5", name: "Aashirvaad Shudh Atta", unit: "5 kg", price: 248, mrp: 290, store: "Gupta General Store", emoji: "🌾", rating: 4.8, stock: 31 },
  { id: "p6", name: "Farm Fresh Bananas", unit: "6 pcs", price: 42, mrp: 55, store: "Nature's Cart", emoji: "🍌", rating: 4.6, stock: 12 }
];

export const stores = [
  { name: "Gupta General Store", distance: "0.8 km", eta: "18 min", rating: 4.9, saving: "Up to 18%", icon: "G", color: "from-emerald-400 to-emerald-600" },
  { name: "Fresh Basket", distance: "1.2 km", eta: "22 min", rating: 4.8, saving: "Up to 21%", icon: "F", color: "from-sky-400 to-blue-600" },
  { name: "Apna Bazaar", distance: "1.7 km", eta: "28 min", rating: 4.7, saving: "Up to 15%", icon: "A", color: "from-amber-400 to-orange-500" }
];

export const basketItems = [
  { name: "Basmati Rice", qty: 1, a: 120, b: 110, c: 130, best: "Fresh Basket" },
  { name: "Sunflower Oil", qty: 1, a: 180, b: 200, c: 160, best: "Apna Bazaar" },
  { name: "Toor Dal", qty: 1, a: 90, b: 80, c: 95, best: "Fresh Basket" }
];
