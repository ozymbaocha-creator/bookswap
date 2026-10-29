
import { Button } from '@/components/ui/button'
import './ResourceCard.css'

function ResourceCard({ item, onSwap, onViewDetails, isSwapped }) {
  return (
    <article className="resource-card">
      <button
        type="button"
        className={`resource-cover ${item.coverClass}`}
        onClick={() => onViewDetails(item)}
        aria-label={`View details for ${item.title}`}
      >
        <span className="cover-category">{item.category}</span>

        <span className="cover-illustration" aria-hidden="true">
          {item.cover}
        </span>

        <span className="cover-brand">BOOKSWAP</span>
      </button>

      <div className="resource-details">
        <div className="resource-meta">
          <span>{item.department}</span>
          <span className="resource-condition">
            {item.condition}
          </span>
        </div>

        <button
          type="button"
          className="resource-title"
          onClick={() => onViewDetails(item)}
        >
          {item.title}
        </button>

        <p className="resource-description">
          {item.description}
        </p>

        <div className="resource-card-footer">
          <span className="student-label">
            <span className="student-avatar">S</span>
            Student listing
          </span>

          <Button
            type="button"
            className={`swap-button ${isSwapped ? 'swapped' : ''}`}
            aria-label={
              isSwapped
                ? `Remove or view swapped status for ${item.title}`
                : `Swap ${item.title}`
            }
            onClick={() => onSwap(item)}
          >
            {isSwapped ? '✓ Added' : 'Swap item'}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ResourceCard
