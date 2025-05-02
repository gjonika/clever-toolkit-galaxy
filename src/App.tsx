
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import UnitConverter from "./pages/UnitConverter";
import ColorExtractor from "./pages/ColorExtractor";
import DateCalculator from "./pages/DateCalculator";
import TextTransformer from "./pages/TextTransformer";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/unit-converter" element={<UnitConverter />} />
              <Route path="/color-extractor" element={<ColorExtractor />} />
              <Route path="/date-calculator" element={<DateCalculator />} />
              <Route path="/text-transformer" element={<TextTransformer />} />
              {/* Future tool routes can be added here */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
