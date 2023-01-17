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
} from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, TablerIcon, IconAt, IconPhone, IconLockOpen, IconLocation, IconBrandFacebook, IconBrandWhatsapp } from "@tabler/icons";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CollectionName } from "../components/data/constants";
import { db } from "../components/data/firebaseConfig";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl * 2.5,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: theme.spacing.xl * 1.5,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: 300,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    "&:hover": {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    "&::placeholder": {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },

  wrapper2: {
    display: "flex",
    alignItems: "center",
    color: theme.white,
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundImage: "none",
    backgroundColor: "transparent",
  },

  title2: {
    color: theme.colors[theme.primaryColor][0],
  },

  description2: {
    color: theme.white,
  },
}));

function SideIcon({ name, data, Icon }: { name: string; data: string; Icon: TablerIcon }) {
  return (
    <Box style={{ display: "flex", alignItems: "center", color: "white" }} my={17}>
      <Icon size={28} />
      <Box pl={15}>
        <Text size="xs">{name}</Text>
        <Text>{data}</Text>
      </Box>
    </Box>
  );
}

export default function Contact() {
  const { classes } = useStyles();
  const [values, setValues] = useState<ContactData>();
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
      <div className={classes.wrapper}>
        <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <div>
            <Title className={classes.title}>Contact us</Title>
            <Text className={classes.description} mt="sm" mb={30}>
              Leave your email and we will get back to you within 24 hours
            </Text>

            <SideIcon name="Email" data={values?.email || ""} Icon={IconAt} />
            <SideIcon name="Phone" data={values?.phone || ""} Icon={IconPhone} />
            <SideIcon name="Hours" data={values?.hours || ""} Icon={IconLockOpen} />
            <SideIcon name="Instagram" data={values?.address || ""} Icon={IconLocation} />

            <Group mt="xl">
              <ActionIcon
                component={Link}
                href={values?.twitter || ""}
                size={28}
                className={classes.social}
                variant="transparent"
              >
                <IconBrandTwitter size={22} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                component={Link}
                href={values?.instagram || ""}
                size={28}
                className={classes.social}
                variant="transparent"
              >
                <IconBrandInstagram size={22} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                component={Link}
                href={values?.facebook || ""}
                size={28}
                className={classes.social}
                variant="transparent"
              >
                <IconBrandFacebook size={22} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                component={Link}
                href={values?.whatsapp || ""}
                size={28}
                className={classes.social}
                variant="transparent"
              >
                <IconBrandWhatsapp size={22} stroke={1.5} />
              </ActionIcon>
            </Group>
          </div>
          <div className={classes.form}>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <TextInput
              label="Name"
              placeholder="Your name"
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <Textarea
              required
              label="Message"
              placeholder="Your message"
              minRows={4}
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />

            <Group position="right" mt="md">
              <Button className={classes.control}>Send message</Button>
            </Group>
          </div>
        </SimpleGrid>
      </div>
      <Box my={40} style={{ borderRadius: 20, overflow: "hidden" }}>
        <div
          dangerouslySetInnerHTML={{
            __html: values?.map||""
          }}
        />
      </Box>
    </Container>
  );
}
