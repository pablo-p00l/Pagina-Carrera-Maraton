// App.js - Lógica principal de la aplicación

document.addEventListener('DOMContentLoaded', async () => {
  console.log('✓ Página cargada');

  // Cargar fotos
  await loadPhotos();

  // Cargar estadísticas de votos
  await loadVoteStats();

  // Configurar eventos
  setupEventListeners();
});

// ========== CARGAR FOTOS ==========
async function loadPhotos() {
  try {
    const result = await photoAPI.getAllPhotos();

    if (result.success && result.data.length > 0) {
      const carousel = document.getElementById('carousel');
      carousel.innerHTML = '';

      result.data.forEach((photo) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.setAttribute('data-id', photo._id);

        item.innerHTML = `
          <img src="${photo.imageUrl}" alt="${photo.title}">
          <div class="photo-overlay">
            <p>${photo.title}</p>
          </div>
        `;

        carousel.appendChild(item);
      });

      // Duplicar items para efecto infinito
      const items = Array.from(carousel.querySelectorAll('.carousel-item'));
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
      });

      console.log('✓ Fotos cargadas:', result.data.length);
    }
  } catch (error) {
    console.error('Error cargando fotos:', error);
  }
}

// ========== ESTADÍSTICAS DE VOTOS ==========
async function loadVoteStats() {
  try {
    const result = await voteAPI.getVoteStats();

    if (result.success) {
      const { percentage } = result.data;

      document.querySelector('#stat-si .percentage').textContent =
        percentage.si + '%';
      document.querySelector('#stat-no .percentage').textContent =
        percentage.no + '%';

      console.log('✓ Estadísticas cargadas');
    }
  } catch (error) {
    console.error('Error cargando estadísticas:', error);
  }
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
  // Botones de votación
  document.getElementById('btnYes')?.addEventListener('click', () => {
    submitVote('si');
  });

  document.getElementById('btnNo')?.addEventListener('click', () => {
    submitVote('no');
  });

  // Formulario de contacto
  document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await sendContactMessage();
  });
}

// ========== ENVIAR VOTO ==========
async function submitVote(voteType) {
  const name = document.getElementById('voteName')?.value;
  const email = document.getElementById('voteEmail')?.value;

  if (!name || !email) {
    alert('Por favor completa nombre y email');
    return;
  }

  const voteData = {
    participantName: name,
    participantEmail: email,
    vote: voteType,
  };

  const result = await voteAPI.submitVote(voteData);

  if (result.success) {
    alert('¡Voto registrado! Gracias por participar 🎉');

    // Limpiar formulario
    document.getElementById('voteName').value = '';
    document.getElementById('voteEmail').value = '';

    // Recargar estadísticas
    await loadVoteStats();
  } else {
    alert('Error al registrar voto: ' + result.message);
  }
}

// ========== ENVIAR MENSAJE DE CONTACTO ==========
async function sendContactMessage() {
  const fullName = document.getElementById('fullName')?.value;
  const email = document.getElementById('email')?.value;
  const message = document.getElementById('message')?.value;

  if (!fullName || !email || !message) {
    alert('Por favor completa todos los campos');
    return;
  }

  const messageData = {
    fullName,
    email,
    message,
  };

  const result = await contactAPI.sendMessage(messageData);

  if (result.success) {
    alert('¡Mensaje enviado! Te responderemos pronto 📧');

    // Limpiar formulario
    document.getElementById('contactForm').reset();
  } else {
    alert('Error al enviar mensaje: ' + result.message);
  }
}

// ========== SCROLL SUAVE ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log('✓ App inicializada correctamente');
