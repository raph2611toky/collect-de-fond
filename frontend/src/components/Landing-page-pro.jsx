"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import "../styles/Landing-page.css"

export default function LandingPagePro({ language = "fr", onNavigate }) {
  const { isDark } = useTheme()
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
  const [submitMessage, setSubmitMessage] = useState("")

  const translations = {
    fr: {
      heroTitle: "Gérez votre plateforme de collecte de fonds facilement",
      heroDesc:
        "Fanampiana est une plateforme numérique complète pour les collectes de fonds. Simplifiez vos opérations, automatisez vos processus et changez des vies.",
      startFree: "Commencer Gratuitement",
      watchVideo: "Regarder la vidéo",
      modules: "Nos Modules Principaux",
      testimonials: "Ce que disent nos utilisateurs",
      testimonialsSub: "Découvrez comment Fanampiana transforme les collectes",
      benefits: "Avantages clés",
      contact: "Nous Contacter",
      address: "Adresse",
      email: "Email",
      phone: "Téléphone",
      sendButton: "Envoyer",
      thankYou: "Merci! Nous vous contacterons bientôt.",
    },
    mg: {
      heroTitle: "Ohandehandeha ny fanampianana mora sy hento",
      heroDesc:
        "Fanampiana dia platform feno ho an'ny fanampianan'aina. Tsotsotra ny ady, automatisa ny dingana ary hanova ang buhay.",
      startFree: "Hanomboka Maimaim-poana",
      watchVideo: "Jerena ny vidio",
      modules: "Ny Loharanon'aina",
      testimonials: "Ahoana no tononin'ny mpamit",
      testimonialsSub: "Ahita ny fanana-fanana ny Fanampiana",
      benefits: "Ny Tombony Ataon",
      contact: "Mikipivezivezy Aminay",
      address: "Saha",
      email: "Mailaka",
      phone: "Telefona",
      sendButton: "Alefa",
      thankYou: "Misaotra! Hikipivezivezy aminay fara-hamoram-pehivaizana.",
    },
    en: {
      heroTitle: "Manage your fundraising platform easily",
      heroDesc:
        "Fanampiana is a complete digital platform for fundraising. Simplify your operations, automate processes and change lives together.",
      startFree: "Get Started Free",
      watchVideo: "Watch Video",
      modules: "Our Main Modules",
      testimonials: "What Our Users Say",
      testimonialsSub: "Discover how Fanampiana transforms fundraising",
      benefits: "Key Benefits",
      contact: "Contact Us",
      address: "Address",
      email: "Email",
      phone: "Phone",
      sendButton: "Send",
      thankYou: "Thank you! We will contact you soon.",
    },
  }

  const t = translations[language] || translations.fr

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setSubmitMessage(t.thankYou)
    setContactForm({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitMessage(""), 3000)
  }

  return (
    <div className={`landing ${isDark ? "dark-mode" : "light-mode"}`}>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-text">
            <h1 className="hero-title">{t.heroTitle}</h1>
            <p className="hero-description">{t.heroDesc}</p>
            <div className="hero-actions">
              <button className="btn-primary-landing" onClick={() => onNavigate("dashboard")}>
                {t.startFree}
              </button>
              <button className="btn-secondary-landing">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {t.watchVideo}
              </button>
            </div>
          </div>

          <div className="hero-image-container">
            <img src="/acceuil.png" alt="" />
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="modules-section">
        <div className="modules-container">
          <h2 className="section-title">{t.modules}</h2>
          <div className="modules-grid">
            <div className="module-card">
              <div className="module-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.8 10.9c-2.27-.59-3.8-1.95-3.8-4.9 0-3.36 2.66-4.92 5.64-4.92 3.14 0 5.77 1.8 5.85 5.02h-2.45c-.1-1.8-.98-2.99-3.4-2.99-1.64 0-3.14.89-3.14 2.86 0 1.53.557 2.54 2.64 3.06L8.27 16h3.26l1.27-4.1z" />
                </svg>
              </div>
              <h3>Gestion Financière</h3>
              <p>Facturation, dépenses, trésorerie et rapports automatiques</p>
              <span className="module-badge">3 fonctionnalités</span>
            </div>

            <div className="module-card">
              <div className="module-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                </svg>
              </div>
              <h3>Gestion des Collectes</h3>
              <p>Campagnes, suivi des dons et progression en temps réel</p>
              <span className="module-badge">3 fonctionnalités</span>
            </div>

            <div className="module-card">
              <div className="module-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </div>
              <h3>Rapports & Tableaux</h3>
              <p>Données analytiques et visualisations en temps réel</p>
              <span className="module-badge">2 fonctionnalités</span>
            </div>

            <div className="module-card">
              <div className="module-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <h3>Gestion des Utilisateurs</h3>
              <p>Profils, permissions et suivi des contributeurs</p>
              <span className="module-badge">2 fonctionnalités</span>
            </div>

            <div className="module-card">
              <div className="module-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
              <h3>Support Communauté</h3>
              <p>Forums, partage et collaboration entre utilisateurs</p>
              <span className="module-badge">3 fonctionnalités</span>
            </div>

            <div className="module-card">
              <div className="module-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
              <h3>Sécurité & Cloud</h3>
              <p>Chiffrement, sauvegarde et accès sécurisé partout</p>
              <span className="module-badge">2 fonctionnalités</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="section-title">{t.testimonials}</h2>
          <p className="section-subtitle">{t.testimonialsSub}</p>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p className="testimonial-text">
                "Fanampiana a transformé notre plateforme de collecte. Nous avons augmenté nos dons de 40%!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div>
                  <h4>Jean Dupont</h4>
                  <p>Responsable ONG</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p className="testimonial-text">
                "Interface intuitive et adaptée au contexte malgache. Un vrai game-changer pour nos collectes!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">MR</div>
                <div>
                  <h4>Marie Rakoto</h4>
                  <p>Coordinatrice Projet</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p className="testimonial-text">
                "Support client extraordinaire. Ils répondent rapidement et les mises à jour sont régulières."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">PN</div>
                <div>
                  <h4>Pierre Nandrasana</h4>
                  <p>Administrateur Plateforme</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-image">
            <svg viewBox="0 0 300 300" className="benefits-illustration">
              <defs>
                <linearGradient id="benefitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
              <rect x="30" y="30" width="240" height="240" rx="40" fill="url(#benefitGrad)" opacity="0.9" />
              <circle cx="150" cy="90" r="25" fill="white" />
              <path d="M100 130 Q150 120 200 130 L190 220 Q150 230 110 220 Z" fill="white" opacity="0.9" />
              <rect x="115" y="160" width="70" height="50" fill="white" opacity="0.8" rx="4" />
              <line x1="115" y1="180" x2="185" y2="180" stroke="#22c55e" strokeWidth="1" />
              <rect x="130" y="190" width="8" height="15" fill="#22c55e" />
              <rect x="145" y="185" width="8" height="20" fill="#22c55e" />
              <rect x="160" y="188" width="8" height="17" fill="#22c55e" />
            </svg>
          </div>

          <div className="benefits-content">
            <h2 className="section-title">{t.benefits}</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 5V1h-1v4H7.58c-.46-1.29-1.67-2.2-3.08-2.2-1.84 0-3.33 1.49-3.33 3.33S2.66 9.66 4.5 9.66c1.41 0 2.62-.91 3.08-2.2h3.41v8h2v-8h3.41c.46 1.29 1.67 2.2 3.08 2.2 1.84 0 3.33-1.49 3.33-3.33s-1.49-3.33-3.33-3.33c-1.41 0-2.62.91-3.08 2.2h-3.41V5h-1z" />
                  </svg>
                </div>
                <div>
                  <h4>Gain de temps</h4>
                  <p>Automatisation des tâches et workflows intelligents pour plus d'efficacité</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                </div>
                <div>
                  <h4>Sécurité garantie</h4>
                  <p>Cloud sécurisé avec chiffrement, confidentialité et sauvegarde régulière</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 9.2h3V7H5v2.2zm0 5h3v-2.2H5v2.2zm5-5h3V7h-3v2.2zm0 5h3v-2.2h-3v2.2zm5-5h3V7h-3v2.2zm0 5h3v-2.2h-3v2.2z" />
                  </svg>
                </div>
                <div>
                  <h4>Meilleure visibilité</h4>
                  <p>Données en temps réel, tableaux de bord et rapports détaillés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">{t.contact}</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-item">
                <svg viewBox="0 0 24 24" fill="currentColor" className="info-icon">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <div>
                  <h4>{t.address}</h4>
                  <p>Farafangana, Madagascar</p>
                </div>
              </div>
              <div className="info-item">
                <svg viewBox="0 0 24 24" fill="currentColor" className="info-icon">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
                <div>
                  <h4>{t.email}</h4>
                  <p>contact@fanampiana.mg</p>
                </div>
              </div>
              <div className="info-item">
                <svg viewBox="0 0 24 24" fill="currentColor" className="info-icon">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <div>
                  <h4>{t.phone}</h4>
                  <p>+261 34 10 062 55</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="name">Votre Nom *</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Jean Dupont"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Votre Email *</label>
                <input
                  type="email"
                  id="email"
                  placeholder="votre@email.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  placeholder="Votre message..."
                  rows="5"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary-landing">
                {t.sendButton}
              </button>
              {submitMessage && <p className="success-message">{submitMessage}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
