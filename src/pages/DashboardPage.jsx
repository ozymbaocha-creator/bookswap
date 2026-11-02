
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  getCurrentUser,
  updateAccount,
  deleteAccount,
} from '../lib/auth'
import {
  getUserResources,
  saveUploadedResource,
  deleteUploadedResource,
} from '../lib/resourceStorage'
import './Dashboard.css'

function DashboardPage() {
 const [user, setUser] = useState(() => getCurrentUser())
const [editingProfile, setEditingProfile] = useState(false)

const [profileForm, setProfileForm] = useState(() => {
  const currentUser = getCurrentUser()

  return {
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    department: currentUser?.department || '',
  }
})
  const [uploads, setUploads] = useState([])
  const [swapHistory, setSwapHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deletingAccount, setDeletingAccount] = useState(false)

  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    condition: '',
    description: '',
  })

  useEffect(() => {
    let cancelled = false

    async function loadUploads() {
      try {
        const resources = await getUserResources(user.email)
        if (!cancelled) setUploads(resources)
      } catch (error) {
        console.error('Dashboard loading error:', error)
        if (!cancelled) setError('Unable to load your uploads.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadUploads()

    return () => {
      cancelled = true
    }
  }, [user.email])

  useEffect(() => {
  try {
    const history = JSON.parse(
      localStorage.getItem(`bookswap-swaps-${user.email}`) || '[]'
    )

    setSwapHistory(history)
  } catch (error) {
    console.error('Swap history loading error:', error)
    setSwapHistory([])
  }
}, [user.email])

  function startEditing(resource) {
    setEditingId(resource.id)
    setEditForm({
      title: resource.title,
      category: resource.category,
      condition: resource.condition,
      description: resource.description,
    })
    setError('')
  }

  async function handleProfileSave(event) {
  event.preventDefault()

  setSaving(true)
  setError('')

  try {
    const resources = await getUserResources(user.email)
    const result = updateAccount(user.email, profileForm)

    if (result.error) {
      setError(result.error)
      return
    }

    setUser(result.user)

    const updatedResources = resources.map((resource) => ({
      ...resource,
      uploader: result.user.name,
      email: result.user.email,
      phone: result.user.phone,
      uploaderDepartment: result.user.department,
      department: result.user.department,
    }))

    await Promise.all(
      updatedResources.map((resource) => saveUploadedResource(resource))
    )

    setUploads(updatedResources)
    setProfileForm({ ...result.user })
    setEditingProfile(false)
  } catch (error) {
    console.error('Profile update error:', error)
    setError('Unable to save your profile. Please try again.')
  } finally {
    setSaving(false)
  }
}

async function handleDeleteAccount() {
  const confirmed = window.confirm(
    'Are you sure you want to delete your BookSwap account? This action cannot be undone.'
  )

  if (!confirmed) return

  setDeletingAccount(true)
  setError('')

  try {
    const resources = await getUserResources(user.email)

    await Promise.all(
      resources.map((resource) => deleteUploadedResource(resource.id))
    )

    const result = deleteAccount(user.email)

    if (result.error) {
      setError(result.error)
      return
    }

    window.location.href = '/'
  } catch (error) {
    console.error('Account deletion error:', error)
    setError('Unable to delete your account. Please try again.')
  } finally {
    setDeletingAccount(false)
  }
}

  async function handleSave(event) {
    event.preventDefault()
    const resource = uploads.find((item) => item.id === editingId)

    if (!resource) return

    setSaving(true)
    setError('')

    try {
      const updatedResource = {
        ...resource,
        ...editForm,
      }

      await saveUploadedResource(updatedResource)

      setUploads((current) =>
        current.map((item) =>
          item.id === editingId ? updatedResource : item
        )
      )

      setEditingId(null)
    } catch (error) {
      console.error('Resource update error:', error)
      setError('Unable to update this resource. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(resource) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${resource.title}"?`
    )

    if (!confirmed) return

    try {
      await deleteUploadedResource(resource.id)
      setUploads((current) =>
        current.filter((item) => item.id !== resource.id)
      )
    } catch (error) {
      console.error('Resource deletion error:', error)
      setError('Unable to delete this resource. Please try again.')
    }
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">
        <header className="dashboard-heading">
          <span className="dashboard-eyebrow">YOUR BOOKSWAP ACCOUNT</span>
          <h1>My Dashboard</h1>
          <p>Manage your details, resources and swap activity.</p>
        </header>

        <section className="dashboard-section">
          <h2>My Details</h2>

          {editingProfile ? (
            <form onSubmit={handleProfileSave}>
              <div className="dashboard-edit-field">
                <label htmlFor="profile-name">Full name</label>
                <input
                  id="profile-name"
                  value={profileForm.name}
                  onChange={(event) =>
                    setProfileForm({ ...profileForm, name: event.target.value })
                  }
                  required
                />
              </div>

              <div className="dashboard-edit-field">
                <label htmlFor="profile-email">Email</label>
                <input
                  id="profile-email"
                  type="email"
                  value={profileForm.email}
                  onChange={(event) =>
                    setProfileForm({ ...profileForm, email: event.target.value })
                  }
                  required
                />
              </div>

              <div className="dashboard-edit-field">
                <label htmlFor="profile-phone">Phone</label>
                <input
                  id="profile-phone"
                  value={profileForm.phone}
                  onChange={(event) =>
                    setProfileForm({ ...profileForm, phone: event.target.value })
                  }
                  required
                />
              </div>

              <div className="dashboard-edit-field">
                <label htmlFor="profile-department">Department</label>
                <input
                  id="profile-department"
                  value={profileForm.department}
                  onChange={(event) =>
                    setProfileForm({ ...profileForm, department: event.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save details'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfileForm({ ...user })
                  setEditingProfile(false)
                }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Department: {user.department}</p>

              <button type="button" onClick={() => setEditingProfile(true)}>
                Edit details
              </button>
            </>
          )}
        </section>

        <section className="dashboard-section">
          <h2>My Uploads</h2>

          {error && <p role="alert">{error}</p>}

          {loading ? (
            <p>Loading your uploads...</p>
          ) : uploads.length === 0 ? (
            <p>You have not uploaded any resources yet.</p>
          ) : (
            <>
              <p>You have uploaded {uploads.length} resource(s).</p>

              {uploads.map((resource) => (
                <article className="dashboard-upload" key={resource.id}>
                  {editingId === resource.id ? (
                    <form onSubmit={handleSave}>
                      <div className="dashboard-edit-field">
                        <label htmlFor="edit-title">Resource title</label>
                        <input
                          id="edit-title"
                          value={editForm.title}
                          onChange={(event) =>
                            setEditForm({
                              ...editForm,
                              title: event.target.value,
                            })
                          }
                          required
                          maxLength={100}
                        />
                      </div>

                      <div className="dashboard-edit-field">
                        <label htmlFor="edit-category">Category</label>
                        <select
                          id="edit-category"
                          value={editForm.category}
                          onChange={(event) =>
                            setEditForm({
                              ...editForm,
                              category: event.target.value,
                            })
                          }
                          required
                        >
                          <option value="Textbooks">Textbooks</option>
                          <option value="Course Outlines">Course Outlines</option>
                          <option value="Equipment">Equipment</option>
                        </select>
                      </div>

                      <div className="dashboard-edit-field">
                        <label htmlFor="edit-condition">Condition</label>
                        <select
                          id="edit-condition"
                          value={editForm.condition}
                          onChange={(event) =>
                            setEditForm({
                              ...editForm,
                              condition: event.target.value,
                            })
                          }
                          required
                        >
                          <option value="Like new">Like new</option>
                          <option value="Very good">Very good</option>
                          <option value="Good condition">Good condition</option>
                          <option value="Fair condition">Fair condition</option>
                        </select>
                      </div>

                      <div className="dashboard-edit-field">
                        <label htmlFor="edit-description">Description</label>
                        <textarea
                          id="edit-description"
                          value={editForm.description}
                          onChange={(event) =>
                            setEditForm({
                              ...editForm,
                              description: event.target.value,
                            })
                          }
                          rows={4}
                          maxLength={500}
                          required
                        />
                      </div>

                      <button type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save changes'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <h3>{resource.title}</h3>
                      <p>Category: {resource.category}</p>
                      <p>Condition: {resource.condition}</p>
                      <p>{resource.description}</p>

                      <button
                        type="button"
                        onClick={() => startEditing(resource)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(resource)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </article>
              ))}
            </>
          )}
        </section>

        <section className="dashboard-section">
          <h2>Swap History</h2>

          {swapHistory.length === 0 ? (
            <p>You haven't marked any resources for swapping yet.</p>
          ) : (
            <>
              <p>
                You have marked {swapHistory.length} resource(s) for swapping.
              </p>

              {swapHistory.map((item) => (
                <article className="dashboard-upload" key={item.id}>
                  <h3>{item.title}</h3>
                  <p>Category: {item.category}</p>
                  <p>Condition: {item.condition}</p>
                  <p>Department: {item.department}</p>
                  <p>Uploaded by: {item.uploader}</p>
                  <p>
                    Added on: {new Date(item.swappedAt).toLocaleDateString()}
                  </p>
                  <span>Marked for swapping</span>
                </article>
              ))}
            </>
          )}
        </section>

      <section className="dashboard-section">
        <h2>Account Management</h2>
        <p>
          Permanently delete your BookSwap account and associated uploaded resources.
        </p>

        <button
          type="button"
          className="delete-account-button"
          onClick={handleDeleteAccount}
          disabled={deletingAccount}
        >
          {deletingAccount ? 'Deleting account...' : 'Delete Account'}
        </button>
      </section>
      </main>

      <Footer />
    </div>
  )
}

export default DashboardPage
