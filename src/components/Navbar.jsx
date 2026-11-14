import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onOpenOrderModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press (WCAG Keyboard Accessibility R-32)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const openWhatsAppDirect = () => {
    const message = encodeURIComponent(
      "Halo Mas Danu (Quantum Studio)! Saya tertarik untuk konsultasi seputar software desktop dan jasa pembuatan website."
    );
    window.open(`https://wa.me/6289507146296?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const navLinks = [
    { href: '#software', label: 'Software Desktop', badge: 'v1.0.0' },
    { href: '#layanan', label: 'Layanan Web' },
    { href: '#hosting', label: 'Cloud Hosting' },
    { href: '#portofolio', label: 'Portofolio' },
    { href: '#harga', label: 'Paket Harga' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 py-2.5 rounded-full transition-all duration-200 flex items-center justify-between ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
            : 'bg-white/90 backdrop-blur-sm border border-neutral-200/70 shadow-2xs'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5429] rounded-xl py-0.5"
          aria-label="Quantum Studio Beranda"
        >
          <div className="w-8 h-8 rounded-xl bg-[#ff5429] flex items-center justify-center text-white shadow-xs font-black text-sm select-none">
            <span>Q</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base tracking-tight text-neutral-900">
              quantum
            </span>
            <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200/60">
              Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-neutral-600"
          aria-label="Navigasi Utama"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors py-1 flex items-center gap-1.5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5429] rounded-md ${
                link.href === '#software'
                  ? 'text-[#ff5429] font-bold hover:text-[#e0451d]'
                  : ''
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[10px] bg-orange-100 text-[#ff5429] px-1.5 py-0.2 rounded-full font-bold">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Action Buttons: WhatsApp Pill + Primary Consultation CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            type="button"
            onClick={openWhatsAppDirect}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-600/30 transition-all text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 cursor-pointer"
            aria-label="Konsultasi langsung via WhatsApp"
          >
            <svg
              className="w-3.5 h-3.5 fill-current text-emerald-600 shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenOrderModal({ type: 'general' })}
            className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-all active:scale-95 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 cursor-pointer"
          >
            Konsultasi Proyek
          </button>
        </div>

        {/* Mobile Toggle Button (Touch Target >= 44px) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5429] cursor-pointer"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden max-w-6xl mx-auto mt-2.5 p-4 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl shadow-xl flex flex-col gap-1 text-sm font-semibold text-neutral-700 animate-in fade-in slide-in-from-top-2 duration-150"
          role="dialog"
          aria-label="Menu Navigasi Mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`min-h-[44px] px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                link.href === '#software'
                  ? 'bg-orange-50 text-[#ff5429] font-bold'
                  : 'hover:bg-neutral-100 text-neutral-800'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[10px] bg-orange-100 text-[#ff5429] px-2 py-0.5 rounded-full font-bold">
                  {link.badge}
                </span>
              )}
            </a>
          ))}

          <div className="pt-3 mt-2 border-t border-neutral-200/80 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsAppDirect();
              }}
              className="min-h-[44px] w-full py-2.5 rounded-xl bg-emerald-50 border border-emerald-600/30 text-emerald-800 font-bold text-center text-xs flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <svg
                className="w-4 h-4 fill-current text-emerald-600"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span>Chat via WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal({ type: 'general' });
              }}
              className="min-h-[44px] w-full py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-center text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Konsultasi Proyek Website
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
