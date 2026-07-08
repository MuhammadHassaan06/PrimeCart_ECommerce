"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [triggerBounce, setTriggerBounce] = useState(false);
  const [triggerFavBounce, setTriggerFavBounce] = useState(false);

  // Load cart and favorites from localStorage once on client-side mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Failed to load cart/favorites from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  // Sync cart and favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to localStorage", error);
      }
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
      }
    }
  }, [favorites, isLoaded]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity,
        };
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    // Trigger cart bounce animation
    setTriggerBounce(true);
    setTimeout(() => setTriggerBounce(false), 300);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear all cart items
  const clearCart = () => {
    setCart([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  };

  // Toggle favorite status of a product
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        setTriggerFavBounce(true);
        setTimeout(() => setTriggerFavBounce(false), 300);
        return [...prev, product];
      }
    });
  };

  // Check if an item is favorited
  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  // Calculate cart counts and totals
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotalCents = cart.reduce((total, item) => total + (item.priceCents * item.quantity), 0);
  const cartTotal = (cartTotalCents / 100).toFixed(2);

  // Favorite count
  const favoriteCount = favorites.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        triggerBounce,
        toggleFavorite,
        isFavorite,
        favoriteCount,
        triggerFavBounce,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
