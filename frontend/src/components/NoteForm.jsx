import { useState, useEffect } from 'react';
import axios from 'axios';

const NoteForm = ({ selectedNote, onFormSubmit }) => {
  const [note, setNote] = useState({ title: '', description: '', category: '' });
  const categories = ['Work', 'Personal', 'Others']; // Example categories

  useEffect(() => {
    if (selectedNote) setNote(selectedNote);
  }, [selectedNote]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = selectedNote ? `http://localhost:5050/notes/${selectedNote._id}` : 'http://localhost:5050/notes';
    const method = selectedNote ? 'put' : 'post';

    axios[method](url, note)
      .then(() => {
        setNote({ title: '', description: '', category: '' });
        onFormSubmit(); // Refresh the notes list
      })
      .catch((error) => {
        console.error('Error submitting the form:', error.response.data);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <input
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Title"
        className="form-control"
      />
      <textarea
        name="description"
        value={note.description}
        onChange={handleChange}
        placeholder="Description"
        className="form-control mt-2"
      />
      <select
        name="category"
        value={note.category}
        onChange={handleChange}
        className="form-control mt-2"
      >
        <option value="" disabled>Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      <button type="submit" className="btn btn-success mt-3">
        {selectedNote ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;
