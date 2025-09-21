import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ApiKeyModal from '../components/ApiKeyModal';
import { Project } from '../types';

interface User {
  name?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  apiKey: string | null;
  projects: Project[];
  isReady: boolean;
  isManageModalOpen: boolean;
  login: (user: User) => void;
  signup: (user: User) => void;
  logout: () => void;
  updateApiKey: (key: string) => boolean;
  addProject: (project: Omit<Project, 'thumbnail'>) => void;
  deleteProject: (projectId: string) => void;
  getProjectById: (projectId: string) => Project | undefined;
  openManageModal: () => void;
  closeManageModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('aenzbidev-user');
      const storedKey = localStorage.getItem('aenzbidev-api-key');
      const storedProjects = localStorage.getItem('aenzbidev-projects');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedKey) {
        setApiKey(storedKey);
      }
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      // Clear potentially corrupted storage
      localStorage.clear();
    } finally {
      setIsReady(true);
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('aenzbidev-user', JSON.stringify(userData));
    setUser(userData);
    if (!apiKey) {
        setIsManageModalOpen(true);
    }
  };

  const signup = (userData: User) => {
    // In a real app, this would hit an API. Here we just log in.
    login(userData);
  };

  const logout = () => {
    localStorage.removeItem('aenzbidev-user');
    localStorage.removeItem('aenzbidev-api-key');
    // Optional: clear projects on logout? For this app, let's keep them.
    // localStorage.removeItem('aenzbidev-projects');
    setUser(null);
    setApiKey(null);
    window.location.href = '/'; // Redirect to home on logout
  };

  const updateApiKey = (key: string): boolean => {
    if (key.trim().length < 10) return false;
    localStorage.setItem('aenzbidev-api-key', key);
    setApiKey(key);
    return true;
  };

  const addProject = (projectData: Omit<Project, 'thumbnail'>) => {
    const newProject: Project = { ...projectData, thumbnail: '' }; // thumbnail can be generated later
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem('aenzbidev-projects', JSON.stringify(updatedProjects));
  };
  
  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('aenzbidev-projects', JSON.stringify(updatedProjects));
  };

  const getProjectById = (projectId: string) => {
    return projects.find(p => p.id === projectId);
  };


  const value = {
    user,
    apiKey,
    projects,
    isReady,
    isManageModalOpen,
    login,
    signup,
    logout,
    updateApiKey,
    addProject,
    deleteProject,
    getProjectById,
    openManageModal: () => setIsManageModalOpen(true),
    closeManageModal: () => setIsManageModalOpen(false),
  };

  return (
    <AuthContext.Provider value={value}>
      {!isReady ? (
        <div className="bg-gray-900 min-h-screen"></div> // Or a loading spinner
      ) : (
        <>
          {children}
          {user && <ApiKeyModal />}
        </>
      )}
    </AuthContext.Provider>
  );
};
