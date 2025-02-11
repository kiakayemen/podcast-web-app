"use client";
import { FaPlay, FaPause, FaCalendar } from "react-icons/fa";
import { FaUserLarge, FaClock } from "react-icons/fa6";
import { RiForward15Fill, RiReplay15Fill } from "react-icons/ri";
import { CircleLoader } from "react-spinners";
import { useState, useRef, useEffect } from "react";
import { Select, ConfigProvider } from "antd";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import { setTimePlayed, togglePlay } from "@/features/slices/playerSlice";
import data from "@/data/data.json";
import useConvertTime from "@/lib/hooks/useConvertTime";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Player = () => {
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const timePlayed = useSelector((state) => state.player.timePlayed);
  const currentEpisodeId = useSelector(
    (state) => state.player.currentEpisodeId
  );
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loaded, setLoaded] = useState(0);
  const [localTimePlayed, setLocalTimePlayed] = useState(0);
  const [percentagePlayed, setPercentagePlayed] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const convertTime = useConvertTime();

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const progressBar = e.currentTarget;
    const boundingRect = progressBar.getBoundingClientRect(); // Get the progress bar's dimensions
    const clickX = e.clientX - boundingRect.left; // Mouse X position relative to the progress bar
    const barWidth = progressBar.offsetWidth;
    const progressFraction = clickX / barWidth; // Fraction of progress bar clicked
    const clampedProgressFraction = Math.min(1, Math.max(0, progressFraction));
    const duration = playerRef.current?.getDuration();
    setPercentagePlayed(clampedProgressFraction * 100);
    setLocalTimePlayed(clampedProgressFraction * duration);
    dispatch(setTimePlayed(localTimePlayed));
  };

  const handleMouseUp = (e) => {
    const progressBar = e.currentTarget;
    const boundingRect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - boundingRect.left;
    const barWidth = progressBar.offsetWidth;
    const progressFraction = clickX / barWidth;
    const clampedProgressFraction = Math.min(1, Math.max(0, progressFraction));
    setIsDragging(false);
    playerRef.current?.seekTo(clampedProgressFraction);
  };

  useEffect(() => {
    if (playerRef.current && timePlayed !== null) {
      playerRef.current.seekTo(timePlayed, "seconds");
    }
  }, [timePlayed]);

  // Sync `localTimePlayed` with `timePlayed` in Redux
  useEffect(() => {
    setLocalTimePlayed(timePlayed);
  }, [timePlayed]);

  return (
    <div className={`fixed ${currentEpisodeId === null && "hidden"} bottom-0 bg-white sm:px-40 sm:py-5 border-t-2 border-black right-0 left-0 flex items-center justify-center`}>
      <div className="w-full">
        
        {currentEpisodeId !== null && (<ReactPlayer
          fallback={<CircleLoader color="#1ed760" />}
          ref={playerRef}
          onProgress={(data) => {
            if (!isDragging) {
              setLoaded(data.loaded);
              setLocalTimePlayed(data.playedSeconds);
              setPercentagePlayed(data.played * 100);
            }
          }}
          className="hidden"
          volume={volume / 100}
          progressInterval={100}
          controls={false}
          playbackRate={playbackRate}
          width="100%"
          height="50px"
          playing={isPlaying}
          url={data.episodes[currentEpisodeId]?.audioSrc}
          // url="/media/audio-file.mp3"
        />
        )}<div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center">
          {/* controls */}
          <div className="flex gap-4">
            <RiReplay15Fill
              size={40}
              className="cursor-pointer text-accentColor rounded-full p-1"
              onClick={() => {
                const newTime = Math.max(0, localTimePlayed - 15);
                setLocalTimePlayed(newTime);
                dispatch(setTimePlayed(newTime));
                playerRef.current.seekTo(
                  newTime / playerRef.current.getDuration()
                );
              }}
            />
            {isPlaying ? (
              <FaPause
                className="cursor-pointer text-accentColor rounded p-1"
                onClick={() => dispatch(togglePlay())}
                size={45}
              />
            ) : (
              <FaPlay
                className="cursor-pointer text-accentColor rounded p-1"
                onClick={() => dispatch(togglePlay())}
                size={45}
              />
            )}
            <RiForward15Fill
              size={40}
              className="cursor-pointer text-accentColor rounded-full p-1"
              onClick={() => {
                const newTime = Math.min(
                  playerRef.current.getDuration(),
                  localTimePlayed + 15
                );
                setLocalTimePlayed(newTime);
                dispatch(setTimePlayed(newTime));
                playerRef.current.seekTo(
                  newTime / playerRef.current.getDuration()
                );
              }}
            />
          </div>
          {/* progress bar */}
          <div className="flex-1 flex items-center gap-4 w-full group">
            <p
              className="sm:min-w-[70px] max-sm:text-xs sm:max-w-[70px]"
            >
              {convertTime(localTimePlayed)}
            </p>
            <div
              onMouseDown={(e) => handleMouseDown(e)}
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseUp={(e) => handleMouseUp(e)}
              className="h-3 cursor-pointer w-full overflow-hidden flex items-center"
            >
              <div
                id="progress-bar"
                className="h-1 w-full max-sm:min-w-52 bg-neutral-300 relative rounded-xl overflow-visible"
              >
                {/* playing fraction */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    transform: `translateX(calc(-100% + ${percentagePlayed}%))`,
                    transition: "transform",
                  }}
                  className={`z-20 bg-black rounded-s-xl`}
                >
                  {/* bullet at the end as an indicator */}
                  <div
                    // style={{
                    //   left: `${percentagePlayed}%`,
                    // }}
                    className="w-3 h-3 z-20 rounded-full opacity-0 flex group-hover:opacity-100 items-center justify-center bg-black -top-1 bottom-0 right-[-6px] absolute transition-all"
                  ></div>
                </div>
              </div>
            </div>
            <p
              className="sm:min-w-[70px] max-sm:text-xs sm:max-w-[70px]"
            >
              {playerRef.current ? (
                convertTime(playerRef.current.getDuration())
              ) : (
                <CircleLoader size={40} color="#1ed760" className="ml-2" />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
