"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function FavoritesPage() {
  const { favorites, isLoaded } = useCart();

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center" id="favorites-loading">
        <p className="text-gray-500 font-semibold animate-pulse">Loading your favorites...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center" id="empty-favorites-state">
        <div className="rounded-full bg-red-50 p-6 text-red-500 mb-6">
          <Heart className="h-12 w-12 stroke-1.5" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h1>
        <p className="text-gray-500 text-sm mb-8">
          Save items you love to your wishlist so you can find them easily later.
        </p>
        <Link href="/" id="empty-favorites-continue-btn">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-sm cursor-pointer"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            Discover Products
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="favorites-page-container">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-orange mb-8 group" id="fav-back-link">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Shop
      </Link>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            My Wishlist
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            You have saved {favorites.length} {favorites.length === 1 ? "product" : "products"} to your favorites.
          </p>
        </div>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" id="favorites-grid">
        <AnimatePresence>
          {favorites.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
