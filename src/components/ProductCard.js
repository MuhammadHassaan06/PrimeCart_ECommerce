"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Eye, ImageOff, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const { toggleFavorite, isFavorite } = useCart();

  // Format price from cents
  const price = (product.priceCents / 100).toFixed(2);
  const favorited = isFavorite(product.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
        {imageError ? (
          <div className="flex flex-col items-center justify-center text-gray-400 p-4">
            <ImageOff className="h-10 w-10 mb-2 stroke-1" />
            <span className="text-xs text-center font-medium">Image unavailable</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
        
        {/* Category Badge (Top Left) */}
        {product.category && (
          <span className="absolute top-2 left-2 rounded-full bg-gray-900/10 px-2.5 py-0.5 text-xs font-semibold text-gray-800 backdrop-blur-sm">
            {product.category}
          </span>
        )}

        {/* Favorite Icon (Top Right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product);
          }}
          id={`favorite-toggle-btn-${product.id}`}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm text-gray-500 hover:text-red-500 transition-colors backdrop-blur-sm cursor-pointer z-10 border border-gray-100"
          aria-label={favorited ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart
            className={`h-4 w-4 transition-transform active:scale-125 ${
              favorited ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="mt-4 flex flex-1 flex-col">
        <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">
          {product.subCategory || "General"}
        </span>
        <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="mt-2 flex items-center gap-1">
            <div className="flex items-center text-amber-500">
              <Star className="h-4.5 w-4.5 fill-current stroke-1" />
            </div>
            <span className="text-xs font-bold text-gray-700">
              {product.rating.stars}
            </span>
            <span className="text-xs text-gray-400">
              ({product.rating.count})
            </span>
          </div>
        )}

        <div className="mt-4 flex items-end justify-between pt-3 border-t border-gray-50">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Price</span>
            <span className="text-lg font-bold text-gray-900">
              ${price}
            </span>
          </div>

          {/* Action button */}
          <Link href={`/product/${product.id}`} id={`product-view-link-${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              id={`product-view-btn-${product.id}`}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-orange px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-orange-hover focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 transition-colors cursor-pointer"
            >
              <Eye className="h-4 w-4" />
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
