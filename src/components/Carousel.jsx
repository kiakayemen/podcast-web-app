"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimePlayed } from "@/features/slices/playerSlice";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel, TabList } from "@mui/lab";

const Carousel = () => {
  const [activeItem, setActiveItem] = useState(0);
  const dispatch = useDispatch();

  const items = useSelector((state) => state.episodeFractions.items);

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

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Carousel Container */}
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide space-x-4">
          {items.map((item) => (
            <button
              key={item.id}
              className={`text-sm py-6 relative shrink-0 w-48 p-2 text-center border rounded-md ${
                activeItem === item.id
                  ? "bg-accentColor text-background border-background"
                  : "border-foreground"
              }`}
              onClick={() => {
                setActiveItem(item.id);
                dispatch(setTimePlayed(item.time));
              }}
            >
              <p className="absolute text-[10px] right-1 top-1">
                {convertTime(item.time)}
              </p>
              {item.title}
            </button>
          ))}
        </div>
        {/* Navigation Arrows */}
        <button
          className="absolute left-[-30px] top-1/2 -translate-y-1/2 p-2 rounded-full shadow"
          onClick={() => {
            document
              .querySelector(".scrollbar-hide")
              .scrollBy({ left: -200, behavior: "smooth" });
          }}
        >
          <MdArrowBackIos
            size={25}
            color="#fff"
            className="transition duration-200 hover:text-accentColor"
          />
        </button>
        <button
          className="absolute right-[-35px] top-1/2 -translate-y-1/2 p-2 rounded-full shadow"
          onClick={() => {
            document
              .querySelector(".scrollbar-hide")
              .scrollBy({ left: 200, behavior: "smooth" });
          }}
        >
          <MdArrowForwardIos
            size={25}
            className="transition duration-200 hover:text-accentColor"
            color="#fff"
          />
        </button>
      </div>
      <div className="sm:w-screen max-w-screen-lg mt-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
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
