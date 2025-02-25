import data from "@/data/data.json";
import EpisodeDisplay from "@/components/EpisodeDisplay";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return data.episodes.map((episode) => ({
    id: episode.id.toString(),
    slug: episode.podcast,
  }));
}
const episodeLandingPage = async ({ params }) => {
  const slug = (await params).slug;
  const id = (await params).id;
  const podcast = data.podcasts.find((pod) => pod.slug === slug);
  if (!podcast) notFound();
  const episode = data.episodes.find(
    (ep) => ep.id.toString() === id && ep.podcast === slug
  );
  if (!episode) {
    notFound();
  }

  return (
    <>
      <EpisodeDisplay id={episode.id} />
    </>
  );
};

export default episodeLandingPage;
