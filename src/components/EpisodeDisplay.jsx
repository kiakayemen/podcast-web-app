"use client";
import { FaPlay, FaPause, FaCalendar } from "react-icons/fa";
import { FaUserLarge, FaClock } from "react-icons/fa6";
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

const EpisodeDisplay = ({ id }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentEpisodeId = useSelector(
    (state) => state.player.currentEpisodeId
  );
  const [loaded, setLoaded] = useState(0);
  const [volume, setVolume] = useState(100);
  const convertTime = useConvertTime();

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
        </div>
      </div>
      <Carousel id={id} />
    </>
  );
};

export default EpisodeDisplay;
