import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const ImageGalleryModal = ({
  isOpen,
  onClose,
  images = [],
  onLoadMore,
  hasMore,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            onLoadMore();
          }
        },
        { threshold: 0.1 }
      );

      if (loaderRef.current) {
        observer.observe(loaderRef.current);
      }

      return () => {
        observer.disconnect();
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, hasMore, images.length]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <h2 className="text-xl font-semibold text-gray-800">Gallery</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4" ref={modalRef}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative aspect-video cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-200 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-lg" />
              </div>
            ))}
          </div>
          {hasMore && (
            <div ref={loaderRef} className="flex justify-center mt-8 mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent" />
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 rounded-full hover:bg-black/20 z-[70]"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedImage.url}
            alt={selectedImage.alt}
            className="max-w-full max-h-full object-contain p-4"
          />
        </div>
      )}
    </>
  );
};

export default ImageGalleryModal;
