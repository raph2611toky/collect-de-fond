"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "../components/Header"
import RichTextEditor from "../components/RichTextEditor"
import fundraisers from "../data/fundraiser-list.json"
import "../styles/CampaignDetails.css"

export default function CampaignDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("details")
  const [updates, setUpdates] = useState([])
  const [showAllParticipants, setShowAllParticipants] = useState(false)
  const campaignId = useMemo(() => Number(id), [id])

  const [campaign, setCampaign] = useState(null)
  const [newUpdate, setNewUpdate] = useState("")
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [updateImage, setUpdateImage] = useState(null)
  const [updateVideo, setUpdateVideo] = useState(null)

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
      recent_donations: "Dernières donations",
      show_more: "Afficher plus de participants",
      private: "PRIVÉ",
      share_facebook: "Partager sur Facebook",
      share_twitter: "sur Twitter",
      share_email: "par Email",
      copy_link: "Copier le lien",
      copied: "Lien copié !",
      mobilize: "Mobilisez du monde !",
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
      recent_donations: "Fidirana teo aloha",
      show_more: "Asehoy ny roangondry bebe kokoa",
      private: "MIAKONA",
      share_facebook: "Zaraina amin'ny Facebook",
      share_twitter: "amin'ny Twitter",
      share_email: "amin'ny imailaka",
      copy_link: "Kopia ny rohy",
      copied: "Ny rohy dia nokopya !",
      mobilize: "Mobilisez mpiara-maso!",
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
      recent_donations: "Recent donations",
      show_more: "Show more participants",
      private: "PRIVATE",
      share_facebook: "Share on Facebook",
      share_twitter: "on Twitter",
      share_email: "by Email",
      copy_link: "Copy link",
      copied: "Link copied !",
      mobilize: "Mobilize people!",
    },
  }

  const t = translations[language]

  useEffect(() => {
    const found = fundraisers.find((c) => Number(c.id) === campaignId)
    setCampaign(found || null)
    if (found) {
      setUpdates(found.updates || [])
    }
  }, [campaignId])

  if (!campaign) return <div className="campaign-details-container">Campaign not found</div>

  const percentage = (campaign.raised / campaign.goal) * 100
  const displayedDonations = showAllParticipants ? campaign.donations : campaign.donations.slice(0, 5)

  const handleAddUpdate = () => {
    if (newUpdate.trim()) {
      setUpdates([
        {
          id: updates.length + 1,
          author: "Vous",
          date: new Date().toLocaleDateString("fr-FR"),
          content: newUpdate,
          type: "text",
          image: updateImage,
          video: updateVideo,
          likes: 0,
        },
        ...updates,
      ])
      setNewUpdate("")
      setUpdateImage(null)
      setUpdateVideo(null)
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

  const handleCopyLink = () => {
    const url = `${window.location.origin}/campaign/${id}`
    navigator.clipboard.writeText(url)
    alert(t.copied)
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

                <section className="recent-donations-section">
                  <h3>{t.recent_donations}</h3>
                  <div className="donations-cards">
                    {displayedDonations.map((donation) => (
                      <div key={donation.id} className="donation-card">
                        <div className="donation-card-amount">
                          {donation.isAnonymous ? t.private : `+${donation.amount} €`}
                        </div>
                        <div className="donation-card-info">
                          <div className="donor-name">{donation.isAnonymous ? t.anonymous : donation.name}</div>
                          {donation.description && <div className="donor-description">{donation.description}</div>}
                        </div>
                        <div className="donation-card-date">{donation.date}</div>
                      </div>
                    ))}
                  </div>
                  {!showAllParticipants && campaign.donations.length > 5 && (
                    <button className="show-more-btn" onClick={() => setShowAllParticipants(true)}>
                      {t.show_more}
                    </button>
                  )}
                </section>

                <section className="share-section">
                  <h3>{t.mobilize}</h3>
                  <div className="share-buttons">
                    <button className="share-btn facebook">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      {t.share_facebook}
                    </button>
                    <button className="share-btn twitter">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.836.779 4.933 4.933 0 002.16-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      {t.share_twitter}
                    </button>
                    <button className="share-btn email">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      {t.share_email}
                    </button>
                  </div>
                  <div className="copy-link-section">
                    <label>{t.copy_link}:</label>
                    <div className="copy-link-input">
                      <input type="text" value={`${window.location.origin}/campaign/${id}`} readOnly />
                      <button onClick={handleCopyLink} className="copy-btn">
                        {t.copy_link}
                      </button>
                    </div>
                  </div>
                </section>
              </section>
            </>
          )}

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
                      <div className="form-files">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setUpdateImage(e.target.files[0])}
                          placeholder="Image (optionnelle)"
                        />
                        <input
                          type="text"
                          placeholder="Lien vidéo YouTube (optionnel)"
                          value={updateVideo || ""}
                          onChange={(e) => setUpdateVideo(e.target.value)}
                        />
                      </div>
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
                    {update.image && (
                      <img src={update.image || "/placeholder.svg"} alt="Update" className="update-image" />
                    )}
                    {update.video && (
                      <div className="update-video">
                        <iframe width="100%" height="300" src={update.video} frameBorder="0" allowFullScreen></iframe>
                      </div>
                    )}
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
                    <div className="donation-amount">{donation.isAnonymous ? t.private : `+${donation.amount} €`}</div>
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
