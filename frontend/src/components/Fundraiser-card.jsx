import "../styles/Fundraiser-card.css"

export default function FundraiserCard({ fundraiser, language }) {
  const progressPercent = (fundraiser.raised / fundraiser.goal) * 100

  const translations = {
    mg: { donate: "Magbigay", donors: "Mga Donor" },
    fr: { donate: "Donner", donors: "Donateurs" },
    en: { donate: "Donate", donors: "Donors" },
  }
  const t = translations[language]

  return (
    <div className="fundraiser-card">
      <div className="card-image">
        <img src={fundraiser.image || "/placeholder.svg"} alt={fundraiser.title} />
        <div className="card-badge">{fundraiser.category}</div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{fundraiser.title}</h3>
        <p className="card-description">{fundraiser.description}</p>

        <div className="card-meta">
          <span className="creator">by {fundraiser.creator}</span>
        </div>

        <div className="progress-section">
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="progress-info">
            <span className="raised">${(fundraiser.raised / 1000000).toFixed(1)}M</span>
            <span className="goal">${(fundraiser.goal / 1000000).toFixed(1)}M</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="donors-info">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>
              {fundraiser.donors} {t.donors}
            </span>
          </div>
          <button className="donate-btn">{t.donate}</button>
        </div>
      </div>
    </div>
  )
}
