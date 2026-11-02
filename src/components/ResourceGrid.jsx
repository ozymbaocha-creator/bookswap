import ResourceCard from './ResourceCard'
import './ResourceGrid.css'

function ResourceGrid({ items, onSwap, onViewDetails, swappedItems }) {
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
