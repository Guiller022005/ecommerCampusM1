import React from 'react';

export const SkeletonGrid: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="product-card skeleton-card">
          <div className="card-media skeleton-shimmer" style={{ height: '220px' }} />
          <div className="card-body">
            <div
              className="skeleton-shimmer"
              style={{ width: '85%', height: '18px', marginBottom: '8px', borderRadius: '4px' }}
            />
            <div
              className="skeleton-shimmer"
              style={{ width: '50%', height: '14px', marginBottom: '16px', borderRadius: '4px' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
              }}
            >
              <div
                className="skeleton-shimmer"
                style={{ width: '60px', height: '20px', borderRadius: '4px' }}
              />
              <div
                className="skeleton-shimmer"
                style={{ width: '40px', height: '16px', borderRadius: '4px' }}
              />
            </div>
            <div
              className="skeleton-shimmer"
              style={{ width: '100%', height: '38px', borderRadius: '9999px' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
