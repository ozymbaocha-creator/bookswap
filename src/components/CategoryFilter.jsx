import './CategoryFilter.css'

const categories = [
  'All Items',
  'Textbooks',
  'Course Outlines',
  'Equipment',
]

function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-filters" aria-label="Filter by category">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-button ${
            activeCategory === category ? 'selected' : ''
          }`}
          onClick={() => onCategoryChange(category)}
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter

