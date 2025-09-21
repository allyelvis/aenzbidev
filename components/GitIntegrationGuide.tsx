import React from 'react';
import CodeBlock from './CodeBlock';

const GitIntegrationGuide: React.FC = () => {
  return (
    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
      <p className="lead text-xl text-gray-400">
        Unlock the full potential of Aenzbidev by connecting your Git repository. Our seamless integration automatically builds, previews, and deploys your projects with every push.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-4 text-white">Connecting Your Repository</h2>
      <p>
        Follow these steps to connect your GitHub, GitLab, or Bitbucket account and import your project.
      </p>
      <ol className="list-decimal pl-5 space-y-4">
        <li>
          <strong>Log in to your Aenzbidev Dashboard:</strong> Navigate to the "Projects" section and click "New Project".
        </li>
        <li>
          <strong>Import Git Repository:</strong> You will be prompted to connect your Git provider. Authorize Aenzbidev to access your repositories.
        </li>
        <li>
          <strong>Select a Repository:</strong> Once connected, you'll see a list of your available repositories. Choose the one you wish to deploy. Aenzbidev will automatically detect the framework (e.g., React, Vue, Next.js).
        </li>
        <li>
          <strong>Configure and Deploy:</strong> Adjust the build commands or environment variables if needed, then click "Deploy". Your first deployment will begin immediately.
        </li>
      </ol>

      <h2 className="text-3xl font-bold mt-12 mb-4 text-white">Configuring Build Settings</h2>
      <p>
        For advanced customization, you can add an <code>aenzbidev.json</code> file to the root of your repository. This allows you to override the default build settings detected by our platform.
      </p>
      <p>Here is an example configuration for a standard React application created with Vite:</p>
      <CodeBlock>
{`{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "environment": {
    "API_URL": "https://api.example.com",
    "ENABLE_FEATURE_X": "true"
  }
}`}
      </CodeBlock>
      <ul className="list-disc pl-5 space-y-2">
        <li><code>framework</code>: Helps Aenzbidev optimize the build process.</li>
        <li><code>buildCommand</code>: The command to run to build your application.</li>
        <li><code>outputDirectory</code>: The directory containing the production-ready static files.</li>
        <li><code>environment</code>: A set of environment variables to be available during the build process.</li>
      </ul>


      <h2 className="text-3xl font-bold mt-12 mb-4 text-white">Managing Deployments</h2>
      <p>
        Aenzbidev makes deployment management intuitive and powerful.
      </p>
      <h3 className="text-2xl font-semibold mt-6 mb-3 text-white">Preview Deployments</h3>
      <p>
        Every time you push a new commit to a pull request, Aenzbidev automatically builds and deploys a unique preview version of your site. The URL is then posted as a comment on the pull request, allowing you and your team to review changes in a live environment before merging to production.
      </p>
      <h3 className="text-2xl font-semibold mt-6 mb-3 text-white">Production Branch</h3>
      <p>
        By default, your main branch (e.g., <code>main</code> or <code>master</code>) is considered the production branch. Any commits pushed directly to this branch will trigger a production deployment, making your changes live to the public.
      </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3 text-white">Rollbacks</h3>
      <p>
        If a deployment introduces a bug, you can instantly roll back to any previous deployment. In your project's "Deployments" tab, simply find the desired deployment in the history and click "Promote to Production".
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-4 text-white">Custom Domains &amp; SSL</h2>
      <p>
        Aenzbidev makes it easy to use your own domain for your deployed projects. We also provide free, automatically renewing SSL certificates for all custom domains to ensure your site is secure.
      </p>
      <h3 className="text-2xl font-semibold mt-6 mb-3 text-white">Adding Your Domain</h3>
      <ol className="list-decimal pl-5 space-y-2">
          <li>Navigate to your project settings in the Aenzbidev dashboard and select the "Domains" tab.</li>
          <li>Enter your custom domain (e.g., <code>www.yourdomain.com</code>) and click "Add".</li>
      </ol>

      <h3 className="text-2xl font-semibold mt-6 mb-3 text-white">Configuring DNS Records</h3>
      <p>
        After adding your domain, you'll need to update the DNS records with your domain registrar or DNS provider (e.g., GoDaddy, Namecheap, Cloudflare).
      </p>
      <p>
        <strong>For Root Domains (e.g., <code>yourdomain.com</code>):</strong> Use an <code>A</code> record pointing to Aenzbidev's IP address.
      </p>
      <CodeBlock>
{`Type:  A
Name:  @
Value: 76.76.21.21`}
      </CodeBlock>
      <p>
        <strong>For Subdomains (e.g., <code>www.yourdomain.com</code>):</strong> It's recommended to use a <code>CNAME</code> record pointing to our servers.
      </p>
       <CodeBlock>
{`Type:  CNAME
Name:  www
Value: cname.aenzbi.com`}
      </CodeBlock>
      <p>
        Once your DNS records are correctly configured, Aenzbidev will automatically verify domain ownership and provision an SSL certificate. This process can take a few minutes up to a few hours, depending on DNS propagation.
      </p>


      <h2 className="text-3xl font-bold mt-12 mb-4 text-white">Troubleshooting</h2>
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-6">
        <div>
            <h3 className="font-semibold text-2xl text-white mb-3">Build Fails</h3>
            <p className="text-gray-400">
                If your deployment status shows "Failed", the first step is to inspect the build logs. To access them, navigate to your project's "Deployments" tab, click on the failed deployment (usually highlighted in red), and you will see a detailed, real-time output of the build process. These logs are crucial for identifying the exact point of failure.
            </p>
        </div>

        <div>
            <h3 className="text-2xl font-semibold text-white mb-3">Interpreting Common Log Errors</h3>
            <p className="text-gray-400 mb-4">
                Here are some common errors you might find in the logs and how to resolve them:
            </p>

            <h4 className="font-semibold text-xl text-white mt-4 mb-2">Error: Missing Script</h4>
            <CodeBlock>
{`npm ERR! Missing script: "build"
npm ERR!
npm ERR! To see a list of scripts, run:
npm ERR!   npm run`}
            </CodeBlock>
            <p className="text-gray-400">
                <strong>Meaning:</strong> Aenzbidev tried to run <code>npm run build</code>, but a "build" script is not defined in your <code>package.json</code> file.
                <br/>
                <strong>Solution:</strong> Add a build script to your <code>package.json</code> or update the "Build Command" in your Aenzbidev project settings to match the correct script (e.g., <code>npm run export</code> for some frameworks).
            </p>

            <h4 className="font-semibold text-xl text-white mt-4 mb-2">Error: Module Not Found</h4>
            <CodeBlock>
{`Failed to compile.
./src/components/Header.js
Module not found: Can't resolve './Navbar' in '/app/src/components'`}
            </CodeBlock>
            <p className="text-gray-400">
                <strong>Meaning:</strong> Your code is trying to import a file or module that doesn't exist at the specified path. This often happens due to typos or incorrect file paths.
                <br/>
                <strong>Solution:</strong> Check the file path in <code>Header.js</code>. Ensure that the file <code>Navbar.js</code> exists and that the path and capitalization are correct.
            </p>

            <h4 className="font-semibold text-xl text-white mt-4 mb-2">Error: Command Not Found</h4>
            <CodeBlock>
{`sh: 1: yarn: not found`}
            </CodeBlock>
            <p className="text-gray-400">
                <strong>Meaning:</strong> The build is configured to use <code>yarn</code>, but the project is likely set up with <code>npm</code>, or vice versa.
                <br/>
                <strong>Solution:</strong> Go to your project settings in the Aenzbidev dashboard and change the "Package Manager" from Yarn to NPM (or vice versa), or ensure your repository includes the correct lock file (<code>package-lock.json</code> for npm, <code>yarn.lock</code> for Yarn).
            </p>
        </div>

        <div>
            <h3 className="font-semibold text-2xl text-white mt-4 mb-2">Environment Variables Not Working</h3>
            <p className="text-gray-400">
              Make sure you've added the environment variables in the project settings on the Aenzbidev dashboard or in your <code>aenzbidev.json</code>. Remember to redeploy after adding or changing variables for them to take effect. Variables are case-sensitive and must be prefixed with your framework's specific prefix (e.g., <code>VITE_</code> for Vite, <code>NEXT_PUBLIC_</code> for Next.js) to be exposed to the browser.
            </p>
        </div>
      </div>
      
    </div>
  );
};

export default GitIntegrationGuide;