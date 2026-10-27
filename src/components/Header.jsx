import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Campus Canteen home">
          <span className="brand-mark">CC</span>
          <span>Campus <strong>Canteen</strong></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Menu</NavLink>
          <NavLink to="/cart" className="cart-link">
            Cart <span className="cart-badge" aria-label={`${itemCount} items in cart`}>{itemCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
