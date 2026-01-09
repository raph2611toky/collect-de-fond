"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "../components/Header"
import RichTextEditor from "../components/RichTextEditor"
import "../styles/CampaignDetails.css"

export default function CampaignDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("details")
  const [updates, setUpdates] = useState([
    {
      id: 1,
      author: "Jean Durand",
      date: "23 févr. 2025",
      content: "Merci beaucoup pour votre soutien ! Nous avons atteint 80% de notre objectif.",
      type: "text",
      likes: 15,
    },
    {
      id: 2,
      author: "Marie Dupont",
      date: "20 févr. 2025",
      content: "Nouvelles photos du projet - tout avance bien!",
      type: "text",
      likes: 8,
    },
  ])

  const [newUpdate, setNewUpdate] = useState("")
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const translations = {
    fr: {
      details: "Détails",
      updates: "Actualités",
      participants: "Participants",
      share: "Mobilisez du monde !",
      donate_btn: "Donner maintenant",
      raised: "collectés avec",
      donors: "participants",
      closed: "Cagnotte clôturée",
      platform_secure: "Plateforme 100% sécurisée",
      created_by: "par",
      add_update: "Ajouter une actualité",
      post_update: "Publier",
      cancel: "Annuler",
      anonymous: "Anonyme",
      back: "Retour",
      description: "Description",
      goal: "Objectif",
      progress: "Avancement",
      status: "Statut",
      like: "J'aime",
      liked: "Aimé",
      share_update: "Partager",
    },
    mg: {
      details: "Lisitera",
      updates: "Vaovao",
      participants: "Roangondry",
      share: "Mobilisez mpiara-maso!",
      donate_btn: "Manao fampidirana ankehitriny",
      raised: "nakolekta miaraka amin'ny",
      donors: "roangondry",
      closed: "Cagnotte clôturée",
      platform_secure: "Platform 100% azo antoka",
      created_by: "avy amin'ny",
      add_update: "Ampidira vaovao",
      post_update: "Alefa",
      cancel: "Avela",
      anonymous: "Tsy fantatra ny anarana",
      back: "Miverina",
      description: "Famaritana",
      goal: "Tanjon'aina",
      progress: "Fandrosoan'aina",
      status: "Toetry ny asa",
      like: "Zaho",
      liked: "Zaho",
      share_update: "Zaraina",
    },
    en: {
      details: "Details",
      updates: "Updates",
      participants: "Participants",
      share: "Mobilize people!",
      donate_btn: "Donate now",
      raised: "raised with",
      donors: "participants",
      closed: "Campaign closed",
      platform_secure: "100% secure platform",
      created_by: "by",
      add_update: "Add update",
      post_update: "Post",
      cancel: "Cancel",
      anonymous: "Anonymous",
      back: "Back",
      description: "Description",
      goal: "Goal",
      progress: "Progress",
      status: "Status",
      like: "Like",
      liked: "Liked",
      share_update: "Share",
    },
  }

  const t = translations[language]

  const campaign = {
    id: id,
    title: "Appel pour Lucie",
    creator: "Famille de Xena la G",
    image: "/fundraiser-campaign.jpg",
    goal: 139446,
    raised: 139446,
    donors: 2899,
    status: "closed",
    closedDate: "26 février 2025",
    isPrivate: true,
    description:
      "Après toutes ces manifestations de générosité incroyable, nous allons bientôt devoir clôturer cette cagnotte. Une nouvelle asso prend le relais !!! Parce que ce handicap, c'est pour la vie, nous cherchons des entreprises et particuliers prêts à soutenir Lucie financièrement.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    donations: [
      { id: 1, name: "Ab", amount: 9, date: "07 févr. 2025" },
      { id: 2, name: "Anonymous", amount: 5, date: "06 févr. 2025", isAnonymous: true },
      { id: 3, name: "Monique Dilé", amount: 14, date: "23 févr. 2025" },
    ],
  }

  const percentage = (campaign.raised / campaign.goal) * 100

  const handleAddUpdate = () => {
    if (newUpdate.trim()) {
      setUpdates([
        {
          id: updates.length + 1,
          author: "Vous",
          date: new Date().toLocaleDateString("fr-FR"),
          content: newUpdate,
          type: "text",
          likes: 0,
        },
        ...updates,
      ])
      setNewUpdate("")
      setShowUpdateForm(false)
    }
  }

  const handleLike = (updateId) => {
    setUpdates(
      updates.map((update) =>
        update.id === updateId ? { ...update, likes: update.likes + 1, liked: !update.liked } : update,
      ),
    )
  }

  return (
    <div className={`campaign-details ${isDark ? "dark-mode" : "light-mode"}`}>
      <Header />

      <div className="campaign-details-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← {t.back}
        </button>

        <div className="campaign-header">
          <div className="campaign-image-section">
            <img src={campaign.image || "/placeholder.svg"} alt={campaign.title} className="campaign-main-image" />
          </div>

          <div className="campaign-stats-section">
            <h1>{campaign.title}</h1>
            <p className="creator-name">
              {t.created_by} {campaign.creator}
            </p>

            <div className="stats-box">
              <div className="stat-value">{(campaign.raised / 1000).toFixed(0)} €</div>
              <div className="stat-label">
                {t.raised} {campaign.donors} {t.donors}
              </div>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.min(percentage, 100)}%` }}></div>
              </div>

              <div className="security-badge">
                <span>🛡️</span>
                <span>{t.platform_secure}</span>
              </div>

              <button
                className="donate-btn"
                onClick={() => navigate(`/campaign/${id}/donate`)}
                disabled={campaign.status === "closed"}
              >
                {campaign.status === "closed" ? t.closed : t.donate_btn}
              </button>
            </div>
          </div>
        </div>

        {/* CHANGE: Added tab navigation system */}
        <div className="campaign-tabs">
          <button
            className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            📋 {t.details}
          </button>
          <button
            className={`tab-btn ${activeTab === "updates" ? "active" : ""}`}
            onClick={() => setActiveTab("updates")}
          >
            📰 {t.updates} ({updates.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "participants" ? "active" : ""}`}
            onClick={() => setActiveTab("participants")}
          >
            👥 {t.participants} ({campaign.donors})
          </button>
        </div>

        <div className="campaign-body">
          {/* CHANGE: Details tab with video and full description */}
          {activeTab === "details" && (
            <>
              <section className="details-section">
                <h2>{t.description}</h2>
                {campaign.videoUrl && (
                  <div className="video-container">
                    <iframe
                      width="100%"
                      height="400"
                      src={campaign.videoUrl}
                      title={campaign.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div className="description-content">
                  <p>{campaign.description}</p>
                </div>

                <div className="details-info-grid">
                  <div className="detail-card">
                    <h3>{t.goal}</h3>
                    <p className="detail-value">{(campaign.goal / 1000).toFixed(0)} €</p>
                  </div>
                  <div className="detail-card">
                    <h3>{t.progress}</h3>
                    <p className="detail-value">{percentage.toFixed(0)}%</p>
                  </div>
                  <div className="detail-card">
                    <h3>{t.status}</h3>
                    <p className="detail-value detail-status-closed">
                      {campaign.status === "closed" ? t.closed : "Actif"}
                    </p>
                  </div>
                  <div className="detail-card">
                    <h3>{t.donors}</h3>
                    <p className="detail-value">{campaign.donors}</p>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* CHANGE: Updates/Feed tab with like functionality */}
          {activeTab === "updates" && (
            <section className="updates-section">
              {campaign.status !== "closed" && (
                <>
                  <div className="section-header">
                    <h2>{t.updates}</h2>
                    <button className="add-update-btn" onClick={() => setShowUpdateForm(!showUpdateForm)}>
                      {showUpdateForm ? t.cancel : t.add_update}
                    </button>
                  </div>

                  {showUpdateForm && (
                    <div className="update-form-box">
                      <RichTextEditor value={newUpdate} onChange={setNewUpdate} language={language} />
                      <div className="form-actions">
                        <button className="post-btn" onClick={handleAddUpdate}>
                          {t.post_update}
                        </button>
                        <button className="cancel-btn" onClick={() => setShowUpdateForm(false)}>
                          {t.cancel}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="updates-list">
                {updates.map((update) => (
                  <div key={update.id} className="update-item">
                    <div className="update-header">
                      <div className="update-author-info">
                        <div className="author-avatar">{update.author.charAt(0)}</div>
                        <div>
                          <strong>{update.author}</strong>
                          <span className="update-date">{update.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="update-content">{update.content}</p>
                    <div className="update-actions">
                      <button
                        className={`like-btn ${update.liked ? "liked" : ""}`}
                        onClick={() => handleLike(update.id)}
                      >
                        ❤️ {update.likes}
                      </button>
                      <button className="share-btn">📤 {t.share_update}</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CHANGE: Participants tab showing donations */}
          {activeTab === "participants" && (
            <section className="participants-section">
              <h2>{t.participants}</h2>
              <div className="donations-list">
                {campaign.donations.map((donation) => (
                  <div key={donation.id} className="donation-item">
                    <div className="donation-left">
                      <div className="donor-avatar">{donation.isAnonymous ? "?" : donation.name.charAt(0)}</div>
                      <div>
                        <strong>{donation.isAnonymous ? t.anonymous : donation.name}</strong>
                        <span className="donation-date">{donation.date}</span>
                      </div>
                    </div>
                    <div className="donation-amount">+{donation.amount} €</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
