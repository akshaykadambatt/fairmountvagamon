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
import {
  IconBrandTwitter,
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
import { useForm } from "@mantine/form";
import Head from "next/head";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(-60deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
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

function SideIcon({
  name,
  data,
  Icon,
}: {
  name: string;
  data: string;
  Icon: TablerIcon;
}) {
  return (
    <Box
      style={{ display: "flex", alignItems: "center", color: "white" }}
      my={17}
    >
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
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },

    validate: {
      email: (value) => (value != "" ? null : "Enter email"),
    },
  });
  useEffect(() => {
    const run = async () => {
      const docRef = doc(db, CollectionName.PAGES, "contacts");
      const docSnap = await getDoc(docRef);
      setValues({ ...docSnap.data() } as ContactData);
    };
    run();
  }, []);
  const handleSubmit = async (values: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    let formD = new FormData();
    formD.append("name", values.name);
    formD.append("email", values.email);
    formD.append("phone", values.phone);
    formD.append("message", values.message);
    fetch("/api/sendgrid", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((e) => e.json())
      .then((r) => {
        form.reset();
        showNotification({
          title: 'We have recieved your enquiry',
          message: 'We are working on it and will contact you within 2-3 business days.',
          styles: (theme) => ({
            title: {
              fontSize:14,
            },
            description: {
              fontSize:10,
            }
          }),
        })
      });
  };
  return (
    <>
      <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>JMount Resorts - Contact Us</title>
      <meta
        name="description"
        content="Address: JMount Resorts Vagamon, Kannamkulam, Vagamon, Kerala - 685503 <br></br> Contact: +91 88488 86990"
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
        content="resort, Vagamon, Kerala, hill resort, accommodations, tree house, restaurant, room service, spa, outdoor pool, trekking, paragliding, rock climbing, resort at vagamon, jmount vagamon, jmount vagamon resorts, resort offers, experience resort, most popular resort, resort experience, resort nature, Vagamon resorts, Kerala hill resorts ,Western Ghats resorts ,Tea plantation resorts ,Nature resorts ,Adventure resorts ,Luxury resorts ,Relaxation resorts ,Spa resorts ,Romantic getaways ,Family vacations ,Hill station vacations ,Hill station getaways ,Western Ghats tourism ,Kerala tourism ,Tea plantation tours ,Nature tours ,Adventure tours ,Luxury travel ,Relaxation vacations ,Spa vacations ,Romantic holidays ,Family holidays ,Honeymoon destinations"
      />

      {/*<!-- Open Graph / Facebook -->*/}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="JMount Resorts - Contact Us" />
      <meta property="og:description" content="Address: JMount Resorts Vagamon, Kannamkulam, Vagamon, Kerala - 685503 <br></br> Contact: +91 88488 86990" />
      <meta property="og:image" content="https://jmountvagamon.in/og-image.jpg" />

      {/*<!-- Twitter -->*/}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content="JMount Resorts - Contact Us" />
      <meta property="twitter:description" content="Address: JMount Resorts Vagamon, Kannamkulam, Vagamon, Kerala - 685503 <br></br> Contact: +91 88488 86990" />
      <meta property="twitter:image" content="https://jmountvagamon.in/og-image.jpg" />

      <meta name="author" content="JMount Vagamon" />
      </Head>
      <Container my={30}>
        <div className={classes.wrapper}>
          <SimpleGrid
            cols={2}
            spacing={50}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <div>
              <Title className={classes.title} weight={100}>Contact Us</Title>
              <Text className={classes.description} mt="sm" mb={30}>
                Leave your email and we will get back to you within 24 hours
              </Text>

              <SideIcon name="Email" data={values?.email || ""} Icon={IconAt} />
              <SideIcon
                name="Phone"
                data={values?.phone || ""}
                Icon={IconPhone}
              />
              <SideIcon
                name="Hours"
                data={values?.hours || ""}
                Icon={IconLockOpen}
              />
              <SideIcon
                name="Instagram"
                data={values?.address || ""}
                Icon={IconLocation}
              />

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
            <form
              onSubmit={form.onSubmit((values) => {
                handleSubmit(values);
              })}
            >
              <div className={classes.form}>
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  mt="md"
                  {...form.getInputProps("name")}
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  mt="md"
                  required
                  {...form.getInputProps("email")}
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />
                <TextInput
                  label="Phone"
                  placeholder="2345234524"
                  mt="md"
                  required
                  {...form.getInputProps("phone")}
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />
                <Textarea
                  required
                  label="Message"
                  placeholder="Your message"
                  minRows={4}
                  {...form.getInputProps("message")}
                  mt="md"
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />

                <Group position="right" mt="md">
                  <Button className={classes.control} type="submit">
                    Send message
                  </Button>
                </Group>
              </div>
            </form>
          </SimpleGrid>
        </div>

        <Box my={40} style={{ borderRadius: 20, overflow: "hidden" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: values?.map || "",
            }}
          />
        </Box>
      </Container>
    </>
  );
}
