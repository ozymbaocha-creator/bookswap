
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getCurrentUser } from '../lib/auth'
import { saveUploadedResource } from '../lib/resourceStorage'
import './UploadPage.css'

const emojis = {
  Textbooks: '📚',
  'Course Outlines': '📘',
  Equipment: '🧮',
}

function UploadPage() {
  const user = getCurrentUser()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!image) {
      setPreview('')
      return
    }

    const imageUrl = URL.createObjectURL(image)
    setPreview(imageUrl)

    return () => URL.revokeObjectURL(imageUrl)
  }, [image])

  function handleImageChange(event) {
    const selectedImage = event.target.files?.[0]

    setError('')
    setImage(null)

    if (!selectedImage) return

    if (!selectedImage.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      event.target.value = ''
      return
    }

    if (selectedImage.size > 5 * 1024 * 1024) {
      setError('Image size must not exceed 5 MB.')
      event.target.value = ''
      return
    }

    setImage(selectedImage)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!user) {
      window.location.href = '/unauthorized'
      return
    }

    setSaving(true)

    try {
      const resource = {
        id: `user-${Date.now()}`,
        title: title.trim(),
        category,
        department: user.department || 'Not specified',
        condition,
        description: description.trim(),
        uploader: user.name,
        email: user.email,
        phone: user.phone,
        uploaderDepartment: user.department,
        cover: emojis[category] || '📚',
        coverClass: category === 'Equipment' ? 'equipment' : '',
        image: image || null,
        createdAt: new Date().toISOString(),
      }

      await saveUploadedResource(resource)

      setSuccess('Your resource has been uploaded successfully!')
      setTitle('')
      setCategory('')
      setCondition('')
      setDescription('')
      setImage(null)

      const fileInput = document.getElementById('resource-image')
      if (fileInput) fileInput.value = ''
    } catch (err) {
      console.error('BookSwap upload error:', err)
      setError('We could not save your resource. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="upload-page">
      <Navbar />

      <main className="upload-main">
        <div className="upload-heading">
          <span className="upload-eyebrow">SHARE WITH YOUR CAMPUS</span>
          <h1>Upload a resource</h1>
          <p>
            Help other students find useful books, course outlines
            and study materials.
          </p>
        </div>

        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="upload-field">
            <label htmlFor="resource-title">Resource title</label>
            <input
              id="resource-title"
              type="text"
              placeholder="e.g. Introduction to Microbiology"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={100}
              required
            />
          </div>

          <div className="upload-field">
            <label htmlFor="resource-category">Category</label>
            <select
              id="resource-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Textbooks">Textbooks</option>
              <option value="Course Outlines">Course Outlines</option>
              <option value="Equipment">Equipment</option>
            </select>
          </div>

          <div className="upload-field">
            <label htmlFor="resource-condition">Condition</label>
            <select
              id="resource-condition"
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              required
            >
              <option value="">Select condition</option>
              <option value="Like new">Like new</option>
              <option value="Very good">Very good</option>
              <option value="Good condition">Good condition</option>
              <option value="Fair condition">Fair condition</option>
            </select>
          </div>

          <div className="upload-field">
            <label htmlFor="resource-department">Your department</label>
            <input
              id="resource-department"
              type="text"
              value={user?.department || 'Not provided'}
              readOnly
            />
            <small>Automatically taken from your account.</small>
          </div>

          <div className="upload-field">
            <label htmlFor="resource-description">Description</label>
            <textarea
              id="resource-description"
              placeholder="Tell other students about this resource..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
              maxLength={500}
              required
            />
          </div>

          <div className="upload-field">
            <label htmlFor="resource-image">Resource photo (optional)</label>
            <input
              id="resource-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <small>Choose a photo from your phone or computer. Maximum size: 5 MB.</small>
          </div>

          {preview && (
            <div className="upload-preview">
              <p>Image preview</p>
              <img src={preview} alt="Preview of the resource you selected" />
              <button
                type="button"
                onClick={() => {
                  setImage(null)
                  document.getElementById('resource-image').value = ''
                }}
              >
                Remove image
              </button>
            </div>
          )}

          {error && <p className="upload-error" role="alert">{error}</p>}
          {success && <p className="upload-success" role="status">{success}</p>}

          <button
            className="upload-submit"
            type="submit"
            disabled={saving}
          >
            {saving ? 'Uploading...' : 'Upload resource'}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  )
}

export default UploadPage
