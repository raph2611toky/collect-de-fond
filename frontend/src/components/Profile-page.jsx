"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "./Header"
import "../styles/Profile-page.css"

const translations = {
  mg: {
    title: "Aking Profilo",
    personal: "Personal na Impormasyon",
    mvola: "Numero ng Mvola",
    campaigns: "Aking mga Kampanya",
    stats: "Mga Istatistika",
    edit: "I-edit",
    save: "I-save",
    campaigns_label: "Kampanya",
    collected: "Nakolekta",
    donors: "Mpandoa",
    goal: "Tanjon'aina",
  },
  fr: {
    title: "Mon Profil",
    personal: "Informations personnelles",
    mvola: "Numéro Mvola",
    campaigns: "Mes campagnes",
    stats: "Statistiques",
    edit: "Modifier",
    save: "Enregistrer",
    campaigns_label: "Campagnes",
    collected: "Collecté",
    donors: "Donateurs",
    goal: "Objectif",
  },
  en: {
    title: "My Profile",
    personal: "Personal Information",
    mvola: "Mvola Number",
    campaigns: "My Campaigns",
    stats: "Statistics",
    edit: "Edit",
    save: "Save",
    campaigns_label: "Campaigns",
    collected: "Collected",
    donors: "Donors",
    goal: "Goal",
  },
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const { language } = useLanguage()
  const { isDark } = useTheme()
  const [profile, setProfile] = useState({
    name: "Jean Durand",
    email: "jean@example.com",
    mvola: "+261 32 123 45 67",
  })
  const t = translations[language]

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    console.log("Profil sauvegardé:", profile)
  }

  return (
    <div className={`profile-page ${isDark ? "dark-mode" : "light-mode"}`}>
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">JD</div>
          <div className="profile-info">
            <h1>{profile.name}</h1>
            <p>{profile.email}</p>
          </div>
          <button className="edit-btn" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
            {isEditing ? t.save : t.edit}
          </button>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-number">3</div>
            <div className="stat-label">{t.campaigns_label}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">12.5K Ar</div>
            <div className="stat-label">{t.collected}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">246</div>
            <div className="stat-label">{t.donors}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">89%</div>
            <div className="stat-label">{t.goal}</div>
          </div>
        </div>

        <div className="profile-sections">
          <section className="profile-section">
            <h2>{t.personal}</h2>
            {isEditing ? (
              <div className="edit-form">
                <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Nom complet" />
                <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
              </div>
            ) : (
              <div className="view-form">
                <div className="form-row">
                  <span className="label">Nom:</span>
                  <span className="value">{profile.name}</span>
                </div>
                <div className="form-row">
                  <span className="label">Email:</span>
                  <span className="value">{profile.email}</span>
                </div>
              </div>
            )}
          </section>

          <section className="profile-section">
            <h2>{t.mvola}</h2>
            {isEditing ? (
              <input
                type="text"
                name="mvola"
                value={profile.mvola}
                onChange={handleChange}
                placeholder="+261 32 XXX XX XX"
              />
            ) : (
              <div className="mvola-display">{profile.mvola}</div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
