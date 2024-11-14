const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllNodes, createNode, updateNode, deleteNode, updateNodePosition } = require('../controllers/nodeController');

router.get('/', auth, getAllNodes);
router.post('/add', auth, createNode);
router.put('/:id', auth, updateNode);
router.put('/:id/position', auth, updateNodePosition);
router.delete('/:id', auth, deleteNode);

module.exports = router;
