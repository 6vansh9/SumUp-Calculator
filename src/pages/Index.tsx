
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ApiKeyInput from '@/components/ApiKeyInput';
import { useWeatherApi } from '@/hooks/useWeatherApi';

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const { weatherData, isLoading, fetchWeather } = useWeatherApi();

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedApiKey = localStorage.getItem('openweather_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('openweather_api_key', key);
    setApiKey(key);
    console.log('API key set and stored in localStorage');
  };

  const handleSearch = (city: string) => {
    if (apiKey) {
      fetchWeather(city, apiKey);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('openweather_api_key');
    setApiKey(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%25239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22m36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-wider">
              SkyCast
            </h1>
            <p className="text-slate-300 text-lg max-w-md mx-auto">
              Professional Weather Dashboard with Real-time Data
            </p>
            {apiKey && (
              <button
                onClick={handleClearApiKey}
                className="text-sm text-slate-400 hover:text-slate-300 underline transition-colors"
              >
                Change API Key
              </button>
            )}
          </div>

          {/* API Key Input or Weather Dashboard */}
          {!apiKey ? (
            <div className="flex justify-center">
              <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Search Bar */}
              <div className="flex justify-center">
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />
              </div>

              {/* Weather Card */}
              {weatherData && (
                <div className="flex justify-center">
                  <WeatherCard weatherData={weatherData} />
                </div>
              )}

              {/* Instructions */}
              {!weatherData && !isLoading && (
                <div className="text-center">
                  <p className="text-slate-400 text-lg">
                    Enter a city name to get started
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
