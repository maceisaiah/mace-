"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Moon, Sun, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { useCart } from "./CartContext";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { state } = useCart();
  const count = state.items.reduce((n, i) => n + i.quantity, 0);
  
  // Get wishlist count
  const [wishlistCount, setWishlistCount] = React.useState(0);
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('kryptic-wishlist') || '[]');
      setWishlistCount(wishlist.length);
      
      // Listen for wishlist changes
      const handleStorageChange = () => {
        const wishlist = JSON.parse(localStorage.getItem('kryptic-wishlist') || '[]');
        setWishlistCount(wishlist.length);
      };
      
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  // Mobile menu handlers (placeholder functions)
  const handleSearchClick = () => {
    // This would be implemented by the parent component
    console.log('Search clicked');
  };

  const handleDiscountClick = () => {
    // This would be implemented by the parent component
    console.log('Discount wheel clicked');
  };

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
    <nav className="fixed z-50 top-0 inset-x-0 h-16 backdrop-blur-xl bg-black/40 border-b-2 border-red-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center">
        <div className="flex-1 flex gap-6 items-center">
          <Link href="/" className="text-white font-bold tracking-wider text-xl gothic-text gothic-pulse">
            KRYPTIC
          </Link>
          <div className="hidden md:flex gap-8">{link("/products", "Products")}{link("/about", "About")}{link("/contact", "Contact")}</div>
        </div>
        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hidden md:block p-3 rounded-xl hover:bg-red-900/20 border-2 border-red-500/20 backdrop-blur-sm transition-all duration-300 hover:border-red-400/40 hover:shadow-lg hover:shadow-red-500/20 gothic-border"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link href="/wishlist" className="hidden md:block relative p-3 rounded-xl hover:bg-red-900/20 border-2 border-red-500/20 backdrop-blur-sm transition-all duration-300 hover:border-red-400/40 hover:shadow-lg hover:shadow-red-500/20 gothic-border">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-bold leading-none px-2 py-1 rounded-full shadow-lg animate-pulse gothic-glow">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="hidden md:block relative p-3 rounded-xl hover:bg-red-900/20 border-2 border-red-500/20 backdrop-blur-sm transition-all duration-300 hover:border-red-400/40 hover:shadow-lg hover:shadow-red-500/20 gothic-border">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-bold leading-none px-2 py-1 rounded-full shadow-lg animate-pulse gothic-glow">
                {count}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu */}
          <MobileMenu 
            cartItemCount={count}
            wishlistCount={wishlistCount}
            onSearchClick={handleSearchClick}
            onDiscountClick={handleDiscountClick}
          />
        </div>
      </div>
    </nav>
  );
}


