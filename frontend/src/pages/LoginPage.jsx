"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import "../styles/Auth.css"
import api from "../api/axiosClient";

const translations = {
  fr: {
    login: "Se connecter",
    email: "Email",
    password: "Mot de passe",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié?",
    loginButton: "Se connecter",
    noAccount: "Pas encore de compte?",
    signUp: "S'inscrire",
    googleLogin: "Se connecter avec Google",
    error: "Email ou mot de passe incorrect",
  },
  mg: {
    login: "Miditra",
    email: "Email",
    password: "Tenimiafina",
    rememberMe: "Tsaraina",
    forgotPassword: "Tenimiafina adino?",
    loginButton: "Miditra",
    noAccount: "Tsy misy ny kaonty?",
    signUp: "Mpamatantra",
    googleLogin: "Miditra miaraka amin'i Google",
    error: "Email na tenimiafina tsy mety",
  },
  en: {
    login: "Login",
    email: "Email",
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    loginButton: "Login",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",
    googleLogin: "Login with Google",
    error: "Invalid email or password",
  },
}

export default function LoginPage({ toast }) {
  const [language, setLanguage] = useState("fr")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const t = translations[language]
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return
    setError("");

    try {
      setLoading(true)
      const res = await api.post("/users/login/", { email, password });
      
      if (res.data?.access) localStorage.setItem("access_token", res.data.access);
      if (res.data?.refresh) localStorage.setItem("refresh_token", res.data.refresh);

      toast?.success("Connexion réussie.");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        t.error;

      setError(msg);
      toast?.error(msg)
    } finally {
      setLoading(false)
    }
  };

  const handleGoogleLogin = () => {
    navigate("/dashboard")
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
            <h1>{t.login}</h1>
            <p>Accédez à votre compte Fanampiana</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label>{t.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>{t.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox">
                <input type="checkbox" />
                {t.rememberMe}
              </label>
              <a href="/forgot-password" className="forgot-link" onClick={(e) => { e.preventDefault(); navigate("/forgot-password") }}>
                {t.forgotPassword}
              </a>
            </div>

            <button type="submit" className="btn-primary-auth" disabled={loading}>
              {loading ? "Connexion..." : t.loginButton}
            </button>
          </form>

          <div className="auth-divider">
            <span>OU</span>
          </div>

          <button className="btn-google" onClick={handleGoogleLogin}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="#1F2937"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t.googleLogin}
          </button>

          <div className="auth-footer">
            <p>
              {t.noAccount}{" "}
              <a href="#signup" onClick={() => navigate("/register")} className="link">
                {t.signUp}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
