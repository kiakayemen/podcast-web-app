import data from '@/data/data.json'

const tabaghe16Episode = ({params}) => {
    const episode = data.episodes.find(
        ep => ep.id.toString() === params.id
    );
    if (!episode) {
        return <div>Episode not found!!</div>
    }

    return (
        <div>
            {episode.title}
        </div>
  )
}

export default tabaghe16Episode
export async function generateStaticParams() {
    return data.episodes.map(episode => ({
        id: episode.id.toString(),
    }))
}