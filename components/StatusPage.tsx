import React from 'react';

const StatusIndicator: React.FC<{ status: 'operational' | 'degraded' | 'outage' }> = ({ status }) => {
  const statusConfig = {
    operational: { text: 'Operational', color: 'bg-green-500', textColor: 'text-green-300' },
    degraded: { text: 'Degraded Performance', color: 'bg-yellow-500', textColor: 'text-yellow-300' },
    outage: { text: 'Major Outage', color: 'bg-red-500', textColor: 'text-red-300' },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded-full mr-3 ${config.color}`}></div>
      <span className={config.textColor}>{config.text}</span>
    </div>
  );
};


const StatusPage: React.FC = () => {
    // In a real application, this data would come from an API.
  const systems = [
    { name: 'Global Edge Network', status: 'operational' },
    { name: 'API Services', status: 'operational' },
    { name: 'Deployments', status: 'operational' },
    { name: 'AI Services (Gemini)', status: 'operational' },
    { name: 'Authentication', status: 'operational' },
    { name: 'Dashboard', status: 'operational' },
  ];

  const allSystemsOperational = systems.every(s => s.status === 'operational');

  return (
    <section id="status" className="container mx-auto px-6 py-16 min-h-[calc(100vh-200px)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          System Status
        </h1>
        <p className="text-lg text-gray-400 mb-12">
          Current status of all Aenzbidev services. We are committed to transparency and will post all updates here.
        </p>

        <div className="bg-gray-800/50 border border-green-500/30 rounded-lg p-6 mb-10">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-green-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold text-white">All Systems Operational</h2>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700/60 rounded-lg shadow-lg">
            <ul className="divide-y divide-gray-700/60">
                {systems.map((system) => (
                    <li key={system.name} className="p-6 flex justify-between items-center">
                        <span className="text-lg text-gray-200">{system.name}</span>
                        <StatusIndicator status={system.status as 'operational' | 'degraded' | 'outage'} />
                    </li>
                ))}
            </ul>
        </div>

        <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-white">Past Incidents</h2>
            <div className="bg-gray-800/50 border border-gray-700/60 rounded-lg p-8 text-center">
                <p className="text-gray-400">No incidents reported in the last 90 days.</p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default StatusPage;