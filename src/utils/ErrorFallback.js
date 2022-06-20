export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      className="app__flex"
      style={{ flexWrap: "wrap", rowGap: "2rem", textAlign: "center" }}
      role="alert"
    >
      <h3>Something went wrong:</h3>
      <p>{error.message}</p>
    </div>
  );
}
