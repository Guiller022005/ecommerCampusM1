import React from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
}) => {
  const { toggleWishlist, isWishlisted, addToCart } = useCart();
  const isFav = isWishlisted(product.id);
  const hasDiscount = Boolean(
    product.original_price && product.original_price > product.price
  );

  return (
    <article className="product-card">
      <div className="card-media">
        <button
          type="button"
          className="media-click-area"
          onClick={() => onOpenDetails(product)}
          aria-label={`View details of ${product.title}`}
        >
          <img
            src={product.main_photo}
            alt={product.title}
            loading="lazy"
            className="product-thumb"
          />
        </button>

        {/* Favorite Heart Button */}
        <button
          type="button"
          className={`favorite-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          title={isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={18} fill={isFav ? '#FFFFFF' : 'none'} />
        </button>

        {/* Discount Badge */}
        {hasDiscount && <span className="discount-tag">Sale</span>}
      </div>

      <div className="card-body">
        <h3
          className="card-title"
          title={product.title}
          onClick={() => onOpenDetails(product)}
        >
          {product.title}
        </h3>
        <p className="card-subtitle">{product.subtitle || 'Modern Edition'}</p>

        <div className="card-footer">
          <div className="price-block">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.original_price && (
              <del className="original-price">${product.original_price.toFixed(2)}</del>
            )}
          </div>

          <div className="rating-block">
            <Star size={14} className="star-icon" fill="#F59E0B" />
            <span className="rating-val">{product.star_rating.toFixed(1)}</span>
          </div>
        </div>

        <button
          type="button"
          className="card-quick-add"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, 1);
          }}
        >
          <ShoppingBag size={16} />
          <span>Add to Bag</span>
        </button>
      </div>
    </article>
  );
};
