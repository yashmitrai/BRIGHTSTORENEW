import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return <><Nav /><main>{children}</main><Footer /></>;
}
