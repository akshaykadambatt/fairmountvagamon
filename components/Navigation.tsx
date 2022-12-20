import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Button,
  Grid,
  Text,
} from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from "@tabler/icons";
import { UserButton } from "./UserButton";
import { LinksGroup } from "./NavbarLinksGroup";
import { auth } from "./data/firebaseConfig";
import { ReactChildren, useEffect } from "react";
import router from "next/router";

const mockdata = [
  { label: "Dashboard", icon: IconGauge },
  {
    label: "Pages",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Pages", link: "pages" },
      { label: "Add New Page", link: "/" },
    ],
  },
  {
    label: "Products",
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: "Products", link: "/" },
      { label: "Add New Product", link: "/" },
    ],
  },
  {
    label: "Bookings and availabiliy",
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: "Bookings", link: "/" },
      { label: "Modify availability", link: "/" },
      { label: "Users", link: "/" },
    ],
  },
  { label: "Testimonials", icon: IconPresentationAnalytics, link:"testimonials"  },
  { label: "Go to website", icon: IconPresentationAnalytics, link:"/" },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));
type Props = { children: React.ReactNode };
const Navigation: React.FC<Props> = ({ children }) => {
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));
  const signOut = async () => {
    await auth.signOut();
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
      } else {
        router.push("/admin");
      }
    });
  }, []);
  return (
    <Grid>
      <Grid.Col span={3}>
        <Navbar
          height={600}
          width={{ sm: "100%" }}
          p="md"
          className={classes.navbar}
        >
          <Navbar.Section className={classes.header}>
            <Group position="apart">
              <Text>Fairmount Resorts</Text>
              <Code sx={{ fontWeight: 700 }}>v1.0</Code>
            </Group>
          </Navbar.Section>

          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>{links}</div>
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <UserButton
              image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              name="Ann Nullpointer"
              email="anullpointer@yahoo.com"
            />
            <Button onClick={signOut}>Logout</Button>
          </Navbar.Section>
        </Navbar>
      </Grid.Col>
      <Grid.Col span={9}>{children}</Grid.Col>
    </Grid>
  );
};

export default Navigation;
