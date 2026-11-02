import * as React from "react";
import { Highlight } from "prism-react-renderer";
import "../../../styles/editorial.css";

const Code = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  const child = React.isValidElement<{ children?: React.ReactNode; className?: string }>(children) ? children : null;
  const code = typeof children === "string" ? children : typeof child?.props.children === "string" ? child.props.children : "";
  const language = (className || child?.props.className || "language-text").replace(/language-/, "");
  const [status, setStatus] = React.useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copied to clipboard");
    } catch {
      setStatus("Copy unavailable. Select the code to copy it.");
    }
  };
  return (
    <div className="editorial-code">
      <div className="editorial-code__toolbar">
        <span>{language}</span>
        <button type="button" onClick={copy}>Copy code</button>
      </div>
      <p className="editorial-code__status" role="status">{status}</p>
      <Highlight code={code.trimEnd()} language={language} theme={{
        plain: { color: "#F6F5F1", backgroundColor: "#101A2B" },
        styles: [
          { types: ["comment", "prolog"], style: { color: "#B5C7FF" } },
          { types: ["keyword", "string"], style: { color: "#8CDDC5" } },
        ],
      }}>
        {({ className: highlightClass, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={highlightClass} style={style} ref={(node) => { if (node) node.tabIndex = 0; }} role="region" aria-label={`${language} code`}>
            <code>{tokens.map((line, lineIndex) => (
              <span {...getLineProps({ line })} key={lineIndex} className="editorial-code__line">
                {line.map((token, tokenIndex) => <span {...getTokenProps({ token })} key={tokenIndex} />)}
                {"\n"}
              </span>
            ))}</code>
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default Code;
