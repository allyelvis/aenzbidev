import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DeployModal from './DeployModal';
import { Project } from '../types';

const ProjectCard: React.FC<{ project: Project; onDelete: (id: string) => void; }> = ({ project, onDelete }) => {
    const [thumbnail, setThumbnail] = useState<string>('');

    useEffect(() => {
        // Generate a data URL for the iframe content to use as a thumbnail
        const blob = new Blob([project.code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        setThumbnail(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [project.code]);
    
    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
            onDelete(project.id);
        }
    };

    return (
        <Link to={`/project/${project.id}`} className="block bg-gray-800/50 border border-gray-700/60 rounded-lg shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="w-full h-48 bg-gray-900 rounded-t-lg overflow-hidden">
                {thumbnail && <iframe src={thumbnail} title={project.name} className="w-full h-full transform scale-[0.5] origin-top-left" sandbox="" />}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-white truncate">{project.name}</h3>
                <p className="text-sm text-indigo-400 mb-2 truncate">{project.url.replace('https://', '')}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    <button onClick={handleDelete} className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-red-500/10">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </button>
                </div>
            </div>
        </Link>
    );
};

const DashboardPage: React.FC = () => {
  const { user, projects, deleteProject } = useAuth();
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  return (
    <>
      <section className="container mx-auto px-6 py-16 min-h-[calc(100vh-200px)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Dashboard
            </h1>
            <p className="text-lg text-gray-400 mt-2">Welcome back, {user?.name || user?.email}!</p>
          </div>
          <button
            onClick={() => setIsDeployModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 mt-6 md:mt-0 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            New Project
          </button>
        </div>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(project => (
              <ProjectCard key={project.id} project={project} onDelete={deleteProject} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg py-20">
            <h2 className="text-2xl font-bold text-white">No projects yet</h2>
            <p className="text-gray-400 mt-2 mb-6">Click "New Project" to deploy your first application with AI.</p>
            <button
                onClick={() => setIsDeployModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-6 rounded-md shadow-lg transition-all duration-300"
            >
                Create Your First Project
            </button>
          </div>
        )}
      </section>
      <DeployModal isOpen={isDeployModalOpen} onClose={() => setIsDeployModalOpen(false)} />
    </>
  );
};

export default DashboardPage;