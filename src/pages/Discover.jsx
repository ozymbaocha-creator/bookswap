import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import WelcomeSection from '../components/WelcomeSection'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import ResourceGrid from '../components/ResourceGrid'
import ItemDetailsModal from '../components/ItemDetailsModal'
import Footer from '../components/Footer'
import { resources } from '../data/resources'
import './Discover.css'

function Discover() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Items')
  const [selectedItem, setSelectedItem] = useState(null)
  const [swappedItems, setSwappedItems] = useState([])

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
      ].some((value) => value.toLowerCase().includes(searchTerm))

      return matchesCategory && matchesSearch
    })
  }, [search, activeCategory])

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
              {filteredResources.length} items
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

          <ResourceGrid
            items={filteredResources}
            onSwap={handleSwap}
            onViewDetails={setSelectedItem}
            swappedItems={swappedItems}
            onClearFilters={clearFilters}
          />
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
