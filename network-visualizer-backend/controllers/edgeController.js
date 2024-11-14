const Edge = require('../models/Edge');

exports.getAllEdges = async (req, res) => {
  try {
    const edges = await Edge.find().populate('source target', 'label');
    res.json(edges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEdge = async (req, res) => {
  try {
    const edge = new Edge(req.body);
    await edge.save();
    res.status(201).json(edge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEdge = async (req, res) => {
  try {
    const { id } = req.params;
    await Edge.findByIdAndDelete(id);
    res.json({ message: 'Edge deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
