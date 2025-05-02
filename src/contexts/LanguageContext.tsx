
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
  "input-text": {
    EN: "Input Text",
    LT: "Įvesti Tekstą"
  },
  "output-text": {
    EN: "Output Text",
    LT: "Išvesties Tekstas"
  },
  "clear-all": {
    EN: "Clear All",
    LT: "Išvalyti Viską"
  },
  "copy-to-clipboard": {
    EN: "Copy to Clipboard",
    LT: "Kopijuoti į Iškarpinę"
  },
  "transformations": {
    EN: "Transformations",
    LT: "Transformacijos"
  },
  "uppercase": {
    EN: "Uppercase",
    LT: "Didžiosios raidės"
  },
  "lowercase": {
    EN: "Lowercase",
    LT: "Mažosios raidės"
  },
  "capitalize": {
    EN: "Capitalize",
    LT: "Pirmoji didžioji"
  },
  "trim": {
    EN: "Trim",
    LT: "Apkarpyti"
  },
  "remove-empty-lines": {
    EN: "Remove Empty Lines",
    LT: "Pašalinti tuščias eilutes"
  },
  "remove-duplicate-lines": {
    EN: "Remove Duplicate Lines",
    LT: "Pašalinti pasikartojančias eilutes"
  },
  "sort-lines": {
    EN: "Sort Lines",
    LT: "Rūšiuoti eilutes"
  },
  "reverse-lines": {
    EN: "Reverse Lines",
    LT: "Atvirkštinės eilutės"
  },
  "common-use-cases": {
    EN: "Common Use Cases",
    LT: "Dažni naudojimo atvejai"
  },
  "text-formatting": {
    EN: "Text Formatting",
    LT: "Teksto formatavimas"
  },
  "data-processing": {
    EN: "Data Processing",
    LT: "Duomenų apdorojimas"
  },
  "feels-like": {
    EN: "Feels like",
    LT: "Jaučiasi kaip"
  },
  "humidity": {
    EN: "Humidity",
    LT: "Drėgmė"
  },
  "wind": {
    EN: "Wind",
    LT: "Vėjas"
  },
  "search": {
    EN: "Search",
    LT: "Paieška"
  },
  "enter-city-name": {
    EN: "Enter city name",
    LT: "Įveskite miesto pavadinimą"
  },
  "hourly-forecast": {
    EN: "Hourly Forecast",
    LT: "Valandinis orų prognozė"
  },
  "temp": {
    EN: "Temp.",
    LT: "Temp."
  }
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
