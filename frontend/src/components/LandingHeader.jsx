"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import "../styles/LandingHeader.css"
import api from "../api/axiosClient"

const translations = {
  fr: {
    home: "Accueil",
    features: "Fonctionnalités",
    pricing: "Tarifs",
    about: "À propos",
    contact: "Contact",
    login: "Se connecter",
    create: "Créer ma cagnotte",
    lightMode: "Mode clair",
    darkMode: "Mode sombre",
  },
  mg: {
    home: "Tahiry",
    features: "Fampiasan-dàlana",
    pricing: "Vidiny",
    about: "Ny Amin-Polantsaina",
    contact: "Mikipivezivezy",
    login: "Miditra",
    create: "Manao aking cagnotte",
    lightMode: "Makaom-pahala",
    darkMode: "Maingy",
  },
  en: {
    home: "Home",
    features: "Features",
    pricing: "Pricing",
    about: "About",
    contact: "Contact",
    login: "Login",
    create: "Create my fundraiser",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
  },
}

export default function LandingHeader({ language, setLanguage, onLoginClick, onCreateClick }) {
  const [profile, setProfile] = useState(null)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const t = translations[language]

  const handleLogoClick = () => {
    navigate("/")
  }
  
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) return

    ;(async () => {
      try {
        const res = await api.get("/users/profile/")
        setProfile(res.data)
      } catch (e) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        setProfile(null)
      }
    })()
  }, [])

  return (
    <header className={`landing-header ${isDark ? "dark-mode" : "light-mode"}`}>
      <div className="landing-header-container">
        <div className="landing-logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="logo-icon">
            <path d="M12 2L2 7V17C2 20.866 7.373 23.5 12 23.5C16.627 23.5 22 20.866 22 17V7L12 2Z" />
          </svg>
          <span>Fanampiana</span>
        </div>

        <nav className={`landing-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          <a href="#home" className="nav-link">
            {t.home}
          </a>
          <a href="#features" className="nav-link">
            {t.features}
          </a>
          <a href="#pricing" className="nav-link">
            {t.pricing}
          </a>
          <a href="#about" className="nav-link">
            {t.about}
          </a>
          <a href="#contact" className="nav-link">
            {t.contact}
          </a>
        </nav>

        <div className="landing-header-actions">
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

          {profile ? (
            <button
              type="button"
              className="user-avatar-btn"
              onClick={() => navigate("/profile")}
              title={profile.nom_complet}
            >
              {profile.profile_url ? (
                <img className="user-avatar-img" src={profile.profile_url} alt={profile.nom_complet} />
              ) : (
                <div className="user-avatar-fallback">
                  {(profile.nom_complet?.trim()?.[0] || "U").toUpperCase()}
                </div>
              )}
            </button>
          ) : (
            <button className="btn-login" onClick={onLoginClick}>
              {t.login}
            </button>
          )}

          <button className="btn-create-landing" onClick={onCreateClick}>
            {t.create}
          </button>

          <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
