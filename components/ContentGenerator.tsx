import React, { useState } from 'react';
import { generateMarketingContent } from '../services/geminiService';
import { GenerationRequest } from '../types';
import { Sparkles, Copy, Loader2, Send } from 'lucide-react';

export const ContentGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<GenerationRequest['type']>('Event Invitation');
  const [tone, setTone] = useState<GenerationRequest['tone']>('Professional');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setGeneratedText('');
    
    const result = await generateMarketingContent({ topic, type, tone });
    
    setGeneratedText(result);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    alert("Copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto my-12 border border-gray-200">
      <div className="bg-school-900 px-6 py-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-school-gold" />
          AI Content Assistant
        </h3>
        <span className="text-blue-200 text-sm">Create By Thanuskant</span>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <p className="text-gray-600 text-sm">
            Use this tool to draft emails, social posts, or event descriptions for the association.
          </p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-school-900 focus:outline-none"
            >
              <option>Event Invitation</option>
              <option>Fundraising Appeal</option>
              <option>Social Media Post</option>
              <option>Email Newsletter</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
            <select 
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-school-900 focus:outline-none"
            >
              <option>Professional</option>
              <option>Nostalgic</option>
              <option>Exciting</option>
              <option>Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Key Details</label>
            <textarea
              rows={4}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., Class of 1994 reunion, Need volunteers for career day..."
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-school-900 focus:outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className={`w-full flex items-center justify-center py-3 px-4 rounded-md text-white font-medium transition-colors ${
              loading || !topic 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-school-900 hover:bg-school-800'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Generate Draft
              </>
            )}
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 flex flex-col h-full min-h-[300px]">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <span className="text-sm font-semibold text-gray-500">Output</span>
            {generatedText && (
              <button 
                onClick={copyToClipboard}
                className="text-school-900 hover:text-school-700 flex items-center text-xs font-medium"
              >
                <Copy className="w-3 h-3 mr-1" /> Copy
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-auto whitespace-pre-wrap text-sm text-gray-800">
            {generatedText ? (
              generatedText
            ) : (
              <span className="text-gray-400 italic">Generated content will appear here...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};