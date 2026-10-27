import React from "react";
import { Link } from "react-router-dom";

export default function ItemCard({ item, isFavourite, onToggleFavourite, onAddToCart }) {
  return (
    <article className="item-card">
      <div className="card-image-wrap">
        <Link to={`/item/${item.id}`} aria-label={`View ${item.name} details`}>
          <img className="card-image" src={item.image} alt={item.name} loading="lazy" />
        </Link>
        <button
          type="button"
          className={`favourite-button ${isFavourite ? "is-favourite" : ""}`}
          onClick={() => onToggleFavourite(item.id)}
          aria-label={isFavourite ? `Remove ${item.name} from favourites` : `Add ${item.name} to favourites`}
          aria-pressed={isFavourite}
        >
          {isFavourite ? "♥" : "♡"}
        </button>
        <span className="category-tag">{item.category}</span>
      </div>
      <div className="item-card-body">
        <div className="item-title-row">
          <h3><Link to={`/item/${item.id}`}>{item.name}</Link></h3>
          <span className="price">Rs. {item.price}</span>
        </div>
        <p className="item-description">{item.description}</p>
        <div className="card-actions">
          <Link className="text-link" to={`/item/${item.id}`}>View details</Link>
          <button type="button" className="button button-primary button-small" onClick={() => onAddToCart(item)}>Add to cart +</button>
        </div>
      </div>
    </article>
  );
}
