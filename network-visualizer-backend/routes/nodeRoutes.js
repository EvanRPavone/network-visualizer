const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware for authorization
const {
  getAllNodes,
  createNode,
  updateNode,
  updateNodePosition,
  deleteNode,
} = require('../controllers/nodeController');

// Route to get all nodes
router.get('/', auth, getAllNodes);

// Route to create a new node
router.post('/add', auth, createNode);

// Route to update a node (general data)
router.put('/:id', auth, updateNode);

// Route to update a node's position specifically
router.put('/:id/position', auth, updateNodePosition);

// Route to delete a node
router.delete('/:id', auth, deleteNode);

module.exports = router;
