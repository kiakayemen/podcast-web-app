import data from '@/data/data.json'
import EpisodeDisplay from '@/components/EpisodeDisplay';

const tabaghe16Episode = ({params}) => {
    const episode = data.episodes.find(
        ep => ep.id.toString() === params.id
    );
    if (!episode) {
        return <div>Episode not found!!</div>
    }

    return (
        <div>
            <EpisodeDisplay id={episode.id} />
        </div>
  )
}

export default tabaghe16Episode
export async function generateStaticParams() {
    return data.episodes.map(episode => ({
        id: episode.id.toString(),
    }))
}