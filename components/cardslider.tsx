import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { createStyles, Paper, Text, Title, Button, useMantineTheme, Box } from "@mantine/core";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { CollectionName } from "./data/constants";
import { db } from "./data/firebaseConfig";

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: ` ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

function Card(data: ExperienceProps) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${data.images ? data.images[0]?.url : null})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {data.name}
        </Text>
        <Title order={3} className={classes.title} variant={"gradient"} gradient={{ from: "#ffffff", to: "#ffffff80" }}>
          {data.show_in_carousel_caption}
        </Title>
      </div>
    </Paper>
  );
}

export default function Cardslider() {
  const theme = useMantineTheme();
  const [values, setValues] = useState<ExperienceProps[]>([]);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  useEffect(() => {
    const run = async () => {
      const docRef = collection(db, CollectionName.EXPERIENCES);
      const docSnap = await getDocs(docRef);
      let data: ExperienceProps[] = [];
      docSnap.forEach((element) => {
        if(element.data().show_in_carousel) data.push(element.data() as ExperienceProps);
      });
      setValues(data);
    };
    run();
  }, []);
  const slides = values.map((item) => (
    <Carousel.Slide key={item.name}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <>
      {slides.length && (
        <Carousel
          slideSize="50%"
          breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
          slideGap="xl"
          align="start"
          loop
          slidesToScroll={mobile ? 1 : 2}
        >
          {slides}
        </Carousel>
      )}
    </>
  );
}
