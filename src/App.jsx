import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MenuPage from "./pages/MenuPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import Cart from "./components/Cart";

function NotFound() {
  return <main className="page-container empty-state"><h1>Page not found</h1><p>This page does not exist.</p><a className="button button-primary" href="/">Return to menu</a></main>;
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/item/:id" element={<ItemDetailsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="site-footer"><p>Campus Canteen <span>·</span> Made for your study breaks</p><p>Student project demo · Prices in PKR</p></footer>
    </div>
  );
}
