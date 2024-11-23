const SearchBar = ({ onFilterChange }) => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      onFilterChange({ [name]: value });
    };
  
    return (
      <div className="mt-4">
        <h3>Search Notes</h3>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search by title"
            className="form-control"
            name="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <select className="form-select" name="category" onChange={handleInputChange}>
            <option value="">All categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
    );
  };
  
  export default SearchBar;
  