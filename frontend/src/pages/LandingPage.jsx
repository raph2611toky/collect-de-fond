"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import LandingHeader from "../components/LandingHeader"
import LandingPagePro from "../components/Landing-page-pro"
import Footer from "../components/Footer"
import "../styles/LandingPage.css"

export default function LandingPage() {
  const [language, setLanguage] = useState("fr")
  const { isDark } = useTheme()
  const navigate = useNavigate()

  return (
    <div className={`landing-page ${isDark ? "dark-mode" : "light-mode"}`}>
      <LandingHeader language={language} setLanguage={setLanguage} onLoginClick={() => navigate("/login")} />
      <LandingPagePro language={language} onNavigate={(page) => navigate("/dashboard")} />
      <Footer language={language} />
    </div>
  )
}
