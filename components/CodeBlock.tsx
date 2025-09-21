import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
    <code className="text-sm text-indigo-300 font-mono">
      {children}
    </code>
  </pre>
);

export default CodeBlock;