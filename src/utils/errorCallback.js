import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ErrorFallback({ error }) {
  const navigate = useNavigate();
  useEffect(() => {
    let timer = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}
