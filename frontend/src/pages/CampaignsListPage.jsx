"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "../components/Header"
import "../styles/CampaignsList.css"

export default function CampaignsListPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { language } = useLanguage()

  const translations = {
    fr: {
      all: "Tous",
      health: "Santé",
      education: "Éducation",
      emergency: "Urgence",
      social: "Social",
      campaigns: "Toutes les collectes",
    },
    mg: {
      all: "Rehetra",
      health: "Kalusugan",
      education: "Edukasyon",
      emergency: "Tunay na Pangangailangan",
      social: "Lipunan",
      campaigns: "Ang lahat ng koleksyon",
    },
    en: {
      all: "All",
      health: "Health",
      education: "Education",
      emergency: "Emergency",
      social: "Social",
      campaigns: "All campaigns",
    },
  }

  const t = translations[language]

  const categories = [
    { id: "all", label: t.all },
    { id: "health", label: t.health },
    { id: "education", label: t.education },
    { id: "emergency", label: t.emergency },
    { id: "social", label: t.social },
  ]

  const allCampaigns = [
    {
      id: 1,
      title: "Aide Médicale pour Maman",
      creator: "Jean Durand",
      category: "health",
      image: "/medical-help.jpg",
      goal: 2000000,
      raised: 1200000,
      donors: 45,
      description: "Aide pour les frais médicaux de ma mère",
    },
    {
      id: 2,
      title: "Construction École Rurale",
      creator: "Marie Rakoto",
      category: "education",
      image: "/school-construction.jpg",
      goal: 5000000,
      raised: 3400000,
      donors: 128,
      description: "Construire une école dans une zone rurale",
    },
    {
      id: 3,
      title: "Secours Urgence",
      creator: "Community Help",
      category: "emergency",
      image: "/disaster-relief.jpg",
      goal: 1500000,
      raised: 1450000,
      donors: 92,
      description: "Aide d'urgence pour les sinistrés",
    },
    {
      id: 4,
      title: "Projet Eau Potable",
      creator: "NGO Water",
      category: "social",
      image: "/water-project.jpg",
      goal: 3000000,
      raised: 2100000,
      donors: 73,
      description: "Accès à l'eau potable pour tous",
    },
  ]

  const filtered =
    selectedCategory === "all" ? allCampaigns : allCampaigns.filter((c) => c.category === selectedCategory)

  return (
    <div className={`campaigns-list-page ${isDark ? "dark-mode" : "light-mode"}`}>
      <Header />

      <div className="campaigns-container">
        <h1>{t.campaigns}</h1>

        <div className="categories-filter">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="campaigns-grid">
          {filtered.map((campaign) => (
            <div
              key={campaign.id}
              className="campaign-card"
              onClick={() => navigate(`/campaign/${campaign.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={campaign.image || "/placeholder.svg"} alt={campaign.title} />
              <div className="campaign-info">
                <h3>{campaign.title}</h3>
                <p className="description">{campaign.description}</p>
                <p className="creator">Par {campaign.creator}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}></div>
                </div>
                <div className="campaign-stats">
                  <span className="raised">{(campaign.raised / 1000000).toFixed(1)}M Ar</span>
                  <span className="donors">{campaign.donors} donneurs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
