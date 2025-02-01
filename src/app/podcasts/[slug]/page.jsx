import EpisodesSlider from '@/components/EpisodesSlider'
import data from '@/data/data.json'

const podcastLandingPage = ({ params }) => {

    const podcast = data.podcasts.find(
        pod => pod.slug === params.slug
    )

  return (
    <div className='container mx-auto'>
      <EpisodesSlider creator={podcast.title} />
    </div>
  )
}

export default podcastLandingPage

export async function generateStaticParams() {
    return data.podcasts.map(podcast => {
        return {
            slug: podcast.slug
        }
    })
}