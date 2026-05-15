const express = require('express');
const router = express.Router();
const contactController = require('./contactController');

// Rutas de contacto
router.post('/', contactController.sendContact);
router.get('/', contactController.getAllContacts);

module.exports = router;
