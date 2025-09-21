import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const KeyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
    </svg>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, openManageModal } = useAuth();

  const handleLinkClick = (path: string) => {
    setIsMenuOpen(false);
    if (path.includes('#')) {
      const [basePath, hash] = path.split('#');
      if (window.location.pathname !== basePath) {
        // We need to navigate first, then scroll. Let the effect in App.tsx handle it.
      } else {
        // We are on the same page, so just scroll.
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Features', to: '/#features' },
    { name: 'AI', to: '/#ai-features' },
    { name: 'Pricing', to: '/pricing' },
    { name: 'Docs', to: '/documentation' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-gray-900/10 bg-gray-900/75">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl">
            <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Aenzbidev</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => handleLinkClick(link.to)}
                className={({ isActive, isPending }) => {
                  // For hash links, we need to check the path manually
                  const isHashActive = window.location.hash === link.to.split('#')[1] && window.location.pathname === '/';
                  return `text-gray-300 hover:text-white transition-colors duration-200 ${(isActive && !link.to.includes('#')) || isHashActive ? 'text-white font-semibold' : ''}`;
                }}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button
                    onClick={openManageModal}
                    className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700"
                    aria-label="Manage API Key"
                    title="Manage API Key"
                  >
                    <KeyIcon />
                </button>
                <NavLink to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Dashboard
                </NavLink>
                <button
                  onClick={logout}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-all duration-300"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Log In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-all duration-300"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={() => handleLinkClick(link.to)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-center py-2"
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="border-t border-gray-700 my-2"></div>
              {user ? (
                <>
                  <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors duration-200 text-center py-2">
                    Dashboard
                  </NavLink>
                  <button
                    onClick={() => {
                      openManageModal();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-center py-2 flex items-center justify-center gap-2"
                  >
                    <KeyIcon /> Manage API Key
                  </button>
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-all duration-300 text-center"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors duration-200 text-center py-2">
                    Log In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-all duration-300 text-center"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
