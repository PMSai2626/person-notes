const notes = require('../models/notes');

// Get Notes with optional filters (title and category)
const getNotes = async (req, res) => {
  try {
    const { title, category } = req.query;
    const filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' }; // Case-insensitive title filter
    if (category) filter.category = category;

    const allNotes = await notes.find(filter).sort({ created_at: -1 });
    res.status(200).json(allNotes);
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new Note
const createNote = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newNote = new notes({ title, description, category });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update an existing Note
const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    const updatedNote = await notes.findByIdAndUpdate(
      id,
      { title, description, category, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ error: 'Note not found' });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error.message);
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Delete a Note
const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await notes.findByIdAndDelete(id);

    if (!deletedNote) return res.status(404).json({ error: 'Note not found' });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getNotes, createNote, updateNotes, deleteNotes };
