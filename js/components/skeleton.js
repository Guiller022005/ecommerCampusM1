/**
 * Skeleton Loaders Component for Campuslands Ecommerce
 * Provides smooth animated shimmer placeholders for improved perceived performance
 */

export const categorySkeleton = (count = 5) => {
    return Array.from({ length: count }).map(() => `
        <li class="ul__li skeleton-category-item">
            <div class="skeleton-pill skeleton-shimmer"></div>
        </li>
    `).join('');
};

export const productGridSkeleton = (count = 4) => {
    return Array.from({ length: count }).map(() => `
        <section class="product-card skeleton-card">
            <div class="section__front_page skeleton-shimmer skeleton-image-box"></div>
            <div class="skeleton-line skeleton-line-title skeleton-shimmer"></div>
            <div class="skeleton-line skeleton-line-subtitle skeleton-shimmer"></div>
            <div class="section__price skeleton-price-row">
                <div class="skeleton-line skeleton-line-price skeleton-shimmer"></div>
                <div class="skeleton-line skeleton-line-rating skeleton-shimmer"></div>
            </div>
        </section>
    `).join('');
};

export const detailSkeleton = () => {
    return {
        gallery: `
            <article class="article__product skeleton-gallery-wrapper">
                <div class="product__image skeleton-shimmer skeleton-gallery-box"></div>
            </article>
        `,
        title: `
            <article class="article__detail">
                <div class="detail__head">
                    <div class="skeleton-line skeleton-line-large skeleton-shimmer" style="width: 65%; height: 28px;"></div>
                    <div class="skeleton-line skeleton-shimmer" style="width: 80px; height: 32px; border-radius: 20px;"></div>
                </div>
                <div class="detail__score" style="margin-top: 10px;">
                    <div class="skeleton-line skeleton-shimmer" style="width: 140px; height: 18px;"></div>
                </div>
            </article>
        `,
        description: `
            <div style="padding: 10px 0;">
                <div class="skeleton-line skeleton-shimmer" style="width: 100%; height: 16px; margin-bottom: 8px;"></div>
                <div class="skeleton-line skeleton-shimmer" style="width: 90%; height: 16px; margin-bottom: 8px;"></div>
                <div class="skeleton-line skeleton-shimmer" style="width: 75%; height: 16px;"></div>
            </div>
        `
    };
};

export const checkoutSkeleton = (count = 2) => {
    return Array.from({ length: count }).map(() => `
        <article class="details__product skeleton-checkout-card">
            <div class="product__imagen skeleton-shimmer" style="border-radius: 14px;"></div>
            <div class="product__description" style="gap: 8px; justify-content: center;">
                <div class="skeleton-line skeleton-shimmer" style="width: 90%; height: 16px;"></div>
                <div class="skeleton-line skeleton-shimmer" style="width: 50%; height: 12px;"></div>
                <div class="skeleton-line skeleton-shimmer" style="width: 40%; height: 16px;"></div>
            </div>
            <div class="product__custom" style="justify-content: center; align-items: flex-end;">
                <div class="skeleton-shimmer" style="width: 75px; height: 28px; border-radius: 8px;"></div>
            </div>
        </article>
    `).join('');
};
