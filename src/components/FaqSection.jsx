import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: "Bagaimana cara kerja layanan Managed Cloud & Hosting Quantum?",
    a: "Anda tidak perlu pusing mengurus terminal Linux, konfigurasi server, atau DNS records. Saat Anda memesan paket cloud atau website dari kami, seluruh arsitektur server, proteksi DDoS, sertifikat SSL, dan auto-backup kami konfigurasi secara profesional. Anda langsung terima bersih dan siap pakai."
  },
  {
    q: "Berapa lama proses pembuatan website hingga online?",
    a: "Untuk paket Landing Page UMKM biasanya selesai dalam 3-5 hari kerja. Untuk Company Profile dengan CMS memakan waktu sekitar 1-2 minggu, dan aplikasi kustom (POS / Sistem Informasi) memerlukan waktu 2-4 minggu tergantung cakupan modul."
  },
  {
    q: "Apakah seluruh paket pembuatan website sudah termasuk hosting dan domain?",
    a: "Ya! Seluruh paket pembuatan website sudah termasuk Cloud Hosting berkecepatan tinggi selama 1 tahun penuh, domain resmi pilihan Anda (.com / .id), serta sertifikat SSL gratis selamanya tanpa biaya tersembunyi."
  },
  {
    q: "Bagaimana jika saya sudah punya website lama dan ingin pindah ke Quantum?",
    a: "Kami menyediakan layanan bantuan migrasi 100% gratis! Tim kami yang akan memindahkan file website, database, dan konfigurasi email Anda dari hosting lama tanpa adanya downtime."
  },
  {
    q: "Metode pembayaran apa saja yang diterima?",
    a: "Kami menerima transfer bank resmi (BCA, Mandiri, BNI, BRI) dan QRIS instan untuk semua e-wallet (GoPay, OVO, Dana). Pembayaran proyek pembuatan website menggunakan skema DP 50% dan pelunasan saat website siap rilis."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-neutral-200/80">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#ff5429]" />
            <span>Tanya Jawab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            Jawaban lengkap seputar hosting, alur pengerjaan website, dan garansi layanan.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="tayang-card rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-extrabold text-sm sm:text-base text-neutral-900">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-neutral-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
