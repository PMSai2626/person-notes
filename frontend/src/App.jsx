import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const App = () => {
  const [filter, setFilter] = useState({});
  const [selectedNote, setSelectedNote] = useState(null);

  const handleFilterChange = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Personal Notes Manager</h1>
      <SearchBar onFilterChange={handleFilterChange} />
      <NoteForm
        selectedNote={selectedNote}
        onFormSubmit={() => setSelectedNote(null)}
      />
      <NoteList filter={filter} onEdit={setSelectedNote} />
    </div>
  );
};

export default App;
