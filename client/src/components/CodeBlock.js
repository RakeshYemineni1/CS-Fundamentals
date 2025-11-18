import React from 'react';

const CodeBlock = ({ code, language = 'java' }) => {
  return (
    <div className="code-block">
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;