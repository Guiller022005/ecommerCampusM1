import { createClient } from '@supabase/supabase-js';
import type { Category, Product, CartItem, Order } from '../types';

// Read environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Built-in Mock Data matching database/ecommerce.sql exactly
export const initialCategories: Category[] = [
  { id: 'aps', name: 'All Items', icon: 'grid', display_order: 1 },
  { id: 'fashion', name: 'Fashion & Apparel', icon: 'shirt', display_order: 2 },
  { id: 'shoes', name: 'Shoes & Sneakers', icon: 'footprints', display_order: 3 },
  { id: 'watches', name: 'Watches & Jewelry', icon: 'watch', display_order: 4 },
  { id: 'hats', name: 'Hats & Headwear', icon: 'hard-hat', display_order: 5 },
  { id: 'bags', name: 'Bags & Backpacks', icon: 'briefcase', display_order: 6 },
];

export const initialProducts: Product[] = [
  {
    id: 'B099RPBTDT',
    asin: 'B099RPBTDT',
    title: 'Bruno Marc Casual Dress Sneakers',
    subtitle: 'Modern Urban Footwear',
    category_id: 'shoes',
    price: 37.99,
    original_price: 59.99,
    currency: 'USD',
    star_rating: 4.8,
    num_ratings: 9537,
    main_photo: '/storage/img/img1.svg',
    photos: [
      '/storage/img/img1.svg',
      '/storage/img/img2.svg',
      '/storage/img/img3.svg',
    ],
    description:
      'Designed for comfort and effortless modern style. Lightweight breathable mesh lining with high-resilience EVA sole for all-day comfort and stability in any urban setting.',
    sizes: ['8.0', '8.5', '9.0', '9.5', '10.0'],
    colors: ['#111827', '#4F46E5', '#64748B'],
    is_best_seller: true,
    in_stock: true,
  },
  {
    id: 'B0FBX16P2H',
    asin: 'B0FBX16P2H',
    title: 'Nike Air Max Excee Running Edition',
    subtitle: 'High Performance Sport',
    category_id: 'shoes',
    price: 99.99,
    original_price: 120.0,
    currency: 'USD',
    star_rating: 4.9,
    num_ratings: 3914,
    main_photo: '/storage/img/img2.svg',
    photos: [
      '/storage/img/img2.svg',
      '/storage/img/img1.svg',
      '/storage/img/img4.svg',
    ],
    description:
      'Inspired by the iconic Air Max 90, these shoes celebrate a classic through a fresh lens. Visible Air unit delivers lightweight cushioning with durable synthetic leather overlays.',
    sizes: ['8.5', '9.0', '10.0', '10.5'],
    colors: ['#1E293B', '#EF4444', '#3B82F6'],
    is_best_seller: true,
    in_stock: true,
  },
  {
    id: 'B0CJT2FDYR',
    asin: 'B0CJT2FDYR',
    title: 'Under Armour Lockdown Pro 7',
    subtitle: 'Basketball & Streetwear',
    category_id: 'shoes',
    price: 49.99,
    original_price: 75.0,
    currency: 'USD',
    star_rating: 4.6,
    num_ratings: 5078,
    main_photo: '/storage/img/img4.svg',
    photos: [
      '/storage/img/img4.svg',
      '/storage/img/img1.svg',
      '/storage/img/img2.svg',
    ],
    description:
      'Breathable mesh upper with synthetic overlays for added structure. Plush collar foam and responsive EVA midsole to absorb impact with durable solid rubber herringbone outsole.',
    sizes: ['7.5', '8.5', '9.5', '10.5', '11.0'],
    colors: ['#0F172A', '#6366F1'],
    is_best_seller: false,
    in_stock: true,
  },
  {
    id: 'B0DR8W6BM1',
    asin: 'B0DR8W6BM1',
    title: 'Modern Minimalist Oversized Trench',
    subtitle: 'Dress Modern Everyday',
    category_id: 'fashion',
    price: 89.99,
    original_price: 145.0,
    currency: 'USD',
    star_rating: 4.7,
    num_ratings: 1167,
    main_photo: '/storage/img/img3.svg',
    photos: [
      '/storage/img/img3.svg',
      '/storage/img/img5.svg',
      '/storage/img/chekoutima1.svg',
    ],
    description:
      'Crafted from premium water-repellent cotton blend. Features double-breasted closure, storm flap, tailored lapels, and comfortable relaxed silhouette for all seasons.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#1E293B', '#D97706', '#475569'],
    is_best_seller: true,
    in_stock: true,
  },
  {
    id: 'B0G1NLDWJ9',
    asin: 'B0G1NLDWJ9',
    title: 'Nordic Linen Casual Overshirt',
    subtitle: 'Relaxed Contemporary',
    category_id: 'fashion',
    price: 59.9,
    original_price: 89.9,
    currency: 'USD',
    star_rating: 4.5,
    num_ratings: 663,
    main_photo: '/storage/img/img5.svg',
    photos: [
      '/storage/img/img5.svg',
      '/storage/img/img3.svg',
      '/storage/img/chekoutima1.svg',
    ],
    description:
      '100% natural breathable European linen with buttoned cuffs and dual chest pockets. Ideal layering piece for casual weekends or modern office attire.',
    sizes: ['S', 'M', 'L'],
    colors: ['#F1F5F9', '#0F172A', '#10B981'],
    is_best_seller: false,
    in_stock: true,
  },
  {
    id: 'B0F2B732TB',
    asin: 'B0F2B732TB',
    title: 'Adidas Vintage Streetwear Hoodie',
    subtitle: 'Cozy Essential Fleece',
    category_id: 'fashion',
    price: 69.95,
    original_price: 95.0,
    currency: 'USD',
    star_rating: 4.8,
    num_ratings: 1297,
    main_photo: '/storage/img/chekoutima1.svg',
    photos: [
      '/storage/img/chekoutima1.svg',
      '/storage/img/img5.svg',
      '/storage/img/img3.svg',
    ],
    description:
      'Heavyweight cotton-poly fleece blend with ribbed cuffs and hem. Features clean embroidered minimalist logo and adjustable double-layered hood.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#18181B', '#64748B', '#4F46E5'],
    is_best_seller: true,
    in_stock: true,
  },
  {
    id: 'B0BX3WHZ8R',
    asin: 'B0BX3WHZ8R',
    title: 'Minimalist Chronograph Obsidian Watch',
    subtitle: 'Luxury Precision Timepiece',
    category_id: 'watches',
    price: 149.0,
    original_price: 210.0,
    currency: 'USD',
    star_rating: 4.9,
    num_ratings: 2874,
    main_photo: '/storage/img/checkout ima2.svg',
    photos: [
      '/storage/img/checkout ima2.svg',
      '/storage/img/img2.svg',
    ],
    description:
      'Sleek matte black 42mm stainless steel case, Japanese quartz movement, scratch-resistant sapphire crystal glass, and genuine Italian leather quick-release strap.',
    sizes: ['One Size'],
    colors: ['#000000', '#D97706', '#94A3B8'],
    is_best_seller: true,
    in_stock: true,
  },
  {
    id: 'B09H3N1R73',
    asin: 'B09H3N1R73',
    title: 'Classic Heritage Panama Wool Fedora',
    subtitle: 'Timeless Handcrafted Hat',
    category_id: 'hats',
    price: 42.5,
    original_price: 65.0,
    currency: 'USD',
    star_rating: 4.6,
    num_ratings: 840,
    main_photo: '/storage/img/chekout ima3.svg',
    photos: [
      '/storage/img/chekout ima3.svg',
      '/storage/img/img1.svg',
    ],
    description:
      '100% premium Australian wool felt fedora featuring an authentic leather band and interior moisture-wicking sweatband. UPF 50+ sun protection.',
    sizes: ['M (57cm)', 'L (59cm)', 'XL (61cm)'],
    colors: ['#334155', '#B45309'],
    is_best_seller: false,
    in_stock: true,
  },
  {
    id: 'B0G2RGW6YB',
    asin: 'B0G2RGW6YB',
    title: 'Urban Commuter Waterproof Backpack',
    subtitle: 'Smart Modular Travel',
    category_id: 'bags',
    price: 78.5,
    original_price: 110.0,
    currency: 'USD',
    star_rating: 4.9,
    num_ratings: 3120,
    main_photo: '/storage/img/bag.svg',
    photos: [
      '/storage/img/bag.svg',
      '/storage/img/img3.svg',
    ],
    description:
      'Ergonomic water-resistant Oxford fabric with padded 16-inch laptop compartment, hidden anti-theft back pocket, and integrated USB charging port.',
    sizes: ['Standard 22L'],
    colors: ['#0F172A', '#475569'],
    is_best_seller: true,
    in_stock: true,
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch Categories from Supabase or Fallback Local Database
 */
export async function fetchCategories(): Promise<Category[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch (e) {
      console.warn('Supabase fetchCategories fallback to local seed:', e);
    }
  }

  await sleep(250);
  return initialCategories;
}

/**
 * Fetch Products from Supabase or Fallback Local Database with search and category filter
 */
export async function fetchProducts(
  categoryId = 'aps',
  searchQuery = ''
): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('products').select(`
        *,
        product_photos (photo_url, display_order),
        product_variations (variation_type, variation_value)
      `);

      if (categoryId && categoryId !== 'aps') {
        query = query.eq('category_id', categoryId);
      }
      if (searchQuery.trim()) {
        query = query.ilike('title', `%${searchQuery.trim()}%`);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((row: any) => ({
          ...row,
          photos: row.product_photos?.map((p: any) => p.photo_url) || [row.main_photo],
          sizes: row.product_variations?.filter((v: any) => v.variation_type === 'SIZE').map((v: any) => v.variation_value) || ['S', 'M', 'L'],
          colors: row.product_variations?.filter((v: any) => v.variation_type === 'COLOR').map((v: any) => v.variation_value) || ['#0F172A', '#4F46E5'],
        })) as Product[];
      }
    } catch (e) {
      console.warn('Supabase fetchProducts fallback to local seed:', e);
    }
  }

  // Local Mock Filter
  await sleep(320);
  let result = [...initialProducts];

  if (categoryId && categoryId !== 'aps') {
    result = result.filter((p) => p.category_id === categoryId);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
    );
  }

  return result;
}

/**
 * Submit Order to Supabase or Store Locally
 */
export async function createOrder(
  items: CartItem[],
  totalAmount: number,
  shippingFee: number,
  paymentMethod: string
): Promise<{ orderId: string; success: boolean }> {
  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

  if (isSupabaseConfigured && supabase) {
    try {
      const { error: orderError } = await supabase.from('orders').insert({
        id: orderId,
        customer_id: 'usr_001',
        total_amount: totalAmount,
        shipping_fee: shippingFee,
        payment_method: paymentMethod,
        status: 'COMPLETED',
      });

      if (!orderError) {
        const orderItemsPayload = items.map((item) => ({
          order_id: orderId,
          product_id: item.product.id,
          quantity: item.quantity,
          unit_price: item.product.price,
          selected_size: item.selectedSize || 'Standard',
          selected_color: item.selectedColor || 'Default',
        }));

        await supabase.from('order_items').insert(orderItemsPayload);
      }
    } catch (e) {
      console.warn('Supabase order creation fallback:', e);
    }
  }

  // Local storage backup
  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.unshift({
    id: orderId,
    total_amount: totalAmount,
    shipping_fee: shippingFee,
    payment_method: paymentMethod,
    status: 'COMPLETED',
    items,
    created_at: new Date().toISOString(),
  });
  localStorage.setItem('orders', JSON.stringify(orders));

  return { orderId, success: true };
}
