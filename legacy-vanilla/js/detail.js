import { buttonCartDetails } from "./components/footer.js";
import { getProductId } from "./module/detail.js";
import { titleProductDetail, productDetail, variationsProductDetail } from "./components/section.js";
import { galleryCategory } from "./components/gallery.js";
import { detailSkeleton } from "./components/skeleton.js";

const main__section_gallery = document.querySelector("#main__section_gallery");
const main__section__title = document.querySelector("#main__section__title");
const product__information = document.querySelector(".product__information");
const product__custom_section = document.querySelector(".product__custom");
const footer__ul = document.querySelector(".footer__ul");

let currentProduct = null;
let selectedQuantity = 1;
let selectedSize = "M";
let selectedColor = "";

/**
 * Initialize and load product details
 */
addEventListener("DOMContentLoaded", async () => {
    // 1. Show skeleton loaders immediately
    const skeletons = detailSkeleton();
    if (main__section_gallery) main__section_gallery.innerHTML = skeletons.gallery;
    if (main__section__title) main__section__title.innerHTML = skeletons.title;
    if (product__information) product__information.innerHTML = skeletons.description;

    // 2. Get product ID from URL query parameters
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || "B099RPBTDT";

    try {
        let productData = null;
        const cached = localStorage.getItem(`product_${id}`);
        if (cached) {
            productData = JSON.parse(cached);
        } else {
            productData = await getProductId({ id });
            localStorage.setItem(`product_${id}`, JSON.stringify(productData));
        }

        currentProduct = productData.data || productData;
        selectedColor = currentProduct.colors?.[0] || "#1E293B";
        selectedSize = currentProduct.sizes?.[0] || "M";

        // 3. Render real content
        if (main__section_gallery) main__section_gallery.innerHTML = galleryCategory({ data: currentProduct });
        if (main__section__title) main__section__title.innerHTML = await titleProductDetail({ data: currentProduct });
        if (product__information) product__information.innerHTML = await productDetail({ data: currentProduct });
        
        // Render size & color variations
        if (product__custom_section) {
            product__custom_section.innerHTML = variationsProductDetail({ data: currentProduct });
        }
        
        // Render bottom add to cart bar
        if (footer__ul) footer__ul.innerHTML = await buttonCartDetails({ data: currentProduct });

        // 4. Attach event listeners
        attachDetailEvents();
        initSliderDots();
    } catch (err) {
        console.error("Error loading product detail:", err);
        if (main__section__title) {
            main__section__title.innerHTML = `
                <div class="empty-state" style="padding: 40px 10px;">
                    <h3>Product not found</h3>
                    <a href="../index.html" class="btn-primary-sm" style="display:inline-block; margin-top: 15px;">Back to Store</a>
                </div>
            `;
        }
    }
});

/**
 * Attach interactive events for quantity, sizes, colors, favorites, and cart
 */
const attachDetailEvents = () => {
    const btn_minus = document.querySelector("#btn_minus");
    const btn_plus = document.querySelector("#btn_plus");

    if (btn_minus) btn_minus.addEventListener("click", () => updateQuantity(-1));
    if (btn_plus) btn_plus.addEventListener("click", () => updateQuantity(1));

    // Size selection
    const sizesGroup = document.querySelector("#sizes-group");
    if (sizesGroup) {
        sizesGroup.addEventListener("click", (e) => {
            const pill = e.target.closest(".size-pill");
            if (!pill) return;
            document.querySelectorAll(".size-pill").forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            selectedSize = pill.dataset.size;
        });
    }

    // Color swatch selection
    const colorsGroup = document.querySelector("#colors-group");
    if (colorsGroup) {
        colorsGroup.addEventListener("click", (e) => {
            const swatch = e.target.closest(".color-swatch");
            if (!swatch) return;
            document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("active"));
            swatch.classList.add("active");
            selectedColor = swatch.dataset.color;
        });
    }

    // Favorite heart toggle
    const heartBtn = document.querySelector(".btn-heart-detail");
    if (heartBtn) {
        heartBtn.addEventListener("click", () => {
            let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
            const asin = currentProduct.asin;
            if (favorites.includes(asin)) {
                favorites = favorites.filter(f => f !== asin);
                heartBtn.classList.remove("active");
                heartBtn.querySelector("img").src = "../storage/img/heart.svg";
            } else {
                favorites.push(asin);
                heartBtn.classList.add("active");
                heartBtn.querySelector("img").src = "../storage/img/heartblack.svg";
            }
            localStorage.setItem("favorites", JSON.stringify(favorites));
        });
    }

    // Add to cart action
    const addToCartBtn = document.querySelector("#add__to__cart");
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", handleAddToCart);
    }
};

/**
 * Quantity stepper calculation
 */
const updateQuantity = (delta) => {
    const span_quantity = document.querySelector("#span_quantity");
    const price_discount = document.querySelector("#price_discount");
    const price_original = document.querySelector("#price_original");

    if (!span_quantity || !currentProduct) return;

    let newQty = selectedQuantity + delta;
    if (newQty < 1) newQty = 1;
    selectedQuantity = newQty;
    span_quantity.textContent = selectedQuantity;

    // Calculate total price
    const basePrice = parseFloat(String(currentProduct.product_price).replace('$', '')) || 0;
    const baseOriginal = parseFloat(String(currentProduct.product_original_price || 0).replace('$', '')) || 0;

    if (price_discount) {
        price_discount.textContent = `$${(basePrice * selectedQuantity).toFixed(2)}`;
    }
    if (price_original && baseOriginal > 0) {
        price_original.textContent = `$${(baseOriginal * selectedQuantity).toFixed(2)}`;
    }
};

/**
 * Handle Add to Cart with SweetAlert2 confirmation
 */
const handleAddToCart = () => {
    if (!currentProduct) return;

    const asin = currentProduct.asin;
    let existingItem = null;

    try {
        const stored = sessionStorage.getItem(asin);
        if (stored) existingItem = JSON.parse(stored);
    } catch (e) {
        existingItem = null;
    }

    const cleanPrice = String(currentProduct.product_price).replace(/^\$/, '');
    const cleanOriginal = currentProduct.product_original_price 
        ? String(currentProduct.product_original_price).replace(/^\$/, '') 
        : null;

    let totalQuantity = selectedQuantity;
    if (existingItem && existingItem.data) {
        totalQuantity = (parseInt(existingItem.data.quantity) || 1) + selectedQuantity;
    }

    const itemToStore = {
        status: "OK",
        request_id: "cart-" + Date.now(),
        data: {
            ...currentProduct,
            product_price: cleanPrice,
            product_original_price: cleanOriginal,
            quantity: totalQuantity,
            selectedSize,
            selectedColor
        }
    };

    sessionStorage.setItem(asin, JSON.stringify(itemToStore));

    // Show confirmation modal
    if (window.Swal) {
        Swal.fire({
            title: 'Added to Cart!',
            text: `${currentProduct.product_title} (${selectedQuantity}x) has been added to your shopping bag.`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#4F46E5',
            cancelButtonColor: '#64748B',
            confirmButtonText: 'Go to Checkout',
            cancelButtonText: 'Keep Shopping'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = './checkout.html';
            }
        });
    } else {
        alert(`Added ${selectedQuantity}x ${currentProduct.product_title} to your cart!`);
    }
};

/**
 * Carousel slide dots functionality
 */
const initSliderDots = () => {
    const slider = document.querySelector("#detail-slider");
    const dots = document.querySelectorAll(".slider-dot");
    if (!slider || dots.length <= 1) return;

    slider.addEventListener("scroll", () => {
        const scrollLeft = slider.scrollLeft;
        const itemWidth = slider.offsetWidth;
        const activeIndex = Math.round(scrollLeft / itemWidth);

        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === activeIndex);
        });
    });

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const idx = parseInt(dot.dataset.index);
            slider.scrollTo({
                left: idx * slider.offsetWidth,
                behavior: 'smooth'
            });
        });
    });
};