"use client"

import { useState } from "react"
import FundraiserCard from "./Fundraiser-card"
import "../styles/Fundraisers-list.css"

const translations = {
  mg: {
    all: "Lahat",
    health: "Kalusugan",
    education: "Edukasyon",
    emergency: "Tunay na Pangangailangan",
    social: "Lipunan",
  },
  fr: {
    all: "Tous",
    health: "Santé",
    education: "Éducation",
    emergency: "Urgence",
    social: "Social",
  },
  en: {
    all: "All",
    health: "Health",
    education: "Education",
    emergency: "Emergency",
    social: "Social",
  },
}

export default function FundraisersList({ language }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const t = translations[language]

  const categories = [
    { id: "all", label: t.all, icon: "🎯" },
    { id: "health", label: t.health, icon: "🏥" },
    { id: "education", label: t.education, icon: "📚" },
    { id: "emergency", label: t.emergency, icon: "🆘" },
    { id: "social", label: t.social, icon: "🤝" },
  ]

  // Mock data
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
      description: "Aide pour une intervention chirurgicale urgente",
    },
    {
      id: 2,
      title: "Construction Ecole Rurale",
      creator: "Marie Rakoto",
      category: "education",
      image: "/school-building.jpg",
      goal: 5000000,
      raised: 3400000,
      donors: 128,
      description: "Construire une école pour les enfants du village",
    },
    {
      id: 3,
      title: "Secours Inondations",
      creator: "Community Help",
      category: "emergency",
      image: "/flood-relief.jpg",
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
      description: "Accès à l'eau potable pour le village",
    },
  ]

  const filtered = selectedCategory === "all" ? fundraisers : fundraisers.filter((f) => f.category === selectedCategory)

  return (
    <div className="fundraisers-list">
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
          <FundraiserCard key={fundraiser.id} fundraiser={fundraiser} language={language} />
        ))}
      </div>
    </div>
  )
}
