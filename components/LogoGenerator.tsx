import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useAuth } from '../contexts/AuthContext';

const LoadingSpinner: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-lg">
    <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);

const PlaceholderIcon: React.FC = () => (
    <svg className="w-24 h-24 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    </svg>
);


const LogoGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { apiKey, user, openManageModal } = useAuth();

    const examplePrompts = [
        "a minimalist fox icon",
        "a blue rocket ship",
        "geometric brain logo",
        "a wave and sun combined",
    ];

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt) {
            setError('Please enter a description for your logo.');
            return;
        }

        if (!user) {
            setError('Please log in or sign up to generate a logo.');
            return;
        }

        if (!apiKey) {
            setError('Please set your Gemini API key to use this feature.');
            openManageModal();
            return;
        }

        setLoading(true);
        setError('');
        setImageUrl('');

        try {
            const ai = new GoogleGenAI({ apiKey });
            const fullPrompt = `a modern, minimalist vector logo for a tech company, based on the concept of "${prompt}". The logo should be simple, clean, and iconic, suitable for a web favicon. It should be on a transparent background.`;
            
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: fullPrompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/png',
                    aspectRatio: '1:1',
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
                const url = `data:image/png;base64,${base64ImageBytes}`;
                setImageUrl(url);
            } else {
                 throw new Error("No image was generated.");
            }

        } catch (err) {
            console.error("Gemini API error:", err);
            setError("Sorry, we couldn't generate the logo. Please check your API key or try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <section id="logo-generator" className="py-20 md:py-28 bg-gray-900/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Generate a Logo with AI
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                        Describe your brand, and our AI will create a unique logo for your next project in seconds.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-xl">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="w-full h-56 bg-gray-900 rounded-lg flex items-center justify-center relative border border-gray-700">
                                {loading && <LoadingSpinner />}
                                {!loading && imageUrl && (
                                    <img src={imageUrl} alt="Generated logo" className="object-contain max-w-full max-h-full p-4 animate-fade-in" />
                                )}
                                {!loading && !imageUrl && <PlaceholderIcon />}
                            </div>
                            <form onSubmit={handleGenerate} className="space-y-4">
                                <div>
                                    <label htmlFor="logo-prompt" className="sr-only">Logo description</label>
                                    <input
                                        id="logo-prompt"
                                        type="text"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="e.g., a minimalist fox icon"
                                        className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        disabled={loading}
                                    />
                                </div>
                                 <div className="text-xs text-gray-500">Examples: {examplePrompts.map(p => <button type="button" key={p} onClick={() => setPrompt(p)} className="underline hover:text-gray-300 ml-2 disabled:opacity-50" disabled={loading}>{p}</button>)}</div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md shadow-lg transition-all duration-300"
                                    disabled={loading}
                                >
                                    {loading ? 'Generating...' : 'Generate Logo'}
                                </button>
                                {error && <p className="text-red-400 mt-2 text-sm text-center">{error}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                  0% { opacity: 0; transform: scale(0.95); }
                  100% { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
        </section>
    );
};

export default LogoGenerator;