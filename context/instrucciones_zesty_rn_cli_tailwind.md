# 📱 Instrucciones para Implementación IA – React Native CLI + Tailwind

Guía detallada para implementar el desafío técnico **Mini Zesty – Portafolio en tiempo real** usando **React Native CLI (sin Expo)** y **TailwindCSS** (mediante NativeWind). Incluye instrucciones para correr en simulador iOS y emulador Android.

---

## 🧠 Setup Inicial

### 1. Crear proyecto base con React Native CLI
```bash
npx react-native init MiniZesty
cd MiniZesty
```

### 2. Instalar dependencias clave
```bash
npm install nativewind tailwindcss react-native-svg
npx tailwindcss init
```

> En iOS:
```bash
cd ios && pod install && cd ..
```

---

## ⚙️ Configuración TailwindCSS con NativeWind

### 3. tailwind.config.js
```js
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6D4AFF',
        secondary: '#EFE9FD',
        accent: '#2D2C3A',
        'text-muted': '#9D9D9D',
        bg: '#F9F9FB',
        info: '#3A2D84',
        success: '#2ECC71',
        danger: '#E74C3C'
      }
    },
  },
  plugins: [],
}
```

### 4. babel.config.js
```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['nativewind/babel'],
}
```

---

## 📱 Ejecutar la App

### 5. iOS (macOS con Xcode)
```bash
npx react-native run-ios
```

### 6. Android (con Android Studio o emulador activo)
```bash
npx react-native run-android
```

---

## 📁 Estructura de Proyecto Sugerida
```bash
src/
├── components/        # UI Reutilizable (Card, Button, Chart, etc)
├── screens/           # Pantallas principales (Dashboard, Details)
├── hooks/             # Hooks personalizados (useWebSocket, etc)
├── services/          # Conexión WebSocket, lógica de datos
├── store/             # Estado global (Zustand)
├── utils/             # Formateo, helpers
└── assets/            # Iconos, imágenes
```

---

## 🔄 Fases de Implementación

### 🟣 Fase 1 – Mock y UI Base
- [ ] Crear mock local de portafolio con precios estáticos
- [ ] Implementar UI: Header, DashboardCard, Lista de posiciones

### 🟢 Fase 2 – Conexión a WebSocket
- [ ] Integrar WebSocket (`ws://localhost:8099`)
- [ ] Actualizar precios en tiempo real
- [ ] Mostrar histórico diario (últimos 60 días)

### 🔵 Fase 3 – Filtros y Gráficos
- [ ] Filtrar por `ticker` y `P&L`
- [ ] Ordenar por `P&L %`, peso y precio
- [ ] Gráfico por temporalidad: Hoy, 1 semana, 1 mes, 2 meses

### 🟡 Fase 4 – Optimización Final
- [ ] `FlatList`, `memo`, `useCallback`
- [ ] Loading / error states
- [ ] Documentación + video demo

---

## 🔌 WebSocket Mock
```bash
npm install ws
node ws-mock.js
```
Disponible en `ws://localhost:8081`

---

## 🎁 Entregables Esperados
- Repositorio GitHub (React Native CLI)
- README con:
  - Pasos de instalación y ejecución
  - Decisiones técnicas y límites
  - Tiempo real invertido
  - Sección “Uso de IA”
- Video demo (3–7 min) mostrando flujo y explicaciones

---

## 🤖 Consejos IA
- Separar lógica en hooks (`useWebSocket`) y store global (`usePortfolioStore`)
- Usar `NativeWind` para estilos
- Aplicar diseño basado en: `context_design_system_mobile.md`
