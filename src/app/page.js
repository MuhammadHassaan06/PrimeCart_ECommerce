"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, Search, SlidersHorizontal, AlertCircle, ArrowRight, ChevronDown, Star } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchProducts = async () => {
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
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get list of unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  // Filter products based on search and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col w-full">
      
      {/* Redesigned Premium Hero Section - Full Screen Width, Zero Margins, Zero Rounded Corners */}
      <section className="relative w-full h-[calc(100vh-100px)] overflow-hidden flex items-center justify-center text-center bg-gray-900 shadow-md">
        {/* Background Image with Dark/Green Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
            alt="Storefront Background"
            className="w-full h-full object-cover opacity-35"
          />
          {/* Subtle green/dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-brand-green/20" />
        </div>

        {/* Content Panel */}
        <div className="relative z-10 max-w-3xl px-6 sm:px-12 flex flex-col items-center">
          {/* Pill Badge */}
          <div className="inline-block bg-white/10 text-white border border-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-bold rounded-full tracking-wider uppercase mb-6 animate-pulse">
            TRENDING DEALS 2026
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Everything You Need,<br />
            <span className="text-brand-orange">All in One Place</span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 font-medium leading-relaxed">
            Shop skincare, electronics, apparel, and more — fast checkout, simple experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                document.getElementById("products-listing-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 rounded-xl bg-brand-green hover:bg-brand-green-hover text-white px-6 py-3.5 text-sm font-bold shadow-lg transition-colors cursor-pointer"
            >
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                document.getElementById("products-listing-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-white/50 hover:border-white hover:bg-white/10 text-white px-6 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer"
            >
              Explore
            </motion.button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => {
            document.getElementById("products-listing-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to products"
        >
          <span className="text-[10px] tracking-widest font-black uppercase">SCROLL</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </section>

      {/* Main Container for Page Content (Restricted max-width with padding) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-16 w-full">
        {/* Products Listing Section */}
        <div id="products-listing-section" className="scroll-mt-20 flex flex-col gap-6">
          {/* Filters & Search section */}
          <section className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                id="product-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by name..."
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange focus:outline-none placeholder-gray-400 bg-white"
              />
            </div>

            {/* Categories */}
            <div className="flex w-full md:w-auto items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-gray-500 text-xs font-semibold uppercase flex items-center gap-1.5 shrink-0">
                <SlidersHorizontal className="h-4 w-4 text-gray-400" />
                Filter:
              </span>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    id={`category-btn-${category.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === category
                        ? "bg-brand-green text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Main Content Area */}
          {loading ? (
            <SkeletonLoader />
          ) : error ? (
            <div
              id="fetch-error-container"
              className="flex flex-col items-center justify-center py-16 px-4 text-center border border-red-100 rounded-2xl bg-red-50/20 max-w-lg mx-auto w-full"
            >
              <div className="rounded-full bg-red-100 p-3 text-red-600 mb-4 animate-bounce">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Failed to load products</h2>
              <p className="text-sm text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchProducts}
                id="retry-fetch-btn"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-brand-orange-hover focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 transition-all cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 border border-gray-100 rounded-2xl">
              <p className="text-gray-500 font-medium">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-xs font-bold text-brand-orange hover:underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              id="product-grid"
              className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* From Our Community Section */}
        <section className="py-12 border-t border-gray-100" id="testimonials-section">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-orange tracking-widest uppercase bg-orange-50 px-3 py-1 rounded-full">
              COMMUNITY
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-3 mb-2">
              From Our Community
            </h2>
            <p className="text-gray-500 text-sm">
              Real words from real shoppers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-0.5 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic mb-6 leading-relaxed">
                  "I'm amazed by the shipping speed and the quality of the moisturizers! Highly recommended. Flawless experience overall."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Sarah Jenkins"
                  className="h-10 w-10 rounded-full object-cover border border-gray-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Sarah Jenkins</h4>
                  <span className="text-xs text-brand-green font-semibold">Verified Buyer</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-0.5 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic mb-6 leading-relaxed">
                  "Perfect customer support and great selection of electronics. A flawless check-out flow. Will definitely buy again."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="David K."
                  className="h-10 w-10 rounded-full object-cover border border-gray-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">David K.</h4>
                  <span className="text-xs text-brand-green font-semibold">Verified Buyer</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-0.5 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic mb-6 leading-relaxed">
                  "The denim jacket and sneakers look super premium and fit perfectly. True to sizing guides. PrimeCart Hub is now my go-to."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Emily Robinson"
                  className="h-10 w-10 rounded-full object-cover border border-gray-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Emily Robinson</h4>
                  <span className="text-xs text-brand-green font-semibold">Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
