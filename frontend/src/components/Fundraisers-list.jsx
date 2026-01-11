"use client"

import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { encryptId } from "../hooks/encryption"
import FundraiserCard from "./Fundraiser-card"
import "../styles/Fundraisers-list.css"
import { useEffect, useState } from "react"
import api from "../api/axiosClient"

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

export default function FundraisersList({ onCreateClick, toast }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [fundraisers, setFundraisers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = selectedCategory !== "all" ? { categorie: selectedCategory } : {}
        const res = await api.get("/fundraisers/fundraisers/", { params })

        console.log("Réponse de l'API des collectes:", res.data)
        const payload = res.data.data
        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : Array.isArray(payload?.data)
              ? payload.data
              : []

        setFundraisers(list)
      } catch (err) {
        console.error("Erreur lors du chargement des collectes:", err)
        setError("Impossible de charger les collectes")
        toast?.error("Impossible de charger les collectes")
      } finally {
        setLoading(false)
      }
    }

    fetchFundraisers()
  }, [selectedCategory, toast])

  const categories = [
    { id: "all", label: t.all, icon: "🎯" },
    { id: "health", label: t.health, icon: "🏥" },
    { id: "education", label: t.education, icon: "📚" },
    { id: "emergency", label: t.emergency, icon: "🆘" },
    { id: "social", label: t.social, icon: "🤝" },
  ]

  const handleCardClick = (fundraiserId) => {
    const encryptedId = encryptId(fundraiserId)
    navigate(`/campaign/profile?id=${encodeURIComponent(encryptedId)}`)
  }

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

      {loading && <div className="loading-message">Chargement des collectes...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="fundraisers-grid">
        {Array.isArray(fundraisers)
          ? fundraisers.map((fundraiser) => (
              <div key={fundraiser.id} onClick={() => handleCardClick(fundraiser.id)} style={{ cursor: "pointer" }}>
                <FundraiserCard fundraiser={fundraiser} language={language} />
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
