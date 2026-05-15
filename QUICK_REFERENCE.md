# 🚀 REFERENCIA RÁPIDA - COMANDOS Y TIPS

## ⚡ COMANDOS ESENCIALES

### Instalación (primera vez)
```powershell
npm install
npm run seed
npm run dev
```

### Desarrollo
```powershell
npm run dev          # Con reinicio automático
npm start            # Producción
npm run seed         # Cargar datos de prueba
```

### MongoDB
```bash
# Verificar que está corriendo
mongosh

# Ver bases de datos
show dbs

# Seleccionar BD
use byb_training

# Ver colecciones
show collections

# Ver documentos
db.photos.find()
db.votes.find()
db.contacts.find()

# Contar documentos
db.photos.count()
```

---

## 🌐 URLS IMPORTANTES

| Uso | URL |
|-----|-----|
| **Página web** | http://localhost:5000 |
| **API Fotos** | http://localhost:5000/api/photos |
| **API Votos** | http://localhost:5000/api/votes |
| **API Estadísticas** | http://localhost:5000/api/votes/stats |
| **API Contactos** | http://localhost:5000/api/contact |
| **Health Check** | http://localhost:5000/api/health |

---

## 🔧 ESTRUCTURA PRINCIPAL

```
proyecto/
├── server.js          ← Inicia aquí
├── index.html         ← Frontend
├── styles.css         ← Estilos
├── app.js             ← Lógica JS
├── api-client.js      ← Llamadas API
└── carousel.js        ← Carrusel
```

---

## 🎨 CSS - Variables Personalizables

```css
:root {
  --primary-color: #ff6b35;        /* Naranja */
  --secondary-color: #004e89;      /* Azul oscuro */
  --accent-color: #f7b801;         /* Amarillo */
  --dark-bg: #1a1a1a;              /* Negro */
  --light-bg: #f5f5f5;             /* Gris claro */
}
```

Cambia estos valores para cambiar toda la página.

---

## 🎬 CARRUSEL - PERSONALIZACIÓN

### Velocidad de scroll
```css
.carousel {
  animation: scrollInfinite 30s linear infinite; /* Cambiar 30s */
}
```

### Tamaño de items
```css
.carousel-item {
  min-width: 300px;  /* Ancho */
  height: 300px;     /* Alto */
}
```

### Efecto hover
```css
.carousel-item:hover img {
  transform: scale(1.15) rotate(2deg);  /* Cambiar números */
  filter: brightness(0.8);               /* Cambiar oscuridad */
}
```

---

## 📝 MODELOS DE BD

### Foto
```javascript
{
  title: "Nombre",
  description: "Descripción",
  imageUrl: "https://...",
  category: "carrera",
  views: 0
}
```

### Voto
```javascript
{
  participantName: "Nombre",
  participantEmail: "email@example.com",
  vote: "si" // o "no"
}
```

### Contacto
```javascript
{
  fullName: "Nombre",
  email: "email@example.com",
  message: "Mensaje"
}
```

---

## 🔌 API CALLS DESDE CURL

### Obtener fotos
```bash
curl http://localhost:5000/api/photos
```

### Crear foto
```bash
curl -X POST http://localhost:5000/api/photos \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Mi Foto",
    "imageUrl":"https://...",
    "description":"Desc"
  }'
```

### Registrar voto
```bash
curl -X POST http://localhost:5000/api/votes \
  -H "Content-Type: application/json" \
  -d '{
    "participantName":"Juan",
    "participantEmail":"juan@test.com",
    "vote":"si"
  }'
```

### Enviar contacto
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName":"María",
    "email":"maria@test.com",
    "message":"Hola"
  }'
```

---

## 🐛 TROUBLESHOOTING RÁPIDO

### ❌ "Cannot find module"
```powershell
rm node_modules -r -Force
npm install
```

### ❌ "Port already in use"
```powershell
# Cambiar puerto en .env
PORT=3000
```

### ❌ "MongoDB connection refused"
```bash
# Verificar MongoDB
mongosh

# Si no está corriendo (Docker):
docker run -d -p 27017:27017 --name mongodb mongo
```

### ❌ "Fotos no cargan"
```bash
# Verificar datos
mongosh
use byb_training
db.photos.count()

# Si es 0, ejecutar:
npm run seed
```

### ❌ "CORS error"
```javascript
// Verificar que CORS está habilitado en server.js
app.use(cors());
```

---

## 📱 BREAKPOINTS RESPONSIVE

```css
Desktop:  1200px+
Tablet:   768px - 1199px
Mobile:   < 768px
```

Todos automáticamente configurados en CSS.

---

## 🎯 FLUJOS PRINCIPALES

### Cargar página
1. Usuario abre http://localhost:5000
2. Server sirve index.html
3. JavaScript carga app.js
4. app.js → loadPhotos() → API
5. Fotos se cargan en carrusel
6. Estadísticas de votos se cargan

### Votar
1. Usuario llena nombre y email
2. Click SI o NO
3. submitVote() envía POST
4. API guarda en MongoDB
5. Estadísticas se actualizan

### Contacto
1. Usuario llena formulario
2. Click "Enviar"
3. sendContactMessage() envía POST
4. API guarda en MongoDB
5. Usuario recibe confirmación

---

## 🔐 VARIABLES DE ENTORNO (.env)

```env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/byb_training

# Con autenticación
MONGODB_URI=mongodb://usuario:contraseña@localhost:27017/byb_training

# Nube (Atlas)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority

# Puerto
PORT=5000

# Ambiente
NODE_ENV=development
```

---

## 📊 MONITOREAR ACTIVIDAD

### Ver requests en tiempo real
```bash
# En otra terminal
curl -s http://localhost:5000/api/votes/stats | jq .

# Para ver cada segundo
watch -n 1 'curl -s http://localhost:5000/api/votes/stats | jq .'
```

### Ver logs de MongoDB
```bash
mongosh
db.photos.find().pretty()
db.votes.find().pretty()
db.contacts.find().pretty()
```

---

## 🎨 COLORES UTILIZADOS

| Nombre | Código | Uso |
|--------|--------|-----|
| Naranja (Primary) | #ff6b35 | Botones principales |
| Azul (Secondary) | #004e89 | Fondos, títulos |
| Amarillo (Accent) | #f7b801 | Detalles, enfoque |
| Negro | #1a1a1a | Footer, texto oscuro |
| Gris claro | #f5f5f5 | Fondos claros |

---

## 📋 CHECKLIST PRE-DEPLOY

- [ ] MongoDB corriendo
- [ ] Server sin errores
- [ ] `npm run seed` ejecutado
- [ ] Fotos cargan
- [ ] Votación funciona
- [ ] Contacto funciona
- [ ] Sin CORS errors
- [ ] Responsive en móvil
- [ ] Todos los links funcionan
- [ ] Variables .env correctas

---

## 🚀 DEPLOY RÁPIDO A HEROKU

```bash
# Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

heroku login
heroku create nombre-tu-app
git push heroku main

# Ver logs
heroku logs --tail

# Configurar .env en Heroku
heroku config:set MONGODB_URI="tu_uri"
heroku config:set NODE_ENV="production"
```

---

## 🔗 ENLACES ÚTILES

| Recurso | URL |
|---------|-----|
| Node.js | https://nodejs.org |
| Express | https://expressjs.com |
| MongoDB | https://www.mongodb.com |
| Mongoose | https://mongoosejs.com |
| MDN Docs | https://developer.mozilla.org |

---

## 💡 TIPS PRO

1. **DevTools (F12)** - Tu mejor amigo para debugging
2. **Mongosh** - Para explorar la BD
3. **Postman** - Para testear APIs
4. **VS Code** - Editor recomendado
5. **nodemon** - Ya configurado, reinicia automático

---

## 🎓 APRENDER MÁS

Archivos a leer:
1. `README.md` - Documentación completa
2. `QUICK_START.md` - Paso a paso
3. `ARCHITECTURE.md` - Diseño del proyecto
4. `COMPLETION_SUMMARY.md` - Resumen

---

## 📞 AYUDA RÁPIDA

**¿No funciona?**
1. Lee los logs de error
2. Verifica que MongoDB está corriendo
3. Borra node_modules y npm install
4. Reinicia el servidor
5. Limpia cache del navegador

**¿Pregunta?**
1. Busca en README.md
2. Revisa ARCHITECTURE.md
3. Ve DevTools (F12)
4. Busca el endpoint en api-client.js

---

## ✅ ¡LISTO!

Tu referencia rápida está completa. Guarda este archivo para consultar siempre.

**¡Ahora a programar! 🚀**
