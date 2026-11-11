import React from 'react';
import { Layout, Building2, Code2, Clock, Check, ArrowRight, Laptop } from 'lucide-react';

const SERVICES = [
  {
    icon: Layout,
    tag: "STARTER",
    title: "Landing Page UMKM",
    price: "Mulai Rp 500.000",
    timeline: "3 - 5 Hari Jadi",
    desc: "Website 1-3 halaman khusus UMKM, promosi produk tunggal, portofolio jasa, atau personal branding.",
    features: [
      "Desain Eksklusif & Modern (Bukan template kaku)",
      "Mobile Responsive & Ultra Fast Loading",
      "Integrasi Tombol WhatsApp Direct Click",
      "Gratis Domain & Cloud Hosting 1 Tahun",
      "SSL Certificate Resmi (HTTPS) & SEO Dasar",
      "Garansi & Bantuan Revisi Pasca Rilis"
    ]
  },
  {
    icon: Building2,
    tag: "PALING DIMINATI",
    title: "Company Profile + CMS",
    price: "Mulai Rp 1.500.000",
    timeline: "1 - 2 Minggu Jadi",
    desc: "Website representatif 5-10 halaman untuk yayasan, korporat, atau bisnis dengan dashboard ubah data mandiri.",
    features: [
      "Semua keunggulan paket Landing Page",
      "Dashboard CMS Mandiri (Bisa ubah foto & teks)",
      "Halaman Berita / Blog & Katalog Layanan",
      "Galeri Foto, Portofolio & Formulir Kontak",
      "Gratis Domain (.com) & Hosting Cepat 1 Tahun",
      "Setup Google Maps, Search Console & Keamanan",
      "Maintenance & Pendampingan 3 Bulan"
    ],
    highlight: true
  },
  {
    icon: Code2,
    tag: "FULLSTACK SYSTEM",
    title: "Sistem Web & POS Custom",
    price: "Mulai Rp 3.500.000",
    timeline: "2 - 4 Minggu Jadi",
    desc: "Aplikasi custom database multi-user (POS kasir cafe, manajemen stok/ERP, absensi, atau booking order).",
    features: [
      "Teknologi Modern: Laravel + React + Tailwind",
      "Database Relasional Super Cepat & Aman",
      "Multi-Role: Owner, Manager, Kasir, Staff",
      "Dashboard Omzet, Laporan & Cetak Nota/Excel",
      "Integrasi Notifikasi WhatsApp Real-time",
      "Dedicated Cloud Server Deployment",
      "Garansi & Pendampingan Penuh 6 Bulan"
    ]
  }
];

export default function WebServices({ onOpenOrderModal }) {
  return (
    <section id="layanan" className="py-24 bg-[#fafafa] border-t border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-600 mb-3 shadow-sm">
            <Laptop className="w-3.5 h-3.5 text-[#ff5429]" />
            <span>Jasa Pembuatan Website</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Website Profesional Siap Pakai &amp; Menghasilkan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-500 leading-relaxed">
            Dari landing page sederhana hingga sistem aplikasi kasir &amp; POS yang rumit. Dikerjakan cepat, tampilan premium, dan bergaransi.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.title}
                className={`tayang-card rounded-3xl p-7 flex flex-col justify-between relative ${
                  srv.highlight
                    ? 'border-[#ff5429] ring-2 ring-[#ff5429]/10 shadow-lg'
                    : ''
                }`}
              >
                <div>
                  {/* Top Tag & Timeline */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      srv.highlight
                        ? 'bg-[#ff5429] text-white'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {srv.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-neutral-500">
                      <Clock className="w-3 h-3" />
                      {srv.timeline}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-800 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-extrabold text-neutral-900 mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mb-5 leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="text-2xl font-black text-neutral-900 mb-6 pb-6 border-b border-neutral-100">
                    {srv.price}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-8">
                    {srv.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-neutral-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onOpenOrderModal({
                    type: 'website',
                    name: srv.title,
                    price: srv.price
                  })}
                  className={`w-full py-3 px-4 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    srv.highlight
                      ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-md'
                      : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                  }`}
                >
                  <span>Pesan Paket Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
