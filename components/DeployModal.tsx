import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useAuth } from '../contexts/AuthContext';
import { Project } from '../types';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoadingSpinner: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center text-center h-64">
    <svg className="animate-spin h-10 w-10 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="text-lg text-gray-300">{message}</p>
  </div>
);

const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'generating' | 'preview' | 'deploying' | 'deployed'>('idle');
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');
  const [deployedUrl, setDeployedUrl] = useState('');
  const { apiKey, addProject } = useAuth();

  const examplePrompts = [
    "A simple portfolio for a photographer",
    "A landing page for a new SaaS product",
    "A coming soon page with a countdown timer",
    "A recipe card for chocolate chip cookies"
  ];

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStatus('idle');
        setPrompt('');
        setGeneratedCode('');
        setError('');
        setDeployedUrl('');
      }, 300); // Wait for closing animation
    }
  }, [isOpen]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError('Please enter a prompt to describe what you want to build.');
      return;
    }
    setStatus('generating');
    setError('');

    if (!apiKey) {
      setError('API Key not found. Please set your API key in the user menu.');
      setStatus('idle');
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are an expert web developer. Your task is to generate a complete, self-contained, and visually appealing HTML file including modern CSS (using flexbox/grid for layout) and functional JavaScript based on the user's prompt.
- The generated page must be responsive.
- The CSS and JS must be embedded within the HTML file in <style> and <script> tags respectively.
- Do not include any external dependencies or libraries.
- Use a modern, clean design aesthetic with a dark theme.
- Output only the raw HTML code, starting with <!DOCTYPE html> and nothing else. Do not wrap it in markdown backticks or add any explanations.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `User Prompt: "${prompt}"`,
        config: {
          systemInstruction: systemInstruction,
        },
      });
      
      let code = response.text.trim();
      if (code.startsWith('```html')) {
        code = code.substring(7, code.length - 3).trim();
      } else if (code.startsWith('```')) {
        code = code.substring(3).trim();
        if (code.endsWith('```')) {
            code = code.substring(0, code.length-3).trim();
        }
      }
      setGeneratedCode(code);
      setStatus('preview');
    } catch (err) {
      console.error('Gemini API error:', err);
      setError('Sorry, we couldn\'t generate the code. Please check your API key or try again later.');
      setStatus('idle');
    }
  };

  const handleDeploy = () => {
    setStatus('deploying');
    setError('');
    setTimeout(() => {
      const randomString = Math.random().toString(36).substring(2, 8);
      const newUrl = `https://${randomString}.aenzbidev.app`;
      setDeployedUrl(newUrl);

      const newProject: Omit<Project, 'thumbnail'> = {
        id: new Date().getTime().toString(),
        name: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
        url: newUrl,
        prompt: prompt,
        code: generatedCode,
        createdAt: new Date().toISOString(),
      };
      addProject(newProject);
      setStatus('deployed');
    }, 2000);
  };

  const handleFinish = () => {
    onClose();
  };

  if (!isOpen) return null;

  const modalWidth = status === 'preview' ? 'max-w-6xl' : 'max-w-2xl';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div 
        className={`bg-gray-800 border border-gray-700 rounded-lg shadow-2xl w-full ${modalWidth} p-8 relative transform transition-all duration-300 scale-95 opacity-0 animate-scale-in flex flex-col`}
        onClick={(e) => e.stopPropagation()}
        style={{ height: status === 'preview' ? '90vh' : 'auto' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10" aria-label="Close modal">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        {status === 'idle' && (
          <>
            <h2 className="text-2xl font-bold mb-2 text-white">Describe Your Vision</h2>
            <p className="text-gray-400 mb-6">Tell our AI what you want to build. Be as descriptive as you like.</p>
            <form onSubmit={handleGenerate}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A modern landing page for a new mobile app with a sign-up form..."
                className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 h-32 resize-none"
                aria-label="Application prompt"
              />
              <div className="text-sm text-gray-500 mb-4">Examples: {examplePrompts.map(p => <button type="button" key={p} onClick={() => setPrompt(p)} className="underline hover:text-gray-300 ml-2">{p}</button>)}</div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-md shadow-lg transition-colors">Generate Code</button>
              {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
            </form>
          </>
        )}

        {(status === 'generating' || status === 'deploying') && (
          <LoadingSpinner message={status === 'generating' ? 'Building your vision...' : 'Saving and deploying...'} />
        )}

        {status === 'preview' && (
          <div className="flex-grow flex flex-col min-h-0">
            <h2 className="text-2xl font-bold mb-4 text-white flex-shrink-0">Preview & Deploy</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow min-h-0">
              <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <h3 className="text-lg font-semibold p-3 bg-gray-900/80 border-b border-gray-700 flex-shrink-0">Generated Code</h3>
                <pre className="p-4 text-sm overflow-auto flex-grow"><code className="language-html text-gray-300 whitespace-pre-wrap">{generatedCode}</code></pre>
              </div>
              <div className="flex flex-col bg-white rounded-lg overflow-hidden border-4 border-gray-700">
                 <h3 className="text-lg font-semibold p-3 bg-gray-900/80 border-b border-gray-700 text-white flex-shrink-0">Live Preview</h3>
                <iframe srcDoc={generatedCode} title="Live Preview" className="w-full h-full flex-grow" sandbox="allow-scripts allow-forms" />
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center flex-shrink-0">
              <button onClick={() => setStatus('idle')} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-md shadow-lg transition-colors">Start Over</button>
              <button onClick={handleDeploy} className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-8 rounded-md shadow-lg transition-colors text-lg">Save & Deploy</button>
            </div>
          </div>
        )}

        {status === 'deployed' && (
          <div className="text-center py-10">
            <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h2 className="text-3xl font-bold mb-2 text-white">Project Created!</h2>
            <p className="text-gray-300 text-lg mb-6">Your new application is live and saved to your dashboard.</p>
            <a href={deployedUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-900 border border-gray-600 rounded-md px-4 py-3 text-indigo-400 font-mono text-center block hover:bg-gray-700 transition-colors">
              {deployedUrl}
            </a>
            <button onClick={handleFinish} className="mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-colors">Close</button>
          </div>
        )}

      </div>
      <style>{`
        @keyframes scale-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default DeployModal;