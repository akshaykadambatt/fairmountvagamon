import { Title, SimpleGrid, Container, Skeleton, Stack, useMantineTheme, Box } from "@mantine/core";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { CollectionName } from "../components/data/constants";
import { db } from "../components/data/firebaseConfig";
import Head from "next/head";

const getChild = (image: string, height: number) => (
  <Box style={{ background: "url(" + image + ")", height: height, borderRadius: 5 }} />
);
const getChildSkeleton = (height: number) => <Skeleton style={{ height: height, borderRadius: 5 }} />;
const BASE_HEIGHT = 360;
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);
const images = [
  {
    src: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    width: 100,
    height: 100,
    srcSet: "",
    sizes: "",
    alt: "",
    key: "",
  },
  {
    src: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    width: 100,
    height: 100,
    srcSet: "",
    sizes: "",
    alt: "",
    key: "",
  },
];
export default function Gallery() {
  const [images, setImages] = useState<MediaProps[]>();
  const theme = useMantineTheme();
  useEffect(() => {
    const run = async () => {
      const docRef = doc(db, CollectionName.PAGES, "gallery");
      const docSnap = await getDoc(docRef);
      console.log({ ...docSnap.data() });
      setImages(docSnap.data()?.images);
    };
    run();
  }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Fairmount Gallery - A Picture is worth a Thousand Words, See the Beauty of Vagamon through our Gallery
        </title>
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
          content="Explore the idyllic views of Vagamon at Fairmount Resorts. Our photo gallery captures the natural beauty of the region, from lush hills to tranquil lakes. Book your stay now and experience the enchanting beauty of Vagamon for yourself."
        />
        <meta name="author" content="Fairmount Vagamon" />
      </Head>
      <Container my={30}>
        <Title order={2} weight={100}>
          Gallery
        </Title>
        <Container my="md">
          <SimpleGrid cols={3} spacing="xl" verticalSpacing="xl">
            {images?.map((e) => (
              <a key={e.url} href={e.url} target="_blank" rel="noreferrer">
                <Box
                  style={{ background: `url(${e.url})`, backgroundSize: "cover", height: 180, borderRadius: 5 }}
                ></Box>
              </a>
            ))}
          </SimpleGrid>
          {/* {images?.map((e) => (
            <SimpleGrid cols={4} breakpoints={[{ maxWidth: "xs", cols: 1 }]} key={e.url} mt={15}>
              {getChild(e.url, BASE_HEIGHT)}
              <Stack>
                {getChild(e.url, getSubHeight(2, theme.spacing.md))}
                {getChild(e.url, getSubHeight(2, theme.spacing.md))}
              </Stack>
              <Stack>
                {getChild(e.url, getSubHeight(3, theme.spacing.md))}
                {getChild(e.url, getSubHeight(3, theme.spacing.md))}
                {getChild(e.url, getSubHeight(3, theme.spacing.md))}
              </Stack>
              {getChild(e.url, BASE_HEIGHT)}
            </SimpleGrid>
          ))}

          <SimpleGrid cols={4} breakpoints={[{ maxWidth: "xs", cols: 1 }]} mt={20}>
            {getChildSkeleton(BASE_HEIGHT)}
            <Stack>
              {getChildSkeleton(getSubHeight(2, theme.spacing.md))}
              {getChildSkeleton(getSubHeight(2, theme.spacing.md))}
            </Stack>
            <Stack>
              {getChildSkeleton(getSubHeight(3, theme.spacing.md))}
              {getChildSkeleton(getSubHeight(3, theme.spacing.md))}
              {getChildSkeleton(getSubHeight(3, theme.spacing.md))}
            </Stack>
            {getChildSkeleton(BASE_HEIGHT)}
          </SimpleGrid> */}
        </Container>
      </Container>
    </>
  );
}
