// SearchField.jsx
import React, { useState } from "react";

const SearchField = ({ placeholder, onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSearch} className="mb-5 flex">
      <input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        className="px-4 py-2 border rounded-l-lg"
        placeholder={placeholder}
      />
      <button
        type="submit"
        className={`bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded-r-lg`}
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchField;
