"use client"

import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import FundraiserCard from "./Fundraiser-card"
import "../styles/Fundraisers-list.css"
import { useState } from "react"

const translations = {
  mg: {
    all: "Lahat",
    health: "Kalusugan",
    education: "Edukasyon",
    emergency: "Tunay na Pangangailangan",
    social: "Lipunan",
    createNew: "Lumikra Ny Bagong Koleksyon",
  },
  fr: {
    all: "Tous",
    health: "Santé",
    education: "Éducation",
    emergency: "Urgence",
    social: "Social",
    createNew: "Créer une nouvelle collecte",
  },
  en: {
    all: "All",
    health: "Health",
    education: "Education",
    emergency: "Emergency",
    social: "Social",
    createNew: "Create a new fundraiser",
  },
}

export default function FundraisersList({ onCreateClick }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language]

  const categories = [
    { id: "all", label: t.all, icon: "🎯" },
    { id: "health", label: t.health, icon: "🏥" },
    { id: "education", label: t.education, icon: "📚" },
    { id: "emergency", label: t.emergency, icon: "🆘" },
    { id: "social", label: t.social, icon: "🤝" },
  ]

  const fundraisers = [
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

  const filtered = selectedCategory === "all" ? fundraisers : fundraisers.filter((f) => f.category === selectedCategory)

  return (
    <div className="fundraisers-list">
      <div className="list-header">
        <h2>{t.createNew}</h2>
        <button className="create-btn" onClick={onCreateClick} title={t.createNew}>
          <span className="btn-icon">✨</span>
          <span className="btn-text">{t.createNew}</span>
        </button>
      </div>

      <div className="categories-filter">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-label">{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="fundraisers-grid">
        {filtered.map((fundraiser) => (
          <div key={fundraiser.id} onClick={() => navigate(`/campaign/${fundraiser.id}`)} style={{ cursor: "pointer" }}>
            <FundraiserCard fundraiser={fundraiser} language={language} />
          </div>
        ))}
      </div>
    </div>
  )
}
