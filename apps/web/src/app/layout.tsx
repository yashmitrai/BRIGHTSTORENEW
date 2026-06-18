import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BRIGHTSTORE — Shop Smart. Support Local.",
  description: "Compare nearby stores, optimize your basket, and support local retailers."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className="font-sans antialiased">{children}</body></html>;
}
