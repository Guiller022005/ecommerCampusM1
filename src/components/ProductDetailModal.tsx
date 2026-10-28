import React, { useState } from 'react';
import { X, Star, Heart, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  if (!product) return null;

  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '#0F172A');
  const [isAdded, setIsAdded] = useState(false);

  const photos = product.photos && product.photos.length > 0 ? product.photos : [product.main_photo];
  const isFav = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Gallery Column */}
          <div className="modal-gallery">
            <div className="gallery-main-view">
              <img
                src={photos[activePhotoIndex]}
                alt={product.title}
                className="gallery-active-photo"
                onError={(e) => {
                  const current = e.currentTarget.getAttribute('src') || '';
                  if (current.startsWith('/')) {
                    e.currentTarget.src = '.' + current;
                  }
                }}
              />
              <button
                type="button"
                className={`gallery-fav-btn ${isFav ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                title="Favorite"
              >
                <Heart size={20} fill={isFav ? '#FFFFFF' : 'none'} />
              </button>
            </div>

            {photos.length > 1 && (
              <div className="gallery-thumbs">
                {photos.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${idx === activePhotoIndex ? 'active' : ''}`}
                    onClick={() => setActivePhotoIndex(idx)}
                  >
                    <img src={url} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Column */}
          <div className="modal-info">
            <div className="modal-header-info">
              <span className="modal-badge">{product.category_id.toUpperCase()}</span>
              <h2 className="modal-title">{product.title}</h2>
              <div className="modal-rating-row">
                <div className="stars-flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.round(product.star_rating) ? '#F59E0B' : '#E2E8F0'}
                      stroke="none"
                    />
                  ))}
                </div>
                <span className="rating-num">{product.star_rating.toFixed(1)}</span>
                <span className="reviews-count">({product.num_ratings.toLocaleString()} verified reviews)</span>
              </div>
            </div>

            <div className="modal-price-row">
              <span className="modal-price">${(product.price * quantity).toFixed(2)}</span>
              {product.original_price && (
                <del className="modal-orig-price">
                  ${(product.original_price * quantity).toFixed(2)}
                </del>
              )}
            </div>

            <p className="modal-description">{product.description}</p>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="variation-section">
                <label className="variation-label">Select Size</label>
                <div className="size-pills-row">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`modal-size-pill ${selectedSize === s ? 'active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="variation-section">
                <label className="variation-label">Color Option</label>
                <div className="color-swatches-row">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`modal-color-swatch ${selectedColor === c ? 'active' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setSelectedColor(c)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="modal-actions-row">
              <div className="quantity-counter">
                <button
                  type="button"
                  className="counter-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="counter-display">{quantity}</span>
                <button
                  type="button"
                  className="counter-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                className={`modal-add-btn ${isAdded ? 'success' : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <>
                    <Check size={18} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Bag &bull; ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
