# 🌐 Documentación de APIs y Servicios

Guía completa de los servicios que interactúan con APIs externas.

---

## 📡 NASA Open APIs

Este proyecto consume las siguientes APIs de NASA:

- **APOD**: Astronomy Picture of the Day
- **NEO**: Near Earth Objects (Asteroides)
- **Mars Rover Photos**: Imágenes de rovers en Marte
- **EPIC**: Earth Polychromatic Imaging Camera

---

## 🔑 Autenticación

Todas las APIs de NASA requieren una API key:
```typescript
const NASA_API_KEY = import.meta.env.NASA_API_KEY || 'DEMO_KEY';
```

### Rate Limits

| Key Type | Requests/Hour | Requests/Day |
|----------|---------------|--------------|
| DEMO_KEY | 30 | 50 |
| Personal Key | 1,000 | N/A |

---

## 📸 APOD Service

### `getAPOD(date?: string)`

Obtiene la imagen astronómica del día.

**Ubicación**: `src/services/nasa.ts`

**Parámetros**:
- `date` (opcional): Fecha en formato `YYYY-MM-DD`

**Retorna**: `Promise<APODResponse>`

**Ejemplo**:
```typescript
import { getAPOD } from '../services/nasa';

// Imagen de hoy
const today = await getAPOD();

// Imagen de una fecha específica
const birthday = await getAPOD('2024-01-15');
```

**Response**:
```typescript
{
  date: "2024-02-18",
  explanation: "Descripción de la imagen...",
  hdurl: "https://apod.nasa.gov/apod/image/2402/image_hd.jpg",
  media_type: "image",
  title: "Título de la imagen",
  url: "https://apod.nasa.gov/apod/image/2402/image.jpg",
  copyright: "Fotógrafo" // opcional
}
```

---

### `getAPODRange(startDate: string, endDate: string)`

Obtiene múltiples APODs en un rango de fechas.

**Parámetros**:
- `startDate`: Fecha inicio `YYYY-MM-DD`
- `endDate`: Fecha fin `YYYY-MM-DD`

**Retorna**: `Promise<APODResponse[]>`

**Ejemplo**:
```typescript
// Últimos 7 días
const lastWeek = await getAPODRange('2024-02-11', '2024-02-18');
```

**Limitaciones**:
- Máximo 100 fechas por request
- Fechas válidas desde 1995-06-16 hasta hoy

---

### `getRecentAPODs(count: number)`

Obtiene un número específico de APODs recientes aleatorios.

**Parámetros**:
- `count`: Número de imágenes (1-100)

**Retorna**: `Promise<APODResponse[]>`

**Ejemplo**:
```typescript
// 12 imágenes aleatorias
const gallery = await getRecentAPODs(12);
```

---

## 🪐 Tipos TypeScript

### `APODResponse`
```typescript
interface APODResponse {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
}
```

---

## ⚠️ Manejo de Errores

Todos los servicios pueden lanzar errores:
```typescript
try {
  const apod = await getAPOD('2024-02-18');
} catch (error) {
  if (error instanceof Error) {
    console.error('NASA API error:', error.message);
  }
}
```

### Errores comunes

| Código | Mensaje | Solución |
|--------|---------|----------|
| 403 | API key invalid | Verifica tu `.env` |
| 429 | Rate limit exceeded | Espera o usa personal key |
| 400 | Invalid date | Formato debe ser `YYYY-MM-DD` |
| 404 | No data for date | Fecha anterior a 1995-06-16 |

---

## 🎯 Mejores Prácticas

### 1. Siempre usar tipos
```typescript
// ✅ BUENO
const apod: APODResponse = await getAPOD();

// ❌ MALO
const apod = await getAPOD(); // any implícito
```

### 2. Manejo de media types
```typescript
if (apod.media_type === 'image') {
  return <img src={apod.url} />;
} else {
  return <iframe src={apod.url} />;
}
```

### 3. Fallback para HD
```typescript
// Siempre usa fallback, hdurl es opcional
const imageUrl = apod.hdurl || apod.url;
```

---

## 🔮 Futuras APIs

### En Roadmap:

- [ ] **NEO (Near Earth Objects)**
- [ ] **Mars Rover Photos**
- [ ] **ISS Location**
- [ ] **EPIC Earth Images**

---

## 📚 Referencias

- [NASA APIs Documentation](https://api.nasa.gov/)
- [APOD API Docs](https://github.com/nasa/apod-api)

---

**Última actualización**: Febrero 2025