# Geocore Web 🏗️💎

Sitio web corporativo de **Geocore**, empresa líder especializada en **Geotecnia de Alta Precisión**, supervisión técnica, control de calidad y consultoría de ingeniería.

Este proyecto está construido con un enfoque en el rendimiento, la escalabilidad y una experiencia de usuario fluida mediante animaciones modernas.

---

## 🚀 Stack Tecnológico

- **Framework:** [Astro 5.10+](https://astro.build/) (Generación de sitios estáticos ultrarrápidos).
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/) (Vía el nuevo plugin oficial de Vite).
- **Animaciones:** [GSAP 3.13](https://gsap.com/) (Para interacciones y efectos parallax de alto impacto).
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado estricto para un código más robusto).
- **Imágenes:** [Cloudinary](https://cloudinary.com/) (Optimización y entrega dinámica de assets).
- **Deployment:** [Netlify](https://www.netlify.com/) (Infraestructura global con Edge Functions).

---

## 📂 Estructura del Proyecto

El proyecto sigue un patrón de **Arquitectura de Componentes** modular para facilitar el mantenimiento:

```text
src/
├── assets/          # Imágenes optimizadas (WebP) y recursos estáticos.
├── components/      # Componentes atómicos organizados por dominio (Home, Services, etc.).
├── layouts/         # Plantillas maestras (Header, Footer, Layout base).
├── pages/           # Rutas del sitio (index, nosotros, equipos, servicios, etc.).
├── styles/          # Estilos globales y configuración de Tailwind.
└── astro.config.mjs # Configuración central de Astro y plugins.
```

---

## 🛠️ Instalación y Desarrollo

Asegurate de tener instalado [Node.js](https://nodejs.org/) y [Yarn](https://yarnpkg.com/).

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repo>
   cd geocore-web
   ```

2. **Instalar dependencias:**
   ```bash
   yarn install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   yarn dev
   ```
   El sitio estará disponible en `http://localhost:4321`.

4. **Generar la versión de producción:**
   ```bash
   yarn build
   ```

---

## 🌐 Despliegue

El proyecto está configurado para desplegarse automáticamente en **Netlify** cada vez que se hace un push a la rama principal.

- **Adaptador:** `@astrojs/netlify`
- **Output:** Estático (Optimizado para CDN).

---

## ✨ Características Destacadas

- **Rendimiento Máximo:** Aprovecha las islas de Astro para minimizar el JS enviado al cliente.
- **SEO Ready:** Estructura semántica de HTML y optimización de metadatos.
- **Visuales Modernos:** Uso intensivo de GSAP para animaciones que no comprometen el performance.
- **Assets Optimizados:** Imágenes en formato WebP para tiempos de carga mínimos.

---

Desarrollado con ❤️ para **Geocore**.
