import { resolveImagePath } from "../module/mockData.js";

/**
 * Inline Heart Icon for 100% Crisp Visibility
 */
const heartSvg = (isFav) => `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? '#FFFFFF' : 'none'}" stroke="${isFav ? '#FFFFFF' : '#FFFFFF'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
`;

/**
 * Renders the products grid on the home page
 */
export const galleryIndex = (res, category = "aps") => {
    if (!res || !res.data || !res.data.products || res.data.products.length === 0) {
        return /*html*/`
            <div class="empty-state">
                <div class="empty-state__icon">🔍</div>
                <h3>No products found</h3>
                <p>We couldn't find matches for this search. Try exploring other categories.</p>
                <button id="reset-search-btn" class="btn-primary-sm">Browse All Products</button>
            </div>
        `;
    }

    const { products } = res.data;
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    let plantilla = "";
    products.forEach(value => {
        const isFav = favorites.includes(value.asin);
        const imgSrc = resolveImagePath(value.product_photo, false);
        const rating = value.product_star_rating != null ? value.product_star_rating : "5.0";
        const hasDiscount = Boolean(value.product_original_price && value.product_original_price !== value.product_price);

        plantilla += /*html*/`
        <section class="product-card" data-asin="${value.asin}">
            <div class="section__front_page">
                <a href="views/detail.html?id=${value.asin}" class="product-card__image-link">
                    <img src="${imgSrc}" alt="${value.product_title}" loading="lazy" class="product-card__thumb">
                </a>
                <button type="button" class="btn-heart ${isFav ? 'active' : ''}" data-asin="${value.asin}" title="Add to Wishlist" aria-label="Favorite">
                    ${heartSvg(isFav)}
                </button>
                ${hasDiscount ? `<span class="badge-discount">Sale</span>` : ''}
            </div>
            <h5 title="${value.product_title}">${value.product_title}</h5>
            <small>${value.product_subtitle || category}</small>
            <div class="section__price">
                <div class="price-box">
                    <span class="price-current">${value.product_price}</span>
                    ${value.product_original_price ? `<del class="price-original">${value.product_original_price}</del>` : ''}
                </div>
                <div class="price__score">
                    <img src="storage/img/star.svg" alt="Rating" class="star-icon">
                    <p>${rating}</p>
                </div>
            </div>
        </section>
        `;
    });
    return plantilla;
};

/**
 * Renders the product image gallery on the detail page
 */
export const galleryCategory = ({ data } = {}) => {
    if (!data) return "";
    const photos = data.product_photos || (data.product_photo ? [data.product_photo] : ["storage/img/img1.svg"]);
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFav = favorites.includes(data.asin);

    return /*html*/`
        <article class="article__product">
            <div class="product__image" id="detail-slider">
                ${photos.map((url, idx) => `
                    <div class="product__image__item" data-index="${idx}">
                        <img src="${resolveImagePath(url, true)}" alt="Product Photo ${idx + 1}" class="gallery-photo">
                    </div>
                `).join('')}
            </div>
            
            ${photos.length > 1 ? `
                <div class="slider-dots">
                    ${photos.map((_, idx) => `
                        <span class="slider-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></span>
                    `).join('')}
                </div>
            ` : ''}

            <div class="product__menu">
                <a href="../index.html" class="nav-back-btn" title="Back to Store">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </a>
                <button type="button" class="btn-heart-detail ${isFav ? 'active' : ''}" data-asin="${data.asin}" title="Favorite">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? '#EF4444' : 'none'}" stroke="${isFav ? '#EF4444' : '#0F172A'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
        </article>
    `;
};