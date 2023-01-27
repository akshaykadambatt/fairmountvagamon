import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  Container,
  Box,
  Skeleton,
  Stack,
  useMantineTheme,
  Grid,
  Center,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  TablerIcon,
  IconAt,
  IconPhone,
  IconLockOpen,
  IconLocation,
  IconBrandFacebook,
  IconBrandWhatsapp,
} from "@tabler/icons";
import { DocumentData, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CollectionName } from "../components/data/constants";
import { db } from "../components/data/firebaseConfig";
import Link from "next/link";
import Head from "next/head";

const getChild = (height: number) => <Skeleton height={height} radius="md" />;
const BASE_HEIGHT = 360;
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

export default function Contact() {
  const [values, setValues] = useState<ExperienceProps[]>();
  const theme = useMantineTheme();
  useEffect(() => {
    const run = async () => {
      const docRef = collection(db, CollectionName.EXPERIENCES);
      const docSnap = await getDocs(docRef);
      let data: any[] = [];
      docSnap.forEach(element => {
        data.push(element.data())
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
        <meta
          name="description"
          content="Experience the beauty and rich cultural heritage of Vagamon at Fairmount Resorts. Explore the natural landscapes and cultural treasures of this picturesque destination, with exquisite accommodation and blissful experiences. Book your stay now and discover the magic of Vagamon."
        />

        {/*<!-- Open Graph / Facebook -->*/}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fairmount Experiences - Explore the Natural Beauty and Cultural Treasures of Vagamon" />
        <meta property="og:description" content="Experience the beauty and rich cultural heritage of Vagamon at Fairmount Resorts. Explore the natural landscapes and cultural treasures of this picturesque destination, with exquisite accommodation and blissful experiences. Book your stay now and discover the magic of Vagamon." />
        <meta property="og:image" content="https://fairmountvagamon.com/og-image.jpg" />

        {/*<!-- Twitter -->*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Fairmount Experiences - Explore the Natural Beauty and Cultural Treasures of Vagamon" />
        <meta property="twitter:description" content="Experience the beauty and rich cultural heritage of Vagamon at Fairmount Resorts. Explore the natural landscapes and cultural treasures of this picturesque destination, with exquisite accommodation and blissful experiences. Book your stay now and discover the magic of Vagamon." />
        <meta property="twitter:image" content="https://fairmountvagamon.com/og-image.jpg" />

        <meta name="author" content="Fairmount Vagamon" />
      </Head>
      <Container my={30}>
        <Title order={2} weight={100}>
          Experiences
        </Title>
        <Box my={40}>
          {!values&& <>
          <Skeleton height={150} m={20} />
          <Skeleton height={150} m={20} />
          <Skeleton height={150} m={20} />
          </>}
          {values?.map((e,index)=> (
          <Grid key={index} style={{ borderRadius: 10, border: "1px solid rgba(0 0 0 / 50% )" }} my={20} p={20}> 
            <Grid.Col span={8} order={index%2==0?0:1}>
              <Title order={3} weight={100}>
              {e.name}
              </Title>
              <Text size={"sm"}>
                {e.content}
              </Text>
            </Grid.Col>
            <Grid.Col span={4} order={index%2==0?1:0}>
              <img src={e.images?e.images[0]?.url:""} width={"100%"} style={{ borderRadius:10 }}/>
              </Grid.Col>
          </Grid>
          ))}
          <Center>
            <Text mb={30} color={"dimmed"}>And many more...</Text>
          </Center>
        </Box>
      </Container>
    </>
  );
}
