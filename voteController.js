const Vote = require('./Vote_model');

// Registrar voto
exports.createVote = async (req, res) => {
  try {
    const { participantName, participantEmail, vote } = req.body;
    const ipAddress = req.ip;

    if (!participantName || !participantEmail || !vote) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, email y voto son requeridos',
      });
    }

    if (!['si', 'no'].includes(vote)) {
      return res.status(400).json({
        success: false,
        message: 'El voto debe ser "si" o "no"',
      });
    }

    const newVote = new Vote({
      participantName,
      participantEmail,
      vote,
      ipAddress,
    });

    await newVote.save();

    res.status(201).json({
      success: true,
      message: 'Voto registrado exitosamente',
      data: newVote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Obtener estadísticas de votos
exports.getVoteStats = async (req, res) => {
  try {
    const totalVotes = await Vote.countDocuments();
    const siVotes = await Vote.countDocuments({ vote: 'si' });
    const noVotes = await Vote.countDocuments({ vote: 'no' });

    res.json({
      success: true,
      data: {
        totalVotes,
        siVotes,
        noVotes,
        percentage: {
          si: totalVotes > 0 ? ((siVotes / totalVotes) * 100).toFixed(2) : 0,
          no: totalVotes > 0 ? ((noVotes / totalVotes) * 100).toFixed(2) : 0,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
