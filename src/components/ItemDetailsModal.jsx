import { useEffect, useRef } from 'react'
import { getCurrentUser } from '../lib/auth'
import './ItemDetailsModal.css'

function ItemDetailsModal({ item, onClose }) {
  const closeButtonRef = useRef(null)
  const isSignedIn = Boolean(getCurrentUser())

  useEffect(() => {
    if (!item) return undefined

    const previouslyFocused = document.activeElement
    const modal = closeButtonRef.current?.closest('[role="dialog"]')
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !modal) return

      const focusable = [...modal.querySelectorAll(focusableSelector)]
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        className="item-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-modal-title"
        aria-describedby="item-modal-description"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
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
        <p id="item-modal-description" className="modal-description">{item.description}</p>

        <div className="modal-information">
          <p><strong>Department:</strong> {item.department}</p>
          <p><strong>Condition:</strong> {item.condition}</p>
          {isSignedIn ? (
            <div className="uploader-details">
              <h3>Uploader details</h3>
              <p><strong>Name:</strong> {item.uploader || 'Not provided'}</p>
              <p><strong>Email:</strong> {item.email || 'Not provided'}</p>
              <p><strong>Phone:</strong> {item.phone || 'Not provided'}</p>
              <p><strong>Department:</strong> {item.uploaderDepartment || item.department || 'Not provided'}</p>
            </div>
          ) : (
            <div className="uploader-restricted">
              <p><strong>Uploader details are restricted.</strong></p>
              <p>Sign in to view the uploader's details and contact them about this book.</p>
            </div>
          )}
        </div>

        {isSignedIn ? (
          <a className="contact-uploader" href={`mailto:${item.email}`}>
            Contact uploader
          </a>
        ) : (
          <a className="contact-uploader" href="/login">
            Sign in to view uploader details
          </a>
        )}
      </section>
    </div>
  )
}

export default ItemDetailsModal
