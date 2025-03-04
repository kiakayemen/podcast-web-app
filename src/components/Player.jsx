"use client";
import { FaPlay, FaPause } from "react-icons/fa";
import { RiForward15Fill, RiReplay15Fill } from "react-icons/ri";
import { SyncLoader } from "react-spinners";
import { Select, ConfigProvider } from "antd";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import {
  setTimePlayed,
  setPlaybackRate,
  togglePlay,
} from "@/features/slices/playerSlice";
import useConvertTime from "@/lib/hooks/useConvertTime";
import VolumeControl from "./VolumeControl";
import { PlayerSkeletonDesktop, PlayerSkeletonMobile } from "./Skeletons";
import data from "@/data/data.json";
const ReactPlayer = dynamic(
  () => Promise.resolve(require("react-player").default),
  { ssr: false }
);

const Player = () => {
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const storeVolume = useSelector((state) => state.player.storeVolume);
  const playbackRate = useSelector((state) => state.player.playbackRate);
  const timePlayed = useSelector((state) => state.player.timePlayed);
  const currentEpisodeId = useSelector(
    (state) => state.player.currentEpisodeId
  );
  const [loaded, setLoaded] = useState(0);
  const [localTimePlayed, setLocalTimePlayed] = useState(0);
  const [percentagePlayed, setPercentagePlayed] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const convertTime = useConvertTime();
  const [isMobileModalOpen, setMobileModalOpen] = useState(false);
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [previousEpisodeId, setPreviousEpisodeId] = useState(null);

  useEffect(() => {
    if (currentEpisodeId !== null) {
      setPreviousEpisodeId(currentEpisodeId);
      setPlayerKey((prev) => prev + 1); // Force reinitialization
      setIsReady(false);
      dispatch(setTimePlayed(0)); // Reset playback position
    }
  }, [currentEpisodeId, dispatch]);
  // for auto play
  useEffect(() => {
    if (isPlaying && isReady && playerRef.current) {
      const startTime = currentEpisodeId === previousEpisodeId ? timePlayed : 0;
      playerRef.current.seekTo(startTime, "seconds");
      const internalPlayer = playerRef.current.getInternalPlayer();
      if (internalPlayer) internalPlayer.play();
    }
  }, [isPlaying, isReady, timePlayed, currentEpisodeId]);

  // the simple and elegant fucking solution that no LLM could think of!!
  useEffect(() => {
    dispatch(setTimePlayed(localTimePlayed));
  }, [isPlaying]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [isAnimating, setIsAnimating] = useState(false);

  const handleModalClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setMobileModalOpen(false);
      setIsAnimating(false);
    }, 200); // Match animation duration
  };

  // use Space key to togglePlay
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevents page scrolling when pressing space
        dispatch(togglePlay());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

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
    if (playerRef.current && timePlayed) {
      playerRef.current.seekTo(timePlayed, "seconds");
    }
  }, [timePlayed]);

  // Sync `localTimePlayed` with `timePlayed` in Redux
  useEffect(() => {
    setLocalTimePlayed(timePlayed);
  }, [timePlayed]);

  return (
    <>
      {currentEpisodeId !== null && (
        <ReactPlayer
          key={playerKey}
          ref={playerRef}
          onReady={() => {
            setIsReady(true);
            if (isPlaying) {
              const internalPlayer = playerRef.current.getInternalPlayer();
              internalPlayer?.play();
            }
          }}
          onError={() => setIsReady(false)}
          onProgress={(data) => {
            if (!isDragging) {
              setLoaded(data.loaded);
              setLocalTimePlayed(data.playedSeconds);
              setPercentagePlayed(data.played * 100);
            }
          }}
          className="hidden"
          volume={storeVolume / 100}
          progressInterval={100}
          controls={false}
          playbackRate={playbackRate}
          width="100%"
          height="50px"
          playing={isPlaying}
          url={data.episodes[currentEpisodeId].audioSrc}
        />
      )}
      {/* bottom fixed player on Mobile */}
      {currentEpisodeId !== null && (
        <div
          className={`${
            isMobile && !isMobileModalOpen ? "flex" : "hidden"
          } fixed z-99 flex-col justify-between w-full tracking-tighter pb-6 min-h-24 bg-white left-0 bottom-0 right-0`}
          onClick={() => {
            if (isReady) setMobileModalOpen(true);
          }}
        >
          {isReady ? (
            <>
              <div className="cursor-pointer w-full overflow-hidden flex items-center">
                <div
                  id="progress-bar"
                  className="h-1 w-full bg-neutral-300 relative rounded-xl overflow-visible"
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
                  ></div>
                </div>
              </div>
              <div className="flex flex-row justify-evenly items-center px-3">
                <div>
                  <Image
                    src={data.episodes[currentEpisodeId].thumbnailSrc}
                    width={50}
                    height={50}
                    alt={`${data.episodes[currentEpisodeId].title}`}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-md">
                    {data.episodes[currentEpisodeId].title.length > 40
                      ? data.episodes[currentEpisodeId].title.slice(0, 40) +
                        "..."
                      : data.episodes[currentEpisodeId].title}
                  </p>
                  <p className="text-sm font-bold">
                    {data.episodes[currentEpisodeId].creator}
                  </p>
                </div>
                <div>
                  {isPlaying ? (
                    <FaPause
                      className="cursor-pointer text-accentColor rounded p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(togglePlay());
                      }}
                      size={30}
                    />
                  ) : (
                    <FaPlay
                      className="cursor-pointer text-accentColor rounded p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(togglePlay());
                      }}
                      size={30}
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            <PlayerSkeletonMobile />
          )}
        </div>
      )}
      {/* Mobile Modal */}
      {isMobileModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 sm:hidden"
          onClick={(e) => {
            if (e.target.dataset.modalOverlay) {
              handleModalClose();
            }
          }}
          data-modal-overlay
        >
          <div
            className="bg-white rounded-lg p-6 relative max-w-[90%]"
            style={{
              transformOrigin: "bottom center",
              animation: `${
                isAnimating ? "genie-out ease-in" : "genie-in ease-out"
              } 0.2s forwards`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-2"
            >
              ❌
            </button>
            <div className="">
              <Image
                src={data.episodes[currentEpisodeId]?.thumbnailSrc}
                width={250}
                height={250}
                alt="Episode thumbnail"
                className="mx-auto"
              />
              <p className="text-lg font-bold text-center mt-4 mb-1">
                {data.episodes[currentEpisodeId]?.title}
              </p>
              <p className="text-center">
                {data.episodes[currentEpisodeId]?.creator}
              </p>
              <div className="w-full flex justify-between mt-2">
                <p>
                  {playerRef.current &&
                    convertTime(playerRef.current.getDuration())}
                </p>
                <p> {convertTime(localTimePlayed)}</p>
              </div>
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
                    className="z-20 bg-black rounded-s-xl"
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
              {/* controls and playback rate */}
              <div className="flex justify-between items-center mt-4">
                {/* playback rate */}
                <ConfigProvider
                  theme={{
                    token: {
                      colorText: "#ffffff",
                      colorBgContainer: "#121826",
                      colorBgElevated: "#121826",
                      colorTextQuaternary: "#fff",
                    },
                    components: {
                      Select: {
                        selectorBg: "#121826",
                        optionActiveBg: "#2c3958",
                        optionSelectedBg: "#2c3958",
                      },
                    },
                  }}
                >
                  <Select
                    defaultValue={playbackRate}
                    style={{
                      width: 80,
                    }}
                    onChange={(rate) => dispatch(setPlaybackRate(rate))}
                    options={[
                      {
                        value: 0.5,
                        label: "x0.5",
                      },
                      {
                        value: 1,
                        label: "x1",
                      },
                      {
                        value: 1.25,
                        label: "x1.25",
                      },
                      {
                        value: 1.5,
                        label: "x1.5",
                      },
                      {
                        value: 1.75,
                        label: "x1.75",
                      },
                      {
                        value: 2,
                        label: "x2",
                      },
                    ]}
                  />
                </ConfigProvider>
                {/* Controls */}
                <div className="flex gap-2">
                  <RiForward15Fill
                    size={35}
                    onClick={() =>
                      dispatch(setTimePlayed(localTimePlayed + 15))
                    }
                  />

                  {isPlaying ? (
                    <FaPause size={35} onClick={() => dispatch(togglePlay())} />
                  ) : (
                    <FaPlay size={35} onClick={() => dispatch(togglePlay())} />
                  )}
                  <RiReplay15Fill
                    size={35}
                    onClick={() =>
                      dispatch(setTimePlayed(localTimePlayed - 15))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* bottom fixed player on Desktop */}
      <div
        className={`${
          currentEpisodeId === null || isMobile ? "hidden" : "flex"
        } fixed bottom-0 bg-white px-20 py-5 border-t-2 border-black right-0 left-0 flex items-center justify-center`}
      >
        <div className="w-full">
          {isReady !== true ? (
            <PlayerSkeletonDesktop />
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center">
              {currentEpisodeId !== null ? (
                <>
                  <Link
                    href={`/podcasts/${data.episodes[currentEpisodeId]?.podcast}/${currentEpisodeId}`}
                  >
                    <Image
                      src={data.episodes[currentEpisodeId].thumbnailSrc}
                      width={80}
                      height={80}
                      alt={`${data.episodes[currentEpisodeId]?.title}`}
                    />
                  </Link>
                  <div className="flex flex-col">
                    <Link
                      href={`/podcasts/${data.episodes[currentEpisodeId].podcast}/${currentEpisodeId}`}
                    >
                      <p className="text-md">
                        {data.episodes[currentEpisodeId].title}
                      </p>
                    </Link>
                    <Link
                      href={`/podcasts/${data.episodes[currentEpisodeId].podcast}`}
                    >
                      <p className="text-sm font-bold">
                        {data.episodes[currentEpisodeId].creator}
                      </p>
                    </Link>
                  </div>
                </>
              ) : null}
              {/* progress bar & time */}
              <div className="flex-1 flex items-center gap-4 w-full group">
                <p className="sm:min-w-[70px] max-sm:text-xs sm:max-w-[70px]">
                  {playerRef.current ? (
                    convertTime(playerRef.current.getDuration())
                  ) : (
                    <SyncLoader />
                  )}
                </p>
                {/* progress bar */}
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
                <p className="sm:min-w-[70px] max-sm:text-xs sm:max-w-[70px]">
                  {convertTime(localTimePlayed)}
                </p>
              </div>
              {/* controls and playback rate and volume */}
              <div className="flex justify-between items-center gap-6">
                {/* volume */}
                <VolumeControl />
                {/* playback rate */}
                <ConfigProvider
                  theme={{
                    token: {
                      colorText: "#ffffff",
                      colorBgContainer: "#121826",
                      colorBgElevated: "#121826",
                      colorTextQuaternary: "#fff",
                    },
                    components: {
                      Select: {
                        selectorBg: "#121826",
                        optionActiveBg: "#2c3958",
                        optionSelectedBg: "#2c3958",
                      },
                    },
                  }}
                >
                  <Select
                    defaultValue={playbackRate}
                    style={{
                      width: 80,
                    }}
                    onChange={(rate) => dispatch(setPlaybackRate(rate))}
                    options={[
                      {
                        value: 0.5,
                        label: "x0.5",
                      },
                      {
                        value: 1,
                        label: "x1",
                      },
                      {
                        value: 1.25,
                        label: "x1.25",
                      },
                      {
                        value: 1.5,
                        label: "x1.5",
                      },
                      {
                        value: 1.75,
                        label: "x1.75",
                      },
                      {
                        value: 2,
                        label: "x2",
                      },
                    ]}
                  />
                </ConfigProvider>
                <div className="flex gap-3 items-center">
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
                      playerRef.current.seekTo(newTime, "seconds");
                    }}
                  />
                  {isPlaying ? (
                    <FaPause
                      className="cursor-pointer text-accentColor rounded p-1"
                      onClick={() => {
                        dispatch(togglePlay());
                      }}
                      size={45}
                    />
                  ) : (
                    <FaPlay
                      className="cursor-pointer text-accentColor rounded p-1"
                      onClick={() => {
                        dispatch(togglePlay());
                      }}
                      size={45}
                    />
                  )}
                  <RiReplay15Fill
                    size={40}
                    className="cursor-pointer text-accentColor rounded-full p-1"
                    onClick={() => {
                      const newTime = Math.max(0, localTimePlayed - 15);
                      setLocalTimePlayed(newTime);
                      dispatch(setTimePlayed(newTime));
                      playerRef.current.seekTo(newTime, "seconds");
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Player;
