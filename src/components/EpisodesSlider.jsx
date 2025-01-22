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

export default function EpisodesSlider() {
  const episodes = data.episodes;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const convertTime = useConvertTime();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {episodes.map((episode, index) => (
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
    </>
  );
}
