# 🛍️ Campus Store - Modern Mobile-First Ecommerce

> Un proyecto de comercio electrónico moderno, pulido y responsivo construido con **HTML5 semántico, CSS3 moderno y Vanilla JavaScript modular**. Diseñado con una experiencia de usuario de primer nivel, animaciones suaves con shimmer skeletons y arquitectura desacoplada lista para bases de datos relacionales SQL.

---

## ✨ Características Principales y Mejoras Implementadas

### 1. 🎨 Nueva Paleta de Colores y Diseño Premium
- **Estética Contemporánea**: Inspirada en boutiques de moda modernas y apps líderes de retail (Zara, Kith, Apple Store).
- **Tokens de Diseño Centralizados** en [`css/variables.css`](file:///Users/joseguillermopauldiaz/Developments/ecommerCampusM1/css/variables.css):
  - **Primario / Slate 900**: `#0F172A` (elegancia y contraste profundo).
  - **Acento / Electric Indigo**: `#4F46E5` (moderno y vibrante).
  - **Superficie Suave / Fondos**: `#F8FAFC` y `#FFFFFF`.
  - **Texto Secundario**: `#64748B`.
  - **Alertas y Descuentos**: `#EF4444` (Rose Red) y `#10B981` (Emerald).
  - **Calificaciones**: `#F59E0B` (Amber Gold).
- **Tipografía Moderna**: Integración de la fuente **Plus Jakarta Sans** vía Google Fonts con respaldo local en *Encode Sans*.
- **Navegación Flotante con Glassmorphism**: Barra inferior translúcida con efecto desenfoque (`backdrop-filter: blur(18px)`) y contador de carrito reactivo en tiempo real.

---

### 2. ⚡ Skeletons y Shimmer Loaders
- **Transiciones Fluídas**: Se reemplazó la pantalla en blanco y los saltos visuales por placeholders animados con efecto de barrido brillante (`skeleton-shimmer`).
- **Componente Modular**: [`js/components/skeleton.js`](file:///Users/joseguillermopauldiaz/Developments/ecommerCampusM1/js/components/skeleton.js) con soporte para:
  - Píldoras de categorías (`categorySkeleton`).
  - Tarjetas de productos con imagen, título y precio (`productGridSkeleton`).
  - Vista de detalle con galería, estrellas y descripción (`detailSkeleton`).
  - Filas de productos y resumen de cobro en checkout (`checkoutSkeleton`).

---

### 3. 🗄️ Solución de Base de Datos y API Offline-First
La API externa (RapidAPI Amazon) que utilizaba el proyecto presentaba problemas de cuotas agotadas, llaves expiradas y latencias impredecibles. Se solucionó con una estrategia dual:

#### A. Motor de Datos Local en Frontend ([`js/module/mockData.js`](file:///Users/joseguillermopauldiaz/Developments/ecommerCampusM1/js/module/mockData.js))
- Catálogo enriquecido y autónomo con 6 categorías (Moda, Calzado, Relojería, Sombreros, Bolsos y Todo).
- Datos reales con fotos en galería, variaciones de tallas (S, M, L, XL), muestras de color, reseñas y precios.
- Simulación de latencia de red controlada (300-350ms) para que los skeletons se aprecien naturalmente.
- **Funciona al 100% sin depender de un servidor externo** (ideal para despliegue en GitHub Pages, Vercel o Netlify).

#### B. Archivo SQL Completo ([`ecommerce.sql`](file:///Users/joseguillermopauldiaz/Developments/ecommerCampusM1/ecommerce.sql) & [`database/ecommerce.sql`](file:///Users/joseguillermopauldiaz/Developments/ecommerCampusM1/database/ecommerce.sql))
Diseño relacional estructurado y listo para producción, compatible con **MySQL 8.0+**, **PostgreSQL 14+** y **SQLite 3**:
- `categories`: Identificador, nombre, icono y orden de visualización.
- `products`: Catálogo completo, precios, descuento, stock y relación foránea.
- `product_photos`: Galería de imágenes múltiples por producto.
- `product_variations`: Tallas y colores asociados a cada producto.
- `customers`: Registro de usuarios y perfiles.
- `orders` y `order_items`: Gestión de pedidos, cantidades y totales.
- Incluye sentencias `INSERT INTO` con todos los datos precargados y consultas SQL frecuentes de analítica.

---

### 4. 🛒 Flujos Interactivos Mejorados
1. **Home (`index.html`)**:
   - Búsqueda en vivo optimizada con *debounce* (busca al escribir sin congelar la pantalla y sin borrar el texto del input).
   - Filtrado dinámico por categorías mediante *event delegation* (sin recargar la página).
   - Botón de favoritos (Wishlist) con persistencia en `localStorage` y animación de rebote.
   - Estado vacío amigable cuando una búsqueda no arroja resultados.
2. **Detalle de Producto (`views/detail.html`)**:
   - Selector interactivo de tallas con píldoras activas.
   - Muestras de color con selector visual y aro de enfoque.
   - Contador de cantidad (+ / -) con recálculo automático de precio.
   - Botón *Add to Cart* integrado con alertas modales de SweetAlert2 y actualización instantánea del carrito.
   - Paginación de fotos del producto con indicadores en puntos.
3. **Checkout (`views/checkout.html`)**:
   - Modificación de cantidades y botón para eliminar producto directamente del carrito.
   - Dropdown interactivo para seleccionar método de pago (Visa, Mastercard, Apple Pay).
   - Resumen financiero: Subtotal, Envío gratis (para pedidos calificados) y Total.
   - Botón de pago con animación de carga (*spinner*) y generación de número de orden simulado (`#ORD-XXXXXX`).

---

## 📁 Estructura del Proyecto

```text
├── css/
│   ├── variables.css      # Sistema de diseño, tokens, colores, animaciones shimmer
│   ├── style.css          # Estilos del Home y catálogo general
│   ├── detail.css         # Estilos de la página de detalle de producto
│   └── checkout.css       # Estilos de la vista de checkout y carrito
├── js/
│   ├── main.js            # Lógica principal del Home y búsqueda
│   ├── detail.js          # Lógica interactiva del detalle de producto
│   ├── checkout.js        # Lógica del carrito, cantidades y pago
│   ├── components/
│   │   ├── skeleton.js    # Plantillas de carga skeleton animadas
│   │   ├── gallery.js     # Renderizado de grillas y galerías
│   │   ├── menu.js        # Barra horizontal de categorías
│   │   ├── section.js     # Componentes de título, variaciones y resumen
│   │   └── footer.js      # Barra de navegación flotante y botones de acción
│   └── module/
│       ├── mockData.js    # Catálogo estructurado y motor de datos offline
│       ├── app.js         # Servicios de consulta y filtrado asíncrono
│       ├── detail.js      # Servicio de detalle de producto por ID/ASIN
│       └── db.js          # Utilidad auxiliar para almacenamiento
├── views/
│   ├── detail.html        # Página de detalle del producto
│   └── checkout.html      # Página de pasarela de compra y checkout
├── database/
│   └── ecommerce.sql      # Script SQL con DDL y DML completo
├── ecommerce.sql          # Acceso directo al script SQL en raíz
├── storage/
│   ├── font/              # Fuentes Encode Sans locales
│   └── img/               # Iconos SVG e imágenes de productos
├── index.html             # Punto de entrada de la aplicación
└── README.md              # Documentación del proyecto
```

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

Dado que el proyecto utiliza módulos de JavaScript estándar (`import`/`export`), debe servirse mediante un servidor HTTP local para evitar restricciones de CORS del protocolo `file://`:

### Opción 1: Con Python (Recomendada)
Abre tu terminal en la raíz del proyecto y ejecuta:
```bash
python3 -m http.server 8080
```
Luego abre tu navegador en:
```text
http://localhost:8080/
```

### Opción 2: Con VS Code / IDE
- Instala la extensión **Live Server** en VS Code.
- Haz clic derecho en `index.html` y selecciona **Open with Live Server**.

### Opción 3: Con Node.js / npx
```bash
npx serve .
```

---

## 💡 Cómo Usar el Archivo SQL para tu Futuro Backend

Si en el futuro deseas crear una API con Node.js (Express/NestJS), Python (FastAPI/Django) o PHP:
1. Abre tu gestor de base de datos preferido (MySQL Workbench, DBeaver, pgAdmin o terminal).
2. Ejecuta el archivo [`ecommerce.sql`](file:///Users/joseguillermopauldiaz/Developments/ecommerCampusM1/ecommerce.sql):
   ```bash
   mysql -u root -p campus_ecommerce < ecommerce.sql
   ```
3. Las tablas y los datos de prueba quedarán listos para conectarse con tu backend.
