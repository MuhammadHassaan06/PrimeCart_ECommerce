"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
