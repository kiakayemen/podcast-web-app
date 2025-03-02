"use client";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreVolume } from "@/features/slices/playerSlice";
import { ImVolumeMedium, ImVolumeHigh, ImVolumeMute2 } from "react-icons/im";

const VolumeControl = () => {
  const storeVolume = useSelector((state) => state.player.storeVolume);
  const dispatch = useDispatch();
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

  const handleClick = () => {
    if (storeVolume !== 0) {
      dispatch(setStoreVolume(0));
    } else {
      dispatch(
        setStoreVolume(window.localStorage.getItem("localStorageVolume"))
      );
    }
  };

  return (
    <div className=" max-sm:hidden relative flex items-center">
      {/* Volume Icon */}
      <div
        className={`cursor-pointer ${
          isHovered ? "text-accentColor" : "text-black"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick()}
      >
        {storeVolume === 0 ? (
          <ImVolumeMute2 size={24} />
        ) : storeVolume <= 60 ? (
          <ImVolumeMedium size={24} />
        ) : (
          <ImVolumeHigh size={24} />
        )}
      </div>

      {/* Tooltip (Slider + Label) */}
      {isHovered && (
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black border-2 border-black p-2 rounded shadow-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <input
            dir="ltr"
            type="range"
            min={0}
            max={100}
            value={storeVolume}
            onChange={(e) => {
              dispatch(setStoreVolume(Number(e.target.value)));
              if (Number(e.target.value) !== 0) {
                window.localStorage.setItem(
                  "localStorageVolume",
                  Number(e.target.value)
                );
              }
            }}
            className="w-32 h-1 bg-black rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-center mt-1 font-bold">{storeVolume}%</p>
        </div>
      )}
    </div>
  );
};

export default VolumeControl;
