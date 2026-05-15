require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config_db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// Conectar a MongoDB
connectDB();

// Rutas API
app.use('/api/photos', require('./photos_routes'));
app.use('/api/votes', require('./votes_routes'));
app.use('/api/contact', require('./contact_routes'));

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'Servidor funcionando ✓' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error del servidor',
    error: err.message,
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
});
