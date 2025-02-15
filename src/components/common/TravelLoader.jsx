import React, { useState, useEffect } from "react";
import {
  Plane,
  Ship,
  Train,
  Mountain,
  Palmtree,
  Navigation,
  Globe,
  Luggage,
  Route,
  Satellite,
} from "lucide-react";

const DynamicTravelLoader = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const scenes = [
    {
      icon: Plane,
      bgGradient: "from-sky-100/90 via-blue-50/95 to-sky-100/90",
      iconColor: "text-sky-600",
      themeColor: "sky",
      message: "Charting Flight Paths",
      description: "Optimizing air routes with real-time weather data",
      elements: [...Array(6)].map(() => ({
        size: Math.floor(Math.random() * 4 + 2),
        speed: Math.random() * 3 + 1,
        delay: Math.random() * 5,
      })),
    },
    {
      icon: Ship,
      bgGradient: "from-blue-100/90 via-cyan-50/95 to-blue-100/90",
      iconColor: "text-blue-600",
      themeColor: "blue",
      message: "Navigating Ocean Currents",
      description: "Analyzing maritime traffic patterns",
      elements: [...Array(8)].map(() => ({
        size: Math.floor(Math.random() * 4 + 2),
        speed: Math.random() * 3 + 1,
        delay: Math.random() * 5,
      })),
    },
    {
      icon: Train,
      bgGradient: "from-emerald-100/90 via-green-50/95 to-emerald-100/90",
      iconColor: "text-emerald-600",
      themeColor: "emerald",
      message: "Synchronizing Rail Networks",
      description: "Connecting high-speed transit hubs",
      elements: [...Array(10)].map(() => ({
        size: Math.floor(Math.random() * 4 + 2),
        speed: Math.random() * 3 + 1,
        delay: Math.random() * 5,
      })),
    },
    // ... other scenes
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 0.5, 100));
    }, 50);

    const sceneInterval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(sceneInterval);
    };
  }, []);

  const CurrentIcon = scenes[currentScene].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br via-white backdrop-blur-lg flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${scenes[currentScene].bgGradient} transition-all duration-1000`}
      >
        <div className="absolute inset-0 opacity-25 mix-blend-overlay animate-texture" />
      </div>

      {/* Animated Globe Background */}
      <div className="absolute w-full h-full flex items-center justify-center opacity-10">
        <Globe className="w-[120vh] h-[120vh] text-gray-300 animate-globe-rotate" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 px-4">
        {/* Main Orb */}
        <div
          className={`relative w-64 h-64 rounded-full transition-all duration-1000 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Interactive Layers */}
          <div className="absolute inset-0 animate-orb-pulse">
            <div
              className={`absolute inset-0 rounded-full bg-${scenes[currentScene].themeColor}-100/30 blur-xl`}
            />
          </div>

          <div className="absolute inset-0 animate-orb-rotate">
            <div
              className={`absolute inset-0 rounded-full border-[6px] border-dashed border-${scenes[currentScene].themeColor}-200/50 bg-clip-padding`}
            />
          </div>

          {/* Dynamic Particles */}
          {scenes[currentScene].elements.map((el, i) => (
            <div
              key={i}
              className={`absolute w-${el.size} h-${el.size} bg-${scenes[currentScene].themeColor}-400/80 rounded-full`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `particle-float ${el.speed}s ease-in-out ${el.delay}s infinite`,
              }}
            />
          ))}

          {/* Central Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <CurrentIcon
              className={`w-24 h-24 ${scenes[currentScene].iconColor} transition-all duration-700 transform hover:scale-125`}
              strokeWidth={1.25}
            />
          </div>

          {/* Halo Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-32 h-32 rounded-full bg-${scenes[currentScene].themeColor}-200/20 animate-halo`}
            />
          </div>
        </div>

        {/* Progress & Text */}
        <div className="space-y-6 text-center max-w-2xl">
          <div className="relative h-2 bg-gray-200/50 rounded-full overflow-hidden w-64">
            <div
              className={`absolute left-0 h-full bg-${scenes[currentScene].themeColor}-500 transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="space-y-4">
            <h2
              className={`text-4xl font-bold ${scenes[currentScene].iconColor} animate-text-gradient`}
            >
              {scenes[currentScene].message}
              <span className="animate-pulse">...</span>
            </h2>
            <p className="text-lg text-gray-600 font-medium animate-typing">
              {scenes[currentScene].description}
            </p>
          </div>

          {/* Ambient Icons */}
          <div className="flex justify-center gap-6 opacity-50">
            <Navigation className="animate-float-1" />
            <Luggage className="animate-float-2" />
            <Route className="animate-float-3" />
            <Satellite className="animate-float-4" />
          </div>
        </div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid mask-radial-faded" />
    </div>
  );
};

export default DynamicTravelLoader;
