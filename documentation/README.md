# 📚 Documentación - Space Explorer

Bienvenido a la documentación del proyecto **Space Explorer**, un portfolio interactivo sobre el espacio que consume APIs de NASA.

## 📖 Índice de Documentación

### Para desarrolladores

1. **[Instalación y Setup](./SETUP.md)**
   - Requisitos previos
   - Instalación de dependencias
   - Configuración del entorno
   - Primeros pasos

2. **[Arquitectura](./ARCHITECTURE.md)**
   - Visión general del sistema
   - Estructura de carpetas
   - Capas y responsabilidades
   - Principios de diseño
   - Flujo de datos

3. **[APIs y Servicios](./API.md)**
   - NASA APOD API
   - Servicios implementados
   - Manejo de errores
   - Rate limits
   - Ejemplos de uso

4. **[Componentes](./COMPONENTS.md)**
   - Catálogo de componentes
   - Props y uso
   - Variantes
   - Ejemplos

5. **[Convenciones de Código](./CONVENTIONS.md)**
   - Naming conventions
   - Estructura de archivos
   - TypeScript guidelines
   - Estilos y CSS

6. **[Guía de Contribución](./CONTRIBUTING.md)**
   - Cómo contribuir
   - Git workflow
   - Pull requests
   - Code review

---

## 🚀 Quick Start
```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Agregar tu NASA API key
NASA_API_KEY=tu_api_key_aqui

# 4. Iniciar servidor de desarrollo
npm run dev
```

---

## 🛠️ Stack Tecnológico

- **Framework**: Astro 4.x
- **Lenguaje**: TypeScript
- **Estilos**: CSS nativo (CSS Variables)
- **APIs**: NASA Open APIs
- **Deploy**: (Pendiente)

---

## 📁 Estructura del Proyecto
```
space-explorer/
├── docs/              # 📚 Documentación
├── public/            # Archivos estáticos
├── src/
│   ├── components/    # Componentes reutilizables
│   ├── layouts/       # Layouts de página
│   ├── pages/         # Rutas (file-based routing)
│   ├── services/      # Lógica de negocio y APIs
│   ├── types/         # Tipos TypeScript
│   └── utils/         # Funciones auxiliares
├── .env               # Variables de entorno
└── package.json
```

---

## 🎯 Objetivos del Proyecto

Este proyecto sirve como:

1. **Portfolio profesional** - Demuestra habilidades técnicas
2. **Estudio de arquitectura** - Implementa clean code y SOLID
3. **Práctica con APIs** - Integración con servicios externos
4. **Aprendizaje de Astro** - Framework moderno para web

---

## 📞 Contacto y Soporte

- **Autor**: [Dani García]
- **GitHub**: [DaniGarciaDev]
- **Email**: [danigarciaper@gmail.com]

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

**Última actualización**: Febrero 2025