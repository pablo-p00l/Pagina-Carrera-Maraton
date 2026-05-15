const express = require('express');
const router = express.Router();
const voteController = require('./voteController');

// Rutas de votos
router.post('/', voteController.createVote);
router.get('/stats', voteController.getVoteStats);

module.exports = router;
