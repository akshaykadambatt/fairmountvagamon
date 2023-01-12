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
    <Container my={30}>
      <Title order={2} weight={100}>
        Frequently Asked Questions
      </Title>
      <Container my="md">
        <SimpleGrid cols={4} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
          {getChild(BASE_HEIGHT)}
          <Stack>
            {getChild(getSubHeight(2, theme.spacing.md))}
            {getChild(getSubHeight(2, theme.spacing.md))}
          </Stack>
          <Stack>
            {getChild(getSubHeight(3, theme.spacing.md))}
            {getChild(getSubHeight(3, theme.spacing.md))}
            {getChild(getSubHeight(3, theme.spacing.md))}
          </Stack>
          {getChild(BASE_HEIGHT)}
        </SimpleGrid>
      </Container>
      <Container my="md">
        <SimpleGrid cols={4} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
          {getChild(BASE_HEIGHT)}
          <Stack>
            {getChild(getSubHeight(2, theme.spacing.md))}
            {getChild(getSubHeight(2, theme.spacing.md))}
          </Stack>
          <Stack>
            {getChild(getSubHeight(3, theme.spacing.md))}
            {getChild(getSubHeight(3, theme.spacing.md))}
            {getChild(getSubHeight(3, theme.spacing.md))}
          </Stack>
          {getChild(BASE_HEIGHT)}
        </SimpleGrid>
      </Container>
    </Container>
  );
}
