import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(item) {
    setCartItems((currentItems) => {
      const existing = currentItems.find((cartItem) => cartItem.id === item.id);

      if (existing) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  function removeFromCart(id) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const itemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    itemCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
