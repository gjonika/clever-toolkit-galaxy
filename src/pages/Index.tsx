
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const toolCards = [
  {
    id: 1,
    titleKey: "unit-converter",
    descriptionKey: "Convert values between different units of measurement including length, weight, temperature, and currency.",
    route: "/unit-converter",
    bgClass: "tool-card-1",
  },
  {
    id: 2,
    titleKey: "color-extractor",
    descriptionKey: "Extract a color palette from images or webpages. Get HEX, RGB, and HSL values for each color.",
    route: "/color-extractor",
    bgClass: "tool-card-2",
  },
  {
    id: 3,
    titleKey: "date-calculator",
    descriptionKey: "Calculate dates and times with natural language processing. Add days, subtract hours, and more.",
    route: "/date-calculator",
    bgClass: "tool-card-3",
  },
  {
    id: 4,
    titleKey: "text-transformer",
    descriptionKey: "Transform text with operations like case conversion, trimming, line deduplication, and more.",
    route: "/text-transformer",
    bgClass: "tool-card-4",
  },
];

const Index = () => {
  const { t } = useLanguage();

  return (
    <PageLayout
      title={t("developer-utilities")}
    >
      <div className="relative">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 animate-fade-in">
          {toolCards.map((tool) => (
            <div key={tool.id} className={`tool-card ${tool.bgClass}`}>
              <div>
                <h3 className="mb-2">{t(tool.titleKey)}</h3>
                <p className="text-muted-foreground mb-6">{tool.descriptionKey}</p>
              </div>
              <div className="flex justify-end">
                <Link to={tool.route}>
                  <Button variant="ghost" className="group">
                    Open Tool
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
