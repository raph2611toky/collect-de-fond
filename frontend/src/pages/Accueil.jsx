"use client"

import Header from "../components/Header"
import LandingPagePro from "../components/Landing-page-pro"
import Footer from "../components/Footer"
import { useTheme } from "../context/ThemeContext"

export default function Accueil({ language, setLanguage, onNavigate, translations }) {
  const { isDark } = useTheme()

  return (
    <div className={`accueil-page ${isDark ? "dark-mode" : "light-mode"}`}>
      <Header language={language} setLanguage={setLanguage} />
      <LandingPagePro language={language} onNavigate={onNavigate} />
      <Footer language={language} />
    </div>
  )
}
