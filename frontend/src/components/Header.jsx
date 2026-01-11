"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import "../styles/Header.css"
import api from "../api/axiosClient"

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
    myFundraisers: "Ny Fampandrosoana Mia",
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
    myFundraisers: "Mes Fampandrosoana",
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
    myFundraisers: "My Fundraisers",
  },
}

export default function Header({ toast }) {
  const [profile, setProfile] = useState(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  const handleLogoClick = () => {
    navigate("/")
  }

  const handleLogout = async () => {
    try {
      const res = await api.put("/users/logout/")
      localStorage.removeItem("access_token")
      setProfile(null)
      setIsUserMenuOpen(false)
      toast?.success("Déconnexion reussie.")
      navigate("/login")
    } catch {
      setProfile(null)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) return
    ;(async () => {
      try {
        const res = await api.get("/users/profile/")
        setProfile(res.data)
      } catch {
        setProfile(null)
      }
    })()
  }, [])

  return (
    <header className="header">
      <div className={`header-container ${isDark ? "dark-mode" : ""}`}>
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
          <div className={`search-bar ${isDark ? "dark-mode" : ""}`}>
            <input type="text" className={`search-input ${isDark ? "dark-mode" : ""}`} placeholder={t.search} />
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
              <div className={`lang-menu ${!isDark ? "light-mode" : ""}`}>
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
              // onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              title="User profile"
            >
              {profile?.profile_url ? (
                <img
                  className="user-avatar-img"
                  src={profile.profile_url || "/placeholder.svg"}
                  alt={profile.nom_complet}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
              ) : (
                <div className="user-avatar" onClick={() => navigate("/login")}>
                  👤
                </div>
              )}
            </button>

            {isUserMenuOpen && (
              <div className={`user-menu ${!isDark ? "light-mode" : ""}`}>
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
                    navigate("/my-fundraisers")
                    setIsUserMenuOpen(false)
                  }}
                >
                  🚪 {t.myFundraisers}
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
                <button onClick={() => handleLogout()} className="logout-btn">
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
