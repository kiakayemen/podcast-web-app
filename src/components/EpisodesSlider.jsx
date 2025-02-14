"use client";
import data from "@/data/data.json";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import Link from "next/link";
import useConvertTime from "@/lib/hooks/useConvertTime";
import { useState } from "react";

export default function EpisodesSlider({ creator }) {
  const episodes = data.episodes;
  const filteredEpisodes = episodes.filter(
    (eachEpisode) => eachEpisode.creator === creator
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const convertTime = useConvertTime();

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % episodes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? episodes.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="container flex flex-col items-center md:flex-row">
        {filteredEpisodes.map((episode, index) => (
          <Link
            key={index}
            href={episode.podcast + "/" + episode.id.toString()}
          >
            <Card variant="outlined" sx={{ width: 320 }}>
              <CardOverflow>
                <AspectRatio ratio="1">
                  <Image
                    width={150}
                    height={150}
                    src={episode.thumbnailSrc}
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">{episode.title}</Typography>
                <Typography level="body-sm">{episode.speakers}</Typography>
              </CardContent>
              <CardOverflow
                variant="soft"
                sx={{ bgcolor: "background.level1" }}
              >
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                  <Typography
                    level="body-xs"
                    textColor="text.secondary"
                    sx={{ fontWeight: "md" }}
                  >
                    {episode.creator}
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography
                    level="body-xs"
                    textColor="text.secondary"
                    sx={{ fontWeight: "md" }}
                  >
                    {convertTime(episode.duration)}
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography
                    level="body-xs"
                    textColor="text.secondary"
                    sx={{ fontWeight: "md" }}
                  >
                    {episode.date}
                  </Typography>
                </CardContent>
              </CardOverflow>
            </Card>
          </Link>
        ))}
      </div>
      {creator === undefined && (
        <div className="px-5">
          {
            <div className="hidden sm:flex gap-5 flex-wrap content-stretch">
              {episodes.map((episode, index) => (
                <div
                  key={index}
                  className="flex group flex-col w-1/5 justify-center items-start"
                >
                  <Link href={`podcasts/${episode.podcast}/${episode.id}`}>
                    <Image
                      className="filter grayscale group-hover:grayscale-0 transition-all"
                      src={episode.thumbnailSrc}
                      alt={episode.title}
                      height={300}
                      width={300}
                    />
                    <div className="flex flex-col justify-center items-start w-full ">
                      <h3 className="text-xl font-bold text-gray-800">
                        {episode.title}
                      </h3>
                      <p className="text-gray-600">{episode.creator}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          }
          <div className="sm:hidden relative w-full max-w-4xl mx-auto">
            {/* Slider Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {episodes.map((episode, index) => {
                  return (
                    <div
                      key={index}
                      className="relative w-full flex-shrink-0 rounded-2xl shadow-lg"
                    >
                      <Link href={`/podcasts/${episode.podcast}/${episode.id}`}>
                        <div className="w-full">
                          <Image
                            src={episode.thumbnailSrc}
                            alt={episode.title}
                            className="w-full h-60 object-cover rounded-md filter grayscale hover:blur-xs"
                            width={800}
                            height={800}
                          />
                        </div>
                        <div
                          dir="rtl"
                          className="absolute right-0 bottom-0 p-2 w-full bg-white bg-opacity-70"
                        >
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {episode.title}
                            </h3>
                            <h3>{episode.creator}</h3>
                          </div>
                          <p className="text-gray-600">{episode.subtitle}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
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
      )}
    </>
  );
}
