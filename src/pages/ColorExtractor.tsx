
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import PageLayout from "@/components/layout/PageLayout";

type ExtractorSource = "image" | "website";

const ColorExtractor = () => {
  const [source, setSource] = useState<ExtractorSource>("image");
  const [inputValue, setInputValue] = useState<string>("");
  const [numColors, setNumColors] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [colors, setColors] = useState<string[] | null>(null);

  // Demo colors - in a real app, you would extract these from the image/website
  const demoColors = [
    { hex: "#f0f0f0", name: "Light Gray" },
    { hex: "#d3d3d3", name: "Gray" },
    { hex: "#a9a9a9", name: "Dark Gray" },
    { hex: "#808080", name: "Medium Gray" },
    { hex: "#696969", name: "Dim Gray" },
    { hex: "#000000", name: "Black" },
    { hex: "#ffffff", name: "White" },
    { hex: "#3b82f6", name: "Blue" },
  ];

  const handleExtract = () => {
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call for demo purposes
    setTimeout(() => {
      // Take a subset of demo colors based on numColors
      setColors(demoColors.slice(0, numColors).map(c => c.hex));
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    // In a real app, show a toast notification here
  };

  return (
    <PageLayout
      title="Color Extractor"
      description="Extract color palettes from images or websites"
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-sm p-6">
        <Tabs defaultValue="image" onValueChange={(val) => setSource(val as ExtractorSource)}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="image">From Image</TabsTrigger>
            <TabsTrigger value="website">From Website</TabsTrigger>
          </TabsList>
          
          <TabsContent value="image" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                placeholder="https://example.com/image.jpg"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="interactive-input"
              />
              <p className="text-sm text-muted-foreground">
                Enter the URL of the image you want to extract colors from
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="num-colors">Number of Colors ({numColors})</Label>
              </div>
              <Slider
                id="num-colors"
                min={2}
                max={10}
                step={1}
                defaultValue={[numColors]}
                onValueChange={(values) => setNumColors(values[0])}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="website" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="website-url">Website URL</Label>
              <Input
                id="website-url"
                placeholder="https://example.com"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="interactive-input"
              />
              <p className="text-sm text-muted-foreground">
                Enter the URL of the website you want to extract colors from
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="num-colors">Number of Colors ({numColors})</Label>
              </div>
              <Slider
                id="num-colors"
                min={2}
                max={10}
                step={1}
                defaultValue={[numColors]}
                onValueChange={(values) => setNumColors(values[0])}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-4">
          <Button 
            onClick={handleExtract} 
            className="w-full" 
            disabled={!inputValue.trim() || isLoading}
          >
            {isLoading ? "Extracting..." : "Extract Colors"}
          </Button>
        </div>
      </div>
      
      {colors && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border p-6 animate-fade-in">
          <h3 className="mb-4">Extracted Color Palette</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colors.map((color, index) => (
              <div 
                key={`${color}-${index}`}
                className="bg-white dark:bg-gray-900 border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div 
                  className="h-24 w-full" 
                  style={{ backgroundColor: color }}
                ></div>
                <div className="p-3">
                  <div className="font-mono text-sm mb-2">
                    {color.toUpperCase()}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => copyToClipboard(color)}
                    className="w-full text-xs"
                  >
                    Copy HEX
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Copy All</Button>
              <Button variant="outline" size="sm">Export CSS</Button>
              <Button variant="outline" size="sm">Export Tailwind</Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ColorExtractor;
