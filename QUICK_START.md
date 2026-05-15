# 🚀 GUÍA RÁPIDA DE INICIO

## Paso 1: Verificar instalaciones (2 minutos)

Abre PowerShell y ejecuta:

```powershell
node --version    # Debe mostrar v14 o superior
npm --version     # Debe mostrar versión
mongo --version   # Si MongoDB está instalado
```

Si falta algo:
- **Node.js**: https://nodejs.org/
- **MongoDB**: https://www.mongodb.com/try/download/community

---

## Paso 2: Abrir proyecto (1 minuto)

```powershell
cd "C:\Users\oliva\OneDrive\Desktop\PaginaByB-Training.worktrees\agents-pagina-web-informativa-nodejs-mongodb"
```

---

## Paso 3: Instalar dependencias (2 minutos)

```powershell
npm install
```

Verás mensajes de instalación. Espera a que termine.

---

## Paso 4: Verificar MongoDB (2 minutos)

### Opción A: Si está instalado localmente

Abre otra PowerShell y ejecuta:

```powershell
# Windows - Si está como servicio, ya debería estar corriendo
# Verifica en "Administración de servicios" que MongoDB Server esté iniciado

# O usa Docker (recomendado):
docker run -d -p 27017:27017 --name mongodb mongo
```

### Opción B: Si usas MongoDB Atlas

1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta
3. Crea un cluster gratis
4. Obtén la URL de conexión
5. Edita el archivo `.env` en la carpeta del proyecto:

```env
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/byb_training?retryWrites=true&w=majority
```

---

## Paso 5: Cargar datos de ejemplo (1 minuto)

En la primera PowerShell:

```powershell
npm run seed
```

Verás:
```
✓ Conectado a MongoDB
✓ Colecciones limpiadas
✓ 6 fotos insertadas
✓ 5 votos insertados
✓ 2 contactos insertados
```

---

## Paso 6: Iniciar servidor (1 minuto)

Sigue en la misma PowerShell:

```powershell
npm run dev
```

Verás:
```
✓ MongoDB conectado exitosamente
✓ Servidor corriendo en http://localhost:5000
```

⚠️ **Importante**: NO cierres esta ventana. El servidor debe estar corriendo.

---

## Paso 7: Abrir en navegador (1 minuto)

1. Abre tu navegador Chrome/Firefox
2. Ve a: **http://localhost:5000**
3. ¡Disfruta! 🎉

---

## ✅ Pruebas Rápidas

### Ver todas las fotos (en el navegador):
```
http://localhost:5000/api/photos
```

### Ver estadísticas de votos:
```
http://localhost:5000/api/votes/stats
```

### Verificar conexión:
```
http://localhost:5000/api/health
```

---

## 🎨 Características que ya funcionan:

✅ Carrusel infinito de fotos con hover  
✅ Votación (si/no) con estadísticas  
✅ Formulario de contacto  
✅ Diseño responsive  
✅ Todas las secciones con contenido  

---

## 🔴 Si algo no funciona:

### Error: "Cannot find module"
```powershell
rm node_modules -r -Force  # Elimina carpeta
npm install                # Reinstala
```

### Error: "MongoDB connection refused"
Verifica que MongoDB está corriendo:
- Windows: Busca "Services" y verifica "MongoDB Server"
- Docker: `docker ps | grep mongo`
- Atlas: Verifica la URL en `.env`

### Error: "Port 5000 already in use"
Cambia el puerto en `.env`:
```env
PORT=3000
```

### Las fotos no cargan
1. Verifica que ejecutaste `npm run seed`
2. Abre DevTools (F12) y ve la consola de errores
3. Verifica que MongoDB está corriendo

---

## 📱 Próximos pasos (después de que funcione):

1. **Editar fotos**: Ve a MongoDB Compass y edita URLs de imágenes
2. **Personalizar datos**: Cambia contactos, ubicación, etc en el HTML
3. **Deploy**: Cuando esté listo, deploy a Heroku o Railway

---

## 📞 Checklist final:

- [ ] Node.js v14+ instalado
- [ ] MongoDB corriendo (local o cloud)
- [ ] `npm install` completado
- [ ] `npm run seed` ejecutado
- [ ] `npm run dev` corriendo
- [ ] http://localhost:5000 abierto
- [ ] Fotos visibles en carrusel
- [ ] Votación funcionando
- [ ] Formulario de contacto funciona

---

## 🎯 Resumen de comandos:

```powershell
# Instalar dependencias (solo primera vez)
npm install

# Cargar datos de prueba (solo primera vez)
npm run seed

# Desarrollo (con reinicio automático)
npm run dev

# Producción
npm start
```

---

**¡Listo! Tu página web está completa y funcionando. 🚀**

Si tienes dudas, revisa el archivo `README.md` para más información.
