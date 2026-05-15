// API Client - Funciones para comunicar con el backend

const API_BASE_URL = 'http://localhost:5000/api';

// ========== FOTOS ==========
const photoAPI = {
  async getAllPhotos() {
    try {
      const response = await fetch(`${API_BASE_URL}/photos`);
      if (!response.ok) throw new Error('Error al obtener fotos');
      return await response.json();
    } catch (error) {
      console.error('Error en getAllPhotos:', error);
      return { success: false, data: [] };
    }
  },

  async getPhotoById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/photos/${id}`);
      if (!response.ok) throw new Error('Error al obtener foto');
      return await response.json();
    } catch (error) {
      console.error('Error en getPhotoById:', error);
      return { success: false };
    }
  },

  async createPhoto(photoData) {
    try {
      const response = await fetch(`${API_BASE_URL}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photoData),
      });
      if (!response.ok) throw new Error('Error al crear foto');
      return await response.json();
    } catch (error) {
      console.error('Error en createPhoto:', error);
      return { success: false };
    }
  },
};

// ========== VOTOS ==========
const voteAPI = {
  async submitVote(voteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/votes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(voteData),
      });
      if (!response.ok) throw new Error('Error al enviar voto');
      return await response.json();
    } catch (error) {
      console.error('Error en submitVote:', error);
      return { success: false };
    }
  },

  async getVoteStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/votes/stats`);
      if (!response.ok) throw new Error('Error al obtener estadísticas');
      return await response.json();
    } catch (error) {
      console.error('Error en getVoteStats:', error);
      return {
        success: false,
        data: { totalVotes: 0, siVotes: 0, noVotes: 0 },
      };
    }
  },
};

// ========== CONTACTO ==========
const contactAPI = {
  async sendMessage(messageData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });
      if (!response.ok) throw new Error('Error al enviar mensaje');
      return await response.json();
    } catch (error) {
      console.error('Error en sendMessage:', error);
      return { success: false };
    }
  },
};
