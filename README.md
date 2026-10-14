# 🏦 BancoXYZ App

Aplicación móvil desarrollada con **React Native, Expo y TypeScript** como parte de la prueba técnica para el cargo de Desarrollador Frontend de BancoXYZ.

El proyecto está orientado a la gestión de operaciones bancarias básicas, con una arquitectura modular, componentes reutilizables y separación de responsabilidades.

## 🚀 Funcionalidades

- **Autenticación:** inicio de sesión con correo electrónico y contraseña.
- **Consulta de saldo:** visualización del saldo actual del usuario.
- **Tema:** cambio entre los modos claro y oscuro.
- **Transferencias bancarias:** envío y programación de transferencias futuras.
- **Historial de transferencias:** consulta de movimientos con filtros por destinatario, valor y fecha.
- **Pruebas unitarias:** configuración de Jest para validar funcionalidades importantes.

## 🛠️ Tecnologías

| Tecnología                   | Uso                             |
| ---------------------------- | ------------------------------- |
| React Native                 | Desarrollo móvil                |
| Expo SDK 57                  | Entorno de desarrollo           |
| TypeScript                   | Tipado estático                 |
| Expo Router                  | Navegación basada en archivos   |
| Axios                        | Consumo de APIs REST            |
| TanStack React Query         | Gestión de datos del servidor   |
| Zustand                      | Manejo del estado global        |
| React Hook Form              | Gestión de formularios          |
| Zod                          | Validación de datos             |
| NativeWind y Tailwind CSS    | Estilos de interfaz             |
| Phosphor React Native        | Iconos de la aplicación         |
| AsyncStorage                 | Persistencia local de datos     |
| Expo SecureStore             | Almacenamiento seguro de sesión |
| date-fns                     | Manejo y formato de fechas      |
| React Native Reanimated      | Animaciones                     |
| Jest                         | Pruebas unitarias               |
| React Native Testing Library | Pruebas de componentes          |
| ESLint                       | Análisis estático del código    |

## 📐 Arquitectura

El proyecto combina **Atomic Design** para organizar los componentes visuales con una arquitectura modular para separar las funcionalidades del dominio.

```text
src/
├── api/                 # Configuración de los clientes HTTP
├── app/                 # Rutas y pantallas de Expo Router
│   ├── (tabs)/          # Inicio, transferencias e historiales
│   └── auth/            # Rutas de autenticación
├── components/          # Componentes reutilizables y pantallas
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── screens/
│   └── templates/
├── constants/           # Constantes y colores
├── context/             # Contextos compartidos
├── hooks/               # Hooks personalizados
├── infrastructure/      # Adaptadores de almacenamiento
├── modules/             # Funcionalidades organizadas por dominio
│   ├── auth/
│   ├── balance/
│   └── transfer/
├── theme/               # Configuración del tema
└── utils/               # Funciones auxiliares

__tests__/               # Pruebas unitarias
```

Las rutas de navegación se definen en `src/app/`. Los componentes visuales se organizan por nivel en `src/components/`, y la lógica y validaciones de autenticación, saldo y transferencias están en `src/modules/`.

## ⚙️ Instalación y ejecución

### Requisitos

- Node.js compatible con Expo SDK 57.
- npm.
- Android Studio para ejecutar en un emulador Android, o un dispositivo/emulador compatible con Expo.

### 1. Clonar el repositorio

```bash
git clone https://github.com/xh4rz/BancoXYZ-app.git
```

Entrar en la carpeta del proyecto:

```bash
cd BancoXYZ-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
EXPO_PUBLIC_AUTH_API_URL=https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default
EXPO_PUBLIC_BALANCE_API_URL=https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default
EXPO_PUBLIC_TRANSFER_API_URL=https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default
EXPO_PUBLIC_TRANSFER_HISTORY_API_URL=https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default
```

Estas variables corresponden a los servicios de autenticación, consulta de saldo, transferencias e historial de transferencias.

### 4. Iniciar la aplicación

Para iniciar el servidor de desarrollo de Expo:

```bash
npx expo start
```

### Ejecutar en el simulador Android

Abre un emulador desde Android Studio y, desde la carpeta del proyecto, ejecuta:

```bash
npm run android
```

El comando compila e instala la aplicación en el emulador Android. Se requiere tener Android Studio y el SDK de Android configurados.

Después, inicia el servidor de desarrollo:

```bash
npm run start
```

Otros comandos disponibles:

```bash
npm run ios
npm run web
```

La ejecución de cada plataforma depende de la configuración del entorno y de las herramientas instaladas.

## 🧪 Pruebas y calidad de código

Ejecutar las pruebas unitarias una sola vez:

```bash
npm test -- --watchAll=false
```

Ejecutar ESLint:

```bash
npm run lint
```

## 🔗 Repositorio

[GitHub — BancoXYZ App](https://github.com/xh4rz/BancoXYZ-app)

## 🎯 Objetivo

Desarrollar una aplicación bancaria móvil que cumpla con los requisitos de la prueba técnica de BancoXYZ, aplicando buenas prácticas de programación, modularidad, mantenibilidad y una experiencia de usuario clara e intuitiva.

## 📲 Descargar APK

Puedes descargar la versión compilada de la aplicación para Android desde la sección de Releases de GitHub.

**[Descargar BancoXYZ App v1.0.0 (APK)](https://github.com/xh4rz/BancoXYZ-app/releases/tag/v1.0.0)**

Descarga el archivo `.apk` disponible en los assets de la versión e instálalo en un dispositivo Android compatible.
