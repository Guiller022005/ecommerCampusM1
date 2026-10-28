/**
 * Footer Components with sharp, responsive SVG icons
 */

export const buttonCartDetails = async (res) => {
    if (!res || !res.data) return "";
    const info = res.data;
    
    let product_original_price = info.product_original_price;
    let product_price = info.product_price;

    if (product_original_price && !product_original_price.startsWith("$")) {
        product_original_price = `$${product_original_price}`;
    }
    if (product_price && !product_price.startsWith("$")) {
        product_price = `$${product_price}`;
    }

    return /*html*/`
    <li class="footer-atc-li">
        <button type="button" id="add__to__cart" class="btn-add-to-cart">
            <svg class="atc-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span class="atc-text">
                Add to Cart &bull; <strong id="price_discount">${product_price}</strong>
                ${product_original_price ? `<del id="price_original">${product_original_price}</del>` : ''}
            </span>
        </button>
    </li>`;
};

export const footerIndex = async (storage) => {
    // Count distinct items in cart from sessionStorage
    let productCount = 0;
    try {
        const cartValues = Object.keys(sessionStorage).filter(key => {
            try {
                const item = JSON.parse(sessionStorage.getItem(key));
                return item && (item.asin || item.data?.asin);
            } catch (e) {
                return false;
            }
        });
        productCount = cartValues.length;
    } catch (e) {
        productCount = 0;
    }

    return /*html*/`
    <li class="nav-item active">
        <a href="index.html" class="nav-link" title="Home" aria-label="Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        </a>
    </li>
    <li class="nav-item">
        <a href="views/checkout.html" class="nav-link cart-link" title="Cart" aria-label="Shopping Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            ${productCount > 0 ? `<span class="cart-counter">${productCount}</span>` : `<span class="cart-counter" style="display:none;">0</span>`}
        </a>
    </li>
    <li class="nav-item">
        <a href="#wishlist" id="nav-wishlist" class="nav-link" title="Wishlist" aria-label="Wishlist">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        </a>
    </li>
    <li class="nav-item">
        <a href="#profile" id="nav-profile" class="nav-link" title="Profile" aria-label="Profile">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        </a>
    </li>`;
};
