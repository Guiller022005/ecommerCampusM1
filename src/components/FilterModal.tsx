import React, { useState, useEffect } from 'react';
import { X, SlidersHorizontal, RotateCcw, Check, Star, Sparkles } from 'lucide-react';
import type { FilterOptions, SortOption } from '../types';
import { defaultFilters } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
  onResetFilters: () => void;
  resultsCount: number;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  currentFilters,
  onApplyFilters,
  onResetFilters,
  resultsCount,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(currentFilters);

  // Sync when opened
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  if (!isOpen) return null;

  // Calculate active filter count
  const activeCount =
    (localFilters.sortBy !== defaultFilters.sortBy ? 1 : 0) +
    (localFilters.minPrice > 0 ? 1 : 0) +
    (localFilters.maxPrice < 200 ? 1 : 0) +
    (localFilters.onlyInStock ? 1 : 0) +
    (localFilters.onlyBestSellers ? 1 : 0) +
    (localFilters.minRating > 0 ? 1 : 0);

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters(defaultFilters);
    onResetFilters();
    onClose();
  };

  const setPriceRange = (min: number, max: number) => {
    setLocalFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container filter-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
      >
        {/* Header */}
        <div className="filter-modal-header">
          <div className="filter-title-group">
            <div className="filter-title-icon">
              <SlidersHorizontal size={20} />
            </div>
            <div>
              <h2 id="filter-title">Filtros y Orden</h2>
              <span className="filter-results-badge">
                {resultsCount} {resultsCount === 1 ? 'producto encontrado' : 'productos encontrados'}
              </span>
            </div>
          </div>
          <div className="filter-header-actions">
            {activeCount > 0 && (
              <span className="active-filters-pill">{activeCount} activos</span>
            )}
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Cerrar filtros"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Filter Content */}
        <div className="filter-modal-body">
          {/* 1. Sort Section */}
          <div className="filter-section">
            <label className="filter-section-title">
              <span>Ordenar por</span>
            </label>
            <div className="sort-options-grid">
              {(
                [
                  { id: 'featured', label: 'Destacados' },
                  { id: 'price-asc', label: 'Precio: Menor a Mayor' },
                  { id: 'price-desc', label: 'Precio: Mayor a Menor' },
                  { id: 'rating-desc', label: 'Mejor Calificados' },
                  { id: 'best-sellers', label: 'Más Vendidos' },
                ] as { id: SortOption; label: string }[]
              ).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`sort-chip ${localFilters.sortBy === option.id ? 'active' : ''}`}
                  onClick={() =>
                    setLocalFilters((prev) => ({ ...prev, sortBy: option.id }))
                  }
                >
                  {localFilters.sortBy === option.id && <Check size={14} />}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Price Range */}
          <div className="filter-section">
            <div className="section-header-flex">
              <label className="filter-section-title">
                <span>Rango de Precio</span>
              </label>
              <span className="price-range-readout">
                ${localFilters.minPrice} – ${localFilters.maxPrice >= 200 ? '200+' : localFilters.maxPrice} USD
              </span>
            </div>

            {/* Quick Price Chips */}
            <div className="price-presets">
              <button
                type="button"
                className={`preset-btn ${localFilters.minPrice === 0 && localFilters.maxPrice === 200 ? 'active' : ''}`}
                onClick={() => setPriceRange(0, 200)}
              >
                Todos
              </button>
              <button
                type="button"
                className={`preset-btn ${localFilters.minPrice === 0 && localFilters.maxPrice === 50 ? 'active' : ''}`}
                onClick={() => setPriceRange(0, 50)}
              >
                Hasta $50
              </button>
              <button
                type="button"
                className={`preset-btn ${localFilters.minPrice === 50 && localFilters.maxPrice === 100 ? 'active' : ''}`}
                onClick={() => setPriceRange(50, 100)}
              >
                $50 – $100
              </button>
              <button
                type="button"
                className={`preset-btn ${localFilters.minPrice === 100 && localFilters.maxPrice === 200 ? 'active' : ''}`}
                onClick={() => setPriceRange(100, 200)}
              >
                Más de $100
              </button>
            </div>

            {/* Price Inputs */}
            <div className="price-inputs-row">
              <div className="price-input-box">
                <span className="price-currency">$</span>
                <input
                  type="number"
                  min="0"
                  max={localFilters.maxPrice}
                  placeholder="Min"
                  value={localFilters.minPrice || ''}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value));
                    setLocalFilters((prev) => ({ ...prev, minPrice: val }));
                  }}
                />
              </div>
              <span className="price-separator">a</span>
              <div className="price-input-box">
                <span className="price-currency">$</span>
                <input
                  type="number"
                  min={localFilters.minPrice}
                  max="500"
                  placeholder="Max"
                  value={localFilters.maxPrice || ''}
                  onChange={(e) => {
                    const val = Math.max(localFilters.minPrice, Number(e.target.value) || 200);
                    setLocalFilters((prev) => ({ ...prev, maxPrice: val }));
                  }}
                />
              </div>
            </div>
          </div>

          {/* 3. Rating */}
          <div className="filter-section">
            <label className="filter-section-title">
              <span>Calificación Mínima</span>
            </label>
            <div className="rating-options-row">
              {[
                { val: 0, label: 'Todas' },
                { val: 4.0, label: '4.0+' },
                { val: 4.5, label: '4.5+' },
                { val: 4.8, label: '4.8+' },
              ].map((rate) => (
                <button
                  key={rate.val}
                  type="button"
                  className={`rating-chip ${localFilters.minRating === rate.val ? 'active' : ''}`}
                  onClick={() =>
                    setLocalFilters((prev) => ({ ...prev, minRating: rate.val }))
                  }
                >
                  {rate.val > 0 && <Star size={14} className="star-icon-fill" />}
                  <span>{rate.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Special Toggles */}
          <div className="filter-section">
            <label className="filter-section-title">
              <span>Disponibilidad & Distintivos</span>
            </label>
            <div className="toggles-list">
              <label className="filter-toggle-card">
                <div className="toggle-info">
                  <span className="toggle-title">Solo Productos en Stock</span>
                  <small className="toggle-sub">Oculta artículos agotados temporalmente</small>
                </div>
                <input
                  type="checkbox"
                  checked={localFilters.onlyInStock}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      onlyInStock: e.target.checked,
                    }))
                  }
                  className="toggle-checkbox"
                />
              </label>

              <label className="filter-toggle-card">
                <div className="toggle-info">
                  <span className="toggle-title">
                    <Sparkles size={14} className="sparkle-icon" />
                    Solo Más Vendidos (Best Sellers)
                  </span>
                  <small className="toggle-sub">Prendas y accesorios con mayor demanda</small>
                </div>
                <input
                  type="checkbox"
                  checked={localFilters.onlyBestSellers}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      onlyBestSellers: e.target.checked,
                    }))
                  }
                  className="toggle-checkbox"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="filter-modal-footer">
          <button
            type="button"
            className="btn-clear-filters"
            onClick={handleReset}
            disabled={activeCount === 0}
          >
            <RotateCcw size={16} />
            <span>Restablecer</span>
          </button>
          <button
            type="button"
            className="btn-apply-filters"
            onClick={handleApply}
          >
            <span>Ver Resultados</span>
          </button>
        </div>
      </div>
    </div>
  );
};
