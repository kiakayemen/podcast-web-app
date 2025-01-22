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

export default function PodcastsSlider() {
  const podcasts = data.podcasts;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const convertTime = useConvertTime();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {podcasts.map((episode, index) => (
          <Link key={index} href={episode.url}>
            <Card variant="outlined" sx={{ width: 320 }}>
              <CardOverflow>
                <AspectRatio ratio="1">
                  <Image
                    width={318}
                    height={318}
                    src={episode.thumbnailSrc}
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">{episode.title}</Typography>
                <Typography level="body-sm">{episode.creator}</Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
