
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import PageLayout from "@/components/layout/PageLayout";

interface TransformOption {
  id: string;
  label: string;
  description: string;
}

const transformOptions: TransformOption[] = [
  { id: "uppercase", label: "Uppercase", description: "Convert text to uppercase" },
  { id: "lowercase", label: "Lowercase", description: "Convert text to lowercase" },
  { id: "capitalize", label: "Capitalize", description: "Capitalize first letter of each word" },
  { id: "trim", label: "Trim", description: "Remove whitespace from beginning and end" },
  { id: "removeEmptyLines", label: "Remove Empty Lines", description: "Remove blank lines" },
  { id: "removeDuplicateLines", label: "Remove Duplicate Lines", description: "Remove duplicate lines" },
  { id: "sortLines", label: "Sort Lines", description: "Sort lines alphabetically" },
  { id: "reverseLines", label: "Reverse Lines", description: "Reverse the order of lines" },
];

const TextTransformer = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [selectedTransformations, setSelectedTransformations] = useState<string[]>([]);

  const handleTransform = () => {
    if (!inputText) return;

    let transformed = inputText;
    
    // Apply transformations in sequence
    selectedTransformations.forEach((transformation) => {
      switch (transformation) {
        case "uppercase":
          transformed = transformed.toUpperCase();
          break;
        case "lowercase":
          transformed = transformed.toLowerCase();
          break;
        case "capitalize":
          transformed = transformed
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          break;
        case "trim":
          transformed = transformed.trim();
          break;
        case "removeEmptyLines":
          transformed = transformed
            .split("\n")
            .filter((line) => line.trim() !== "")
            .join("\n");
          break;
        case "removeDuplicateLines": {
          const lines = transformed.split("\n");
          const uniqueLines = [...new Set(lines)];
          transformed = uniqueLines.join("\n");
          break;
        }
        case "sortLines": {
          const lines = transformed.split("\n");
          const sortedLines = [...lines].sort();
          transformed = sortedLines.join("\n");
          break;
        }
        case "reverseLines": {
          const lines = transformed.split("\n");
          const reversedLines = [...lines].reverse();
          transformed = reversedLines.join("\n");
          break;
        }
      }
    });

    setOutputText(transformed);
  };

  const handleCheckboxChange = (transformation: string) => {
    setSelectedTransformations((prev) =>
      prev.includes(transformation)
        ? prev.filter((t) => t !== transformation)
        : [...prev, transformation]
    );
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    // In a real app, show a toast notification here
  };

  return (
    <PageLayout
      title="Text Transformer"
      description="Apply multiple transformations to your text"
      className="max-w-3xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-sm p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="input-text">Input Text</Label>
                <Textarea
                  id="input-text"
                  placeholder="Enter text to transform"
                  rows={10}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="font-mono text-sm interactive-input"
                />
              </div>
              
              <div className="flex justify-between">
                <Button
                  onClick={handleTransform}
                  disabled={!inputText || selectedTransformations.length === 0}
                >
                  Transform
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setInputText("");
                    setOutputText("");
                    setSelectedTransformations([]);
                  }}
                >
                  Clear All
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-text">Output Text</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyToClipboard}
                    disabled={!outputText}
                  >
                    Copy to Clipboard
                  </Button>
                </div>
                <Textarea
                  id="output-text"
                  rows={10}
                  readOnly
                  value={outputText}
                  className="font-mono text-sm bg-muted"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Transformations</h3>
          <div className="space-y-4">
            {transformOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedTransformations.includes(option.id)}
                  onCheckedChange={() => handleCheckboxChange(option.id)}
                />
                <div className="grid gap-1.5">
                  <Label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {option.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border p-6">
        <h3 className="mb-4">Common Use Cases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4>Text Formatting</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Clean up data from spreadsheets</li>
              <li>Format code snippets</li>
              <li>Prepare text for publishing</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4>Data Processing</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Clean CSV data</li>
              <li>Prepare data for import</li>
              <li>Sort and filter lists</li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TextTransformer;
