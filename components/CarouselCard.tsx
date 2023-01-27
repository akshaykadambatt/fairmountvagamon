import {
  createStyles,
  Image,
  Card,
  Text,
  Group,
  Button,
  Spoiler,
  Modal,
  Box,
  Container,
  Skeleton,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import {
  IconBed,
  IconCampfire,
  IconDogBowl,
  IconFish,
  IconMeat,
  IconParking,
  IconStar,
  IconToolsKitchen2,
  IconWifi,
} from "@tabler/icons";
import { useState } from "react";
import Book from "./book";
import { AmenitiesIds } from "./data/constants";

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

  amenities: {
    background: "#fff",
    borderRadius: 10,
    paddingInline: 20,
    paddingBlock: 20,
    minWidth: "14%",
  },

  noPad: {
    ".mantine-Paper-root.mantine-Modal-modal": {
      padding:0
    }
  }
}));

interface CarouselCardProps {
  data: ProductProps;
}
export function CarouselCard({ data }: CarouselCardProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const images = data.images.map((e) => e.url) || [""];
  const [open, setOpen] = useState(false);
  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={220} />
    </Carousel.Slide>
  ));

  const openProductModal = () => {
    setOpen((p) => !p);
  };

  return (
    <>
      <Modal opened={open} onClose={openProductModal} size={"80%"} withCloseButton={false} className={classes.noPad}>
        <Box mb={50}>
          <Container size="md" mt={30}>
            <Title order={2} weight={100}>{data ? data?.name : <Skeleton height={100} />}</Title>
            <Text mt={20}>{data ? data?.shortDescription : <Skeleton height={300} mt={40} />}</Text>
          </Container>
          <Carousel
            withIndicators
            my={20}
            withControls={false}
            classNames={{
              root: classes.carousel,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator,
            }}
          >
            {data?.images.map((e) => (
              <Carousel.Slide key={e.name} style={{ background: `url(${e.url})`, backgroundSize: "cover" }}>
                <Container size="md" py={"15%"} my={30}></Container>
              </Carousel.Slide>
            ))}
          </Carousel>
          <Container size="md" mt={40}>
            <Text>{data ? data?.description : <Skeleton height={300} mt={30} />}</Text>
          </Container>
          <Box style={{ background: theme.colors.green[7] }} mt={40}>
            <Container size="md" py={30}>
              <Title order={3} pb={20} color="white" weight={100}>
                Amenities
              </Title>
              <Box style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {data?.amenities.map((e) => (
                  <Box key={e}>
                    {AmenitiesIds.CAMPFIRE == e && (
                      <Box className={classes.amenities}>
                        <Box style={{ display: "block" }}>
                          <IconCampfire color="green" size={30} stroke={1} />
                        </Box>
                        <Text size="sm">Campfire</Text>
                      </Box>
                    )}
                    {AmenitiesIds.FREEWIFI == e && (
                      <Box className={classes.amenities}>
                        <Box style={{ display: "block" }}>
                          <IconWifi color="green" size={30} stroke={1} />
                        </Box>
                        <Text size="sm">Wifi</Text>
                      </Box>
                    )}
                    {AmenitiesIds.INDIANANDCHINESE == e && (
                      <Box className={classes.amenities}>
                        <Box style={{ display: "block" }}>
                          <IconFish color="green" size={30} stroke={1} />
                        </Box>
                        <Text size="sm">Indian and Chinease</Text>
                      </Box>
                    )}
                    {AmenitiesIds.OUTDOORBUFFET == e && (
                      <Box className={classes.amenities}>
                        <Box style={{ display: "block" }}>
                          <IconMeat color="green" size={30} stroke={1} />
                        </Box>
                        <Text size="sm">Outdoor Buffet</Text>
                      </Box>
                    )}
                    {AmenitiesIds.PARKING == e && (
                      <Box className={classes.amenities}>
                        <Box style={{ display: "block" }}>
                          <IconParking color="green" size={30} stroke={1} />
                        </Box>
                        <Text size="sm">Parking</Text>
                      </Box>
                    )}
                    {AmenitiesIds.PETS == e && (
                      <Box className={classes.amenities}>
                        <Box style={{ display: "block" }}>
                          <IconDogBowl color="green" size={30} stroke={1} />
                        </Box>
                        <Text size="sm">Pets</Text>
                      </Box>
                    )}
                    {AmenitiesIds.RESTAURANT == e && (
                      <Box className={classes.amenities}>
                        <Box style={{ display: "block" }}>
                          <IconToolsKitchen2 color="green" size={30} stroke={1} />
                        </Box>
                        <Text size="sm">Restaurant</Text>
                      </Box>
                    )}
                    {AmenitiesIds.ROOMSERVICE == e && (
                      <Box className={classes.amenities}>
                        <Box style={{ display: "block" }}>
                          <IconBed color="green" size={30} stroke={1} />
                        </Box>
                        <Text size="sm">Room Service</Text>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Container>
          </Box>
          <Container size="md" mt={40}>
            <Title order={3} weight={100} mb={30}>
              Book now
            </Title>
            <Book />
          </Container>
        </Box>
        
      </Modal>
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

          {/* <Button radius="md" component={Link} href={"rooms/"+data.slug}>More Details</Button> */}
          <Button
            radius="md"
            onClick={() => {
              openProductModal();
            }}
          >
            More Details
          </Button>
        </Group>
      </Card>
    </>
  );
}
