import { cardProductCheckout, billProductCheckout } from "./components/section.js";

let sessionStorageValues = Object.values(sessionStorage);
console.log(sessionStorageValues);

let checkout__details = document.querySelector(".checkout__details");
let bill__section = document.querySelector(".section__bill");

addEventListener("DOMContentLoaded", async (e) => {
    checkout__details.innerHTML = await cardProductCheckout(sessionStorageValues);



    let incrementButtons = document.querySelectorAll(".increment");
    let decrementButtons = document.querySelectorAll(".decrement");
    let counterValues = document.querySelectorAll(".counter__value");
    let totalPriceElements = document.querySelectorAll(".total-price");
    let unitPriceElements = document.querySelectorAll(".unit-price");

    updateBillSection();

    incrementButtons.forEach((incrementButton, index) => {
        let counterValue = counterValues[index];
        let totalPriceElement = totalPriceElements[index];
        let unitPrice = parseFloat(unitPriceElements[index].getAttribute('data-price'));

        incrementButton.addEventListener("click", (e) => {
            let currentValue = parseInt(counterValue.textContent);
            e.preventDefault(); 
            counterValue.textContent = currentValue + 1;
            totalPriceElement.textContent = `${(unitPrice * (currentValue + 1)).toFixed(2)}`;
            updateBillSection();
            sessionStorageValues.forEach(element => {
                if (element !== null && typeof element === 'string') {
                    const data = JSON.parse(element);
                    let info = data.data;
                    if (data.status === 'OK' && data.request_id && info){
                        console.log(info);
                        info.quantity = currentValue;
                        sessionStorage.setItem(info.asin,JSON.stringify(info));
                    }
                }
            });
        });
    });

    decrementButtons.forEach((decrementButton, index) => {
        let counterValue = counterValues[index];
        let totalPriceElement = totalPriceElements[index];
        let unitPrice = parseFloat(unitPriceElements[index].getAttribute('data-price'));

        decrementButton.addEventListener("click", (e) => {
            e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            let currentValue = parseInt(counterValue.textContent);
            if (currentValue > 1) {
                counterValue.textContent = currentValue - 1;
                totalPriceElement.textContent = `$${(unitPrice * (currentValue - 1)).toFixed(2)}`;
                updateBillSection();
            }
        });
    });
});


// Función para actualizar la sección de la factura
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