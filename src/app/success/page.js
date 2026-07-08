"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  
  // Retrieve orderId from query parameter, or generate fallback if not provided
  let orderId = searchParams.get("orderId");
  if (!orderId) {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    orderId = `ORD-${randomId}`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center" id="success-content-container">
      {/* Success Badge */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="rounded-full bg-green-50 p-4 text-brand-green mb-6 border border-green-100"
      >
        <CheckCircle2 className="h-16 w-16 stroke-1.5" />
      </motion.div>

      {/* Confirmation Heading */}
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
        Order Placed Successfully!
      </h1>
      <p className="text-gray-600 text-sm mb-8">
        Thank you for your purchase! Your order has been received and is being processed.
      </p>

      {/* Order Info Panel */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 w-full mb-8 space-y-3">
        <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-3">
          <span className="text-gray-500 font-semibold">Order Number</span>
          <span id="success-order-id" className="font-extrabold text-gray-900 tracking-wider">
            {orderId}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm pt-1">
          <span className="text-gray-500 font-semibold">Delivery Estimate</span>
          <span className="font-bold text-brand-green">3 - 5 Business Days</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Link href="/" id="success-continue-shopping-btn" className="flex-1">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-orange py-3 px-4 text-sm font-bold text-white shadow hover:bg-brand-orange-hover focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 transition-colors cursor-pointer"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            Continue Shopping
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center" id="success-fallback">
          <p className="text-gray-500 font-semibold animate-pulse">Loading order confirmation...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
