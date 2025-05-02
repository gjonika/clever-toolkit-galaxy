
import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-8 bg-card/50">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DevUtils. All rights reserved.
        </div>
        
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
            <span>Privacy</span>
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
            <span>Terms</span>
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
            <span>Contact</span>
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
