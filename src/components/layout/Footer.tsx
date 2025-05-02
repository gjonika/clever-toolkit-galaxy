
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t py-4 md:py-6 bg-card/50 digital-border">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DevUtils. {t("all-rights-reserved")}
        </div>
        <div className="flex items-center mt-2 md:mt-0 space-x-4">
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            {t("releases")}
          </a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            {t("github")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
