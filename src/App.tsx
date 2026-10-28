import React, { useState, useEffect } from 'react';
import { Home, Heart, ShoppingBag, User, Sparkles } from 'lucide-react';
import { fetchCategories, fetchProducts } from './lib/supabase';
import type { Category, Product } from './types';
import { useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { SkeletonGrid } from './components/SkeletonGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { SupabaseModal } from './components/SupabaseModal';

export const App: React.FC = () => {
  const { totalItems, wishlist, setIsCartOpen, toastMessage } = useCart();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState('aps');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  // Load Categories on mount
  useEffect(() => {
    fetchCategories().then((cats) => {
      setCategories(cats);
    });
  }, []);

  // Fetch Products whenever Category or Search Query changes (with debounce)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchProducts(activeCategoryId, searchQuery)
        .then((prods) => {
          setProducts(prods);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 250);

    return () => clearTimeout(timer);
  }, [activeCategoryId, searchQuery]);

  return (
    <div className="app-shell">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="app-toast">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="app-wrapper">
        {/* Top Navbar */}
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
          onOpenWishlist={() => setIsWishlistModalOpen(true)}
        />

        {/* Categories Bar */}
        <CategoryBar
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={(id) => {
            setActiveCategoryId(id);
          }}
        />

        {/* Main Content Catalog */}
        <main className="main-catalog">
          {loading ? (
            <SkeletonGrid count={8} />
          ) : products.length === 0 ? (
            <div className="empty-catalog-state">
              <div className="empty-icon">🔍</div>
              <h3>No products found</h3>
              <p>We couldn't find items matching your search. Try another query or category.</p>
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategoryId('aps');
                }}
              >
                Browse All Items
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Floating Bottom Dock (Hidden on Computers!) */}
      <nav className="mobile-dock" aria-label="Mobile Navigation">
        <button
          type="button"
          className="dock-item active"
          onClick={() => {
            setActiveCategoryId('aps');
            setSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="Home"
        >
          <Home size={22} />
        </button>

        <button
          type="button"
          className="dock-item"
          onClick={() => setIsWishlistModalOpen(true)}
          title="Wishlist"
        >
          <Heart size={22} />
          {wishlist.length > 0 && <span className="dock-badge">{wishlist.length}</span>}
        </button>

        <button
          type="button"
          className="dock-item"
          onClick={() => setIsCartOpen(true)}
          title="Cart"
        >
          <ShoppingBag size={22} />
          {totalItems > 0 && <span className="dock-badge cart-badge">{totalItems}</span>}
        </button>

        <button
          type="button"
          className="dock-item"
          onClick={() => setIsSupabaseModalOpen(true)}
          title="Database"
        >
          <User size={22} />
        </button>
      </nav>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer />

      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={() => setIsWishlistModalOpen(false)}
        products={products}
        onOpenDetails={(p) => setSelectedProduct(p)}
      />

      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />
    </div>
  );
};

export default App;
