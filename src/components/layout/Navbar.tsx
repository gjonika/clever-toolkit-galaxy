
import { Link } from "react-router-dom";
import { Home, Sun, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import WeatherWidget from "@/components/weather/WeatherWidget";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="border-b bg-background/90 backdrop-blur-sm sticky top-0 z-30 digital-border border-t-primary/50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded text-white">
              <Home className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl">{t("developer-utilities")}</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/unit-converter" className="text-sm font-medium hover:text-primary transition-colors">
              {t("unit-converter")}
            </Link>
            <Link to="/color-extractor" className="text-sm font-medium hover:text-primary transition-colors">
              {t("color-extractor")}
            </Link>
            <Link to="/date-calculator" className="text-sm font-medium hover:text-primary transition-colors">
              {t("date-calculator")}
            </Link>
            <Link to="/text-transformer" className="text-sm font-medium hover:text-primary transition-colors">
              {t("text-transformer")}
            </Link>
          </nav>
          
          <WeatherWidget />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("EN")} className={language === "EN" ? "bg-primary/10" : ""}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("LT")} className={language === "LT" ? "bg-primary/10" : ""}>
                Lietuvių
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <a href="https://github.com/your-username/dev-utils" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">{t("github")}</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
