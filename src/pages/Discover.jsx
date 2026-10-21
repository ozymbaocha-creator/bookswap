import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import WelcomeSection from '../components/WelcomeSection'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import ResourceGrid from '../components/ResourceGrid'
import ItemDetailsModal from '../components/ItemDetailsModal'
import Footer from '../components/Footer'
import './Discover.css'

function Discover() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Items')
  const [selectedItem, setSelectedItem] = useState(null)
  const [swappedItems, setSwappedItems] = useState([])

  async function loadResources() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/resources.json')

      if (!response.ok) {
        throw new Error('Unable to load resources.')
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error('The resource data is not in the expected format.')
      }

      setResources(data)
    } catch (err) {
      console.error('BookSwap resource loading error:', err)
        setError(
        'We could not load the resources. Please check your connection and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadResources()
  }, [])

  const filteredResources = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return resources.filter((item) => {
      const matchesCategory =
        activeCategory === 'All Items' ||
        item.category === activeCategory

      const matchesSearch = [
        item.title,
        item.category,
        item.department,
        item.description,
      ].some((value) =>
        String(value ?? '').toLowerCase().includes(searchTerm)
      )

      return matchesCategory && matchesSearch
    })
  }, [resources, search, activeCategory])

  function handleSwap(item) {
    setSwappedItems((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id]
    )
  }

  function clearFilters() {
    setSearch('')
    setActiveCategory('All Items')
  }

  return (
    <div className="discover-page" id="discover">
      <Navbar />

      <main className="discover-main">
        <WelcomeSection />

        <section className="resource-section">
          <div className="section-heading">
            <div>
              <h2>Discover resources</h2>
              <p>Find your next useful campus item.</p>
            </div>

            <span className="resource-count">
              {loading ? 'Loading...' : `${filteredResources.length} items`}
            </span>
          </div>

          <SearchBar
            search={search}
            onSearchChange={setSearch}
          />

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
              <button type="button" onClick={loadResources}>
                Retry
              </button>
            </div>
          ) : resources.length === 0 ? (
            <div className="resource-message">
              <p>No resources have been added yet.</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="resource-message">
              <p>No resources match your search or selected category.</p>
              <button type="button" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            <ResourceGrid
              items={filteredResources}
              onSwap={handleSwap}
              onViewDetails={setSelectedItem}
              swappedItems={swappedItems}
              onClearFilters={clearFilters}
            />
          )}
        </section>

        <Footer />
      </main>

      <ItemDetailsModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  )
}

export default Discover
