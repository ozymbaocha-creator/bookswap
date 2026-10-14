import './WelcomeSection.css'

function WelcomeSection() {
  return (
    <section className="welcome-section">
      <div className="welcome-copy">
        <span className="welcome-eyebrow">YOUR CAMPUS, SHARED</span>

        <h1>
          Find what you need.
          <br />
          <span>Share what you have.</span>
        </h1>

        <p>
          Discover textbooks, course materials, and useful
          equipment shared by students in your campus community.
        </p>
      </div>

      <div className="welcome-art" aria-hidden="true">
        <span className="welcome-book book-one">📚</span>
        <span className="welcome-book book-two">📖</span>
        <span className="welcome-star">✦</span>
      </div>
    </section>
  )
}

export default WelcomeSection
