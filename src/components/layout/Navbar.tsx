
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm sticky top-0 z-30">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded text-white">
              <Home className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl">DevUtils</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/unit-converter" className="text-sm font-medium hover:text-primary transition-colors">
              Unit Converter
            </Link>
            <Link to="/color-extractor" className="text-sm font-medium hover:text-primary transition-colors">
              Color Extractor
            </Link>
            <Link to="/date-calculator" className="text-sm font-medium hover:text-primary transition-colors">
              Date/Time Calculator
            </Link>
            <Link to="/text-transformer" className="text-sm font-medium hover:text-primary transition-colors">
              Text Transformer
            </Link>
          </nav>
          
          <a href="https://github.com/your-username/dev-utils" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">GitHub</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
