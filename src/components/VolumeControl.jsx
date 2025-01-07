"use client";
import { useState, useRef, use } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const VolumeControl = (props) => {
  const volume = props.volume;
  const setVolume = props.setVolume;
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);

  const handleMouseEnter = () => {
    hoverRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverRef.current = false;
    setTimeout(() => {
      if (!hoverRef.current) {
        setIsHovered(false);
      }
    }, 200);
  };

  return (
    <div className=" max-sm:hidden relative flex items-center">
      {/* Volume Icon */}
      <div
        className={`cursor-pointer ${
          isHovered ? "text-accentColor" : "text-white"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
          >
        {volume === 0 ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
      </div>

      {/* Tooltip (Slider + Label) */}
      {isHovered && (
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded shadow-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-32 h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-center mt-1">{volume}%</p>
        </div>
      )}
    </div>
  );
};

export default VolumeControl;
