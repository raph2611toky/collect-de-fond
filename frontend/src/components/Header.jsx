"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import "../styles/Header.css"

const translations = {
  mg: {
    title: "Fanampiana",
    subtitle: "Tanitra Fampandrosoana",
    search: "Mitady...",
    lightMode: "Makaom-pahala",
    darkMode: "Maingy",
    profile: "Aking Profilo",
    logout: "Logout",
    settings: "Fafana",
  },
  fr: {
    title: "Fanampiana",
    subtitle: "Plateforme de Collecte",
    search: "Rechercher...",
    lightMode: "Mode clair",
    darkMode: "Mode sombre",
    profile: "Mon Profil",
    logout: "Déconnexion",
    settings: "Paramètres",
  },
  en: {
    title: "Fanampiana",
    subtitle: "Fundraising Platform",
    search: "Search...",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    profile: "My Profile",
    logout: "Logout",
    settings: "Settings",
  },
}

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  const handleLogoClick = () => {
    navigate("/")
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo-section" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
            <div className="logo-icon">❤️</div>
            <div className="logo-text">
              <h1 className="logo-title">{t.title}</h1>
              <p className="logo-subtitle">{t.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="header-middle">
          <div className="search-wrapper">
            <input type="text" className="search-input" placeholder={t.search} />
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        </div>

        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme} title={isDark ? t.lightMode : t.darkMode}>
            {isDark ? "☀️" : "🌙"}
          </button>

          <div className="language-selector">
            <button className="lang-toggle" onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}>
              🌐 <span>{language.toUpperCase()}</span>
            </button>

            {isLangMenuOpen && (
              <div className="lang-menu">
                <button
                  onClick={() => {
                    setLanguage("mg")
                    setIsLangMenuOpen(false)
                  }}
                >
                  🇲🇬 Malagasy
                </button>
                <button
                  onClick={() => {
                    setLanguage("fr")
                    setIsLangMenuOpen(false)
                  }}
                >
                  🇫🇷 Français
                </button>
                <button
                  onClick={() => {
                    setLanguage("en")
                    setIsLangMenuOpen(false)
                  }}
                >
                  🇬🇧 English
                </button>
              </div>
            )}
          </div>

          <div className="user-menu-wrapper">
            <button
              className="user-menu-toggle"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              title="User profile"
            >
              👤
            </button>

            {isUserMenuOpen && (
              <div className="user-menu">
                <button
                  onClick={() => {
                    navigate("/profile")
                    setIsUserMenuOpen(false)
                  }}
                >
                  👤 {t.profile}
                </button>
                <button
                  onClick={() => {
                    navigate("/settings")
                    setIsUserMenuOpen(false)
                  }}
                >
                  ⚙️ {t.settings}
                </button>
                <hr />
                <button
                  onClick={() => {
                    navigate("/login")
                    setIsUserMenuOpen(false)
                  }}
                  className="logout-btn"
                >
                  🚪 {t.logout}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
