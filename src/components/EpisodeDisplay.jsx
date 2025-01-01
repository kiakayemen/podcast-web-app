"use client";
import ReactPlayer from "react-player";
import { FaPlay, FaPause, FaCalendar } from "react-icons/fa";
import { FaUserLarge, FaClock } from "react-icons/fa6";
import { RiForward15Fill, RiReplay15Fill } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import { Select, Form, Slider } from "antd";
import Loader from "./Loader";
import Image from "next/image";
const EpisodeDisplay = () => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loaded, setLoaded] = useState(0);
  const [timePlayed, setTimePlayed] = useState(0);
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
    setTimePlayed(clampedProgressFraction * duration);
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

  return (
    <div className="flex flex-col justify-center lg:min-w-[1000px]">
      <div className="flex flex-row gap-10 justify-center items-stretch">
        <Image
          width={180}
          className="rounded-xl"
          height={180}
          src={
            "https://assets.pippa.io/shows/625bd31dc030a00012e0dba7/1731641599256-6a33bcde-1548-43b6-a4f7-430dfcf000ab.jpeg"
          }
          alt="Episode 158 - گنجه | از ایده تا سرمایه‌گذاری دیجی‌کالا"
        ></Image>

        <div className="flex flex-col justify-between">
          <h2 className="flex text-2xl justify-center">
            Episode 158 - گنجه | از ایده تا سرمایه‌گذاری دیجی‌کالا
          </h2>
          <div className="flex gap-3">
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
          <div className="flex items-center pr-4">
            <p className="text-lg" dir="rtl">
              در این قسمت، در مورد شکل‌گیری گنجه، مسیر کارآفرینی بنیان‌گذارا،
              چالش‌های پیش‌رو و استراتژی‌های اون‌ها برای غلبه به مشکلات درصنعت
              در حال تحول بخش لجستیک ایران صحبت کردیم.
            </p>
          </div>
          <div className="flex items-start">
            <button
              className="flex items-center gap-3 rounded py-2 px-4 bg-accentColor"
              onClick={() => {
                setIsPlaying(true);
              }}
            >
              <FaPlay />
              Play Episode
            </button>
          </div>
        </div>
      </div>
      <ReactPlayer
        fallback={<Loader />}
        ref={playerRef}
        onProgress={(data) => {
          if (!isDragging) {
            setLoaded(data.loaded);
            setTimePlayed(data.playedSeconds);
            setPercentagePlayed(data.played * 100);
          }
        }}
        volume={volume / 100}
        progressInterval={100}
        controls={false}
        playbackRate={playbackRate}
        height={30}
        playing={isPlaying}
        url="https://stitcher2.acast.com/livestitches/8970a8fd61620ca9925c21943a0fc0a4.mp3?aid=6736c112ba4404855a63e8c5&chid=625bd31dc030a00012e0dba7&ci=kensc6nOo1TwFHW5-_GHfq98Q8ZOXgyHIqYsyLBofXZBYmzNDKxIPA%3D%3D&pf=rss&range=bytes%3D0-&sv=sphinx%401.227.0&uid=a345ffcf1c438ca26da224e960d25ee3&Expires=1735595001186&Key-Pair-Id=K38CTQXUSD0VVB&Signature=ClphBgg92xYCuL6p37qM9Z7cSKYDauzKPnfijAzN8JJCJs65Dlrh6S6Irt6WpZEEn5mcwHdsu3WccxRkvAvxAZSvT7IwrmYSuqgfE7O13k-38MmT4XefV0RgnCGUtz8mV41o-D0rC4r9wUiRBbfugTa-Fe~r4R9MzDA2QsPsPgizbITAR7nweFay5fKsX3yVdDP2uM52UdNqBKEmSOWhJAhX2XThZdQwGEy5z8puao0fieKtkl9VL8LFTEtL9zztJcvkOcKXSGlrleR5b7wuk2RWFxNFotGnrCe8f0acDEkgOLpOGzZLzjRJMpiU4bOwepXVtsWmlSfV4~SLaqB6OA__"
      />
      {/* controls, progress bar & playback rate Container */}
      <div className="container flex justify-evenly gap-10">
        {/* controls */}
        <div className="flex gap-2 items-center justify-evenly">
          <RiReplay15Fill
            size={40}
            className="cursor-pointer bg-accentColor rounded-full p-1"
            onClick={() => {
              const newTime = Math.max(0, timePlayed - 15);
              setTimePlayed(newTime);
              playerRef.current.seekTo(
                newTime / playerRef.current.getDuration()
              );
            }}
          />
          {isPlaying ? (
            <FaPause
              className="cursor-pointer bg-accentColor rounded p-1"
              onClick={() => setIsPlaying(!isPlaying)}
              size={45}
            />
          ) : (
            <FaPlay
              className="cursor-pointer bg-accentColor rounded p-1"
              onClick={() => setIsPlaying(!isPlaying)}
              size={45}
            />
          )}
          <RiForward15Fill
            size={40}
            className="cursor-pointer bg-accentColor rounded-full p-1"
            onClick={() => {
              const newTime = Math.min(
                playerRef.current.getDuration(),
                timePlayed + 15
              );
              setTimePlayed(newTime);
              playerRef.current.seekTo(
                newTime / playerRef.current.getDuration()
              );
            }}
          />
        </div>
        {/* progress bar */}
        <div className="flex gap-4 items-center">
          <label className="w-[70px]" htmlFor="progress-bar">
            {convertTime(timePlayed)}
          </label>
          <div
            onMouseDown={(e) => handleMouseDown(e)}
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseUp={(e) => handleMouseUp(e)}
            className="h-3 cursor-pointer overflow-hidden flex items-center"
          >
            <div
              id="progress-bar"
              width="100%"
              className=" bg-white relative rounded-xl overflow-visible"
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
                className="w-3 h-3 rounded-full flex items-center justify-center bg-white -top-1  bottom-0 absolute"
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
          <label className="w-[70px]" htmlFor="progress-bar">
            {
              convertTime(playerRef.current?.getDuration())
            }
          </label>
        </div>
        {/* volume & playback rate */}
        <div className="flex w-1/5 justify-evenly items-center">
          <Form.Item noStyle>
            <Slider
              className="w-32"
              onChange={(value) => setVolume(value)}
              value={volume}
            />
          </Form.Item>
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
        </div>
      </div>
    </div>
  );
};

export default EpisodeDisplay;
