import { useContext, useState } from "react";
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
import navlogo from '../assets/navlogo.svg';
import Image from "next/image";

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
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
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
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
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
    { link: "/roomss", label: "Experiences" },
    { link: "/gallery", label: "Gallery" },
    { link: "/contact", label: "Contact Us" },
  ];
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </Link>
  ));
  links.push({link:"/book", label:"Check Availability"})
  const mobItems = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT + (user ? 28 : 0)} mb={0} className={classes.root}>
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
                  <Text pr={6} size="xs" color="white" align={"right"} component={Link} href={"/admin/dashboard"}>
                    Go to admin dashboard
                  </Text>
                  <IconExternalLink color="white" size={15} />
                </Box>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>
      )}

      <Container style={{ height: HEADER_HEIGHT }} className={`${classes.header} `} size="lg">
        {/* <MantineLogo size={28} /> */}
        <Link href="/" className={` ${classes.logo}`}>
          <Image src={navlogo} alt="Fairmount Logo" height={40}/>
        </Link>
        <Group spacing={5} className={classes.links}>
          {items}
          <Link href="/book">
            <Button size="xs">Check availability</Button>
          </Link>
        </Group>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
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
