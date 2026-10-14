import './SearchBar.css'

function SearchBar({ search, onSearchChange }) {
  return (
    <div className="search-bar">
      <span className="search-symbol" aria-hidden="true">
        ⌕
      </span>

      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search books, materials or departments..."
        aria-label="Search resources"
      />

      {search && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onSearchChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default SearchBar
