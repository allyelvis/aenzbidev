import React from 'react';

// Icons using Heroicons (https://heroicons.com/)
const GlobeAltIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>;
const LightningBoltIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const ChipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3m6-9h3m-3 6h3m-9-9h3m-3 6h3" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 9a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const TerminalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>;
const CloudUploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.88M12 11v9m-4-4l4 4 4-4" /></svg>;
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118 0c0-3.807-.983-7.42-2.618-10.944z" /></svg>;

export const FEATURES = [
  {
    icon: <GlobeAltIcon />,
    title: 'Global Edge Network',
    description: 'Deploy your applications to our global network of servers, ensuring low latency and high availability for your users worldwide.',
  },
  {
    icon: <LightningBoltIcon />,
    title: 'Automated Deployment & Git Integration',
    description: 'Push new code and Aenzbidev automatically builds and deploys your application. Every pull request gets a unique preview URL for easy review.',
  },
  {
    icon: <CodeIcon />,
    title: 'Framework Agnostic',
    description: 'Whether you are using React, Vue, Svelte, or any other modern framework, our platform is designed to support your workflow.',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Custom Domains & SSL',
    description: 'Easily add your custom domains. We automatically provide and renew free SSL certificates for every deployment.',
  },
  {
    icon: <TerminalIcon />,
    title: 'Powerful CLI',
    description: 'Manage your deployments, domains, and environment variables directly from your terminal with our intuitive command-line interface.',
  },
  {
    icon: <CloudUploadIcon />,
    title: 'Serverless Functions',
    description: 'Build and deploy serverless APIs alongside your frontend. Scale automatically without managing servers.',
  },
];

export const AI_FEATURES = [
  {
    icon: <ChipIcon />,
    title: 'Generative UI',
    description: 'Leverage our AI SDK to create dynamic, responsive, and personalized user interfaces based on user input and context.',
  },
  {
    icon: <CodeIcon />,
    title: 'AI-Powered Code Generation',
    description: 'Accelerate your development process with AI-assisted code completion, component generation, and bug fixing.',
  },
  {
    icon: <TerminalIcon />,
    title: 'Intelligent Workflows',
    description: 'Automate complex tasks and create intelligent workflows that adapt to your application\'s needs and user behavior.',
  },
];