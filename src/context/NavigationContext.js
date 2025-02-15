"use client";

import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [planData, setPlanData] = useState({
    budget: 10000,
    days: 4,
    dates: { start: null, end: null },
    destination: null,
    preferences: { type: null, interests: [] },
  });

  const [isLogin, setIsLogin] = useState(false);
  const [isWapper, setIsWapper] = useState(false);

  const showLogin = () => {
    setIsLogin(true);
    setIsWapper(true);
  };

  const hideLogin = () => {
    setIsLogin(false);
    setIsWapper(false);
  };

  return (
    <NavigationContext.Provider
      value={{
        isLogin,
        isWapper,
        showLogin,
        hideLogin,
        setIsLogin,
        setIsWapper,
        setPlanData,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => useContext(NavigationContext);
