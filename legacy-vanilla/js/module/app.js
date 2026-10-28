import { mockCategories, mockProducts, delay } from "./mockData.js";

/**
 * Get all available categories
 */
export const getAllCategory = async () => {
    await delay(250);
    return {
        status: "OK",
        request_id: "req-cat-" + Date.now(),
        data: mockCategories
    };
};

/**
 * Get all products by search keyword
 */
export const getAllProductsName = async ({ search: text } = { search: "" }) => {
    await delay(350);
    const query = (text || "").toLowerCase().trim();
    
    let filtered = mockProducts;
    if (query && query !== "all") {
        filtered = mockProducts.filter(p => 
            p.product_title.toLowerCase().includes(query) ||
            p.product_subtitle.toLowerCase().includes(query) ||
            p.category_id.toLowerCase().includes(query) ||
            p.product_description.toLowerCase().includes(query)
        );
    }

    return {
        status: "OK",
        request_id: "req-search-" + Date.now(),
        data: {
            products: filtered
        }
    };
};

/**
 * Get all products by category and optional search keyword
 */
export const getAllProductsByCategory = async ({ search: text, id: idCategory }) => {
    await delay(350);
    const query = (text || "").toLowerCase().trim();
    const cat = (idCategory || "").toLowerCase().trim();

    let filtered = mockProducts;
    if (cat && cat !== "aps" && cat !== "all") {
        filtered = filtered.filter(p => p.category_id.toLowerCase() === cat);
    }
    if (query) {
        filtered = filtered.filter(p => 
            p.product_title.toLowerCase().includes(query) ||
            p.product_subtitle.toLowerCase().includes(query) ||
            p.product_description.toLowerCase().includes(query)
        );
    }

    return {
        status: "OK",
        request_id: "req-cat-prod-" + Date.now(),
        data: {
            products: filtered
        }
    };
};

/**
 * Get random / featured products
 */
export const getAllProductRandom = async ({
    query = "",
    category_id = "aps"
} = {}) => {
    await delay(350);
    let pool = [...mockProducts];
    if (category_id && category_id !== "aps") {
        pool = pool.filter(p => p.category_id === category_id);
    }
    // Shuffle array
    const shuffled = pool.sort(() => 0.5 - Math.random());
    return {
        status: "OK",
        request_id: "req-random-" + Date.now(),
        data: {
            products: shuffled
        }
    };
};