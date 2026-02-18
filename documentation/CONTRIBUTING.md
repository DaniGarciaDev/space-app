# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a **Space Explorer**!

---

## 🚀 Cómo Contribuir

### 1. Fork del proyecto
```bash
# En GitHub, haz click en "Fork"
# Luego clona tu fork
git clone https://github.com/TU-USUARIO/space-explorer.git
cd space-explorer
```

### 2. Crea una rama
```bash
# Crea una rama descriptiva
git checkout -b feature/nueva-funcionalidad
git checkout -b fix/correccion-bug
git checkout -b docs/actualizar-readme
```

### 3. Haz tus cambios

- Sigue las [Convenciones de Código](./CONVENTIONS.md)
- Mantén los commits atómicos
- Escribe tests si es posible

### 4. Commit
```bash
# Mensajes descriptivos en español
git add .
git commit -m "feat: agregar galería de asteroides"
git commit -m "fix: corregir error en fecha de APOD"
git commit -m "docs: actualizar guía de instalación"
```

### 5. Push y Pull Request
```bash
git push origin feature/nueva-funcionalidad
```

Luego ve a GitHub y crea un Pull Request.

---

## 📝 Convención de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):
```
tipo(scope): descripción

[cuerpo opcional]

[footer opcional]
```

### Tipos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan código)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

### Ejemplos
```bash
feat(apod): agregar paginación en galería
fix(api): corregir manejo de errores en NASA service
docs(readme): actualizar instrucciones de instalación
style(card): mejorar espaciado en APODCard
refactor(services): simplificar lógica de getAPOD
test(utils): agregar tests para formatDate
chore(deps): actualizar Astro a v4.2
```

---

## 🧪 Tests
```bash
# Ejecutar tests
npm run test

# Tests en watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Escribir tests
```typescript
import { describe, it, expect } from 'vitest';
import { formatDate } from '../utils/dates';

describe('formatDate', () => {
  it('debería formatear fecha correctamente', () => {
    const date = new Date('2024-02-18');
    expect(formatDate(date)).toBe('2024-02-18');
  });
});
```

---

## 📋 Checklist antes de PR

- [ ] El código sigue las [Convenciones](./CONVENTIONS.md)
- [ ] He agregado/actualizado tests si es necesario
- [ ] He actualizado la documentación
- [ ] Todos los tests pasan (`npm run test`)
- [ ] No hay errores de TypeScript (`npm run check`)
- [ ] El código está formateado (`npm run format`)
- [ ] He probado en local (`npm run dev`)
- [ ] He actualizado el CHANGELOG si es relevante

---

## 🔍 Code Review

### Qué esperamos

- **Código limpio**: Sigue SOLID y convenciones
- **Tests**: Si agregas features, agrega tests
- **Documentación**: Actualiza docs si cambias APIs
- **Commits limpios**: Mensajes descriptivos

### Proceso

1. Creas el PR
2. Revisión automática (CI)
3. Revisión manual (maintainer)
4. Cambios si son necesarios
5. Merge 🎉

---

## 🐛 Reportar Bugs

### Template de Issue
```markdown
**Descripción del bug**
Una descripción clara del problema.

**Pasos para reproducir**
1. Ve a '...'
2. Click en '...'
3. Ver error

**Comportamiento esperado**
Lo que debería pasar.

**Screenshots**
Si aplica.

**Entorno**
- OS: [e.g. macOS]
- Browser: [e.g. Chrome 120]
- Node version: [e.g. 18.14.1]
```

---

## 💡 Solicitar Features

### Template
```markdown
**Descripción de la feature**
¿Qué quieres agregar?

**Problema que resuelve**
¿Por qué es útil?

**Propuesta de solución**
Cómo podría implementarse.

**Alternativas**
Otras opciones consideradas.
```

---

## 📞 Contacto

- GitHub Issues: Para bugs y features
- Discussions: Para preguntas generales
- Email: [tu-email] para temas privados

---

## 📄 Licencia

Al contribuir, aceptas que tus contribuciones serán licenciadas bajo MIT.

---

¡Gracias por contribuir! 🚀