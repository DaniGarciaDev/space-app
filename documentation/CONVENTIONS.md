# 📏 Convenciones de Código

Guía de estilo y convenciones para mantener consistencia en el proyecto.

---

## 📁 Naming Conventions

### Archivos y Carpetas
```
✅ Componentes Astro:     PascalCase   → APODCard.astro
✅ Pages:                 kebab-case   → gallery.astro, mars-rover.astro
✅ Services:              camelCase    → nasa.ts, auth.ts
✅ Utils:                 camelCase    → dates.ts, formatters.ts
✅ Types:                 camelCase    → nasa.ts, common.ts
✅ Carpetas:              lowercase    → components, services, utils
```

### Variables y Funciones
```typescript
// ✅ Variables: camelCase
const userName = 'John';
const apiResponse = await fetch();

// ✅ Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.nasa.gov';
const MAX_RETRY_COUNT = 3;

// ✅ Funciones: camelCase con verbo
function getUserData() { }
function formatDate() { }
async function fetchAPOD() { }

// ✅ Componentes React/Astro: PascalCase
function APODCard() { }
```

### Tipos TypeScript
```typescript
// ✅ Interfaces: PascalCase con sustantivo
interface APODResponse { }
interface UserPreferences { }

// ✅ Types: PascalCase
type MediaType = 'image' | 'video';
type Status = 'loading' | 'success' | 'error';

// ✅ Enums: PascalCase
enum Status {
  Loading,
  Success,
  Error
}
```

---

## 📝 TypeScript Guidelines

### Siempre tipar
```typescript
// ❌ MALO
const apod = await getAPOD();
function process(data) { }

// ✅ BUENO
const apod: APODResponse = await getAPOD();
function process(data: APODResponse): void { }
```

### Usar interfaces para objetos
```typescript
// ✅ BUENO
interface CardProps {
  title: string;
  description?: string; // opcional
  count: number;
}

// Usar
const props: CardProps = { ... };
```

### Evitar `any`
```typescript
// ❌ MALO
const data: any = await fetch();

// ✅ BUENO
const data: APODResponse = await fetch();

// ✅ Si realmente no sabes el tipo
const data: unknown = await fetch();
```

---

## 🎨 CSS Conventions

### Usar CSS Variables
```css
/* ✅ BUENO */
.card {
  background: var(--bg-card);
  color: var(--text-primary);
}

/* ❌ MALO - valores hardcodeados */
.card {
  background: #1A1C2E;
  color: #FFFFFF;
}
```

### BEM Naming (cuando sea necesario)
```css
/* Block */
.apod-card { }

/* Element */
.apod-card__title { }
.apod-card__image { }

/* Modifier */
.apod-card--compact { }
.apod-card--featured { }
```

### Mobile First
```css
/* ✅ BUENO - Mobile first */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* ❌ MALO - Desktop first */
.container {
  padding: 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
```

---

## 📦 Imports Order
```typescript
// 1️⃣ Types
import type { APODResponse } from '../types/nasa';

// 2️⃣ Layouts
import Layout from '../layouts/Layout.astro';

// 3️⃣ Components
import APODCard from '../components/APODCard.astro';
import Header from '../components/Header.astro';

// 4️⃣ Services
import { getAPOD } from '../services/nasa';

// 5️⃣ Utils
import { formatDate } from '../utils/dates';

// 6️⃣ Externos
import { Chart } from 'chart.js';
```

---

## 💬 Comentarios

### Cuándo comentar
```typescript
// ✅ BUENO - Explica el "por qué"
// Usamos un offset de 1 día porque la API devuelve UTC
const yesterday = new Date(Date.now() - 86400000);

// ❌ MALO - Explica el "qué" (obvio)
// Crea una nueva fecha
const date = new Date();
```

### JSDoc para funciones públicas
```typescript
/**
 * Obtiene la imagen astronómica del día desde la NASA API
 * @param date - Fecha en formato YYYY-MM-DD (opcional)
 * @returns Promise con los datos de APOD
 * @throws Error si la API falla
 */
export async function getAPOD(date?: string): Promise<APODResponse> {
  // ...
}
```

---

## 🚫 Evitar

### ❌ Magic Numbers
```typescript
// ❌ MALO
setTimeout(() => {}, 86400000);

// ✅ BUENO
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
setTimeout(() => {}, ONE_DAY_MS);
```

### ❌ Callback Hell
```typescript
// ❌ MALO
fetch(url).then(res => {
  res.json().then(data => {
    process(data).then(result => {
      // ...
    });
  });
});

// ✅ BUENO
const res = await fetch(url);
const data = await res.json();
const result = await process(data);
```

### ❌ Nested Ternaries
```typescript
// ❌ MALO
const status = loading ? 'loading' : error ? 'error' : 'success';

// ✅ BUENO
let status = 'success';
if (loading) status = 'loading';
if (error) status = 'error';
```

---

## ✅ Mejores Prácticas

### Early Returns
```typescript
// ✅ BUENO
function process(data: string | null) {
  if (!data) return;
  
  // lógica principal
  console.log(data);
}

// ❌ MALO
function process(data: string | null) {
  if (data) {
    console.log(data);
  }
}
```

### Destructuring
```typescript
// ✅ BUENO
const { title, date, url } = apod;

// ❌ MALO
const title = apod.title;
const date = apod.date;
const url = apod.url;
```

### Template Literals
```typescript
// ✅ BUENO
const message = `Hola ${name}, tienes ${count} mensajes`;

// ❌ MALO
const message = 'Hola ' + name + ', tienes ' + count + ' mensajes';
```

---

## 🧪 Testing Conventions
```typescript
// ✅ Describe blocks en español
describe('NASA Service', () => {
  
  // ✅ Tests descriptivos
  it('debería obtener APOD correctamente', async () => {
    const apod = await getAPOD();
    expect(apod).toHaveProperty('title');
  });
  
  // ✅ Agrupa tests relacionados
  describe('manejo de errores', () => {
    it('debería lanzar error con fecha inválida', () => {
      expect(() => getAPOD('invalid')).toThrow();
    });
  });
});
```

---

## 📏 Code Formatting

### Prettier Config (recomendado)
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### EditorConfig
```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

---

**Última actualización**: Febrero 2025