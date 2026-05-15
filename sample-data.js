// sample-data.js - Script para cargar datos de ejemplo
// Uso: node sample-data.js

require('dotenv').config();
const mongoose = require('mongoose');

// Modelos
const Photo = require('./Photo_model');
const Vote = require('./Vote_model');
const Contact = require('./Contact_model');

const mongoURI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/byb_training';

async function loadSampleData() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ Conectado a MongoDB');

    // Limpiar colecciones existentes
    await Photo.deleteMany({});
    await Vote.deleteMany({});
    await Contact.deleteMany({});
    console.log('✓ Colecciones limpiadas');

    // Insertar fotos de ejemplo
    const photos = [
      {
        title: 'Largada 2025',
        description: 'Momento emocionante de la largada',
        imageUrl:
          'https://images.unsplash.com/photo-1552674605-5defe6aa44bb?w=400&h=400&fit=crop',
        category: 'carrera',
      },
      {
        title: 'Corredores en Ascenso',
        description: 'Los valientes en la montaña',
        imageUrl:
          'https://images.unsplash.com/photo-1626376659892-ab277d4d44ee?w=400&h=400&fit=crop',
        category: 'carrera',
      },
      {
        title: 'Puesta de Sol',
        description: 'Hermosa puesta en la montaña',
        imageUrl:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
        category: 'carrera',
      },
      {
        title: 'Meta Celebración',
        description: 'Momentos de victoria',
        imageUrl:
          'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=400&fit=crop',
        category: 'carrera',
      },
      {
        title: 'Paisaje 3 Quebrachos',
        description: 'Vista del recorrido',
        imageUrl:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
        category: 'carrera',
      },
      {
        title: 'Equipo ByB Training',
        description: 'Nuestro equipo en acción',
        imageUrl:
          'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop',
        category: 'carrera',
      },
    ];

    const insertedPhotos = await Photo.insertMany(photos);
    console.log(`✓ ${insertedPhotos.length} fotos insertadas`);

    // Insertar votos de ejemplo
    const votes = [
      {
        participantName: 'Juan García',
        participantEmail: 'juan@example.com',
        vote: 'si',
      },
      {
        participantName: 'María López',
        participantEmail: 'maria@example.com',
        vote: 'si',
      },
      {
        participantName: 'Carlos Rodríguez',
        participantEmail: 'carlos@example.com',
        vote: 'no',
      },
      {
        participantName: 'Ana Martínez',
        participantEmail: 'ana@example.com',
        vote: 'si',
      },
      {
        participantName: 'Pedro Sánchez',
        participantEmail: 'pedro@example.com',
        vote: 'si',
      },
    ];

    const insertedVotes = await Vote.insertMany(votes);
    console.log(`✓ ${insertedVotes.length} votos insertados`);

    // Insertar mensajes de contacto de ejemplo
    const contacts = [
      {
        fullName: 'Roberto Díaz',
        email: 'roberto@example.com',
        message: '¿Cuál es el horario de inicio?',
      },
      {
        fullName: 'Lucia Fernández',
        email: 'lucia@example.com',
        message: 'Me gustaría información sobre el equipamiento necesario',
      },
    ];

    const insertedContacts = await Contact.insertMany(contacts);
    console.log(`✓ ${insertedContacts.length} contactos insertados`);

    console.log('\n✅ Datos de ejemplo cargados exitosamente!\n');

    // Mostrar estadísticas
    const totalPhotos = await Photo.countDocuments();
    const totalVotes = await Vote.countDocuments();
    const siVotes = await Vote.countDocuments({ vote: 'si' });
    const noVotes = await Vote.countDocuments({ vote: 'no' });
    const totalContacts = await Contact.countDocuments();

    console.log('📊 ESTADÍSTICAS:');
    console.log(`   Fotos: ${totalPhotos}`);
    console.log(`   Votos totales: ${totalVotes}`);
    console.log(`   - SI, VOY: ${siVotes}`);
    console.log(`   - LA PRÓXIMA: ${noVotes}`);
    console.log(`   Mensajes de contacto: ${totalContacts}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

loadSampleData();
