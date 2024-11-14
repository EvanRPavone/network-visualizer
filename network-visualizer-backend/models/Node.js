const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  label: { type: String, required: true },
  ip: { type: String, required: true, unique: true },
  vulnerabilityLevel: { type: String, default: 'Low' },
  recentEvents: { type: [String], default: [] },
  position: { x: Number, y: Number },
});

module.exports = mongoose.model('Node', nodeSchema);
