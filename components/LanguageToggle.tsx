"use client";

import { useLanguage } from "@/context/LanguageContext";

const LanguageToggle = () => {
  const { language, toggle } = useLanguage();
  return (
    <button
      onClick={toggle}
      className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-800 transition"
      aria-label="Toggle language"
    >
      {language === "en" ? "🇺🇸 EN" : language === "pt" ? "🇧🇷 PT" : "🇲🇽 ES"}
    </button>
  );
};

export default LanguageToggle;
