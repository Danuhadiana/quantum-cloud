import React, { useState } from 'react';
import { 
  Download, Terminal, Play, Pause, Cpu, ShieldCheck, Sparkles, 
  Layers, CheckCircle2, ArrowRight, Laptop, Monitor, Code2, 
  Sliders, Video, Zap, Key, DollarSign, Database, Github
} from 'lucide-react';

export default function QuantumStudioDownload() {
  const [activeTab, setActiveTab] = useState('code');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyInstallCmd = () => {
    navigator.clipboard.writeText('git clone https://github.com/Danuhadiana/quantum-studio.git && cd quantum-studio && npm install');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="software" className="py-24 bg-[#fafafa] border-t border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-600 mb-3 shadow-2xs">
            <Laptop className="w-3.5 h-3.5 text-[#ff5429]" />
            <span>Desktop Software • Open-Source Core</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
            Quantum Studio Desktop
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            Software desktop di laptop Anda yang menggabungkan <strong>Code Editor</strong>, <strong>Timeline Video Multi-Track</strong>, dan <strong>Hub Multi-AI (BYOA)</strong>. Download aplikasinya gratis, dan kelola lisensi cloud langsung di dalam software.
          </p>
        </div>

        {/* DOWNLOAD ACTION CARDS (Windows, macOS, GitHub) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16 max-w-5xl mx-auto">
          
          {/* Windows Download Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#ff5429] shadow-[0_10px_30px_rgba(255,84,41,0.08)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#ff5429] text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Rekomendasi
            </div>
            <div>
              <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#ff5429] mb-4">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-neutral-900 mb-1">
                Windows Installer
              </h3>
              <p className="text-xs text-neutral-500 mb-4">
                File installer setup resmi untuk Windows 10 &amp; 11 (64-Bit).
              </p>
              <div className="space-y-1 text-[11px] text-neutral-500 mb-6">
                <div className="flex justify-between">
                  <span>Versi:</span>
                  <strong className="text-neutral-800">v1.0.0-beta.exe</strong>
                </div>
                <div className="flex justify-between">
                  <span>Ukuran File:</span>
                  <strong className="text-neutral-800">~18.4 MB (Ringan)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Arsitektur:</span>
                  <span className="text-emerald-700 font-bold">x64 Native</span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/Danuhadiana/quantum-studio/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#ff5429] hover:bg-[#e0451d] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download untuk Windows (.exe)</span>
            </a>
          </div>

          {/* macOS Download Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700 mb-4">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-neutral-900 mb-1">
                macOS DMG
              </h3>
              <p className="text-xs text-neutral-500 mb-4">
                Universal binary untuk Mac Apple Silicon (M1/M2/M3) &amp; Intel.
              </p>
              <div className="space-y-1 text-[11px] text-neutral-500 mb-6">
                <div className="flex justify-between">
                  <span>Versi:</span>
                  <strong className="text-neutral-800">v1.0.0-beta.dmg</strong>
                </div>
                <div className="flex justify-between">
                  <span>Ukuran File:</span>
                  <strong className="text-neutral-800">~22.1 MB</strong>
                </div>
                <div className="flex justify-between">
                  <span>Kompatibilitas:</span>
                  <span className="text-neutral-800 font-semibold">macOS 11+</span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/Danuhadiana/quantum-studio/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download untuk macOS (.dmg)</span>
            </a>
          </div>

          {/* GitHub Open Source Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700 mb-4">
                <Github className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-neutral-900 mb-1">
                Open-Source di GitHub
              </h3>
              <p className="text-xs text-neutral-500 mb-4">
                Lihat kode sumber, fork, laporkan issue, atau build sendiri untuk Linux.
              </p>
              <div className="space-y-1 text-[11px] text-neutral-500 mb-6">
                <div className="flex justify-between">
                  <span>Lisensi:</span>
                  <strong className="text-neutral-800">MIT Open Source</strong>
                </div>
                <div className="flex justify-between">
                  <span>Engine:</span>
                  <strong className="text-neutral-800">Tauri 2.0 (Rust) + React</strong>
                </div>
                <div className="flex justify-between">
                  <span>Model AI:</span>
                  <span className="text-emerald-700 font-bold">BYOA &amp; Local Offline</span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/Danuhadiana/quantum-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Lihat Repositori GitHub →</span>
            </a>
          </div>

        </div>

        {/* INTERACTIVE FEATURE SHOWCASE (MOCKUP VISUAL DI DALAM APLIKASI) */}
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-neutral-200/90 shadow-lg mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6 mb-8">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff5429]">
                Tinjauan Antarmuka Software
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 mt-1">
                Kekuatan Studio Lengkap dalam 1 Layar
              </h3>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-2xl self-start sm:self-auto overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'code' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                1. Code &amp; Script Engine
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'video' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                2. Video Timeline Studio
              </button>
              <button
                onClick={() => setActiveTab('byoa')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'byoa' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                3. Multi-AI Hub (BYOA)
              </button>
              <button
                onClick={() => setActiveTab('saver')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'saver' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                4. Hemat Token 100x
              </button>
            </div>
          </div>

          {/* TAB 1: CODE ENGINE */}
          {activeTab === 'code' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  Monaco Code Editor Built-in
                </span>
                <h4 className="text-2xl font-black text-neutral-900 tracking-tight leading-snug">
                  Kendalikan Motion &amp; Video Lewat Baris Kode
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Tidak sekadar drag-and-drop biasa. Anda bisa menulis skrip animasi berbasis kode (JavaScript/Python) untuk membuat puluhan variasi video secara otomatis tanpa render manual yang membosankan.
                </p>
                <div className="space-y-2 text-xs text-neutral-700 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Syntax Highlighting resmi Monaco (engine VS Code).</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Integrasi script generator langsung dari AI Agent.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Output instan ke canvas player 60 FPS.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-neutral-950 rounded-2xl p-5 text-neutral-100 font-mono text-xs shadow-xl border border-neutral-800">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3 text-[11px] text-neutral-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className="ml-2 text-neutral-300">BrandIntroAnimation.jsx</span>
                  </div>
                  <span>React + Remotion Engine</span>
                </div>
                <pre className="text-emerald-400 overflow-x-auto leading-relaxed">
{`// Skrip video terprogram Quantum Studio
export const CinematicScene = ({ title, fps = 60 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const scale = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill className="bg-neutral-950 flex items-center justify-center">
      <h1 style={{ opacity, transform: \`scale(\${scale})\` }}
          className="text-4xl font-black text-amber-400">
        {title}
      </h1>
    </AbsoluteFill>
  );
};`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: VIDEO TIMELINE */}
          {activeTab === 'video' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  Multi-Track Timeline
                </span>
                <h4 className="text-2xl font-black text-neutral-900 tracking-tight leading-snug">
                  Editing Cepat 4K Tanpa Render Ulang Berjam-jam
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Timeline multi-track modern yang memisahkan layer video, audio waveform, auto-subtitle Whisper, dan efek kode khusus. Potong klip dalam hitungan milidetik secara lossless.
                </p>
                <div className="space-y-2 text-xs text-neutral-700 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Lossless Cut &amp; Trim instan via native FFmpeg binary.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Auto-subtitle bahasa Indonesia otomatis tanpa ngetik manual.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Export format vertikal 9:16 untuk TikTok/Reels atau 16:9 4K.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-neutral-900 rounded-2xl p-5 text-white border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#ff5429]" />
                    <span className="font-bold text-white">Quantum Studio Timeline (00:01:24:18)</span>
                  </div>
                  <span className="font-mono text-[10px] bg-neutral-800 px-2 py-0.5 rounded">60 FPS • 4K</span>
                </div>

                {/* Simulated Tracks */}
                <div className="space-y-2 text-[11px] font-mono">
                  <div className="flex items-center gap-3 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                    <span className="w-20 text-neutral-400 text-[10px]">Track 1: Video</span>
                    <div className="flex-1 h-7 bg-neutral-800 rounded-lg flex items-center px-3 text-emerald-400 border border-emerald-500/20">
                      ■ Clip_01_Intro.mp4 (00:00 - 00:45)
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                    <span className="w-20 text-neutral-400 text-[10px]">Track 2: Subtitle</span>
                    <div className="flex-1 h-7 bg-amber-950/40 rounded-lg flex items-center px-3 text-amber-300 border border-amber-500/20">
                      ⚡ Auto_Whisper_Subtitle_Indo.srt
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                    <span className="w-20 text-neutral-400 text-[10px]">Track 3: Audio</span>
                    <div className="flex-1 h-7 bg-blue-950/40 rounded-lg flex items-center px-3 text-blue-300 border border-blue-500/20">
                      ♪ BGM_Cinematic_Acoustic_48kHz.wav
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BYOA HUB */}
          {activeTab === 'byoa' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#ff5429] bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                  BYOA: Bring-Your-Own-Agent
                </span>
                <h4 className="text-2xl font-black text-neutral-900 tracking-tight leading-snug">
                  Bebas dari Langganan AI Mahal Berulang Kali
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Pasang API Key akun Anda sendiri (Claude 3.5, OpenAI GPT-4o, Gemini 2.0 Flash) atau sambungkan ke model AI offline lokal (Ollama / DeepSeek). Data tetap privat di komputer Anda.
                </p>
                <div className="space-y-2 text-xs text-neutral-700 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kunci API tersimpan lokal dan terenkripsi di storage Anda.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Pilihan agen spesialis: Scriptwriter, Coder, dan Film Director.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bisa jalan offline 100% dengan Ollama tanpa internet.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-neutral-50 rounded-2xl p-6 border border-neutral-200/90 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <div className="flex items-center gap-2 font-extrabold text-xs text-neutral-900">
                    <Key className="w-4 h-4 text-[#ff5429]" />
                    <span>Panel Konfigurasi BYOA (Desktop Settings)</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                    Koneksi Lokal Aktif
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-600 mb-1">Pilih Model AI Aktif:</label>
                    <div className="p-2.5 bg-white border border-neutral-200 rounded-xl font-medium text-neutral-800 flex justify-between">
                      <span>Claude 3.5 Sonnet / Gemini 2.0 Flash (Hybrid)</span>
                      <span className="text-emerald-600 font-bold">Terhubung</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-600 mb-1">Local Offline Engine (Ollama):</label>
                    <div className="p-2.5 bg-white border border-neutral-200 rounded-xl font-medium text-neutral-800 flex justify-between">
                      <span>http://localhost:11434 (DeepSeek-R1 / Llama 3)</span>
                      <span className="text-emerald-600 font-bold">Siap Pakai</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SAVER */}
          {activeTab === 'saver' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  Semantic Caching Technology
                </span>
                <h4 className="text-2xl font-black text-neutral-900 tracking-tight leading-snug">
                  Hemat Biaya Token AI Hingga 10x - 100x
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Setiap prompt dan aset yang mirip di-cache secara semantik di komputer lokal. Sistem tidak akan membuang-buang token API untuk hal yang sudah pernah diproses sebelumnya.
                </p>
                <div className="space-y-2 text-xs text-neutral-700 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Deduplikasi konteks memotong boros token hingga 92%.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bebas dari limit kuota per 3 jam seperti di ChatGPT Plus.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Biaya riil hanya Rp 10.000 - Rp 30.000 per bulan pemakaian wajar.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border-2 border-neutral-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <span className="font-extrabold text-xs text-neutral-900">Perbandingan Biaya Bulanan</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Penghematan 92%</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-500">Langganan Terpisah (ChatGPT + Midjourney + Runway):</span>
                      <strong className="text-rose-600">~Rp 1.950.000 / bln</strong>
                    </div>
                    <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-rose-500 rounded-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-700 font-bold">Quantum Studio (Local Cache + Pay-as-you-go):</span>
                      <strong className="text-emerald-700 font-black">~Rp 120.000 / bln</strong>
                    </div>
                    <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="w-[10%] h-full bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ALUR PENGGUNAAN & PEMBELIAN LISENSI IN-APP */}
        <div className="bg-neutral-900 rounded-[32px] p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-2xl mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block mb-3">
              Model Lisensi Terbuka
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Bagaimana Alur Penggunaan &amp; Pembelian Lisensinya?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
              Software ini didesain transparan. Anda mengunduh dan menjalankan aplikasinya terlebih dahulu di laptop, dan seluruh aktivasi atau pembelian fitur Pro dilakukan secara langsung di dalam software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#ff5429] flex items-center justify-center font-black text-sm text-white">
                1
              </div>
              <h4 className="font-extrabold text-sm text-white">Download &amp; Install Gratis</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Unduh file installer installer (.exe/.dmg) dari tombol di atas. Pasang di laptop Anda. Semua fitur koding dan timeline video lokal 100% gratis selamanya.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center font-black text-sm text-white">
                2
              </div>
              <h4 className="font-extrabold text-sm text-white">Gunakan API Key Sendiri (BYOA)</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Sambungkan akun OpenAI, Gemini, Claude milik Anda atau model lokal Ollama secara gratis tanpa bayar biaya sewa software bulanan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-sm text-white">
                3
              </div>
              <h4 className="font-extrabold text-sm text-white">Upgrade Pro Langsung di Software</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Jika butuh Cloud GPU render booster &amp; prebuilt agen premium, Anda bisa mengklik tombol Upgrade di dalam menu software dan membayar via Midtrans secara instan.
              </p>
            </div>

          </div>

          {/* Quick Clone Terminal Box */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Untuk Developer: Install lewat Git terminal:</span>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <code className="text-[11px] font-mono bg-black/60 px-3.5 py-2 rounded-xl text-neutral-300 border border-white/10 overflow-x-auto flex-1 sm:flex-none">
                git clone https://github.com/Danuhadiana/quantum-studio.git
              </code>
              <button
                type="button"
                onClick={handleCopyInstallCmd}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs shrink-0 transition-all cursor-pointer"
              >
                {isCopied ? 'Tersalin!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
