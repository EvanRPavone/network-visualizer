const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllEdges, createEdge, deleteEdge } = require('../controllers/edgeController');

router.get('/', auth, getAllEdges);
router.post('/add', auth, createEdge);
router.delete('/:id', auth, deleteEdge);

module.exports = router;
