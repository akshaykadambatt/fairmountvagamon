import {
  Text,
  Title,
  Container,
  Box,
  Skeleton,
  useMantineTheme,
  Grid,
  Center,
  createStyles,
  Divider,
} from "@mantine/core";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CollectionName } from "../components/data/constants";
import { db } from "../components/data/firebaseConfig";
import { keyframes } from "@emotion/react";
import { Reveal } from "react-awesome-reveal";
import Head from "next/head";
import useViewport from "../components/data/useViewport";
const getChild = (height: number) => <Skeleton height={height} radius="md" />;
const BASE_HEIGHT = 360;
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);
const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translatey(30px);
  }

  to {
    opacity: 1;
    transform: translatey(0);
  }
`;

export default function Contact() {
  const [values, setValues] = useState<ExperienceProps[]>();
  const { desk, tab, mob } = useViewport();
  const theme = useMantineTheme();
  useEffect(() => {
    const run = async () => {
      const docRef = collection(db, CollectionName.EXPERIENCES);
      const docSnap = await getDocs(docRef);
      let data: any[] = [];
      docSnap.forEach((element) => {
        data.push(element.data());
      });
      console.log(data);
      setValues(data);
    };
    run();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fairmount Experiences - Explore the Natural Beauty and Cultural Treasures of Vagamon</title>
        <meta
          name="description"
          content="Experience the beauty and rich cultural heritage of Vagamon at Fairmount Resorts. Explore the natural landscapes and cultural treasures of this picturesque destination, with exquisite accommodation and blissful experiences. Book your stay now and discover the magic of Vagamon."
        />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta
          name="keywords"
          content="resort, Vagamon, Kerala, hill resort, accommodations, tree house, restaurant, room service, spa, outdoor pool, trekking, paragliding, rock climbing, resort at vagamon, fairmount vagamon, fairmount vagamon resorts, resort offers, experience resort, most popular resort, resort experience, resort nature, Vagamon resorts, Kerala hill resorts ,Western Ghats resorts ,Tea plantation resorts ,Nature resorts ,Adventure resorts ,Luxury resorts ,Relaxation resorts ,Spa resorts ,Romantic getaways ,Family vacations ,Hill station vacations ,Hill station getaways ,Western Ghats tourism ,Kerala tourism ,Tea plantation tours ,Nature tours ,Adventure tours ,Luxury travel ,Relaxation vacations ,Spa vacations ,Romantic holidays ,Family holidays ,Honeymoon destinations"
        />

        {/*<!-- Open Graph / Facebook -->*/}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Fairmount Experiences - Explore the Natural Beauty and Cultural Treasures of Vagamon"
        />
        <meta
          property="og:description"
          content="Experience the beauty and rich cultural heritage of Vagamon at Fairmount Resorts. Explore the natural landscapes and cultural treasures of this picturesque destination, with exquisite accommodation and blissful experiences. Book your stay now and discover the magic of Vagamon."
        />
        <meta property="og:image" content="https://fairmountvagamon.com/og-image.jpg" />

        {/*<!-- Twitter -->*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Fairmount Experiences - Explore the Natural Beauty and Cultural Treasures of Vagamon"
        />
        <meta
          property="twitter:description"
          content="Experience the beauty and rich cultural heritage of Vagamon at Fairmount Resorts. Explore the natural landscapes and cultural treasures of this picturesque destination, with exquisite accommodation and blissful experiences. Book your stay now and discover the magic of Vagamon."
        />
        <meta property="twitter:image" content="https://fairmountvagamon.com/og-image.jpg" />

        <meta name="author" content="Fairmount Vagamon" />
      </Head>
      <Container my={30} size={"md"}>
        <Title order={2} weight={100}>
          Experiences
        </Title>
        <Box mb={40} mt={60}>
          {!values && (
            <>
              <Skeleton height={150} m={20} />
              <Skeleton height={150} m={20} />
              <Skeleton height={150} m={20} />
            </>
          )}
          {values?.map((e, index) => (
            <>
              <Reveal keyframes={customAnimation} cascade duration={500} damping={0.3} triggerOnce={true}>
                <Grid key={index} style={{ borderRadius: 10 }} p={20}>
                  <Grid.Col xs={12} md={8} order={index % 2 == 0 ? 0 : 1}>
                    <Title order={3} weight={100} mb={15}>
                      {e.name}
                    </Title>
                    <Text size={"sm"} pr={desk?20:0}>{e.content}</Text>
                  </Grid.Col>
                  <Grid.Col xs={12} md={4} order={index % 2 == 0 ? 1 : 0}>
                    <Reveal keyframes={customAnimation} cascade duration={1200} damping={0.3} triggerOnce={true}>
                      <div className={`polaroid-item  ${index % 2 == 0 ? "polaroid-right" : "polaroid-left"}`}>
                        <div className="polaroid-wrapper">
                          <img src={e.images ? e.images[0]?.url : ""} width={"100%"} style={{ height: "229px" }} />
                          <Text size="xs" align="center" mt="sm">
                            {" "}
                            {e.name}
                          </Text>
                        </div>
                      </div>
                    </Reveal>
                  </Grid.Col>
                </Grid>
                <Divider mt={30} mb={40} />
              </Reveal>
            </>
          ))}
          <Center>
            <Text mb={30} size="xs" italic color={"dimmed"}>
              And many more...
            </Text>
          </Center>
        </Box>
      </Container>
    </>
  );
}
