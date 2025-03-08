"use client";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreVolume } from "@/features/slices/playerSlice";
import { ImVolumeMedium, ImVolumeHigh, ImVolumeMute2 } from "react-icons/im";

const VolumeControl = () => {
  const storeVolume = useSelector((state) => state.player.storeVolume);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  const handleClick = () => {
    const newVolume =
      storeVolume === 0 ? localStorage.getItem("localStorageVolume") || 100 : 0;
    dispatch(setStoreVolume(newVolume));
    if (newVolume !== 0) {
      localStorage.setItem("localStorageVolume", newVolume);
    }
  };

  return (
    <div
      className="group relative flex items-center max-sm:hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Volume Icon */}
      <button
        className={`p-1.5 rounded-full transition-all duration-200 ${
          isHovered
            ? "bg-neutral-dark-hover dark:bg-neutral-dark-secondary"
            : ""
        }`}
        onClick={handleClick}
      >
        {storeVolume === 0 ? (
          <ImVolumeMute2
            className={`${
              isHovered ? "text-primary-dark dark:text-primary-dark " : ""
            } w-6 h-6 text-neutral-dark dark:text-neutral-dark-text-secondary transition-colors`}
          />
        ) : storeVolume <= 60 ? (
          <ImVolumeMedium
            className={`${
              isHovered ? "text-primary-dark dark:text-primary-dark " : ""
            } w-6 h-6 text-neutral-dark dark:text-neutral-dark-text-secondary transition-colors`}
          />
        ) : (
          <ImVolumeHigh
            className={`${
              isHovered ? "text-primary-dark dark:text-primary-dark " : ""
            } w-6 h-6 text-neutral-dark dark:text-neutral-dark-text-secondary transition-colors`}
          />
        )}
      </button>

      {/* Volume Slider */}
      {isHovered && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-neutral-light dark:bg-neutral-dark-secondary p-3 rounded-lg shadow-xl border border-neutral-dark-hover dark:border-neutral-dark-hover">
          <div className="flex flex-col items-center space-y-2">
            <input
              dir="ltr"
              type="range"
              min="0"
              max="100"
              value={storeVolume}
              onChange={(e) => {
                const value = Number(e.target.value);
                dispatch(setStoreVolume(value));
                localStorage.setItem("localStorageVolume", value);
              }}
              className="w-28 h-1 bg-neutral-dark-hover dark:bg-neutral-dark rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-dark-text dark:[&::-webkit-slider-thumb]:bg-primary-dark [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
            />
            <span className="text-xs font-medium text-neutral-dark dark:text-neutral-dark-text-secondary">
              {storeVolume}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolumeControl;
