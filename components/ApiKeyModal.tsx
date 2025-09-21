import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ApiKeyModal: React.FC = () => {
  const { isManageModalOpen, closeManageModal, apiKey, updateApiKey, logout } = useAuth();
  const [newKey, setNewKey] = useState('');
  const [error, setError] = useState('');

  const maskKey = (key: string | null) => {
    if (!key) return 'Not set';
    if (key.length < 8) return '****';
    return `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey) {
        setError('Please enter a new key to save.');
        return;
    }
    if (newKey.trim().length < 10) {
      setError('Please enter a valid Gemini API key.');
      return;
    }
    const success = updateApiKey(newKey);
    if (success) {
      setNewKey('');
      setError('');
      closeManageModal();
    } else {
      setError('An unexpected error occurred. Could not save the key.');
    }
  };

  const handleClearAndLogout = () => {
    logout(); // This will clear the key and user session
    closeManageModal();
  };

  if (!isManageModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300" onClick={closeManageModal}>
      <div 
        className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl w-full max-w-md p-8 relative transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={closeManageModal} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <h2 className="text-2xl font-bold mb-2 text-white">Manage API Key</h2>
        <p className="text-gray-400 mb-6">Update your Gemini API key or clear it to log out.</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Current Key</label>
          <div className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-3 text-gray-400 font-mono">
            {maskKey(apiKey)}
          </div>
        </div>

        <form onSubmit={handleSave}>
          <label htmlFor="new-api-key" className="block text-sm font-medium text-gray-300 mb-2">New API Key</label>
          <input
            id="new-api-key"
            type="password"
            value={newKey}
            onChange={(e) => {
              setNewKey(e.target.value);
              setError('');
            }}
            placeholder="Enter new key to update"
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
          <button type="submit" className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-colors">
            Save New Key
          </button>
        </form>
        
        <div className="mt-6 border-t border-gray-700 pt-6">
           <button onClick={handleClearAndLogout} className="w-full bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-colors">
            Clear Key & Log Out
           </button>
        </div>
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

export default ApiKeyModal;