import { Navigate } from "react-router-dom";
import useAuth from "../library/hooks/useAuth";

const Logout = () => {
  const { auth, setAuth } = useAuth();
  if (auth?.accessToken) setAuth({});
  window.localStorage.setItem("auth", "");
  return <Navigate to={"/login"} />;
};

export default Logout;
