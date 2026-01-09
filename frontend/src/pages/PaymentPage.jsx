"use client"

import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"
import Header from "../components/Header"
import "../styles/Payment.css"

export default function PaymentPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { language } = useLanguage()

  const donationData = location.state || {
    amount: 100000,
    name: "Donateur",
    email: "donor@example.com",
    method: "card",
  }

  const [isProcessing, setIsProcessing] = useState(false)
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })

  const translations = {
    fr: {
      payment_title: "Paiement sécurisé",
      amount: "Montant",
      donor: "Donateur",
      method: "Méthode de paiement",
      card_number: "Numéro de carte",
      cardholder_name: "Nom du titulaire",
      expiry: "Date d'expiration",
      cvc: "CVC",
      process_payment: "Traiter le paiement",
      processing: "Traitement en cours...",
      success: "Paiement réussi",
      back: "Retour",
      card: "Carte bancaire",
      mobile_money: "Mobile Money",
      bank_transfer: "Virement bancaire",
      currency: "Ar",
    },
    mg: {
      payment_title: "Fandoavam-bola azo antoka",
      amount: "Habe",
      donor: "Mandoa",
      method: "Fomba fandoavam-bola",
      card_number: "Zara-panambarana",
      cardholder_name: "Anarana amin'ny carte",
      expiry: "Farany amin'ny daty",
      cvc: "CVC",
      process_payment: "Traiter le paiement",
      processing: "Traitement en cours...",
      success: "Fandoavam-bola vita tsara",
      back: "Miverina",
      card: "Carte bancaire",
      mobile_money: "Mobile Money",
      bank_transfer: "Virement bancaire",
      currency: "Ar",
    },
    en: {
      payment_title: "Secure Payment",
      amount: "Amount",
      donor: "Donor",
      method: "Payment Method",
      card_number: "Card Number",
      cardholder_name: "Cardholder Name",
      expiry: "Expiry Date",
      cvc: "CVC",
      process_payment: "Process Payment",
      processing: "Processing...",
      success: "Payment Successful",
      back: "Back",
      card: "Credit Card",
      mobile_money: "Mobile Money",
      bank_transfer: "Bank Transfer",
      currency: "Ar",
    },
  }

  const t = translations[language]

  const getMethodLabel = () => {
    const methods = {
      card: t.card,
      mobile_money: t.mobile_money,
      bank_transfer: t.bank_transfer,
    }
    return methods[donationData.method] || t.card
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert(t.success)
      navigate(`/campaign/${id}`)
    }, 2000)
  }

  return (
    <div className={`payment-page ${isDark ? "dark-mode" : "light-mode"}`}>
      <Header />
      <div className="payment-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← {t.back}
        </button>

        <div className="payment-wrapper">
          <h1>{t.payment_title}</h1>

          <div className="payment-summary">
            <div className="summary-item">
              <span>{t.amount}:</span>
              <strong>
                {donationData.amount} {t.currency}
              </strong>
            </div>
            <div className="summary-item">
              <span>{t.donor}:</span>
              <strong>{donationData.name}</strong>
            </div>
            <div className="summary-item">
              <span>{t.method}:</span>
              <strong>{getMethodLabel()}</strong>
            </div>
          </div>

          {donationData.method === "card" && (
            <form onSubmit={handlePaymentSubmit} className="payment-form">
              <div className="form-group">
                <label htmlFor="card-number">{t.card_number}</label>
                <input
                  type="text"
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                  required
                  maxLength="19"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cardholder-name">{t.cardholder_name}</label>
                <input
                  type="text"
                  id="cardholder-name"
                  placeholder="John Doe"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry">{t.expiry}</label>
                  <input
                    type="text"
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                    required
                    maxLength="5"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvc">{t.cvc}</label>
                  <input
                    type="text"
                    id="cvc"
                    placeholder="123"
                    value={cardData.cvc}
                    onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                    required
                    maxLength="4"
                  />
                </div>
              </div>

              <button type="submit" className="payment-btn" disabled={isProcessing}>
                {isProcessing ? t.processing : t.process_payment}
              </button>
            </form>
          )}

          {donationData.method === "mobile_money" && (
            <div className="payment-info">
              <p>Instructions pour Mobile Money</p>
              <p>Envoyez votre numéro de téléphone pour recevoir une demande de confirmation.</p>
              <button className="payment-btn">Continuer</button>
            </div>
          )}

          {donationData.method === "bank_transfer" && (
            <div className="payment-info">
              <p>Informations de virement bancaire</p>
              <div className="bank-details">
                <p>
                  <strong>Compte:</strong> 1234567890
                </p>
                <p>
                  <strong>Banque:</strong> Banque Nationale
                </p>
                <p>
                  <strong>BIC:</strong> BNMAMG
                </p>
              </div>
              <button className="payment-btn">Confirmer le virement</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
