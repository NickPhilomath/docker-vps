import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const localAuth = window.localStorage.getItem("auth");
  const [auth, setAuth] = useState(localAuth ? JSON.parse(localAuth) : {});

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
