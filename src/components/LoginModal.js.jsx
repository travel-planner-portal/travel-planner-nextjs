import React from "react";
import Login from "../components/features/Login/Login";
import { useNavigationContext } from "../context/NavigationContext";

const LoginModal = () => {
  const { isLogin, isWapper } = useNavigationContext();

  if (!isLogin || !isWapper) return null;

  return <Login />;
};

export default LoginModal;
