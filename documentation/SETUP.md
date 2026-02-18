# ⚙️ Instalación y Configuración

Guía completa para configurar el proyecto **Space Explorer** en tu entorno local.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18.14.1 o superior
- **npm**: v9.0.0 o superior (viene con Node.js)
- **Git**: Para clonar el repositorio
- **Editor de código**: Recomendado VSCode

### Verificar instalación
```bash
node --version   # Debe ser >= 18.14.1
npm --version    # Debe ser >= 9.0.0
git --version
```

---

## 🚀 Instalación Paso a Paso

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/space-explorer.git
cd space-explorer
```

### 2. Instalar dependencias
```bash
npm install
```

Esto instalará:
- Astro
- TypeScript
- Dependencias de desarrollo

### 3. Configurar variables de entorno

#### 3.1 Crear archivo `.env`
```bash
# En la raíz del proyecto
touch .env
```

#### 3.2 Obtener NASA API Key

1. Ve a https://api.nasa.gov/
2. Completa el formulario de registro (es gratis e instantáneo)
3. Copia tu API key

#### 3.3 Configurar `.env`
```env
# .env
NASA_API_KEY=tu_api_key_aqui
```

**⚠️ Importante**: 
- Nunca commitees el archivo `.env`
- El `.env.example` está en el repo como referencia
- La NASA API key tiene límite de 1000 requests/hora

### 4. Iniciar servidor de desarrollo
```bash
npm run dev
```

El proyecto estará disponible en: **http://localhost:4321**

---

## 📦 Scripts Disponibles
```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con hot reload

# Build
npm run build        # Compila el proyecto para producción
npm run preview      # Previsualiza la build de producción

# Calidad de código
npm run check        # Verifica tipos TypeScript
npm run format       # Formatea código (si tienes Prettier)
npm run lint         # Linter (si tienes ESLint)
```

---

## 🔧 Configuración de VSCode (Recomendado)

### Extensiones recomendadas

Crea `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "astro-build.astro-vscode",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ]
}
```

### Settings recomendados

Crea `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode"
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## 🌐 Variables de Entorno

### Archivo `.env.example`
```env
# NASA API Configuration
NASA_API_KEY=DEMO_KEY

# Development
NODE_ENV=development
```

### Uso en el código
```typescript
// Acceder a variables de entorno
const apiKey = import.meta.env.NASA_API_KEY;
```

**Nota**: En Astro, las variables de entorno están disponibles en `import.meta.env`

---

## 🐛 Solución de Problemas

### Error: "Cannot find module"

**Problema**: TypeScript no encuentra módulos

**Solución**:
```bash
# 1. Reiniciar servidor TypeScript en VSCode
Ctrl + Shift + P → "TypeScript: Restart TS Server"

# 2. Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

---

### Error: "NASA API rate limit exceeded"

**Problema**: Demasiadas peticiones a la API

**Solución**:
- Usa tu propia API key (no `DEMO_KEY`)
- Espera 1 hora para que se resetee el límite
- Implementa caché en desarrollo

---

### Puerto 4321 ya en uso

**Problema**: El puerto está ocupado

**Solución**:
```bash
# Opción 1: Mata el proceso en el puerto
npx kill-port 4321

# Opción 2: Usa otro puerto
npm run dev -- --port 3000
```

---

## 📚 Próximos Pasos

Una vez configurado el proyecto:

1. ✅ Lee la [Arquitectura](./ARCHITECTURE.md) para entender la estructura
2. ✅ Revisa los [Componentes](./COMPONENTS.md) disponibles
3. ✅ Consulta la [documentación de APIs](./API.md)
4. ✅ Familiarízate con las [Convenciones](./CONVENTIONS.md)

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa esta guía de troubleshooting
2. Busca en los [issues de GitHub](link-to-issues)
3. Crea un nuevo issue con detalles del error

---

**Última actualización**: Febrero 2025