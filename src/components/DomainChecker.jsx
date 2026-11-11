import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, ArrowRight, Globe } from 'lucide-react';

const EXTENSIONS = [
  { ext: '.com', price: 'Rp 145.000/thn', popular: true },
  { ext: '.id', price: 'Rp 225.000/thn', popular: false },
  { ext: '.my.id', price: 'Rp 19.000/thn', popular: true },
  { ext: '.net', price: 'Rp 175.000/thn', popular: false },
];

export default function DomainChecker({ onOpenOrderModal }) {
  const [domainQuery, setDomainQuery] = useState('');
  const [selectedExt, setSelectedExt] = useState('.com');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const cleanName = domainQuery.trim().toLowerCase().replace(/\.[a-z.]+$/, '');
      const fullDomain = `${cleanName}${selectedExt}`;
      const isAvailable = cleanName.length % 2 === 0 || cleanName.length > 5;
      const targetExt = EXTENSIONS.find(e => e.ext === selectedExt);

      setResult({
        domain: fullDomain,
        available: isAvailable,
        price: targetExt ? targetExt.price : 'Rp 145.000/thn'
      });
      setLoading(false);
    }, 500);
  };

  return (
    <section className="py-16 bg-white border-y border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold mb-3">
            <Globe className="w-3.5 h-3.5 text-[#ff5429]" />
            <span>Cek Domain Bisnis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Amankan Alamat Brand &amp; Website Anda
          </h2>
          <p className="text-sm text-neutral-500 mt-1 max-w-lg mx-auto">
            Cek ketersediaan nama domain resmi untuk toko, cafe, atau perusahaan Anda.
          </p>
        </div>

        {/* Domain Search Form - Clean Light Card */}
        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-2 p-2 bg-neutral-50 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="relative flex-1 flex items-center">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4" />
            <input
              type="text"
              value={domainQuery}
              onChange={(e) => setDomainQuery(e.target.value)}
              placeholder="Ketik nama domain (contoh: cafestudio, tokomaju)..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-neutral-900 font-medium text-sm placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedExt}
              onChange={(e) => setSelectedExt(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl border border-neutral-200 text-sm font-bold text-neutral-700 focus:outline-none cursor-pointer"
            >
              {EXTENSIONS.map(item => (
                <option key={item.ext} value={item.ext}>
                  {item.ext}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800 transition-all flex items-center justify-center shrink-0 shadow-sm"
            >
              {loading ? 'Memeriksa...' : 'Cek Domain'}
            </button>
          </div>
        </form>

        {/* Quick extension price pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs">
          {EXTENSIONS.map((item) => (
            <button
              key={item.ext}
              onClick={() => setSelectedExt(item.ext)}
              type="button"
              className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                selectedExt === item.ext
                  ? 'border-neutral-900 bg-neutral-900 text-white font-bold'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
              }`}
            >
              <span>{item.ext}</span>
              <span className={selectedExt === item.ext ? 'text-neutral-300' : 'text-neutral-400'}>
                {item.price}
              </span>
            </button>
          ))}
        </div>

        {/* Domain Search Result Banner */}
        {result && (
          <div className={`mt-6 p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
            result.available
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-rose-50/70 border-rose-200 text-rose-950'
          }`}>
            <div className="flex items-center gap-3">
              {result.available ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <div>
                <span className="font-extrabold text-base">{result.domain}</span>
                <span className="text-xs ml-2 font-medium">
                  {result.available ? `Tersedia! (${result.price})` : 'Sudah dipakai orang lain'}
                </span>
              </div>
            </div>

            {result.available && (
              <button
                onClick={() => onOpenOrderModal({
                  type: 'domain',
                  name: `Domain ${result.domain}`,
                  price: result.price,
                })}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>Daftarkan Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
