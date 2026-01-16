# Products CRUD – Frontend 🚀

Aplicación web desarrollada como prueba técnica Frontend, cuyo objetivo es consumir una API REST para listar, buscar y administrar productos, aplicando buenas prácticas de desarrollo, arquitectura limpia y una experiencia de usuario moderna.

---

## 📌 Demo en Producción

🔗 Frontend desplegado en Vercel:
https://products-crud-zeta.vercel.app/

---

## 🧱 Stack Tecnológico

### Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* shadcn/ui (componentes UI)
* Zustand (estado global)
* Axios (consumo de API)
* React Hook Form + Zod (formularios y validaciones)

### Calidad y Buenas Prácticas

* ESLint
* Prettier
* Custom Hooks
* Componentes reutilizables
* Lazy Loading / Code Splitting

### Testing

* Vitest
* React Testing Library
* Cypress / Playwright (E2E)

---

## 🧠 Arquitectura del Proyecto

El proyecto sigue una estructura modular y escalable:

```txt
src/
 ├─ api/            # Capa de consumo de API
 ├─ components/     # Componentes reutilizables
 ├─ hooks/          # Custom hooks (lógica reutilizable)
 ├─ store/          # Estado global (Zustand)
 ├─ pages/          # Vistas principales
 ├─ types/          # Tipos e interfaces TypeScript
 ├─ App.tsx
 └─ main.tsx
```

Esta separación permite un código más mantenible, testeable y fácil de escalar.

---

⚙️ Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto frontend:

```env
VITE_API_BASE_URL=http://localhost:3001
```

En producción, esta variable debe apuntar a la URL del backend correspondiente.

---

## ▶️ Cómo Correr el Frontend Localmente

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

## 🔌 Funcionalidades Implementadas

### Funcionalidad Base

* Listado de productos
* Búsqueda por nombre, descripción o categoría
* Manejo de estados Loading / Error

### Funcionalidad Avanzada (Puntos Extra)

* CRUD completo (Crear, Editar, Eliminar productos)
* Validación de formularios
* Estado global con Zustand
* Custom hooks reutilizables
* Paginación
* Diseño responsive
* Lazy loading
* Testing unitario y E2E
* Código formateado con ESLint y Prettier

---

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

Los tests cubren componentes clave y flujos principales de la aplicación.

---

## ☁️ Deployment

### Frontend

El frontend fue desplegado utilizando Vercel, aprovechando su integración directa con proyectos React + Vite.

🔗 URL en producción:

```
(Agrega aquí tu URL de Vercel)
```

---

## 🖥️ Backend Deployment

El backend fue desarrollado con **Bun + Hono**, siguiendo las instrucciones de la prueba técnica.

Actualmente, Cloudflare Workers no soporta Bun como runtime de ejecución, por lo que el backend se mantiene para ejecución local o despliegue en plataformas compatibles con Bun, tales como:

* VPS
* Fly.io
* Railway (usando Docker)

Esta decisión se tomó para **preservar la compatibilidad y estabilidad del backend**, evitando modificaciones innecesarias al stack original.

---

## 📄 Notas Finales

* Se priorizó calidad de código, arquitectura limpia y buenas prácticas.
* El proyecto está pensado para ser fácilmente escalable.
* El uso de herramientas modernas busca reflejar un entorno de trabajo real.

---

✅ Autor: Alexis Benjamin Rivas Bonilla
