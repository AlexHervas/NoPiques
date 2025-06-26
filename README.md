# 🛡️ NoPiques

**Detector de phishing basado en IA que analiza mensajes y alerta sobre riesgo.**

## Índice

1. [Descripción](#descripción)
2. [Características](#características)
3. [Arquitectura](#arquitectura)
4. [Tecnologías utilizadas](#tecnologías-utilizadas)
5. [Instalación y uso](#instalación-y-uso)
   - 🍃 **Frontend**
   - ⚙️ **Backend**
6. [Funcionalidades destacadas](#funcionalidades-destacadas)
7. [Configuración y pruebas](#configuración-y-pruebas)
8. [Despliegue](#despliegue)
   - Frontend (Vercel)
   - Backend (Render / Railway)

---

## Descripción

**NoPiques** es una aplicación web desarrollada para ayudar a los usuarios a identificar posibles intentos de phishing en mensajes de texto. A través del análisis automatizado con un modelo de lenguaje, la app clasifica los mensajes como `danger`, `safe`, `neutral` o `uncertain`, ofreciendo un análisis instantáneo accesible para cualquier persona, sin necesidad de conocimientos técnicos.

El objetivo de esta app es combatir el creciente problema del phishing mediante herramientas de IA accesibles, visuales y rápidas. NoPiques busca ser una primera línea de defensa que ayude a prevenir fraudes, robos de identidad o engaños comunes a través de correos, SMS, mensajes de WhatsApp o redes sociales.

---

## 🧠 Cómo funciona

1. El usuario introduce un mensaje que cree sospechoso.
2. El frontend envía el mensaje al backend a través de una petición POST.
3. El backend:
   - Verifica si la IP ha alcanzado el límite diario.
   - Si no, reenvía el mensaje a OpenAI (GPT-3.5 Turbo) con una instrucción bien afinada.
   - Extrae y devuelve la clasificación: `danger`, `safe`, `neutral` o `uncertain`.
4. El frontend:
   - Muestra el resultado con un diseño claro, color codificado y explicativo.
   - Guarda el análisis en el historial (localStorage) si no hay errores.

---

## 🌐 Web

🧪 **Versión de prueba:**  
[https://no-piques.vercel.app](https://no-piques.vercel.app)

---

## Características

- Input de texto para analizar mensajes sospechosos.
- API REST en Node.js / Express con análisis alimentado por OpenAI.
- Historial local (localStorage) de los últimos 10 análisis.
- Límite diario de 5 análisis por IP (rate limiter con Redis).
- Soporte de modo claro / oscuro con botón toggle.
- Diseño limpio con Tailwind CSS + animaciones suaves.
- Open Graph y favicon personalizados para redes sociales.

---

## Arquitectura

```
┌────────────┐     HTTPS POST      ┌────────────┐     OpenAI API     ┌─────────────┐
│ Frontend   │  ───────────────►   │Backend Node│  ───────────────►  │   OpenAI    │
│ (React TS) │ request /api/analyze│ + Express  │ call completion    │ (GPT-3.5)   │
└────────────┘                     └──────┬─────┘                    └─────────────┘
                                          │
                                          ▼
                                   ┌────────────┐
                                   │   Redis    │ ← Redis (`analyze_count:<ip>`, TTL 24h) rateLimiter
                                   └────────────┘
```

---

## Tecnologías utilizadas

### Frontend

- **React** con _Vite_ y **TypeScript** para una experiencia moderna de desarrollo rápida y tipada.
- **Tailwind CSS v4** para estilos utilitarios, diseño responsive y modo claro/oscuro con configuración sencilla.
- **Lucide-react** como librería de iconos SVG reactivos y minimalistas.
- **localStorage** para guardar y recuperar el historial local de análisis.
- **Etiquetas Open Graph** para mejorar la vista previa al compartir enlaces en redes sociales como WhatsApp, Twitter o Facebook.

### Backend

- **Node.js** con **Express** para la creación de una API REST sencilla y eficiente.
- **OpenAI API (GPT-3.5 Turbo)** como motor de análisis de los mensajes, con instrucciones preconfiguradas para detección de phishing.
- **TypeScript** para tipado fuerte.
- **dotenv** para gestionar variables de entorno y claves de API de forma segura.
- **Redis Enterprise Cloud** para:
  - Limitar el número de análisis por usuario (5 diarios por IP).
  - Almacenar temporalmente los recuentos de uso diario con TTL (24h).
- **CORS** para permitir conexión segura desde el frontend.

---

## Instalación y uso

### 1. Clonar repositorio

```bash
git clone https://github.com/AlexHervas/NoPiques.git
cd NoPiques
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# Abre http://localhost:5173
```

### 3. Backend

```bash
cd backend
npm install
cp .env.example .env
# Completa con tus credenciales:
# PORT, OPENAI_API_KEY, OPENAI_MODEL, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD
npm run build
npm run start
# Corre en http://localhost:4000/api/analyze
```

---

## Funcionalidades destacadas

### 🎨 Modo oscuro

Funcionamiento:

- Detectado desde `localStorage` guardado en `theme`
- Toggle en header que añade / quita clase `dark` al root
- Estilos `dark:` controlados por Tailwind

### 🕓 Historial

- Almacena análisis recientes (máx. 10) en **localStorage**
- Componente `AnalysisHistory` muestra resultados con estilos por nivel

### 🛑 Rate limiting

- Middleware `rateLimiter` verifica por IP
- Usa clave `analyze_count:<ip>` en Redis
- Limita a 5 peticiones por día; bloquea con 429
- Script `clearRedisKeys.ts` para reset manual

---

## Configuración y pruebas

- Configura `.env` en backend con llaves y credenciales Redis
- Ejecuta backend local y frontend para desarrollo conjunto
- Prueba límite diario con Incognito o diferentes dispositivos
- Limpieza de contadores con `npm run clear-redis`

---

## Despliegue

### Frontend – Vercel

- Enlaza tu repo GitHub a Vercel
- Deploy automático tras push a `main`
- Verifica dominios y ajustes (p. ej. `/favicon.ico`, `/opengraph-image.png`)

### Backend – Render o Railway

- Configura servicio tipo Node.js con build:
  - `npm install && npm run build`
  - Start: `npm run start`
- Env vars: `OPENAI_API_KEY`, `OPENAI_MODEL`, `REDIS_*`, `PORT`

---
