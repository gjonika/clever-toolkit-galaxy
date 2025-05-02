
import { createContext, useContext, useState, ReactNode } from "react";

type Language = "EN" | "LT";

interface LanguageContextType {
  language: Language;
  translations: Record<string, string>;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Basic translations for demonstration
const translations = {
  EN: {
    "unit-converter": "Unit Converter",
    "color-extractor": "Color Extractor",
    "date-calculator": "Date/Time Calculator",
    "text-transformer": "Text Transformer",
    "developer-utilities": "Developer Utilities",
    "weather": "Weather",
    "convert": "Convert",
    "calculate": "Calculate",
    "transform": "Transform",
    "extract": "Extract",
    "github": "GitHub",
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
    "temp": "Temp"
  },
  LT: {
    "unit-converter": "Matavimo vienetų keitiklis",
    "color-extractor": "Spalvų išrinkimas",
    "date-calculator": "Datos/laiko skaičiuoklė",
    "text-transformer": "Teksto transformavimas",
    "developer-utilities": "Programuotojų įrankiai",
    "weather": "Orai",
    "convert": "Konvertuoti",
    "calculate": "Apskaičiuoti",
    "transform": "Transformuoti",
    "extract": "Išrinkti",
    "github": "GitHub",
    "input-text": "Įvesties tekstas",
    "output-text": "Rezultato tekstas",
    "clear-all": "Išvalyti viską",
    "copy-to-clipboard": "Kopijuoti į iškarpinę",
    "transformations": "Transformacijos",
    "uppercase": "Didžiosios raidės",
    "lowercase": "Mažosios raidės",
    "capitalize": "Pirmoji didžioji",
    "trim": "Apkarpyti tarpus",
    "remove-empty-lines": "Pašalinti tuščias eilutes",
    "remove-duplicate-lines": "Pašalinti pasikartojančias eilutes",
    "sort-lines": "Rikiuoti eilutes",
    "reverse-lines": "Apversti eilutes",
    "common-use-cases": "Dažni naudojimo atvejai",
    "text-formatting": "Teksto formatavimas",
    "data-processing": "Duomenų apdorojimas",
    "feels-like": "Jaučiasi kaip",
    "humidity": "Drėgmė",
    "wind": "Vėjas",
    "search": "Ieškoti",
    "enter-city-name": "Įveskite miesto pavadinimą",
    "hourly-forecast": "Valandinė prognozė",
    "temp": "Temp."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from local storage or default to EN
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "EN";
  });

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const handleLanguageChange = (newLanguage: Language) => {
    localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        translations: translations[language], 
        setLanguage: handleLanguageChange,
        t
      }}
    >
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
