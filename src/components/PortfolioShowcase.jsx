import React from 'react';
import { Layers, ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    title: "Jelang Hari — Cafe POS & ERP",
    category: "Sistem Web & Kasir POS",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=700&auto=format&fit=crop",
    metric: "SPEED <100MS",
    stack: ["Laravel 11", "React", "Inertia.js", "Tailwind CSS"],
    desc: "Aplikasi POS dan sistem operasional cafe lengkap: kasir kilat, Kitchen Display System (KDS), absensi karyawan, dan analisis omzet."
  },
  {
    title: "Sisfors — Sistem Informasi Sekolah",
    category: "Pendidikan & Database",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=700&auto=format&fit=crop",
    metric: "UPTIME 99.99%",
    stack: ["Laravel", "MySQL", "Role Permission", "Cloud VPS"],
    desc: "Sistem informasi terintegrasi dengan database cepat, panel admin multi-role, laporan keuangan, dan proteksi keamanan data."
  },
  {
    title: "Widjaya Interior & Studio Furniture",
    category: "Company Profile & Katalog",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=700&auto=format&fit=crop",
    metric: "PAGESPEED 98",
    stack: ["React", "Tailwind CSS", "CMS Dashboard", "WhatsApp Direct"],
    desc: "Website company profile modern dengan showcase katalog produk, integrasi konsultasi WhatsApp kilat, dan SEO ramah Google."
  }
];

export default function PortfolioShowcase() {
  return (
    <section id="portofolio" className="py-24 bg-[#fafafa] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-600 mb-3 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-[#ff5429]" />
              <span>Portofolio Karya</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              Karya Nyata yang Telah Kami Bangun
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-neutral-500 text-sm max-w-sm leading-relaxed">
            Setiap website dan sistem direkayasa dengan standar kode bersih, tampilan rapi, dan waktu muat instan.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((item) => (
            <div
              key={item.title}
              className="tayang-card rounded-3xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black text-neutral-800 shadow-sm">
                    {item.metric}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[11px] font-bold text-[#ff5429] uppercase tracking-wider mb-1.5">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-extrabold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100">
                    {item.stack.map((stk, i) => (
                      <span key={i} className="text-[11px] font-medium bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-full">
                        {stk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
