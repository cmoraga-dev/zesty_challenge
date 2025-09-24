# 📐 Contexto para Generación de Design System por IA

Este archivo proporciona instrucciones y lineamientos claros para que un agente de IA pueda generar un **sistema de diseño visualmente coherente**, basado en las siguientes imágenes de referencia (capturas de una app móvil). El sistema debe ser compatible con **TailwindCSS** o **Bootstrap 5+**, y permitir la construcción rápida de UI consistentes.

---

## 🎨 Paleta de Colores (detectada visualmente)
```json
{
  "primary": "#6D4AFF",       // Botones, íconos activos
  "secondary": "#EFE9FD",     // Fondos secundarios, tags
  "accent": "#2D2C3A",        // Texto principal oscuro
  "text-muted": "#9D9D9D",    // Texto auxiliar
  "bg": "#F9F9FB",            // Fondo general
  "info": "#3A2D84",          // Banner de ayuda
  "success": "#2ECC71",
  "danger": "#E74C3C"
}
```

---

## 🔠 Tipografía
- Fuente base sugerida: `Inter`, `Roboto`, o `system-ui`
- Jerarquía detectada:
  - Títulos: `font-weight: 700`, `font-size: 24–28px`
  - Subtítulos / Labels: `font-weight: 600`, `font-size: 16–18px`
  - Texto normal: `font-weight: 400`, `font-size: 14–16px`
  - Texto auxiliar / notas: `font-weight: 400`, `font-size: 12–13px`

---

## 📦 Componentes UI identificados

### 🔘 Botones
- Primarios: color púrpura con texto blanco (`bg-primary`, `text-white`)
- Secundarios: bordes claros (`border border-primary`, `bg-white`, `text-primary`)
- Redondeados (`rounded-full` o `rounded-lg`)
- Tamaños `sm`, `md`, `lg`

### 🔍 Input de Búsqueda
- Icono de lupa embebido a la izquierda
- Borde claro, fondo blanco
- Texto placeholder en `gray-400`

### 🏷️ Chips / Etiquetas
- Bordes suaves (`rounded-full`)
- Padding interno (`px-4`, `py-1`)
- Texto oscuro sobre fondo claro (`text-accent`, `bg-secondary`)

### 🧭 Navegación Inferior (Bottom Nav)
- Íconos con etiqueta
- Opción activa en púrpura
- Íconos desactivados en `gray-400`

### 🟪 Banners informativos
- Fondo púrpura oscuro
- Texto blanco
- Barra de progreso circular a la izquierda (SVG o radial progress bar)

### 📊 Listado de acciones / fondos
- Nombre + código de acción (AAPL, AMZN, etc.)
- Precio en rojo o verde según la variación
- Layout tipo lista, íconos alineados a la izquierda

---

## 🧱 Recomendaciones para IA
- Generar `tailwind.config.js` con los colores definidos arriba como `theme.extend.colors`
- Componentes como `Button`, `Card`, `Chip`, `Navbar`, `InputSearch`, `Tag` deben exportarse como funciones reutilizables
- Evitar estilos inline y preferir clases utilitarias
- Agregar variantes de tamaño y estado a los botones (`hover`, `disabled`, etc.)
- Incluir `dark mode` usando `media` o clase `.dark`
- Preparar componentes en React o Vue como base para uso cross-plataforma

---

## 🧪 Diseño Base en Tailwind (ejemplo)
```html
<button class="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-purple-700">
  Completar registro
</button>
```

---

## 📁 Estructura esperada del sistema de diseño
```bash
design-system/
├── tailwind.config.js
├── tokens.json
├── components/
│   ├── Button.jsx
│   ├── Chip.jsx
│   ├── Navbar.jsx
│   ├── BannerInfo.jsx
├── css/
│   └── base.css
├── themes/
│   └── light.css
└── README.md
```
