const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
  {
    participantName: {
      type: String,
      required: true,
    },
    participantEmail: {
      type: String,
      required: true,
    },
    vote: {
      type: String,
      enum: ['si', 'no'],
      required: true,
    },
    ipAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vote', voteSchema);
