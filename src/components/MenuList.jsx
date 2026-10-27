import React from "react";
import ItemCard from "./ItemCard";

export default function MenuList({ items, favourites, onToggleFavourite, onAddToCart }) {
  if (items.length === 0) {
    return <div className="empty-state"><span className="empty-icon">⌕</span><h3>No items found</h3><p>Try another search or category.</p></div>;
  }

  return (
    <div className="menu-grid">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isFavourite={favourites.includes(item.id)}
          onToggleFavourite={onToggleFavourite}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
