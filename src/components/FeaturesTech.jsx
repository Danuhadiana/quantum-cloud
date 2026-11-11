import React from 'react';
import { Zap, ShieldCheck, RefreshCw, Cpu, Headphones, Server } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    tag: "STORAGE",
    title: "100% Pure NVMe Gen4",
    desc: "Kecepatan transfer data hingga 3,500 MB/s. 7x lebih gesit dibanding SSD standar untuk query database berat."
  },
  {
    icon: Server,
    tag: "MANAGED",
    title: "Managed Cloud Architecture",
    desc: "Kami mengurus seluruh instalasi OS, Nginx tuning, sertifikasi SSL, hingga patch keamanan berkala."
  },
  {
    icon: ShieldCheck,
    tag: "SECURITY",
    title: "Proteksi DDoS & Firewall",
    desc: "Mitigasi serangan traffic bot otomatis sebelum menyentuh aplikasi atau mengganggu ketersediaan website Anda."
  },
  {
    icon: RefreshCw,
    tag: "BACKUP",
    title: "Backup Otomatis Harian",
    desc: "Snapshot database dan file website tersimpan di storage terisolasi untuk perlindungan data yang terjamin aman."
  },
  {
    icon: Headphones,
    tag: "SUPPORT",
    title: "Bantuan Migrasi Gratis",
    desc: "Punya website atau hosting lama? Kami tangani seluruh pemindahan data dan konfigurasi DNS tanpa downtime."
  },
  {
    icon: Cpu,
    tag: "NETWORK",
    title: "Konektivitas Indonesia & Global",
    desc: "Datacenter lokal dengan latensi super rendah di Indonesia dan peering langsung ke jaringan Cloudflare."
  }
];

export default function FeaturesTech() {
  return (
    <section id="fitur" className="py-24 bg-white border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-[#ff5429]" />
            <span>Infrastruktur &amp; Keamanan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Keunggulan Server &amp; Layanan Quantum
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-500 leading-relaxed">
            Fondasi komputasi yang kokoh agar website dan aplikasi bisnis Anda berjalan stabil, aman, dan tanpa hambatan teknis.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="tayang-card rounded-3xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-[#ff5429]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded-full border border-neutral-100">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
