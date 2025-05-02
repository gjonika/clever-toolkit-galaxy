
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";

const toolCards = [
  {
    id: 1,
    title: "Unit Converter",
    description: "Convert values between different units of measurement including length, weight, temperature, and currency.",
    route: "/unit-converter",
    bgClass: "tool-card-1",
  },
  {
    id: 2,
    title: "Color Extractor",
    description: "Extract a color palette from images or webpages. Get HEX, RGB, and HSL values for each color.",
    route: "/color-extractor",
    bgClass: "tool-card-2",
  },
  {
    id: 3,
    title: "Date/Time Calculator",
    description: "Calculate dates and times with natural language processing. Add days, subtract hours, and more.",
    route: "/date-calculator",
    bgClass: "tool-card-3",
  },
  {
    id: 4,
    title: "Text Transformer",
    description: "Transform text with operations like case conversion, trimming, line deduplication, and more.",
    route: "/text-transformer",
    bgClass: "tool-card-4",
  },
];

const Index = () => {
  return (
    <PageLayout
      title="DevUtils Toolkit"
      description="A collection of handy utilities for developers and users alike"
    >
      <div className="relative">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        
        <div className="space-y-6 text-center mb-12">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Developer Utilities Toolkit
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            A powerful collection of tools to simplify your workflow. Convert units, extract colors, calculate dates, and transform text.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 animate-fade-in">
          {toolCards.map((tool) => (
            <div key={tool.id} className={`tool-card ${tool.bgClass}`}>
              <div>
                <h3 className="mb-2">{tool.title}</h3>
                <p className="text-muted-foreground mb-6">{tool.description}</p>
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
        
        <div className="mt-16 text-center">
          <h2 className="mb-6">Why Choose DevUtils?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border animate-scale-in">
              <h4 className="mb-2">Simple & Intuitive</h4>
              <p className="text-muted-foreground">
                Clean interfaces designed for quick and easy use.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border animate-scale-in [animation-delay:0.1s]">
              <h4 className="mb-2">Developer-Focused</h4>
              <p className="text-muted-foreground">
                Built by developers, for developers.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border animate-scale-in [animation-delay:0.2s]">
              <h4 className="mb-2">Open Source</h4>
              <p className="text-muted-foreground">
                Free to use, modify, and contribute.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
