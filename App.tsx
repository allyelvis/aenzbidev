import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import AiFeaturesSection from './components/AiFeaturesSection';
import LogoGenerator from './components/LogoGenerator';
import CtaSection from './components/CtaSection';
import Documentation from './components/Documentation';
import PricingPage from './components/PricingPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import DashboardPage from './components/DashboardPage';
import ProjectViewPage from './components/ProjectViewPage';
import StatusPage from './components/StatusPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <AiFeaturesSection />
      <LogoGenerator />
      <CtaSection />
    </>
  );
};

const ScrollToAnchor: React.FC = () => {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="bg-gray-900 text-white min-h-screen font-sans">
        <Header />
        <ScrollToAnchor />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/status" element={<StatusPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/project/:projectId" element={<ProtectedRoute><ProjectViewPage /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;