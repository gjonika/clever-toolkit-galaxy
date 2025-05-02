import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "EN" | "LT";

// Translation object type
interface Translations {
  [key: string]: {
    EN: string;
    LT: string;
  };
}

// Define translations
const translations: Translations = {
  "developer-utilities": {
    EN: "Developer Utilities",
    LT: "Programuotojų Įrankiai"
  },
  "unit-converter": {
    EN: "Unit Converter",
    LT: "Matų Konverteris"
  },
  "color-extractor": {
    EN: "Color Extractor",
    LT: "Spalvų Ištraukimas"
  },
  "date-calculator": {
    EN: "Date Calculator",
    LT: "Datų Skaičiuoklė"
  },
  "text-transformer": {
    EN: "Text Transformer",
    LT: "Teksto Transformavimas"
  },
  "code-formatter": {
    EN: "Code Formatter",
    LT: "Kodo Formatavimas"
  },
  "file-converter": {
    EN: "File Converter",
    LT: "Failų Konverteris"
  },
  "time-zone": {
    EN: "Time Zone",
    LT: "Laiko Juostos"
  },
  "more-tools": {
    EN: "More Tools",
    LT: "Daugiau Įrankių"
  },
  "quick-tools": {
    EN: "Quick Tools",
    LT: "Greiti Įrankiai"
  },
  "all-tools": {
    EN: "All Tools",
    LT: "Visi Įrankiai"
  },
  "customize": {
    EN: "Customize",
    LT: "Pritaikyti"
  },
  "open-tool": {
    EN: "Open Tool",
    LT: "Atidaryti Įrankį"
  },
  "all-rights-reserved": {
    EN: "All rights reserved.",
    LT: "Visos teisės saugomos."
  },
  "releases": {
    EN: "Releases",
    LT: "Išleidimai"
  },
  "github": {
    EN: "GitHub",
    LT: "GitHub"
  },
  "input-text": "Input Text",
  "output-text": "Output Text",
  "clear-all": "Clear All",
  "copy-to-clipboard": "Copy to Clipboard",
  "transformations": "Transformations",
  "uppercase": "Uppercase",
  "lowercase": "Lowercase",
  "capitalize": "Capitalize",
  "trim": "Trim",
  "remove-empty-lines": "Remove Empty Lines",
  "remove-duplicate-lines": "Remove Duplicate Lines",
  "sort-lines": "Sort Lines",
  "reverse-lines": "Reverse Lines",
  "common-use-cases": "Common Use Cases",
  "text-formatting": "Text Formatting",
  "data-processing": "Data Processing",
  "feels-like": "Feels like",
  "humidity": "Humidity",
  "wind": "Wind",
  "search": "Search",
  "enter-city-name": "Enter city name",
  "hourly-forecast": "Hourly Forecast",
  "temp": "Temp."
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from local storage or default to EN
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "EN";
  });

  useEffect(() => {
    // Update local storage when language changes
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
