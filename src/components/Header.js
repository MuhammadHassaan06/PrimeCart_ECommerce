"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cartCount, triggerBounce, favoriteCount, triggerFavBounce } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group" id="nav-logo-link">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green text-white transition-transform group-hover:scale-105">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            PrimeCart <span className="text-brand-orange">Hub</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            id="nav-home-link"
            className={`text-sm font-medium transition-colors hover:text-brand-orange ${
              pathname === "/" ? "text-brand-orange font-semibold" : "text-gray-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/favorites"
            id="nav-fav-text-link"
            className={`text-sm font-medium transition-colors hover:text-brand-orange ${
              pathname === "/favorites" ? "text-brand-orange font-semibold" : "text-gray-600"
            }`}
          >
            My Favorites
          </Link>
          <Link
            href="/cart"
            id="nav-cart-text-link"
            className={`text-sm font-medium transition-colors hover:text-brand-orange ${
              pathname === "/cart" ? "text-brand-orange font-semibold" : "text-gray-600"
            }`}
          >
            My Cart
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Wishlist Link Icon */}
          <Link
            href="/favorites"
            className="relative p-2 text-gray-700 hover:text-brand-orange transition-colors"
            id="nav-fav-btn"
            aria-label="View Favorites"
          >
            <Heart className="h-6 w-6" />
            
            {/* Bouncing Badge */}
            {favoriteCount > 0 && (
              <motion.span
                id="fav-badge-count"
                key={favoriteCount} // triggers re-render/animation on count change
                variants={{
                  bounce: {
                    scale: [1, 1.4, 0.85, 1.1, 1],
                    transition: { duration: 0.4, ease: "easeInOut" }
                  },
                  idle: { scale: 1 }
                }}
                animate={triggerFavBounce ? "bounce" : "idle"}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-white shadow-sm"
              >
                {favoriteCount}
              </motion.span>
            )}
          </Link>

          {/* Cart Link Icon */}
          <Link
            href="/cart"
            className="relative p-2 text-gray-700 hover:text-brand-orange transition-colors"
            id="nav-cart-btn"
            aria-label="View Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            
            {/* Bouncing Badge */}
            {cartCount > 0 && (
              <motion.span
                id="cart-badge-count"
                key={cartCount} // triggers re-render/animation on count change
                variants={{
                  bounce: {
                    scale: [1, 1.4, 0.85, 1.1, 1],
                    transition: { duration: 0.4, ease: "easeInOut" }
                  },
                  idle: { scale: 1 }
                }}
                animate={triggerBounce ? "bounce" : "idle"}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white shadow-sm"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
