
import { Calculator, Palette, Calendar, Text, ArrowRight, Download, Code, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const quickTools = [
  {
    id: "quick-unit",
    titleKey: "unit-converter",
    icon: Calculator,
    route: "/unit-converter",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    id: "quick-color",
    titleKey: "color-extractor",
    icon: Palette,
    route: "/color-extractor",
    color: "bg-pink-500/10 text-pink-500"
  },
  {
    id: "quick-date",
    titleKey: "date-calculator",
    icon: Calendar,
    route: "/date-calculator",
    color: "bg-amber-500/10 text-amber-500"
  },
  {
    id: "quick-text",
    titleKey: "text-transformer",
    icon: Text,
    route: "/text-transformer",
    color: "bg-green-500/10 text-green-500"
  },
  {
    id: "quick-code",
    titleKey: "code-formatter",
    icon: Code,
    route: "#",
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    id: "quick-download",
    titleKey: "file-converter",
    icon: Download,
    route: "#",
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    id: "quick-time",
    titleKey: "time-zone",
    icon: Clock,
    route: "#",
    color: "bg-cyan-500/10 text-cyan-500"
  },
  {
    id: "quick-more",
    titleKey: "more-tools",
    icon: ArrowRight,
    route: "#",
    color: "bg-gray-500/10 text-gray-500"
  },
];

const QuickTools = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
      {quickTools.map((tool) => (
        <Link
          key={tool.id}
          to={tool.route}
          className="quick-tool-card group"
        >
          <div className={`flex flex-col items-center justify-center p-4 ${tool.color} rounded-lg w-full aspect-square transition-all duration-300 group-hover:scale-105`}>
            <tool.icon className="h-8 w-8 mb-2" />
            <span className="text-xs font-medium text-center">{t(tool.titleKey)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickTools;
