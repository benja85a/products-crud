import React from 'react';

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Buscar productos por nombre, categoría o descripción..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        data-testid="search-input"
      />
    </div>
  );
};

export default SearchBar;
