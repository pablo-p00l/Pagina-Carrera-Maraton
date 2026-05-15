const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'carrera',
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Photo', photoSchema);
