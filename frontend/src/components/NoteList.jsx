import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const NoteList = ({ filter, onEdit }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5050/notes", {
        params: filter,
      });
      console.log(response.data); // Debugging: Check if 'createdAt' exists
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error.response?.data || error.message);
    }
  };
  

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/notes/${id}`);
      fetchNotes(); // Refresh the notes list after deletion
    } catch (error) {
      console.error("Error deleting note:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [filter]); // Re-fetch notes when the filter changes

 
  

  return (
    <div className="mt-4">
      <h3>Notes</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
           
          </tr>
        </thead>
        <tbody>
          {notes.length > 0 ? (
            notes.map((note) => (
              <tr key={note._id}>
                <td>{note.title}</td>
                <td>{note.description}</td>
                <td>{note.category}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => onEdit(note)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteNote(note._id)}
                  >
                    Delete
                  </button>
                </td>
               

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No notes found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NoteList;
