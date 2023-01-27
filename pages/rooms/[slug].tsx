import { Box, Text, Title, Container, Skeleton, createStyles, useMantineTheme } from "@mantine/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AmenitiesIds, CollectionName } from "../../components/data/constants";
import { db } from "../../components/data/firebaseConfig";
import { Carousel } from "@mantine/carousel";
import {
  IconBed,
  IconCampfire,
  IconDogBowl,
  IconFish,
  IconMeat,
  IconParking,
  IconToolsKitchen2,
  IconWifi,
} from "@tabler/icons";
import Book from "../../components/book";

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
    paddingBlock:20,
    minWidth:"14%"
  },
}));
export default function Room() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState<ProductProps>();
  useEffect(() => {
    const run = async () => {
      if (slug) {
        const q = query(collection(db, CollectionName.PRODUCTS), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setProduct({ ...doc.data() } as ProductProps);
        });
      }
    };
    run();
  }, [slug]);
  return (
    <Box>
      <Container size="lg" mt={40}>
        <Title weight={100}>{product ? product?.name : <Skeleton height={100} />}</Title>
        <Text mt={20}>{product ? product?.shortDescription : <Skeleton height={300} mt={40} />}</Text>
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
        {product?.images.map((e) => (
          <Carousel.Slide key={e.name} style={{ background: `url(${e.url})`, backgroundSize: "cover" }}>
            <Container size="lg" py={"15%"} my={30}></Container>
          </Carousel.Slide>
        ))}
      </Carousel>
      <Container size="lg" mt={40}>
        <Text>{product ? product?.description : <Skeleton height={300} mt={30} />}</Text>
      </Container>
      <Box style={{ background: theme.colors.green[7] }} mt={40}>
        <Container size="lg" py={30}>
          <Title order={3} pb={20} color="white" weight={100}>Amenities</Title>
          <Box style={{display:"flex",gap:20,flexWrap:"wrap"}}>
            {product?.amenities.map((e) => (
              <Box key={e}>
                {AmenitiesIds.CAMPFIRE == e && (
                  <Box className={classes.amenities}><Box style={{display:"block"}} >
                    <IconCampfire color="green" size={30} stroke={1} /></Box>
                    <Text size="sm">Campfire</Text>
                  </Box>
                )}
                {AmenitiesIds.FREEWIFI == e && (
                  <Box className={classes.amenities}><Box style={{display:"block"}} >
                    <IconWifi color="green" size={30} stroke={1} /></Box>
                    <Text  size="sm">Wifi</Text>
                  </Box>
                )}
                {AmenitiesIds.INDIANANDCHINESE == e && (
                  <Box className={classes.amenities}><Box style={{display:"block"}} >
                    <IconFish color="green" size={30} stroke={1} /></Box>
                    <Text  size="sm">Indian and Chinease</Text>
                  </Box>
                )}
                {AmenitiesIds.OUTDOORBUFFET == e && (
                  <Box className={classes.amenities}><Box style={{display:"block"}} >
                    <IconMeat color="green" size={30} stroke={1} /></Box>
                    <Text  size="sm">Outdoor Buffet</Text>
                  </Box>
                )}
                {AmenitiesIds.PARKING == e && (
                  <Box className={classes.amenities}><Box style={{display:"block"}} >
                    <IconParking color="green" size={30} stroke={1} /></Box>
                    <Text  size="sm">Parking</Text>
                  </Box>
                )}
                {AmenitiesIds.PETS == e && (
                  <Box className={classes.amenities}><Box style={{display:"block"}} >
                    <IconDogBowl color="green" size={30} stroke={1} /></Box>
                    <Text  size="sm">Pets</Text>
                  </Box>
                )}
                {AmenitiesIds.RESTAURANT == e && (
                  <Box className={classes.amenities}><Box style={{display:"block"}} >
                    <IconToolsKitchen2 color="green" size={30} stroke={1} /></Box>
                    <Text size="sm">Restaurant</Text>
                  </Box>
                )}
                {AmenitiesIds.ROOMSERVICE == e && (
                  <Box className={classes.amenities}><Box style={{display:"block"}} >
                    <IconBed color="green" size={30} stroke={1} /></Box>
                    <Text size="sm">Room Service</Text>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
      <Container size="lg" mt={40}>
        <Title order={3} weight={100} mb={30}>Book now</Title>
        <Book/>
      </Container>
    </Box>
  );
}
