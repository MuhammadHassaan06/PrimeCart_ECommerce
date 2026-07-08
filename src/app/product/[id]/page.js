"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Minus, ShoppingCart, Check, Star, ImageOff, Loader2, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const { addToCart, toggleFavorite, isFavorite } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const found = data.find((item) => item.id === id);
        if (found) {
          setProduct(found);
        } else {
          setProduct(null); // Explicit not found state
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    
    // Toggle added animation state
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  // Loading spinner view
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center" id="detail-loader">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="text-brand-orange mb-4"
        >
          <Loader2 className="h-10 w-10 animate-spin" />
        </motion.div>
        <p className="text-gray-500 font-medium text-sm">Fetching product details...</p>
      </div>
    );
  }

  // Error fetching view
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center" id="detail-error">
        <div className="rounded-full bg-red-100 p-3 text-red-600 mb-4">
          <ImageOff className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Product</h2>
        <p className="text-gray-600 text-sm mb-6">{error}</p>
        <Link href="/" id="error-back-home-btn">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </motion.button>
        </Link>
      </div>
    );
  }

  // Product not found view (invalid ID)
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center" id="detail-not-found">
        <div className="rounded-full bg-orange-100 p-3 text-brand-orange mb-4">
          <ImageOff className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 text-sm mb-6">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link href="/" id="not-found-back-home-btn">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Shop
          </motion.button>
        </Link>
      </div>
    );
  }

  const priceFormatted = (product.priceCents / 100).toFixed(2);
  const favorited = isFavorite(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id={`product-detail-container-${product.id}`}>
      {/* Breadcrumb / Back button */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-orange mb-8 group" id="detail-back-link">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Product Image Panel */}
        <div className="relative aspect-square w-full rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-6">
          {imageError ? (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <ImageOff className="h-16 w-16 mb-2 stroke-1" />
              <span className="font-semibold text-sm">Image unavailable</span>
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              onError={() => setImageError(true)}
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>

        {/* Product Detail Info Panel */}
        <div className="flex flex-col justify-start">
          <span className="text-xs font-bold text-brand-orange tracking-wider uppercase mb-1">
            {product.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1.5 mb-6">
              <div className="flex items-center text-amber-500">
                <Star className="h-5 w-5 fill-current stroke-1" />
              </div>
              <span className="text-sm font-bold text-gray-700">
                {product.rating.stars}
              </span>
              <span className="text-sm text-gray-400">
                ({product.rating.count} customer reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
            <span className="text-xs text-gray-400 font-semibold block mb-0.5">Price</span>
            <span className="text-3xl font-black text-gray-900">${priceFormatted}</span>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Product Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description || "No description available for this product."}
            </p>
          </div>

          {/* Action Area (Quantity + Add to Cart + Wishlist) */}
          <div className="border-t border-gray-100 pt-6 mt-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              
              {/* Quantity Selector */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-gray-500 uppercase">Quantity</span>
                <div className="flex items-center rounded-lg border border-gray-200 w-fit bg-white">
                  <button
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    id="quantity-decrease-btn"
                    className="p-2.5 text-gray-600 hover:text-brand-orange disabled:text-gray-300 disabled:hover:text-gray-300 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span id="quantity-display-value" className="px-4 text-sm font-bold text-gray-800 w-10 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    id="quantity-increase-btn"
                    className="p-2.5 text-gray-600 hover:text-brand-orange cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add To Cart & Wishlist Buttons Container */}
              <div className="flex-1 flex flex-col gap-1.5 justify-end">
                <span className="hidden sm:block text-xs font-bold text-transparent select-none">Action</span>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddToCart}
                    id="add-to-cart-action-btn"
                    className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 px-6 text-sm font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all cursor-pointer ${
                      isAdded
                        ? "bg-brand-green hover:bg-brand-green-hover focus:ring-brand-green"
                        : "bg-brand-orange hover:bg-brand-orange-hover focus:ring-brand-orange"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-5 w-5 animate-pulse" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </motion.button>

                  {/* Toggle Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleFavorite(product)}
                    id="detail-favorite-toggle-btn"
                    className={`p-3 rounded-lg border flex items-center justify-center cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      favorited
                        ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-500"
                        : "border-gray-200 bg-white text-gray-400 hover:text-red-500 hover:border-gray-300 focus:ring-brand-orange"
                    }`}
                    aria-label={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <Heart className={`h-5 w-5 ${favorited ? "fill-red-500 text-red-500" : ""}`} />
                  </motion.button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
