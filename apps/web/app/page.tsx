'use client';

import Link from 'next/link';
import { useBrand } from '@/lib/contexts/BrandContext';

function FoliXxLogo() {
  return (
    <div className="flex flex-col items-center gap-2 pointer-events-none z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-[1px] h-[120px] bg-gradient-to-b from-transparent via-[rgba(212,160,23,0.4)] to-transparent max-md:w-[80px] max-md:h-[1px] max-md:bg-gradient-to-r" />
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg font-extrabold text-[#1A1614] shadow-lg max-md:w-10 max-md:h-10 max-md:text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        F
      </div>
      <div className="w-[1px] h-[120px] bg-gradient-to-b from-transparent via-[rgba(212,160,23,0.4)] to-transparent max-md:w-[80px] max-md:h-[1px] max-md:bg-gradient-to-r" />
    </div>
  );
}

export default function HomePage() {
  const { setBrandId } = useBrand();
  return (
    <div className="flex w-screen h-screen overflow-hidden max-md:flex-col">
      {/* Bukka Panel */}
      <Link
        href="/bukka/menu"
        className="flex-1 relative flex items-center justify-center cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden group max-md:min-h-[50vh]"
        onClick={() => { setBrandId('folixx-bukka'); }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(232,93,26,0.85)] to-[rgba(26,22,20,0.6)]" />
        <div className="relative z-10 text-center p-12 max-md:p-6">
          <div className="text-sm tracking-[0.3em] uppercase text-white/70 mb-2">FoliXx</div>
          <div className="font-bold mb-3 text-5xl text-white transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105 max-md:text-3xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Bukka
          </div>
          <div className="text-xl italic text-white/90 mb-8 opacity-0 translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 group-hover:opacity-100 group-hover:translate-y-0 max-md:text-base max-md:mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            &ldquo;Taste the Tradition, Feel the Flavor&rdquo;
          </div>
          <span className="inline-flex items-center gap-2 text-base font-semibold px-8 py-3.5 border-2 border-white/60 rounded-full bg-transparent text-white transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105 group-hover:bg-white group-hover:text-[#E85D1A] group-hover:border-white max-md:text-sm max-md:px-6 max-md:py-3">
            Order Food →
          </span>
        </div>
      </Link>

      {/* Divider */}
      <FoliXxLogo />

      {/* Palace Panel */}
      <Link
        href="/palace/events"
        className="flex-1 relative flex items-center justify-center cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden group max-md:min-h-[50vh]"
        onClick={() => { setBrandId('secrets-palace'); }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(8,8,16,0.9)] to-[rgba(20,20,42,0.7)]" />
        <div className="relative z-10 text-center p-12 max-md:p-6">
          <div className="text-sm tracking-[0.35em] uppercase text-[rgba(212,160,23,0.6)] mb-2">Secrets</div>
          <div className="font-bold mb-3 text-5xl text-[#D4A017] tracking-[0.05em] transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105 max-md:text-3xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Palace
          </div>
          <div className="text-xl italic text-[rgba(240,240,248,0.85)] mb-8 opacity-0 translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 group-hover:opacity-100 group-hover:translate-y-0 max-md:text-base max-md:mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            &ldquo;Where Every Guest is Royalty&rdquo;
          </div>
          <span className="inline-flex items-center gap-2 text-base font-semibold px-8 py-3.5 border-2 border-[rgba(212,160,23,0.5)] rounded-full bg-transparent text-[#D4A017] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105 group-hover:bg-[#D4A017] group-hover:text-[#080810] group-hover:border-[#D4A017] max-md:text-sm max-md:px-6 max-md:py-3">
            Book Your Night →
          </span>
        </div>
      </Link>
    </div>
  );
}
