"use client"

import { useState } from "react"
import "../styles/EditFundraiserModal.css"

const translations = {
  fr: {
    editFundraiser: "Modifier la collecte",
    titre: "Titre",
    description: "Description",
    objectif: "Objectif",
    devise: "Devise",
    categorie: "Catégorie",
    videoUrl: "URL de la vidéo YouTube",
    hideAmount: "Masquer le montant collecté",
    save: "Enregistrer",
    cancel: "Annuler",
    updateImage: "Changer l'image",
  },
  mg: {
    editFundraiser: "Hanova ny fampandrosoana",
    titre: "Andininy",
    description: "Famaritana",
    objectif: "Tanjon'aina",
    devise: "Vaksy",
    categorie: "Sokajy",
    videoUrl: "Rohy videô YouTube",
    hideAmount: "Manafina ny habetsahan'ny kolekta",
    save: "Itiahina",
    cancel: "Avela",
    updateImage: "Hanova ny sary",
  },
  en: {
    editFundraiser: "Edit fundraiser",
    titre: "Title",
    description: "Description",
    objectif: "Goal",
    devise: "Currency",
    categorie: "Category",
    videoUrl: "YouTube video URL",
    hideAmount: "Hide collected amount",
    save: "Save",
    cancel: "Cancel",
    updateImage: "Change image",
  },
}

const categories = [
  { value: "Santé", label: "Santé" },
  { value: "Éducation", label: "Éducation" },
  { value: "Urgence", label: "Urgence" },
  { value: "Social", label: "Social" },
  { value: "Autre", label: "Autre" },
]

export default function EditFundraiserModal({ fundraiser, onSave, onClose, language, isDark }) {
  const [formData, setFormData] = useState({
    titre: fundraiser.titre,
    description: fundraiser.description,
    objectif: fundraiser.objectif,
    devise: fundraiser.devise,
    categorie: fundraiser.categorie,
    video_url: fundraiser.video_url,
    masquer_le_montant: fundraiser.masquer_le_montant,
    image: null,
  })
  const t = translations[language]

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className={`modal-overlay ${isDark ? "dark-mode" : "light-mode"}`} onClick={onClose}>
      <div className={`modal-content ${isDark ? "dark-mode" : "light-mode"}`} onClick={(e) => e.stopPropagation()}>
        <div className={`modal-header ${isDark ? "dark-mode" : "light-mode"}`}>
          <h2>{t.editFundraiser}</h2>
          <button className={`modal-close-btn ${isDark ? "dark-mode" : "light-mode"}`} onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={`edit-form ${isDark ? "dark-mode" : "light-mode"}`}>
          <div className={`form-group ${isDark ? "dark-mode" : "light-mode"}`}>
            <label>{t.titre}</label>
            <input type="text" name="titre" value={formData.titre} onChange={handleChange} required />
          </div>

          <div className={`form-group ${isDark ? "dark-mode" : "light-mode"}`}>
            <label>{t.description}</label>
            <textarea name={`description ${isDark ? "dark-mode" : ""}`} value={formData.description} onChange={handleChange} rows="5" />
          </div>

          <div className={`form-row ${isDark ? "dark-mode" : "light-mode"}`}>
            <div className={`form-group ${isDark ? "dark-mode" : "light-mode"}`}>
              <label>{t.objectif}</label>
              <input type="number" name="objectif" value={formData.objectif} onChange={handleChange} required />
            </div>
            <div className={`form-group ${isDark ? "dark-mode" : "light-mode"}`}>
              <label>{t.devise}</label>
              <input type="text" name="devise" value={formData.devise} onChange={handleChange} />
            </div>
          </div>

          <div className={`form-group ${isDark ? "dark-mode" : "light-mode"}`}>
            <label>{t.categorie}</label>
            <select name="categorie" value={formData.categorie} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className={`form-group ${isDark ? "dark-mode" : "light-mode"}`}>
            <label>{t.videoUrl}</label>
            <input type="text" name="video_url" value={formData.video_url || ""} onChange={handleChange} />
          </div>

          <div className={`form-group checkbox ${isDark ? "dark-mode" : "light-mode"}`}>
            <input
              type="checkbox"
              name="masquer_le_montant"
              checked={formData.masquer_le_montant}
              onChange={handleChange}
            />
            <label>{t.hideAmount}</label>
          </div>

          <div className={`form-group ${isDark ? "dark-mode" : "light-mode"}`}>
            <label>{t.updateImage}</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
          </div>

          <div className={`form-actions ${isDark ? "dark-mode" : "light-mode"}`}>
            <button type="submit" className={`save-btn ${isDark ? "dark-mode" : "light-mode"}`}>
              {t.save}
            </button>
            <button type="button" className={`cancel-btn ${isDark ? "dark-mode" : "light-mode"}`} onClick={onClose}>
              {t.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
