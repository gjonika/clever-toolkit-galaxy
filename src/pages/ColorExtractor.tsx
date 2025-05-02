
import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Upload, LinkIcon, FileImage } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

type ExtractorSource = "image" | "website" | "upload";

const ColorExtractor = () => {
  const [source, setSource] = useState<ExtractorSource>("image");
  const [inputValue, setInputValue] = useState<string>("");
  const [numColors, setNumColors] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [colors, setColors] = useState<string[] | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (source !== "upload" && !inputValue.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call for demo purposes
    setTimeout(() => {
      // Take a subset of demo colors based on numColors
      setColors(demoColors.slice(0, numColors).map(c => c.hex));
      setIsLoading(false);
    }, 1500);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size validation (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert("File too large. Maximum size is 10MB.");
      return;
    }

    // Preview the image
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
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
      <div className="digital-card p-6">
        <Tabs defaultValue="image" onValueChange={(val) => setSource(val as ExtractorSource)}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="upload">
              <FileImage className="h-4 w-4 mr-2" />
              Upload Image
            </TabsTrigger>
            <TabsTrigger value="image">
              <LinkIcon className="h-4 w-4 mr-2" />
              Image URL
            </TabsTrigger>
            <TabsTrigger value="website">
              <LinkIcon className="h-4 w-4 mr-2" />
              From Website
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="upload-image">Upload Image</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  id="upload-image" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or WEBP (max. 10MB)
                </p>
              </div>
            </div>
            
            {previewImage && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="relative rounded-md overflow-hidden max-h-64 flex items-center justify-center bg-black/20">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="max-w-full max-h-64 object-contain"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="num-colors-upload">Number of Colors ({numColors})</Label>
              </div>
              <Slider
                id="num-colors-upload"
                min={2}
                max={10}
                step={1}
                defaultValue={[numColors]}
                onValueChange={(values) => setNumColors(values[0])}
              />
            </div>
          </TabsContent>
          
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
                <Label htmlFor="num-colors-website">Number of Colors ({numColors})</Label>
              </div>
              <Slider
                id="num-colors-website"
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
            disabled={(source !== "upload" && !inputValue.trim()) || (source === "upload" && !previewImage) || isLoading}
          >
            {isLoading ? "Extracting..." : "Extract Colors"}
          </Button>
        </div>
      </div>
      
      {colors && (
        <div className="mt-8 digital-card p-6 animate-fade-in">
          <h3 className="mb-4">Extracted Color Palette</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colors.map((color, index) => (
              <div 
                key={`${color}-${index}`}
                className="bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
