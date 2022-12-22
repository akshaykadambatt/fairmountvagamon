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
  Modal,
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
  IconArrowUpRight,
  IconLogout,
  IconBuildingStore,
  IconCalendarPlus,
  IconUserX,
  IconUsers,
  IconGif,
  IconGitBranch,
  IconFile,
} from "@tabler/icons";
import { UserButton } from "./UserButton";
import { LinksGroup } from "./NavbarLinksGroup";
import { ReactChildren, useEffect, useContext, useState } from "react";
import router, { useRouter } from "next/router";
import { auth } from "../components/data/firebaseConfig";
import { AuthContext } from "./data/AuthContext";
import Link from "next/link";
import Head from "next/head";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    position: "sticky",
    top: 0,
    zIndex: 10,
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
  const { asPath, pathname } = useRouter();
  const [openDevModal, setOpenDevModal] = useState(false);
  const [devModalData, setDevModalData] = useState("");

  const { classes } = useStyles();
  const user = useContext(AuthContext);

  const mockdata = [
    { label: "Dashboard", icon: IconGauge, link: "dashboard" },
    {
      label: "Pages",
      icon: IconNotes,
      initiallyOpened: pathname?.match("admin/pages")?.length || 0 > 0 ? true : false,
      links: [
        { label: "Pages", link: "pages" },
        { label: "Add New Page", link: "/" },
        { label: "Gallery", link: "/" },
        { label: "Contacts", link: "/" },
      ],
    },
    {
      label: "Products",
      icon: IconBuildingStore,
      initiallyOpened: pathname?.match("admin/products")?.length || 0 > 0 ? true : false,
      links: [
        { label: "Products", link: "/admin/products" },
        { label: "Add New Product", link: "/admin/products/manage-product" },
      ],
    },
    {
      label: "Bookings",
      icon: IconCalendarPlus,
      initiallyOpened: pathname?.match("admin/bookings")?.length || 0 > 0 ? true : false,
      links: [
        { label: "Bookings", link: "/" },
        { label: "Modify availability", link: "/" },
        { label: "Users", link: "/" },
      ],
    },
    { label: "Testimonials", icon: IconUsers, link: "testimonials" },
    { label: "Media", icon: IconFile, link: "/admin/media" },
    { label: "Go to website", icon: IconPresentationAnalytics, link: "/" },
  ];
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
    setDevModalData("");
    //https://api.github.com/repos/akshayknz/fairmountvagamon/commits?sha=main&per_page=1&page=1
    fetch("https://api.github.com/repos/akshayknz/fairmountvagamon/commits")
      .then((r) => r.json())
      .then((r) => setDevModalData(r));
  }, []);
  return (
    <>
      <Head>
        <title>Fairmount Restorts: Admin</title>
        <meta name="description" content="Fairmount Restorts website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid gutter={0}>
        <Grid.Col span="content">
          <Navbar height={"100vh"} width={{ sm: "100%" }} p="md" pb={0} className={classes.navbar}>
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
                  <Link href="/" target={"_blank"}>
                    <Menu.Item icon={<IconArrowUpRight size={14} />}>Visit website</Menu.Item>
                  </Link>
                  <Menu.Item icon={<IconGitBranch size={14} />} onClick={() => setOpenDevModal(true)}>
                    Developer stats
                  </Menu.Item>
                  <Menu.Label>Account Settings</Menu.Label>
                  <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={signOut}>
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Navbar.Section>
          </Navbar>
        </Grid.Col>
        <Grid.Col span={9}>{children}</Grid.Col>
      </Grid>
      <Modal
        size={"70vw"}
        opened={openDevModal}
        onClose={() => setOpenDevModal(false)}
        title="Developer data"
        overflow="inside"
      >
          <pre id="json" style={{fontSize:10}}>
          {JSON.stringify(devModalData, undefined, 2)}
        </pre>
        
      </Modal>
    </>
  );
};

export default Navigation;
