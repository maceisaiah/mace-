"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCart } from "./CartContext";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { state } = useCart();
  const count = state.items.reduce((n, i) => n + i.quantity, 0);

  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={`text-sm md:text-base hover:text-white/90 transition-colors ${
        pathname === href ? "text-white" : "text-white/70"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="fixed z-50 top-0 inset-x-0 h-14 backdrop-blur-md bg-black/40 border-b border-white/10 flex items-center px-4 md:px-8">
      <div className="flex-1 flex gap-4 items-center">
        <Link href="/" className="text-white font-semibold tracking-wide">NOIR</Link>
        <div className="hidden md:flex gap-6">{link("/products", "Products")}{link("/about", "About")}{link("/contact", "Contact")}</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-md hover:bg-white/5 border border-white/10"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <Link href="/cart" className="relative p-2 rounded-md hover:bg-white/5 border border-white/10">
          <ShoppingCart size={18} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] leading-none px-1.5 py-1 rounded-full">
              {count}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}


