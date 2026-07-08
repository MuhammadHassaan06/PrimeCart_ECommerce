"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight, ImageOff } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, isLoaded, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // If the cart context hasn't loaded state from localStorage yet, show a loader
  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center" id="cart-loading">
        <p className="text-gray-500 font-semibold animate-pulse">Loading your shopping cart...</p>
      </div>
    );
  }

  // Empty cart view
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center" id="empty-cart-state">
        <div className="rounded-full bg-orange-50 p-6 text-brand-orange mb-6">
          <ShoppingCart className="h-12 w-12 stroke-1.5" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
        <p className="text-gray-500 text-sm mb-8">
          Looks like you haven't added anything to your cart yet. Explore our fresh collection to get started.
        </p>
        <Link href="/" id="empty-cart-continue-shopping-btn">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-sm cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="cart-page-container">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden p-6">
          <div className="flow-root">
            <ul className="divide-y divide-gray-100 -my-6">
              <AnimatePresence initial={false}>
                {cart.map((item) => {
                  const itemPrice = (item.priceCents / 100).toFixed(2);
                  const itemSubtotal = ((item.priceCents * item.quantity) / 100).toFixed(2);
                  
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 1, height: "auto" }}
                      exit={{ 
                        opacity: 0, 
                        height: 0, 
                        scale: 0.95, 
                        marginTop: 0,
                        marginBottom: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        overflow: "hidden"
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="flex py-6"
                      id={`cart-item-${item.id}`}
                    >
                      {/* Item Image */}
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                        {imageErrors[item.id] ? (
                          <div className="text-gray-400 p-1">
                            <ImageOff className="h-6 w-6 stroke-1" />
                          </div>
                        ) : (
                          <img
                            src={item.image}
                            alt={item.name}
                            onError={() => handleImageError(item.id)}
                            className="h-full w-full object-contain"
                          />
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 hover:text-brand-orange transition-colors">
                              <Link href={`/product/${item.id}`}>{item.name}</Link>
                            </h3>
                            <p className="mt-1 text-xs text-gray-400">{item.category}</p>
                          </div>
                          
                          {/* Subtotal */}
                          <p className="text-sm font-bold text-gray-900 ml-4">
                            ${itemSubtotal}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between mt-4">
                          {/* Quantity Stepper */}
                          <div className="flex items-center rounded-md border border-gray-200 bg-white">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              id={`cart-item-dec-${item.id}`}
                              className="p-1.5 text-gray-500 hover:text-brand-orange disabled:text-gray-300 disabled:hover:text-gray-300 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span id={`cart-item-qty-${item.id}`} className="px-3 text-xs font-bold text-gray-800 w-8 text-center select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              id={`cart-item-inc-${item.id}`}
                              className="p-1.5 text-gray-500 hover:text-brand-orange cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* Actions (Remove) */}
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              id={`cart-item-remove-${item.id}`}
                              className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1 text-xs cursor-pointer p-1"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        {/* Order Summary & Actions */}
        <div className="lg:col-span-4 bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-4 mb-4">
            Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">${cartTotal}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-200 pb-4">
              <span>Shipping & Taxes</span>
              <span className="font-medium text-brand-green">Free</span>
            </div>
            <div className="flex justify-between items-center text-base font-bold text-gray-900">
              <span>Estimated Total</span>
              <span id="cart-grand-total" className="text-xl font-black text-brand-orange">${cartTotal}</span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <Link href="/checkout" id="proceed-to-checkout-btn">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand-green py-3 px-4 text-sm font-bold text-white shadow-sm hover:bg-brand-green-hover focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 transition-colors cursor-pointer"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </Link>

            <Link href="/" id="cart-continue-shopping-btn" className="block text-center text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors py-2">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
