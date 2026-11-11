import React, { useState } from 'react';
import { Video, Play, Pause, Scissors, Layers, Sparkles, Sliders, Download, Wand2, Maximize2, Volume2, Type } from 'lucide-react';

export default function VideoSuite({ onOpenOrderModal }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [aspectRatio, setAspectRatio] = useState('16:9'); // '16:9' or '9:16'
  const [selectedTool, setSelectedTool] = useState('timeline');

  return (
    <section id="video-suite" className="py-24 bg-canvas border-t border-white/[0.08] relative overflow-hidden">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[350px] bg-brand-purple/15 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-orange mb-2 uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" />
            <span>[ BUILT-IN CREATIVE SOFTWARE ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
            Quantum Video Studio
          </h2>
          <p className="mt-4 text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Software editing video modern dan lengkap yang terintegrasi di dalam ekosistem Quantum. Buat, potong, beri teks otomatis dengan AI, dan render video 4K langsung di cloud tanpa membebani laptop Anda.
          </p>
        </div>

        {/* Interactive Video Studio Workstation Mockup */}
        <div className="quantum-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-w-5xl mx-auto">

          {/* Top Bar Video Editor */}
          <div className="bg-black/60 px-4 py-3 border-b border-white/[0.08] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="text-neutral-400 font-semibold border-l border-white/10 pl-3">
                Quantum Video Studio v2.4 // Project: Cinematic_Promo.qproj
              </span>
            </div>

            {/* Aspect Ratio Switcher */}
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-lg border border-white/10">
              <button
                onClick={() => setAspectRatio('16:9')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  aspectRatio === '16:9' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                16:9 (Landscape)
              </button>
              <button
                onClick={() => setAspectRatio('9:16')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  aspectRatio === '9:16' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                9:16 (Reels/TikTok)
              </button>
            </div>
          </div>

          {/* Editor Main Canvas & Timeline */}
          <div className="p-4 sm:p-6 bg-surface/90">

            {/* Video Viewport Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

              {/* Preview Player */}
              <div className="lg:col-span-2 bg-black rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[260px] sm:min-h-[320px]">
                
                {/* Simulated Aspect Container */}
                <div className={`transition-all duration-300 relative bg-neutral-900 border border-white/15 rounded-lg overflow-hidden flex flex-col justify-between p-4 ${
                  aspectRatio === '16:9' ? 'w-full aspect-video' : 'w-[180px] h-[300px]'
                }`}>
                  {/* Subtle video background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 via-black to-brand-purple/20 opacity-70"></div>
                  
                  {/* Overlay Watermark/Tag */}
                  <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-neutral-400">
                    <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10">4K 60FPS</span>
                    <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10">GPU ACCELERATED</span>
                  </div>

                  {/* Visual Center Graphic */}
                  <div className="relative z-10 text-center my-auto">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center mb-2">
                      <Video className="w-6 h-6 text-brand-orange" />
                    </div>
                    <p className="text-xs font-bold text-white tracking-wide">Cinematic Brand Story</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5 font-mono">00:01:24:18 / 00:03:00:00</p>
                  </div>

                  {/* AI Subtitle Mockup Layer */}
                  <div className="relative z-10 bg-black/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg text-center max-w-sm mx-auto">
                    <span className="text-[11px] font-semibold text-yellow-300 tracking-wide">
                      "Solusi cloud hosting tercepat dengan ekosistem video studio terintegrasi..."
                    </span>
                  </div>
                </div>

                {/* Player Playback Controls */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 z-20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-all"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                    </button>
                    <span className="font-mono text-[11px] text-neutral-300">01:24.18</span>
                  </div>
                  
                  {/* Waveform indicator */}
                  <div className="flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-neutral-400 mr-1" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-1"></span>
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-2"></span>
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-3"></span>
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-4"></span>
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-5"></span>
                  </div>
                </div>

              </div>

              {/* Editing Toolbox Sidebar */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  Fitur Editor Unggulan
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all">
                  <div className="flex items-center gap-2.5 text-white font-bold text-xs mb-1">
                    <Wand2 className="w-4 h-4 text-brand-orange" />
                    <span>AI Auto-Caption &amp; Subtitle</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Generate subtitle otomatis dalam bahasa Indonesia &amp; Inggris dengan akurasi 98% dan animasi teks kekinian ala TikTok.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all">
                  <div className="flex items-center gap-2.5 text-white font-bold text-xs mb-1">
                    <Layers className="w-4 h-4 text-brand-cyan" />
                    <span>Multi-Track Timeline</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Layer video, audio, sound effect, sticker, dan lower thirds terorganisir rapi dengan fitur magnet snapping presisi tinggi.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all">
                  <div className="flex items-center gap-2.5 text-white font-bold text-xs mb-1">
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Cloud GPU 4K Render Engine</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Proses rendering video dieksekusi di server cluster Quantum dengan akselerasi NVENC GPU berkecepatan 10x real-time.
                  </p>
                </div>
              </div>

            </div>

            {/* Timeline Multi-Track Visualizer */}
            <div className="bg-black/50 rounded-xl p-3 border border-white/[0.08] font-mono text-[11px]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-neutral-400">
                <div className="flex items-center gap-2">
                  <Scissors className="w-3.5 h-3.5 text-neutral-500" />
                  <span>TIMELINE MULTI-TRACK</span>
                </div>
                <span>FPS: 60 | CODEC: H.265 (HEVC)</span>
              </div>

              {/* Tracks */}
              <div className="space-y-1.5">
                {/* Track 1: Video */}
                <div className="flex items-center gap-2">
                  <span className="w-16 text-[10px] text-neutral-500">V1 VIDEO</span>
                  <div className="flex-1 h-6 bg-brand-orange/20 border border-brand-orange/40 rounded flex items-center px-2 text-[10px] text-orange-200">
                    Main_Footage_4K_Log.mov
                  </div>
                </div>

                {/* Track 2: Subtitle / Text */}
                <div className="flex items-center gap-2">
                  <span className="w-16 text-[10px] text-neutral-500">T1 TEXT</span>
                  <div className="flex-1 h-6 bg-yellow-500/20 border border-yellow-500/40 rounded flex items-center px-2 text-[10px] text-yellow-200">
                    <Type className="w-3 h-3 mr-1 inline" /> AI_Auto_Subtitles_ID.srt
                  </div>
                </div>

                {/* Track 3: Audio */}
                <div className="flex items-center gap-2">
                  <span className="w-16 text-[10px] text-neutral-500">A1 AUDIO</span>
                  <div className="flex-1 h-6 bg-emerald-500/20 border border-emerald-500/40 rounded flex items-center px-2 text-[10px] text-emerald-200">
                    Background_Music_Beat.wav (Master L/R)
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar Action */}
          <div className="bg-black/80 px-6 py-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400 text-center sm:text-left">
              Ingin software video editing custom untuk workflow studio Anda, atau akses early-bird Quantum Video Studio?
            </div>
            <button
              onClick={() => onOpenOrderModal({
                type: 'video_suite',
                plan: 'Quantum Video Studio (Early Access & Custom Deployment)',
                price: 'Hubungi Tim'
              })}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center gap-2 shrink-0 active:scale-95"
            >
              <span>Dapatkan Akses Video Studio</span>
              <Wand2 className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

