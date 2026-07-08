"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, Sparkles, ShieldCheck, CreditCard } from "lucide-react";

export default function AnnouncementBar() {
  const items = [
    { text: "Free Shipping on Orders Over $50", icon: <Truck className="h-3.5 w-3.5" /> },
    { text: "Premium Quality Guaranteed", icon: <Sparkles className="h-3.5 w-3.5" /> },
    { text: "Secure Packaging & Delivery", icon: <ShieldCheck className="h-3.5 w-3.5" /> },
    { text: "100% Safe Checkout Guarantee", icon: <CreditCard className="h-3.5 w-3.5" /> },
  ];

  // Repeat the items list to ensure there is enough horizontal content for smooth scrolling
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-slate-950 text-white h-9 flex items-center overflow-hidden border-b border-slate-800 relative z-50 select-none">
      <div className="flex whitespace-nowrap w-max">
        {/* Track 1 */}
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          className="flex flex-row items-center gap-12 pr-12 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200"
        >
          {repeatedItems.map((item, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-2">
              <span className="text-brand-orange">{item.icon}</span>
              <span>{item.text}</span>
              <span className="text-brand-green font-black">•</span>
            </div>
          ))}
        </motion.div>

        {/* Track 2 (Identical Copy for seamless loop transition) */}
        <motion.div
          aria-hidden="true"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          className="flex flex-row items-center gap-12 pr-12 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200"
        >
          {repeatedItems.map((item, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-2">
              <span className="text-brand-orange">{item.icon}</span>
              <span>{item.text}</span>
              <span className="text-brand-green font-black">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
