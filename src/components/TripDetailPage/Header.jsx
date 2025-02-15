import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { DownloadIcon, MapPin, SaveIcon, ShareIcon } from "../../assets/images";
import { useNavigationContext } from "../../context/NavigationContext";
import { generatePdfContent, getPdfOptions } from "../../utils/pdfGenerator";
import {
  checkSavedTripStatus,
  getTravelInfo,
  saveTrip,
  unsaveTrip,
} from "../../network/networkCalls";
import ShareModal from "./ShareModal";
import html2pdf from "html2pdf.js";
import { useAuth } from "../../context/AuthContext";

const Header = ({
  itineraryData,
  routeData,
  destinationfromprops,
  durationfromprops,
  budget,
}) => {
  const { destination, duration } = useSelector((state) => state.userData);
  const { isAuthenticated } = useAuth();
  const { setIsLogin, setIsWapper } = useNavigationContext();

  const [showShareModal, setShowShareModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const finaldestination = destinationfromprops || destination;
  const finalduration = durationfromprops || duration;
  console.log("isAuthenticated", isAuthenticated);

  const handleAuthCheck = () => {
    console.log("isAuthenticated", isAuthenticated);
    if (!isAuthenticated) {
      toast.error("Please login to download"); // Add this line
      setIsLogin(true);
      setIsWapper(true);
      return false;
    }
    return true;
  };

  const checkSavedStatus = async () => {
    try {
      const response = await checkSavedTripStatus(
        finaldestination,
        finalduration
      );
      setIsSaved(response.isSaved);
    } catch (error) {
      console.error("Error checking saved status:", error);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      checkSavedStatus();
    }
  }, [isAuthenticated, finaldestination, finalduration]);

  const handleSave = async () => {
    if (!handleAuthCheck() || saving || !itineraryData || !routeData) return;

    try {
      setSaving(true);
      if (isSaved) {
        await unsaveTrip(finaldestination, finalduration);
        setIsSaved(false);
        toast.success("Trip removed from saved trips");
      } else {
        const travelInfo = await getTravelInfo(finaldestination);
        const tripData = {
          destination: finaldestination,
          duration: finalduration,
          budget,
          itineraryData,
          routeData,
          travelInfo,
        };
        await saveTrip(tripData);
        setIsSaved(true);
        toast.success("Trip saved successfully");
      }
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip");
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    console.log("handleDownload");
    if (!handleAuthCheck() || !itineraryData || !routeData || downloading)
      return;

    try {
      setDownloading(true);
      const content = generatePdfContent(
        finaldestination,
        finalduration,
        itineraryData,
        routeData
      );
      const options = getPdfOptions(finaldestination, finalduration);
      await generatePdf(content, options);
      toast.success("Itinerary downloaded successfully");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Failed to download itinerary");
    } finally {
      setDownloading(false);
    }
  };

  const generatePdf = async (content, options) => {
    const element = document.createElement("div");
    element.innerHTML = content;
    document.body.appendChild(element);
    await html2pdf().from(element).set(options).save();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${finaldestination} Travel Itinerary`,
          text: `Check out this ${finalduration}-day trip itinerary for ${finaldestination}!`,
          url: window.location.href,
        });
      } catch {
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:items-center border-b pb-6 border-[#BCBCBC] border-dotted">
        <div className="flex items-bottom md:items-center gap-2">
          <div className="w-[36px] h-[36px]">
            <MapPin width="100%" height="100%" />
          </div>
          <h1 className="text-darkBlack font-rubikmedium_500 leading-[32px] tracking-[-1.14px] capitalize text-[24px] md:text-[36px] d-flex flex-warp">
            <span>{finaldestination}</span>
            <span> ({finalduration} days)</span>
          </h1>
        </div>
        <ActionButtons
          downloading={downloading}
          saving={saving}
          isSaved={isSaved}
          isAuthenticated={isAuthenticated}
          itineraryData={itineraryData}
          routeData={routeData}
          onDownload={handleDownload}
          onSave={handleSave}
          onShare={handleShare}
        />
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        destination={finaldestination}
        duration={finalduration}
      />
    </>
  );
};

const ActionButtons = ({ ...props }) => {
  const { setIsLogin, setIsWapper } = useNavigationContext(); // Get context values directly

  const handleLoginToDownload = (e) => {
    e.preventDefault(); // Add this to prevent default button behavior
    toast.error("Please login to download");
    setIsLogin(true); // Set both states to true
    setIsWapper(true);
  };

  const handleAuthClick = (e, action) => {
    e.preventDefault();
    if (!props.isAuthenticated) {
      toast.error(`Please login to ${action}`);
      setIsLogin(true);
      setIsWapper(true);
      return;
    }

    // Execute corresponding action
    if (action === "download") {
      props.onDownload();
    } else if (action === "save") {
      props.onSave();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => handleAuthClick(e, "download")}
        disabled={props.downloading || !props.itineraryData || !props.routeData}
        className={`px-3 bg-[#FDFDE5] py-[6px] rounded-full hover:bg-gray-50 flex flex-row items-center justify-center gap-[6px] ${
          props.downloading || !props.itineraryData || !props.routeData
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        <DownloadIcon />
        <span className="text-[14px] font-rubikregular_400 text-[#414141]">
          {props.downloading
            ? "Downloading..."
            : !props.isAuthenticated
            ? "Login to Download"
            : "Download"}
        </span>
      </button>

      <button
        onClick={(e) => handleAuthClick(e, "save")}
        disabled={props.saving}
        className={`px-3 py-[6px] rounded-full flex flex-row items-center justify-center gap-[6px] ${
          props.isSaved
            ? "bg-green-100 hover:bg-green-200"
            : "bg-[#FDFDE5] hover:bg-gray-50"
        } ${props.saving ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <SaveIcon />
        <span className="text-[14px] font-rubikregular_400 text-[#414141]">
          {props.saving
            ? "Saving..."
            : !props.isAuthenticated
            ? "Login to Save"
            : props.isSaved
            ? "Remove"
            : "Save"}
        </span>
      </button>

      <button
        onClick={props.onShare}
        className="px-3 bg-[#FDFDE5] py-[6px] rounded-full hover:bg-gray-50 flex flex-row items-center justify-center gap-[6px]"
      >
        <ShareIcon />
        <span className="text-[14px] font-rubikregular_400 text-[#414141]">
          Share
        </span>
      </button>
    </div>
  );
};

export default Header;
