import React, { useState } from 'react';
import { 
  X, Check, Lock, Sparkles, ShieldCheck, Zap, Key, 
  CreditCard, ArrowRight, RefreshCw, AlertCircle, CheckCircle2 
} from 'lucide-react';
import PaymentLogo from '../PaymentLogos';

export default function LicenseActivationModal({ isOpen, onClose, onActivateSuccess }) {
  const [activeTab, setActiveTab] = useState('buy'); // 'buy' or 'key'
  const [selectedPlan, setSelectedPlan] = useState('pro_monthly'); // 'pro_monthly' or 'pro_lifetime'
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [activationError, setActivationError] = useState(null);
  const [activationSuccess, setActivationSuccess] = useState(false);

  // Form Pembelian Baru
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('qris');

  if (!isOpen) return null;

  const handleVerifyKey = (e) => {
    e.preventDefault();
    if (!licenseKeyInput.trim()) {
      setActivationError('Silakan masukkan nomor kunci lisensi Anda.');
      return;
    }

    setIsActivating(true);
    setActivationError(null);

    // Simulasi verifikasi serial key lokal / API
    setTimeout(() => {
      setIsActivating(false);
      if (licenseKeyInput.trim().toUpperCase().startsWith('QTM-PRO-')) {
        setActivationSuccess(true);
        if (onActivateSuccess) onActivateSuccess(licenseKeyInput.trim().toUpperCase());
      } else {
        setActivationError('Kunci lisensi tidak valid atau telah kedaluwarsa. Format resmi: QTM-PRO-XXXX-XXXX');
      }
    }, 1200);
  };

  const handleBuyInApp = async (e) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim()) {
      setActivationError('Lengkapi Nama dan Nomor WhatsApp aktif Anda.');
      return;
    }

    setIsActivating(true);
    setActivationError(null);

    const amount = selectedPlan === 'pro_monthly' ? 149000 : 799000;
    const planName = selectedPlan === 'pro_monthly' ? 'Quantum Studio Pro (1 Bulan)' : 'Quantum Studio Lifetime Pro';

    try {
      const res = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: `LIC-${Date.now()}`,
          amount: amount,
          customerName: buyerName.trim(),
          customerPhone: buyerPhone.trim(),
          method: selectedMethod
        })
      });

      const data = await res.json();
      if (!res.ok || !data.token) {
        throw new Error(data.error || 'Gagal memulai transaksi Midtrans.');
      }

      // Buka Snap Pembayaran
      if (window.snap && typeof window.snap.pay === 'function') {
        window.snap.pay(data.token, {
          onSuccess: function(result) {
            setIsActivating(false);
            setActivationSuccess(true);
            if (onActivateSuccess) onActivateSuccess(`QTM-PRO-${Date.now().toString(36).toUpperCase()}`);
          },
          onPending: function() {
            setIsActivating(false);
            setActivationError('Pembayaran berstatus pending. Selesaikan via m-banking/e-wallet Anda.');
          },
          onError: function() {
            setIsActivating(false);
            setActivationError('Pembayaran dibatalkan atau gateway gagal.');
          },
          onClose: function() {
            setIsActivating(false);
          }
        });
      } else if (data.redirect_url) {
        window.open(data.redirect_url, '_blank');
        setIsActivating(false);
      }
    } catch (err) {
      setIsActivating(false);
      setActivationError(err.message || 'Kendala koneksi ke server lisensi.');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-neutral-200 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-50 text-[#ff5429] text-[10px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            In-App License Store
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
            Aktivasi Lisensi Quantum Studio
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Buka kemampuan Cloud GPU render, agen AI spesialis, dan fitur kolaborasi tim langsung di software Anda.
          </p>
        </div>

        {activationSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-neutral-900">
              Lisensi Pro Berhasil Diaktifkan!
            </h4>
            <p className="text-xs text-neutral-600 max-w-xs mx-auto">
              Seluruh fitur premium Quantum Studio telah terbuka. Selamat berkarya dengan kecepatan penuh!
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-all cursor-pointer"
            >
              Mulai Gunakan Studio Pro
            </button>
          </div>
        ) : (
          <div>
            {/* Tabs Switcher: Beli Baru vs Masukkan Key */}
            <div className="flex rounded-xl bg-neutral-100 p-1 mb-5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('buy')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'buy' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500'
                }`}
              >
                1. Beli Lisensi In-App
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('key')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'key' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500'
                }`}
              >
                2. Input Serial Key
              </button>
            </div>

            {/* TAB 1: FORM PEMBELIAN BARU VIA MIDTRANS */}
            {activeTab === 'buy' && (
              <form onSubmit={handleBuyInApp} className="space-y-4 text-xs">
                
                {/* Plan Choices */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setSelectedPlan('pro_monthly')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedPlan === 'pro_monthly'
                        ? 'border-[#ff5429] bg-orange-50/20'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-neutral-500 uppercase block">Langganan 1 Bulan</span>
                    <strong className="text-sm font-black text-neutral-900 block mt-0.5">Rp 149.000</strong>
                    <span className="text-[10px] text-neutral-400">Cloud render &amp; update</span>
                  </div>

                  <div
                    onClick={() => setSelectedPlan('pro_lifetime')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden ${
                      selectedPlan === 'pro_lifetime'
                        ? 'border-[#ff5429] bg-orange-50/20'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div className="absolute top-0 right-0 bg-[#ff5429] text-white text-[8px] font-black px-1.5 py-0.2 rounded-bl">HEMAT</div>
                    <span className="text-[10px] font-bold text-[#ff5429] uppercase block">Lifetime Pass</span>
                    <strong className="text-sm font-black text-neutral-900 block mt-0.5">Rp 799.000</strong>
                    <span className="text-[10px] text-neutral-400">Bayar 1x aktif selamanya</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Nama Pemilik Lisensi *</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Contoh: Danu Hadiana"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="Contoh: 089507146296"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium focus:outline-none"
                  />
                </div>

                {/* Pilihan Metode Bayar Cepat */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1.5">Metode Pembayaran (Midtrans):</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'qris', name: 'QRIS Instan' },
                      { id: 'gopay', name: 'GoPay' },
                      { id: 'bca', name: 'BCA VA' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMethod(m.id)}
                        className={`p-2 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          selectedMethod === m.id
                            ? 'border-[#ff5429] bg-white ring-2 ring-[#ff5429]/20 text-neutral-900 shadow-2xs'
                            : 'border-neutral-200 bg-neutral-50/60 text-neutral-500'
                        }`}
                      >
                        <PaymentLogo id={m.id} className="h-5 w-auto max-w-[55px]" />
                        <span>{m.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {activationError && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{activationError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isActivating}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  {isActivating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Menghubungi Midtrans...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Bayar Sekarang via {selectedMethod.toUpperCase()} →</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: INPUT SERIAL KEY LISENSI */}
            {activeTab === 'key' && (
              <form onSubmit={handleVerifyKey} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    Masukkan Serial Key Lisensi
                  </label>
                  <input
                    type="text"
                    value={licenseKeyInput}
                    onChange={(e) => setLicenseKeyInput(e.target.value)}
                    placeholder="QTM-PRO-XXXX-XXXX-XXXX"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl font-mono text-sm tracking-wider uppercase text-neutral-900 focus:outline-none focus:border-neutral-400"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Serial key dikirimkan ke email atau WhatsApp Anda setelah menyelesaikan pembayaran.
                  </p>
                </div>

                {activationError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-[11px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{activationError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isActivating}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  {isActivating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Memverifikasi Kunci...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-3.5 h-3.5 text-neutral-300" />
                      <span>Verifikasi &amp; Buka Lisensi Pro</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-center gap-2 text-[10px] text-neutral-400">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Transaksi Resmi Dilindungi Midtrans Gateway &amp; Enkripsi SSL</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
