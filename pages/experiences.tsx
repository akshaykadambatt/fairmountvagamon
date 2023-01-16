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
import { doc, getDoc } from "firebase/firestore";
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
  const [values, setValues] = useState<ContactData>();
  const theme = useMantineTheme();
  useEffect(() => {
    const run = async () => {
      const docRef = doc(db, CollectionName.PAGES, "contacts");
      const docSnap = await getDoc(docRef);
      setValues({ ...docSnap.data() } as ContactData);
    };
    run();
  }, []);

  return (
    <>
    <Head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fairmount Resorts - Explore the Natural Beauty and Cultural Treasures of Vagamon</title>
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
      content="Escape to the stunning beauty of Vagamon at Fairmount Residency. Our resort offers comfortable accommodations, a range of dining options, and a range of activities and amenities to ensure that our guests have a comfortable and enjoyable stay."
    />
    <meta name="author" content="Fairmount Vagamon" />
    </Head>
    <Container my={30}>
      <Title order={2} weight={100}>
        Experiences
      </Title>
    </Container>
    </>
  );
}
