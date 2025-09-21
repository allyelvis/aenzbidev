import React, { useState } from 'react';
import GitIntegrationGuide from './GitIntegrationGuide';
import GettingStartedGuide from './GettingStartedGuide';

type Guide = 'getting-started' | 'git-integration';

const Documentation: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState<Guide>('getting-started');

  const guides = {
    'getting-started': { title: 'Getting Started', component: <GettingStartedGuide /> },
    'git-integration': { title: 'Git Integration', component: <GitIntegrationGuide /> },
  };

  const NavLink: React.FC<{ guideKey: Guide }> = ({ guideKey }) => {
    const isActive = activeGuide === guideKey;
    return (
      <button
        onClick={() => setActiveGuide(guideKey)}
        className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
          isActive ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
        }`}
      >
        {guides[guideKey].title}
      </button>
    );
  };

  return (
    <section id="documentation" className="container mx-auto px-6 py-16 min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Documentation
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <aside className="md:col-span-3 lg:col-span-2">
          <nav className="sticky top-24 space-y-2">
            <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Guides</h3>
            <NavLink guideKey="getting-started" />
            <NavLink guideKey="git-integration" />
          </nav>
        </aside>

        {/* Content Area */}
        <div className="md:col-span-9 lg:col-span-10">
          {guides[activeGuide].component}
        </div>
      </div>
    </section>
  );
};

export default Documentation;