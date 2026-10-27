import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadItem() {
      try {
        setLoading(true);
        const response = await fetch("/menu.json");
        if (!response.ok) throw new Error("Menu unavailable");
        const items = await response.json();
        const foundItem = items.find((menuItem) => menuItem.id === Number(id));
        if (!foundItem) throw new Error("Item not found");
        setItem(foundItem);
        setError("");
      } catch {
        setError("This menu item could not be found. Please return to the menu.");
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [id]);

  if (loading) return <main className="page-container"><div className="status-message"><span className="spinner" /> Loading item details...</div></main>;
  if (error) return <main className="page-container"><div className="error-message">{error} <Link className="text-link" to="/">Back to menu</Link></div></main>;

  return (
    <main className="page-container details-page">
      <Link to="/" className="back-link">← Back to menu</Link>
      <div className="details-layout">
        <div className="details-image-wrap"><img src={item.image} alt={item.name} className="details-image" /></div>
        <section className="details-content">
          <span className="category-tag details-tag">{item.category}</span>
          <p className="eyebrow">FROM TODAY'S MENU</p>
          <h1>{item.name}</h1>
          <p className="details-description">{item.description}</p>
          <div className="details-price">Rs. {item.price}</div>
          <p className="availability"><span className="availability-dot" /> Available today</p>
          <button className="button button-primary details-add" onClick={() => addToCart(item)}>Add to cart +</button>
          <p className="details-note">Your cart updates instantly, wherever you are in the app.</p>
        </section>
      </div>
    </main>
  );
}
