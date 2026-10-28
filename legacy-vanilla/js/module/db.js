/**
 * IndexedDB & Local Storage Helper Utility
 */

export const initDB = () => {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            console.warn("IndexedDB not supported, falling back to localStorage");
            resolve(null);
            return;
        }

        const request = indexedDB.open("ecommerce_db", 1);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains("cart")) {
                db.createObjectStore("cart", { keyPath: "asin" });
            }
            if (!db.objectStoreNames.contains("favorites")) {
                db.createObjectStore("favorites", { keyPath: "asin" });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
    });
};