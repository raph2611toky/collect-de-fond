"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import Toast from "./Toast"
import RichTextEditor from "./RichTextEditor"
import api from "../api/axiosClient"
import "../styles/Create-fundraiser.css"

const translations = {
  fr: {
    title: "Créer une collecte",
    select_image: "Sélectionnez l'image principale",
    campaign_title: "Titre de la cagnotte",
    custom_link: "Personnalisez le lien",
    choose_category: "Choisissez une catégorie",
    parameters: "Paramètres",
    private_campaign: "Cagnotte privée",
    target_amount: "Montant à atteindre",
    hide_amount: "Masquer le montant collecté",
    show_participants: "Afficher les participants",
    description: "Description",
    create_btn: "Lancer ma cagnotte",
    currency: "Devise",
    video_url: "URL de la vidéo (optionnel)",
    success: "Cagnotte créée avec succès!",
    error: "Erreur lors de la création de la cagnotte",
    loading: "Création en cours...",
    animals: "Animaux",
    events: "Événements",
    humanitarian: "Humanitaire",
    medical: "Médical",
    other: "Autre",
    projects: "Projets",
    religion: "Religion",
    solidarity: "Solidarité",
    sports: "Sports",
  },
  mg: {
    title: "Lumikha ng Koleksyon",
    select_image: "Pumili ng pangunahing larawan",
    campaign_title: "Pamagaan ng Puso",
    custom_link: "I-customize ang link",
    choose_category: "Pumili ng kategorya",
    parameters: "Mga Parametro",
    private_campaign: "Pribadong Koleksyon",
    target_amount: "Target na halaga",
    hide_amount: "Itago ang nakolektang halaga",
    show_participants: "Ipakita ang mga kalahok",
    description: "Paglalarawan",
    create_btn: "Simulan ang Koleksyon",
    currency: "Pera",
    video_url: "URL ng Video (Opsyonal)",
    success: "Matagumpay na Nalikha ang Koleksyon!",
    error: "Kamalian sa paglikha ng koleksyon",
    loading: "Lumilikha ngayon...",
    animals: "Hayop",
    events: "Kaganapan",
    humanitarian: "Humanitarian",
    medical: "Medikal",
    other: "Iba",
    projects: "Proyekto",
    religion: "Relihiyon",
    solidarity: "Pagkakaisa",
    sports: "Sports",
  },
  en: {
    title: "Create a campaign",
    select_image: "Select main image",
    campaign_title: "Campaign title",
    custom_link: "Customize the link",
    choose_category: "Choose a category",
    parameters: "Parameters",
    private_campaign: "Private campaign",
    target_amount: "Target amount",
    hide_amount: "Hide collected amount",
    show_participants: "Show participants",
    description: "Description",
    create_btn: "Launch my campaign",
    currency: "Currency",
    video_url: "Video URL (optional)",
    success: "Campaign created successfully!",
    error: "Error creating the campaign",
    loading: "Creating...",
    animals: "Animals",
    events: "Events",
    humanitarian: "Humanitarian",
    medical: "Medical",
    other: "Other",
    projects: "Projects",
    religion: "Religion",
    solidarity: "Solidarity",
    sports: "Sports",
  },
}

const categories = {
  FR: {
    animals: "Animaux",
    events: "Événements",
    humanitarian: "Humanitaire",
    medical: "Médical",
    education: "Éducation",
    environment: "Environnement",
    community: "Communauté",
    children: "Enfance",
    women: "Femmes",
    youth: "Jeunesse",
    elderly: "Personnes âgées",
    disability: "Handicap",
    mental_health: "Santé mentale",
    clean_water: "Eau potable",
    food_aid: "Aide alimentaire",
    poverty: "Lutte contre la pauvreté",
    disaster_relief: "Aide en cas de catastrophe",
    refugees: "Réfugiés",
    housing: "Logement",
    agriculture: "Agriculture",
    climate_change: "Changement climatique",
    technology: "Technologie",
    innovation: "Innovation",
    arts_culture: "Arts et culture",
    sports: "Sport",
    religion: "Religion",
    solidarity: "Solidarité",
    projects: "Projets",
    other: "Autres",
  },

  MG: {
    animals: "Biby",
    events: "Hetsika",
    humanitarian: "Fanampiana maha-olona",
    medical: "Medikal",
    education: "Edukasiona",
    environment: "Kapaligiran",
    community: "Komonina",
    children: "Ankizy",
    women: "Vehivavy",
    youth: "Tanora",
    elderly: "Zokiolona",
    disability: "Fahasembanana",
    mental_health: "Fahasalamana ara-tsaina",
    clean_water: "Rano fisotro madio",
    food_aid: "Fanampiana ara-tsakafo",
    poverty: "Ady amin'ny fahantrana",
    disaster_relief: "Fanampiana amin'ny loza voajanahary",
    refugees: "Mpialokaloka",
    housing: "Fonena",
    agriculture: "Fambolena",
    climate_change: "Fiovan'ny toetr'andro",
    technology: "Teknolojia",
    innovation: "Fanavaozana",
    arts_culture: "Zavakanto sy kolontsaina",
    sports: "Fanatanjahantena",
    religion: "Fivavahana",
    solidarity: "Firaisankina",
    projects: "Tetikasa",
    other: "Hafa",
  },

  EN: {
    animals: "Animals",
    events: "Events",
    humanitarian: "Humanitarian",
    medical: "Medical",
    education: "Education",
    environment: "Environment",
    community: "Community",
    children: "Children",
    women: "Women",
    youth: "Youth",
    elderly: "Elderly",
    disability: "Disability",
    mental_health: "Mental Health",
    clean_water: "Clean Water",
    food_aid: "Food Aid",
    poverty: "Poverty Alleviation",
    disaster_relief: "Disaster Relief",
    refugees: "Refugees",
    housing: "Housing",
    agriculture: "Agriculture",
    climate_change: "Climate Change",
    technology: "Technology",
    innovation: "Innovation",
    arts_culture: "Arts & Culture",
    sports: "Sports",
    religion: "Religion",
    solidarity: "Solidarity",
    projects: "Projects",
    other: "Other",
  },
}

export default function CreateFundraiser() {
  const { isDark } = useTheme()
  const { language } = useLanguage()
  const t = translations[language]
  const categoryLabels = categories[language.toUpperCase()]

  const [formData, setFormData] = useState({
    image: null,
    imagePreview: null,
    titre: "",
    description: "",
    objectif: "",
    devise: "USD",
    categorie: "humanitarian",
    video_url: "",
    masquer_le_montant: false,
    date_fin: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleDescriptionChange = (newDescription) => {
    setFormData((prev) => ({
      ...prev,
      description: newDescription,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.titre || !formData.description || !formData.objectif || !formData.date_fin || !formData.image) {
      setToast({ type: "error", message: t.error })
      return
    }

    setIsLoading(true)

    try {
      // Create FormData for multipart/form-data
      const apiFormData = new FormData()
      apiFormData.append("titre", formData.titre)
      apiFormData.append("description", formData.description)
      apiFormData.append("objectif", formData.objectif)
      apiFormData.append("devise", formData.devise)
      apiFormData.append("categorie", formData.categorie)
      apiFormData.append("date_fin", formData.date_fin)
      apiFormData.append("video_url", formData.video_url || "")
      apiFormData.append("masquer_le_montant", formData.masquer_le_montant)
      apiFormData.append("image", formData.image)

      console.log("[v0] Submitting fundraiser with FormData")
      const response = await api.post("/fundraisers/fundraisers/create/", apiFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      // Success toast
      setToast({ type: "success", message: t.success })

      // Reset form
      setFormData({
        image: null,
        imagePreview: null,
        titre: "",
        description: "",
        objectif: "",
        devise: "USD",
        categorie: "humanitarian",
        video_url: "",
        masquer_le_montant: false,
        date_fin: "",
      })
    } catch (error) {
      const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || error.message
      setToast({ type: "error", message: `${t.error}: ${errorMessage}` })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`create-fundraiser ${isDark ? "dark-mode" : "light-mode"}`}>
      {toast && <Toast message={toast.message} type={toast.type} duration={4000} onClose={() => setToast(null)} />}

      <div className="create-container">
        <h1>{t.title}</h1>

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-section">
            <div className="image-upload-area">
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
                className="image-input"
                required
              />
              {formData.imagePreview ? (
                <div className="image-preview">
                  <img src={formData.imagePreview || "/placeholder.svg"} alt="Preview" />
                  <button
                    type="button"
                    className="change-image"
                    onClick={() => document.getElementById("image").click()}
                  >
                    {t.select_image}
                  </button>
                </div>
              ) : (
                <label htmlFor="image" className="image-upload-label">
                  <span className="camera-icon">📷</span>
                  <p>{t.select_image}</p>
                </label>
              )}
            </div>
          </div>

          <div className="form-section">
            <label htmlFor="titre">{t.campaign_title}</label>
            <input
              type="text"
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={handleInputChange}
              maxLength="255"
              placeholder="Ex: Aide chirurgicale pour maman"
              required
            />
          </div>

          <div className="form-section">
            <label htmlFor="date_fin">Date de fin</label>
            <input
              type="datetime-local"
              id="date_fin"
              name="date_fin"
              value={formData.date_fin}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-section">
            <label htmlFor="objectif">{t.target_amount}</label>
            <input
              type="number"
              id="objectif"
              name="objectif"
              value={formData.objectif}
              onChange={handleInputChange}
              placeholder="Ex: 5000"
              step="0.01"
              required
            />
          </div>

          <div className="form-section">
            <label htmlFor="devise">{t.currency}</label>
            <input
              type="text"
              id="devise"
              name="devise"
              value={formData.devise}
              onChange={handleInputChange}
              maxLength="10"
              placeholder="Ex: USD, EUR, MGA"
              required
            />
          </div>

          <div className="form-section">
            <label htmlFor="categorie">{t.choose_category}</label>
            <select id="categorie" name="categorie" value={formData.categorie} onChange={handleInputChange}>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-section">
            <label htmlFor="video_url">{t.video_url}</label>
            <input
              type="url"
              id="video_url"
              name="video_url"
              value={formData.video_url}
              onChange={handleInputChange}
              maxLength="200"
              placeholder="https://example.com/video"
            />
          </div>

          <div className="form-section parameters-section">
            <h3>{t.parameters}</h3>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="masquer_le_montant"
                  checked={formData.masquer_le_montant}
                  onChange={handleInputChange}
                />
                {t.hide_amount}
              </label>
            </div>
          </div>

          <div className="form-section description-section">
            <label>{t.description}</label>
            <RichTextEditor value={formData.description} onChange={handleDescriptionChange} language={language} />
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? t.loading : t.create_btn}
          </button>
        </form>
      </div>
    </div>
  )
}
