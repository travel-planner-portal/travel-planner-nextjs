import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useNavigationContext } from "../../context/NavigationContext";
import Login from "../features/Login/Login";
import Wapper from "../common/Wapper";

const Layout = () => {
  const { isWapper, isLogin } = useNavigationContext();
  return (
    <>
      <Navbar />
      {isWapper && <Wapper />}
      {isLogin && <Login />}
      <Outlet />
    </>
  );
};

export default Layout;
