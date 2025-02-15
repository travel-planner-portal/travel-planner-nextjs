import React from "react";
import toast from "react-hot-toast";

const ShareModal = ({ isOpen, onClose, destination, duration }) => {
  if (!isOpen) return null;

  const shareUrl = window.location.href;
  const shareText = `Check out this ${duration}-day trip itinerary for ${destination}!`;

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#25D366">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
      ),
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            shareText + "\n\n" + shareUrl
          )}`
        );
      },
    },
    {
      name: "Email",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#EA4335">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      action: () => {
        window.open(
          `mailto:?subject=${encodeURIComponent(
            `${destination} Travel Itinerary`
          )}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`
        );
      },
    },
    {
      name: "Copy Link",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1F2937">
          <path d="M8 3v2h4V3H8zm7 2h-1V3h1v2zm3 0h-2V3h2v2zm2 2v12H4V7h16zm0-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z" />
        </svg>
      ),
      action: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
          toast.success("Link copied to clipboard!");
          onClose();
        } catch (err) {
          toast.error("Failed to copy link");
        }
      },
    },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 z-50 w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Share Itinerary</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
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

        <div className="grid grid-cols-3 gap-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.action}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50"
            >
              {option.icon}
              <span className="text-sm">{option.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShareModal;
