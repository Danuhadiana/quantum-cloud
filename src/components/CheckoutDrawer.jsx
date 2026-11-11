import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, ShieldCheck, QrCode, Copy, CheckCircle2, RefreshCw } from 'lucide-react';

export default function CheckoutDrawer({ isOpen, onClose, initialData }) {
  if (!isOpen) return null;

  // Step state: 'form' -> 'payment' -> 'success'
  const [step, setStep] = useState('form');

  // Customer Form Data
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [domain, setDomain] = useState(initialData?.detail || '');
  const [notes, setNotes] = useState('');

  // Payment State
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [isCopied, setIsCopied] = useState(false);
  const [autoVerifying, setAutoVerifying] = useState(false);

  // Generate unique clean Order ID when opened
  useEffect(() => {
    if (isOpen) {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setOrderId(`QTM-${new Date().getFullYear()}${randomCode}`);
      setStep('form');
    }
  }, [isOpen]);

  // Handle Proceed to Payment
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  // Simulate payment verification / Midtrans callback (Clean & Static - NO BLINKING DOTS)
  const handleSimulatePaymentSuccess = () => {
    setAutoVerifying(true);
    setTimeout(() => {
      setAutoVerifying(false);
      setStep('success');
    }, 1200);
  };

  const handleCopyVa = (vaNumber) => {
    navigator.clipboard.writeText(vaNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // WhatsApp Message Generator
  const sendConfirmationToWhatsApp = () => {
    const customerName = name.trim() || 'Klien Quantum';
    const pkgName = initialData?.name || 'Paket Layanan';
    const pkgPrice = initialData?.price || 'Sesuai Kesepakatan';
    const domainText = domain.trim() ? `\n• Rencana Domain: ${domain.trim()}` : '';
    const notesText = notes.trim() ? `\n• Catatan: ${notes.trim()}` : '';

    const message = `Halo Mas Danu (Quantum Studio)! 👋
Saya telah menyelesaikan pembayaran pesanan di website Quantum:

📦 *DETAIL TRANSAKSI:*
• No. Invoice: ${orderId}
• Paket: ${pkgName}
• Total Bayar: ${pkgPrice}
• Metode: ${paymentMethod === 'qris' ? 'QRIS All Payment' : 'BCA Virtual Account'}
• Status: SUDAH BAYAR (LUNAS)

👤 *DATA PEMESAN:*
• Nama: ${customerName}
• WhatsApp: ${whatsapp}${domainText}${notesText}

Saya sertakan juga foto / screenshot bukti transfer pembayaran di bawah ini. Mohon diproses dan dibantu setup servernya ya Mas Danu. Terima kasih banyak! 🙏`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white border border-neutral-200 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative text-neutral-800 transition-all max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ======================= STEP 1: FORM INPUT ======================= */}
        {step === 'form' && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                Langkah 1 dari 2
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              Detail Pemesanan
            </h3>
            <p className="text-xs text-neutral-500 mt-1 mb-6">
              Lengkapi data singkat berikut untuk memproses aktivasi layanan Anda.
            </p>

            {/* Selected Package Summary Box */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#ff5429] uppercase tracking-wider block">
                  Paket Pilihan
                </span>
                <span className="font-extrabold text-sm sm:text-base text-neutral-900">
                  {initialData?.name || 'Paket Layanan'}
                </span>
              </div>
              <div className="text-right">
                <span className="font-black text-base text-neutral-900 block">
                  {initialData?.price || '-'}
                </span>
                <span className="text-[10px] text-neutral-500">Termasuk Setup</span>
              </div>
            </div>

            <form onSubmit={handleProceedToPayment} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Nama Lengkap / Nama Bisnis *
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
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Rencana Nama Domain (Opsional)
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Contoh: jelanghari.com atau cafestudio.id"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Catatan Kebutuhan (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tuliskan jika ada kebutuhan khusus..."
                  className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400 resize-none text-xs"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-6 rounded-full bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Lanjut ke Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* ======================= STEP 2: SESI PEMBAYARAN ======================= */}
        {step === 'payment' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                Langkah 2 dari 2: Pembayaran
              </span>
              <span className="text-xs font-bold text-neutral-500">
                Invoice: <strong className="text-neutral-900 font-mono">{orderId}</strong>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              Selesaikan Pembayaran
            </h3>
            <p className="text-xs text-neutral-500 mt-1 mb-5">
              Scan QRIS atau transfer sesuai nominal. Status akan otomatis berubah menjadi LUNAS setelah diverifikasi.
            </p>

            {/* Total Pembayaran Box */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 mb-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-500 block">Total Tagihan:</span>
                <span className="text-2xl font-black text-neutral-900">
                  {initialData?.price || 'Rp 0'}
                </span>
              </div>
              {/* Clean static status - NO BLINKING DOTS */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                <span>Status: Menunggu Pembayaran</span>
              </div>
            </div>

            {/* Pilihan Metode Bayar (QRIS / Virtual Account) */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('qris')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'qris'
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>QRIS Instan</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('va')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'va'
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <span>BCA Virtual Account</span>
              </button>
            </div>

            {/* Display Area Pembayaran */}
            {paymentMethod === 'qris' ? (
              <div className="p-5 rounded-2xl border border-neutral-200 bg-white flex flex-col items-center justify-center text-center mb-5">
                {/* Clean QRIS SVG Graphic */}
                <div className="p-3 bg-white border border-neutral-200 rounded-2xl shadow-sm mb-3">
                  <svg className="w-40 h-40 text-neutral-900" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" />
                    <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" />
                    <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" />
                    <path d="M50,15 h5 v10 h-5 z M50,35 h8 v8 h-8 z M45,48 h12 v5 h-12 z" />
                    <path d="M60,50 h10 v10 h-10 z M75,50 h15 v5 h-15 z M60,65 h10 v25 h-10 z M75,65 h15 v10 h-15 z M75,80 h15 v10 h-15 z" />
                  </svg>
                </div>
                <div className="text-xs font-extrabold text-neutral-900">
                  Scan dengan GoPay, OVO, Dana, BCA, atau Semua Mobile Banking
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  QRIS Resmi Quantum Cloud Studio &bull; Verifikasi Otomatis
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl border border-neutral-200 bg-white mb-5">
                <span className="text-[11px] text-neutral-500 font-semibold block mb-1">
                  Nomor Rekening / Virtual Account BCA:
                </span>
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <span className="font-mono font-black text-lg text-neutral-900 tracking-wider">
                    8801 2345 6789 001
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyVa('880123456789001')}
                    className="p-1.5 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{isCopied ? 'Tersalin!' : 'Salin'}</span>
                  </button>
                </div>
                <div className="text-[11px] text-neutral-500 mt-2">
                  Atas Nama: <strong>Quantum Cloud Studio (Danu)</strong>
                </div>
              </div>
            )}

            {/* Tombol Simulasi / Cek Status Pembayaran (Tanpa Refresh Halaman) */}
            <div className="space-y-2">
              <button
                type="button"
                disabled={autoVerifying}
                onClick={handleSimulatePaymentSuccess}
                className="w-full py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {autoVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Memverifikasi Pembayaran...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saya Sudah Bayar (Cek Verifikasi)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full py-2 text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition-colors"
              >
                &larr; Ubah Data Pemesan
              </button>
            </div>
          </div>
        )}

        {/* ======================= STEP 3: SUKSES LUNAS ======================= */}
        {step === 'success' && (
          <div className="text-center py-4">
            
            {/* Success Check Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
              Pembayaran Terverifikasi (LUNAS)
            </span>

            <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
              Terima Kasih, {name || 'Klien'}!
            </h3>
            
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-sm mx-auto leading-relaxed">
              Pesanan dengan No. Invoice <strong className="font-mono text-neutral-900">{orderId}</strong> telah berhasil masuk ke sistem Quantum. Tim kami sedang menyiapkan konfigurasi server Anda.
            </p>

            {/* Ringkasan Bukti Lunas Box */}
            <div className="mt-5 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-left text-xs space-y-1.5 text-neutral-600 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span>Paket Layanan:</span>
                <strong className="text-neutral-900">{initialData?.name || 'Paket Layanan'}</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Lunas:</span>
                <strong className="text-emerald-700 font-bold">{initialData?.price || '-'}</strong>
              </div>
              <div className="flex justify-between">
                <span>Status Server:</span>
                <span className="font-bold text-neutral-900">Sedang Di-setup Mas Danu</span>
              </div>
            </div>

            {/* OPSI 1: Tombol Cepat Konfirmasi ke WhatsApp */}
            <div className="mt-6 space-y-2.5 max-w-sm mx-auto">
              <button
                type="button"
                onClick={sendConfirmationToWhatsApp}
                className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
              >
                {/* WhatsApp SVG Icon */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                <span>Kirim Bukti Cepat ke WhatsApp</span>
              </button>

              <p className="text-[11px] text-neutral-500 leading-tight">
                Klik tombol di atas untuk mengirimkan detail pesanan otomatis ke WhatsApp Mas Danu sekalian melampirkan screenshot bukti transfer.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-full border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-all mt-2"
              >
                Selesai &amp; Tutup Jendela
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

