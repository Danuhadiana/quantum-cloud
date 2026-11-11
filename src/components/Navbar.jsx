import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenOrderModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsAppDirect = () => {
    const message = encodeURIComponent("Halo Mas Danu (Quantum Studio)! Saya tertarik untuk konsultasi seputar jasa pembuatan website dan cloud hosting.");
    window.open(`https://wa.me/6289507146296?text=${message}`, '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 transition-all duration-300">
      <div className={`max-w-5xl mx-auto px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 flex items-center justify-between ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
          : 'bg-white/80 backdrop-blur-md border border-neutral-200/70 shadow-sm'
      }`}>
        
        {/* Brand Logo - Tayang Style */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#ff5429] flex items-center justify-center text-white shadow-sm font-black text-sm group-hover:scale-105 transition-transform">
            <span>Q</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base tracking-tight text-neutral-900">
              quantum
            </span>
            <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
              Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-[13px] font-semibold text-neutral-600">
          <a href="#layanan" className="hover:text-black transition-colors">
            Layanan
          </a>
          <a href="#hosting" className="hover:text-black transition-colors">
            Hosting
          </a>
          <a href="#portofolio" className="hover:text-black transition-colors">
            Portofolio
          </a>
          <a href="#harga" className="hover:text-black transition-colors">
            Paket Harga
          </a>
          <a href="#faq" className="hover:text-black transition-colors">
            Pertanyaan
          </a>
        </nav>

        {/* Action Buttons: WhatsApp Pill + Black Pill Button */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={openWhatsAppDirect}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all text-xs font-bold"
          >
            {/* WhatsApp SVG Icon */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
            <span>Join WhatsApp</span>
          </button>

          <button
            onClick={() => onOpenOrderModal({ type: 'general' })}
            className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-all active:scale-95 shadow-sm"
          >
            Konsultasi
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-full text-neutral-700 hover:bg-neutral-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-5xl mx-auto mt-2 p-4 bg-white/95 backdrop-blur-md border border-neutral-200 rounded-3xl shadow-lg flex flex-col gap-3 text-sm font-semibold text-neutral-700">
          <a href="#layanan" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-neutral-50 rounded-xl">Layanan Website</a>
          <a href="#hosting" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-neutral-50 rounded-xl">Cloud Hosting</a>
          <a href="#portofolio" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-neutral-50 rounded-xl">Portofolio</a>
          <a href="#harga" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-neutral-50 rounded-xl">Paket Harga</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 hover:bg-neutral-50 rounded-xl">Pertanyaan</a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); openWhatsAppDirect(); }}
              className="w-full py-2.5 rounded-full bg-emerald-50 border border-emerald-500/30 text-emerald-700 font-bold text-center text-xs flex items-center justify-center gap-2"
            >
              <span>Chat WhatsApp</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenOrderModal({ type: 'general' }); }}
              className="w-full py-2.5 rounded-full bg-neutral-900 text-white font-bold text-center text-xs"
            >
              Konsultasi Proyek
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
