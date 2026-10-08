"use client";

import { createContext, useContext, useState } from "react";
import { translations, Language, TranslationKey } from "@/lib/translations";

type LanguageContextType = {
  language: Language;
  toggle: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  toggle: () => {},
  t: (key) => translations.en[key],
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const toggle = () => setLanguage((l) => (l === "en" ? "pt" : l === "pt" ? "es" : "en"));
  const t = (key: TranslationKey) => translations[language][key];
  return (
    <LanguageContext.Provider value={{ language, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
