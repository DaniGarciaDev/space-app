# 🎨 Guía de Componentes

Catálogo completo de componentes reutilizables del proyecto.

---

## 📦 Componentes Disponibles

### 1. `Layout.astro`

Layout base de la aplicación.

**Ubicación**: `src/layouts/Layout.astro`

**Props**:
```typescript
interface Props {
  title: string;
}
```

**Uso**:
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Mi Página">
  <h1>Contenido aquí</h1>
</Layout>
```

**Características**:
- ✅ Navbar sticky
- ✅ Animación de estrellas de fondo
- ✅ Meta tags SEO
- ✅ Google Fonts preload
- ✅ CSS Variables globales

---

### 2. `APODCard.astro`

Tarjeta para mostrar una imagen astronómica.

**Ubicación**: `src/components/APODCard.astro`

**Props**:
```typescript
interface Props {
  apod: APODResponse;
  compact?: boolean;
}
```

**Uso básico**:
```astro
---
import APODCard from '../components/APODCard.astro';
import type { APODResponse } from '../types/nasa';

const apod: APODResponse = await getAPOD();
---

<APODCard apod={apod} />
```

**Variantes**:
```astro
<!-- Versión completa (default) -->
<APODCard apod={apod} />

<!-- Versión compacta (para grids) -->
<APODCard apod={apod} compact />
```

**Características**:
- ✅ Responsive
- ✅ Lazy loading de imágenes
- ✅ Soporte para videos (iframe)
- ✅ Hover effects
- ✅ Link a página de detalle
- ✅ Badge de copyright

---

## 🎨 Sistema de Diseño

### Variables CSS

Definidas en `Layout.astro`:
```css
:root {
  /* Colores de fondo */
  --bg-dark: #0B0D17;
  --bg-secondary: #1A1C2E;
  --bg-card: rgba(26, 28, 46, 0.6);
  
  /* Textos */
  --text-primary: #FFFFFF;
  --text-secondary: #B8B9C4;
  
  /* Acentos */
  --accent-primary: #6366F1;
  --accent-secondary: #8B5CF6;
  --accent-gradient: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%);
}
```

### Tipografía
```css
/* Headings */
font-family: 'Space Grotesk', sans-serif;

/* Body text */
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Breakpoints
```css
/* Mobile first */
@media (max-width: 768px) { /* Mobile */ }
@media (min-width: 769px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

---

## 🧩 Patrones de Componentes

### Componente Presentacional
```astro
---
// Solo recibe datos, no hace lógica
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<div>
  <h2>{title}</h2>
  <p>{description}</p>
</div>
```

### Componente con Slots
```astro
---
interface Props {
  title: string;
}
---

<section>
  <h2>{Astro.props.title}</h2>
  <slot />
</section>
```

**Uso**:
```astro
<Section title="Mi Sección">
  <p>Contenido aquí</p>
</Section>
```

---

## ✅ Checklist al Crear Componentes

- [ ] Definir `interface Props` con TypeScript
- [ ] Desestructurar props en el frontmatter
- [ ] Agregar valores por defecto si es necesario
- [ ] Usar semantic HTML
- [ ] Incluir `loading="lazy"` en imágenes
- [ ] Agregar `alt` descriptivos
- [ ] Estilos scoped en el componente
- [ ] Documentar en este archivo

---

## 🔮 Componentes Futuros

### En desarrollo:

- [ ] `AsteroidCard.astro` - Para asteroides
- [ ] `RoverPhotoGallery.astro` - Fotos de Mars
- [ ] `ISSTracker.astro` - Ubicación ISS
- [ ] `DatePicker.astro` - Selector de fechas

---

**Última actualización**: Febrero 2025