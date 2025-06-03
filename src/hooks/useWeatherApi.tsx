
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  description: string;
  main: string;
  icon: string;
}

export const useWeatherApi = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchWeather = async (city: string, apiKey: string) => {
    setIsLoading(true);
    console.log(`Fetching weather data for: ${city}`);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
      );

      console.log('API Response status:', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        } else if (response.status === 404) {
          throw new Error('City not found. Please check the city name and try again.');
        } else {
          throw new Error(`Weather data fetch failed: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log('Weather data received:', data);

      const weatherData: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        main: data.weather[0].main,
        icon: data.weather[0].icon,
      };

      setWeatherData(weatherData);
      
      toast({
        title: "Weather Updated",
        description: `Successfully loaded weather for ${weatherData.city}`,
      });

    } catch (error) {
      console.error('Error fetching weather:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    weatherData,
    isLoading,
    fetchWeather,
  };
};
