const mongoose = require('mongoose');

const edgeSchema = new mongoose.Schema({
  source: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', required: true },
  target: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', required: true },
  label: String,
});

module.exports = mongoose.model('Edge', edgeSchema);
