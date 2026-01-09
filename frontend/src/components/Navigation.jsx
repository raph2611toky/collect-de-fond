"use client"

import { useLanguage } from "../context/LanguageContext"
import "../styles/Navigation.css"

const translations = {
  mg: {
    home: "Tahiry",
    create: "Lumikra",
    profile: "Profil",
  },
  fr: {
    home: "Accueil",
    create: "Créer",
    profile: "Profil",
  },
  en: {
    home: "Home",
    create: "Create",
    profile: "Profile",
  },
}

export default function Navigation({ currentPage, setCurrentPage, translations: navTranslations }) {
  const { language } = useLanguage()
  const t = navTranslations || translations[language]

  const navItems = [
    { id: "home", label: t.home, icon: "📋" },
    { id: "create", label: t.create, icon: "✨" },
    // { id: "profile", label: t.profile, icon: "👤" },
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
