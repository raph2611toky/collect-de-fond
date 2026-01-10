"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import "../styles/Auth.css"
import "../styles/ForgotPassword.css"
import api from "../api/axiosClient"

export default function ForgotPasswordPage({ toast }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const maskEmail = (email) => {
    const [username, domain] = email.split("@")
    const maskedUsername = username.charAt(0) + "*".repeat(username.length - 2) + username.charAt(username.length - 1)
    return `${maskedUsername}@${domain}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setError("")

    try {
      setLoading(true)
      const res = await api.post("/users/mot-de-passe/oublier/", { email })
      toast?.success(res.data?.message || "Email envoyé.")
      setEmailSent(true)
    } catch (err) {
      const msg = err?.response?.data?.erreur || err?.response?.data?.detail || "Données invalides."
      setError(msg)
      toast?.error(msg)
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
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
              <h1>Email envoyé</h1>
            </div>

            <div className="confirmation-message">
              <div className="confirmation-icon">✓</div>
              <p className="confirmation-text">
                Un lien de réinitialisation a été envoyé à <strong>{maskEmail(email)}</strong>
              </p>
              <p className="confirmation-subtext">
                Veuillez vérifier votre boîte de réception et cliquer sur le lien pour réinitialiser votre mot de passe.
              </p>
            </div>

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
            <h1>Mot de passe oublié</h1>
            <p>Entrez votre email pour recevoir un lien de réinitialisation.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error ? <div className="auth-error">{error}</div> : null}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@exemple.com"
                required
              />
            </div>

            <button type="submit" className="btn-primary-auth" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer"}
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
