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
import VolumeControl from "./VolumeControl";
import {
  setTimePlayed,
  togglePlay,
  setCurrentEpisodeId,
} from "@/features/slices/playerSlice";
import Carousel from "./Carousel";
import data from "@/data/data.json";
import useConvertTime from "@/lib/hooks/useConvertTime";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const EpisodeDisplay = ({ id }) => {
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
    <>
      <div className="flex flex-col w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
          <Image
            width={360}
            height={360}
            className="rounded-xl"
            alt="Episode Cover"
            src={data.episodes[id].thumbnailSrc}
          ></Image>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-center sm:text-right font-bold">
              {data.episodes[id].title}
            </h2>
            <div className="flex flex-wrap gap-3">
              <p className="flex items-center gap-1 text-lg">
                {/* duration */}
                <FaClock size={12} />
                {convertTime(data.episodes[id].duration)}
              </p>
              <p className="flex items-center gap-1 text-lg">
                {/* date */}
                <FaCalendar size={12} />
                {data.episodes[id].date}
              </p>
              <p className="flex items-center gap-1 text-lg capitalize">
                {/* creators */}
                <FaUserLarge size={12} />
                {data.episodes[id].speakers}
              </p>
            </div>
            {/* summary */}
            <p className="text-lg text-right" dir="rtl">
              {data.episodes[id].summary}{" "}
            </p>
            <div className="flex items-start">
              <button
                className="flex max-sm:justify-center max-sm:w-full w-44 items-center text-background border-2 border-black gap-3 rounded py-2 px-4 hover:bg-black hover:text-white duration-200"
                onClick={() => {
                  dispatch(setCurrentEpisodeId(data.episodes[id].id));
                  dispatch(togglePlay());
                }}
              >
                {isPlaying && currentEpisodeId === data.episodes[id].id ? (
                  <FaPause />
                ) : (
                  <FaPlay />
                )}
                {isPlaying && currentEpisodeId === data.episodes[id].id
                  ? "Pause Episode"
                  : "Play Episode"}
              </button>
            </div>
          </div>
        </div>
        {/* volume  */}
        <div className="flex gap-2 w-1/6 justify-evenly items-center">
          <VolumeControl volume={volume} setVolume={setVolume} />
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
              defaultValue={`x${playbackRate}`}
              style={{
                width: 80,
              }}
              onChange={(rate) => setPlaybackRate(rate)}
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
        </div>
      </div>
      <Carousel id={id} />
    </>
  );
};

export default EpisodeDisplay;
