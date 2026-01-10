"use client"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import "../styles/Auth.css"
import "../styles/ResetPassword.css"
import api from "../api/axiosClient"

export default function ResetPasswordPage({ toast }) {
  const [token, setToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [tokenMissing, setTokenMissing] = useState(false)

  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tokenFromUrl = params.get("token")
    const emailFromUrl = params.get("email")

    if (!tokenFromUrl) {
      setTokenMissing(true)
    } else {
      setToken(tokenFromUrl)
    }

    if (emailFromUrl) {
      setEmail(decodeURIComponent(emailFromUrl))
    }
  }, [location.search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setError("")

    if (newPassword !== confirm) {
      const msg = "Les mots de passe ne correspondent pas."
      setError(msg)
      toast?.error(msg)
      return
    }

    try {
      setLoading(true)
      const res = await api.post("/users/mot-de-passe/reset/", {
        token,
        nouveau_mot_de_passe: newPassword,
      })
      toast?.success(res.data?.message || "Mot de passe réinitialisé.")
      navigate("/login")
    } catch (err) {
      const msg = err?.response?.data?.erreur || err?.response?.data?.detail || "Erreur lors de la réinitialisation."
      setError(msg)
      toast?.error(msg)
    } finally {
      setLoading(false)
    }
  }

  if (tokenMissing) {
    return (
      <div className={`auth-page ${isDark ? "dark-mode" : "light-mode"}`}>
        <div className="auth-container-centered">
          <div className="auth-form-wrapper">
            <div className="auth-top-controls">
              <button className="theme-toggle-auth" onClick={toggleTheme} title={isDark ? "Light Mode" : "Dark Mode"}>
                {isDark ? "☀️" : "🌙"}
              </button>
            </div>

            <div className="auth-header">
              <div className="auth-logo">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7V17C2 20.866 7.373 23.5 12 23.5C16.627 23.5 22 20.866 22 17V7L12 2Z" />
                </svg>
              </div>
              <h1>Lien invalide</h1>
            </div>

            <div className="error-message-screen">
              <div className="error-icon">✕</div>
              <p className="error-text">Le lien de réinitialisation n'est pas valide ou a expiré.</p>
              <p className="error-subtext">Veuillez demander un nouveau lien de réinitialisation.</p>
            </div>

            <div className="auth-footer">
              <p>
                <a
                  href="/forgot-password"
                  className="link"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate("/forgot-password")
                  }}
                >
                  Demander un nouveau lien
                </a>
              </p>
              <p>
                <a
                  href="/login"
                  className="link"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate("/login")
                  }}
                >
                  Retour à la connexion
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`auth-page ${isDark ? "dark-mode" : "light-mode"}`}>
      <div className="auth-container-centered">
        <div className="auth-form-wrapper">
          <div className="auth-top-controls">
            <button className="theme-toggle-auth" onClick={toggleTheme} title={isDark ? "Light Mode" : "Dark Mode"}>
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>

          <div className="auth-header">
            <div className="auth-logo">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7V17C2 20.866 7.373 23.5 12 23.5C16.627 23.5 22 20.866 22 17V7L12 2Z" />
              </svg>
            </div>
            <h1>Réinitialiser le mot de passe</h1>
            <p>{email ? `Email: ${email}` : "Saisissez votre nouveau mot de passe."}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error ? <div className="auth-error">{error}</div> : null}

            <div className="form-group">
              <label>Nouveau mot de passe</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirmer</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirmer le mot de passe"
                required
              />
            </div>

            <button type="submit" className="btn-primary-auth" disabled={loading}>
              {loading ? "Réinitialisation..." : "Réinitialiser"}
            </button>

            <div className="auth-footer">
              <p>
                <a
                  href="/login"
                  className="link"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate("/login")
                  }}
                >
                  Retour à la connexion
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
