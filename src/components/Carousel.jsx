import React, { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Carousel = ({items, activeItem, setActiveItem}) => {
  const [activeItem, setActiveItem] = useState(0);


  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Carousel Container */}
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4">
          {items.map((item) => (
            <button
              key={item.id}
              className={`shrink-0 w-40 p-2 text-center border rounded-md ${
                activeItem === item.id
                  ? "bg-accentColor text-background border-background"
                  : "border-foreground"
              }`}
              onClick={() => setActiveItem(item.id)}
            >
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
          <MdArrowBackIos size={25} color="#fff" className="transition duration-200 hover:text-accentColor" />
        </button>
        <button
          className="absolute right-[-35px] top-1/2 -translate-y-1/2 p-2 rounded-full shadow"
          onClick={() => {
            document
              .querySelector(".scrollbar-hide")
              .scrollBy({ left: 200, behavior: "smooth" });
          }}
        >
          <MdArrowForwardIos size={25} className="transition duration-200 hover:text-accentColor" color="#fff" />
        </button>
      </div>

      {/* Dynamic Content Section */}
      <div className="mt-6 p-4 border rounded-md bg-gray-100">
        <h2 className="text-lg font-bold">{items[activeItem].title}</h2>
        <p className="text-gray-700 mt-2">{items[activeItem].content}</p>
      </div>
    </div>
  );
};

export default Carousel;
