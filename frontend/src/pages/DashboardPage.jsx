"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import FundraisersList from "../components/Fundraisers-list"
import CreateFundraiser from "../components/Create-fundraiser"
import ProfilePage from "../components/Profile-page"
import "../styles/Dashboard.css"

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState("home")
  const [language, setLanguage] = useState("fr")
  const { isDark } = useTheme()

  const translations = {
    mg: {
      home: "Tahiry",
      create: "Lumikra",
      profile: "Profil",
      donate: "Mandoa",
      viewMore: "Jerena bebe",
      share: "Mizara",
      comment: "Kamanty",
    },
    fr: {
      home: "Accueil",
      create: "Créer",
      profile: "Profil",
      donate: "Donner",
      viewMore: "Voir plus",
      share: "Partager",
      comment: "Commenter",
    },
    en: {
      home: "Home",
      create: "Create",
      profile: "Profile",
      donate: "Donate",
      viewMore: "View More",
      share: "Share",
      comment: "Comment",
    },
  }

  const renderPage = () => {
    switch (currentPage) {
      case "create":
        return <CreateFundraiser language={language} translations={translations[language]} />
      case "profile":
        return <ProfilePage language={language} translations={translations[language]} />
      default:
        return <FundraisersList language={language} translations={translations[language]} />
    }
  }

  return (
    <div className={`dashboard-container ${isDark ? "dark-mode" : "light-mode"}`}>
      <Header language={language} setLanguage={setLanguage} />
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        translations={translations[language]}
      />
      <main className="main-content">{renderPage()}</main>
    </div>
  )
}
