"use client"

import { Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import { ThemeProvider } from "./context/ThemeContext"
import "./App.css"

import { useToast } from "./hooks/useToast"
import ToastContainer from "./components/ToastContainer"

import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import VerifyOTPPage from "./pages/VerifyOTPPage"
import DashboardPage from "./pages/DashboardPage"
import CampaignDetailsPage from "./pages/CampaignDetailsPage"
import DonationPage from "./pages/DonationPage"
import PaymentPage from "./pages/PaymentPage"
import ProfilePage from "./components/Profile-page"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import MyFundraisersPage from "./pages/MyFundraisersPage"

function App() {
  const toast = useToast()

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastContainer toasts={toast.toasts} onRemoveToast={toast.removeToast} />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage toast={toast} />} />
          <Route path="/register" element={<RegisterPage toast={toast} />} />
          <Route path="/verify-otp" element={<VerifyOTPPage toast={toast} />} />
          <Route path="/dashboard/*" element={<DashboardPage toast={toast} />} />
          <Route path="/campaign/profile" element={<CampaignDetailsPage />} />
          <Route path="/campaign/profile/donate" element={<DonationPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage toast={toast} />} />
          <Route path="/reset-password" element={<ResetPasswordPage toast={toast} />} />
          <Route path="/my-fundraisers" element={<MyFundraisersPage toast={toast} />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
