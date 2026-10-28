import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  products,
  onOpenDetails,
}) => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-header-title">
            <Heart size={22} className="heart-has-items" />
            <h2>Your Saved Items</h2>
            <span className="drawer-badge">{wishlistedProducts.length} items</span>
          </div>
          <button type="button" className="drawer-close-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="drawer-empty-view">
            <div className="empty-cart-icon">🤍</div>
            <h3>Your wishlist is empty</h3>
            <p>Save items you like by tapping the heart icon on any product.</p>
            <button type="button" className="btn-continue-shopping" onClick={onClose}>
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="drawer-items-list">
            {wishlistedProducts.map((product) => (
              <div key={product.id} className="drawer-item">
                <div
                  className="item-thumb cursor-pointer"
                  onClick={() => {
                    onClose();
                    onOpenDetails(product);
                  }}
                >
                  <img
                    src={product.main_photo}
                    alt={product.title}
                    onError={(e) => {
                      const current = e.currentTarget.getAttribute('src') || '';
                      if (current.startsWith('/')) {
                        e.currentTarget.src = '.' + current;
                      }
                    }}
                  />
                </div>
                <div
                  className="item-details cursor-pointer"
                  onClick={() => {
                    onClose();
                    onOpenDetails(product);
                  }}
                >
                  <h4 className="item-title">{product.title}</h4>
                  <span className="item-unit-price">${product.price.toFixed(2)}</span>
                </div>

                <div className="item-controls" style={{ gap: '8px' }}>
                  <button
                    type="button"
                    className="item-delete-btn"
                    onClick={() => toggleWishlist(product.id)}
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button
                    type="button"
                    className="btn-quick-move-cart"
                    onClick={() => {
                      addToCart(product, 1);
                    }}
                    title="Add to Cart"
                  >
                    <ShoppingBag size={14} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlistedProducts.length > 0 && (
          <div className="drawer-footer">
            <button
              type="button"
              className="checkout-submit-btn"
              onClick={() => {
                wishlistedProducts.forEach((p) => addToCart(p, 1));
                onClose();
              }}
            >
              <span>Add All to Cart</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
