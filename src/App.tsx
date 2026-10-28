import React, { useState, useEffect } from 'react';
import { Home, Heart, ShoppingBag, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { fetchCategories, fetchProducts } from './lib/supabase';
import type { Category, Product, FilterOptions } from './types';
import { defaultFilters } from './types';
import { useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { SkeletonGrid } from './components/SkeletonGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { FilterModal } from './components/FilterModal';

export const App: React.FC = () => {
  const { totalItems, wishlist, setIsCartOpen, toastMessage } = useCart();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState('aps');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter State
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  // Active filter count
  const activeFilterCount =
    (filters.sortBy !== defaultFilters.sortBy ? 1 : 0) +
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 200 ? 1 : 0) +
    (filters.onlyInStock ? 1 : 0) +
    (filters.onlyBestSellers ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  // Load Categories on mount
  useEffect(() => {
    fetchCategories().then((cats) => {
      setCategories(cats);
    });
  }, []);

  // Fetch Products whenever Category, Search Query, or Filters change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchProducts(activeCategoryId, searchQuery, filters)
        .then((prods) => {
          setProducts(prods);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 250);

    return () => clearTimeout(timer);
  }, [activeCategoryId, searchQuery, filters]);

  // Remove individual filter helper
  const handleRemoveFilterTag = (type: string) => {
    switch (type) {
      case 'sort':
        setFilters((prev) => ({ ...prev, sortBy: defaultFilters.sortBy }));
        break;
      case 'price':
        setFilters((prev) => ({ ...prev, minPrice: 0, maxPrice: 200 }));
        break;
      case 'rating':
        setFilters((prev) => ({ ...prev, minRating: 0 }));
        break;
      case 'in_stock':
        setFilters((prev) => ({ ...prev, onlyInStock: false }));
        break;
      case 'best_sellers':
        setFilters((prev) => ({ ...prev, onlyBestSellers: false }));
        break;
      default:
        break;
    }
  };

  const sortLabelMap: Record<string, string> = {
    'price-asc': 'Precio: Menor a Mayor',
    'price-desc': 'Precio: Mayor a Menor',
    'rating-desc': 'Mejor Calificados',
    'best-sellers': 'Más Vendidos',
  };

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
          onOpenFilter={() => setIsFilterModalOpen(true)}
          activeFilterCount={activeFilterCount}
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

        {/* Active Filter Tags Bar (Shown when any filter is active) */}
        {activeFilterCount > 0 && (
          <div className="active-filters-bar">
            <span className="active-filters-label">Filtros aplicados:</span>
            <div className="active-tags-list">
              {filters.sortBy !== 'featured' && (
                <button
                  type="button"
                  className="filter-tag-chip"
                  onClick={() => handleRemoveFilterTag('sort')}
                >
                  <span>{sortLabelMap[filters.sortBy]}</span>
                  <X size={13} />
                </button>
              )}

              {(filters.minPrice > 0 || filters.maxPrice < 200) && (
                <button
                  type="button"
                  className="filter-tag-chip"
                  onClick={() => handleRemoveFilterTag('price')}
                >
                  <span>
                    Precio: ${filters.minPrice} – ${filters.maxPrice >= 200 ? '200+' : filters.maxPrice}
                  </span>
                  <X size={13} />
                </button>
              )}

              {filters.minRating > 0 && (
                <button
                  type="button"
                  className="filter-tag-chip"
                  onClick={() => handleRemoveFilterTag('rating')}
                >
                  <span>★ {filters.minRating}+</span>
                  <X size={13} />
                </button>
              )}

              {filters.onlyInStock && (
                <button
                  type="button"
                  className="filter-tag-chip"
                  onClick={() => handleRemoveFilterTag('in_stock')}
                >
                  <span>En Stock</span>
                  <X size={13} />
                </button>
              )}

              {filters.onlyBestSellers && (
                <button
                  type="button"
                  className="filter-tag-chip"
                  onClick={() => handleRemoveFilterTag('best_sellers')}
                >
                  <span>Best Sellers</span>
                  <X size={13} />
                </button>
              )}

              <button
                type="button"
                className="clear-all-tags-btn"
                onClick={() => setFilters(defaultFilters)}
              >
                Limpiar todo
              </button>
            </div>
          </div>
        )}

        {/* Main Content Catalog */}
        <main className="main-catalog">
          {loading ? (
            <SkeletonGrid count={8} />
          ) : products.length === 0 ? (
            <div className="empty-catalog-state">
              <div className="empty-icon">🔍</div>
              <h3>No se encontraron productos</h3>
              <p>No hay artículos que coincidan con tus filtros o término de búsqueda.</p>
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategoryId('aps');
                  setFilters(defaultFilters);
                }}
              >
                Restablecer y Ver Todo
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
            setFilters(defaultFilters);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="Inicio"
        >
          <Home size={22} />
        </button>

        <button
          type="button"
          className="dock-item"
          onClick={() => setIsWishlistModalOpen(true)}
          title="Favoritos"
        >
          <Heart size={22} />
          {wishlist.length > 0 && <span className="dock-badge">{wishlist.length}</span>}
        </button>

        <button
          type="button"
          className="dock-item"
          onClick={() => setIsCartOpen(true)}
          title="Carrito"
        >
          <ShoppingBag size={22} />
          {totalItems > 0 && <span className="dock-badge cart-badge">{totalItems}</span>}
        </button>

        <button
          type="button"
          className="dock-item"
          onClick={() => setIsFilterModalOpen(true)}
          title="Filtros"
        >
          <SlidersHorizontal size={22} />
          {activeFilterCount > 0 && <span className="dock-badge">{activeFilterCount}</span>}
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

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentFilters={filters}
        onApplyFilters={(newFilters) => setFilters(newFilters)}
        onResetFilters={() => setFilters(defaultFilters)}
        resultsCount={products.length}
      />
    </div>
  );
};

export default App;
