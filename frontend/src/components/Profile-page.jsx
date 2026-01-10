"use client"
import { useEffect, useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "./Header"
import api from "../api/axiosClient"
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
  const t = translations[language]

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mvola: "",
    date_naissance: "",
    sexe: "I",
    profile_url: "",
    is_active: true,
  })

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      setLoading(false)
      setError("Non authentifié. Veuillez vous connecter.")
      return
    }

    ;(async () => {
      try {
        setLoading(true)
        setError("")
        const res = await api.get("/users/profile/");

        setProfile({
          name: res.data?.nom_complet || "",
          email: res.data?.email || "",
          mvola: res.data?.numero_phone || "",
          date_naissance: res.data?.date_naissance || "",
          sexe: res.data?.sexe || "I",
          profile_url: res.data?.profile_url || "",
          is_active: res.data?.is_active ?? true,
        })
      } catch (e) {
        const msg =
          e?.response?.data?.detail ||
          e?.response?.data?.message ||
          "Erreur lors du chargement du profil."
        setError(msg)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Tu n’as pas encore donné d’endpoint update:
    // on conserve ton comportement actuel (juste UI + console).
    setIsEditing(false)
    console.log("Profil sauvegardé:", profile)
  }

  const initial = (profile.name?.trim()?.[0] || "U").toUpperCase()

  return (
    <div className={`profile-page ${isDark ? "dark-mode" : "light-mode"}`}>
      <Header />

      <div className="profile-container">
        {/* Header card */}
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.profile_url ? (
              <img
                src={profile.profile_url}
                alt={profile.name || "Profile"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            ) : (
              initial
            )}
          </div>

          <div className="profile-info">
            <h1>{profile.name || t.title}</h1>
            <p>{profile.email || "-"}</p>
            <p>{profile.mvola || "-"}</p>
            {!profile.is_active ? <p>Compte inactif</p> : null}
          </div>

          <button
            className="edit-btn"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {isEditing ? t.save : t.edit}
          </button>
        </div>

        {loading ? <p>Chargement...</p> : null}
        {error ? <div className="auth-error">{error}</div> : null}

        {/* Stats (reste statique comme demandé) */}
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

        {/* Sections (même design / classes CSS) */}
        <div className="profile-sections">
          <div className="profile-section">
            <h2>{t.personal}</h2>

            {isEditing ? (
              <div className="edit-form">
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Nom complet"
                />
                <input
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  name="mvola"
                  value={profile.mvola}
                  onChange={handleChange}
                  placeholder="Téléphone"
                />
                <input
                  name="date_naissance"
                  value={profile.date_naissance || ""}
                  onChange={handleChange}
                  placeholder="Date de naissance"
                />
                <input
                  name="sexe"
                  value={profile.sexe || "I"}
                  onChange={handleChange}
                  placeholder="Sexe (M/F/I)"
                />
              </div>
            ) : (
              <div className="view-form">
                <div className="form-row">
                  <span className="label">Nom</span>
                  <span className="value">{profile.name || "-"}</span>
                </div>
                <div className="form-row">
                  <span className="label">Email</span>
                  <span className="value">{profile.email || "-"}</span>
                </div>
                <div className="form-row">
                  <span className="label">Téléphone</span>
                  <span className="value">{profile.mvola || "-"}</span>
                </div>
                <div className="form-row">
                  <span className="label">Date naissance</span>
                  <span className="value">{profile.date_naissance || "-"}</span>
                </div>
                <div className="form-row">
                  <span className="label">Sexe</span>
                  <span className="value">{profile.sexe || "I"}</span>
                </div>
              </div>
            )}
          </div>

          <div className="profile-section">
            <h2>{t.mvola}</h2>
            <div className="mvola-display">{profile.mvola || "-"}</div>
          </div>
        </div>

        <div className="profile-section">
          <h2>{t.campaigns}</h2>
          <p>Liste de campagnes à venir...</p>
        </div>
      </div>
    </div>
  )
}
