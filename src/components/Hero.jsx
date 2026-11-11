import React from 'react';
import { ArrowRight, Sparkles, Globe, Server, ShieldCheck, Zap } from 'lucide-react';

export default function Hero({ onOpenOrderModal }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-tayang-pattern">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-orange-100/50 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-purple-100/40 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ===================== FLOATING CARDS (DESKTOP) ===================== */}
        {/* Left Floating Element 1: Claude Sparkle Icon Badge */}
        <div className="hidden lg:flex absolute -left-4 top-12 animate-float-slow items-center justify-center w-16 h-16 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#ff5429]">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Left Floating Element 2: Vertical Phone Mockup (Jelang Hari Cafe POS) */}
        <div className="hidden xl:block absolute -left-10 top-36 w-48 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_20px_45px_rgba(0,0,0,0.08)] p-3 -rotate-6 hover:rotate-0 transition-transform duration-300">
          <div className="w-full h-32 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-3 text-white flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-orange-400">JELANG HARI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-neutral-300">Cafe POS &amp; ERP</div>
              <div className="text-base font-black">Rp 1.480.000</div>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-600 font-semibold px-1">
            <span>Client Showcase</span>
            <span className="text-emerald-600 font-bold">100% Uptime</span>
          </div>
        </div>

        {/* Left Floating Element 3: Node / React Tech Badge */}
        <div className="hidden lg:flex absolute left-8 bottom-4 animate-float-reverse items-center justify-center w-14 h-14 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.06)]">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-black text-xs">
            JS
          </div>
        </div>

        {/* Right Floating Element 1: ChatGPT / AI Clean Badge */}
        <div className="hidden lg:flex absolute -right-2 top-10 animate-float-gentle items-center justify-center w-16 h-16 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-bold">
            <Zap className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Right Floating Element 2: Vertical Phone Mockup (Quantum Cloud Telemetry) */}
        <div className="hidden xl:block absolute -right-8 top-36 w-48 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_20px_45px_rgba(0,0,0,0.08)] p-3 rotate-6 hover:rotate-0 transition-transform duration-300">
          <div className="w-full h-32 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-3 text-white flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-cyan-400">CLOUD SERVER</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">NVMe</span>
            </div>
            <div>
              <div className="text-[11px] text-slate-300">Latency Speed</div>
              <div className="text-lg font-black text-emerald-400">0.18 ms</div>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-600 font-semibold px-1">
            <span>DDoS Guard</span>
            <span className="text-neutral-900 font-bold">Aktif</span>
          </div>
        </div>

        {/* Right Floating Element 3: Cloudflare / Vercel Icon Badge */}
        <div className="hidden lg:flex absolute right-10 bottom-2 animate-float-slow items-center justify-center w-14 h-14 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.06)]">
          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#ff5429]">
            <Server className="w-4 h-4" />
          </div>
        </div>


        {/* ===================== CENTER HERO CONTENT ===================== */}
        <div className="text-center max-w-3xl mx-auto">

          {/* Top Double Pill Badges (Tayang Studio Style) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6">
            {/* Pill 1: Flash Sale */}
            <div className="inline-flex items-center gap-2 p-1 pr-3 rounded-full bg-white border border-neutral-200/80 shadow-sm text-xs font-semibold text-neutral-700">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ff5429] text-white text-[10px] font-black uppercase tracking-wider">
                FLASH SALE
              </span>
              <span>Cloud Hosting Rp19.000</span>
              <span className="text-neutral-300">•</span>
              <span className="text-[#ff5429] font-bold">5 kuota tersisa &rarr;</span>
            </div>

            {/* Pill 2: Promo Info */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200/80 shadow-sm text-xs font-semibold text-neutral-600">
              <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-white text-[9px] font-bold uppercase">
                PROMO
              </span>
              <span>Gratis Domain &amp; SSL Setahun &rsaquo;</span>
            </div>
          </div>

          {/* Main Huge Typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-black tracking-tight text-neutral-900 leading-[1.08]">
            Websites &amp; Cloud,{" "}
            <br className="hidden sm:inline" />
            without the{" "}
            <span className="relative inline-block">
              headaches
              <span className="text-[#ff5429]">.</span>
              <span className="absolute -top-3 -right-5 text-[#ff5429] text-sm">✦</span>
              <span className="absolute -bottom-1 -left-4 text-purple-500 text-xs">✦</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed font-normal">
            Pilih kebutuhan Anda. Kami bangunkan website modern berkecepatan tinggi dengan server cloud NVMe yang stabil, aman, dan siap mendatangkan omzet untuk bisnis Anda.
          </p>

          {/* Action Buttons Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenOrderModal({ type: 'general' })}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800 transition-all shadow-md hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>Konsultasi Proyek Gratis</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#harga"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white border border-neutral-200 text-neutral-700 font-semibold text-sm hover:bg-neutral-50 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Lihat Paket Hosting &amp; Web</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
