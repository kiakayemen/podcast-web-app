"use client";
import { FaPlay, FaPause, FaCalendar } from "react-icons/fa";
import { FaUserLarge, FaClock } from "react-icons/fa6";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  togglePlay,
  setCurrentEpisodeId,
  setTimePlayed,
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
  const convertTime = useConvertTime();

  return (
    <>
      <div className="flex flex-col w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
          <Image
            width={360}
            height={360}
            className="w-[300px] sm:w-[360px] rounded-xl"
            alt="Episode Cover"
            src={data.episodes[id].thumbnailSrc}
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl text-center sm:text-right font-bold">
              {data.episodes[id].title}
            </h2>
            <div className="flex flex-wrap gap-3">
              <p className="flex items-center gap-1 text-base sm:text-lg">
                {/* duration */}
                <FaClock size={12} />
                {convertTime(data.episodes[id].duration)}
              </p>
              <p className="flex items-center gap-1 text-lg">
                {/* date */}
                <FaCalendar size={12} />
                {data.episodes[id].date}
              </p>
              <p className="flex items-center gap-1 capitalize text-base sm:text-lg">
                {/* creators */}
                <FaUserLarge size={12} />
                {data.episodes[id].speakers}
              </p>
            </div>
            {/* summary */}
            <p className=" text-base sm:text-lg text-right">
              {data.episodes[id].summary}{" "}
            </p>
            <div className="flex items-start">
              <button
                className="flex max-sm:justify-center max-sm:w-full w-44 items-center border-2 gap-3 rounded-lg py-2 px-4 dark:border-dark dark:hover:bg-primary-dark dark:hover:text-neutral-dark border-black hover:bg-black hover:text-white duration-200"
                onClick={() => {
                  if (currentEpisodeId !== data.episodes[id].id) {
                    dispatch(setCurrentEpisodeId(data.episodes[id].id));
                    dispatch(setTimePlayed(0));
                    setTimeout(() => {
                      dispatch(togglePlay());
                    }, 100); // Allow state propagation
                  } else {
                    dispatch(togglePlay());
                  }
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
        <div className="flex gap-2 w-1/6 justify-evenly items-center"></div>
      </div>
      <Carousel id={id} />
    </>
  );
};

export default EpisodeDisplay;
