import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  DestinationNavIcon,
  DiscoverNavIcon,
  LoginNavIcon,
  MenuIcon,
  SparkleIcon,
  SaveIcon,
} from "../../assets/images";
import logo from "../../assets/images/logo.svg";
import { useNavigationContext } from "../../context/NavigationContext";
import { useClickOutside } from "../../hooks/useClickOutside";
import { logoutUser } from "../../network/networkCalls";
import Image from "next/image";

const UserMenu = ({ onClose, onLogout }) => {
  return (
    <div className="absolute z-[1000] right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2  border border-gray-100">
      <Link
        href="/saved-trips"
        className="block px-4 py-2 text-[#2E2B36] hover:bg-[#F9F7F7] font-rubikregular_400 transition-colors"
        onClick={onClose}
      >
        Saved Trips
      </Link>

      <hr className="my-1 border-gray-100" />
      <button
        onClick={onLogout}
        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-[#F9F7F7] font-rubikregular_400 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

const NavMenu = ({ onClose }) => {
  const { setIsLogin, setIsWapper } = useNavigationContext();
  const isLoggedIn = localStorage.getItem("token");
  console.log("isLoggedIn", isLoggedIn);

  const handleTabChange = (tab) => {
    window.dispatchEvent(new CustomEvent("tabChange", { detail: tab }));
    onClose();
  };

  return (
    <div className="fixed top-16 right-4 z-50">
      <div className="relative bg-white border border-[#EEEEEE] shadow-lg p-6 w-[290px] rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[24px] rounded-br-[24px]">
        <div className="space-y-6">
          <Link
            href="#"
            className="block"
            onClick={(e) => {
              e.preventDefault();
              const url = new URL(window.location.href);
              url.searchParams.set("tab", "discover");
              window.history.pushState({}, "", url);
              onClose();
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-[16px] mt-[4px]">
                <DiscoverNavIcon />
              </div>
              <div>
                <h3 className="text-[16px] font-rubikmedium_400 text-[#88B537]">
                  Discover Destination
                </h3>
                <p className="text-[12px] text-[#818181] mt-1">
                  Not sure where to go? We'll help you find the perfect
                  destination!
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className="block"
            onClick={(e) => {
              e.preventDefault();
              const url = new URL(window.location.href);
              url.searchParams.set("tab", "destination");
              window.history.pushState({}, "", url);
              onClose();
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-[16px] mt-[4px]">
                <DestinationNavIcon />
              </div>
              <div>
                <h3 className="text-[16px] font-rubikmedium_400 text-[#2E2B36]">
                  Search Destination
                </h3>
                <p className="text-[12px] text-[#818181] mt-1">
                  Know your destination? Let us create the perfect travel
                  itinerary for you!
                </p>
              </div>
            </div>
          </Link>
          {isLoggedIn && (
            <Link href="/saved-trips" className="block" onClick={onClose}>
              <div className="flex items-start gap-3">
                <div className="w-[16px] mt-[4px]">
                  <SaveIcon />
                </div>
                <div>
                  <h3 className="text-[16px] font-rubikmedium_400 text-[#2E2B36]">
                    Saved Trips
                  </h3>
                  <p className="text-[12px] text-[#818181] mt-1">
                    View and manage your saved travel itineraries
                  </p>
                </div>
              </div>
            </Link>
          )}
          <div className="block">
            <div className="flex items-start gap-3 cursor-pointer">
              <div className="w-[16px] mt-[4px]">
                <LoginNavIcon />
              </div>
              <div
                onClick={() => {
                  setIsLogin(true);
                  setIsWapper(true);
                  onClose();
                }}
              >
                <h3 className="text-[16px] font-rubikmedium_400 text-[#2E2B36]">
                  Login
                </h3>
                <p className="text-[12px] text-[#818181] mt-1">
                  Save, customize, and share your trip itinerary with friends!
                </p>
                {!isLoggedIn && (
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      setIsWapper(true);
                      onClose();
                    }}
                    className="text-[#88B537] font-rubikmedium_500 text-sm mt-2 hover:underline"
                  >
                    Login now →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-2 right-16 w-3 h-3 bg-[#E8FFC9] rounded-full" />
        <div className="absolute -top-3 right-20 w-5 h-5 bg-[#E8FFC9] rounded-full opacity-50" />
        <div className="absolute -top-4 right-24 w-8 h-8 bg-[#E8FFC9] rounded-full opacity-25" />
      </div>
    </div>
  );
};
const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const menuRef = useRef(null);
  const navMenuRef = useRef(null);

  const getUserState = () => {
    try {
      const userStateStr = localStorage.getItem("userState");
      return userStateStr ? JSON.parse(userStateStr) : {};
    } catch (error) {
      console.error("Error parsing userState:", error);
      return {};
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setShowUserMenu(false);
      setShowNavMenu(false);
    };

    window.addEventListener("auth-change", handleStorageChange);
    return () => window.removeEventListener("auth-change", handleStorageChange);
  }, []);

  const isLoggedIn = localStorage.getItem("token");
  const userState = getUserState();
  const loginType = localStorage.getItem("logintype");

  useClickOutside(menuRef, () => setShowUserMenu(false));
  useClickOutside(navMenuRef, () => setShowNavMenu(false));

  const handleLogout = () => {
    logoutUser();
    setShowUserMenu(false);
  };

  const handleMenuClick = () => {
    setShowNavMenu((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setShowNavMenu(false);
  };

  const displayName = (() => {
    if (loginType === "google" && userState?.email) {
      return userState.name;
    }
    if (userState?.name) {
      return userState.name;
    }
    if (userState?.phoneNumber) {
      return userState.phoneNumber;
    }
    return "User";
  })();

  const userInitial = displayName[0]?.toUpperCase() || "U";
  return (
    <>
      <nav className="z-[1] fixed top-0 w-full bg-red px-4 py-4">
        <div className="container max-w-[88rem] md:px-4  mx-auto flex flex-row items-center justify-between">
          <Link
            href={"/"}
            className="flex flex-row items-center justify-start gap-2"
          >
            <Image
              src={logo}
              alt="FindTrip"
              className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] object-contain"
            />
          </Link>

          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleMenuClick}
                aria-label={showNavMenu ? "Close menu" : "Open menu"}
                aria-expanded={showNavMenu}
                className="cursor-pointer flex flex-row items-center gap-2 menu-button"
              >
                <span className="uppercase font-rubikmedium_500 text-[16px] text-[#2E2B36]">
                  {showNavMenu ? "CLOSE" : "MENU"}
                </span>
                <MenuIcon
                  className={`transform transition-transform duration-200 ${
                    showNavMenu ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          ) : (
            <div className="relative z-[1000]" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="cursor-pointer flex flex-row items-center gap-2 bg-[#F9F7F7] px-4 py-2 rounded-[8px] hover:bg-[#f0eded] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#E5DD64] flex items-center justify-center">
                  <span className="text-[14px] font-rubikmedium_500 text-[#2E2B36]">
                    {userInitial}
                  </span>
                </div>
                <span className="font-rubikmedium_500 text-[16px] text-[#2E2B36]">
                  {displayName.split(" ")[0]}
                </span>
                <MenuIcon
                  className={`transform transition-transform duration-200 ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showUserMenu && (
                <UserMenu onClose={handleCloseMenu} onLogout={handleLogout} />
              )}
            </div>
          )}
        </div>
      </nav>

      <div ref={navMenuRef}>
        {showNavMenu && <NavMenu onClose={() => setShowNavMenu(false)} />}
      </div>
    </>
  );
};

export default Navbar;
