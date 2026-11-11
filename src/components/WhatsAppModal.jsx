import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

export default function WhatsAppModal({ isOpen, onClose, initialData }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [targetDomain, setTargetDomain] = useState(initialData?.detail || '');
  const [selectedService, setSelectedService] = useState(initialData?.name || 'Konsultasi Umum');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const customerName = name.trim() || 'Klien Quantum';
    const domainText = targetDomain ? `\n• Rencana Domain: ${targetDomain}` : '';
    const priceText = initialData?.price ? `\n• Estimasi Paket: ${initialData.price}` : '';
    const notesText = notes.trim() ? `\n• Catatan Tambahan: ${notes}` : '';

    const message = `Halo Quantum Studio!
Saya ingin melakukan konsultasi / pemesanan:

• Nama: ${customerName}
• Layanan / Paket: ${selectedService}${priceText}${domainText}${notesText}

Mohon panduan dan informasi proses selanjutnya. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-neutral-200 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative text-neutral-800">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            WhatsApp Order
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
          Konsultasi &amp; Pemesanan
        </h3>
        <p className="text-xs text-neutral-500 mt-1 mb-6">
          Isi informasi singkat di bawah ini. Format pesan rapi akan dibuka otomatis di chat WhatsApp resmi Quantum.
        </p>

        {/* Order Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              Nama Lengkap / Bisnis Anda
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Danu (Owner Cafe / UMKM)"
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              Paket / Layanan yang Dipilih
            </label>
            <input
              type="text"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-900 font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              Rencana Nama Domain (Opsional)
            </label>
            <input
              type="text"
              value={targetDomain}
              onChange={(e) => setTargetDomain(e.target.value)}
              placeholder="Contoh: jelanghari.com atau cafestudio.id"
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              Ceritakan Kebutuhan Tambahan (Opsional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Mau buatkan website kasir seperti jelanghari, ada menu makanan dan laporan harian..."
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-6 rounded-full bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
          >
            <span>Kirim Pesan ke WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
