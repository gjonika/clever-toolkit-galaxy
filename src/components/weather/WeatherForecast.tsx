
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

type HourlyForecast = {
  hour: string;
  temperature: number;
  condition: string;
};

interface WeatherForecastProps {
  location: string;
  hourlyData: HourlyForecast[];
}

const WeatherForecast = ({ location, hourlyData }: WeatherForecastProps) => {
  const { t } = useLanguage();

  const chartData = hourlyData.map((data) => ({
    hour: data.hour,
    temperature: data.temperature,
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">{t("hourly-forecast")}: {location}</h3>
      
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <XAxis 
              dataKey="hour" 
              tick={{ fontSize: 11 }} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11 }} 
              tickLine={false}
              axisLine={false}
              width={30}
              label={{ value: `${t("temp")} °C`, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: 'var(--foreground)' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                color: 'var(--card-foreground)',
                fontSize: '12px',
                padding: '8px',
              }}
              formatter={(value) => [`${value}°C`, t("temp")]}
              labelFormatter={(label) => label}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="var(--primary)" 
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 1 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherForecast;
