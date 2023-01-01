import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const WithProtection = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
};
