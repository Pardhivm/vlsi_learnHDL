function CodeExample({ title, children }) {
  return (
    <div className="code-example">

      {title && (
        <div className="code-example-title">
          {title}
        </div>
      )}

      <pre>{children}</pre>

    </div>
  );
}

export default CodeExample;