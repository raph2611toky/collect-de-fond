"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import "../styles/Header.css"

const translations = {
  mg: {
    title: "Fanampiana",
    subtitle: "Tanitra Fampandrosoana",
    search: "Mitady...",
    login: "Miditra",
    signup: "Mpamatantra",
    profile: "Profily",
    logout: "Miala",
    lightMode: "Makaom-pahala",
    darkMode: "Maingy",
  },
  fr: {
    title: "Fanampiana",
    subtitle: "Plateforme de Collecte",
    search: "Rechercher...",
    login: "Connexion",
    signup: "S'inscrire",
    profile: "Profil",
    logout: "Déconnexion",
    lightMode: "Mode clair",
    darkMode: "Mode sombre",
  },
  en: {
    title: "Fanampiana",
    subtitle: "Fundraising Platform",
    search: "Search...",
    login: "Login",
    signup: "Sign Up",
    profile: "Profile",
    logout: "Logout",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
  },
}

export default function Header({ language, setLanguage }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const t = translations[language]

  return (
    <header className="header">
      <div className="header-top-bar">
        <div className="header-container">
          <div className="header-left">
            <div className="logo-section">
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
              {isDark ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            <div className="language-selector">
              <button className="lang-toggle" onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span>{language.toUpperCase()}</span>
              </button>

              {isLangMenuOpen && (
                <div className="lang-menu">
                  <button
                    onClick={() => {
                      setLanguage("mg")
                      setIsLangMenuOpen(false)
                    }}
                  >
                    <span className="lang-flag">🇲🇬</span> Malagasy
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("fr")
                      setIsLangMenuOpen(false)
                    }}
                  >
                    <span className="lang-flag">🇫🇷</span> Français
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("en")
                      setIsLangMenuOpen(false)
                    }}
                  >
                    <span className="lang-flag">🇬🇧</span> English
                  </button>
                </div>
              )}
            </div>

            <div className="user-menu-wrapper">
              <button className="user-button" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                <div className="user-avatar">JD</div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="user-menu">
                  <button className="menu-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    {t.profile}
                  </button>
                  <hr className="menu-divider" />
                  <button className="menu-item logout">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
