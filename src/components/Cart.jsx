import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR ORDER</p>
          <h1>Your cart</h1>
          <p className="page-subtitle">Review your items before placing your order.</p>
        </div>
        {cartItems.length > 0 && <button className="button button-quiet" onClick={clearCart}>Clear cart</button>}
      </div>

      {cartItems.length === 0 ? (
        <section className="empty-state cart-empty">
          <span className="empty-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Find something tasty on today's menu.</p>
          <Link className="button button-primary" to="/">Browse menu</Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your cart">
            {cartItems.map((item) => (
              <article className="cart-row" key={item.id}>
                <img src={item.image} alt="" className="cart-thumb" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Rs. {item.price} each</p>
                  <button className="remove-link" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
                <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                  <button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <strong className="line-total">Rs. {item.price * item.quantity}</strong>
              </article>
            ))}
          </section>
          <aside className="order-summary">
            <h2>Order summary</h2>
            <div className="summary-line"><span>Items</span><span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
            <div className="summary-line"><span>Subtotal</span><span>Rs. {cartTotal}</span></div>
            <div className="summary-line"><span>Campus pickup</span><span>Free</span></div>
            <div className="summary-total"><span>Total</span><strong>Rs. {cartTotal}</strong></div>
            <button className="button button-primary checkout-button" onClick={() => window.alert("Demo only: your order has been prepared. No payment was taken.")}>Place demo order</button>
            <p className="summary-note">This is a student demo. No real payment is processed.</p>
          </aside>
        </div>
      )}
    </main>
  );
}
