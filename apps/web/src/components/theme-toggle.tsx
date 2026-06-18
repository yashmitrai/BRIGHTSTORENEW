"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  function toggle() {
    document.documentElement.classList.toggle("dark");
    setDark((value) => !value);
  }
  return <Button variant="ghost" className="size-10 px-0" onClick={toggle} aria-label="Toggle dark mode">{dark ? <Sun size={18} /> : <Moon size={18} />}</Button>;
}
