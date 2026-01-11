"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "../components/Header"
import FundraiserCard from "../components/Fundraiser-card"
import EditFundraiserModal from "../components/EditFundraiserModal"
import ConfirmDeleteModal from "../components/ConfirmDeleteModal"
import api from "../api/axiosClient"
import "../styles/MyFundraisers.css"

const translations = {
  fr: {
    myFundraisers: "Mes Collectes de Fonds",
    loading: "Chargement...",
    error: "Erreur lors du chargement",
    noFundraisers: "Vous n'avez pas encore créé de collecte",
    edit: "Éditer",
    delete: "Supprimer",
    deleteConfirm: "Êtes-vous sûr de vouloir supprimer cette collecte ?",
    deleteSuccess: "Collecte supprimée avec succès",
    deleteError: "Erreur lors de la suppression",
    back: "Retour à l'accueil",
    updateSuccess: "Collecte mise à jour avec succès",
    updateError: "Erreur lors de la mise à jour",
  },
  mg: {
    myFundraisers: "Ny Fampandrosoana Mia",
    loading: "Mitaky...",
    error: "Diso tamin'ny fetran'ny data",
    noFundraisers: "Tsy mbola namorona fampandrosoana ianao",
    edit: "Hanova",
    delete: "Fafana",
    deleteConfirm: "Azafady raha hieho fa hatao bebe ianao?",
    deleteSuccess: "Fampandrosoana dia tanteraka",
    deleteError: "Diso tamin'ny famafana",
    back: "Miverina amin'ny ajantsaina",
    updateSuccess: "Fampandrosoana dia novaina",
    updateError: "Diso tamin'ny fanitsiana",
  },
  en: {
    myFundraisers: "My Fundraisers",
    loading: "Loading...",
    error: "Error loading data",
    noFundraisers: "You haven't created any fundraiser yet",
    edit: "Edit",
    delete: "Delete",
    deleteConfirm: "Are you sure you want to delete this fundraiser?",
    deleteSuccess: "Fundraiser deleted successfully",
    deleteError: "Error deleting fundraiser",
    back: "Back to home",
    updateSuccess: "Fundraiser updated successfully",
    updateError: "Error updating fundraiser",
  },
}

export default function MyFundraisersPage({ toast }) {
  const [fundraisers, setFundraisers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingFundraiser, setEditingFundraiser] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [fundraiserToDelete, setFundraiserToDelete] = useState(null)
  const { isDark } = useTheme()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const t = translations[language]

  useEffect(() => {
    fetchMyFundraisers()
  }, [])

  const fetchMyFundraisers = async () => {
    try {
      setLoading(true)
      const res = await api.get("/fundraisers/fundraisers/my/")
      const payload = res.data.data
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.results)
          ? payload.results
          : Array.isArray(payload?.data)
            ? payload.data
            : []
      setFundraisers(list)
      setError(null)
    } catch (err) {
      console.error("[v0] Error fetching my fundraisers:", err.message)
      setError(t.error)
      toast?.error(t.error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (fundraiser) => {
    setEditingFundraiser(fundraiser)
    setShowEditModal(true)
  }

  const handleDeleteClick = (fundraiser) => {
    setFundraiserToDelete(fundraiser)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!fundraiserToDelete) return
    try {
      await api.delete(`/fundraisers/fundraisers/${fundraiserToDelete.id}/`)
      toast?.success(t.deleteSuccess)
      setFundraisers(fundraisers.filter((f) => f.id !== fundraiserToDelete.id))
      setShowDeleteModal(false)
      setFundraiserToDelete(null)
    } catch (err) {
      console.error("[v0] Error deleting fundraiser:", err.message)
      toast?.error(t.deleteError)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setFundraiserToDelete(null)
  }

  const handleSaveEdit = async (updatedData) => {
    try {
      const formData = new FormData()
      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] !== null && updatedData[key] !== undefined) {
          formData.append(key, updatedData[key])
        }
      })

      const res = await api.put(`/fundraisers/fundraisers/${editingFundraiser.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setFundraisers(fundraisers.map((f) => (f.id === editingFundraiser.id ? { ...f, ...res.data.data } : f)))
      setShowEditModal(false)
      setEditingFundraiser(null)
      toast?.success(t.updateSuccess)
    } catch (err) {
      console.error("[v0] Error updating fundraiser:", err.message)
      toast?.error(t.updateError)
    }
  }

  if (loading) {
    return (
      <div className={`my-fundraisers ${isDark ? "dark-mode" : "light-mode"}`}>
        <Header toast={toast} />
        <div className="my-fundraisers-container">
          <div className="loading-message">{t.loading}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`my-fundraisers ${isDark ? "dark-mode" : "light-mode"}`}>
      <Header toast={toast} />
      <div className="my-fundraisers-container">
        <div className="my-fundraisers-header">
          <h1>{t.myFundraisers}</h1>
          <button className={`back-btn ${isDark ? "dark-mode" : ""}`} onClick={() => navigate("/")}>
            ← {t.back}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {fundraisers.length === 0 ? (
          <div className="empty-state">
            <p>{t.noFundraisers}</p>
            <button className="action-btn" onClick={() => navigate("/dashboard/create")}>
              ➕ Créer une collecte
            </button>
          </div>
        ) : (
          <div className="fundraisers-grid">
            {fundraisers.map((fundraiser) => (
              <div key={fundraiser.id} className="fundraiser-wrapper">
                <FundraiserCard
                  fundraiser={fundraiser}
                  language={language}
                  isMyFundraiser={true}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              </div>
            ))}
          </div>
        )}

        {showEditModal && editingFundraiser && (
          <EditFundraiserModal
            fundraiser={editingFundraiser}
            onSave={handleSaveEdit}
            onClose={() => setShowEditModal(false)}
            language={language}
            isDark={isDark}
          />
        )}

        {showDeleteModal && (
          <ConfirmDeleteModal
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
            language={language}
            isDark={isDark}
          />
        )}
      </div>
    </div>
  )
}
