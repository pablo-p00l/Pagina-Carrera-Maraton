# 🏗️ ARQUITECTURA Y FLUJO DE LA APLICACIÓN

## 📊 Diagrama General

```
┌─────────────────────────────────────────────────────────────────┐
│                      NAVEGADOR (CLIENTE)                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  index.html                                              │  │
│  │  ├── Navbar (navegación)                                │  │
│  │  ├── Hero (presentación)                                │  │
│  │  ├── Galería (CARRUSEL INFINITO ⭐)                    │  │
│  │  ├── Votación (formulario + estadísticas)              │  │
│  │  ├── Contacto (formulario de mensajes)                 │  │
│  │  └── Footer (información)                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  JavaScript (app.js, carousel.js, api-client.js)       │  │
│  │  ├── Cargar fotos de la API                            │  │
│  │  ├── Manejar votación                                  │  │
│  │  ├── Enviar contactos                                  │  │
│  │  └── Actualizar estadísticas                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            ⬇️ HTTP/JSON
┌─────────────────────────────────────────────────────────────────┐
│                    SERVIDOR (Node.js + Express)                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  server.js (puerto 5000)                                │  │
│  │  ├── Rutas API                                          │  │
│  │  │   ├── /api/photos (GET, POST, PUT, DELETE)         │  │
│  │  │   ├── /api/votes (POST, GET stats)                 │  │
│  │  │   └── /api/contact (POST, GET)                     │  │
│  │  │                                                      │  │
│  │  ├── Controladores                                      │  │
│  │  │   ├── photoController.js                           │  │
│  │  │   ├── voteController.js                            │  │
│  │  │   └── contactController.js                         │  │
│  │  │                                                      │  │
│  │  └── Middleware                                         │  │
│  │      ├── CORS (permite requests del navegador)        │  │
│  │      ├── bodyParser (parsea JSON)                     │  │
│  │      └── errorHandler (maneja errores)                │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            ⬇️ Mongoose
┌─────────────────────────────────────────────────────────────────┐
│                  BASE DE DATOS (MongoDB)                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  byb_training (database)                                │  │
│  │  ├── photos (colección)                                │  │
│  │  │   ├── title, description, imageUrl, category       │  │
│  │  │   └── views, createdAt, updatedAt                  │  │
│  │  │                                                      │  │
│  │  ├── votes (colección)                                 │  │
│  │  │   ├── participantName, email, vote (si/no)        │  │
│  │  │   └── ipAddress, createdAt, updatedAt             │  │
│  │  │                                                      │  │
│  │  └── contacts (colección)                             │  │
│  │      ├── fullName, email, message                     │  │
│  │      └── read, createdAt, updatedAt                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujos de Datos

### 1️⃣ Cargar Fotos (Página carga)

```
Usuario abre → app.js → loadPhotos() → photoAPI.getAllPhotos()
    ↓
http://localhost:5000/api/photos (GET)
    ↓
server.js → photoController.getAllPhotos()
    ↓
MongoDB.photos.find() → datos
    ↓
JSON → navegador → React renderiza carrusel
```

### 2️⃣ Carrusel Infinito (En tiempo real)

```
CSS animation: scrollInfinite (30s lineal)
    ↓
JavaScript duplica items
    ↓
Efecto visual: desplazamiento continuo
    ↓
Mouse over → pausa animación
Mouse out → reanuda animación
Click → selectPhoto() → API (opcional)
```

### 3️⃣ Registrar Voto (Usuario elige SI/NO)

```
Usuario llena formulario (nombre, email)
    ↓
Click botón SI o NO → submitVote('si'/'no')
    ↓
http://POST /api/votes
    ↓
voteController.createVote()
    ↓
MongoDB.votes.insertOne({...})
    ↓
Response: {success: true}
    ↓
loadVoteStats() → actualiza porcentajes
```

### 4️⃣ Enviar Contacto (Formulario)

```
Usuario llena formulario (nombre, email, mensaje)
    ↓
Click "Enviar Mensaje" → sendContactMessage()
    ↓
http://POST /api/contact
    ↓
contactController.sendContact()
    ↓
MongoDB.contacts.insertOne({...})
    ↓
Response: {success: true}
    ↓
contactForm.reset() → limpia formulario
```

---

## 📁 Estructura de Carpetas y Archivos

```
proyecto/
│
├── server.js (★ PUNTO ENTRADA BACKEND)
│   └── Inicia el servidor en puerto 5000
│
├── Conexión a MongoDB
│   └── config_db.js → mongoose.connect()
│
├── Modelos (esquemas MongoDB)
│   ├── Photo_model.js (fotos)
│   ├── Vote_model.js (votos)
│   └── Contact_model.js (contactos)
│
├── Controladores (lógica de negocio)
│   ├── photoController.js
│   ├── voteController.js
│   └── contactController.js
│
├── Rutas (endpoints API)
│   ├── photos_routes.js → /api/photos
│   ├── votes_routes.js → /api/votes
│   └── contact_routes.js → /api/contact
│
├── Frontend (carpeta raíz)
│   ├── index.html (★ PUNTO ENTRADA FRONTEND)
│   │   └── HTML5 semántico, estructura completa
│   │
│   ├── styles.css (★ ESTILOS)
│   │   ├── Variables CSS (colores, transiciones)
│   │   ├── Responsive design
│   │   └── Animaciones (carrusel infinito, hovers)
│   │
│   ├── api-client.js (cliente HTTP)
│   │   ├── photoAPI.getAllPhotos()
│   │   ├── voteAPI.submitVote()
│   │   └── contactAPI.sendMessage()
│   │
│   ├── carousel.js (carrusel inteligente)
│   │   ├── Duplica items
│   │   ├── Maneja pausa/reanudar
│   │   └── Detecta selección
│   │
│   └── app.js (★ LÓGICA PRINCIPAL)
│       ├── Carga fotos al iniciar
│       ├── Carga estadísticas
│       ├── Maneja eventos de botones
│       ├── submitVote()
│       └── sendContactMessage()
│
├── Datos de prueba
│   └── sample-data.js → Carga 6 fotos, 5 votos, 2 contactos
│
├── Configuración
│   ├── package.json (dependencias)
│   ├── .env (variables de entorno)
│   ├── .gitignore (archivos ignorados)
│   ├── README.md (documentación completa)
│   ├── QUICK_START.md (guía rápida)
│   └── ARCHITECTURE.md (este archivo)
```

---

## 🔐 Autenticación y Seguridad

### Actualmente:
- ✅ CORS habilitado (permite requests del navegador)
- ✅ Validación de datos en servidor
- ✅ Variables de entorno para credenciales

### Para agregar en futuro:
- [ ] JWT para autenticación
- [ ] Rate limiting
- [ ] HTTPS
- [ ] Admin dashboard protegido

---

## 📊 Modelos de Base de Datos

### Photo Schema

```javascript
{
  _id: ObjectId,
  title: String (requerido),
  description: String,
  imageUrl: String (requerido),
  category: String,
  views: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Vote Schema

```javascript
{
  _id: ObjectId,
  participantName: String (requerido),
  participantEmail: String (requerido),
  vote: String enum: ['si', 'no'],
  ipAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Schema

```javascript
{
  _id: ObjectId,
  fullName: String (requerido),
  email: String (requerido),
  message: String (requerido),
  read: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🌐 Endpoints API

| Método | URL | Descripción | Body |
|--------|-----|-------------|------|
| **GET** | `/api/photos` | Obtener todas las fotos | — |
| **GET** | `/api/photos/:id` | Obtener una foto | — |
| **POST** | `/api/photos` | Crear foto | {title, imageUrl, description, category} |
| **PUT** | `/api/photos/:id` | Actualizar foto | {title, imageUrl, ...} |
| **DELETE** | `/api/photos/:id` | Eliminar foto | — |
| **POST** | `/api/votes` | Registrar voto | {participantName, participantEmail, vote} |
| **GET** | `/api/votes/stats` | Estadísticas votos | — |
| **POST** | `/api/contact` | Enviar contacto | {fullName, email, message} |
| **GET** | `/api/contact` | Obtener contactos | — |
| **GET** | `/api/health` | Verificar servidor | — |

---

## 🎨 Carrusel Infinito (Técnica)

### CSS Animation:

```css
.carousel {
  animation: scrollInfinite 30s linear infinite;
}

@keyframes scrollInfinite {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-300px * 4 - 4rem)); }
}
```

### JavaScript dupla items:

```javascript
// Original: [img1, img2, img3, img4]
// Después: [img1, img2, img3, img4, img1, img2, img3, img4]
// Efecto: scroll infinito sin "salto"
```

### Hover effects:

```css
.carousel-item:hover img {
  transform: scale(1.15) rotate(2deg);
  filter: brightness(0.8);
}

.photo-overlay {
  transform: translateY(100%) → translateY(0);
}
```

---

## 🚀 Flujo de Desarrollo

### Fase 1: Setup ✅
- [x] Estructura de carpetas
- [x] Dependencias npm
- [x] MongoDB conexión
- [x] Modelos Mongoose

### Fase 2: Backend ✅
- [x] Rutas API
- [x] Controladores
- [x] Validación

### Fase 3: Frontend ✅
- [x] HTML5 semántico
- [x] CSS responsivo
- [x] Carrusel infinito
- [x] Hover effects

### Fase 4: Integración ✅
- [x] API calls desde JS
- [x] CORS configurado
- [x] Datos cargando en tiempo real

### Fase 5: Datos de Prueba ✅
- [x] Script sample-data.js
- [x] 6 fotos de ejemplo
- [x] 5 votos de ejemplo

---

## 🧪 Testing Manual

### 1. Verificar conexión:
```bash
curl http://localhost:5000/api/health
# Response: {"status":"Servidor funcionando ✓"}
```

### 2. Verificar fotos:
```bash
curl http://localhost:5000/api/photos
# Response: {"success":true,"count":6,"data":[...]}
```

### 3. Registrar voto:
```bash
curl -X POST http://localhost:5000/api/votes \
  -H "Content-Type: application/json" \
  -d '{"participantName":"Juan","participantEmail":"juan@test.com","vote":"si"}'
```

---

## 📈 Performance

- **Carrusel**: Utiliza CSS puro para animaciones (mejor rendimiento)
- **API**: Respuestas rápidas desde MongoDB
- **Carga**: ~2-3 segundos (según conexión)
- **Móvil**: Fully responsive

---

## 🔮 Mejoras Futuras

- [ ] Admin panel para gestionar fotos
- [ ] Gallery modal (ampliar fotos)
- [ ] Filtros por categoría
- [ ] Búsqueda de fotos
- [ ] Comentarios en fotos
- [ ] Sistema de puntuación
- [ ] Notificaciones por email
- [ ] Analytics
- [ ] Integración con redes sociales
- [ ] App móvil

---

**¡Arquitectura lista para producción!** 🚀
