import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Notfoundpage() {
  const navigate = useNavigate();

  useEffect(() => {
    let timer = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      This page doesn't exist. Go <Link to="/">home</Link>
    </div>
  );
}
