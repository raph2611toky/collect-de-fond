"use client"

import "../styles/ConfirmDeleteModal.css"

const translations = {
  fr: {
    confirmDelete: "Confirmer la suppression",
    deleteMessage: "Êtes-vous sûr de vouloir supprimer cette collecte ? Cette action ne peut pas être annulée.",
    delete: "Supprimer",
    cancel: "Annuler",
  },
  mg: {
    confirmDelete: "Ponatsotra ny fafana",
    deleteMessage: "Azafady, avy satria hieho fa hatao bebe ianao? Ity kilasy ity tsy azo fiverina.",
    delete: "Fafana",
    cancel: "Avela",
  },
  en: {
    confirmDelete: "Confirm Deletion",
    deleteMessage: "Are you sure you want to delete this fundraiser? This action cannot be undone.",
    delete: "Delete",
    cancel: "Cancel",
  },
}

export default function ConfirmDeleteModal({ onConfirm, onCancel, language, isDark }) {
  const t = translations[language]

  return (
    <div className={`modal-overlay ${isDark ? "dark-mode" : "light-mode"}`} onClick={onCancel}>
      <div
        className={`modal-content confirm-modal ${isDark ? "dark-mode" : "light-mode"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`modal-header ${isDark ? "dark-mode" : "light-mode"}`}>
          <h2>{t.confirmDelete}</h2>
          <button className={`modal-close-btn ${isDark ? "dark-mode" : "light-mode"}`} onClick={onCancel}>
            ✕
          </button>
        </div>

        <div className={`modal-body ${isDark ? "dark-mode" : "light-mode"}`}>
          <div className="delete-icon">⚠️</div>
          <p className="delete-message">{t.deleteMessage}</p>
        </div>

        <div className={`form-actions ${isDark ? "dark-mode" : "light-mode"}`}>
          <button type="button" className={`delete-btn ${isDark ? "dark-mode" : "light-mode"}`} onClick={onConfirm}>
            {t.delete}
          </button>
          <button type="button" className={`cancel-btn ${isDark ? "dark-mode" : "light-mode"}`} onClick={onCancel}>
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  )
}
