import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/components/layout/PageLayout";

type UnitCategory = "length" | "weight" | "temperature" | "currency" | "area" | "volume";

type ConversionResult = {
  value: number;
  unit: string;
  message: string;
};

const UnitConverter = () => {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [value, setValue] = useState<string>("");
  const [sourceUnit, setSourceUnit] = useState<string>("m");
  const [targetUnit, setTargetUnit] = useState<string>("km");
  const [result, setResult] = useState<ConversionResult | null>(null);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleConvert = () => {
    if (!value || isNaN(Number(value))) {
      return;
    }

    const numValue = parseFloat(value);
    let convertedValue = 0;
    let conversionMessage = "";

    // Conversion logic
    if (category === "length") {
      if (sourceUnit === "m" && targetUnit === "km") {
        convertedValue = numValue / 1000;
      } else if (sourceUnit === "km" && targetUnit === "m") {
        convertedValue = numValue * 1000;
      } else if (sourceUnit === "m" && targetUnit === "cm") {
        convertedValue = numValue * 100;
      } else if (sourceUnit === "cm" && targetUnit === "m") {
        convertedValue = numValue / 100;
      } else {
        convertedValue = numValue; // Same unit
      }
    } else if (category === "area") {
      if (sourceUnit === "m2" && targetUnit === "cm2") {
        convertedValue = numValue * 10000;
      } else if (sourceUnit === "cm2" && targetUnit === "m2") {
        convertedValue = numValue / 10000;
      } else if (sourceUnit === "m2" && targetUnit === "mm2") {
        convertedValue = numValue * 1000000;
      } else if (sourceUnit === "mm2" && targetUnit === "m2") {
        convertedValue = numValue / 1000000;
      } else if (sourceUnit === "km2" && targetUnit === "m2") {
        convertedValue = numValue * 1000000;
      } else if (sourceUnit === "m2" && targetUnit === "km2") {
        convertedValue = numValue / 1000000;
      } else if (sourceUnit === "ft2" && targetUnit === "m2") {
        convertedValue = numValue * 0.092903;
      } else if (sourceUnit === "m2" && targetUnit === "ft2") {
        convertedValue = numValue / 0.092903;
      } else {
        convertedValue = numValue; // Same unit
      }
    } else if (category === "volume") {
      if (sourceUnit === "m3" && targetUnit === "cm3") {
        convertedValue = numValue * 1000000;
      } else if (sourceUnit === "cm3" && targetUnit === "m3") {
        convertedValue = numValue / 1000000;
      } else if (sourceUnit === "m3" && targetUnit === "mm3") {
        convertedValue = numValue * 1000000000;
      } else if (sourceUnit === "mm3" && targetUnit === "m3") {
        convertedValue = numValue / 1000000000;
      } else if (sourceUnit === "L" && targetUnit === "m3") {
        convertedValue = numValue / 1000;
      } else if (sourceUnit === "m3" && targetUnit === "L") {
        convertedValue = numValue * 1000;
      } else if (sourceUnit === "gal" && targetUnit === "L") {
        convertedValue = numValue * 3.78541;
      } else if (sourceUnit === "L" && targetUnit === "gal") {
        convertedValue = numValue / 3.78541;
      } else {
        convertedValue = numValue; // Same unit
      }
    } else if (category === "weight") {
      if (sourceUnit === "kg" && targetUnit === "g") {
        convertedValue = numValue * 1000;
      } else if (sourceUnit === "g" && targetUnit === "kg") {
        convertedValue = numValue / 1000;
      } else if (sourceUnit === "kg" && targetUnit === "lb") {
        convertedValue = numValue * 2.20462;
      } else if (sourceUnit === "lb" && targetUnit === "kg") {
        convertedValue = numValue / 2.20462;
      } else {
        convertedValue = numValue; // Same unit
      }
    } else if (category === "temperature") {
      if (sourceUnit === "celsius" && targetUnit === "fahrenheit") {
        convertedValue = (numValue * 9/5) + 32;
      } else if (sourceUnit === "fahrenheit" && targetUnit === "celsius") {
        convertedValue = (numValue - 32) * 5/9;
      } else if (sourceUnit === "celsius" && targetUnit === "kelvin") {
        convertedValue = numValue + 273.15;
      } else if (sourceUnit === "kelvin" && targetUnit === "celsius") {
        convertedValue = numValue - 273.15;
      } else {
        convertedValue = numValue; // Same unit
      }
    } else if (category === "currency") {
      // For demo purposes, using static exchange rates
      const rates = {
        usd: { eur: 0.85, gbp: 0.74, jpy: 110.42 },
        eur: { usd: 1.18, gbp: 0.87, jpy: 129.95 },
        gbp: { usd: 1.35, eur: 1.15, jpy: 149.31 },
        jpy: { usd: 0.0091, eur: 0.0077, gbp: 0.0067 }
      };
      
      if (sourceUnit !== targetUnit) {
        // @ts-ignore - simplifying for the demo
        convertedValue = numValue * rates[sourceUnit][targetUnit];
      } else {
        convertedValue = numValue;
      }
    }

    conversionMessage = `${numValue} ${sourceUnit} = ${convertedValue.toFixed(4)} ${targetUnit}`;
    
    setResult({
      value: parseFloat(convertedValue.toFixed(4)),
      unit: targetUnit,
      message: conversionMessage,
    });
  };

  const getCategoryUnits = (cat: UnitCategory) => {
    switch (cat) {
      case "length":
        return ["m", "km", "cm", "mm", "ft", "in"];
      case "area":
        return ["m2", "cm2", "mm2", "km2", "ft2", "in2"];
      case "volume":
        return ["m3", "cm3", "mm3", "L", "mL", "gal"];
      case "weight":
        return ["kg", "g", "lb", "oz"];
      case "temperature":
        return ["celsius", "fahrenheit", "kelvin"];
      case "currency":
        return ["usd", "eur", "gbp", "jpy"];
      default:
        return [];
    }
  };

  return (
    <PageLayout
      title="Unit Converter"
      description="Convert values between different units of measurement"
      className="max-w-2xl mx-auto"
    >
      <div className="digital-card p-6">
        <Tabs defaultValue="length" onValueChange={(val) => {
          setCategory(val as UnitCategory);
          setSourceUnit(getCategoryUnits(val as UnitCategory)[0]);
          setTargetUnit(getCategoryUnits(val as UnitCategory)[1]);
        }}>
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="length">Length</TabsTrigger>
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="temperature">Temp</TabsTrigger>
            <TabsTrigger value="currency">Currency</TabsTrigger>
          </TabsList>
          
          {["length", "area", "volume", "weight", "temperature", "currency"].map((cat) => (
            <TabsContent key={cat} value={cat} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder="Enter value"
                    value={value}
                    onChange={handleValueChange}
                    className="interactive-input"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="source-unit">From</Label>
                    <Select
                      value={sourceUnit}
                      onValueChange={setSourceUnit}
                    >
                      <SelectTrigger id="source-unit" className="interactive-input">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {getCategoryUnits(cat as UnitCategory).map((unit) => (
                            <SelectItem key={`source-${unit}`} value={unit}>
                              {unit.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target-unit">To</Label>
                    <Select
                      value={targetUnit}
                      onValueChange={setTargetUnit}
                    >
                      <SelectTrigger id="target-unit" className="interactive-input">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {getCategoryUnits(cat as UnitCategory).map((unit) => (
                            <SelectItem key={`target-${unit}`} value={unit}>
                              {unit.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center pt-2">
                <Button 
                  size="lg"
                  onClick={handleConvert}
                  disabled={!value || isNaN(Number(value))}
                  className="bg-primary/90 hover:bg-primary"
                >
                  Convert
                </Button>
              </div>
              
              {result && (
                <div className="mt-6 pt-6 border-t text-center animate-fade-in">
                  <div className="text-2xl font-medium mb-2">
                    {result.value} {result.unit.toUpperCase()}
                  </div>
                  <p className="text-muted-foreground">{result.message}</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <div className="mt-8 digital-card p-6">
        <h3 className="mb-4">Common Conversions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4>Length</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>1 meter = 100 centimeters</li>
              <li>1 kilometer = 1000 meters</li>
              <li>1 meter = 3.28084 feet</li>
              <li>1 foot = 12 inches</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4>Area</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>1 m² = 10,000 cm²</li>
              <li>1 m² = 1,000,000 mm²</li>
              <li>1 km² = 1,000,000 m²</li>
              <li>1 ft² = 0.092903 m²</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4>Volume</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>1 m³ = 1,000,000 cm³</li>
              <li>1 m³ = 1,000 liters</li>
              <li>1 liter = 0.001 m³</li>
              <li>1 gallon = 3.78541 liters</li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UnitConverter;
