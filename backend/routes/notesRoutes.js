const express = require('express');
const {
  getNotes,
  createNote,
  updateNotes,
  deleteNotes,
} = require('../controllers/noteController');

const router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNotes);
router.delete('/:id', deleteNotes);

module.exports = router;
