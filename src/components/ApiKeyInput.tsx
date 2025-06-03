
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Key, ExternalLink } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm border-slate-600 p-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Key className="w-12 h-12 text-blue-400" />
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-2">API Key Required</h3>
          <p className="text-slate-400 text-sm mb-4">
            Enter your OpenWeatherMap API key to get started with SkyCast
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter your API key..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
          />
          
          <Button
            type="submit"
            disabled={!apiKey.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
          >
            Set API Key
          </Button>
        </form>

        <div className="text-xs text-slate-500 space-y-2">
          <p>Don't have an API key?</p>
          <a
            href="https://openweathermap.org/api"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
          >
            Get one from OpenWeatherMap
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </Card>
  );
};

export default ApiKeyInput;
