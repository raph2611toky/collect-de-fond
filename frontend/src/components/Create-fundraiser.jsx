"use client"

import { useState } from "react"
import "../styles/Create-fundraiser.css"

const translations = {
  mg: {
    title: "Lumikha ng Bagong Koleksyon",
    form_title: "Pamagaan ng Puso",
    form_description: "Paglalarawan",
    form_category: "Kategorya",
    form_goal: "Target na Halaga",
    form_submit: "Lumikha",
    success: "Matagumpay na Likhain!",
  },
  fr: {
    title: "Créer une nouvelle collecte",
    form_title: "Titre",
    form_description: "Description",
    form_category: "Catégorie",
    form_goal: "Montant cible",
    form_submit: "Créer",
    success: "Collecte créée avec succès!",
  },
  en: {
    title: "Create New Campaign",
    form_title: "Title",
    form_description: "Description",
    form_category: "Category",
    form_goal: "Target Amount",
    form_submit: "Create",
    success: "Campaign created successfully!",
  },
}

export default function CreateFundraiser({ language }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "health",
    goal: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const t = translations[language]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Formulaire soumis:", formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="create-fundraiser">
      <div className="create-container">
        <div className="create-header">
          <h2>{t.title}</h2>
          <p>Partagez votre histoire et commencez à collecter</p>
        </div>

        {submitted && <div className="success-message">✓ {t.success}</div>}

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label htmlFor="title">{t.form_title}</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Aide chirurgicale pour maman"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">{t.form_description}</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez votre situation..."
              rows="6"
              required
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">{t.form_category}</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange}>
                <option value="health">Santé</option>
                <option value="education">Éducation</option>
                <option value="emergency">Urgence</option>
                <option value="social">Social</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="goal">{t.form_goal}</label>
              <input
                type="number"
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="1000000"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {t.form_submit}
          </button>
        </form>
      </div>
    </div>
  )
}
