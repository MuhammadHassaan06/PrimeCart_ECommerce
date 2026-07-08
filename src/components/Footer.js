"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Mail, Phone, MapPin, ChevronUp, ShieldCheck 
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  // Monitor scroll height to show/hide floating back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full mt-20 flex flex-col items-center relative z-0">
      
      {/* 1. Newsletter Subscribe Section (With half-white and half-slate-900 background) */}
      <div className="relative w-full">
        {/* Top half background is white, bottom half is dark slate */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white -z-10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-slate-900 -z-10" />
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 z-10">
          <div className="w-full bg-brand-green py-12 px-6 sm:px-12 text-white text-center rounded-3xl flex flex-col items-center justify-center shadow-xl border border-brand-green/20">
            <div className="max-w-4xl mx-auto w-full flex flex-col items-center gap-4">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight" id="newsletter-title">
                Join the PrimeCart Hub Family
              </h3>
              <p className="text-gray-150 text-sm sm:text-base max-w-lg mx-auto mb-4 leading-relaxed">
                Subscribe now to receive exclusive discounts, members-only deals, and first-access updates.
              </p>

              <AnimatePresence mode="wait">
                {!subscribed ? (
                  <motion.form
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
                    id="newsletter-form"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white text-gray-900 border-0 rounded-xl px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-brand-orange focus:outline-none placeholder-gray-400"
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      id="newsletter-submit-btn"
                      className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white px-6 py-3 rounded-xl text-sm sm:text-base font-bold shadow transition-colors shrink-0 cursor-pointer"
                    >
                      Subscribe
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 bg-white/10 px-6 py-3.5 rounded-xl border border-white/20 text-sm sm:text-base font-bold"
                    id="newsletter-success-alert"
                  >
                    <ShieldCheck className="h-5.5 w-5.5 text-brand-orange shrink-0" />
                    Thank you for subscribing! Check your inbox for custom deals.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content (Dark Slate Background) */}
      <div className="w-full bg-slate-900 pb-16 pt-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green text-white">
                <ShoppingBag className="h-4.5 w-4.5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                PrimeCart <span className="text-brand-orange">Hub</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Your premium marketplace for skincare, smart electronics, clothing, and lifestyle items. Dedicated to fast delivery and smooth checkout experiences.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-brand-orange/10 text-slate-400 hover:text-brand-orange transition-colors" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-brand-orange/10 text-slate-400 hover:text-brand-orange transition-colors" aria-label="Instagram">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.22 2.428.47a4.902 4.902 0 011.753 1.143 4.902 4.902 0 011.143 1.753c.25.637.42 1.363.47 2.428.047 1.066.058 1.405.058 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.22 1.79-.47 2.428a4.902 4.902 0 01-1.143 1.753 4.902 4.902 0 01-1.753 1.143c-.638.25-1.363.42-2.428.47-1.066.047-1.405.058-4.122.058-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.22-2.428-.47a4.902 4.902 0 01-1.753-1.143 4.902 4.902 0 01-1.143-1.753c-.25-.637-.42-1.363-.47-2.428C2.01 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.22-1.79.47-2.428a4.902 4.902 0 011.143-1.753 4.902 4.902 0 011.753-1.143c.637-.25 1.363-.42 2.428-.47C8.944 2.01 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5-1.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-brand-orange/10 text-slate-400 hover:text-brand-orange transition-colors" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-brand-orange/10 text-slate-400 hover:text-brand-orange transition-colors" aria-label="Youtube">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">My Cart</Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white transition-colors">My Favorites</Link>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#shipping" className="hover:text-white transition-colors">Shipping Rates</a>
              </li>
              <li>
                <a href="#returns" className="hover:text-white transition-colors">Returns & Refunds</a>
              </li>
              <li>
                <a href="#size-guide" className="hover:text-white transition-colors">Size Guide</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div>
            <h4 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5 text-slate-300">
                <Mail className="h-4 w-4 text-brand-green mt-0.5 shrink-0" />
                <span className="break-all">support@primecarthub.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-300">
                <Phone className="h-4 w-4 text-brand-green mt-0.5 shrink-0" />
                <span>+92 300 1111000</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="h-4 w-4 text-brand-green mt-0.5 shrink-0" />
                <span>Islamabad, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar (Dark Mode Style) */}
      <div className="w-full border-t border-slate-800 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} PrimeCart Hub E-Commerce. All rights reserved.
          </p>
          
          {/* Payment Icons */}
          <div className="flex items-center gap-3">
            {/* Visa */}
            <div className="h-7 w-11 bg-white rounded flex items-center justify-center px-1 shadow-sm shrink-0 border border-slate-700" title="Visa">
              <svg className="h-4 w-9 text-[#1A1F71]" viewBox="0 0 24 15" fill="currentColor">
                <path d="M9.13 14.65l1.66-9.92H13.4l-1.66 9.92H9.13zm8.93-9.58c-.4-.17-.92-.26-1.54-.26-1.7 0-2.9 1.05-2.9 2.58 0 1.1.84 1.7 1.5 2.07.68.37.91.63.91.97 0 .52-.55.77-1.07.77-1.1 0-1.7-.35-2.2-.64l-.3-.15-.32 2.25c.53.28 1.52.52 2.54.52 2.45 0 4.05-1.4 4.05-3.56 0-1.2-.6-2.1-1.93-2.83-.8-.46-1.3-.77-1.3-1.24 0-.42.4-.87 1.3-.87.75 0 1.3.17 1.74.37l.2.1.33-2.3zm2.5 7.15l.93-2.96.53 2.96H20.56zm2.76-7.49h-2.12c-.65 0-1.14.22-1.43.98l-5.02 12.01h2.75l.55-1.71h3.35l.3 1.71h2.42l-2.8-13zm-17.5 0L3.13 13.9c-.3.8-.9 1.15-1.6 1.15H0L.05 14.8c1.3-.37 2.44-1.27 3.2-2.45l2.25-7.7h2.8l-4.17 9.92 2.76-9.92h2.24z" />
              </svg>
            </div>
            {/* Mastercard */}
            <div className="h-7 w-11 bg-slate-900 rounded flex items-center justify-center px-1 shadow-sm shrink-0 border border-slate-800" title="MasterCard">
              <svg className="h-5 w-8" viewBox="0 0 24 15" fill="none">
                <circle cx="8" cy="7.5" r="6" fill="#EB001B" />
                <circle cx="16" cy="7.5" r="6" fill="#F79E1B" fillOpacity="0.8" />
              </svg>
            </div>
            {/* PayPal */}
            <div className="h-7 w-11 bg-white rounded flex items-center justify-center px-1 shadow-sm shrink-0 border border-slate-700" title="PayPal">
              <svg className="h-4.5 w-9" viewBox="0 0 24 15" fill="currentColor">
                <path d="M19.16 3.75a4.23 4.23 0 00-3.66-1.85h-6.2c-.37 0-.7.25-.78.61l-2.07 9.68a.4.4 0 00.39.48h2.93l.63-2.93a.8.8 0 01.78-.63h1.83c2.47 0 4.14-1.22 4.67-3.67.24-1.12.1-2.06-.52-2.72z" fill="#003087" />
                <path d="M16.8 5.75c-.33 1.54-1.47 2.45-3.16 2.45h-1.83a.4.4 0 00-.39.32l-.63 2.93-.5 2.34a.4.4 0 00.39.48H13.6c.38 0 .7-.25.78-.61l.53-2.5.54-2.5a.8.8 0 01.78-.61h.43c2.2 0 3.76-1.1 4.2-3.13.16-.76.08-1.42-.32-1.92a3.83 3.83 0 00-1.81-1.07l-.93 4.41z" fill="#0079C1" />
              </svg>
            </div>
            {/* American Express */}
            <div className="h-7 w-11 bg-[#0070CD] rounded flex items-center justify-center shadow-sm shrink-0 border border-[#0060B5]" title="American Express">
              <span className="text-[7.5px] font-black text-white tracking-tighter">AMEX</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Floating Back-to-Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            id="scroll-to-top-floating-btn"
            className="fixed bottom-24 right-6 z-50 p-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white shadow-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
