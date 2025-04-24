import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import travelAnimationData from "../../assets/travel-loading-animation.json"; // Your JSON file

interface TripLoadingAnimationProps {
  className?: string;
}

const TripLoadingAnimation: React.FC<TripLoadingAnimationProps> = ({
  className,
}) => {
  const messages = [
    "Crafting your personalized itinerary...",
    "Analyzing your 'must-try food' vs. 'willingness to walk' ratio...",
    "Curating your 'perfect blend of adventure and nap-time'...",
    "Calculating the optimal 'sightseeing to gelato' ratio, based on your preferences...",
    "Personalizing your 'unexpected detours'...",
    "Loading your 'I'm on vacation, calories don't count' mindset...",
    "Adding 'buffer time' for 'unexpectedly long gelato lines'...",
    "Generating your 'I thought I packed that charger' (but didn't) panic simulation...",
    "Compiling a list of 'things you'll only buy because you're on vacation'...",
    "Determining the precise moment you'll forget to exchange currency... almost there...",
    "Loading your 'pretending to be a local' skills...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4500); // Change message every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [messages.length]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gray-50 ${className}`}
    >
      <div className="w-full max-w-md">
        <Lottie
          animationData={travelAnimationData}
          loop
          autoplay
          style={{ width: "50%", height: "auto" }} // Reduced size
          className="w-full h-auto mx-auto"
        />
        <h4 className="text-center  text-primary font-semibold mt-4">
          {messages[messageIndex]} {/* Dynamic message */}
        </h4>
      </div>
    </div>
  );
};

export default TripLoadingAnimation;
