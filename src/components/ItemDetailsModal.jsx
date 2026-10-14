import './ItemDetailsModal.css'

function ItemDetailsModal({ item, onClose }) {
  if (!item) return null

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="item-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close item details"
        >
          ×
        </button>

        <div className={`modal-cover ${item.coverClass}`}>
          <span aria-hidden="true">{item.cover}</span>
        </div>

        <span className="modal-category">{item.category}</span>

        <h2 id="item-modal-title">{item.title}</h2>

        <p className="modal-description">{item.description}</p>

        <div className="modal-information">
          <p><strong>Department:</strong> {item.department}</p>
          <p><strong>Condition:</strong> {item.condition}</p>
          <p><strong>Uploaded by:</strong> {item.uploader}</p>
          <p><strong>Email:</strong> {item.email}</p>
          <p><strong>Phone:</strong> {item.phone}</p>
        </div>

        <a
          className="contact-uploader"
          href={`mailto:${item.email}`}
        >
          Contact uploader
        </a>
      </section>
    </div>
  )
}

export default ItemDetailsModal
