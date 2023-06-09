import React, { createContext, useState } from "react";

export const LoginDataContext = createContext();

export const LoginDataProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({});

  return (
    <LoginDataContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </LoginDataContext.Provider>
  );
};
