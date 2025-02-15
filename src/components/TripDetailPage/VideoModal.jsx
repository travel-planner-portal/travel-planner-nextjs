import React from "react";
import YouTubeLocationFeed from "../YouTubeLocationFeed";

const VideoModal = ({ isOpen, onClose, location }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0  bg-white  z-50 overflow-hidden">
        <div className="flex justify-between items-center p-4  border-b">
          <h2 className="text-xl font-medium">Travel Videos</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 h-[calc(100vh-75px)] overflow-y-auto">
          <YouTubeLocationFeed searchQuery={location} radius={10} />
        </div>
      </div>
    </>
  );
};

export default VideoModal;
