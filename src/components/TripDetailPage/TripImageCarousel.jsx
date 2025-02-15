import React, { useState, useEffect, useRef } from "react";

const TripImageCarousel = ({ images, onOpenGallery }) => {
  const carouselImages = images;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [slideDirection, setSlideDirection] = useState("right");

  const dragRef = useRef({ startX: 0, currentX: 0 });
  const slideRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setSlideDirection("right");
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length, isDragging]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    dragRef.current.startX =
      e.type === "mousedown" ? e.pageX : e.touches[0].pageX;
    dragRef.current.currentX = 0;
    if (slideRef.current) {
      slideRef.current.style.transition = "none";
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
    dragRef.current.currentX = currentX - dragRef.current.startX;
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(${dragRef.current.currentX}px)`;
    }
  };

  const handleNext = () => {
    console.log("handleNext");
    setSlideDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const handlePrev = () => {
    console.log("handlePrev");
    setSlideDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragRef.current.currentX) > 100) {
      if (dragRef.current.currentX > 0) {
        setSlideDirection("left");
        handlePrev();
      } else {
        setSlideDirection("right");
        handleNext();
      }
    }

    if (slideRef.current) {
      slideRef.current.style.transition = "transform 0.3s ease-out";
      slideRef.current.style.transform = "translateX(0)";
    }
    dragRef.current.startX = 0;
  };

  const ChevronLeftIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );

  const ImageIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  );

  const renderDots = () => {
    const totalImages = carouselImages.length;
    if (totalImages <= 5) {
      return carouselImages.map((_, index) => (
        <button
          key={index}
          onClick={() => {
            setSlideDirection(index > currentIndex ? "right" : "left");
            setCurrentIndex(index);
          }}
          className={`
            ${
              index === currentIndex
                ? "w-5 h-5 bg-white"
                : "w-3 h-3 bg-white/50"
            }
            rounded-full transition-all duration-300
          `}
        />
      ));
    }

    const visibleDots = 5;
    const middleDotIndex = Math.floor(visibleDots / 2);

    return Array.from({ length: visibleDots }).map((_, dotIndex) => {
      let imageIndex = currentIndex - middleDotIndex + dotIndex;
      if (imageIndex < 0) imageIndex += totalImages;
      if (imageIndex >= totalImages) imageIndex -= totalImages;

      return (
        <button
          key={dotIndex}
          onClick={() => {
            setSlideDirection(imageIndex > currentIndex ? "right" : "left");
            setCurrentIndex(imageIndex);
          }}
          className={`
            ${
              dotIndex === middleDotIndex
                ? "w-5 h-5 bg-white"
                : "w-3 h-3 bg-white/50"
            }
            rounded-full transition-all duration-300
            ${dotIndex === 0 ? "mr-1" : ""}
            ${dotIndex === visibleDots - 1 ? "ml-1" : ""}
          `}
        />
      );
    });
  };

  return (
    <div
      className="w-full h-[35vh] md:h-[70vh] relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center relative"
        onMouseDown={(e) => {
          if (!e.target.closest("button")) {
            handleDragStart(e);
          }
        }}
        onMouseMove={(e) => {
          if (!e.target.closest("button")) {
            handleDragMove(e);
          }
        }}
        onMouseUp={(e) => {
          if (!e.target.closest("button")) {
            handleDragEnd(e);
          }
        }}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => {
          if (!e.target.closest("button")) {
            handleDragStart(e);
          }
        }}
        onTouchMove={(e) => {
          if (!e.target.closest("button")) {
            handleDragMove(e);
          }
        }}
        onTouchEnd={(e) => {
          if (!e.target.closest("button")) {
            handleDragEnd(e);
          }
        }}
      >
        {carouselImages.map((image, index) => (
          <div
            key={index}
            ref={index === currentIndex ? slideRef : null}
            className={`absolute w-full h-full transition-all duration-500 
              ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}
              ${index === currentIndex ? "scale-100" : "scale-95"}
              ${
                index === currentIndex
                  ? slideDirection === "right"
                    ? "animate-slideRight"
                    : "animate-slideLeft"
                  : slideDirection === "right"
                  ? "-translate-x-full"
                  : "translate-x-full"
              }
            `}
          >
            <img
              src={image}
              alt={`Trip destination ${index + 1}`}
              className="w-full object-cover object-center rounded-[16px] h-[35vh] md:h-[70vh]"
              draggable="false"
            />
          </div>
        ))}

        {isHovered && !isDragging && (
          <div className="absolute inset-0 z-50 pointer-events-none">
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition-all duration-300 cursor-pointer pointer-events-auto"
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition-all duration-300 cursor-pointer pointer-events-auto"
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20">
          {renderDots()}
          <button
            onClick={onOpenGallery}
            className="ml-4 bg-white/50 hover:bg-white/75 rounded-full p-2 transition flex items-center justify-center"
          >
            <ImageIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripImageCarousel;
