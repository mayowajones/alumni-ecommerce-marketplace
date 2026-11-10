import React from "react";

const Footer = () => (
  <footer className="mt-20 border-t border-forest/10 bg-[#101d19] text-cream/75">
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl font-bold text-cream">Command Ojo '98</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/65">
            A trusted alumni marketplace for finding quality essentials, memorable keepsakes, and everyday favorites from the people who know the community best.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          <span>Trusted</span>
          <span className="text-cream/50">•</span>
          <span>Secure</span>
          <span className="text-cream/50">•</span>
          <span>Curated</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Command Ojo '98 Alumni Association.</p>
        <p>Command Day Secondary School, Ojo</p>
      </div>
    </div>
  </footer>
);

export default Footer;
