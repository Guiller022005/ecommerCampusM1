import { cardProductCheckout, billProductCheckout } from "./components/section.js";
import { checkoutSkeleton } from "./components/skeleton.js";

const checkout__details = document.querySelector(".checkout__details");
const bill__section = document.querySelector(".section__bill");
const payButton = document.querySelector("#btn-pay") || document.querySelector(".footer__ul li a");

let cartItems = [];
let shippingFee = 0.00;

/**
 * Load cart items from sessionStorage
 */
const getCartItemsFromStorage = () => {
    const items = [];
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        try {
            const raw = sessionStorage.getItem(key);
            const parsed = JSON.parse(raw);
            if (parsed && (parsed.asin || parsed.data?.asin)) {
                items.push(parsed);
            }
        } catch (e) {
            // Ignore non-json keys
        }
    }
    return items;
};

/**
 * Render checkout screen with skeletons
 */
const renderCheckout = async () => {
    // 1. Show skeletons
    checkout__details.innerHTML = checkoutSkeleton(2);
    
    // Slight simulated delay for smooth feel
    await new Promise(r => setTimeout(r, 220));

    cartItems = getCartItemsFromStorage();
    checkout__details.innerHTML = await cardProductCheckout(cartItems);

    attachCartEvents();
    updateBill();
};

/**
 * Attach events for quantity increment, decrement, and delete
 */
const attachCartEvents = () => {
    const incrementButtons = document.querySelectorAll(".counter-button.increment");
    const decrementButtons = document.querySelectorAll(".counter-button.decrement");
    const deleteButtons = document.querySelectorAll(".btn-delete-item");

    incrementButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const asin = btn.dataset.asin;
            modifyItemQuantity(asin, 1);
        });
    });

    decrementButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const asin = btn.dataset.asin;
            modifyItemQuantity(asin, -1);
        });
    });

    deleteButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const asin = btn.dataset.asin;
            deleteCartItem(asin);
        });
    });
};

/**
 * Increment or decrement item quantity
 */
const modifyItemQuantity = (asin, delta) => {
    const stored = sessionStorage.getItem(asin);
    if (!stored) return;

    try {
        const parsed = JSON.parse(stored);
        const info = parsed.data || parsed;
        let qty = parseInt(info.quantity) || 1;
        qty += delta;

        if (qty <= 0) {
            deleteCartItem(asin);
            return;
        }

        info.quantity = qty;
        sessionStorage.setItem(asin, JSON.stringify(parsed));
        
        // Update DOM element
        const card = document.querySelector(`.details__product[data-asin="${asin}"]`);
        if (card) {
            const counterSpan = card.querySelector(".counter__value");
            const unitPriceSpan = card.querySelector(".unit-price");
            const price = parseFloat(unitPriceSpan.getAttribute("data-price")) || 0;

            if (counterSpan) counterSpan.textContent = qty;
            if (unitPriceSpan) unitPriceSpan.textContent = `$${(price * qty).toFixed(2)}`;
        }

        updateBill();
    } catch (e) {
        console.error("Error modifying quantity:", e);
    }
};

/**
 * Remove an item from the cart
 */
const deleteCartItem = (asin) => {
    sessionStorage.removeItem(asin);
    
    // Animate removal
    const card = document.querySelector(`.details__product[data-asin="${asin}"]`);
    if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';
        card.style.transition = 'all 0.25s ease';
        setTimeout(() => {
            renderCheckout();
        }, 250);
    } else {
        renderCheckout();
    }
};

/**
 * Recalculate and update billing summary
 */
const updateBill = async () => {
    let totalItems = 0;
    let totalPrice = 0;

    const cards = document.querySelectorAll(".details__product");
    cards.forEach(card => {
        const counterSpan = card.querySelector(".counter__value");
        const unitPriceSpan = card.querySelector(".unit-price");
        if (counterSpan && unitPriceSpan) {
            const count = parseInt(counterSpan.textContent) || 0;
            const price = parseFloat(unitPriceSpan.getAttribute("data-price")) || 0;
            totalItems += count;
            totalPrice += count * price;
        }
    });

    shippingFee = (totalPrice > 0 && totalPrice < 150) ? 9.99 : 0.00;
    bill__section.innerHTML = await billProductCheckout(totalItems, totalPrice, shippingFee);
};

/**
 * Setup Payment Method dropdown interaction
 */
const setupPaymentDropdown = () => {
    const dropdown = document.querySelector(".dropdown");
    const dropdownButton = document.querySelector(".dropdown__button");
    const dropdownContent = document.querySelector(".dropdown__content");
    const options = document.querySelectorAll(".dropdown__content .shopping__card");

    if (!dropdownButton || !dropdownContent) return;

    dropdownButton.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownContent.classList.toggle("open");
    });

    options.forEach(option => {
        option.addEventListener("click", () => {
            const selectedLabel = option.querySelector("label")?.textContent || "**** 2143";
            const mainLabel = dropdownButton.querySelector(".shopping__card label");
            if (mainLabel) mainLabel.textContent = selectedLabel;
            dropdownContent.classList.remove("open");
        });
    });

    document.addEventListener("click", () => {
        dropdownContent.classList.remove("open");
    });
};

/**
 * Handle Order Payment simulation
 */
const setupPayButton = () => {
    if (!payButton) return;

    payButton.addEventListener("click", async (e) => {
        e.preventDefault();
        
        cartItems = getCartItemsFromStorage();
        if (cartItems.length === 0) {
            if (window.Swal) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Empty Cart',
                    text: 'Please add products to your cart before proceeding to payment.',
                    confirmButtonColor: '#4F46E5'
                });
            } else {
                alert("Your cart is empty!");
            }
            return;
        }

        // Show loading spinner on pay button
        const originalText = payButton.innerHTML;
        payButton.classList.add("btn-loading");
        payButton.innerHTML = `
            <span class="spinner-inline"></span>
            <span>Processing Order...</span>
        `;

        // Simulate payment processing time
        await new Promise(r => setTimeout(r, 1200));

        const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
        
        // Clear cart
        sessionStorage.clear();

        // Restore button
        payButton.classList.remove("btn-loading");
        payButton.innerHTML = originalText;

        if (window.Swal) {
            Swal.fire({
                icon: 'success',
                title: 'Order Confirmed!',
                html: `
                    <p style="margin-bottom: 8px;">Thank you for shopping with Campus Store.</p>
                    <div style="background: #F1F5F9; padding: 12px; border-radius: 8px; font-weight: 600; color: #0F172A;">
                        Order Ref: <strong>#${orderId}</strong>
                    </div>
                    <small style="display:block; margin-top: 10px; color: #64748B;">A confirmation receipt has been simulated.</small>
                `,
                confirmButtonColor: '#4F46E5',
                confirmButtonText: 'Return to Store'
            }).then(() => {
                window.location.href = '../index.html';
            });
        } else {
            alert(`Payment Successful! Order Ref: #${orderId}`);
            window.location.href = '../index.html';
        }
    });
};

// Initialize
addEventListener("DOMContentLoaded", () => {
    renderCheckout();
    setupPaymentDropdown();
    setupPayButton();
});
