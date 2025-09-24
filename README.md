# 📌 Minizesty

Aplicación móvil desarrollada en **React Native** (CLI) con soporte para NativeWind (Tailwind CSS para React Native). Permite visualizar y gestionar portafolios de inversión en tiempo real, integrando WebSocket para datos en vivo.

---
# � Decisiones técnicas y trade-offs

**Framework:** React Native CLI en vez de Expo, por mayor familiaridad y control nativo. Expo fue descartado por posibles limitaciones y menor experiencia previa.

**Modularidad:** Código estructurado en módulos y hooks reutilizables, siguiendo principios SOLID para facilitar mantenibilidad y escalabilidad.

**Design System:** Sistema propio para colores y estilos, permitiendo consistencia visual y cambios globales sencillos.

**WebSocket Mock:** Mock local para simular datos en tiempo real y facilitar pruebas sin backend.

**Trade-offs y limitaciones:**
- Control nativo total, pero mayor responsabilidad en dependencias y configuración.
- NativeWind requiere configuración específica y puede tener incompatibilidades con otras librerías.
- Performance no optimizado para dispositivos antiguos.
- Testing y cobertura limitada, sin pruebas E2E ni automatizadas.
- Sin soporte web ni internacionalización.
- No hay persistencia local ni manejo avanzado de accesibilidad.
- Manejo de errores simple, sin recuperación ni logging estructurado.
- No se integraron herramientas de métricas (NR, analytics, Amplitude, Crashlytics) por foco en arquitectura y UI.
- No se implementó manejo avanzado de errores (ej: modal/página dedicada) para caídas de WebSocket.
- No se incluyó icono ni splash screen personalizado.
- No se realizaron pruebas exhaustivas en Android ni en pantallas secundarias.
- No se implementó escalado de estilos por tamaño de pantalla (ej: función Scale).

# 🚧 Límites conocidos

- Falta de consideraciones de seguridad (no hay validaciones profundas ni manejo de datos sensibles).
- Sin integración a herramientas de métricas y seguimiento.
- Manejo de error limitado: si falla el WebSocket, solo se muestra un mensaje simple.
- No hay icono ni splash screen personalizado.
- Archivos de test y pruebas unitarias son mínimos o inexistentes.
- No se han probado todas las pantallas ni en Android.
- El escalado de estilos no está optimizado para todos los tamaños de pantalla.

# ⏱️ Tiempo real invertido

**Aproximado:** 7 horas


## 🚀 Características (Features)
- [x] Visualización de portafolio en tiempo real
- [x] Filtros y ordenamiento dinámico de activos
- [x] Gráficas interactivas por activo y periodo
- [x] Integración WebSocket para datos en vivo
- [x] Estilos con NativeWind (Tailwind CSS)

---

## 📂 Estructura del Proyecto
```bash
├── src/                # Código fuente principal (pantallas, hooks, stores, utils)
├── ios/                # Proyecto iOS (Swift/ObjC, CocoaPods)
├── android/            # Proyecto Android (Kotlin/Java)
├── global.css          # Estilos base para NativeWind
├── tailwind.config.js  # Configuración de Tailwind/NativeWind
├── metro.config.js     # Configuración Metro + NativeWind
├── babel.config.js     # Configuración Babel (NativeWind, Reanimated)
├── App.tsx             # Punto de entrada principal
├── index.js            # Registro de la app
├── package.json        # Dependencias JS
├── README.md           # Documentación principal
└── ...otros archivos de configuración
```

---

## ⚙️ Requisitos Previos
- Node.js 20+
- npm o yarn
- Ruby y Bundler (para CocoaPods en iOS)
- Xcode (macOS) y/o Android Studio
- [Entorno React Native configurado](https://reactnative.dev/docs/environment-setup)

---

## 🔧 Instalación y Configuración

```bash
# 1. Clonar el repositorio
git clone https://github.com/cmoraga-dev/minizesty.git
cd minizesty

# 2. Instalar dependencias JS
npm install
# o
yarn install

# 3. Instalar dependencias nativas iOS (solo en macOS)
bundle install
bundle exec pod install --project-directory=ios
```

---


## ▶️ Mock WebSocket local

Para desarrollo y pruebas puedes levantar un servidor WebSocket mock que simula datos de portafolio en tiempo real.

### Instrucciones:

```bash
# 1. Instala dependencias (si es necesario)
cd ws-mock
npm install

# 2. Ejecuta el mock
node ws-mock.js
# El servidor quedará escuchando en ws://localhost:8099
```

Luego, la app se conectará automáticamente a `ws://localhost:8099` para obtener datos simulados.

---

## ▶️ Uso

### Iniciar Metro Bundler
```bash
npm start
# o
yarn start
```

### Ejecutar en Android
```bash
npm run android
# o
yarn android
```

### Ejecutar en iOS
```bash
npm run ios
# o
yarn ios
```

---

## 🧪 Pruebas

```bash
npm test
# o
yarn test
```

---

## 📖 Documentación

- [Guía de React Native](https://reactnative.dev/docs/getting-started)
- [Guía NativeWind](https://www.nativewind.dev/quick-starts/react-native)
- [Guía del usuario](docs/user_guide.md)  
- [Referencia de API](docs/api_reference.md)  

---

## 🛠️ Tecnologías

- Lenguaje: TypeScript
- Frameworks: React Native CLI, NativeWind
- Infraestructura: Metro, CocoaPods, Android Studio, Xcode

---

## 🤝 Contribución

1. Haz un fork del proyecto  
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`  
3. Haz commit de tus cambios  
4. Haz push a la rama  
5. Abre un Pull Request  

---

## 📜 Licencia

Este proyecto está bajo la licencia MIT
