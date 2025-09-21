import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CodeBlock from './CodeBlock';

const ProjectViewPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectById } = useAuth();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) {
    return (
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-red-400">Project Not Found</h1>
        <p className="text-gray-400 mt-4">The project you are looking for does not exist or has been deleted.</p>
        <Link to="/dashboard" className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-all">
          Back to Dashboard
        </Link>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-10">
        <div className="mb-8">
            <Link to="/dashboard" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white truncate">{project.name}</h1>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-lg text-indigo-400 hover:underline break-all">{project.url}</a>
        </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ height: 'calc(100vh - 250px)' }}>
        <div className="flex flex-col bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <h2 className="text-xl font-semibold p-4 bg-gray-900/80 border-b border-gray-700 flex-shrink-0 text-white">Live Preview</h2>
          <div className="flex-grow bg-white">
            <iframe srcDoc={project.code} title="Live Preview" className="w-full h-full" sandbox="allow-scripts allow-forms" />
          </div>
        </div>
        <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
          <h2 className="text-xl font-semibold p-4 bg-gray-900/80 border-b border-gray-700 flex-shrink-0 text-white">Generated Code</h2>
          <div className="p-4 text-sm overflow-auto flex-grow">
              <CodeBlock>{project.code}</CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectViewPage;