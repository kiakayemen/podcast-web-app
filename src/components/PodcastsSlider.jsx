"use client";
import data from "@/data/data.json";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useConvertTime from "@/lib/hooks/useConvertTime";

export default function PodcastsSlider() {
  const podcasts = data.podcasts;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const convertTime = useConvertTime();

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % podcasts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? podcasts.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="px-5">
      <div className="hidden sm:flex flex-wrap content-stretch">
        {podcasts.map((podcast, index) => (
          <Link
            key={index}
            className="flex flex-col w-1/5 gap-5 justify-between items-start"
            href={`podcasts/${podcast.slug}`}
          >
            <Image
              className=""
              src={podcast.thumbnailSrc}
              alt={podcast.title}
              height={200}
              width={200}
            />
            <div className="flex flex-col justify-center items-start w-full ">
              <h2 className="text-2xl font-bold text-gray-800">
                {podcast.title}
              </h2>
              <p className="text-gray-600">{podcast.creator}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="relative w-full max-w-4xl mx-auto sm:hidden">
        {/* Slider Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {podcasts.map((podcast, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 p-6 bg-gray-100 rounded-2xl shadow-lg"
              >
                <Link href={`/podcasts/${podcast.slug}/`}>
                  <Image
                    src={podcast.thumbnailSrc}
                    alt={podcast.title}
                    className="w-full h-60 object-cover rounded-md mb-4"
                    width={800}
                    height={800}
                  />
                  <h2 className="text-2xl font-bold text-gray-800">
                    {podcast.title}
                  </h2>
                  <p className="text-gray-600">{podcast.subtitle}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md"
        >
          ❯
        </button>
      </div>
    </div>
  );
}
