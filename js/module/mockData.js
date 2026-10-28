/**
 * Mock Database & Seed Engine for Campuslands M1 Ecommerce
 * Replaces discontinued/rate-limited RapidAPI with reliable, offline-first data
 * Fully synchronized with database/ecommerce.sql
 */

export const mockCategories = [
    { id: "aps", name: "All Items", icon: "categoryHover.svg" },
    { id: "fashion", name: "Fashion & Apparel", icon: "mask.svg" },
    { id: "shoes", name: "Shoes & Sneakers", icon: "categoryHover.svg" },
    { id: "watches", name: "Watches & Jewelry", icon: "watch.svg" },
    { id: "hats", name: "Hats & Headwear", icon: "hat.svg" },
    { id: "bags", name: "Bags & Backpacks", icon: "bag.svg" }
];

export const mockProducts = [
    {
        asin: "B099RPBTDT",
        product_title: "Bruno Marc Casual Dress Sneakers",
        product_subtitle: "Modern Urban Footwear",
        category_id: "shoes",
        product_price: "$37.99",
        product_original_price: "$59.99",
        product_star_rating: "4.8",
        product_num_ratings: 9537,
        product_url: "#",
        product_photo: "storage/img/img1.svg",
        product_photos: [
            "storage/img/img1.svg",
            "storage/img/img2.svg",
            "storage/img/img3.svg"
        ],
        product_description: "Designed for comfort and effortless modern style. Features lightweight breathable mesh lining with high-resilience EVA sole for all-day comfort and stability in any urban setting.",
        sizes: ["8.0", "8.5", "9.0", "9.5", "10.0"],
        colors: ["#111827", "#4F46E5", "#64748B"],
        is_best_seller: true
    },
    {
        asin: "B0FBX16P2H",
        product_title: "Nike Air Max Excee Running Edition",
        product_subtitle: "High Performance Sport",
        category_id: "shoes",
        product_price: "$99.99",
        product_original_price: "$120.00",
        product_star_rating: "4.9",
        product_num_ratings: 3914,
        product_url: "#",
        product_photo: "storage/img/img2.svg",
        product_photos: [
            "storage/img/img2.svg",
            "storage/img/img1.svg",
            "storage/img/img4.svg"
        ],
        product_description: "Inspired by the iconic Air Max 90, these shoes celebrate a classic through a fresh lens. Visible Air unit delivers lightweight cushioning with durable synthetic leather overlays.",
        sizes: ["8.5", "9.0", "10.0", "10.5"],
        colors: ["#1E293B", "#EF4444", "#3B82F6"],
        is_best_seller: true
    },
    {
        asin: "B0CJT2FDYR",
        product_title: "Under Armour Lockdown Pro 7",
        product_subtitle: "Basketball & Streetwear",
        category_id: "shoes",
        product_price: "$49.99",
        product_original_price: "$75.00",
        product_star_rating: "4.6",
        product_num_ratings: 5078,
        product_url: "#",
        product_photo: "storage/img/img4.svg",
        product_photos: [
            "storage/img/img4.svg",
            "storage/img/img1.svg",
            "storage/img/img2.svg"
        ],
        product_description: "Breathable mesh upper with synthetic overlays for added structure. Plush collar foam and responsive EVA midsole to absorb impact with durable solid rubber herringbone outsole.",
        sizes: ["7.5", "8.5", "9.5", "10.5", "11.0"],
        colors: ["#0F172A", "#6366F1"],
        is_best_seller: false
    },
    {
        asin: "B0DR8W6BM1",
        product_title: "Modern Minimalist Oversized Trench",
        product_subtitle: "Dress Modern Everyday",
        category_id: "fashion",
        product_price: "$89.99",
        product_original_price: "$145.00",
        product_star_rating: "4.7",
        product_num_ratings: 1167,
        product_url: "#",
        product_photo: "storage/img/img3.svg",
        product_photos: [
            "storage/img/img3.svg",
            "storage/img/img5.svg",
            "storage/img/chekoutima1.svg"
        ],
        product_description: "Crafted from premium water-repellent cotton blend. Features double-breasted closure, storm flap, tailored lapels, and comfortable relaxed silhouette for all seasons.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#1E293B", "#D97706", "#475569"],
        is_best_seller: true
    },
    {
        asin: "B0G1NLDWJ9",
        product_title: "Nordic Linen Casual Overshirt",
        product_subtitle: "Relaxed Contemporary",
        category_id: "fashion",
        product_price: "$59.90",
        product_original_price: "$89.90",
        product_star_rating: "4.5",
        product_num_ratings: 663,
        product_url: "#",
        product_photo: "storage/img/img5.svg",
        product_photos: [
            "storage/img/img5.svg",
            "storage/img/img3.svg",
            "storage/img/chekoutima1.svg"
        ],
        product_description: "100% natural breathable European linen with buttoned cuffs and dual chest pockets. Ideal layering piece for casual weekends or modern office attire.",
        sizes: ["S", "M", "L"],
        colors: ["#F1F5F9", "#0F172A", "#10B981"],
        is_best_seller: false
    },
    {
        asin: "B0F2B732TB",
        product_title: "Adidas Vintage Streetwear Hoodie",
        product_subtitle: "Cozy Essential Fleece",
        category_id: "fashion",
        product_price: "$69.95",
        product_original_price: "$95.00",
        product_star_rating: "4.8",
        product_num_ratings: 1297,
        product_url: "#",
        product_photo: "storage/img/chekoutima1.svg",
        product_photos: [
            "storage/img/chekoutima1.svg",
            "storage/img/img5.svg",
            "storage/img/img3.svg"
        ],
        product_description: "Heavyweight cotton-poly fleece blend with ribbed cuffs and hem. Features clean embroidered minimalist logo and adjustable double-layered hood.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["#18181B", "#64748B", "#4F46E5"],
        is_best_seller: true
    },
    {
        asin: "B0BX3WHZ8R",
        product_title: "Minimalist Chronograph Obsidian Watch",
        product_subtitle: "Luxury Precision Timepiece",
        category_id: "watches",
        product_price: "$149.00",
        product_original_price: "$210.00",
        product_star_rating: "4.9",
        product_num_ratings: 2874,
        product_url: "#",
        product_photo: "storage/img/checkout ima2.svg",
        product_photos: [
            "storage/img/checkout ima2.svg",
            "storage/img/img2.svg"
        ],
        product_description: "Sleek matte black 42mm stainless steel case, Japanese quartz movement, scratch-resistant sapphire crystal glass, and genuine Italian leather quick-release strap.",
        sizes: ["One Size"],
        colors: ["#000000", "#D97706", "#94A3B8"],
        is_best_seller: true
    },
    {
        asin: "B09H3N1R73",
        product_title: "Classic Heritage Panama Wool Fedora",
        product_subtitle: "Timeless Handcrafted Hat",
        category_id: "hats",
        product_price: "$42.50",
        product_original_price: "$65.00",
        product_star_rating: "4.6",
        product_num_ratings: 840,
        product_url: "#",
        product_photo: "storage/img/chekout ima3.svg",
        product_photos: [
            "storage/img/chekout ima3.svg",
            "storage/img/img1.svg"
        ],
        product_description: "100% premium Australian wool felt fedora featuring an authentic leather band and interior moisture-wicking sweatband. UPF 50+ sun protection.",
        sizes: ["M (57cm)", "L (59cm)", "XL (61cm)"],
        colors: ["#334155", "#B45309"],
        is_best_seller: false
    },
    {
        asin: "B0G2RGW6YB",
        product_title: "Urban Commuter Waterproof Backpack",
        product_subtitle: "Smart Modular Travel",
        category_id: "bags",
        product_price: "$78.50",
        product_original_price: "$110.00",
        product_star_rating: "4.9",
        product_num_ratings: 3120,
        product_url: "#",
        product_photo: "storage/img/bag.svg",
        product_photos: [
            "storage/img/bag.svg",
            "storage/img/img3.svg"
        ],
        product_description: "Ergonomic water-resistant Oxford fabric with padded 16-inch laptop compartment, hidden anti-theft back pocket, and integrated USB charging port.",
        sizes: ["Standard 22L"],
        colors: ["#0F172A", "#475569"],
        is_best_seller: true
    }
];

/**
 * Resolves an image path correctly whether requested from root or views/
 */
export const resolveImagePath = (path, isSubdir = false) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const clean = path.replace(/^\.\.\//, '').replace(/^\.\//, '');
    return isSubdir ? `../${clean}` : clean;
};

/**
 * Helper to simulate network latency for realistic skeleton loaders
 */
export const delay = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms));
