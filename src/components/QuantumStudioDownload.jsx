import React, { useState } from 'react';
import { 
  Download, Terminal, Play, Pause, Cpu, ShieldCheck, Sparkles, 
  Layers, CheckCircle2, ArrowRight, Laptop, Monitor, Code2, 
  Sliders, Video, Zap, Key, DollarSign, Database, Github,
  QrCode, CreditCard, Lock
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
                Windows Web Setup
              </h3>
              <p className="text-xs text-neutral-500 mb-4">
                Installer ringan instan untuk Windows 10 &amp; 11 (64-Bit).
              </p>
              <div className="space-y-1 text-[11px] text-neutral-500 mb-6">
                <div className="flex justify-between">
                  <span>Versi:</span>
                  <strong className="text-neutral-800">v1.0.0-beta</strong>
                </div>
                <div className="flex justify-between">
                  <span>Ukuran Download:</span>
                  <strong className="text-emerald-700 font-bold">&lt; 1 MB (Instan 58 KB)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Paket Inti:</span>
                  <span className="text-neutral-700 font-medium">Download Otomatis</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href="https://github.com/Danuhadiana/quantum-studio/releases/download/v1.0.0-beta/Quantum-Studio-Setup.exe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#ff5429] hover:bg-[#e0451d] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5429] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Setup Windows (.exe)</span>
              </a>
              <p className="text-[10px] text-center text-neutral-400">
                Klik &quot;More info&quot; &rarr; &quot;Run anyway&quot; jika Windows SmartScreen muncul saat pertama kali dibuka.
              </p>
            </div>
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
        <div className="bg-neutral-950 rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-neutral-800 shadow-xl relative overflow-hidden">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-bold text-neutral-300 mb-3.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ff5429]" />
              <span>Arsitektur Distribusi &amp; Lisensi Transparan</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Bagaimana Alur Penggunaan &amp; Pembelian Lisensinya?
            </h3>
            
            <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 leading-relaxed">
              Software ini mengadopsi prinsip transparan: seluruh fitur inti diunduh dan dijalankan secara mandiri di komputer Anda tanpa langganan paksa. Pembelian lisensi Pro dilakukan sepenuhnya di dalam software (in-app purchase).
            </p>
          </div>

          {/* 4-Step Chronological Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="w-7 h-7 rounded-lg bg-[#ff5429] flex items-center justify-center font-black text-xs text-white">
                    1
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-md">
                    Tahap Awal
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1.5">
                  Download &amp; Pasang Gratis
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Unduh file installer resmi Windows (<code>Quantum-Studio-Setup.exe</code>, hanya 58 KB). Begitu dibuka, installer otomatis mengunduh paket lengkap aplikasi di latar belakang tanpa repot setup manual.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-800/80">
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>100% Gratis Selamanya</span>
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="w-7 h-7 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center font-black text-xs text-neutral-200">
                    2
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-md">
                    Eksekusi
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1.5">
                  Koding &amp; Timeline Lokal
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Tulis animasi React/Remotion dan potong klip video lossless via FFmpeg native. Semua berkas proyek Anda tersimpan lokal di laptop tanpa koneksi internet.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-800/80">
                <span className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>Penyimpanan Lokal &amp; Offline</span>
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="w-7 h-7 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center font-black text-xs text-neutral-200">
                    3
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-md">
                    Integrasi
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1.5">
                  Kunci AI Mandiri (BYOA)
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Hubungkan API key Google Gemini, OpenAI, Claude, atau Ollama lokal. Token saver bawaan memangkas biaya pemakaian AI hingga 90% tanpa markup sewa SaaS.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-800/80">
                <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <span>Hemat Biaya Token 90%+</span>
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-xs text-white">
                    4
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                    Aktivasi
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1.5">
                  Beli Lisensi Pro di Software
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Jika butuh akselerasi cloud render atau agen pro, klik menu Lisensi di sudut kanan software. Bayar instan via Midtrans (QRIS/VA) atau input kode serial.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-800/80">
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Aktivasi Instan Tanpa Relogin</span>
                </span>
              </div>
            </div>

          </div>

          {/* In-App Checkout Showcase: Real Visual Representation */}
          <div className="bg-neutral-900/80 rounded-2xl p-6 sm:p-8 border border-neutral-800 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Flow Transparency Guarantees */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#ff5429]">
                  <CreditCard className="w-4 h-4" />
                  <span>Mekanisme Pembelian &amp; Aktivasi Lisensi</span>
                </div>
                
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  Semua Transaksi Dilakukan Langsung dari Software
                </h4>
                
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Kami tidak mengharuskan Anda membuat akun pengguna di web portal ini. Begitu software terinstal di laptop Anda, jendela pembelian terintegrasi resmi dengan payment gateway Midtrans:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                      <span>QRIS &amp; E-Wallet Instan</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-normal">
                      Scan kode QRIS langsung melalui GoPay, ShopeePay, BCA, atau mobile banking apapun.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                      <span>Virtual Account Bank</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-normal">
                      Mendukung transfer otomatis Bank BCA, Mandiri, BNI, BRI, dan Permata 24 jam nonstop.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-amber-400" />
                      <span>Aktivasi Kode Serial</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-normal">
                      Punya kode lisensi (misal: <code>QTM-PRO-XXXX-XXXX</code>)? Input langsung untuk aktivasi offline.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Terenkripsi di Perangkat</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-normal">
                      Kunci lisensi tersimpan aman di sistem penyimpanan lokal komputer Anda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: In-App Store Mockup Window */}
              <div className="lg:col-span-5 bg-neutral-950 rounded-2xl border border-neutral-800 p-5 shadow-2xl">
                <div className="flex items-center justify-between pb-3.5 border-b border-neutral-800 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                    <span className="text-[11px] font-mono text-neutral-400 ml-1">in-app-store.modal</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-md">
                    Midtrans Secured
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Quantum Studio Pro Lifetime</div>
                      <div className="text-[11px] text-neutral-400">Lisensi Permanen 1 Komputer</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-[#ff5429]">Rp 299.000</div>
                      <div className="text-[10px] text-neutral-500">Sekali Bayar</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-2">
                    <div className="text-[11px] font-semibold text-neutral-300">Pilih Metode Pembayaran:</div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-medium">
                      <div className="py-2 px-1 rounded-lg bg-emerald-950/60 border border-emerald-600/60 text-emerald-300 font-bold">
                        QRIS Instan
                      </div>
                      <div className="py-2 px-1 rounded-lg bg-neutral-800/80 text-neutral-400 border border-neutral-700/60">
                        Virtual Account
                      </div>
                      <div className="py-2 px-1 rounded-lg bg-neutral-800/80 text-neutral-400 border border-neutral-700/60">
                        E-Wallet
                      </div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value="QTM-PRO-DEMO-2026"
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-[11px] font-mono text-neutral-400 w-full focus:outline-none"
                      />
                      <button
                        type="button"
                        className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold shrink-0 transition-colors cursor-pointer"
                      >
                        Aktivasi
                      </button>
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Verifikasi instan via enkripsi lokal</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Developer Quick-Start: Git Clone Terminal Box */}
          <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Pengembang: Pasang dari kode sumber via Terminal:</span>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <code className="text-[11px] font-mono bg-neutral-900 px-3.5 py-2 rounded-xl text-neutral-300 border border-neutral-800 overflow-x-auto flex-1 sm:flex-none">
                git clone https://github.com/Danuhadiana/quantum-studio.git
              </code>
              <button
                type="button"
                onClick={handleCopyInstallCmd}
                className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs shrink-0 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5429]"
                aria-label="Salin perintah instalasi git clone"
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
