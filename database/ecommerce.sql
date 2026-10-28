-- =======================================================
-- Ecommerce Campuslands M1 - Database Schema & Initial Seed
-- Compatible with MySQL 8.0+, PostgreSQL 14+, and SQLite 3
-- =======================================================

-- 1. Table: Categories
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(100),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: Products
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY, -- ASIN or unique product code
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(150),
    description TEXT,
    category_id VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    currency VARCHAR(10) DEFAULT 'USD',
    star_rating DECIMAL(2, 1) DEFAULT 5.0,
    num_ratings INT DEFAULT 0,
    main_photo VARCHAR(500) NOT NULL,
    is_best_seller BOOLEAN DEFAULT FALSE,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 3. Table: Product Photos (Gallery)
CREATE TABLE IF NOT EXISTS product_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    photo_url VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 4. Table: Product Variations (Sizes & Colors)
CREATE TABLE IF NOT EXISTS product_variations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    variation_type VARCHAR(20) NOT NULL, -- 'SIZE' or 'COLOR'
    variation_value VARCHAR(50) NOT NULL, -- e.g., 'S', 'M', 'L', 'XL' or '#1E293B'
    stock_quantity INT DEFAULT 50,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 5. Table: Customers
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Table: Orders
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_fee DECIMAL(10, 2) DEFAULT 0.00,
    payment_method VARCHAR(50) DEFAULT 'Credit Card (Visa)',
    status VARCHAR(30) DEFAULT 'COMPLETED', -- PENDING, COMPLETED, CANCELLED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- 7. Table: Order Items
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    selected_size VARCHAR(20),
    selected_color VARCHAR(50),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- =======================================================
-- SEED DATA: Categories
-- =======================================================
INSERT INTO categories (id, name, icon, display_order) VALUES
('aps', 'All Items', 'categoryHover.svg', 1),
('fashion', 'Fashion & Apparel', 'mask.svg', 2),
('shoes', 'Shoes & Sneakers', 'categoryHover.svg', 3),
('watches', 'Watches & Jewelry', 'watch.svg', 4),
('hats', 'Hats & Headwear', 'hat.svg', 5),
('bags', 'Bags & Luggage', 'bag.svg', 6);

-- =======================================================
-- SEED DATA: Customers
-- =======================================================
INSERT INTO customers (id, full_name, email, avatar_url) VALUES
('usr_001', 'Guillermo Paúl', 'guillermo.paul@campuslands.edu', 'storage/img/myphoto.png');

-- =======================================================
-- SEED DATA: Products
-- =======================================================
INSERT INTO products (id, title, subtitle, description, category_id, price, original_price, star_rating, num_ratings, main_photo, is_best_seller) VALUES
('B099RPBTDT', 'Bruno Marc Casual Dress Sneakers', 'Modern Urban Footwear', 'Designed for comfort and effortless modern style. Lightweight breathable mesh lining with high-resilience EVA sole for all-day comfort and stability in any urban setting.', 'shoes', 37.99, 59.99, 4.8, 9537, 'storage/img/img1.svg', TRUE),
('B0FBX16P2H', 'Nike Air Max Excee Running Edition', 'High Performance Sport', 'Inspired by the iconic Air Max 90, these shoes celebrate a classic through a fresh lens. Visible Air unit delivers lightweight cushioning with durable synthetic leather overlays.', 'shoes', 99.99, 120.00, 4.9, 3914, 'storage/img/img2.svg', TRUE),
('B0CJT2FDYR', 'Under Armour Lockdown Pro 7', 'Basketball & Streetwear', 'Breathable mesh upper with synthetic overlays for added structure. Plush collar foam and responsive EVA midsole to absorb impact with durable solid rubber herringbone outsole.', 'shoes', 49.99, 75.00, 4.6, 5078, 'storage/img/img4.svg', FALSE),
('B0DR8W6BM1', 'Modern Minimalist Oversized Trench', 'Dress Modern Everyday', 'Crafted from premium water-repellent cotton blend. Features double-breasted closure, storm flap, tailored lapels, and comfortable relaxed silhouette for all seasons.', 'fashion', 89.99, 145.00, 4.7, 1167, 'storage/img/img3.svg', TRUE),
('B0G1NLDWJ9', 'Nordic Linen Casual Overshirt', 'Relaxed Contemporary', '100% natural breathable European linen with buttoned cuffs and dual chest pockets. Ideal layering piece for casual weekends or modern office attire.', 'fashion', 59.90, 89.90, 4.5, 663, 'storage/img/img5.svg', FALSE),
('B0F2B732TB', 'Adidas Vintage Streetwear Hoodie', 'Cozy Essential Fleece', 'Heavyweight cotton-poly fleece blend with ribbed cuffs and hem. Features clean embroidered minimalist logo and adjustable double-layered hood.', 'fashion', 69.95, 95.00, 4.8, 1297, 'storage/img/chekoutima1.svg', TRUE),
('B0BX3WHZ8R', 'Minimalist Chronograph Obsidian Watch', 'Luxury Precision Timepiece', 'Sleek matte black 42mm stainless steel case, Japanese quartz movement, scratch-resistant sapphire crystal glass, and genuine Italian leather quick-release strap.', 'watches', 149.00, 210.00, 4.9, 2874, 'storage/img/checkout ima2.svg', TRUE),
('B09H3N1R73', 'Classic Heritage Panama Wool Fedora', 'Timeless Handcrafted Hat', '100% premium Australian wool felt fedora featuring an authentic leather band and interior moisture-wicking sweatband. UPF 50+ sun protection.', 'hats', 42.50, 65.00, 4.6, 840, 'storage/img/chekout ima3.svg', FALSE),
('B0G2RGW6YB', 'Urban Commuter Waterproof Backpack', 'Smart Modular Travel', 'Ergonomic water-resistant Oxford fabric with padded 16-inch laptop compartment, hidden anti-theft back pocket, and integrated USB charging port.', 'bags', 78.50, 110.00, 4.9, 3120, 'storage/img/bag.svg', TRUE);

-- =======================================================
-- SEED DATA: Product Photos Gallery
-- =======================================================
INSERT INTO product_photos (product_id, photo_url, display_order) VALUES
('B099RPBTDT', 'storage/img/img1.svg', 1),
('B099RPBTDT', 'storage/img/img2.svg', 2),
('B099RPBTDT', 'storage/img/img3.svg', 3),
('B0FBX16P2H', 'storage/img/img2.svg', 1),
('B0FBX16P2H', 'storage/img/img1.svg', 2),
('B0FBX16P2H', 'storage/img/img4.svg', 3),
('B0DR8W6BM1', 'storage/img/img3.svg', 1),
('B0DR8W6BM1', 'storage/img/img5.svg', 2),
('B0DR8W6BM1', 'storage/img/chekoutima1.svg', 3),
('B0CJT2FDYR', 'storage/img/img4.svg', 1),
('B0CJT2FDYR', 'storage/img/img1.svg', 2),
('B0G1NLDWJ9', 'storage/img/img5.svg', 1),
('B0G1NLDWJ9', 'storage/img/img3.svg', 2),
('B0F2B732TB', 'storage/img/chekoutima1.svg', 1),
('B0F2B732TB', 'storage/img/img5.svg', 2),
('B0BX3WHZ8R', 'storage/img/checkout ima2.svg', 1),
('B0BX3WHZ8R', 'storage/img/img2.svg', 2),
('B09H3N1R73', 'storage/img/chekout ima3.svg', 1),
('B0G2RGW6YB', 'storage/img/bag.svg', 1);

-- =======================================================
-- SEED DATA: Variations (Sizes & Colors)
-- =======================================================
INSERT INTO product_variations (product_id, variation_type, variation_value, stock_quantity) VALUES
('B0DR8W6BM1', 'SIZE', 'S', 20),
('B0DR8W6BM1', 'SIZE', 'M', 35),
('B0DR8W6BM1', 'SIZE', 'L', 25),
('B0DR8W6BM1', 'SIZE', 'XL', 10),
('B0DR8W6BM1', 'COLOR', '#1E293B', 30),
('B0DR8W6BM1', 'COLOR', '#D97706', 25),
('B0DR8W6BM1', 'COLOR', '#475569', 35),
('B0FBX16P2H', 'SIZE', '8.5', 15),
('B0FBX16P2H', 'SIZE', '9.0', 20),
('B0FBX16P2H', 'SIZE', '10.0', 30),
('B0FBX16P2H', 'COLOR', '#111827', 40),
('B0FBX16P2H', 'COLOR', '#4F46E5', 25);

-- =======================================================
-- USEFUL BUSINESS QUERIES
-- =======================================================
-- 1. Get all featured products with category name
-- SELECT p.*, c.name AS category_name FROM products p JOIN categories c ON p.category_id = c.id ORDER BY p.star_rating DESC;

-- 2. Filter products by category and search keyword
-- SELECT * FROM products WHERE (category_id = 'fashion' OR 'fashion' = 'aps') AND (LOWER(title) LIKE '%modern%' OR LOWER(description) LIKE '%modern%');

-- 3. Calculate order total with items
-- SELECT o.id, o.created_at, SUM(oi.quantity * oi.unit_price) + o.shipping_fee AS final_total FROM orders o JOIN order_items oi ON o.id = oi.order_id GROUP BY o.id;
