"use client"
import { useTheme } from "../context/ThemeContext"
import { useNavigate } from "react-router-dom"
import { encryptId } from "../hooks/encryption"
import "../styles/Fundraiser-card.css"

const translations = {
  mg: { donate: "Magbigay", donors: "Mga Donor", edit: "Hanova", delete: "Fafana" },
  fr: { donate: "Donner", donors: "Donateurs", edit: "Éditer", delete: "Supprimer" },
  en: { donate: "Donate", donors: "Donors", edit: "Edit", delete: "Delete" },
}

export default function FundraiserCard({ fundraiser, language, isMyFundraiser, onEdit, onDelete }) {
  const goal = Number.parseFloat(fundraiser.objectif) || 0
  const raised = Number.parseFloat(fundraiser.montant_collecte) || 0
  const devise = fundraiser.devise || "MGA"
  const progressPercent = goal > 0 ? (raised / goal) * 100 : 0
  const t = translations[language]
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const handleCardClick = () => {
    const encryptedId = encryptId(fundraiser.id)
    navigate(`/campaign/profile?id=${encodeURIComponent(encryptedId)}`)
  }

  return (
    <div
      className={`fundraiser-card ${isDark ? "dark-mode" : "light-mode"}`}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      {isMyFundraiser && (
        <div className={`card-actions ${isDark ? "dark-mode" : "light-mode"}`}>
          <button
            className={`card-action-btn edit-btn ${isDark ? "dark-mode" : "light-mode"}`}
            onClick={(e) => {
              e.stopPropagation()
              onEdit?.(fundraiser)
            }}
            title={t.edit}
          >
            ✏️
          </button>
          <button
            className={`card-action-btn delete-btn ${isDark ? "dark-mode" : "light-mode"}`}
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.(fundraiser)
            }}
            title={t.delete}
          >
            🗑️
          </button>
        </div>
      )}

      <div className="card-image">
        <img
          src={fundraiser.image_url || "/placeholder.svg?height=200&width=400&query=fundraiser"}
          alt={fundraiser.titre}
        />
        <div className={`card-badge ${isDark ? "dark-mode" : "light-mode"}`}>{fundraiser.categorie || "Général"}</div>
      </div>

      <div className={`card-content ${isDark ? "dark-mode" : "light-mode"}`}>
        <h3 className="card-title">{fundraiser.titre}</h3>
        <p className="card-description">{fundraiser.brief_description}</p>

        <div className="card-meta">
          <span className="creator">by {fundraiser?.createur?.nom_complet || "Anonyme"}</span>
        </div>

        <div className="progress-section">
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: `${Math.min(progressPercent, 100)}%` }}></div>
          </div>
          <div className="progress-info">
            <span className="raised">
              {(raised / 1000).toFixed(2)}K {devise}
            </span>
            <span className="goal">
              {(goal / 1000).toFixed(2)}K {devise}
            </span>
          </div>
        </div>

        <div className="card-footer">
          <div className="donors-info">
            <span>
              👥 {fundraiser.nombre_donateurs || 0} {t.donors}
            </span>
          </div>
          <button className={`donate-btn ${isDark ? "dark-mode" : "light-mode"}`}>{t.donate}</button>
        </div>
      </div>
    </div>
  )
}
