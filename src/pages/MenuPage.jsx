import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import MenuList from "../components/MenuList";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favourites, setFavourites] = useState([]);
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadMenu() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/menu.json");
        if (!response.ok) {
          throw new Error("The menu file could not be loaded.");
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError("We couldn't load today's menu. Check that public/menu.json exists, then refresh the page.");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(menuItems.map((item) => item.category))],
    [menuItems]
  );

  const filteredItems = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search);
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesFavourite = !showFavouritesOnly || favourites.includes(item.id);
      return matchesSearch && matchesCategory && matchesFavourite;
    });
  }, [menuItems, searchTerm, selectedCategory, showFavouritesOnly, favourites]);

  function toggleFavourite(id) {
    setFavourites((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">GOOD FOOD. GOOD STUDY DAYS.</p>
          <h1>Your campus break,<br /><span>made delicious.</span></h1>
          <p>Fresh favourites and quick bites, ready for your next study break.</p>
          <a className="button button-light" href="#today-menu">Explore today's menu <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-decoration" aria-hidden="true">
          <div className="hero-circle"><span>Fresh<br />& tasty</span></div>
          <span className="hero-spark spark-one">✳</span><span className="hero-spark spark-two">✦</span>
        </div>
      </section>

      <section className="page-container menu-section" id="today-menu">
        <div className="page-heading">
          <div>
            <p className="eyebrow">MADE FOR YOUR DAY</p>
            <h2>Today's menu</h2>
            <p className="page-subtitle">Pick your favourites and build your order.</p>
          </div>
          <div className="menu-count">{menuItems.length} menu items</div>
        </div>

        <div className="menu-tools">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">Search menu</span>
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search food or drinks..." />
            {searchTerm && <button type="button" aria-label="Clear search" onClick={() => setSearchTerm("")}>×</button>}
          </label>
          <div className="category-filters" aria-label="Filter by category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-chip ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
              >{category}</button>
            ))}
          </div>
          <div className="extra-filters">
            <button type="button" className={`filter-chip favourite-filter ${showFavouritesOnly ? "active" : ""}`} onClick={() => setShowFavouritesOnly((value) => !value)} aria-pressed={showFavouritesOnly}>
              {showFavouritesOnly ? "♥ Showing favourites" : "♡ Show favourites"}
            </button>
            <span className="filter-hint">Save items with the heart, then view them here.</span>
          </div>
        </div>

        {loading && <div className="status-message"><span className="spinner" /> Loading today's menu...</div>}
        {!loading && error && <div className="error-message" role="alert">{error} <button className="text-link" onClick={() => window.location.reload()}>Try again</button></div>}
        {!loading && !error && (
          <MenuList
            items={filteredItems}
            favourites={favourites}
            onToggleFavourite={toggleFavourite}
            onAddToCart={addToCart}
          />
        )}
      </section>
    </main>
  );
}
