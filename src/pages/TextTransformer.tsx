
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

interface TransformOption {
  id: string;
  labelKey: string;
  descriptionKey: string;
}

const transformOptions: TransformOption[] = [
  { id: "uppercase", labelKey: "uppercase", descriptionKey: "Convert text to uppercase" },
  { id: "lowercase", labelKey: "lowercase", descriptionKey: "Convert text to lowercase" },
  { id: "capitalize", labelKey: "capitalize", descriptionKey: "Capitalize first letter of each word" },
  { id: "trim", labelKey: "trim", descriptionKey: "Remove whitespace from beginning and end" },
  { id: "removeEmptyLines", labelKey: "remove-empty-lines", descriptionKey: "Remove blank lines" },
  { id: "removeDuplicateLines", labelKey: "remove-duplicate-lines", descriptionKey: "Remove duplicate lines" },
  { id: "sortLines", labelKey: "sort-lines", descriptionKey: "Sort lines alphabetically" },
  { id: "reverseLines", labelKey: "reverse-lines", descriptionKey: "Reverse the order of lines" },
];

const TextTransformer = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [selectedTransformation, setSelectedTransformation] = useState<string>("");
  const { t } = useLanguage();

  const handleTransform = useCallback(() => {
    if (!inputText || !selectedTransformation) return;

    // Get the text to transform - either the output text (if it exists) or the input text
    let textToTransform = outputText || inputText;
    let transformed = textToTransform;
    
    // Apply transformation
    switch (selectedTransformation) {
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

    setOutputText(transformed);
  }, [inputText, outputText, selectedTransformation]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard!");
  };

  return (
    <PageLayout
      title={t("text-transformer")}
      description="Apply transformations to your text"
      className="max-w-3xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="digital-card p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="input-text">{t("input-text")}</Label>
                <Textarea
                  id="input-text"
                  placeholder="Enter text to transform"
                  rows={10}
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    // Reset output when input changes
                    if (outputText) {
                      setOutputText("");
                    }
                  }}
                  className="font-mono text-sm interactive-input"
                />
              </div>
              
              <div className="flex justify-between">
                <Button
                  onClick={handleTransform}
                  disabled={!inputText || !selectedTransformation}
                  className="bg-primary/90 hover:bg-primary"
                >
                  {t("transform")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setInputText("");
                    setOutputText("");
                    setSelectedTransformation("");
                  }}
                >
                  {t("clear-all")}
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-text">{t("output-text")}</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyToClipboard}
                    disabled={!outputText}
                  >
                    {t("copy-to-clipboard")}
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
        
        <div className="digital-card p-6">
          <h3 className="text-lg font-medium mb-4">{t("transformations")}</h3>
          <div className="space-y-4">
            <RadioGroup value={selectedTransformation} onValueChange={setSelectedTransformation}>
              {transformOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-2">
                  <div className="flex items-center h-5">
                    <RadioGroupItem value={option.id} id={option.id} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {t(option.labelKey)}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {option.descriptionKey}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
      
      <div className="mt-8 digital-card p-6">
        <h3 className="mb-4">{t("common-use-cases")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4>{t("text-formatting")}</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Clean up data from spreadsheets</li>
              <li>Format code snippets</li>
              <li>Prepare text for publishing</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4>{t("data-processing")}</h4>
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
