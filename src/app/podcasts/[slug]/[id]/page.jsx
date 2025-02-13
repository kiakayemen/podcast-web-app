import data from '@/data/data.json'
import EpisodeDisplay from '@/components/EpisodeDisplay';

const episodeLandingPage = ({params}) => {
    const episode = data.episodes.find(
        ep => ep.id.toString() === params.id
    );
    if (!episode) {
        return <div>Episode not found!!</div>
    }

    return (
        <>
            <EpisodeDisplay id={episode.id} />
        </>
  )
}

export default episodeLandingPage
export async function generateStaticParams() {
    return data.episodes.map(episode => ({
        id: episode.id.toString(),
    }))
}