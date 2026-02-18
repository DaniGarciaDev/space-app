# 🏗️ Arquitectura del Proyecto - Space Explorer

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Estructura de Carpetas](#estructura-de-carpetas)
3. [Capas de la Arquitectura](#capas-de-la-arquitectura)
4. [Principios de Diseño](#principios-de-diseño)
5. [Patrones Implementados](#patrones-implementados)
6. [Flujo de Datos](#flujo-de-datos)
7. [Convenciones de Código](#convenciones-de-código)
8. [Ejemplos Prácticos](#ejemplos-prácticos)
9. [Testing](#testing)
10. [Escalabilidad](#escalabilidad)

---

## 🎯 Visión General

Este proyecto sigue una **arquitectura en capas** (Layered Architecture) inspirada en principios de **Clean Architecture** y **SOLID**, adaptada para el framework Astro.

### Objetivos arquitectónicos:

- ✅ **Mantenibilidad**: Fácil de modificar y extender
- ✅ **Testabilidad**: Componentes aislados y testeables
- ✅ **Escalabilidad**: Preparado para crecer
- ✅ **Reutilización**: DRY (Don't Repeat Yourself)
- ✅ **Separación de responsabilidades**: Cada capa tiene un propósito claro

---

## 📁 Estructura de Carpetas
```
src/
├── types/           # Definiciones de tipos TypeScript
│   └── nasa.ts      # Interfaces para APIs de NASA
│
├── services/        # Lógica de negocio y llamadas a APIs
│   └── nasa.ts      # Servicios para interactuar con NASA API
│
├── utils/           # Funciones puras y helpers
│   └── dates.ts     # Utilidades para manejo de fechas
│
├── components/      # Componentes UI reutilizables
│   └── APODCard.astro
│
├── layouts/         # Templates de página
│   └── Layout.astro
│
└── pages/           # Rutas de la aplicación (file-based routing)
    ├── index.astro
    └── gallery.astro
```

---

## 🏛️ Capas de la Arquitectura

### 1️⃣ Types Layer (Capa de Tipos)

**Responsabilidad**: Definir contratos de datos
```typescript
// src/types/nasa.ts
export interface APODResponse {
  date: string;
  explanation: string;
  title: string;
  url: string;
  // ...
}
```

**Por qué existe**:
- ✅ Single Source of Truth para estructuras de datos
- ✅ Type Safety en toda la aplicación
- ✅ Documentación viva del sistema
- ✅ Refactoring seguro con TypeScript

**Reglas**:
- ❌ NO contiene lógica
- ❌ NO hace llamadas a APIs
- ✅ Solo interfaces y types

---

### 2️⃣ Services Layer (Capa de Servicios)

**Responsabilidad**: Lógica de negocio y comunicación con APIs externas
```typescript
// src/services/nasa.ts
import type { APODResponse } from '../types/nasa';

export async function getAPOD(date?: string): Promise<APODResponse> {
  const url = new URL('https://api.nasa.gov/planetary/apod');
  url.searchParams.append('api_key', NASA_API_KEY);
  if (date) url.searchParams.append('date', date);
  
  const response = await fetch(url.toString());
  return response.json();
}
```

**Por qué existe**:
- ✅ Centraliza llamadas a APIs (evita duplicación)
- ✅ Encapsula lógica de negocio
- ✅ Fácil de testear (mock de APIs)
- ✅ Intercambiable (cambiar provider sin tocar UI)

**Reglas**:
- ✅ Maneja errores de API
- ✅ Transforma datos si es necesario
- ✅ Retorna tipos definidos en `/types`
- ❌ NO contiene lógica de UI
- ❌ NO importa componentes

---

### 3️⃣ Utils Layer (Capa de Utilidades)

**Responsabilidad**: Funciones puras reutilizables
```typescript
// src/utils/dates.ts
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDate(date);
}
```

**Por qué existe**:
- ✅ Funciones sin efectos secundarios (predecibles)
- ✅ Fáciles de testear
- ✅ Reutilizables en cualquier parte
- ✅ No dependen del framework

**Reglas de una función pura**:
- ✅ Mismo input → mismo output (determinista)
- ❌ NO modifica variables externas
- ❌ NO hace llamadas a APIs
- ❌ NO accede a localStorage, cookies, etc.

---

### 4️⃣ Components Layer (Capa de Componentes)

**Responsabilidad**: UI reutilizable y presentacional
```astro
---
// src/components/APODCard.astro
import type { APODResponse } from '../types/nasa';

interface Props {
  apod: APODResponse;
  compact?: boolean;
}

const { apod, compact = false } = Astro.props;
---

<article class={`apod-card ${compact ? 'compact' : ''}`}>
  <h3>{apod.title}</h3>
  <!-- ... -->
</article>
```

**Por qué existe**:
- ✅ Reutilización de UI
- ✅ Consistencia visual
- ✅ Facilita mantenimiento
- ✅ Componible y extensible

**Reglas**:
- ✅ Recibe datos por props
- ✅ No contiene lógica de negocio
- ❌ NO hace llamadas a APIs directamente
- ✅ Puede importar utils para formateo

---

### 5️⃣ Pages Layer (Capa de Páginas)

**Responsabilidad**: Orquestación y enrutamiento
```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import APODCard from '../components/APODCard.astro';
import { getAPOD } from '../services/nasa';

// Orquestación: obtener datos
const apod = await getAPOD();
---

<!-- Composición: ensamblar UI -->
<Layout title="Home">
  <APODCard apod={apod} />
</Layout>
```

**Por qué existe**:
- ✅ File-based routing de Astro
- ✅ Punto de entrada de cada ruta
- ✅ Coordina servicios y componentes

**Reglas (Thin Controllers)**:
- ✅ Debe ser "delgado" (poca lógica)
- ✅ Solo llama a services
- ✅ Solo compone components
- ❌ NO contiene lógica compleja
- ❌ NO hace transformaciones de datos pesadas

---

## 📐 Principios de Diseño

### SOLID Principles

#### 🔹 S - Single Responsibility Principle
> Cada módulo debe tener una única razón para cambiar

**Ejemplo**:
- `nasa.ts` → Solo maneja la API de NASA
- `dates.ts` → Solo maneja fechas
- `APODCard.astro` → Solo renderiza una card

#### 🔹 O - Open/Closed Principle
> Abierto a extensión, cerrado a modificación

**Ejemplo**:
```typescript
// ✅ Extendemos sin modificar
export async function getAPOD(date?: string) { /* ... */ }
export async function getAPODRange(start: string, end: string) { /* ... */ }
```

#### 🔹 D - Dependency Inversion Principle
> Depender de abstracciones, no de implementaciones

**Ejemplo**:
```astro
---
// Pages dependen de la abstracción (service)
import { getAPOD } from '../services/nasa';

// No del detalle (fetch directo)
// ❌ const data = await fetch('https://...')
---
```

---

### DRY (Don't Repeat Yourself)

**Antes** (sin DRY):
```astro
<!-- index.astro -->
const response = await fetch(`https://api.nasa.gov/...`);

<!-- gallery.astro -->
const response = await fetch(`https://api.nasa.gov/...`); ❌ Duplicado
```

**Después** (con DRY):
```astro
<!-- index.astro -->
const apod = await getAPOD(); ✅

<!-- gallery.astro -->
const apods = await getRecentAPODs(); ✅
```

---

### Separation of Concerns

Cada capa tiene su responsabilidad:

| Capa | Responsabilidad | NO debe hacer |
|------|-----------------|---------------|
| **Types** | Contratos de datos | Lógica |
| **Services** | API + negocio | UI |
| **Utils** | Funciones puras | Side effects |
| **Components** | Presentación | Llamadas API |
| **Pages** | Orquestación | Lógica compleja |

---

## 🔄 Flujo de Datos
```
┌─────────────────────────────────────────────────┐
│                  USER REQUEST                   │
└─────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│              PAGE (Orquestador)                 │
│  - Llama a services                             │
│  - Pasa datos a components                      │
└─────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│              SERVICE (Lógica)                   │
│  - Llama a APIs externas                        │
│  - Transforma datos                             │
│  - Usa types para type safety                   │
└─────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│              EXTERNAL API                       │
│  (NASA, SpaceX, etc.)                           │
└─────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│         DATA con Types (Type Safe)              │
└─────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│         COMPONENTS (Presentación)               │
│  - Recibe datos por props                       │
│  - Renderiza UI                                 │
└─────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│                  USER VIEW                      │
└─────────────────────────────────────────────────┘
```

---

## 📝 Convenciones de Código

### Naming Conventions

#### Archivos:
- **Componentes**: PascalCase → `APODCard.astro`
- **Pages**: kebab-case → `gallery.astro`
- **Services/Utils**: camelCase → `nasa.ts`, `dates.ts`
- **Types**: camelCase → `nasa.ts`

#### Funciones:
```typescript
// Services: verbos descriptivos
export async function getAPOD() { }
export async function createFavorite() { }
export async function deleteFavorite() { }

// Utils: verbos de transformación
export function formatDate() { }
export function calculateDistance() { }
```

#### Tipos:
```typescript
// Interfaces: sustantivos
export interface APODResponse { }
export interface UserPreferences { }

// Types: descriptivos
export type MediaType = 'image' | 'video';
```

---

### Imports Order
```typescript
// 1. Types
import type { APODResponse } from '../types/nasa';

// 2. Componentes Astro
import Layout from '../layouts/Layout.astro';
import Card from '../components/Card.astro';

// 3. Services
import { getAPOD } from '../services/nasa';

// 4. Utils
import { formatDate } from '../utils/dates';

// 5. Externos
import { Chart } from 'chart.js';
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Agregar nueva funcionalidad

**Objetivo**: Mostrar asteroides cercanos

**Pasos**:

1. **Definir tipos**:
```typescript
// src/types/nasa.ts
export interface NeoResponse {
  id: string;
  name: string;
  close_approach_date: string;
  // ...
}
```

2. **Crear servicio**:
```typescript
// src/services/nasa.ts
export async function getNearEarthObjects(): Promise<NeoResponse[]> {
  const url = new URL('https://api.nasa.gov/neo/rest/v1/feed');
  // ...
}
```

3. **Crear componente**:
```astro
<!-- src/components/AsteroidCard.astro -->
---
import type { NeoResponse } from '../types/nasa';
interface Props {
  asteroid: NeoResponse;
}
---
```

4. **Usar en página**:
```astro
<!-- src/pages/asteroids.astro -->
---
import { getNearEarthObjects } from '../services/nasa';
const asteroids = await getNearEarthObjects();
---
```

**✅ Ventajas de esta arquitectura**:
- No tocaste código existente
- Cada pieza tiene su lugar
- Fácil de testear

---

### Ejemplo 2: Cambiar provider de API

**Escenario**: Cambiar de NASA API a SpaceX API

**Solución**:
```typescript
// src/services/nasa.ts → src/services/space.ts

// Antes
export async function getAPOD() {
  return fetch('https://api.nasa.gov/...');
}

// Después
export async function getAPOD() {
  return fetch('https://api.spacex.com/...');
}
```

**✅ El resto del código NO CAMBIA**:
- Pages siguen llamando `getAPOD()`
- Components siguen recibiendo los mismos props
- Types pueden ajustarse si cambia la estructura

---

## 🧪 Testing

### Testear Services
```typescript
// nasa.test.ts
import { describe, it, expect, vi } from 'vitest';
import { getAPOD } from '../services/nasa';

describe('NASA Service', () => {
  it('should fetch APOD successfully', async () => {
    const apod = await getAPOD();
    
    expect(apod).toHaveProperty('title');
    expect(apod).toHaveProperty('url');
    expect(apod.media_type).toBe('image');
  });
});
```

### Testear Utils
```typescript
// dates.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate, getDaysAgo } from '../utils/dates';

describe('Date Utils', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('2024-01-15');
  });
  
  it('should calculate days ago', () => {
    const result = getDaysAgo(7);
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});
```

---

## 📈 Escalabilidad

### Agregar nuevas APIs
```
src/services/
├── nasa.ts         # API de NASA
├── spacex.ts       # API de SpaceX (nueva)
├── hubble.ts       # API de Hubble (nueva)
└── iss.ts          # API de ISS (nueva)
```

Cada service sigue el mismo patrón:
```typescript
import type { XResponse } from '../types/x';

export async function getData(): Promise<XResponse> {
  // ...
}
```

### Agregar autenticación
```typescript
// src/services/auth.ts
export async function login() { /* ... */ }
export async function logout() { /* ... */ }

// src/utils/token.ts
export function getToken() { /* ... */ }
export function setToken() { /* ... */ }
```

### Agregar estado global
```typescript
// src/stores/favorites.ts (Nanostores, Zustand, etc.)
import { atom } from 'nanostores';

export const favorites = atom<string[]>([]);
```

---

## ⚠️ Anti-patterns (Qué NO hacer)

### ❌ Anti-pattern 1: Lógica en Pages
```astro
---
// ❌ MAL: Página con demasiada lógica
const response = await fetch('https://...');
const data = await response.json();
const filtered = data.filter(x => x.date > today);
const sorted = filtered.sort((a, b) => ...);
---
```

**✅ Solución**: Mover a service

---

### ❌ Anti-pattern 2: Componentes llamando APIs
```astro
---
// ❌ MAL: Componente hace fetch
const data = await fetch('https://...');
---
```

**✅ Solución**: Pasar datos por props

---

### ❌ Anti-pattern 3: Duplicar lógica
```typescript
// ❌ MAL: Misma lógica en varios lugares
// page1.astro
const formatted = new Date(date).toLocaleDateString('es-ES');

// page2.astro
const formatted = new Date(date).toLocaleDateString('es-ES');
```

**✅ Solución**: Crear utility function

---

## 🎓 Recursos y Referencias

### Principios aplicados:
- **SOLID Principles**: https://en.wikipedia.org/wiki/SOLID
- **Clean Architecture** (Robert C. Martin)
- **DRY Principle**: Don't Repeat Yourself
- **Separation of Concerns**

### Documentación:
- Astro: https://docs.astro.build
- TypeScript: https://www.typescriptlang.org/docs

---

## 📊 Checklist de Calidad

Antes de hacer commit, verifica:

- [ ] ¿Las funciones tienen un solo propósito?
- [ ] ¿Los tipos están definidos?
- [ ] ¿No hay lógica duplicada?
- [ ] ¿Los services no importan componentes?
- [ ] ¿Los componentes reciben datos por props?
- [ ] ¿Las utils son funciones puras?
- [ ] ¿Los nombres son descriptivos?

---

**Última actualización**: Febrero 2025  
**Versión**: 1.0.0