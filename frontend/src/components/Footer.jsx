"use client"

import { useTheme } from "../context/ThemeContext"
import "../styles/Footer.css"

const translations = {
  fr: {
    modules: "Modules",
    gestionFinanciere: "Gestion Financière",
    gestionCollectes: "Gestion des Collectes",
    rapports: "Rapports & Tableaux",
    utilisateurs: "Gestion des Utilisateurs",
    contact: "Contact",
    address: "Farafangana - Madagascar",
    email: "contact@fanampiana.mg",
    phone: "+261 34 10 062 55",
    followUs: "Suivez-nous",
    copyright: "Tous droits réservés",
    tagline: '"Changez des vies, ensemble. Fanampiana."',
  },
  mg: {
    modules: "Loharanona",
    gestionFinanciere: "Fitsapana Fenibe",
    gestionCollectes: "Fitsapana Fanampiana",
    rapports: "Tatitra & Tabilao",
    utilisateurs: "Fitsapana Mpamit",
    contact: "Mikipivezivezy",
    address: "Farafangana - Madagasikara",
    email: "contact@fanampiana.mg",
    phone: "+261 34 10 062 55",
    followUs: "Arahina ny amin-polantsaina",
    copyright: "Ny fahafaha rehetra",
    tagline: '"Hanova ang buhay, sama-sama. Fanampiana."',
  },
  en: {
    modules: "Modules",
    gestionFinanciere: "Financial Management",
    gestionCollectes: "Fundraising Management",
    rapports: "Reports & Analytics",
    utilisateurs: "User Management",
    contact: "Contact",
    address: "Farafangana - Madagascar",
    email: "contact@fanampiana.mg",
    phone: "+261 34 10 062 55",
    followUs: "Follow Us",
    copyright: "All rights reserved",
    tagline: '"Change lives, together. Fanampiana."',
  },
}

export default function Footer({ language = "fr" }) {
  const { isDark } = useTheme()
  const currentYear = new Date().getFullYear()
  const t = translations[language] || translations.fr

  return (
    <footer className={`footer ${isDark ? "dark-mode" : "light-mode"}`}>
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7V17C2 20.866 7.373 23.5 12 23.5C16.627 23.5 22 20.866 22 17V7L12 2Z" />
              <path d="M12 12V23.5" strokeWidth="2" />
              <path d="M2 7L12 12L22 7" strokeWidth="2" />
            </svg>
            <span>Fanampiana</span>
          </div>
          <p>Plateforme de collecte de fonds pour Madagascar</p>
        </div>

        <div className="footer-section">
          <h4>{t.modules}</h4>
          <ul>
            <li>
              <a href="#features">{t.gestionFinanciere}</a>
            </li>
            <li>
              <a href="#features">{t.gestionCollectes}</a>
            </li>
            <li>
              <a href="#features">{t.rapports}</a>
            </li>
            <li>
              <a href="#features">{t.utilisateurs}</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t.contact}</h4>
          <p>
            <svg viewBox="0 0 24 24" fill="currentColor" className="footer-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {t.address}
          </p>
          <p>
            <svg viewBox="0 0 24 24" fill="currentColor" className="footer-icon">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            {t.email}
          </p>
          <p>
            <svg viewBox="0 0 24 24" fill="currentColor" className="footer-icon">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
            {t.phone}
          </p>
        </div>

        <div className="footer-section">
          <h4>{t.followUs}</h4>
          <div className="social-links">
            <a href="#" className="social-icon" title="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="social-icon" title="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="#" className="social-icon" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {currentYear} Fanampiana. {t.copyright}.
        </p>
        <p className="tagline">{t.tagline}</p>
      </div>
    </footer>
  )
}
