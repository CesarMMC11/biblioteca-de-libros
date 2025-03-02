const express = require('express');
const router = express.Router();
const { getAllLibros, getLibroByID, createLibro, updateLibro, deleteLibro } = require('../controllers/biblioteca');

router.get('/', getAllLibros);
router.get('/:id', getLibroByID);
router.post('/', createLibro);
router.put('/:id', updateLibro);
router.delete('/:id', deleteLibro);

module.exports = router;

