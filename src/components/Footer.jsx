import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-neutral-600 pt-16 pb-12 border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Footer Banner */}
        <div className="bg-neutral-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 mb-16 shadow-lg">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Siap meluncurkan website &amp; server bisnis Anda?
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Konsultasikan kebutuhan pembuatan website, migrasi hosting, atau sistem custom bersama tim Quantum.
            </p>
          </div>
          <a
            href="https://wa.me/6289507146296?text=Halo%20Mas%20Danu!%20Saya%20ingin%20konsultasi%20pembuatan%20website%20dan%20hosting."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs transition-all shadow-sm shrink-0 flex items-center gap-2"
          >
            <span>Hubungi via WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-xs">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#ff5429] flex items-center justify-center text-white font-black text-xs">
                Q
              </div>
              <span className="font-extrabold text-neutral-900 text-base">
                quantum<span className="text-[#ff5429]">.</span>
              </span>
            </div>
            <p className="text-neutral-500 leading-relaxed text-xs">
              Studio perancangan website modern &amp; penyedia Cloud Hosting cepat terkelola. Dibuat rapi dan berstandar industri.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider mb-4 text-[11px]">
              Layanan Website
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#layanan" className="hover:text-black transition-colors">Landing Page UMKM</a></li>
              <li><a href="#layanan" className="hover:text-black transition-colors">Company Profile + CMS</a></li>
              <li><a href="#layanan" className="hover:text-black transition-colors">Sistem Web POS &amp; Kasir</a></li>
              <li><a href="#portofolio" className="hover:text-black transition-colors">Portofolio Klien</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider mb-4 text-[11px]">
              Cloud Hosting
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#hosting" className="hover:text-black transition-colors">Starter Cloud</a></li>
              <li><a href="#hosting" className="hover:text-black transition-colors">Pro Business NVMe</a></li>
              <li><a href="#hosting" className="hover:text-black transition-colors">Enterprise VPS</a></li>
              <li><a href="#kalkulator" className="hover:text-black transition-colors">Kalkulator Spesifikasi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider mb-4 text-[11px]">
              Hubungi Kami
            </h4>
            <ul className="space-y-2.5 text-neutral-500">
              <li>WhatsApp: <a href="https://wa.me/6289507146296" target="_blank" rel="noopener noreferrer" className="text-neutral-900 font-bold hover:underline">0895-0714-6296</a></li>
              <li>Email: <span className="text-neutral-900 font-medium">halo@quantum.cloud</span></li>
              <li>Status Server: <span className="text-emerald-600 font-bold">● 99.99% Operational</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            &copy; {currentYear} Quantum Studio. Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-6">
            <a href="#layanan" className="hover:text-neutral-900 transition-colors">Layanan</a>
            <a href="#hosting" className="hover:text-neutral-900 transition-colors">Hosting</a>
            <a href="#faq" className="hover:text-neutral-900 transition-colors">FAQ</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
