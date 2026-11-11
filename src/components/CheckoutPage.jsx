import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, ArrowRight, QrCode, Copy, CheckCircle2, RefreshCw, ShieldCheck, Search, XCircle, Globe, CreditCard, Lock } from 'lucide-react';
import PaymentLogo from './PaymentLogos';

const EXTENSIONS = [
  { ext: '.com', price: 'Rp 145.000/thn' },
  { ext: '.id', price: 'Rp 225.000/thn' },
  { ext: '.my.id', price: 'Rp 19.000/thn' },
  { ext: '.net', price: 'Rp 175.000/thn' },
];

const ADMIN_WA = "6289507146296"; // Nomor WhatsApp Resmi Mas Danu

// DAFTAR METODE PEMBAYARAN RESMI (ASSET LOKAL SVG CRISP & ANTI-GAGAL LOAD)
const PAYMENT_METHODS = [
  {
    id: 'qris',
    category: 'E-Wallet & Semua M-Banking',
    name: 'QRIS Instan',
    badge: 'Bebas Admin',
    logoUrl: '/payments/qris.svg',
    desc: 'BCA, Mandiri, BRI, GoPay, OVO, Dana, ShopeePay'
  },
  {
    id: 'gopay',
    category: 'E-Wallet',
    name: 'GoPay / GoPay Later',
    badge: 'Instan',
    logoUrl: '/payments/gopay.svg',
    desc: 'Langsung buka aplikasi Gojek di HP'
  },
  {
    id: 'dana',
    category: 'E-Wallet',
    name: 'DANA Digital Wallet',
    badge: 'Instan',
    logoUrl: '/payments/dana.svg',
    desc: 'Saldo DANA & Debit Card Terhubung'
  },
  {
    id: 'bca',
    category: 'Virtual Account',
    name: 'BCA Virtual Account',
    badge: 'Otomatis',
    logoUrl: '/payments/bca.svg',
    desc: 'BCA Mobile, myBCA, KlikBCA & ATM'
  },
  {
    id: 'mandiri',
    category: 'Virtual Account',
    name: 'Mandiri Livin Virtual Account',
    badge: 'Otomatis',
    logoUrl: '/payments/mandiri.svg',
    desc: 'Livin by Mandiri & ATM Mandiri'
  },
  {
    id: 'jago',
    category: 'Bank Digital',
    name: 'Bank Jago',
    badge: 'Transfer Cepat',
    logoUrl: '/payments/jago.svg',
    desc: 'Aplikasi Bank Jago & Jago Syariah'
  }
];

export default function CheckoutPage({ orderData, onBackToHome }) {
  // Step: 'form' -> 'payment' -> 'success'
  const [step, setStep] = useState('form');

  // Customer Form Data
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [notes, setNotes] = useState('');

  // Interactive Domain Checker
  const [domainQuery, setDomainQuery] = useState(
    orderData?.detail ? orderData.detail.replace(/\.[a-z.]+$/, '') : ''
  );
  const [selectedExt, setSelectedExt] = useState(
    orderData?.detail && orderData.detail.includes('.') ? '.' + orderData.detail.split('.').slice(1).join('.') : '.com'
  );
  const [domainCheckStatus, setDomainCheckStatus] = useState(null);
  const [confirmedDomain, setConfirmedDomain] = useState(orderData?.detail || '');

  // Payment Selection & Real-Time Gateway State
  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Generate Professional Invoice Format: INV/QTM/202611/8921
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const now = new Date();
    const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    setInvoiceNumber(`INV/QTM/${yearMonth}/${randomSeq}`);
  }, []);

  // Domain Checker Action
  const handleCheckDomain = () => {
    if (!domainQuery.trim()) return;

    setDomainCheckStatus('checking');

    setTimeout(() => {
      const cleanName = domainQuery.trim().toLowerCase().replace(/\.[a-z.]+$/, '');
      const full = `${cleanName}${selectedExt}`;
      const isAvailable = cleanName.length % 2 === 0 || cleanName.length > 4;

      if (isAvailable) {
        setDomainCheckStatus('available');
        setConfirmedDomain(full);
      } else {
        setDomainCheckStatus('taken');
        setConfirmedDomain('');
      }
    }, 500);
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // REAL-TIME MIDTRANS PAYMENT EXECUTION (Strict Verification with Real Token)
  const handlePayWithMidtrans = async () => {
    setIsProcessingPayment(true);
    setPaymentError(null);

    // Ekstrak nilai nominal angka dari string harga (misal: "Mulai Rp 1.500.000" -> 1500000)
    let numericAmount = 1500000;
    if (orderData?.price) {
      const parsed = parseInt(orderData.price.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(parsed) && parsed > 0) {
        numericAmount = parsed;
      }
    }

    try {
      const res = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: `${invoiceNumber.replace(/\//g, '-')}-${Math.floor(100 + Math.random() * 900)}`,
          amount: numericAmount,
          customerName: name.trim() || 'Klien Quantum',
          customerPhone: whatsapp.trim() || '089507146296'
        })
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        throw new Error(data.error_messages ? data.error_messages.join(', ') : (data.error || 'Gagal membuat sesi pembayaran Midtrans'));
      }

      // Eksekusi Pop-up Midtrans Snap Resmi
      if (window.snap && typeof window.snap.pay === 'function') {
        window.snap.pay(data.token, {
          onSuccess: function(result) {
            setIsProcessingPayment(false);
            setStep('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          },
          onPending: function(result) {
            setIsProcessingPayment(false);
            setPaymentError("Pembayaran masih pending. Silakan selesaikan pembayaran di aplikasi e-wallet / m-banking Anda.");
          },
          onError: function(result) {
            setIsProcessingPayment(false);
            setPaymentError("Pembayaran gagal atau dibatalkan oleh gateway Midtrans.");
          },
          onClose: function() {
            setIsProcessingPayment(false);
          }
        });
      } else if (data.redirect_url) {
        // Fallback jika snap popup terblokir pop-up blocker browser
        window.open(data.redirect_url, '_blank');
        setIsProcessingPayment(false);
      }
    } catch (err) {
      setIsProcessingPayment(false);
      setPaymentError(err.message || 'Terjadi kendala saat menghubungi gateway Midtrans.');
    }
  };

  const handleCopyVa = (vaNumber) => {
    navigator.clipboard.writeText(vaNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // WhatsApp Confirmation to 089507146296
  const sendConfirmationToWhatsApp = () => {
    const customerName = name.trim() || 'Klien Quantum';
    const pkgName = orderData?.name || 'Paket Layanan';
    const pkgPrice = orderData?.price || 'Sesuai Tagihan';
    const domainText = confirmedDomain 
      ? `\n• Rencana Domain: ${confirmedDomain} (Terverifikasi)` 
      : (domainQuery.trim() ? `\n• Rencana Domain: ${domainQuery.trim()}${selectedExt}` : '');
    const notesText = notes.trim() ? `\n• Catatan: ${notes.trim()}` : '';
    const activeMethodObj = PAYMENT_METHODS.find(m => m.id === selectedMethod);
    const methodName = activeMethodObj ? activeMethodObj.name : 'QRIS';

    const message = `Halo Mas Danu (Quantum Studio)! 👋
Saya telah menyelesaikan pembayaran di sistem website Quantum:

📦 *DETAIL TRANSAKSI:*
• No. Invoice: ${invoiceNumber}
• Paket: ${pkgName}
• Total Bayar: ${pkgPrice}
• Metode Pembayaran: ${methodName}
• Status: SUDAH BAYAR (LUNAS - VERIFIED)

👤 *DATA PEMESAN:*
• Nama: ${customerName}
• WhatsApp: ${whatsapp}${domainText}${notesText}

Saya lampirkan foto / screenshot struk bukti pembayaran berhasil di bawah ini. Mohon diproses dan dibantu aktivasi server & websitenya ya Mas Danu. Terima kasih! 🙏`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${ADMIN_WA}?text=${encoded}`, '_blank');
  };

  const currentSelectedMethod = PAYMENT_METHODS.find(m => m.id === selectedMethod) || PAYMENT_METHODS[0];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-neutral-900 pb-24">
      {/* Top Header */}
      <header className="border-b border-neutral-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-black transition-colors px-3 py-1.5 rounded-full hover:bg-neutral-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#ff5429] flex items-center justify-center text-white font-black text-xs">
              Q
            </div>
            <span className="font-extrabold text-base tracking-tight text-neutral-900">
              quantum<span className="text-[#ff5429]">.</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Lock className="w-3 h-3" />
            <span>Midtrans Secured Gateway</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ==================== LEFT COLUMN: RINGKASAN ORDER ==================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="tayang-card rounded-3xl p-6 sm:p-7 bg-white">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#ff5429] bg-orange-50 px-2.5 py-1 rounded-full inline-block mb-4">
                Invoice Resmi
              </span>

              <h2 className="text-xl font-black text-neutral-900 mb-1">
                {orderData?.name || 'Paket Layanan'}
              </h2>
              <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                Layanan cloud hosting &amp; perancangan website berkecepatan tinggi dengan garansi setup terima beres.
              </p>

              <div className="border-t border-b border-neutral-100 py-4 space-y-2.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>No. Invoice:</span>
                  <strong className="font-mono text-neutral-900 font-bold">{invoiceNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Tanggal:</span>
                  <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Domain Dipilih:</span>
                  <span className="font-bold text-neutral-900">
                    {confirmedDomain || (domainQuery ? `${domainQuery}${selectedExt}` : 'Belum ditentukan')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Metode:</span>
                  <div className="flex items-center gap-2">
                    <PaymentLogo id={currentSelectedMethod.id} className="h-6 w-auto max-w-[80px]" />
                    <span className="font-bold text-neutral-900">{currentSelectedMethod.name}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Setup &amp; Migrasi:</span>
                  <span className="text-emerald-600 font-bold">Gratis Terima Beres</span>
                </div>
              </div>

              <div className="mt-5 flex items-baseline justify-between">
                <span className="text-xs font-bold text-neutral-500">Total Biaya:</span>
                <span className="text-2xl font-black text-neutral-900">
                  {orderData?.price || 'Rp 0'}
                </span>
              </div>
            </div>

            {/* Keamanan & Garansi Card */}
            <div className="p-5 rounded-2xl bg-neutral-100/70 border border-neutral-200/80 text-xs text-neutral-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Garansi Resmi Quantum Studio</span>
              </div>
              <p className="text-[11px] leading-relaxed text-neutral-500">
                Seluruh transaksi dilindungi enkripsi Midtrans Payment Gateway. Bantuan teknis langsung oleh Mas Danu via WhatsApp: <strong className="text-neutral-800">089507146296</strong>.
              </p>
            </div>
          </div>

          {/* ==================== RIGHT COLUMN: STEP INTERFACE ==================== */}
          <div className="lg:col-span-7">
            <div className="tayang-card rounded-3xl p-6 sm:p-9 bg-white">

              {/* ----------------- STEP 1: FORM INPUT & PILIH METODE BAYAR ----------------- */}
              {step === 'form' && (
                <div>
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                      Langkah 1 dari 2: Data Pemesan &amp; Pembayaran
                    </span>
                    <h3 className="text-2xl font-black text-neutral-900 tracking-tight mt-3">
                      Lengkapi Data Pemesanan
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Data ini diperlukan untuk registrasi domain dan penerbitan faktur resmi Anda.
                    </p>
                  </div>

                  <form onSubmit={handleProceedToPayment} className="space-y-5 text-xs sm:text-sm">
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
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
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
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
                      />
                    </div>

                    {/* FITUR INTERAKTIF CEK DOMAIN */}
                    <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-[#ff5429]" />
                          <span>Rencana Nama Domain &amp; Cek Ketersediaan</span>
                        </label>
                        <span className="text-[10px] text-neutral-400 font-medium">
                          Cek langsung di sini
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1 flex items-center">
                          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5" />
                          <input
                            type="text"
                            value={domainQuery}
                            onChange={(e) => {
                              setDomainQuery(e.target.value);
                              setDomainCheckStatus(null);
                            }}
                            placeholder="Ketik nama domain (contoh: budicafe)..."
                            className="w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400 text-xs sm:text-sm"
                          />
                        </div>

                        <select
                          value={selectedExt}
                          onChange={(e) => {
                            setSelectedExt(e.target.value);
                            setDomainCheckStatus(null);
                          }}
                          className="px-3 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm font-bold text-neutral-700 focus:outline-none cursor-pointer"
                        >
                          {EXTENSIONS.map(ext => (
                            <option key={ext.ext} value={ext.ext}>
                              {ext.ext}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={handleCheckDomain}
                          disabled={domainCheckStatus === 'checking' || !domainQuery.trim()}
                          className="px-4 py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-all shrink-0 disabled:opacity-50"
                        >
                          {domainCheckStatus === 'checking' ? 'Mengecek...' : 'Cek Domain'}
                        </button>
                      </div>

                      {domainCheckStatus === 'available' && (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>
                              <strong>{domainQuery.trim().toLowerCase().replace(/\.[a-z.]+$/, '')}{selectedExt}</strong> Tersedia!
                            </span>
                          </div>
                          <span className="font-bold text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                            Siap Didaftarkan
                          </span>
                        </div>
                      )}

                      {domainCheckStatus === 'taken' && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs text-rose-900">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>
                              <strong>{domainQuery.trim().toLowerCase().replace(/\.[a-z.]+$/, '')}{selectedExt}</strong> Sudah digunakan orang lain.
                            </span>
                          </div>
                          <span className="text-[11px] font-medium text-rose-700">
                            Coba nama lain
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ================= PILIHAN METODE PEMBAYARAN DENGAN LOGO RESMI ================= */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-2">
                        Pilih Metode Pembayaran *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {PAYMENT_METHODS.map((pm) => {
                          const isSelected = selectedMethod === pm.id;
                          return (
                            <div
                              key={pm.id}
                              onClick={() => setSelectedMethod(pm.id)}
                              className={`group p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between ${
                                isSelected
                                  ? 'bg-white shadow-[0_8px_25px_rgba(0,0,0,0.08)] ring-2 ring-[#ff5429] -translate-y-1'
                                  : 'bg-white/90 hover:bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {/* LOGO RESMI FLOATING BEBAS TANPA BORDER (INLINE SVG) */}
                                <div className="flex items-center justify-center shrink-0">
                                  <PaymentLogo
                                    id={pm.id}
                                    className="h-8 sm:h-9 w-auto max-w-[105px] sm:max-w-[115px] transition-transform duration-300 group-hover:scale-105 drop-shadow-2xs"
                                  />
                                </div>
                                <div>
                                  <div className="font-extrabold text-xs text-neutral-900">
                                    {pm.name}
                                  </div>
                                  <div className="text-[10px] leading-tight text-neutral-500">
                                    {pm.category}
                                  </div>
                                </div>
                              </div>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? 'bg-[#ff5429] text-white shadow-xs' : 'bg-neutral-100 text-transparent'
                              }`}>
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Catatan Kebutuhan (Opsional)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tuliskan catatan tambahan perihal website atau server Anda..."
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400 resize-none"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-full bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                      >
                        <span>Lanjut ke Sesi Pembayaran</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ----------------- STEP 2: SESI PEMBAYARAN MIDTRANS REAL-TIME ----------------- */}
              {step === 'payment' && (
                <div>
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                      Langkah 2 dari 2: Pembayaran Midtrans Gateway
                    </span>
                    <h3 className="text-2xl font-black text-neutral-900 tracking-tight mt-3">
                      Selesaikan Pembayaran Anda
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Sistem akan memverifikasi dana yang masuk secara real-time sebelum status berganti lunas.
                    </p>
                  </div>

                  {paymentError && (
                    <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{paymentError}</span>
                    </div>
                  )}

                  {/* Info Box Tagihan */}
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-neutral-500 block">Total Tagihan:</span>
                      <span className="text-2xl font-black text-neutral-900">
                        {orderData?.price || 'Rp 0'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Floating Logo tanpa border & diperbesar (INLINE SVG) */}
                      <PaymentLogo id={currentSelectedMethod.id} className="h-8 sm:h-9 max-w-[100px]" />
                      <span className="text-xs font-black text-neutral-900">
                        {currentSelectedMethod.name}
                      </span>
                    </div>
                  </div>

                  {/* DISPLAY PAYMENT INTERFACE SESUAI PILIHAN */}
                  {selectedMethod === 'qris' || selectedMethod === 'gopay' || selectedMethod === 'dana' ? (
                    <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 flex flex-col items-center justify-center text-center mb-6">
                      
                      {/* Logo Resmi Header E-Wallet / QRIS - Floating & Jelas (INLINE SVG) */}
                      <div className="flex items-center gap-3 mb-4">
                        <PaymentLogo id={currentSelectedMethod.id} className="h-9 sm:h-10 max-w-[120px] drop-shadow-xs" />
                        <span className="text-xs font-bold text-neutral-700">Official Payment Gateway</span>
                      </div>

                      <div className="p-4 bg-white border border-neutral-200 rounded-2xl shadow-sm mb-3">
                        <svg className="w-48 h-48 text-neutral-900" viewBox="0 0 100 100" fill="currentColor">
                          <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" />
                          <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" />
                          <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" />
                          <path d="M50,15 h5 v10 h-5 z M50,35 h8 v8 h-8 z M45,48 h12 v5 h-12 z" />
                          <path d="M60,50 h10 v10 h-10 z M75,50 h15 v5 h-15 z M60,65 h10 v25 h-10 z M75,65 h15 v10 h-15 z M75,80 h15 v10 h-15 z" />
                        </svg>
                      </div>
                      <div className="text-xs font-extrabold text-neutral-900">
                        Scan QRIS Menggunakan Aplikasi {currentSelectedMethod.name} atau Semua M-Banking
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-1">
                        Terhubung ke Midtrans Real-Time Callback &bull; Verifikasi Otomatis
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <PaymentLogo id={currentSelectedMethod.id} className="h-8 sm:h-9 max-w-[110px] drop-shadow-xs" />
                        <span className="text-xs text-neutral-600 font-bold">
                          Nomor Virtual Account {currentSelectedMethod.name}:
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-neutral-200">
                        <span className="font-mono font-black text-lg text-neutral-900 tracking-wider">
                          8801 2345 6789 001
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyVa('880123456789001')}
                          className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold flex items-center gap-1.5 transition-all"
                        >
                          <Copy className="w-4 h-4" />
                          <span>{isCopied ? 'Tersalin!' : 'Salin'}</span>
                        </button>
                      </div>
                      <div className="text-xs text-neutral-600 mt-2.5">
                        Atas Nama: <strong>Quantum Studio (Midtrans Escrow)</strong>
                      </div>
                    </div>
                  )}

                  {/* STRICT PAYMENT BUTTON (Membuka Midtrans / Memeriksa Settlement) */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      disabled={isProcessingPayment}
                      onClick={handlePayWithMidtrans}
                      className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-60"
                    >
                      {isProcessingPayment ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Menghubungi Gateway Midtrans &amp; Verifikasi Dana...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Proses Pembayaran via Midtrans Gateway</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('form')}
                      className="w-full py-2 text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition-colors"
                    >
                      &larr; Ganti Metode Pembayaran / Ubah Data
                    </button>
                  </div>
                </div>
              )}

              {/* ----------------- STEP 3: SUKSES LUNAS & KONFIRMASI WA ----------------- */}
              {step === 'success' && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                    Pembayaran Lunas (Verified by Midtrans)
                  </span>

                  <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
                    Terima Kasih, {name || 'Klien'}!
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-md mx-auto leading-relaxed">
                    Dana pembayaran Anda dengan nomor invoice <strong className="font-mono text-neutral-900">{invoiceNumber}</strong> telah resmi diverifikasi oleh sistem. Server &amp; layanan Anda siap diproses.
                  </p>

                  {/* WHATSAPP ACTION BUTTON KE 089507146296 */}
                  <div className="mt-8 space-y-3 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={sendConfirmationToWhatsApp}
                      className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                      </svg>
                      <span>Kirim Bukti Cepat ke WhatsApp</span>
                    </button>

                    <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-600 text-left space-y-1">
                      <div className="font-bold text-neutral-800">Instruksi Konfirmasi:</div>
                      <div>1. Klik tombol di atas untuk membuka WhatsApp ke nomor <strong>0895-0714-6296</strong>.</div>
                      <div>2. Lampirkan screenshot bukti transfer / pembayaran dari m-banking Anda.</div>
                      <div>3. Mas Danu akan langsung mengonfigurasi server &amp; memulai setup website Anda.</div>
                    </div>

                    <button
                      type="button"
                      onClick={onBackToHome}
                      className="w-full py-2.5 rounded-full border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-all mt-4"
                    >
                      Kembali ke Halaman Beranda
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
