"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimePlayed, togglePlay } from "@/features/slices/playerSlice";
import useConvertTime from "@/lib/hooks/useConvertTime";
import data from "@/data/data.json";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel, TabList } from "@mui/lab";

const Carousel = ({ id }) => {
  const [activeItem, setActiveItem] = useState(0);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const timePlayed = useSelector((state) => state.player.timePlayed);
  const items = data.episodes[id].episodeFractions;
  // console.log(id);
  const convertTime = useConvertTime();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const compareTime = useCallback(() => {
    const newActiveItem = items.reduce((acc, item) => {
      if (timePlayed >= item.time) {
        return item.id;
      }
      return acc;
    }, activeItem);

    if (newActiveItem !== activeItem) {
      setActiveItem(newActiveItem);
    }
  }, [timePlayed, items, activeItem]);

  useEffect(() => {
    compareTime();
  }, [compareTime]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Carousel Container */}
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide gap-x-4">
          {items.map((item) => (
            <button
              key={item.id}
              className={`text-sm py-6 relative shrink-0 w-48 p-2 text-center border rounded-md ${
                activeItem === item.id
                  ? "bg-black text-white"
                  : "border-foreground"
              }`}
              onClick={() => {
                setActiveItem(item.id);
                dispatch(setTimePlayed(item.time));
                isPlaying === false && dispatch(togglePlay());
              }}
            >
              <p className="absolute text-[10px] font-bold left-1 top-1">
                {convertTime(item.time)}
              </p>
              {item.title}
            </button>
          ))}
        </div>
        {/* Navigation Arrows */}
        <button
          className="absolute left-[-45px] top-1/2 -translate-y-1/2 p-2 rounded-full text-black hover:text-white hover:bg-black transition border border-black"
          onClick={() => {
            document
              .querySelector(".scrollbar-hide")
              .scrollBy({ left: -250, behavior: "smooth" });
          }}
        >
          <MdArrowBackIos
            size={25}
            className="transition duration-200 hover:text-accentColor"
          />
        </button>
        <button
          className="absolute right-[-45px] top-1/2 -translate-y-1/2 p-2 rounded-full border-black border text-black hover:text-white hover:bg-black transition"
          onClick={() => {
            document
              .querySelector(".scrollbar-hide")
              .scrollBy({ left: 250, behavior: "smooth" });
          }}
        >
          <MdArrowForwardIos
            size={25}
            className="transition duration-200 hover:text-accentColor"
          />
        </button>
      </div>
      <div className="sm:w-screen max-w-screen-lg mt-5 text-gray-600 text-md leading-8">
        <Box sx={{ width: "100%" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                variant=""
                centered
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab className="text-white" label="Summary" value="1" />
                <Tab className="text-white" label="Transcript" value="2" />
                <Tab className="text-white" label="Refrences" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">{items[activeItem].content}</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default Carousel;
