"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import "../styles/Auth.css"
import api from "../api/axiosClient";

const translations = {
  fr: {
    verifyOTP: "Vérifier votre email",
    otpTitle: "Entrez le code de vérification",
    otpDescription: "Un code de vérification a été envoyé à",
    otpPlaceholder: "000000",
    verifyButton: "Vérifier le code",
    resendCode: "Renvoyer le code",
    resendIn: "Renvoyer dans",
    invalidOTP: "Code de vérification invalide",
    otpExpired: "Le code a expiré, veuillez en demander un nouveau",
  },
  mg: {
    verifyOTP: "Manamarina ny ianao email",
    otpTitle: "Soraty ny kaody fanamarinana",
    otpDescription: "Alefa ny kaody fanamarinana ao",
    otpPlaceholder: "000000",
    verifyButton: "Manamarina ny kaody",
    resendCode: "Alefaso ny kaody",
    resendIn: "Alefaso amin",
    invalidOTP: "Kaody tsy mety",
    otpExpired: "Ny kaody nabe ny fotoana",
  },
  en: {
    verifyOTP: "Verify your email",
    otpTitle: "Enter verification code",
    otpDescription: "A verification code has been sent to",
    otpPlaceholder: "000000",
    verifyButton: "Verify Code",
    resendCode: "Resend Code",
    resendIn: "Resend in",
    invalidOTP: "Invalid verification code",
    otpExpired: "Code expired, please request a new one",
  },
}

export default function VerifyOTPPage({ toast }) {
  const [language, setLanguage] = useState("fr")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || "user@example.com"
  const t = translations[language]
  const [loadingVerify, setLoadingVerify] = useState(false)
  const [loadingResend, setLoadingResend] = useState(false)

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true)
      return
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(loadingVerify) return;
    setError("")

    if (otp.length !== 6) {
      setError(t.invalidOTP)
      toast?.error(t.invalidOTP)
      return
    }

    try {
      setLoadingVerify(true)

      await api.post("/users/verify-otp/", {
        email,
        code_otp: otp,
      })

      toast?.success("Compte vérifié avec succès.")
      navigate("/login")
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        t.invalidOTP

      setError(msg)
      toast?.error(msg)
    } finally {
      setLoadingVerify(false)
    }
  }

  const handleResend = async () => {
    setError("")

    try {
      setLoadingResend(true)

      await api.post("/users/resend-otp/", { email })

      toast?.success("Un nouveau code a été envoyé.")
      setTimer(60)
      setCanResend(false)
      setOtp("")
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Impossible de renvoyer le code."

      setError(msg)
      toast?.error(msg)
    } finally {
      setLoadingResend(false)
    }
  }

  return (
    <div className={`auth-page ${isDark ? "dark-mode" : "light-mode"}`}>
      <div className="auth-container-centered">
        <div className="auth-form-wrapper">
          <div className="auth-top-controls">
            <button className="theme-toggle-auth" onClick={toggleTheme} title={isDark ? "Light Mode" : "Dark Mode"}>
              {isDark ? "☀️" : "🌙"}
            </button>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="lang-select">
              <option value="mg">🇲🇬 Malagasy</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>

          <div className="auth-header">
            <div className="auth-logo">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7V17C2 20.866 7.373 23.5 12 23.5C16.627 23.5 22 20.866 22 17V7L12 2Z" />
              </svg>
            </div>
            <h1>{t.verifyOTP}</h1>
            <p>
              {t.otpDescription} {email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label>{t.otpTitle}</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                  setOtp(value)
                  setError("")
                }}
                placeholder={t.otpPlaceholder}
                maxLength="6"
                inputMode="numeric"
                required
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: "0.5rem",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              />
            </div>

            <button type="submit" className="btn-primary-auth" disabled={loadingVerify}>
              {loadingVerify ? "Vérification..." : t.verifyButton}
            </button>
          </form>

          <div className="auth-divider">
            <span>OU</span>
          </div>

          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend || loadingResend}
            className="btn-google"
            style={{ opacity: canResend ? 1 : 0.6, cursor: canResend ? "pointer" : "not-allowed" }}
          >
            {/* {loadingResend ? "Envoi..." : (canResend ? t.resendCode : `${t.resendIn} */}
            {canResend ? (
              t.resendCode
            ) : (
              <>
                {t.resendIn} <span style={{ fontWeight: "600" }}>{timer}s</span>
              </>
            )}
          </button>

          <div className="auth-footer">
            <p>
              <a href="#login" onClick={() => navigate("/login")} className="link">
                Retour à la connexion
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
