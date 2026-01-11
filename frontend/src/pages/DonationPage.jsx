"use client"

import { useSearchParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "../components/Header"
import "../styles/Donation.css"

export default function DonationPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { language } = useLanguage()
  const [donationAmount, setDonationAmount] = useState("")
  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [donationDescription, setDonationDescription] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [hideAmount, setHideAmount] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const translations = {
    fr: {
      donation_title: "Faire un don",
      donation_amount: "Montant du don (en Ariary)",
      donor_name: "Votre nom",
      donor_email: "Votre email",
      donation_description: "Description (optionnel)",
      anonymous: "Rester anonyme",
      hide_amount: "Ne pas montrer le montant",
      pay_btn: "Procéder au paiement",
      predefined: "Montants prédéfinis",
      currency: "Ar",
      back: "Retour",
      payment_method: "Méthode de paiement",
      card: "Carte bancaire",
      mobile_money: "Mobile Money",
      bank_transfer: "Virement bancaire",
    },
    mg: {
      donation_title: "Mandoa",
      donation_amount: "Habe ny mandoa (Ariary)",
      donor_name: "Ny anaranao",
      donor_email: "Ny imailao",
      donation_description: "Famaritana (Tsy vokatr'aina)",
      anonymous: "Miraka-miharobe",
      hide_amount: "Aza aseho ny habe",
      pay_btn: "Mandrosoa amin'ny pagbabayad",
      predefined: "Habe voafantina",
      currency: "Ar",
      back: "Miverina",
      payment_method: "Fomba fandoavam-bola",
      card: "Carte bancaire",
      mobile_money: "Mobile Money",
      bank_transfer: "Virement bancaire",
    },
    en: {
      donation_title: "Make a donation",
      donation_amount: "Donation amount (in Ariary)",
      donor_name: "Your name",
      donor_email: "Your email",
      donation_description: "Description (optional)",
      anonymous: "Stay anonymous",
      hide_amount: "Don't show the amount",
      pay_btn: "Proceed to payment",
      predefined: "Predefined amounts",
      currency: "Ar",
      back: "Back",
      payment_method: "Payment method",
      card: "Credit Card",
      mobile_money: "Mobile Money",
      bank_transfer: "Bank Transfer",
    },
  }

  const t = translations[language]
  const predefinedAmounts = [50000, 100000, 250000, 500000, 1000000]
  const encryptedId = searchParams.get("id")

  const handlePayment = (e) => {
    e.preventDefault()
    navigate(`/payment/${encryptedId}`, {
      state: {
        amount: donationAmount,
        name: isAnonymous ? "Anonyme" : donorName,
        email: donorEmail,
        description: donationDescription,
        hideAmount: hideAmount,
        method: paymentMethod,
      },
    })
  }

  const handleBack = () => {
    navigate(`/campaign/profile?id=${encryptedId}`)
  }

  return (
    <div className={`donation-page ${isDark ? "dark-mode" : "light-mode"}`}>
      <Header />
      <div className="donation-container">
        <button className="back-btn" onClick={handleBack}>
          ← {t.back}
        </button>

        <div className="donation-form-wrapper">
          <h1>{t.donation_title}</h1>

          <form onSubmit={handlePayment} className="donation-form">
            <div className="amount-section">
              <label>{t.predefined}</label>
              <div className="predefined-amounts">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={`amount-btn ${donationAmount === String(amount) ? "active" : ""}`}
                    onClick={() => setDonationAmount(String(amount))}
                  >
                    {(amount / 1000).toFixed(0)}K
                  </button>
                ))}
              </div>

              <div className="form-group">
                <label htmlFor="custom-amount">{t.donation_amount}</label>
                <input
                  type="number"
                  id="custom-amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Entrez un montant"
                  required
                  min="1000"
                />
              </div>
            </div>

            <div className="donor-section">
              <div className="form-group">
                <label htmlFor="donor-name">{t.donor_name}</label>
                <input
                  type="text"
                  id="donor-name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Jean Dupont"
                  disabled={isAnonymous}
                  required={!isAnonymous}
                />
              </div>

              <div className="form-group">
                <label htmlFor="donor-email">{t.donor_email}</label>
                <input
                  type="email"
                  id="donor-email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="donation-description">{t.donation_description}</label>
                <textarea
                  id="donation-description"
                  value={donationDescription}
                  onChange={(e) => setDonationDescription(e.target.value)}
                  placeholder="Ajouter un message (optionnel)"
                  rows="3"
                ></textarea>
              </div>

              <div className="checkboxes-section">
                <label className="checkbox-group">
                  <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
                  <span>{t.anonymous}</span>
                </label>
                <label className="checkbox-group">
                  <input type="checkbox" checked={hideAmount} onChange={(e) => setHideAmount(e.target.checked)} />
                  <span>{t.hide_amount}</span>
                </label>
              </div>
            </div>

            <div className="payment-method-section">
              <label>{t.payment_method}</label>
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                  </span>
                  <span>{t.card}</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    value="mobile_money"
                    checked={paymentMethod === "mobile_money"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                      <line x1="9" y1="9" x2="15" y2="9"></line>
                      <line x1="9" y1="13" x2="15" y2="13"></line>
                      <line x1="9" y1="17" x2="13" y2="17"></line>
                    </svg>
                  </span>
                  <span>{t.mobile_money}</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10"></path>
                      <path d="M2 6h20"></path>
                      <path d="M4 6L12 2l8 4"></path>
                    </svg>
                  </span>
                  <span>{t.bank_transfer}</span>
                </label>
              </div>
            </div>

            <button type="submit" className="pay-btn">
              {t.pay_btn}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
