# 🗄️ GUÍA MONGODB - TODO LO QUE NECESITAS SABER

## ¿QUÉ ES MONGODB?

MongoDB es una base de datos **NoSQL** (no relacional) que almacena datos en formato **JSON**.

```
MongoDB (base de datos)
└── byb_training (database)
    ├── photos (colección = tabla)
    │   └── {documentos} (registros)
    ├── votes
    │   └── {documentos}
    └── contacts
        └── {documentos}
```

---

## 📥 INSTALAR MONGODB

### Windows

**Opción 1: Installer directo**
1. Descarga: https://www.mongodb.com/try/download/community
2. Ejecuta el instalador
3. Selecciona "Install MongoDB as a Service"
4. MongoDB inicia automáticamente

**Opción 2: Docker (recomendado)**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### macOS

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux

```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

---

## ✅ VERIFICAR QUE MONGODB ESTÁ CORRIENDO

### Windows
1. Busca "Services"
2. Busca "MongoDB Server"
3. Verifica que el estado es "Started"

### Terminal (todos)
```bash
mongosh
# Si abre la shell, está corriendo ✓
exit
```

---

## 🔧 CONFIGURACIÓN EN TU PROYECTO

### Archivo `.env`

```env
# LOCAL SIN AUTENTICACIÓN (desarrollo)
MONGODB_URI=mongodb://localhost:27017/byb_training

# LOCAL CON AUTENTICACIÓN
MONGODB_URI=mongodb://usuario:contraseña@localhost:27017/byb_training

# MONGODB ATLAS (nube)
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/byb_training?retryWrites=true&w=majority
```

---

## 🌐 MONGODB ATLAS (NUBE) - PASO A PASO

### 1. Crear cuenta (5 minutos)
1. Ve a https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Usa tu email o Google
4. Completa el formulario

### 2. Crear cluster (5 minutos)
1. Click "Create"
2. Elige "Shared" (gratis)
3. Elige tu región más cercana
4. Click "Create Cluster"
5. Espera ~10 minutos a que se cree

### 3. Obtener URL (5 minutos)
1. Click en tu cluster
2. Click "Connect"
3. Elige "Drivers"
4. Copia el "Connection String"
5. Reemplaza `<password>` con tu contraseña
6. Pega en `.env` en MONGODB_URI

### Ejemplo de URL:
```
mongodb+srv://juan:micontraseña@cluster0.mongodb.net/byb_training?retryWrites=true&w=majority
```

---

## 🔍 EXPLORAR TUS DATOS

### Con mongosh (terminal)

```bash
# Conectar
mongosh

# Ver bases de datos
show dbs

# Usar tu BD
use byb_training

# Ver colecciones
show collections

# Ver todas las fotos
db.photos.find()

# Ver fotos formateadas
db.photos.find().pretty()

# Ver solo la primera foto
db.photos.findOne()

# Contar fotos
db.photos.countDocuments()

# Filtrar fotos por categoría
db.photos.find({category: "carrera"})

# Ver votos
db.votes.find()

# Ver estadísticas de votos
db.votes.aggregate([
  {$group: {_id: "$vote", count: {$sum: 1}}}
])

# Ver contactos
db.contacts.find()

# Salir
exit
```

---

## 🎯 OPERACIONES COMUNES

### Crear/Agregar documento

```bash
mongosh
use byb_training

# Insertar una foto
db.photos.insertOne({
  title: "Mi Foto",
  description: "Una foto hermosa",
  imageUrl: "https://example.com/foto.jpg",
  category: "carrera",
  views: 0
})

# Insertar múltiples
db.photos.insertMany([
  {title: "Foto 1", imageUrl: "url1..."},
  {title: "Foto 2", imageUrl: "url2..."}
])
```

### Actualizar documento

```bash
# Actualizar una foto por ID
db.photos.updateOne(
  {_id: ObjectId("...")},
  {$set: {title: "Nuevo título"}}
)

# Actualizar todas las fotos
db.photos.updateMany(
  {category: "carrera"},
  {$set: {category: "maratón"}}
)
```

### Eliminar documento

```bash
# Eliminar una foto
db.photos.deleteOne({_id: ObjectId("...")})

# Eliminar todas las fotos
db.photos.deleteMany({category: "carrera"})
```

---

## 📊 VER DATOS CON MONGODB COMPASS

MongoDB Compass es una GUI para explorar visualmente.

### Instalar
https://www.mongodb.com/products/compass

### Conectar
1. Abre Compass
2. Selecciona "New Connection"
3. Usa la URL de MongoDB
4. Click "Connect"

### Navegar
1. Expande `byb_training`
2. Click en `photos`, `votes`, `contacts`
3. Ve los documentos en tabla
4. Haz doble-click para editar

---

## 🔐 CREDENCIALES Y SEGURIDAD

### Para MongoDB Local

SIN autenticación (desarrollo):
```env
MONGODB_URI=mongodb://localhost:27017/byb_training
```

CON autenticación (producción):
```env
MONGODB_URI=mongodb://admin:tu_contraseña@localhost:27017/byb_training
```

### Para MongoDB Atlas

Tu URL incluye:
```
mongodb+srv://usuario:contraseña@cluster.mongodb.net/byb_training?retryWrites=true&w=majority
```

⚠️ **NUNCA compartas esta URL en público**

---

## 🔄 FLUJO DE DATOS

### Cuando abres la página:
```
app.js → loadPhotos()
    ↓
photoAPI.getAllPhotos()
    ↓
fetch('http://localhost:5000/api/photos')
    ↓
server.js → router.get('/photos')
    ↓
photoController.getAllPhotos()
    ↓
Photo.find() ← MONGODB
    ↓
[...documentos...]
    ↓
Carrusel se renderiza
```

### Cuando votas:
```
Usuario fill form → submitVote()
    ↓
voteAPI.submitVote({...})
    ↓
fetch('POST /api/votes', {...})
    ↓
voteController.createVote()
    ↓
new Vote({...}).save() ← MONGODB
    ↓
{success: true}
    ↓
Estadísticas se actualizan
```

---

## 🧪 PRUEBAS CON CURL

### Ver todas las fotos
```bash
curl http://localhost:5000/api/photos | jq .
```

### Crear una foto
```bash
curl -X POST http://localhost:5000/api/photos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Foto",
    "imageUrl": "https://via.placeholder.com/300",
    "description": "Foto de prueba",
    "category": "carrera"
  }' | jq .
```

### Registrar voto
```bash
curl -X POST http://localhost:5000/api/votes \
  -H "Content-Type: application/json" \
  -d '{
    "participantName": "Juan Test",
    "participantEmail": "juan@test.com",
    "vote": "si"
  }' | jq .
```

### Ver estadísticas
```bash
curl http://localhost:5000/api/votes/stats | jq .
```

---

## ⚡ MONGO QUERIES ÚTILES

### Buscar
```bash
# Encontrar por propiedad
db.photos.find({category: "carrera"})

# Encontrar por ID
db.photos.findOne({_id: ObjectId("...")})

# Buscar por rango
db.photos.find({views: {$gt: 10}})  # mayor que
db.photos.find({views: {$lt: 10}})  # menor que

# Buscar con regex (buscar texto)
db.photos.find({title: /foto/i})    # contiene "foto" (case-insensitive)

# Buscar múltiples condiciones
db.photos.find({category: "carrera", views: {$gt: 5}})
```

### Contar
```bash
db.photos.countDocuments()
db.photos.countDocuments({category: "carrera"})
db.votes.countDocuments({vote: "si"})
```

### Ordenar
```bash
# Ordenar descendente por views
db.photos.find().sort({views: -1})

# Ordenar ascendente por fecha
db.photos.find().sort({createdAt: 1})

# Ordenar y limitar
db.photos.find().sort({views: -1}).limit(5)
```

### Eliminar
```bash
# Una foto
db.photos.deleteOne({_id: ObjectId("...")})

# Todas las fotos sin views
db.photos.deleteMany({views: 0})

# Limpiar toda la colección
db.photos.deleteMany({})
```

---

## 🔄 RESPALDAR Y RESTAURAR

### Respaldar
```bash
# Exportar colección a JSON
mongoexport --db byb_training --collection photos --out photos.json

# Exportar toda la BD
mongodump --db byb_training --out ./backup
```

### Restaurar
```bash
# Importar JSON
mongoimport --db byb_training --collection photos --file photos.json

# Restaurar desde respaldo
mongorestore --db byb_training ./backup/byb_training
```

---

## 📈 ESTADÍSTICAS Y AGREGACIONES

### Contar votos por tipo
```bash
db.votes.aggregate([
  {$group: {_id: "$vote", count: {$sum: 1}}}
])

# Resultado:
# {_id: "si", count: 10}
# {_id: "no", count: 5}
```

### Ver fotos más vistas
```bash
db.photos.aggregate([
  {$sort: {views: -1}},
  {$limit: 5}
])
```

### Fotos por categoría
```bash
db.photos.aggregate([
  {$group: {_id: "$category", total: {$sum: 1}}}
])
```

---

## 🆘 PROBLEMAS COMUNES

### "Connection refused"
```
MongoDB no está corriendo
→ Inicia MongoDB (Windows: Services, macOS: brew services start, Docker: docker ps)
```

### "Authentication failed"
```
Credenciales incorrectas
→ Verifica usuario/contraseña en .env
```

### "Database not found"
```
La BD no existe, pero se crea automáticamente
→ Ejecuta npm run seed para crear colecciones
```

### "Stale connection"
```
Conexión perdida
→ Reinicia npm run dev
```

---

## 🎯 CHECKLIST MONGODB

- [ ] MongoDB instalado
- [ ] MongoDB corriendo
- [ ] .env configurado
- [ ] npm install ejecutado
- [ ] npm run seed ejecutado
- [ ] mongosh conecta
- [ ] Datos visibles en compass
- [ ] API retorna fotos

---

## 📚 MÁS INFORMACIÓN

- MongoDB Docs: https://docs.mongodb.com
- Mongoose: https://mongoosejs.com
- MongoDB Atlas: https://cloud.mongodb.com

---

**¡MongoDB está listo! 🚀**

Ahora ejecuta:
```bash
npm run dev
```

¡Tu página web funciona! 🎉
