import EpisodesSlider from "@/components/EpisodesSlider";
import data from "@/data/data.json";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return data.podcasts.map((podcast) => {
    return {
      slug: podcast.slug,
    };
  });
}
const podcastLandingPage = async ({ params }) => {
  const slug = (await params).slug;
  const podcast = data.podcasts.find((pod) => pod.slug === slug);

  if (!podcast) {
    return notFound();
  }

  return (
    <div className="container mx-auto">
      <EpisodesSlider creator={podcast.title} />
    </div>
  );
};

export default podcastLandingPage;
