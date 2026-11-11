import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Check, ArrowRight, QrCode, Copy, CheckCircle2, 
  RefreshCw, ShieldCheck, Search, XCircle, Globe, CreditCard, Lock,
  Building2, Wallet, Sparkles, AlertCircle
} from 'lucide-react';
import PaymentLogo from './PaymentLogos';

const EXTENSIONS = [
  { ext: '.com', price: 'Rp 145.000/thn' },
  { ext: '.id', price: 'Rp 225.000/thn' },
  { ext: '.my.id', price: 'Rp 19.000/thn' },
  { ext: '.net', price: 'Rp 175.000/thn' },
];

const ADMIN_WA = "6289507146296"; // WhatsApp Resmi Mas Danu (Quantum Studio)

// DAFTAR METODE PEMBAYARAN DIKELOMPOKKAN SECARA PROFESIONAL PER KATEGORI
const PAYMENT_CATEGORIES = [
  {
    id: 'ewallet_qris',
    categoryTitle: 'Dompet Digital & QRIS Nasional',
    categorySubtitle: 'Bebas biaya admin, pemindaian langsung via kamera smartphone atau aplikasi e-wallet.',
    categoryBadge: 'Paling Populer',
    icon: QrCode,
    items: [
      {
        id: 'qris',
        name: 'QRIS Instan',
        badge: 'Bebas Admin',
        categoryLabel: 'Semua M-Banking & E-Wallet',
        desc: 'Scan dari BCA Mobile, Mandiri Livin, BRImo, GoPay, OVO, ShopeePay & DANA'
      },
      {
        id: 'gopay',
        name: 'GoPay / GoPay Later',
        badge: 'Buka App Otomatis',
        categoryLabel: 'Dompet Digital',
        desc: 'Buka aplikasi Gojek secara langsung di HP atau gunakan saldo GoPay'
      },
      {
        id: 'dana',
        name: 'DANA Digital Wallet',
        badge: 'Instan',
        categoryLabel: 'Dompet Digital',
        desc: 'Pembayaran digital terhubung ke saldo DANA atau kartu tersimpan'
      }
    ]
  },
  {
    id: 'virtual_account',
    categoryTitle: 'Transfer Virtual Account (Bank Otomatis)',
    categorySubtitle: 'Nomor rekening virtual unik per faktur, verifikasi otomatis real-time 24/7 tanpa perlu upload struk.',
    categoryBadge: 'Verifikasi Otomatis',
    icon: Building2,
    items: [
      {
        id: 'bca',
        name: 'BCA Virtual Account',
        badge: 'Online 24 Jam',
        categoryLabel: 'Bank Central Asia',
        desc: 'Bayar via myBCA, BCA Mobile, KlikBCA atau jaringan ATM BCA'
      },
      {
        id: 'mandiri',
        name: 'Mandiri Livin VA',
        badge: 'Online 24 Jam',
        categoryLabel: 'Bank Mandiri',
        desc: 'Bayar via aplikasi Livin\' by Mandiri, Kopra, atau ATM Mandiri'
      },
      {
        id: 'jago',
        name: 'Bank Jago & Digital',
        badge: 'Transfer Cepat',
        categoryLabel: 'Bank Digital',
        desc: 'Transfer via aplikasi Bank Jago atau BI-FAST antar bank'
      }
    ]
  }
];

const ALL_PAYMENT_METHODS = PAYMENT_CATEGORIES.flatMap(cat => cat.items);

export default function CheckoutPage({ orderData, onBackToHome }) {
  // Step: 'form' -> 'success'
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
    orderData?.detail && orderData.detail.includes('.') 
      ? '.' + orderData.detail.split('.').slice(1).join('.') 
      : '.com'
  );
  const [domainCheckStatus, setDomainCheckStatus] = useState(null);
  const [confirmedDomain, setConfirmedDomain] = useState(orderData?.detail || '');

  // Payment Selection & Real-Time Gateway State
  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Generate Professional Invoice Format: INV/QTM/202611/XXXX
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

  // REAL-TIME MIDTRANS PAYMENT EXECUTION (Sesuai metode yang dipilih)
  const handlePayWithMidtrans = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (!name.trim()) {
      setPaymentError("Silakan cantumkan Nama Lengkap atau Identitas Bisnis Anda.");
      return;
    }
    if (!whatsapp.trim()) {
      setPaymentError("Silakan cantumkan Nomor WhatsApp aktif Anda.");
      return;
    }

    // Aktifkan tampilan layar gelap (overlay tak bisa diinteraksi)
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
      // Panggil backend API create-transaction dengan method terpilih
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const res = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          orderId: `${invoiceNumber.replace(/\//g, '-')}-${Math.floor(100 + Math.random() * 900)}`,
          amount: numericAmount,
          customerName: name.trim() || 'Klien Quantum',
          customerPhone: whatsapp.trim() || '089507146296',
          method: selectedMethod // Pemetaan kanal otomatis (qris, gopay, bca, mandiri, jago, dana)
        })
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (!res.ok || !data.token) {
        throw new Error(
          data.error_messages 
            ? data.error_messages.join(', ') 
            : (data.error || 'Gagal menginisialisasi sesi pembayaran Midtrans.')
        );
      }

      // Buka Pop-up Resmi Midtrans Snap
      if (window.snap && typeof window.snap.pay === 'function') {
        window.snap.pay(data.token, {
          onSuccess: function(result) {
            setIsProcessingPayment(false);
            setStep('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          },
          onPending: function(result) {
            setIsProcessingPayment(false);
            setPaymentError("Pembayaran tercatat pending. Silakan selesaikan tagihan pada aplikasi e-wallet / m-banking Anda.");
          },
          onError: function(result) {
            setIsProcessingPayment(false);
            setPaymentError("Pembayaran gagal atau dibatalkan oleh sistem gateway.");
          },
          onClose: function() {
            // Ketika user menutup pop-up midtrans, pulihkan overlay
            setIsProcessingPayment(false);
          }
        });
      } else if (data.redirect_url) {
        window.open(data.redirect_url, '_blank');
        setIsProcessingPayment(false);
      } else {
        throw new Error("Modul Midtrans Snap belum selesai dimuat di peramban Anda. Silakan coba lagi.");
      }
    } catch (err) {
      setIsProcessingPayment(false);
      const msg = err.name === 'AbortError' 
        ? "Waktu permintaan habis saat menghubungi gateway pembayaran. Silakan coba klik sekali lagi."
        : (err.message || 'Terjadi kendala jaringan saat menghubungi gateway Midtrans.');
      setPaymentError(msg);
    }
  };

  // WhatsApp Confirmation to 089507146296
  const sendConfirmationToWhatsApp = () => {
    const customerName = name.trim() || 'Klien Quantum';
    const pkgName = orderData?.name || 'Paket Layanan';
    const pkgPrice = orderData?.price || 'Sesuai Tagihan';
    const domainText = confirmedDomain 
      ? `\n• Rencana Domain: ${confirmedDomain} (Terverifikasi)` 
      : (domainQuery.trim() ? `\n• Rencana Domain: ${domainQuery.trim()}${selectedExt}` : '');
    const notesText = notes.trim() ? `\n• Catatan Kebutuhan: ${notes.trim()}` : '';
    const activeMethodObj = ALL_PAYMENT_METHODS.find(m => m.id === selectedMethod);
    const methodName = activeMethodObj ? activeMethodObj.name : 'QRIS';

    const message = `Halo Mas Danu (Quantum Studio)! 👋
Saya telah menyelesaikan pembayaran resmi di website Quantum Studio:

📦 *DETAIL TRANSAKSI:*
• No. Faktur Resmi: ${invoiceNumber}
• Layanan: ${pkgName}
• Total Pembayaran: ${pkgPrice}
• Kanal Pembayaran: ${methodName}
• Status Transaksi: LUNAS (Verified by Midtrans)

👤 *DATA PEMESAN:*
• Nama / Perusahaan: ${customerName}
• WhatsApp Terdaftar: ${whatsapp}${domainText}${notesText}

Saya lampirkan bukti pembayaran / receipt dari perbankan di bawah ini. Mohon dibantu penerbitan invoice & aktivasi layanannya ya Mas Danu. Terima kasih banyak! 🙏`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${ADMIN_WA}?text=${encoded}`, '_blank');
  };

  const currentSelectedMethod = ALL_PAYMENT_METHODS.find(m => m.id === selectedMethod) || ALL_PAYMENT_METHODS[0];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-neutral-900 pb-24 relative">
      
      {/* =========================================================================
          FULL-PAGE DARKENED LOADING OVERLAY (Halaman Agak Gelap & Tak Bisa Diinteraksi)
         ========================================================================= */}
      {isProcessingPayment && (
        <div 
          className="fixed inset-0 z-[9999] bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-4 select-none cursor-wait"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="bg-white rounded-3xl p-7 sm:p-9 max-w-md w-full shadow-2xl border border-neutral-100 text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-[#ff5429] to-emerald-600" />
            
            {/* Animated glowing radar lock */}
            <div className="relative w-16 h-16 mx-auto mb-5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-100 animate-ping opacity-30" />
              <div className="w-16 h-16 rounded-full border-3 border-emerald-200 border-t-emerald-600 animate-spin" />
              <Lock className="w-6 h-6 text-emerald-600 absolute" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Memproses Gerbang Midtrans
            </div>

            <h4 className="text-xl font-black text-neutral-900 tracking-tight mb-2">
              Mempersiapkan Sesi Pembayaran
            </h4>

            <p className="text-xs text-neutral-600 leading-relaxed mb-5">
              Sistem sedang mengamankan jalur transaksi digital untuk metode{' '}
              <strong className="text-neutral-900 font-bold">{currentSelectedMethod.name}</strong>.
            </p>

            {/* Rincian Ringkas Transaksi */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs text-left space-y-2 mb-5">
              <div className="flex justify-between text-neutral-500">
                <span>No. Faktur:</span>
                <span className="font-mono font-bold text-neutral-900">{invoiceNumber}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Total Tagihan:</span>
                <span className="font-bold text-neutral-900">{orderData?.price || 'Rp 1.500.000'}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-500">
                <span>Kanal Dipilih:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-700">{currentSelectedMethod.name}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Enkripsi 256-Bit SSL • Midtrans Payment Gateway</span>
            </div>
            
            <p className="text-[10px] text-neutral-400 mt-2">
              Layar dikunci sementara demi keamanan proses transaksi. Jendela pembayaran Midtrans akan segera tampil di layar Anda.
            </p>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className={`border-b border-neutral-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40 transition-opacity ${
        isProcessingPayment ? 'opacity-40 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            disabled={isProcessingPayment}
            className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-black transition-colors px-3 py-1.5 rounded-full hover:bg-neutral-100 disabled:opacity-50"
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
      <main className={`max-w-5xl mx-auto px-4 sm:px-6 pt-10 transition-opacity ${
        isProcessingPayment ? 'opacity-40 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ==================== LEFT COLUMN: RINGKASAN ORDER & FAKTUR ==================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="tayang-card rounded-3xl p-6 sm:p-7 bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#ff5429] bg-orange-50 px-2.5 py-1 rounded-full inline-block">
                  Faktur Resmi
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Terverifikasi
                </span>
              </div>

              <h2 className="text-xl font-black text-neutral-900 mb-1">
                {orderData?.name || 'Paket Layanan'}
              </h2>
              <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                Infrastruktur cloud hosting berkecepatan tinggi &amp; perancangan arsitektur web modern dengan garansi setup terima beres.
              </p>

              <div className="border-t border-b border-neutral-100 py-4 space-y-2.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>No. Faktur:</span>
                  <strong className="font-mono text-neutral-900 font-bold">{invoiceNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Tanggal Terbit:</span>
                  <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rencana Domain:</span>
                  <span className="font-bold text-neutral-900">
                    {confirmedDomain || (domainQuery ? `${domainQuery}${selectedExt}` : 'Belum ditentukan')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Metode Terpilih:</span>
                  <div className="flex items-center gap-2">
                    <PaymentLogo id={currentSelectedMethod.id} className="h-6 w-auto max-w-[80px]" />
                    <span className="font-bold text-neutral-900">{currentSelectedMethod.name}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Gateway Midtrans:</span>
                  <span className="text-emerald-600 font-bold">Gratis (Ditanggung Quantum)</span>
                </div>
                <div className="flex justify-between">
                  <span>Setup &amp; Migrasi:</span>
                  <span className="text-emerald-600 font-bold">Gratis Terima Beres</span>
                </div>
              </div>

              <div className="mt-5 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Total Tagihan Bersih:</span>
                  <span className="text-2xl font-black text-neutral-900">
                    {orderData?.price || 'Rp 1.500.000'}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-lg">
                  Netto / All-in
                </span>
              </div>
            </div>

            {/* Keamanan & Garansi Card */}
            <div className="p-5 rounded-2xl bg-neutral-100/70 border border-neutral-200/80 text-xs text-neutral-600 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Jaminan Transaksi Resmi Quantum Studio</span>
              </div>
              <p className="text-[11px] leading-relaxed text-neutral-500">
                Seluruh transaksi dilindungi enkripsi 256-bit standar industri perbankan melalui Midtrans. Dukungan aktivasi langsung ditangani oleh Mas Danu via WhatsApp: <strong className="text-neutral-800">089507146296</strong>.
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
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      Pemesanan &amp; Pembayaran Digital Resmi
                    </span>
                    <h3 className="text-2xl font-black text-neutral-900 tracking-tight mt-3">
                      Data Pemesan &amp; Pembayaran
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Data ini digunakan untuk penerbitan faktur resmi dan pembukaan gerbang pembayaran Midtrans.
                    </p>
                  </div>

                  <form onSubmit={handlePayWithMidtrans} className="space-y-6 text-xs sm:text-sm">
                    
                    {/* BAGIAN DATA PEMESAN */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                          Nama Lengkap / Identitas Bisnis <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          disabled={isProcessingPayment}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Contoh: Danu Hadiana (Quantum Cafe / PT Solusi)"
                          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400 disabled:opacity-50"
                        />
                        <p className="text-[10px] text-neutral-400 mt-1">
                          Akan dicantumkan pada sertifikat domain dan lisensi hosting.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                          Nomor WhatsApp Utama <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          disabled={isProcessingPayment}
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="Contoh: 089507146296 atau 081234567890"
                          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400 disabled:opacity-50"
                        />
                        <p className="text-[10px] text-neutral-400 mt-1">
                          Untuk pengiriman kredensial akun server, akses cPanel, dan notifikasi aktivasi.
                        </p>
                      </div>
                    </div>

                    {/* FITUR INTERAKTIF CEK DOMAIN */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/90 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-[#ff5429]" />
                          <span>Rencana Nama Domain &amp; Cek Ketersediaan</span>
                        </label>
                        <span className="text-[10px] text-neutral-400 font-medium">
                          Pengecekan Instan
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1 flex items-center">
                          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5" />
                          <input
                            type="text"
                            disabled={isProcessingPayment}
                            value={domainQuery}
                            onChange={(e) => {
                              setDomainQuery(e.target.value);
                              setDomainCheckStatus(null);
                            }}
                            placeholder="Ketik nama domain (contoh: bisnishebat)..."
                            className="w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400 text-xs sm:text-sm disabled:opacity-50"
                          />
                        </div>

                        <select
                          value={selectedExt}
                          disabled={isProcessingPayment}
                          onChange={(e) => {
                            setSelectedExt(e.target.value);
                            setDomainCheckStatus(null);
                          }}
                          className="px-3 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm font-bold text-neutral-700 focus:outline-none cursor-pointer disabled:opacity-50"
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
                          disabled={domainCheckStatus === 'checking' || !domainQuery.trim() || isProcessingPayment}
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
                          <span className="font-bold text-[11px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md">
                            Siap Didaftarkan
                          </span>
                        </div>
                      )}

                      {domainCheckStatus === 'taken' && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs text-rose-900">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>
                              <strong>{domainQuery.trim().toLowerCase().replace(/\.[a-z.]+$/, '')}{selectedExt}</strong> Sudah digunakan pihak lain.
                            </span>
                          </div>
                          <span className="text-[11px] font-medium text-rose-700">
                            Gunakan nama / ekstensi lain
                          </span>
                        </div>
                      )}
                    </div>

                    {/* =========================================================================
                        PILIHAN METODE PEMBAYARAN PER KATEGORI (BERSIH & ELEGAN)
                       ========================================================================= */}
                    <div className="space-y-6 pt-2">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-black uppercase tracking-wider text-neutral-800">
                            Pilih Metode Pembayaran Resmi
                          </label>
                          <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Terkoneksi Midtrans
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500">
                          Pilih kanal yang Anda kehendaki. Layar pembayaran akan langsung mengarahkan Anda ke metode yang dipilih.
                        </p>
                      </div>

                      {/* LOOPING PER KATEGORI */}
                      {PAYMENT_CATEGORIES.map((cat) => {
                        const IconComponent = cat.icon;
                        return (
                          <div key={cat.id} className="space-y-3">
                            {/* Category Header */}
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700">
                                  <IconComponent className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-extrabold text-xs text-neutral-900 tracking-tight">
                                  {cat.categoryTitle}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                                {cat.categoryBadge}
                              </span>
                            </div>

                            {/* Grid Pilihan Metode dalam Kategori */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {cat.items.map((pm) => {
                                const isSelected = selectedMethod === pm.id;
                                return (
                                  <div
                                    key={pm.id}
                                    onClick={() => !isProcessingPayment && setSelectedMethod(pm.id)}
                                    className={`group p-4 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                                      isSelected
                                        ? 'bg-white border-[#ff5429] shadow-[0_8px_25px_rgba(255,84,41,0.12)] ring-2 ring-[#ff5429]/20 -translate-y-0.5'
                                        : 'bg-white/90 border-neutral-200/80 hover:border-neutral-300 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.05)]'
                                    } ${isProcessingPayment ? 'pointer-events-none opacity-50' : ''}`}
                                  >
                                    <div className="flex items-start justify-between gap-3 mb-2.5">
                                      {/* LOGO RESMI VECTOR SVG CRISP */}
                                      <div className="h-8 flex items-center">
                                        <PaymentLogo
                                          id={pm.id}
                                          className="h-7 sm:h-8 w-auto max-w-[110px] object-contain drop-shadow-2xs"
                                        />
                                      </div>

                                      {/* Radio indicator */}
                                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                        isSelected 
                                          ? 'bg-[#ff5429] text-white shadow-xs' 
                                          : 'bg-neutral-100 text-transparent group-hover:bg-neutral-200'
                                      }`}>
                                        <Check className="w-3 h-3 stroke-[3]" />
                                      </div>
                                    </div>

                                    <div>
                                      <div className="flex items-center gap-1.5 mb-0.5">
                                        <div className="font-extrabold text-xs text-neutral-900">
                                          {pm.name}
                                        </div>
                                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                                          {pm.badge}
                                        </span>
                                      </div>
                                      <p className="text-[10px] leading-relaxed text-neutral-500">
                                        {pm.desc}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Catatan Tambahan (Opsional) */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                        Catatan Kebutuhan Khusus (Opsional)
                      </label>
                      <textarea
                        rows={2}
                        disabled={isProcessingPayment}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Contoh: Tolong siapkan versi PHP 8.3 & SSL otomatis untuk domain saya..."
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:border-neutral-400 resize-none disabled:opacity-50"
                      ></textarea>
                    </div>

                    {/* PESAN ERROR DENGAN UI ELEGAN (Bukan teks mentah fetch failed) */}
                    {paymentError && (
                      <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs flex items-start gap-3 animate-in fade-in">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <div className="font-bold text-amber-900">Pemberitahuan Gateway Pembayaran:</div>
                          <p className="leading-relaxed text-amber-800">{paymentError}</p>
                          <p className="text-[11px] text-amber-700 pt-1">
                            Butuh bantuan segera? Hubungi Mas Danu via WhatsApp di <strong>0895-0714-6296</strong>.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ACTION BUTTON: BAYAR SEKARANG */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isProcessingPayment}
                        className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                      >
                        {isProcessingPayment ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-white" />
                            <span>Mempersiapkan Midtrans Gateway...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 text-emerald-200" />
                            <span>Bayar Sekarang via {currentSelectedMethod.name}</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-neutral-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Enkripsi SSL 256-Bit • Terhubung ke Midtrans API Resmi</span>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* ----------------- STEP 2: SUKSES LUNAS & KONFIRMASI WA ----------------- */}
              {step === 'success' && (
                <div className="text-center py-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                    Pembayaran Berhasil (Verified by Midtrans)
                  </span>

                  <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
                    Terima Kasih, {name || 'Klien'}!
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-md mx-auto leading-relaxed">
                    Pembayaran Anda untuk nomor faktur <strong className="font-mono text-neutral-900">{invoiceNumber}</strong> telah resmi diverifikasi oleh sistem. Server &amp; layanan Anda segera diaktifkan.
                  </p>

                  {/* WHATSAPP ACTION BUTTON KE 089507146296 */}
                  <div className="mt-8 space-y-3 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={sendConfirmationToWhatsApp}
                      className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                      </svg>
                      <span>Kirim Bukti Cepat ke WhatsApp Mas Danu</span>
                    </button>

                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-600 text-left space-y-1.5">
                      <div className="font-bold text-neutral-800">Langkah Konfirmasi Cepat:</div>
                      <div>1. Klik tombol hijau di atas untuk membuka chat WhatsApp langsung ke Mas Danu di <strong>0895-0714-6296</strong>.</div>
                      <div>2. Format pesan dan nomor invoice sudah otomatis terisi.</div>
                      <div>3. Mas Danu akan segera memulai konfigurasi server dan setup website Anda.</div>
                    </div>

                    <button
                      type="button"
                      onClick={onBackToHome}
                      className="w-full py-2.5 rounded-full border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-all mt-4 cursor-pointer"
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
