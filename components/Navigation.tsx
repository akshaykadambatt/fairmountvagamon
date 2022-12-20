import {
  Navbar,
  Group,
  Code,
  Box,
  ScrollArea,
  createStyles,
  Button,
  Grid,
  Text,
  Popover,
  TextInput,
  Menu,
  Avatar,
} from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons";
import { UserButton } from "./UserButton";
import { LinksGroup } from "./NavbarLinksGroup";
import { ReactChildren, useEffect, useContext } from "react";
import router from "next/router";
import { auth } from "../components/data/firebaseConfig";
import { AuthContext } from "./data/AuthContext";

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
    label: "Bookings",
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: "Bookings", link: "/" },
      { label: "Modify availability", link: "/" },
      { label: "Users", link: "/" },
    ],
  },
  { label: "Testimonials", icon: IconPresentationAnalytics, link: "testimonials" },
  { label: "Go to website", icon: IconPresentationAnalytics, link: "/" },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
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
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
}));
type Props = { children: React.ReactNode };
const Navigation: React.FC<Props> = ({ children }) => {
  const { classes } = useStyles();
  const user = useContext(AuthContext);
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
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
    <Grid gutter={0}>
      <Grid.Col span={3}>
        <Navbar height={"99vh"} width={{ sm: "80%" }} p="md" className={classes.navbar}>
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
            <Menu shadow="md" width={200} position="right-end" transition={"pop-top-left"}>
              <Menu.Target>
                <Box>
                  <UserButton
                    image={user?.photoURL ? user.photoURL : ""}
                    name={user?.displayName ? user.displayName : ""}
                    email={user?.email ? user.email : ""}
                  />
                </Box>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Account Settings</Menu.Label>
                <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={signOut}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Navbar.Section>
        </Navbar>
      </Grid.Col>
      <Grid.Col span={9}>{children}</Grid.Col>
    </Grid>
  );
};

export default Navigation;
