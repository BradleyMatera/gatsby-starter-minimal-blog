// src/@lekoarts/gatsby-theme-minimal-blog/components/code.tsx
import React from 'react';
import { Highlight } from 'prism-react-renderer';

const Code: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => {
  let codeString = '';
  if (typeof children === 'string') {
    codeString = children;
  } else if (React.isValidElement(children) && children.props) {
    codeString = typeof children.props.children === 'string' ? children.props.children : '';
  }
  if (!codeString) {
    codeString = '';
  }

  const language = className ? className.replace(/language-/, '') : 'text';

  return (
    <Highlight
      code={codeString.trim()}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} custom-pre`} style={{ ...style, padding: '10px', overflow: 'auto' }}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;