import React, { useState, useEffect } from "react";
import {
  Plane,
  Ship,
  Train,
  Bus,
  MapPin,
  Compass,
  Mountain,
  Palmtree,
  Camera,
  Sunset,
  Tent,
  MapPinned,
} from "lucide-react";

const DynamicTravelLoader = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [dots, setDots] = useState(".");

  const scenes = [
    {
      icon: Plane,
      bgColor: "bg-sky-50",
      iconColor: "text-sky-500",
      borderColor: "border-sky-200",
      spinnerColor: "border-sky-400",
      message: "Preparing for takeoff",
      description: "Scanning the skies for the best routes",
    },
    {
      icon: Ship,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      borderColor: "border-blue-200",
      spinnerColor: "border-blue-400",
      message: "Setting sail",
      description: "Charting the ocean waves",
    },
    {
      icon: Train,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-500",
      borderColor: "border-emerald-200",
      spinnerColor: "border-emerald-400",
      message: "All aboard",
      description: "Racing through scenic routes",
    },
    {
      icon: Mountain,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      borderColor: "border-purple-200",
      spinnerColor: "border-purple-400",
      message: "Exploring peaks",
      description: "Finding the perfect viewpoints",
    },
    {
      icon: Palmtree,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      borderColor: "border-yellow-200",
      spinnerColor: "border-yellow-400",
      message: "Beach vibes",
      description: "Discovering tropical paradises",
    },
  ];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    const sceneInterval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 2000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(sceneInterval);
    };
  }, []);

  const CurrentIcon = scenes[currentScene].icon;

  return (
    <div className="container max-w-[88rem] mx-auto px-4 min-h-screen mt-[73px] md:mt-[9px] flex flex-col items-center justify-center gap-8">
      <div
        className={`relative w-32 h-32 ${scenes[currentScene].bgColor} rounded-full transition-colors duration-700 ease-in-out`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full blur-xl animate-pulse opacity-50" />
        </div>

        <div className="absolute inset-0 animate-spin-slow">
          <div
            className={`absolute inset-2 rounded-full border-2 border-dashed ${scenes[currentScene].borderColor} transition-colors duration-700`}
          />
        </div>
        <div className="absolute inset-0 animate-spin-reverse-slow">
          <div
            className={`absolute inset-4 rounded-full border-2 border-dashed ${scenes[currentScene].borderColor} transition-colors duration-700`}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center animate-bounce-gentle">
          <CurrentIcon
            className={`w-12 h-8 ${scenes[currentScene].iconColor} transition-all duration-700 transform hover:scale-110`}
            strokeWidth={1.5}
          />
        </div>

        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 ${scenes[currentScene].iconColor} transition-colors duration-700`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${2 + i}s ease-in-out ${i * 0.5}s infinite`,
              }}
            >
              <div
                className={`w-full h-full rounded-full ${scenes[currentScene].bgColor} animate-ping`}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-16 h-16 rounded-full border-4 ${scenes[currentScene].spinnerColor} border-t-transparent animate-spin transition-colors duration-700`}
          />
        </div>
      </div>

      <div className="space-y-3 text-center">
        <p
          className={`text-2xl font-medium ${scenes[currentScene].iconColor} transition-colors duration-700`}
        >
          {scenes[currentScene].message}
          {dots}
        </p>
        <p className="text-sm text-gray-500 animate-pulse">
          {scenes[currentScene].description}
        </p>
      </div>
    </div>
  );
};

export default DynamicTravelLoader;
