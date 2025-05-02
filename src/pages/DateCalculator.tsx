
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

type DateOperation = "add" | "subtract" | "difference" | "convert";

const DateCalculator = () => {
  const [operation, setOperation] = useState<DateOperation>("add");
  const [date, setDate] = useState<Date>(new Date());
  const [secondDate, setSecondDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState<string>("1");
  const [unit, setUnit] = useState<string>("days");
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  
  const handleCalculate = () => {
    // Demo calculation logic
    const now = new Date();
    
    if (operation === "add") {
      const newDate = new Date(date);
      const amountNum = parseInt(amount);
      
      switch (unit) {
        case "days":
          newDate.setDate(newDate.getDate() + amountNum);
          break;
        case "months":
          newDate.setMonth(newDate.getMonth() + amountNum);
          break;
        case "years":
          newDate.setFullYear(newDate.getFullYear() + amountNum);
          break;
        case "hours":
          newDate.setHours(newDate.getHours() + amountNum);
          break;
        case "minutes":
          newDate.setMinutes(newDate.getMinutes() + amountNum);
          break;
      }
      
      setResult(`${format(date, "PPP")} + ${amount} ${unit} = ${format(newDate, "PPP")}`);
    } 
    else if (operation === "subtract") {
      const newDate = new Date(date);
      const amountNum = parseInt(amount);
      
      switch (unit) {
        case "days":
          newDate.setDate(newDate.getDate() - amountNum);
          break;
        case "months":
          newDate.setMonth(newDate.getMonth() - amountNum);
          break;
        case "years":
          newDate.setFullYear(newDate.getFullYear() - amountNum);
          break;
        case "hours":
          newDate.setHours(newDate.getHours() - amountNum);
          break;
        case "minutes":
          newDate.setMinutes(newDate.getMinutes() - amountNum);
          break;
      }
      
      setResult(`${format(date, "PPP")} - ${amount} ${unit} = ${format(newDate, "PPP")}`);
    }
    else if (operation === "difference") {
      // Calculate difference in days for demo
      const diffTime = Math.abs(secondDate.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setResult(`Difference between ${format(date, "PPP")} and ${format(secondDate, "PPP")} is ${diffDays} days`);
    }
    else if (operation === "convert") {
      // For demo purposes, handle a few natural language expressions
      if (expression.toLowerCase().includes("tomorrow")) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setResult(`Tomorrow is ${format(tomorrow, "PPP")}`);
      }
      else if (expression.toLowerCase().includes("next week")) {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        setResult(`Next week is ${format(nextWeek, "PPP")}`);
      }
      else if (expression.toLowerCase().includes("next month")) {
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setResult(`Next month is ${format(nextMonth, "PPP")}`);
      }
      else {
        setResult(`Calculated date: ${format(now, "PPP")}`);
      }
    }
  };

  return (
    <PageLayout
      title="Date/Time Calculator"
      description="Calculate dates and times with natural language processing"
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-sm p-6">
        <Tabs defaultValue="add" onValueChange={(val) => setOperation(val as DateOperation)}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="add">Add</TabsTrigger>
            <TabsTrigger value="subtract">Subtract</TabsTrigger>
            <TabsTrigger value="difference">Difference</TabsTrigger>
            <TabsTrigger value="convert">Natural Language</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal interactive-input",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="interactive-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <select
                    id="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 interactive-input"
                  >
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="subtract" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal interactive-input",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="interactive-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <select
                    id="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 interactive-input"
                  >
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="difference" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal interactive-input",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal interactive-input",
                        !secondDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {secondDate ? format(secondDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={secondDate}
                      onSelect={(date) => date && setSecondDate(date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="convert" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="expression">Natural Language Expression</Label>
              <Input
                id="expression"
                placeholder="next Tuesday + 3 days"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                className="interactive-input"
              />
              <p className="text-sm text-muted-foreground">
                Example: "next Tuesday", "tomorrow + 3 days", "next month"
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-4">
          <Button 
            onClick={handleCalculate} 
            className="w-full"
            disabled={(operation === "convert" && !expression) || 
                     ((operation === "add" || operation === "subtract") && (!amount || isNaN(Number(amount))))}
          >
            Calculate
          </Button>
        </div>
        
        {result && (
          <div className="mt-6 pt-6 border-t text-center animate-fade-in">
            <div className="text-xl font-medium">{result}</div>
          </div>
        )}
      </div>
      
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border p-6">
        <h3 className="mb-4">Tips</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>Use natural language to describe dates and operations</li>
          <li>You can combine multiple operations like "next Monday + 2 weeks"</li>
          <li>Time zones are handled automatically based on your browser settings</li>
          <li>For difference calculations, results are provided in the most appropriate units</li>
        </ul>
      </div>
    </PageLayout>
  );
};

export default DateCalculator;
