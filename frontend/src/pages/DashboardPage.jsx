"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import FundraisersList from "../components/Fundraisers-list"
import CreateFundraiser from "../components/Create-fundraiser"
import ProfilePage from "../components/Profile-page"
import "../styles/Dashboard.css"

export default function DashboardPage({toast}) {
  const [currentPage, setCurrentPage] = useState("home")
  const { isDark } = useTheme()
  const { language } = useLanguage()

  const translations = {
    mg: {
      home: "Tahiry",
      create: "Lumikra",
      profile: "Profil",
      createNew: "Lumikra Ny Fanamafisam-pibemaso",
    },
    fr: {
      home: "Accueil",
      create: "Créer",
      profile: "Profil",
      createNew: "Créer une collecte",
    },
    en: {
      home: "Home",
      create: "Create",
      profile: "Profile",
      createNew: "Create a fundraiser",
    },
  }

  const renderPage = () => {
    switch (currentPage) {
      case "create":
        return <CreateFundraiser />
      case "profile":
        return <ProfilePage />
      default:
        return <FundraisersList onCreateClick={() => setCurrentPage("create")} />
    }
  }

  return (
    <div className={`dashboard-container ${isDark ? "dark-mode" : "light-mode"}`}>
      <Header toast={toast} />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} translations={translations[language]} />
      <main className="main-content">{renderPage()}</main>

      {currentPage !== "create" && (
        <button
          className="fab-button"
          onClick={() => setCurrentPage("create")}
          title={translations[language].createNew}
        >
          +
        </button>
      )}
    </div>
  )
}
