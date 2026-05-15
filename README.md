# ByB Training - Carrera 3 Quebrachos 🏅

Página web informativa completa con Node.js, Express y MongoDB para la Carrera 3 Quebrachos.

## 🚀 Características

✅ **Carrusel infinito de fotos** - Desplazamiento continuo con efecto hover  
✅ **Backend Node.js + Express** - APIs RESTful completas  
✅ **Base de datos MongoDB** - Almacenamiento de fotos, votos y contactos  
✅ **Votación en tiempo real** - Registro de participantes  
✅ **Formulario de contacto** - Recepción de mensajes  
✅ **Diseño responsive** - Mobile first  
✅ **Integración completa** - Frontend y backend conectados  

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v14+) - https://nodejs.org/
- **MongoDB** (Instalado localmente o en la nube)
- **npm** (viene con Node.js)

### Verificar instalación:
```bash
node --version
npm --version
```

---

## 🔧 Instalación

### 1️⃣ Clonar o descargar el proyecto

```bash
cd /ruta/del/proyecto
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

Esto instará:
- `express` - Framework web
- `mongoose` - ODM para MongoDB
- `dotenv` - Variables de entorno
- `cors` - Cross-Origin Resource Sharing
- `body-parser` - Parsear JSON
- `nodemon` - Reinicio automático en desarrollo

---

## 🗄️ Configuración de MongoDB

### **Opción A: MongoDB Local (Recomendado para desarrollo)**

#### Windows:
1. Descarga MongoDB Community: https://www.mongodb.com/try/download/community
2. Instala con las opciones por defecto
3. MongoDB se inicia automáticamente como servicio
4. Verifica que esté corriendo:
   ```bash
   mongosh
   # Debería conectarse a localhost:27017
   ```

#### macOS (con Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Docker (recomendado):
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### **Opción B: MongoDB Atlas (Nube - Recomendado para producción)**

1. Visita https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratuita
3. Crea un cluster
4. Obtén la cadena de conexión (Connection String)
5. Reemplázala en `.env`

---

## ⚙️ Configuración del Proyecto

### 1. Editar el archivo `.env`

```env
# Para MongoDB local SIN autenticación:
MONGODB_URI=mongodb://localhost:27017/byb_training

# Para MongoDB local CON autenticación:
MONGODB_URI=mongodb://admin:tu_contraseña@localhost:27017/byb_training

# Para MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/byb_training?retryWrites=true&w=majority

PORT=5000
NODE_ENV=development
```

---

## 🚀 Ejecutar la Aplicación

### **Modo Desarrollo (con reinicio automático):**

```bash
npm run dev
```

### **Modo Producción:**

```bash
npm start
```

### Output esperado:
```
✓ MongoDB conectado exitosamente
✓ Servidor corriendo en http://localhost:5000
```

---

## 🌐 Acceder a la Aplicación

Una vez que el servidor está corriendo:

1. Abre tu navegador
2. Ve a: **http://localhost:5000**
3. ¡Disfruta de la página! 🎉

---

## 📁 Estructura del Proyecto

```
agents-pagina-web-informativa-nodejs-mongodb/
├── server.js                 # Servidor principal
├── config_db.js              # Conexión a MongoDB
├── Photo_model.js            # Modelo de fotos
├── Vote_model.js             # Modelo de votos
├── Contact_model.js          # Modelo de contactos
├── photoController.js        # Lógica de fotos
├── voteController.js         # Lógica de votos
├── contactController.js      # Lógica de contactos
├── photos_routes.js          # Rutas de fotos
├── votes_routes.js           # Rutas de votos
├── contact_routes.js         # Rutas de contacto
├── index.html                # HTML principal
├── styles.css                # Estilos CSS
├── api-client.js             # Cliente de API
├── carousel.js               # Lógica del carrusel
├── app.js                    # Lógica principal
├── package.json              # Dependencias
├── .env                      # Variables de entorno
└── .gitignore                # Archivos ignorados
```

---

## 🔌 Endpoints de la API

### **Fotos**
- `GET /api/photos` - Obtener todas las fotos
- `GET /api/photos/:id` - Obtener una foto
- `POST /api/photos` - Crear nueva foto
- `PUT /api/photos/:id` - Actualizar foto
- `DELETE /api/photos/:id` - Eliminar foto

### **Votos**
- `POST /api/votes` - Registrar voto
- `GET /api/votes/stats` - Obtener estadísticas

### **Contacto**
- `POST /api/contact` - Enviar mensaje
- `GET /api/contact` - Obtener mensajes (admin)

### **Health Check**
- `GET /api/health` - Verificar estado del servidor

---

## 🎨 Características Visuales

### ✨ Carrusel de Fotos
- Desplazamiento infinito automático
- Pausa al pasar el mouse
- Efecto hover con zoom y oscurecimiento
- Overlay de información al pasar el mouse
- Seleccionar fotos al hacer clic

### 🎯 Votación
- Formulario en tiempo real
- Estadísticas actualizadas
- Botones interactivos (SI / NO)

### 📞 Contacto
- Formulario completo
- Información de ubicación
- Enlaces a redes sociales
- Horario de respuesta

---

## 🧪 Pruebas

### Verificar que todo funciona:

1. **Conectividad MongoDB:**
   ```bash
   mongosh
   use byb_training
   show collections
   ```

2. **API Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   ```

3. **Obtener fotos:**
   ```bash
   curl http://localhost:5000/api/photos
   ```

---

## 🐛 Troubleshooting

### ❌ "Error: MongoDB connection refused"
- Verifica que MongoDB está corriendo
- Linux/macOS: `sudo systemctl status mongod`
- Windows: Busca "Services" y verifica "MongoDB Server"
- Docker: `docker ps | grep mongo`

### ❌ "Port 5000 already in use"
- Cambia el puerto en `.env`
- O mata el proceso: `lsof -ti:5000 | xargs kill -9`

### ❌ "Cannot find module 'express'"
- Ejecuta: `npm install`
- Verifica que estés en la carpeta correcta

### ❌ Las fotos no cargan en el carrusel
- Verifica que las URLs de las imágenes son válidas
- Comprueba que MongoDB tiene datos en la colección `photos`
- Abre DevTools (F12) para ver errores

---

## 📝 Agregar Fotos a la Base de Datos

### Usando curl:
```bash
curl -X POST http://localhost:5000/api/photos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Foto 1",
    "description": "Descripción de la foto",
    "imageUrl": "https://via.placeholder.com/300x300",
    "category": "carrera"
  }'
```

### O directamente en MongoDB:
```javascript
// En mongosh
use byb_training
db.photos.insertOne({
  title: "Mi Foto",
  description: "Una foto de la carrera",
  imageUrl: "https://example.com/foto.jpg",
  category: "carrera",
  views: 0
})
```

---

## 🚀 Deploy a Producción

### Heroku:
```bash
heroku create tu-app-name
git push heroku main
```

### Railway, Render, Vercel: Sigue sus guías específicas

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en la consola
2. Verifica el archivo `.env`
3. Asegúrate que MongoDB está corriendo
4. Limpia el cache: `Ctrl+Shift+Delete` en el navegador

---

## 📜 Licencia

Este proyecto es de **ByB Training**. Todos los derechos reservados.

---

## 🎉 ¡Listo para correr!

¡Tu página web para la Carrera 3 Quebrachos está lista! 🏅

Cualquier duda, consulta la documentación o ejecuta:
```bash
npm run dev
```

¡A correr! 🏃‍♂️💨
