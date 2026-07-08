"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Compass, Truck, ShieldCheck, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, isLoaded, cartTotal, clearCart } = useCart();
  const router = useRouter();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit-card",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is loaded and empty, redirect to home page
  useEffect(() => {
    if (isLoaded && cart.length === 0 && !isSubmitting) {
      router.push("/");
    }
  }, [isLoaded, cart, router, isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate payment / order processing
    setTimeout(() => {
      // Generate a random Order ID: ORD-XXXXXX where X is numeric or alphanumeric
      const randomId = Math.floor(100000 + Math.random() * 900000);
      const orderId = `ORD-${randomId}`;

      // Clear the cart
      clearCart();

      // Redirect to success page with order ID
      router.push(`/success?orderId=${orderId}`);
    }, 1500);
  };

  if (!isLoaded || (cart.length === 0 && !isSubmitting)) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center" id="checkout-loading">
        <p className="text-gray-500 font-semibold animate-pulse">Loading checkout details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="checkout-page-container">
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-orange mb-8 group" id="checkout-back-link">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Cart
      </Link>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6" id="checkout-form" noValidate>
          
          {/* Shipping Details */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Shipping & Delivery Information
            </h2>

            {/* Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name-input" className="text-xs font-bold text-gray-600 uppercase">
                Full Name *
              </label>
              <input
                type="text"
                id="name-input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full rounded-lg border py-2.5 px-4 text-sm focus:outline-none focus:ring-1 bg-white ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-brand-orange focus:ring-brand-orange"
                }`}
              />
              {errors.name && (
                <span id="name-error" className="text-xs font-semibold text-red-500 mt-1 flex items-center gap-1">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email-input" className="text-xs font-bold text-gray-600 uppercase">
                Email Address *
              </label>
              <input
                type="email"
                id="email-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className={`w-full rounded-lg border py-2.5 px-4 text-sm focus:outline-none focus:ring-1 bg-white ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-brand-orange focus:ring-brand-orange"
                }`}
              />
              {errors.email && (
                <span id="email-error" className="text-xs font-semibold text-red-500 mt-1 flex items-center gap-1">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1">
              <label htmlFor="address-input" className="text-xs font-bold text-gray-600 uppercase">
                Shipping Address *
              </label>
              <textarea
                id="address-input"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main Street, Apt 4B, New York, NY 10001"
                className={`w-full rounded-lg border py-2.5 px-4 text-sm focus:outline-none focus:ring-1 bg-white ${
                  errors.address
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-brand-orange focus:ring-brand-orange"
                }`}
              />
              {errors.address && (
                <span id="address-error" className="text-xs font-semibold text-red-500 mt-1 flex items-center gap-1">
                  {errors.address}
                </span>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Credit Card */}
              <label
                id="pay-method-cc-label"
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === "credit-card"
                    ? "border-brand-orange bg-orange-50/10"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={formData.paymentMethod === "credit-card"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <CreditCard className={`h-6 w-6 mb-2 ${
                  formData.paymentMethod === "credit-card" ? "text-brand-orange" : "text-gray-400"
                }`} />
                <span className="text-xs font-bold text-gray-800">Credit Card</span>
              </label>

              {/* PayPal */}
              <label
                id="pay-method-paypal-label"
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === "paypal"
                    ? "border-brand-orange bg-orange-50/10"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <Compass className={`h-6 w-6 mb-2 ${
                  formData.paymentMethod === "paypal" ? "text-brand-orange" : "text-gray-400"
                }`} />
                <span className="text-xs font-bold text-gray-800">PayPal</span>
              </label>

              {/* Cash On Delivery */}
              <label
                id="pay-method-cod-label"
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === "cod"
                    ? "border-brand-orange bg-orange-50/10"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <Truck className={`h-6 w-6 mb-2 ${
                  formData.paymentMethod === "cod" ? "text-brand-orange" : "text-gray-400"
                }`} />
                <span className="text-xs font-bold text-gray-800">Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* Place Order CTA */}
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            type="submit"
            disabled={isSubmitting}
            id="place-order-submit-btn"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-green py-4 px-6 text-base font-bold text-white shadow hover:bg-brand-green-hover focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing Order...
              </>
            ) : (
              <>
                <ShieldCheck className="h-5 w-5" />
                Place Order (${cartTotal})
              </>
            )}
          </motion.button>
        </form>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-orange" />
            Order Summary
          </h2>

          <div className="divide-y divide-gray-200 max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => {
              const itemSubtotal = ((item.priceCents * item.quantity) / 100).toFixed(2);
              return (
                <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="font-bold text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 font-medium">
                      Qty: {item.quantity} &times; ${(item.priceCents / 100).toFixed(2)}
                    </p>
                  </div>
                  <span className="font-bold text-gray-900 shrink-0">
                    ${itemSubtotal}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">${cartTotal}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-brand-green">Free</span>
            </div>
            <div className="flex justify-between items-center text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Grand Total</span>
              <span id="checkout-grand-total" className="text-xl font-black text-brand-orange">${cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
