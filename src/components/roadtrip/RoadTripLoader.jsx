import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

const RoadTripLoader = ({ source, destination }) => {
  const [carSpeed, setCarSpeed] = useState(1.2);
  const [isHonking, setIsHonking] = useState(false);
  const [dayTime, setDayTime] = useState(true);
  const [carColor, setCarColor] = useState("#EF4444");
  const carControls = useAnimation();
  const [isTurboMode, setIsTurboMode] = useState(false);

  const honkHorn = () => {
    setIsHonking(true);
    setTimeout(() => setIsHonking(false), 500);
  };

  const toggleDayNight = () => {
    setDayTime((prevDayTime) => !prevDayTime);
  };

  const activateTurbo = () => {
    if (!isTurboMode) {
      setIsTurboMode(true);
      setCarSpeed(0.6);
      carControls
        .start({
          x: [0, 20],
          transition: { duration: 0.3 },
        })
        .then(() => {
          carControls.start({
            x: 0,
            transition: { duration: 0.3 },
          });
          setTimeout(() => {
            setIsTurboMode(false);
            setCarSpeed(1.2);
          }, 3000);
        });
    }
  };

  const carColors = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

  return (
    <div className="relative w-[320px] h-[160px] bg-emerald-50 rounded-2xl overflow-hidden shadow-xl border border-white/10">
      <div
        className={`absolute inset-0 h-[60%] transition-colors duration-1000
        ${
          dayTime
            ? "bg-gradient-to-b from-sky-400 to-[#a8dfff]"
            : "bg-gradient-to-b from-slate-900 to-slate-800"
        }`}
      >
        <motion.div
          className={`absolute right-8 top-6 w-12 h-12 rounded-full
          ${dayTime ? "bg-yellow-300" : "bg-gray-200"}`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          onClick={toggleDayNight}
          whileHover={{ scale: 1.2 }}
          style={{ cursor: "pointer" }}
        />

        {!dayTime && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
        <motion.div
          className="absolute top-4 left-0 flex gap-16"
          animate={{ x: [0, -200] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[2, 1, 1.5, 0.8].map((scale, i) => (
            <div key={i} className="relative">
              <div
                className={`absolute -left-2 -top-2 w-16 h-6 ${
                  dayTime ? "bg-white/90" : "bg-slate-700/90"
                } rounded-full blur-[2px] transform scale-x-150`}
              />
              <div
                className={`w-12 h-12 ${
                  dayTime ? "bg-white/90" : "bg-slate-700/90"
                } rounded-full blur-[2px] transform scale-75`}
              />
              <div
                className={`absolute -right-4 -top-4 w-14 h-14 ${
                  dayTime ? "bg-white/90" : "bg-slate-700/90"
                } rounded-full blur-[2px] transform scale-75`}
              />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-b from-stone-800 to-stone-900">
        <motion.div
          className="absolute top-1/2 left-0 w-full flex gap-8"
          animate={{ x: [0, -100] }}
          transition={{ duration: carSpeed, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="relative w-16 h-1.5">
              <div className="absolute inset-0 bg-amber-400 rounded-full" />
              <div className="absolute inset-0 bg-amber-300/50 blur-[2px]" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-xs text-white font-bold bg-black/50 p-1 rounded">
            {source}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-xs text-white font-bold bg-black/50 p-1 rounded">
            {destination}
          </span>
        </div>
      </div> */}

      <motion.div
        className="absolute bottom-[25%] left-[15%] z-10"
        animate={carControls}
        initial={{ x: 0 }}
      >
        <motion.div
          animate={{ y: [-3, 3], rotate: [-1, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          onClick={honkHorn}
          style={{ cursor: "pointer" }}
        >
          <div className="relative">
            <div
              className="w-20 h-8 rounded-t-xl shadow-lg transition-colors duration-300"
              style={{ backgroundColor: carColor }}
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = carColors.indexOf(carColor);
                const nextIndex = (currentIndex + 1) % carColors.length;
                setCarColor(carColors[nextIndex]);
              }}
            />
            <div
              className="w-28 h-6 -mt-1 rounded-xl shadow-md transition-colors duration-300"
              style={{ backgroundColor: carColor }}
            />
            <div className="absolute top-1 left-5 w-8 h-4 bg-sky-900/80 rounded-sm shadow-inner" />
            <div className="absolute top-1 right-5 w-8 h-4 bg-sky-900/80 rounded-sm shadow-inner" />

            <motion.div
              className="absolute -bottom-3 left-3 w-5 h-5 bg-gradient-to-b from-gray-900 to-black rounded-full border-2 border-gray-600 shadow-lg"
              animate={{ rotate: 360 }}
              transition={{
                duration: carSpeed,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute -bottom-3 right-3 w-5 h-5 bg-gradient-to-b from-gray-900 to-black rounded-full border-2 border-gray-600 shadow-lg"
              animate={{ rotate: 360 }}
              transition={{
                duration: carSpeed,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {!dayTime && (
              <>
                <div className="absolute top-3 left-0 w-4 h-4 bg-yellow-100 rounded-full blur-[4px] opacity-80" />
                <div className="absolute top-3 right-0 w-4 h-4 bg-red-500 rounded-full blur-[2px] opacity-80" />
              </>
            )}
            {isHonking && (
              <motion.div
                className="absolute -right-8 top-0 text-xl"
                initial={{ opacity: 1, scale: 0.5 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.5 }}
              >
                📢
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-4 left-4 flex gap-2">
        <button
          onClick={activateTurbo}
          disabled={isTurboMode}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors
            ${
              isTurboMode
                ? "bg-gray-400 text-gray-600"
                : "bg-amber-500 text-white hover:bg-amber-600"
            }`}
        >
          TURBO
        </button>
      </div>
      <motion.div
        className="absolute bottom-4 right-4 text-white font-medium text-sm tracking-wide"
        animate={{ opacity: [0.8, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Crafting Your Journey...
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/30 animate-pulse" />
      </motion.div>
    </div>
  );
};

export default RoadTripLoader;
