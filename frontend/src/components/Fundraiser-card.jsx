"use client"
import { useTheme } from "../context/ThemeContext"
import "../styles/Fundraiser-card.css"

const translations = {
  mg: { donate: "Magbigay", donors: "Mga Donor" },
  fr: { donate: "Donner", donors: "Donateurs" },
  en: { donate: "Donate", donors: "Donors" },
}

export default function FundraiserCard({ fundraiser, language }) {
  const progressPercent = (fundraiser.raised / fundraiser.goal) * 100
  const t = translations[language]
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className={`fundraiser-card ${isDark ? 'dark-mode' : ''}`}>
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
            <div className="progress-bar" style={{ width: `${Math.min(progressPercent, 100)}%` }}></div>
          </div>
          <div className="progress-info">
            <span className="raised">{(fundraiser.raised / 1000000).toFixed(1)}M</span>
            <span className="goal">{(fundraiser.goal / 1000000).toFixed(1)}M</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="donors-info">
            <span>
              👥 {fundraiser.donors} {t.donors}
            </span>
          </div>
          <button className="donate-btn">{t.donate}</button>
        </div>
      </div>
    </div>
  )
}
