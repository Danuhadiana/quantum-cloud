import React, { useState } from 'react';
import { Check, Server, Shield, Zap, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    name: "Starter Cloud",
    category: "Personal & UMKM",
    tagline: "Server terkelola untuk landing page, blog, dan website profil.",
    monthlyPrice: 29000,
    annualPrice: 23200, // Diskon 20%
    badge: null,
    specs: [
      "1 vCPU High Performance",
      "1 GB Dedicated RAM",
      "15 GB Pure NVMe Storage",
      "Unlimited Bandwidth 1 Gbps",
      "Gratis SSL (HTTPS) Otomatis",
      "Backup Harian Terjadwal",
      "Setup Terima Beres (No Ribet)"
    ]
  },
  {
    name: "Pro Business Cloud",
    category: "Bisnis & Toko Online",
    tagline: "Dedicated cloud instance untuk web bisnis, e-commerce & aplikasi ramai.",
    monthlyPrice: 79000,
    annualPrice: 63200,
    badge: "PALING LARIS",
    specs: [
      "2 vCPU Dedicated AMD EPYC™",
      "4 GB Dedicated RAM",
      "50 GB Pure NVMe Gen4",
      "Unlimited Bandwidth + Anti-DDoS",
      "Dedicated IP Address",
      "LSCache Super Fast Engine",
      "Firewall & Keamanan Maksimal",
      "Garansi Uptime 99.99%"
    ]
  },
  {
    name: "Enterprise VPS",
    category: "High-Traffic & App",
    tagline: "Kapasitas komputasi besar untuk sistem informasi & database tinggi.",
    monthlyPrice: 189000,
    annualPrice: 151200,
    badge: "MAX PERFORMANCE",
    specs: [
      "4 vCPU High-Compute Cores",
      "8 GB Dedicated RAM",
      "120 GB Enterprise NVMe",
      "Dedicated Private Network",
      "Cloudflare Peering Indonesia",
      "Monitoring Real-time 24/7",
      "Prioritas Bantuan Teknis",
      "Gratis Migrasi dari Hosting Lama"
    ]
  }
];

export default function HostingPricing({ onOpenOrderModal }) {
  const [isAnnual, setIsAnnual] = useState(true);

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="hosting" className="py-24 bg-white border-t border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold mb-3">
            <Server className="w-3.5 h-3.5 text-[#ff5429]" />
            <span>Paket Cloud Hosting</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Cloud Hosting Cepat, Tanpa Pusing Urus Server
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-500 leading-relaxed">
            Infrastruktur 100% Pure NVMe SSD berkecepatan tinggi dengan server terkelola penuh. Kami yang merawat, Anda fokus jualan.
          </p>

          {/* Billing Toggle (Bulanan vs Tahunan) */}
          <div className="mt-8 inline-flex items-center p-1 bg-neutral-100 rounded-full border border-neutral-200 shadow-inner">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                !isAnnual
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAnnual
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <span>Tahunan</span>
              <span className="px-2 py-0.5 rounded-full bg-[#ff5429] text-white text-[10px] font-black">
                HEMAT 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const isHighlight = plan.badge === "PALING LARIS";

            return (
              <div
                key={plan.name}
                className={`tayang-card rounded-3xl p-7 flex flex-col justify-between relative ${
                  isHighlight
                    ? 'border-[#ff5429] ring-2 ring-[#ff5429]/10 shadow-lg'
                    : ''
                }`}
              >
                <div>
                  {/* Badge Row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-neutral-500">
                      {plan.category}
                    </span>
                    {plan.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#ff5429] text-white text-[10px] font-black tracking-wider uppercase">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold text-neutral-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mb-6 leading-relaxed">
                    {plan.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-neutral-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-neutral-900">
                        {formatRupiah(currentPrice)}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">/bulan</span>
                    </div>
                    {isAnnual && (
                      <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                        Ditagih tahunan (Lebih hemat)
                      </div>
                    )}
                  </div>

                  {/* Specs List */}
                  <ul className="space-y-2.5 mb-8">
                    {plan.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-neutral-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onOpenOrderModal({
                    type: 'hosting',
                    name: `${plan.name} (${isAnnual ? 'Tahunan' : 'Bulanan'})`,
                    price: `${formatRupiah(currentPrice)}/bulan`
                  })}
                  className={`w-full py-3 px-4 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    isHighlight
                      ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-md'
                      : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                  }`}
                >
                  <span>Pesan Paket Hosting</span>
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
