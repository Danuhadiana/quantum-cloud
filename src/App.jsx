import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DomainChecker from './components/DomainChecker';
import WebServices from './components/WebServices';
import HostingPricing from './components/HostingPricing';
import ServerCalculator from './components/ServerCalculator';
import PortfolioShowcase from './components/PortfolioShowcase';
import FeaturesTech from './components/FeaturesTech';
import FaqSection from './components/FaqSection';
import CheckoutPage from './components/CheckoutPage';
import Footer from './components/Footer';

export default function App() {
  // 'home' or 'checkout'
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Navigasi beralih ke Halaman Checkout (Tanpa Modal Pop-up)
  const handleGoToCheckout = (orderData) => {
    setSelectedOrder(orderData);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigasi kembali ke Halaman Beranda
  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Jika sedang di halaman Checkout, render tampilan full-page Checkout
  if (currentPage === 'checkout') {
    return (
      <CheckoutPage
        orderData={selectedOrder}
        onBackToHome={handleBackToHome}
      />
    );
  }

  // Tampilan Halaman Utama (Homepage)
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-neutral-900 selection:bg-[#ff5429] selection:text-white">
      {/* Navbar Fixed Top */}
      <Navbar onOpenOrderModal={handleGoToCheckout} />

      {/* Hero Section Tayang Studio Style */}
      <Hero onOpenOrderModal={handleGoToCheckout} />

      {/* Cek Domain Interaktif */}
      <DomainChecker onOpenOrderModal={handleGoToCheckout} />

      {/* Jasa Pembuatan Website Profesional */}
      <WebServices onOpenOrderModal={handleGoToCheckout} />

      {/* Paket Cloud Hosting & VPS */}
      <HostingPricing onOpenOrderModal={handleGoToCheckout} />

      {/* Kalkulator Kustom Server */}
      <ServerCalculator onOpenOrderModal={handleGoToCheckout} />

      {/* Portofolio Showcase Klien Nyata */}
      <PortfolioShowcase />

      {/* Keunggulan & Infrastruktur */}
      <FeaturesTech />

      {/* FAQ Accordion */}
      <FaqSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
