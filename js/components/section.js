import { resolveImagePath } from "../module/mockData.js";

/**
 * Product detail title and rating section
 */
export const titleProductDetail = async ({ data: dataUpdate } = {}) => {
    if (!dataUpdate) return "";
    const starsCount = Math.round(parseFloat(dataUpdate.product_star_rating) || 5);
    const starIcons = Array.from({ length: Math.min(starsCount, 5) })
        .map(() => `<img src="../storage/img/star.svg" alt="star" class="star-icon">`)
        .join('');

    return /*html*/`
        <article class="article__detail">
            <div class="detail__head">
                <h1>${dataUpdate.product_title}</h1>
                <div class="product__select">
                    <button type="button" id="btn_minus" class="qty-btn" aria-label="Decrease quantity">
                        <img src="../storage/img/minus.svg" alt="-">
                    </button>
                    <span id="span_quantity">1</span>
                    <button type="button" id="btn_plus" class="qty-btn" aria-label="Increase quantity">
                        <img src="../storage/img/plus.svg" alt="+">
                    </button>
                </div>
            </div>
            <div class="detail__score">
                <div class="stars-wrapper">${starIcons}</div>
                <span class="score-number">${dataUpdate.product_star_rating || "5.0"}</span>
                <span class="score-reviews">(${Number(dataUpdate.product_num_ratings || 120).toLocaleString()} reviews)</span>
            </div>
        </article>
    `;
};

/**
 * Product detail description section
 */
export const productDetail = async ({ data } = {}) => {
    if (!data) return "";
    const text = data.product_description || "High quality premium apparel crafted with attention to modern details and everyday comfort.";
    const isLong = text.length > 140;
    const shortText = isLong ? text.slice(0, 140) : text;
    const restText = isLong ? text.slice(140) : "";

    return /*html*/`
        <details class="product-description-details" ${!isLong ? 'open' : ''}>
            <summary class="description-summary">
                ${shortText}${isLong ? '<span class="read-more-hint">... <b>Read more</b></span>' : ''}
            </summary>
            ${isLong ? `<p class="description-full-text">${restText}</p>` : ''}
        </details>
    `;
};

/**
 * Product detail interactive size & color variations
 */
export const variationsProductDetail = ({ data } = {}) => {
    if (!data) return "";
    const sizes = data.sizes || ["S", "M", "L", "XL"];
    const colors = data.colors || ["#1E293B", "#4F46E5", "#D97706"];

    return /*html*/`
        <div class="product__size">
            <h5>Choose Size</h5>
            <div class="sizes-pills" id="sizes-group">
                ${sizes.map((s, idx) => `
                    <button type="button" class="size-pill ${idx === 0 ? 'active' : ''}" data-size="${s}">${s}</button>
                `).join('')}
            </div>
        </div>
        <div class="product__color">
            <h5>Color</h5>
            <div class="colors-swatches" id="colors-group">
                ${colors.map((c, idx) => `
                    <button type="button" class="color-swatch ${idx === 0 ? 'active' : ''}" data-color="${c}" style="background-color: ${c};" title="Color option"></button>
                `).join('')}
            </div>
        </div>
    `;
};

/**
 * Checkout product item cards
 */
export const cardProductCheckout = async (items) => {
    if (!items || items.length === 0) {
        return /*html*/`
            <div class="cart-empty-state">
                <div class="cart-empty-icon">🛍️</div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any products to your cart yet.</p>
                <a href="../index.html" class="btn-primary-block">Explore Collection</a>
            </div>
        `;
    }

    let plantilla = "";
    items.forEach((element) => {
        if (!element) return;
        const data = typeof element === 'string' ? JSON.parse(element) : element;
        const info = data.data || data;
        if (!info) return;

        const rawPrice = typeof info.product_price === 'string' 
            ? parseFloat(info.product_price.replace('$', '')) 
            : parseFloat(info.product_price || 0);

        const qty = parseInt(info.quantity) || 1;
        const itemTotal = (rawPrice * qty).toFixed(2);
        const imgSrc = resolveImagePath(info.product_photo || info.product_photos?.[0], true);

        plantilla += /*html*/`
        <article class="details__product" data-asin="${info.asin}">
            <div class="product__imagen">
                <img src="${imgSrc}" alt="${info.product_title}">
            </div>
            <div class="product__description">
                <h3 title="${info.product_title}"><strong>${info.product_title}</strong></h3>
                <small>${info.product_subtitle || "Modern edition"}</small>
                <span class="unit-price" data-price="${rawPrice}">$${itemTotal}</span>
            </div>
            <div class="product__custom">
                <button type="button" class="btn-delete-item" data-asin="${info.asin}" title="Remove item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
                <div class="product__select">
                    <button type="button" class="counter-button decrement" data-asin="${info.asin}" aria-label="Decrease">
                        <img src="../storage/img/checkout minus.svg" alt="-">
                    </button>
                    <span class="counter__value">${qty}</span>
                    <button type="button" class="counter-button increment" data-asin="${info.asin}" aria-label="Increase">
                        <img src="../storage/img/chekout plus.svg" alt="+">
                    </button>
                </div>
            </div>
        </article>
        `;
    });
    return plantilla;
};

/**
 * Checkout billing summary
 */
export const billProductCheckout = async (totalItems, totalPrice, shippingFee = 0) => {
    const finalTotal = totalPrice > 0 ? (totalPrice + shippingFee) : 0;

    return /*html*/`
        <article class="section__bill">
            <div class="bill__total">
                <label>Total (${totalItems} ${totalItems === 1 ? 'item' : 'items'})</label>
                <span id="bill-items-total">$${totalPrice.toFixed(2)}</span>
            </div>
            <div class="bill__fee">
                <label>Shipping Fee</label>
                <span id="bill-shipping">${totalPrice > 0 ? (shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`) : '$0.00'}</span>
            </div>
            <div class="bill__subtotal">
                <label>Order Total</label>
                <span class="final-price-tag" id="bill-final-total">$${finalTotal.toFixed(2)}</span>
            </div>
        </article>
    `;
};