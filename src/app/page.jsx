import EpisodesSlider from "@/components/EpisodesSlider";
import PodcastsSlider from "@/components/PodcastsSlider";
import Link from "next/link";
const page = () => {
  return (
    <div className="flex flex-col flex-wrap space-y-10">
      <div className="container mx-auto"><Link href="/podcasts">
        <h2 className="text-4xl font-bold text-white">Podcasts</h2>
      </Link>
        <PodcastsSlider />
      </div>
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white"> Latest Episodes</h2>
        <EpisodesSlider />
      </div>
    </div>
  );
};

export default page;
