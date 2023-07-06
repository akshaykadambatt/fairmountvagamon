import { useContext } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Button,
  Box,
  Text,
  useMantineTheme,
  Grid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { AuthContext } from "./data/AuthContext";
import { IconExternalLink } from "@tabler/icons";
import navlogo from "../assets/navlogo.svg";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "sticky",
    zIndex: 20,
    background: "#ffffff60",
    backdropFilter: "blur(10px)",
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  logo: {
    fontFamily: theme.headings.fontFamily,
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

export default function HeaderComponent() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const user = useContext(AuthContext);
  let links = [
    { link: "/", label: "Home" },
    { link: "/rooms", label: "Rooms and Rates" },
    { link: "/experiences", label: "Experiences" },
    { link: "/gallery", label: "Gallery" },
    { link: "/contact", label: "Contact Us" },
  ];
  const { asPath, pathname } = useRouter();
  const { classes, cx } = useStyles();
  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]:
          link.link == "/"
            ? link.link == pathname
            : pathname?.match(link.link)?.length || 0 > 0,
      })}
      onClick={(event) => {
        close();
      }}
    >
      {link.label}
    </Link>
  ));
  links.push({ link: "/book", label: "Check Availability" });
  const mobItems = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]:
          link.link == "/"
            ? link.link == pathname
            : pathname?.match(link.link)?.length || 0 > 0,
      })}
      onClick={(event) => {
        close();
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header
      height={HEADER_HEIGHT + (user ? 28 : 0)}
      mb={0}
      className={classes.root}
    >
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html" lang="en" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta
          name="keywords"
          content="resort, Vagamon, Kerala, hill resort, accommodations, tree house, restaurant, room service, spa, outdoor pool, trekking, paragliding, rock climbing, resort at vagamon, jmount vagamon, jmount vagamon resorts, resort offers, experience resort, most popular resort, resort experience, resort nature, Vagamon resorts, Kerala hill resorts ,Western Ghats resorts ,Tea plantation resorts ,Nature resorts ,Adventure resorts ,Luxury resorts ,Relaxation resorts ,Spa resorts ,Romantic getaways ,Family vacations ,Hill station vacations ,Hill station getaways ,Western Ghats tourism ,Kerala tourism ,Tea plantation tours ,Nature tours ,Adventure tours ,Luxury travel ,Relaxation vacations ,Spa vacations ,Romantic holidays ,Family holidays ,Honeymoon destinations"
        />
        <meta name="author" content="JMount Vagamon" />
      </Head>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <Script id="gtag"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script id="gtag"
              dangerouslySetInnerHTML={{
                __html: `
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
               page_path: window.location.pathname,
             });
           `,
              }}
            />
      {user && (
        <Box style={{ background: theme.colors.dark[7] }} p={3}>
          <Container size={"lg"}>
            <Grid justify="flex-end">
              <Grid.Col span={6}>
                <Text size="xs" color="white">
                  Hello, {user?.displayName}
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Text
                    pr={6}
                    size="xs"
                    color="white"
                    align={"right"}
                    component={Link}
                    href={"/admin/dashboard"}
                  >
                    Go to admin dashboard
                  </Text>
                  <IconExternalLink color="white" size={15} />
                </Box>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>
      )}

      <Container
        style={{ height: HEADER_HEIGHT }}
        className={`${classes.header} `}
        size="lg"
      >
        {/* <MantineLogo size={28} /> */}
        <Link href="/" className={` ${classes.logo}`}>
          <Image src={navlogo} alt="JMount Logo" height={40} />
        </Link>
        <Group spacing={5} className={classes.links}>
          {items}
          <Link href="/book">
            <Button size="xs">Check availability</Button>
          </Link>
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {mobItems}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
