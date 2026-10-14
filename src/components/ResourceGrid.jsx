import ResourceCard from './ResourceCard'
import './ResourceGrid.css'

function ResourceGrid({
  items,
  onSwap,
  onViewDetails,
  swappedItems,
  onClearFilters,
}) {
  if (items.length === 0) {
    return (
      <div className="empty-results">
        <span className="empty-icon">⌕</span>
        <h3>No resources found</h3>
        <p>Try another search term or select a different category.</p>
        <button type="button" onClick={onClearFilters}>
          Clear filters
        </button>
      </div>
    )
  }

  return (
    <div className="resource-grid">
      {items.map((item) => (
        <ResourceCard
          key={item.id}
          item={item}
          onSwap={onSwap}
          onViewDetails={onViewDetails}
          isSwapped={swappedItems.includes(item.id)}
        />
      ))}
    </div>
  )
}

export default ResourceGrid
