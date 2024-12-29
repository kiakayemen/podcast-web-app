"use client";
import EpisodeDisplay from "@/components/EpisodeDisplay";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState("");

  return (
    <>
      <div className="flex flex-col items-center gap-8 justify-center">
        <h1 className="text-2xl font-bold">podcast web app</h1>
        <div className="flex items-center">
          <EpisodeDisplay />
        </div>
      </div>
    </>
  );
}
