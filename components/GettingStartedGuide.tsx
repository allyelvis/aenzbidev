import React from 'react';
import CodeBlock from './CodeBlock';
import { Link } from 'react-router-dom';

const GettingStartedGuide: React.FC = () => {
  return (
    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
      <h2 className="text-3xl font-bold text-white">Welcome to Aenzbidev!</h2>
      <p className="lead text-xl text-gray-400">
        This guide will walk you through the essential steps to get your first project deployed and running on our global edge network. Let's go from zero to deployed in just a few minutes.
      </p>

      <h3 className="text-2xl font-bold mt-10 mb-4 text-white">Step 1: Set Your API Key</h3>
      <p>
        Aenzbidev leverages the power of AI for features like code and logo generation. To enable these, you need to provide a Google Gemini API Key. If you haven't already, a modal should have prompted you for this.
      </p>
      <p>
        You can get your free key from{' '}
        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
          Google AI Studio
        </a>. Your key is stored only in your browser's session and is never sent to our servers. You can manage your key at any time using the key icon in the header.
      </p>

      <h3 className="text-2xl font-bold mt-10 mb-4 text-white">Step 2: Deploy a Project with AI</h3>
      <p>
        The fastest way to see Aenzbidev in action is to use our AI deployment modal.
      </p>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Click the "Start Deploying" button on the <Link to="/" className="text-indigo-400 hover:underline">homepage</Link>.</li>
        <li>In the modal, describe the website or component you want to build. For example, "A portfolio page for a graphic designer".</li>
        <li>Click "Generate Code". The AI will write the HTML, CSS, and JavaScript for you.</li>
        <li>Preview the result, and if you're happy, click "Deploy" to publish it to a live URL.</li>
      </ol>

      <h3 className="text-2xl font-bold mt-10 mb-4 text-white">Step 3: Connect Your Own Repository</h3>
      <p>
        For real projects, you'll want to connect your own Git repository. This enables continuous deployment: every time you push a change, we automatically build and deploy it for you.
      </p>
      <p>
        Our <button onClick={() => {
            // A bit of a hack to switch guides, but works for this context
            const gitLink = document.evaluate("//button[contains(., 'Git Integration')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLElement;
            gitLink?.click();
        }} className="text-indigo-400 hover:underline p-0 m-0 bg-transparent border-none cursor-pointer">Git Integration Guide</button> provides a detailed walkthrough on how to connect your GitHub, GitLab, or Bitbucket account and configure your build settings.
      </p>

      <h3 className="text-2xl font-bold mt-10 mb-4 text-white">What's Next?</h3>
      <p>
        You've only scratched the surface! From here, you can explore:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Setting up <Link to="/documentation" className="text-indigo-400 hover:underline">Custom Domains</Link> for your projects.</li>
        <li>Generating a unique logo for your brand with our <Link to="/#logo-generator" className="text-indigo-400 hover:underline">AI Logo Generator</Link>.</li>
        <li>Exploring our competitive <Link to="/pricing" className="text-indigo-400 hover:underline">Pricing Tiers</Link> for when your project is ready to scale.</li>
      </ul>
    </div>
  );
};

export default GettingStartedGuide;