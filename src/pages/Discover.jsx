
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import WelcomeSection from '../components/WelcomeSection'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import ResourceGrid from '../components/ResourceGrid'
import ItemDetailsModal from '../components/ItemDetailsModal'
import Footer from '../components/Footer'
import './Discover.css'
import { getCurrentUser } from '../lib/auth'
import { getUploadedResources } from '../lib/resourceStorage'

async function fetchResources() {
  const response = await fetch('/resources.json')

  if (!response.ok) {
    throw new Error('Unable to load resources.')
  }

  const data = await response.json()

  if (!Array.isArray(data)) {
    throw new Error('The resource data is not in the expected format.')
  }

  return data
}

function Discover() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Items')
  const [selectedItem, setSelectedItem] = useState(null)
  const [swappedItems, setSwappedItems] = useState(() => {
    const user = getCurrentUser()

    if (!user) return []

    try {
      const history = JSON.parse(
        localStorage.getItem(`bookswap-swaps-${user.email}`) || '[]'
      )

      return history.map((item) => item.id)
    } catch {
      return []
    }
  })
  const imageUrlsRef = useRef([])

  const loadResources = useCallback(async () => {
    setLoading(true)
    setError('')

    imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    imageUrlsRef.current = []

    try {
      const [baseResources, uploadedResources] = await Promise.all([
        fetchResources(),
        getUploadedResources(),
      ])

      const savedResources = uploadedResources.map((item) => {
        if (!item.image) return item

        const imageUrl = URL.createObjectURL(item.image)
        imageUrlsRef.current.push(imageUrl)

        return { ...item, imageUrl }
      })

      setResources([...savedResources, ...baseResources])
    } catch (err) {
      console.error('BookSwap resource loading error:', err)
      setError('We could not load the resources. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadResources()

    return () => {
      imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [loadResources])

  const filteredResources = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return resources.filter((item) => {
      const matchesCategory =
        activeCategory === 'All Items' || item.category === activeCategory

      const matchesSearch = [
        item.title,
        item.category,
        item.department,
        item.description,
      ].some((value) => String(value ?? '').toLowerCase().includes(searchTerm))

      return matchesCategory && matchesSearch
    })
  }, [resources, search, activeCategory])

  function handleSwap(item) {
  const user = getCurrentUser()

  if (!user) {
    window.location.href = '/unauthorized'
    return
  }

  const storageKey = `bookswap-swaps-${user.email}`

  const history = JSON.parse(
    localStorage.getItem(storageKey) || '[]'
  )

  const alreadyAdded = history.some(
    (resource) => resource.id === item.id
  )

  const updatedHistory = alreadyAdded
    ? history.filter((resource) => resource.id !== item.id)
    : [
        ...history,
        {
          id: item.id,
          title: item.title,
          category: item.category,
          condition: item.condition,
          department: item.department,
          uploader: item.uploader,
          swappedAt: new Date().toISOString(),
        },
      ]

  localStorage.setItem(storageKey, JSON.stringify(updatedHistory))

  setSwappedItems(updatedHistory.map((resource) => resource.id))
}
  function clearFilters() {
    setSearch('')
    setActiveCategory('All Items')
  }

  const closeDetails = useCallback(() => setSelectedItem(null), [])

  return (
    <div className="discover-page" id="discover">
      <Navbar />

      <main className="discover-main">
        <WelcomeSection />

        <section className="resource-section" aria-labelledby="resource-heading">
          <div className="section-heading">
            <div>
              <h2 id="resource-heading">Discover resources</h2>
              <p>Find your next useful campus item.</p>
            </div>
            <span className="resource-count" aria-live="polite">
              {loading ? 'Loading...' : `${filteredResources.length} items`}
            </span>
          </div>

          <SearchBar search={search} onSearchChange={setSearch} />

          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {loading ? (
            <p role="status" className="resource-message">
              Loading campus resources...
            </p>
          ) : error ? (
            <div className="resource-message" role="alert">
              <p>{error}</p>
              <button type="button" onClick={loadResources}>Retry</button>
            </div>
          ) : resources.length === 0 ? (
            <div className="resource-message">
              <p>No resources have been added yet.</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="resource-message">
              <p>No resources match your search or selected category.</p>
              <button type="button" onClick={clearFilters}>Clear filters</button>
            </div>
          ) : (
            <ResourceGrid
              items={filteredResources}
              onSwap={handleSwap}
              onViewDetails={setSelectedItem}
              swappedItems={swappedItems}
            />
          )}
        </section>

        <Footer />
      </main>

      <ItemDetailsModal item={selectedItem} onClose={closeDetails} />
    </div>
  )
}

export default Discover
