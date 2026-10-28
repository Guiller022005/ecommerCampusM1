# ⚡ Campus Store - React 19 + TypeScript + Supabase

> Rama moderna de comercio electrónico migrada a **React 19, TypeScript, Vite y Supabase**, manteniendo la compatibilidad completa con el esquema SQL relacional y preservando la versión original en la rama `main`.

---

## 🚀 Arquitectura y Novedades de la Versión React

### 1. 🗄️ Supabase Cloud Database + Fallback Offline Inteligente
- **Cliente Supabase Oficial (`@supabase/supabase-js`)** integrado en [`src/lib/supabase.ts`](file:///Users/joseguillermopauldiaz/Developments/ecommerCampusM1/src/lib/supabase.ts).
- **Esquema Relacional**: El archivo [`database/ecommerce.sql`](file:///Users/joseguillermopauldiaz/Developments/ecommerCampusM1/database/ecommerce.sql) se puede ejecutar directamente en el **SQL Editor** de Supabase para generar tablas (`categories`, `products`, `product_photos`, `product_variations`, `orders`, `order_items`) y poblar el catálogo de inmediato.
- **Modo Offline Automático**: Si no has configurado tus variables de entorno todavía, la aplicación **funciona al 100% de forma autónoma con datos semilla locales**, por lo que nunca se romperá ni mostrará pantallas en blanco.
- **Modal de Conexión Supabase**: Incluye un indicador de estado en vivo en el Navbar con guía interactiva en 3 pasos para conectar tu cuenta de Supabase.

---

### 2. ⚛️ Componentes React y Estado Centralizado
- **`CartContext` (`src/context/CartContext.tsx`)**: Gestión reactiva de carrito, cantidades (+ / -), cálculo de totales y Wishlist (favoritos) con persistencia en `localStorage`.
- **`Navbar` (`src/components/Navbar.tsx`)**: Barra de navegación superior con buscador integrado, botón de favoritos con contador, disparador de bolsa de compras con badge numérico, indicador de Supabase y avatar.
- **`CategoryBar` (`src/components/CategoryBar.tsx`)**: Píldoras horizontales de categorías con íconos vectoriales modernos (Lucide React) y filtrado instantáneo.
- **`ProductCard` (`src/components/ProductCard.tsx`)**: Tarjetas de producto responsivas con proporción de imagen uniforme, botón de favoritos interactivo, estrellas doradas de calificación, precio con descuento y botón de compra rápida.
- **`SkeletonGrid` (`src/components/SkeletonGrid.tsx`)**: Animaciones de carga shimmer continuas al filtrar o buscar.
- **`ProductDetailModal` (`src/components/ProductDetailModal.tsx`)**: Vista detallada con galería de miniaturas, selector de tallas (S, M, L, XL), muestras de color, contador de cantidad y botón *Add to Bag*.
- **`CartDrawer` (`src/components/CartDrawer.tsx`)**: Cesta lateral desplegable con modificación de cantidades, eliminación de ítems, selector de método de pago (Visa, Mastercard, Apple Pay), cálculo de envío y botón de pago con **animación de confeti (`canvas-confetti`)** y código de orden `#ORD-XXXXXX`.
- **`WishlistModal` (`src/components/WishlistModal.tsx`)**: Panel lateral para ver productos guardados y transferirlos al carrito con un clic.

---

### 3. 📱 Responsive 100% Adaptativo
- **En Computadores (> 1080px)**: Grilla de **4 columnas** con espacio optimizado y barra de navegación superior completa. **Sin barra flotante que estorbe el catálogo**.
- **En Tabletas (680px - 1080px)**: Grilla de **3 columnas** con diseño equilibrado.
- **En Celulares (< 680px)**: Grilla de **2 columnas** fluidas y barra de navegación táctil inferior en Midnight Slate (`#0F172A`).

---

## 🛠️ Cómo Ejecutar Localmente

### 1. Iniciar el Servidor de Desarrollo Vite
```bash
npm run dev
```
La aplicación estará disponible de inmediato en:
👉 `http://localhost:5173/`

### 2. Compilar para Producción
```bash
npm run build
```

---

## 🔌 Conectar con tu Cuenta de Supabase (Opcional)

1. Crea un proyecto gratuito en [supabase.com](https://supabase.com).
2. Abre el **SQL Editor** en tu panel de Supabase y ejecuta el script [`database/ecommerce.sql`](file:///Users/joseguillermopauldiaz/Developments/ecommerCampusM1/database/ecommerce.sql).
3. Crea un archivo `.env.local` en la raíz de este proyecto con tus credenciales:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key-publica
   ```
4. Reinicia `npm run dev` y el indicador en el Navbar cambiará automáticamente a **"Live Supabase Connected"** con un punto verde.

---

## 🔀 Cómo Alternar Entre Versiones

- Para ver la **versión React + Supabase**:
  ```bash
  git checkout feat/react-supabase
  npm run dev
  ```
- Para volver a la **versión original Vanilla HTML/CSS/JS**:
  ```bash
  git checkout main
  python3 -m http.server 8080
  ```
