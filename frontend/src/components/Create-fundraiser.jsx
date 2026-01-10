"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import RichTextEditor from "./RichTextEditor"
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
    target_amount: "Indiquer un montant à atteindre",
    hide_amount: "Masquer le montant collecté",
    show_participants: "Afficher les participants",
    description: "Description",
    create_btn: "Lancer ma cagnotte",
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
    target_amount: "Magpahiwatig ng target na halaga",
    hide_amount: "Itago ang nakolektang halaga",
    show_participants: "Ipakita ang mga kalahok",
    description: "Paglalarawan",
    create_btn: "Simulan ang Koleksyon",
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
    target_amount: "Set target amount",
    hide_amount: "Hide collected amount",
    show_participants: "Show participants",
    description: "Description",
    create_btn: "Launch my campaign",
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
  "FR": {
    "animals": "Animaux",
    "events": "Événements",
    "humanitarian": "Humanitaire",
    "medical": "Médical",
    "education": "Éducation",
    "environment": "Environnement",
    "community": "Communauté",
    "children": "Enfance",
    "women": "Femmes",
    "youth": "Jeunesse",
    "elderly": "Personnes âgées",
    "disability": "Handicap",
    "mental_health": "Santé mentale",
    "clean_water": "Eau potable",
    "food_aid": "Aide alimentaire",
    "poverty": "Lutte contre la pauvreté",
    "disaster_relief": "Aide en cas de catastrophe",
    "refugees": "Réfugiés",
    "housing": "Logement",
    "agriculture": "Agriculture",
    "climate_change": "Changement climatique",
    "technology": "Technologie",
    "innovation": "Innovation",
    "arts_culture": "Arts et culture",
    "sports": "Sport",
    "religion": "Religion",
    "solidarity": "Solidarité",
    "projects": "Projets",
    "other": "Autres"
  },

  "MG": {
    "animals": "Biby",
    "events": "Hetsika",
    "humanitarian": "Fanampiana maha-olona",
    "medical": "Medikal",
    "education": "Edukasiona",
    "environment": "Kapaligiran",
    "community": "Komonina",
    "children": "Ankizy",
    "women": "Vehivavy",
    "youth": "Tanora",
    "elderly": "Zokiolona",
    "disability": "Fahasembanana",
    "mental_health": "Fahasalamana ara-tsaina",
    "clean_water": "Rano fisotro madio",
    "food_aid": "Fanampiana ara-tsakafo",
    "poverty": "Ady amin’ny fahantrana",
    "disaster_relief": "Fanampiana amin’ny loza voajanahary",
    "refugees": "Mpialokaloka",
    "housing": "Fonena",
    "agriculture": "Fambolena",
    "climate_change": "Fiovan’ny toetr’andro",
    "technology": "Teknolojia",
    "innovation": "Fanavaozana",
    "arts_culture": "Zavakanto sy kolontsaina",
    "sports": "Fanatanjahantena",
    "religion": "Fivavahana",
    "solidarity": "Firaisankina",
    "projects": "Tetikasa",
    "other": "Hafa"
  },

  "EN": {
    "animals": "Animals",
    "events": "Events",
    "humanitarian": "Humanitarian",
    "medical": "Medical",
    "education": "Education",
    "environment": "Environment",
    "community": "Community",
    "children": "Children",
    "women": "Women",
    "youth": "Youth",
    "elderly": "Elderly",
    "disability": "Disability",
    "mental_health": "Mental Health",
    "clean_water": "Clean Water",
    "food_aid": "Food Aid",
    "poverty": "Poverty Alleviation",
    "disaster_relief": "Disaster Relief",
    "refugees": "Refugees",
    "housing": "Housing",
    "agriculture": "Agriculture",
    "climate_change": "Climate Change",
    "technology": "Technology",
    "innovation": "Innovation",
    "arts_culture": "Arts & Culture",
    "sports": "Sports",
    "religion": "Religion",
    "solidarity": "Solidarity",
    "projects": "Projects",
    "other": "Other"
  }
};


export default function CreateFundraiser() {
  const { isDark } = useTheme()
  const { language } = useLanguage()
  const t = translations[language]
  const categoryLabels = categories[language.toUpperCase()]

  const [formData, setFormData] = useState({
    image: null,
    imagePreview: null,
    title: "",
    customLink: "",
    category: "humanitarian",
    isPrivate: false,
    targetAmount: "",
    hideAmount: false,
    showParticipants: true,
    description: "",
  })

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Campaign data:", formData)
    alert("Campagne créée avec succès!")
  }

  return (
    <div className={`create-fundraiser ${isDark ? "dark-mode" : "light-mode"}`}>
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
            <label htmlFor="title">{t.campaign_title}</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              maxLength="50"
              placeholder="Ex: Aide chirurgicale pour maman"
              required
            />
          </div>

          <div className="form-section">
            <label htmlFor="customLink">{t.custom_link}</label>
            <div className="link-input-group">
              <span className="link-prefix">fanampiana.com/</span>
              <input
                type="text"
                id="customLink"
                name="customLink"
                value={formData.customLink}
                onChange={handleInputChange}
                maxLength="30"
                placeholder="pour-alex"
              />
            </div>
          </div>

          <div className="form-section">
            <label htmlFor="category">{t.choose_category}</label>
            <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-section parameters-section">
            <h3>{t.parameters}</h3>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" name="isPrivate" checked={formData.isPrivate} onChange={handleInputChange} />
                {t.private_campaign}
              </label>
              <label>
                <input type="checkbox" name="hideAmount" checked={formData.hideAmount} onChange={handleInputChange} />
                {t.hide_amount}
              </label>
              <label>
                <input
                  type="checkbox"
                  name="showParticipants"
                  checked={formData.showParticipants}
                  onChange={handleInputChange}
                />
                {t.show_participants}
              </label>
            </div>
          </div>

          <div className="form-section description-section">
            <label>{t.description}</label>
            <RichTextEditor value={formData.description} onChange={handleDescriptionChange} language={language} />
          </div>

          <button type="submit" className="submit-btn">
            {t.create_btn}
          </button>
        </form>
      </div>
    </div>
  )
}
