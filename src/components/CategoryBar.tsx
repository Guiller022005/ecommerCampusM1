import React from 'react';
import { LayoutGrid, Shirt, Footprints, Watch, ShieldCheck, Briefcase } from 'lucide-react';
import type { Category } from '../types';

interface CategoryBarProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'fashion':
        return <Shirt size={18} />;
      case 'shoes':
        return <Footprints size={18} />;
      case 'watches':
        return <Watch size={18} />;
      case 'hats':
        return <ShieldCheck size={18} />;
      case 'bags':
        return <Briefcase size={18} />;
      case 'aps':
      default:
        return <LayoutGrid size={18} />;
    }
  };

  return (
    <nav className="categories-nav" aria-label="Categories">
      <div className="categories-scroll">
        {categories.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              type="button"
              className={`category-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <span className="pill-icon">{getIcon(cat.id)}</span>
              <span className="pill-text">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
