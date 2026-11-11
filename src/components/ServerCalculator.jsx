import React, { useState } from 'react';
import { Sliders, Cpu, HardDrive, Zap, Check, ArrowRight } from 'lucide-react';

export default function ServerCalculator({ onOpenOrderModal }) {
  const [cpu, setCpu] = useState(2);        // 1 - 16 Cores
  const [ram, setRam] = useState(4);        // 1 - 32 GB
  const [nvme, setNvme] = useState(50);     // 20 - 500 GB

  // Kalkulasi harga dinamis
  // vCPU: Rp25.000 / core, RAM: Rp15.000 / GB, NVMe: Rp1.000 / GB
  const calculatedPrice = (cpu * 25000) + (ram * 15000) + (nvme * 1000);

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="kalkulator" className="py-24 bg-[#fafafa] border-t border-neutral-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-600 mb-3 shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-[#ff5429]" />
            <span>Kalkulator Kustom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Kalkulator Spesifikasi Server Cloud
          </h2>
          <p className="text-neutral-500 text-sm mt-3 leading-relaxed">
            Sesuaikan kebutuhan CPU, RAM, dan penyimpanan NVMe. Seluruh server kami siapkan dan kelola penuh secara transparan tanpa biaya tersembunyi.
          </p>
        </div>

        <div className="tayang-card rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Sliders Area (2 Kolom) */}
          <div className="lg:col-span-2 space-y-7">

            {/* CPU Slider */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold text-neutral-700 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#ff5429]" /> Dedicated vCPU Cores
                </span>
                <span className="font-bold text-xs bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-neutral-900">
                  {cpu} vCPU
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                value={cpu}
                onChange={(e) => setCpu(Number(e.target.value))}
                className="w-full accent-neutral-900 h-2 bg-neutral-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 font-medium mt-1.5">
                <span>1 Core</span>
                <span>8 Cores</span>
                <span>16 Cores</span>
              </div>
            </div>

            {/* RAM Slider */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold text-neutral-700 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-600" /> Dedicated RAM Memory
                </span>
                <span className="font-bold text-xs bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-neutral-900">
                  {ram} GB RAM
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="32"
                step="1"
                value={ram}
                onChange={(e) => setRam(Number(e.target.value))}
                className="w-full accent-neutral-900 h-2 bg-neutral-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 font-medium mt-1.5">
                <span>1 GB</span>
                <span>16 GB</span>
                <span>32 GB</span>
              </div>
            </div>

            {/* Storage Slider */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold text-neutral-700 flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-emerald-600" /> Pure NVMe Gen4 Storage
                </span>
                <span className="font-bold text-xs bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-neutral-900">
                  {nvme} GB SSD
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={nvme}
                onChange={(e) => setNvme(Number(e.target.value))}
                className="w-full accent-neutral-900 h-2 bg-neutral-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 font-medium mt-1.5">
                <span>20 GB</span>
                <span>250 GB</span>
                <span>500 GB</span>
              </div>
            </div>

          </div>

          {/* Pricing Estimation Summary (1 Kolom) */}
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#ff5429] uppercase tracking-wider">
                Estimasi Biaya
              </span>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-neutral-900">
                {formatRupiah(calculatedPrice)}
                <span className="text-xs text-neutral-500 font-medium ml-1">/bulan</span>
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">
                Termasuk Full Managed &amp; Backup Otomatis
              </div>

              <div className="mt-6 pt-5 border-t border-neutral-200 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{cpu} Dedicated vCPU Cores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{ram} GB Dedicated RAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{nvme} GB Pure NVMe SSD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Setup &amp; Migrasi Gratis</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenOrderModal({
                type: 'server-custom',
                name: `Custom Cloud Server (${cpu} vCPU, ${ram}GB RAM, ${nvme}GB NVMe)`,
                price: `${formatRupiah(calculatedPrice)}/bulan`
              })}
              className="mt-6 w-full py-3 px-4 rounded-full bg-neutral-900 text-white font-bold text-xs sm:text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Pesan Spek Ini</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
