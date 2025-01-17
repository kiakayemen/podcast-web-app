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
import { setTimePlayed, togglePlay } from "@/features/slices/playerSlice";
import Carousel from "./Carousel";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const EpisodeDisplay = () => {
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  // const [isPlaying, setIsPlaying] = useState(false);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const timePlayed = useSelector((state) => state.player.timePlayed);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loaded, setLoaded] = useState(0);
  const [localTimePlayed, setLocalTimePlayed] = useState(0);
  const [percentagePlayed, setPercentagePlayed] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isDragging, setIsDragging] = useState(false);

  const convertTime = (num) => {
    let hours = Math.floor(num / 3600);
    let minutes = Math.floor((num % 3600) / 60);
    let seconds = Math.floor(num % 60);

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    const convertedTime = hours + ":" + minutes + ":" + seconds;
    return convertedTime;
  };

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

  // Sync `timePlayed` in Redux with `localTimePlayed`
  useEffect(() => {
    setLocalTimePlayed(timePlayed);
  }, [timePlayed]);

  return (
    <>
      <div className="flex flex-col w-full max-w-screen-lg mx-auto">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start">
          <Image
            width={180}
            className="rounded-xl"
            alt="Episode Cover"
            height={180}
            src={
              "https://assets.pippa.io/shows/625bd31dc030a00012e0dba7/1731641599256-6a33bcde-1548-43b6-a4f7-430dfcf000ab.jpeg"
            }
          ></Image>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-center sm:text-left font-bold">
              Episode 158 - گنجه | از ایده تا سرمایه‌گذاری دیجی‌کالا
            </h2>
            <div className="flex flex-wrap gap-3">
              <p className="flex items-center gap-1 text-lg">
                {/* duration */}
                <FaClock size={12} />
                2:07:23
              </p>
              <p className="flex items-center gap-1 text-lg">
                {/* date */}
                <FaCalendar size={12} />
                2024-11-15
              </p>
              <p className="flex items-center gap-1 text-lg">
                {/* creators */}
                <FaUserLarge size={12} />
                Parham Kazemi, Ahmad Nabipoor
              </p>
            </div>
            {/* summary */}
            <p className="text-lg text-right" dir="rtl">
              در این قسمت، در مورد شکل‌گیری گنجه، مسیر کارآفرینی بنیان‌گذارا،
              چالش‌های پیش‌رو و استراتژی‌های اون‌ها برای غلبه به مشکلات درصنعت
              در حال تحول بخش لجستیک ایران صحبت کردیم.
            </p>
            <div className="flex items-start">
              <button
                className="flex max-sm:justify-center max-sm:w-full w-44 items-center text-background gap-3 rounded py-2 px-4 bg-accentColor"
                onClick={() => dispatch(togglePlay())}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
                {isPlaying ? "Pause Episode" : "Play Episode"}
              </button>
            </div>
          </div>
        </div>
        <ReactPlayer
          fallback={<CircleLoader color="#1ed760" />}
          ref={playerRef}
          onProgress={(data) => {
            if (!isDragging) {
              setLoaded(data.loaded);
              setLocalTimePlayed(data.playedSeconds);
              setPercentagePlayed(data.played * 100);
            }
          }}
          className="my-6"
          volume={volume / 100}
          progressInterval={100}
          controls={false}
          playbackRate={playbackRate}
          width="100%"
          height="50px"
          playing={isPlaying}
          // url="https://sphinx.acast.com/p/open/s/625bd31dc030a00012e0dba7/e/6736c112ba4404855a63e8c5/media.mp3"
          url="/media/audio-file.mp3"
        />
        {/* controls, progress bar & playback rate Container */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center">
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
          <div className="flex-1 flex items-center gap-4">
            <label
              className="sm:w-[70px] max-sm:text-xs "
              htmlFor="progress-bar"
            >
              {convertTime(localTimePlayed)}
            </label>
            <div
              onMouseDown={(e) => handleMouseDown(e)}
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseUp={(e) => handleMouseUp(e)}
              className="h-3 cursor-pointer w-full overflow-hidden flex items-center"
            >
              <div
                id="progress-bar"
                className="h-1 w-full max-sm:min-w-52 bg-white relative rounded-xl overflow-visible"
              >
                {/* playing fraction */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    transform: `translateX(calc(-100% + ${percentagePlayed}%))`,
                    transition: "transform",
                  }}
                  className={`bg-accentColor rounded-s-xl`}
                ></div>
                {/* bullet at the end as an indicator */}
                <div
                  style={{
                    left: `${percentagePlayed}%`,
                  }}
                  className="w-3 h-3 rounded-full flex items-center justify-center bg-white -top-1 bottom-0 absolute"
                ></div>
                {/* downloaded fraction */}
                {/* <div
              style={{
                width: `${loaded * 100}%`,
                transition: "width 0.1s ease-in",
                }}
                className={`bg-gray-300 top-0 left-0 bottom-0 absolute rounded-s-xl`}
                ></div> */}
              </div>
            </div>
            <label
              className="sm:w-[70px] max-sm:text-xs"
              htmlFor="progress-bar"
            >
              {playerRef.current ? (
                convertTime(playerRef.current.getDuration())
              ) : (
                <CircleLoader size={40} color="#1ed760" className="ml-2" />
              )}
            </label>
          </div>
          {/* volume & playback rate */}
          <div className="flex gap-2 w-1/5 justify-evenly items-center">
            <VolumeControl volume={volume} setVolume={setVolume} />
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
                defaultValue="x1"
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
      </div>
      <Carousel />
    </>
  );
};

export default EpisodeDisplay;
