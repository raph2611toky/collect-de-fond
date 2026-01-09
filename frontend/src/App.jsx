import { Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import { ThemeProvider } from "./context/ThemeContext"
import "./App.css"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import CampaignDetailsPage from "./pages/CampaignDetailsPage"
import DonationPage from "./pages/DonationPage"
import PaymentPage from "./pages/PaymentPage"

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/campaign/:id" element={<CampaignDetailsPage />} />
          <Route path="/campaign/:id/donate" element={<DonationPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
