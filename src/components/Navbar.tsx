import React from 'react';
import { Search, Heart, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenFilter: () => void;
  activeFilterCount: number;
  onOpenWishlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenFilter,
  activeFilterCount,
  onOpenWishlist,
}) => {
  const { totalItems, wishlist, setIsCartOpen } = useCart();

  return (
    <header className="site-header">
      <div className="header-brand">
        <div className="brand-logo">CS</div>
        <div className="brand-text">
          <span className="brand-title">Campus Store</span>
          <small className="brand-sub">Modern Fashion & Essentials</small>
        </div>
      </div>

      <div className="header-search">
        <div className="search-box">
          <Search className="search-icon" size={19} />
          <input
            type="search"
            placeholder="Search streetwear, sneakers, watches, bags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          className={`filter-btn ${activeFilterCount > 0 ? 'has-active-filters' : ''}`}
          title="Filtrar y Ordenar Productos"
          onClick={onOpenFilter}
          aria-label="Filtrar y ordenar"
        >
          <SlidersHorizontal size={18} />
          {activeFilterCount > 0 && (
            <span className="filter-count-badge">{activeFilterCount}</span>
          )}
        </button>
      </div>

      <div className="header-actions">
        {/* Wishlist Button */}
        <button
          type="button"
          className="action-icon-btn"
          onClick={onOpenWishlist}
          title="Wishlist"
          aria-label="Wishlist"
        >
          <Heart size={20} className={wishlist.length > 0 ? 'heart-has-items' : ''} />
          {wishlist.length > 0 && <span className="action-badge">{wishlist.length}</span>}
        </button>

        {/* Cart Drawer Trigger */}
        <button
          type="button"
          className="action-icon-btn cart-btn"
          onClick={() => setIsCartOpen(true)}
          title="Shopping Cart"
          aria-label="Shopping Cart"
        >
          <ShoppingBag size={20} />
          {totalItems > 0 && <span className="action-badge cart-badge">{totalItems}</span>}
        </button>

        {/* Profile Avatar */}
        <div className="user-avatar" title="Guillermo Paúl">
          <img src="./storage/img/myphoto.png" alt="Guillermo Paúl" />
        </div>
      </div>
    </header>
  );
};
