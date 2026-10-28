import { mockProducts, delay } from "./mockData.js";

/**
 * Get product details by ASIN / ID
 * Supports both { id: "..." } and string ID arguments
 */
export const getProductId = async (param) => {
    await delay(300);
    const id = typeof param === "object" && param !== null ? (param.id || param.asin) : param;
    
    // Find matching product in mock database
    const product = mockProducts.find(p => p.asin === id) || mockProducts[0];

    return {
        status: "OK",
        request_id: "req-detail-" + Date.now(),
        data: {
            ...product,
            about_product: [product.product_description],
            product_details: {
                "Brand": product.product_title.split(" ")[0],
                "Category": product.category_id,
                "In Stock": "Yes"
            }
        }
    };
};