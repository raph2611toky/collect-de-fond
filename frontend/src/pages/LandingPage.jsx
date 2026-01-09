"use client"

import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import LandingHeader from "../components/LandingHeader"
import LandingPagePro from "../components/Landing-page-pro"
import Footer from "../components/Footer"
import "../styles/LandingPage.css"

export default function LandingPage() {
  const { isDark } = useTheme()
  const { language, setLanguage } = useLanguage()
  const navigate = useNavigate()

  return (
    <div className={`landing-page ${isDark ? "dark-mode" : "light-mode"}`}>
      <LandingHeader
        language={language}
        setLanguage={setLanguage}
        onCreateClick={() => navigate("/dashboard")}
        onLoginClick={() => navigate("/login")}
        onDashboardClick={() => navigate("/dashboard")}
      />
      <LandingPagePro onNavigate={(x) => navigate("/"+x)} />
      <Footer />
    </div>
  )
}
