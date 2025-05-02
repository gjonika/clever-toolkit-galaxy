
import { useState, useEffect } from "react";
import { MapPin, ThermometerSun, Wind, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import WeatherForecast from "@/components/weather/WeatherForecast";
import { useLanguage } from "@/contexts/LanguageContext";

type WeatherData = {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  hourlyForecast: Array<{
    hour: string;
    temperature: number;
    condition: string;
  }>;
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    fetchWeatherData("Klaipėda"); // Default to Klaipėda
  }, []);

  const fetchWeatherData = (cityName?: string) => {
    setLoading(true);
    
    // For demo purposes, we're using mock data
    // In a real app, you would use a weather API
    setTimeout(() => {
      if (cityName) {
        // Generate random hourly forecast data
        const hourlyForecast = [];
        const baseTemp = Math.floor(Math.random() * 20) + 5;
        
        for (let i = 0; i < 24; i++) {
          const hour = i.toString().padStart(2, '0') + ':00';
          // Create some variation in the temperature
          const variation = Math.random() * 6 - 3;
          const hourTemp = Math.round((baseTemp + variation) * 10) / 10;
          
          hourlyForecast.push({
            hour,
            temperature: hourTemp,
            condition: ["Sunny", "Cloudy", "Partly Cloudy", "Rainy", "Clear"][Math.floor(Math.random() * 5)]
          });
        }
        
        const temp = Math.floor(Math.random() * 30) + 5;
        const feelsLike = temp + (Math.random() * 4 - 2); // feels like could be slightly different
        
        setWeather({
          location: cityName,
          temperature: temp,
          feelsLike: Math.round(feelsLike * 10) / 10,
          condition: ["Sunny", "Cloudy", "Partly Cloudy", "Rainy", "Clear"][Math.floor(Math.random() * 5)],
          humidity: Math.floor(Math.random() * 60) + 30,
          windSpeed: Math.floor(Math.random() * 20) + 1,
          hourlyForecast
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg px-4 py-3 flex items-center space-x-2 bg-card border animate-pulse">
        <div className="h-8 w-8 rounded-full bg-muted"></div>
        <div className="space-y-2">
          <div className="h-4 w-20 bg-muted rounded"></div>
          <div className="h-3 w-16 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-lg px-3 py-2 flex items-center space-x-2 bg-card/50 border border-border/80 hover:bg-card/80 transition-colors">
          <ThermometerSun className="h-5 w-5 text-primary" />
          <div className="text-left">
            <div className="font-medium text-sm">{weather.temperature}°C</div>
            <div className="text-xs text-muted-foreground flex items-center">
              <MapPin className="h-2.5 w-2.5 mr-1" /> {weather.location}
            </div>
          </div>
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-4">
          <div className="text-center pb-2 border-b">
            <h4 className="font-medium text-lg">{t("weather")}</h4>
          </div>
          
          <form onSubmit={handleCitySearch} className="flex space-x-2">
            <Input 
              placeholder={t("enter-city-name")}
              value={city} 
              onChange={(e) => setCity(e.target.value)}
            />
            <Button type="submit" size="sm">{t("search")}</Button>
          </form>
          
          <div className="rounded-lg p-4 bg-primary/5 border">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h5 className="font-medium text-lg">{weather.location}</h5>
                <p className="text-muted-foreground">{weather.condition}</p>
              </div>
              <div className="text-3xl font-bold">{weather.temperature}°C</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="flex items-center gap-2">
                <ThermometerSun className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-sm text-muted-foreground">{t("feels-like")}</div>
                  <div className="font-medium">{weather.feelsLike}°C</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm text-muted-foreground">{t("humidity")}</div>
                  <div className="font-medium">{weather.humidity}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-sm text-muted-foreground">{t("wind")}</div>
                  <div className="font-medium">{weather.windSpeed} km/h</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <WeatherForecast location={weather.location} hourlyData={weather.hourlyForecast} />
          </div>
          
          <div className="text-xs text-center text-muted-foreground">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WeatherWidget;
