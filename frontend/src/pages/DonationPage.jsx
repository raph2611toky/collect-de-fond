"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "../components/Header"
import "../styles/Donation.css"

export default function DonationPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { language } = useLanguage()
  const [donationAmount, setDonationAmount] = useState("")
  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card") // Add payment method selection

  const translations = {
    fr: {
      donation_title: "Faire un don",
      donation_amount: "Montant du don (en Ariary)",
      donor_name: "Votre nom",
      donor_email: "Votre email",
      anonymous: "Rester anonyme",
      pay_btn: "Procéder au paiement",
      predefined: "Montants prédéfinis",
      currency: "Ar",
      back: "Retour",
      payment_method: "Méthode de paiement", // Add payment method label
      card: "Carte bancaire",
      mobile_money: "Mobile Money",
      bank_transfer: "Virement bancaire",
    },
    mg: {
      donation_title: "Mandoa",
      donation_amount: "Habe ny mandoa (Ariary)",
      donor_name: "Ny anaranao",
      donor_email: "Ny imailao",
      anonymous: "Miraka-miharobe",
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
      anonymous: "Stay anonymous",
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

  const handlePayment = (e) => {
    e.preventDefault()
    navigate(`/payment/${id}`, {
      state: {
        amount: donationAmount,
        name: isAnonymous ? "Anonyme" : donorName,
        email: donorEmail,
        method: paymentMethod,
      },
    })
  }

  return (
    <div className={`donation-page ${isDark ? "dark-mode" : "light-mode"}`}>
      <Header />
      <div className="donation-container">
        <button className="back-btn" onClick={() => navigate(`/campaign/${id}`)}>
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

              <label className="checkbox-group">
                <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
                <span>{t.anonymous}</span>
              </label>
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
                  <span>💳 {t.card}</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    value="mobile_money"
                    checked={paymentMethod === "mobile_money"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>📱 {t.mobile_money}</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>🏦 {t.bank_transfer}</span>
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
