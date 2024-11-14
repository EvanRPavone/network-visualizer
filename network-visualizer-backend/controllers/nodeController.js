const Node = require('../models/Node');

exports.getAllNodes = async (req, res) => {
  try {
    const nodes = await Node.find();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNode = async (req, res) => {
  try {
    const lastNode = await Node.findOne().sort({ 'position.x': -1 }); // Find the node with the right-most position
    const defaultPosition = {
      x: lastNode ? lastNode.position.x + 150 : 100, // Offset to the right of the last node or start at x = 100
      y: lastNode ? lastNode.position.y : 100, // Keep initial y position
    };

    const nodeData = {
      ...req.body,
      position: req.body.position || defaultPosition, // Use provided position or default
    };

    const node = new Node(nodeData);
    await node.save();
    res.status(201).json(node);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateNode = async (req, res) => {
  try {
    const { id } = req.params;
    const node = await Node.findByIdAndUpdate(id, req.body, { new: true });
    res.json(node);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateNodePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { position } = req.body;

    const node = await Node.findByIdAndUpdate(id, { position }, { new: true });

    if (!node) {
      return res.status(404).json({ message: 'Node not found' });
    }

    res.json(node);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update node position' });
  }
};

exports.deleteNode = async (req, res) => {
  try {
    const { id } = req.params;
    await Node.findByIdAndDelete(id);
    res.json({ message: 'Node deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
