"use client"

import "../styles/Navigation.css"

const translations = {
  mg: {
    fundraisers: "Fanampiana",
    create: "Lumikra ny Safo",
    profile: "Profily",
  },
  fr: {
    fundraisers: "Collectes",
    create: "Créer une collecte",
    profile: "Mon profil",
  },
  en: {
    fundraisers: "Fundraisers",
    create: "Create Campaign",
    profile: "My Profile",
  },
}

export default function Navigation({ currentPage, setCurrentPage, language }) {
  const t = translations[language]

  const navItems = [
    { id: "fundraisers", label: t.fundraisers, icon: "📋" },
    { id: "create", label: t.create, icon: "✨" },
    { id: "profile", label: t.profile, icon: "👤" },
  ]

  return (
    <nav className="navigation">
      <div className="nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? "active" : ""}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
