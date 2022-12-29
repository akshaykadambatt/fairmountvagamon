import { createStyles, Image, Card, Text, Group, Button, Spoiler } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconStar } from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme, _params, getRef) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  carousel: {
    "&:hover": {
      [`& .${getRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    width: 4,
    height: 4,
    transition: "width 250ms ease",

    "&[data-active]": {
      width: 16,
    },
  },
}));

interface CarouselCardProps {
    data: ProductProps
}
export function CarouselCard({ data }: CarouselCardProps) {
  const { classes } = useStyles();
  const images = data.images.map(e=>e.url) || [""];

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={220} />
    </Carousel.Slide>
  ));

  return (
    <Card radius="md" withBorder p="xl">
      <Card.Section>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>

      <Group position="apart" mt="lg">
        <Text weight={500} size="lg">
          {data.name}
        </Text>

        <Group spacing={5}>
          <IconStar size={16} />
          <Text size="xs" weight={500}>
            5
          </Text>
        </Group>
      </Group>
      <Spoiler maxHeight={120} showLabel="Show more" style={{ fontSize: 13 }} hideLabel="Hide">
        <Text size="sm" color="dimmed" mt="sm">
          {data.shortDescription}
        </Text>
      </Spoiler>

      <Group position="apart" mt="md">
        <div>
          <Text size="xl" span weight={500} className={classes.price}>
          ₹{data.price}
          </Text>
          <Text span size="sm" color="dimmed">
            {" "}
            / day
          </Text>
        </div>

        <Button radius="md" component={Link} href={"rooms/"+data.slug}>More Details</Button>
      </Group>
    </Card>
  );
}
