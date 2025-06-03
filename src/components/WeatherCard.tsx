
import React from 'react';
import { Cloud, CloudRain, Sun } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  description: string;
  main: string;
  icon: string;
}

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard = ({ weatherData }: WeatherCardProps) => {
  const getWeatherIcon = (main: string, iconCode: string) => {
    // Use OpenWeatherMap icon URL for more accurate weather representation
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getLocalIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case 'clear':
        return <Sun className="w-16 h-16 text-yellow-400" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-16 h-16 text-blue-400" />;
      case 'clouds':
        return <Cloud className="w-16 h-16 text-gray-400" />;
      default:
        return <Cloud className="w-16 h-16 text-gray-400" />;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm border-slate-600 p-8 text-center animate-fade-in">
      <div className="space-y-6">
        {/* City Name */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {weatherData.city}
          </h2>
          <p className="text-slate-400 text-sm uppercase tracking-wider">
            {weatherData.country}
          </p>
        </div>

        {/* Weather Icon */}
        <div className="flex justify-center">
          <img
            src={getWeatherIcon(weatherData.main, weatherData.icon)}
            alt={weatherData.description}
            className="w-24 h-24 drop-shadow-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden">
            {getLocalIcon(weatherData.main)}
          </div>
        </div>

        {/* Temperature */}
        <div>
          <div className="text-5xl font-bold text-white mb-2">
            {Math.round(weatherData.temperature)}°C
          </div>
          <p className="text-slate-300 capitalize text-lg">
            {weatherData.description}
          </p>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-1 gap-4 pt-4 border-t border-slate-600">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 uppercase tracking-wide text-sm">
              Humidity
            </span>
            <span className="text-white font-semibold">
              {weatherData.humidity}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 uppercase tracking-wide text-sm">
              Condition
            </span>
            <span className="text-white font-semibold capitalize">
              {weatherData.main}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
