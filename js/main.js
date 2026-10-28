import { menulistCategoryIndex } from "./components/menu.js";
import { galleryIndex } from "./components/gallery.js";
import { getAllProductsName, getAllCategory, getAllProductsByCategory } from "./module/app.js";
import { footerIndex } from "./components/footer.js";
import { categorySkeleton, productGridSkeleton } from "./components/skeleton.js";

const input__search = document.querySelector("#input_search");
const search__icon = document.querySelector("#search__icon");
const main__article = document.querySelector(".main__article");
const nav__ul = document.querySelector(".nav__ul");
const footer__ul = document.querySelector(".footer__ul");

let currentCategory = "aps";
let searchDebounceTimer = null;

/**
 * Update the floating cart counter badge in the footer
 */
export const updateCartBadge = () => {
    let productCount = 0;
    try {
        const keys = Object.keys(sessionStorage).filter(key => {
            try {
                const item = JSON.parse(sessionStorage.getItem(key));
                return item && (item.asin || item.data?.asin);
            } catch (e) {
                return false;
            }
        });
        productCount = keys.length;
    } catch (e) {
        productCount = 0;
    }

    const badges = document.querySelectorAll('.cart-counter');
    badges.forEach(badge => {
        badge.textContent = productCount.toString();
        badge.style.display = productCount > 0 ? 'flex' : 'none';
    });
};

/**
 * Load and display products with skeleton loader transition
 */
const loadProducts = async ({ category = "aps", search = "" } = {}) => {
    currentCategory = category;
    
    // Show animated skeleton grid while loading
    main__article.innerHTML = productGridSkeleton(6);

    try {
        let res;
        if (search && search.trim()) {
            res = await getAllProductsName({ search: search.trim() });
        } else if (category && category !== "aps") {
            res = await getAllProductsByCategory({ id: category, search: "" });
        } else {
            res = await getAllProductsName({ search: "" });
        }

        // Render real products
        main__article.innerHTML = galleryIndex(res, category);
        attachProductEvents();
    } catch (error) {
        console.error("Error loading products:", error);
        main__article.innerHTML = `
            <div class="empty-state">
                <div class="empty-state__icon">⚠️</div>
                <h3>Unable to load products</h3>
                <p>Please check your connection and try again.</p>
                <button id="reset-search-btn" class="btn-primary-sm">Retry</button>
            </div>
        `;
        attachProductEvents();
    }
};

/**
 * Handle category tab clicks without full page reloads
 */
const handleCategoryClick = async (e) => {
    const link = e.target.closest(".category-link");
    if (!link) return;
    
    e.preventDefault();
    const categoryId = link.dataset.id;
    if (categoryId === currentCategory && !input__search.value.trim()) return;

    // Update active pill UI immediately
    document.querySelectorAll(".category-link").forEach(el => el.classList.remove("active"));
    link.classList.add("active");

    // Clear search input if switching category
    input__search.value = "";
    history.pushState(null, "", `?id=${categoryId}`);

    await loadProducts({ category: categoryId });
};

/**
 * Handle search queries
 */
const handleSearch = () => {
    const query = input__search.value.trim();
    loadProducts({ category: currentCategory, search: query });
};

/**
 * Toggle product favorite / wishlist state
 */
const handleFavoriteToggle = (e) => {
    const btn = e.target.closest(".btn-heart");
    if (!btn) return;
    
    const asin = btn.dataset.asin;
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    const isFav = favorites.includes(asin);
    if (isFav) {
        favorites = favorites.filter(id => id !== asin);
        btn.classList.remove("active");
        btn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        `;
    } else {
        favorites.push(asin);
        btn.classList.add("active");
        btn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        `;
    }
    
    localStorage.setItem("favorites", JSON.stringify(favorites));
};

/**
 * Attach dynamic events for cards, reset buttons, favorites
 */
const attachProductEvents = () => {
    const resetBtn = document.querySelector("#reset-search-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            input__search.value = "";
            const apsLink = document.querySelector('.category-link[data-id="aps"]');
            if (apsLink) {
                document.querySelectorAll(".category-link").forEach(el => el.classList.remove("active"));
                apsLink.classList.add("active");
            }
            history.pushState(null, "", "?id=aps");
            loadProducts({ category: "aps" });
        });
    }
};

// Main Initialization on DOMContentLoaded
addEventListener("DOMContentLoaded", async () => {
    // 1. Initial Skeleton States
    nav__ul.innerHTML = categorySkeleton(5);
    main__article.innerHTML = productGridSkeleton(6);
    footer__ul.innerHTML = await footerIndex(sessionStorage);

    // 2. Read URL params
    const params = new URLSearchParams(location.search);
    const initialCategory = params.get('id') || "aps";
    currentCategory = initialCategory;

    // 3. Load categories
    try {
        let categoriesData = JSON.parse(localStorage.getItem("getAllCategory") || "null");
        if (!categoriesData) {
            categoriesData = await getAllCategory();
            localStorage.setItem("getAllCategory", JSON.stringify(categoriesData));
        }
        nav__ul.innerHTML = await menulistCategoryIndex(categoriesData, initialCategory);
    } catch (e) {
        console.error("Categories error:", e);
    }

    // 4. Load initial products
    await loadProducts({ category: initialCategory });

    // 5. Update Cart Badge
    updateCartBadge();
});

// Event Listeners
nav__ul.addEventListener("click", handleCategoryClick);

// Real-time debounced search
input__search.addEventListener("input", () => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
        handleSearch();
    }, 280);
});

input__search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        clearTimeout(searchDebounceTimer);
        handleSearch();
    }
});

if (search__icon) {
    search__icon.addEventListener("click", handleSearch);
}

main__article.addEventListener("click", handleFavoriteToggle);

// Wishlist handler
const showWishlist = (e) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorites.length === 0) {
        if (window.Swal) {
            Swal.fire({
                icon: 'info',
                title: 'Wishlist is empty',
                text: 'Tap the heart on any product to save it to your wishlist!',
                confirmButtonColor: '#4F46E5'
            });
        } else {
            alert("Your wishlist is empty! Tap the heart icon on any product to save it.");
        }
        return;
    }

    main__article.innerHTML = productGridSkeleton(favorites.length);
    getAllProductsName({ search: "" }).then(res => {
        const favProducts = res.data.products.filter(p => favorites.includes(p.asin));
        main__article.innerHTML = galleryIndex({ data: { products: favProducts } }, "Wishlist");
        attachProductEvents();
    });
};

// Profile handler
const showProfile = (e) => {
    e.preventDefault();
    if (window.Swal) {
        Swal.fire({
            title: 'Guillermo Paúl',
            text: 'Campuslands Student & Web Developer',
            imageUrl: 'storage/img/myphoto.png',
            imageWidth: 90,
            imageHeight: 90,
            imageAlt: 'Profile Photo',
            confirmButtonColor: '#4F46E5',
            confirmButtonText: 'Done'
        });
    } else {
        alert("Guillermo Paúl - Campuslands Web Developer");
    }
};

// Attach to desktop header buttons
const headerWishlist = document.querySelector("#header-wishlist");
const headerProfile = document.querySelector("#header-profile");
if (headerWishlist) headerWishlist.addEventListener("click", showWishlist);
if (headerProfile) headerProfile.addEventListener("click", showProfile);

// Attach to mobile dock
footer__ul.addEventListener("click", (e) => {
    const wishlistLink = e.target.closest("#nav-wishlist");
    if (wishlistLink) showWishlist(e);

    const profileLink = e.target.closest("#nav-profile");
    if (profileLink) showProfile(e);
});
