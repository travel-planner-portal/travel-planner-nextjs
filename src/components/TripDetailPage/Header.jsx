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

  const handleAuthCheck = () => {
    if (!isAuthenticated) {
      toast.error("Please login to download");
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

  const destinationName = finaldestination.replace(/\d+\s*days?/, "").trim();

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:items-center border-b pb-6 border-[#BCBCBC] border-dotted">
        <div className="flex items-bottom md:items-center gap-2">
          <div className="w-[36px] h-[36px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={40}
              height={40}
              viewBox={`0 0 43 43`}
              fill="none"
            >
              <path
                d="M21.4987 20.6043C20.3108 20.6043 19.1715 20.1324 18.3314 19.2924C17.4914 18.4524 17.0195 17.3131 17.0195 16.1252C17.0195 14.9372 17.4914 13.7979 18.3314 12.9579C19.1715 12.1179 20.3108 11.646 21.4987 11.646C22.6866 11.646 23.8259 12.1179 24.6659 12.9579C25.506 13.7979 25.9779 14.9372 25.9779 16.1252C25.9779 16.7134 25.862 17.2958 25.6369 17.8393C25.4118 18.3827 25.0819 18.8765 24.6659 19.2924C24.25 19.7083 23.7562 20.0383 23.2128 20.2634C22.6694 20.4885 22.0869 20.6043 21.4987 20.6043ZM21.4987 3.5835C18.1724 3.5835 14.9824 4.90485 12.6304 7.25687C10.2784 9.60888 8.95703 12.7989 8.95703 16.1252C8.95703 25.5314 21.4987 39.4168 21.4987 39.4168C21.4987 39.4168 34.0404 25.5314 34.0404 16.1252C34.0404 12.7989 32.719 9.60888 30.367 7.25687C28.015 4.90485 24.825 3.5835 21.4987 3.5835Z"
                className="fill-black "
              />
            </svg>
          </div>
          <h1 className="text-darkBlack font-rubikmedium_500 leading-[32px] tracking-[-1.14px] capitalize text-[24px] md:text-[36px] d-flex flex-wrap">
            <span>{destinationName}</span>
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
  const { setIsLogin, setIsWapper } = useNavigationContext();

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
            ? "Download"
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
            ? "Save"
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
