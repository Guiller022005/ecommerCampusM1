import { cardProductCheckout, billProductCheckout } from "./components/section.js";

let sessionStorageValues = Object.values(sessionStorage);

let checkout__details = document.querySelector(".checkout__details");
let bill__section = document.querySelector(".section__bill");

addEventListener("DOMContentLoaded", async (e) => {
    checkout__details.innerHTML = await cardProductCheckout(sessionStorageValues);

    let incrementButtons = document.querySelectorAll(".increment");
    let decrementButtons = document.querySelectorAll(".decrement");
    let counterValues = document.querySelectorAll(".counter__value");
    let unitPriceElements = document.querySelectorAll(".unit-price");

    updateBillSection();

    incrementButtons.forEach((incrementButton, index) => {
        let counterValue = counterValues[index];
        let unitPrice = parseFloat(unitPriceElements[index].getAttribute('data-price'));

        incrementButton.addEventListener("click", (e) => {
            e.preventDefault();
            let currentValue = parseInt(counterValue.textContent);
            counterValue.textContent = currentValue + 1;
            updateItemPrice(counterValue, unitPrice);
            updateBillSection();
            updateSessionStorage(counterValue, index);
        });
    });

    decrementButtons.forEach((decrementButton, index) => {
        let counterValue = counterValues[index];
        let unitPrice = parseFloat(unitPriceElements[index].getAttribute('data-price'));

        decrementButton.addEventListener("click", (e) => {
            e.preventDefault();
            let currentValue = parseInt(counterValue.textContent);
            if (currentValue > 1) {
                counterValue.textContent = currentValue - 1;
                updateItemPrice(counterValue, unitPrice);
                updateBillSection();
                updateSessionStorage(counterValue, index);
            }
        });
    });
});

const updateItemPrice = (counterValue, unitPrice) => {
    let totalPriceElement = counterValue.closest('.details__product').querySelector('.unit-price');
    let currentValue = parseInt(counterValue.textContent);
    totalPriceElement.textContent = `$${(unitPrice * currentValue).toFixed(2)}`;
};

const updateBillSection = async () => {
    let totalItems = 0;
    let totalPrice = 0;

    let counterValues = document.querySelectorAll(".counter__value");
    let unitPriceElements = document.querySelectorAll(".unit-price");

    counterValues.forEach((counterValue, index) => {
        let count = parseInt(counterValue.textContent);
        let unitPrice = parseFloat(unitPriceElements[index].getAttribute('data-price'));

        totalItems += count;
        totalPrice += count * unitPrice;
    });

    bill__section.innerHTML = await billProductCheckout(totalItems, totalPrice);
};

const updateSessionStorage = (counterValue, index) => {
    let currentValue = parseInt(counterValue.textContent);
    let sessionStorageValues = Object.values(sessionStorage);
    sessionStorageValues.forEach((element) => {
        if (element !== null && typeof element === 'string') {
            const data = JSON.parse(element);
            let info = data.data;
            if (data.status === 'OK' && data.request_id && info) {
                info.quantity = currentValue;
                sessionStorage.setItem(info.asin, JSON.stringify(data));
            }
        }
    });
};
document.addEventListener("DOMContentLoaded", () => {
    let backButton = document.querySelector("a[href='../index.html']");

    backButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevenir la acción por defecto

        window.location.href = '../index.html'; // Redirigir al menú principal
    });
});
document.addEventListener("DOMContentLoaded", async () => {
    // Contar productos iniciales en sessionStorage
    let productCount = Object.keys(sessionStorage).length;

    // Actualizar el contador de productos en el footer
    const footerCartCounter = document.querySelector('.cart-counter');
    if (footerCartCounter) {
        footerCartCounter.textContent = productCount.toString();
    }
});
