import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePageURL } from "../action/otherAction";
import Hero from "../components/sections/Hero";
import InterestsPage from "./InterestsPage";
import DateSelectionPage from "./DateSelectionPage";
import BudgetPlanner from "./BudgetPlanner";
import TripsPage from "./TripsPage";
import { useLocation } from "react-router-dom";

const componentMap = {
  "/": Hero,
  "/interests": InterestsPage,
  "/discover/dates": DateSelectionPage,
  "/discover": BudgetPlanner,
  "/discover/trips": TripsPage,
};

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const pageURL = useSelector((state) => state.pageURL.pageURL);
  const location = useLocation();
  const defaultTab = location.state?.defaultTab;
  useEffect(() => {
    if (window.location.pathname === "/") {
      sessionStorage.setItem("pageURL", pageURL);
    }
  }, [pageURL]);

  useEffect(() => {
    if (pageURL === "/") {
      router.push("/");
    }
  }, [dispatch]);

  const ComponentToRender = componentMap[pageURL] || Hero;

  if (ComponentToRender === Hero) {
    return (
      <div className="background-image-homepage">
        <Hero inputData={userData} defaultTab={defaultTab} />
      </div>
    );
  }

  return (
    <div
      className={`${
        ["InterestsPage", "Hero, DateSelectionPage"].includes(
          ComponentToRender
        ) && "background-image-homepage"
      }`}
    >
      <ComponentToRender inputData={userData} />
    </div>
  );
};

export default Home;
