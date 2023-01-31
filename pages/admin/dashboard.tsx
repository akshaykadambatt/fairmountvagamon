import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Button,
  Grid,
  Paper,
  Text,
  SimpleGrid,
  Title,
  Container,
  Loader,
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
import { UserButton } from "../../components/UserButton";
import { LinksGroup } from "../../components/NavbarLinksGroup";
import { auth, db } from "../../components/data/firebaseConfig";
import Navigation from "../../components/Navigation";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs, getCountFromServer, Timestamp } from "firebase/firestore";
import { CollectionName } from "../../components/data/constants";
import { count } from "console";
import { Joan } from "@next/font/google";

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

interface StatsGridProps {
  title: string;
  icon: keyof typeof icons;
  value: number;
  diff: number;
}
interface UselessProps {
  productCount: number;
  bookingCount: number;
  bookingCountChange: number;
  incomeCount: number;
  incomeCountChange: number;
  customerCount: number;
  customerCountChange: number;
}
export default function NavbarNested(children: React.ReactNode) {
  const { classes } = useStyles();
  const [counts, setCounts] = useState({
    productCount: 0,
    bookingCount: 0,
    bookingCountChange: 0,
    incomeCount: 0,
    incomeCountChange: 0,
    customerCount: 0,
    customerCountChange: 0,
  });
  const signOut = async () => {
    await auth.signOut();
  };
  useEffect(() => {
    const run = async () => {
      const q = await getCountFromServer(query(collection(db, CollectionName.PRODUCTS), where("status", "==", true)));

      const q2 = await getCountFromServer(query(collection(db, CollectionName.BOOKINGS), where("status", "==", true)));
      const q3 = await getDocs(query(collection(db, CollectionName.BOOKINGS), where("status", "==", true)));
      let data: BookingData[] = [];
      let dataLastMonth: BookingData[] = [];
      await q3.docs.forEach((e) => {
        let eData = e.data() as BookingData;
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let lastMonthFirstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        let lastMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0);
        if (
          new Date((eData.date[0] as unknown as Timestamp).toDate()) > firstDay &&
          new Date((eData.date[0] as unknown as Timestamp).toDate()) < lastDay
        ) {
          data.push(e.data() as BookingData);
        }
        if (
          new Date((eData.date[0] as unknown as Timestamp).toDate()) > lastMonthFirstDay &&
          new Date((eData.date[0] as unknown as Timestamp).toDate()) < lastMonthLastDay
        ) {
          dataLastMonth.push(e.data() as BookingData);
        }
      });
      setCounts({
        productCount: q.data().count,
        bookingCount: data.length,
        bookingCountChange: data.length - dataLastMonth.length,
        incomeCount: data.reduce((acc, curr) => acc + curr.shownPrice, 0),
        incomeCountChange: data.reduce((acc, curr) => acc + curr.shownPrice, 0) - dataLastMonth.reduce((acc, curr) => acc + curr.shownPrice, 0),
        customerCount: 0,
        customerCountChange: 0,
      });
    };
    run();
  }, []);

  let data = [
    {
      title: "Bookings",
      icon: "receipt",
      value: counts.bookingCount,
      diff: counts.bookingCountChange,
    },
    {
      title: "Income",
      icon: "coin",
      value: counts.incomeCount,
      diff: counts.incomeCountChange,
    },
    {
      title: "New customers",
      icon: "user",
      value: counts.customerCount,
      diff: counts.customerCountChange,
    },
    {
      title: "Products",
      icon: "discount",
      value: counts.productCount,
      diff: counts.productCount,
    },
  ] as StatsGridProps[];
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size={22} stroke={1.5} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value==0? <Loader size={"sm"} />:stat.value}</Text>
          <Text color={stat.diff > 0 ? "teal" : "red"} size="sm" weight={500} className={classes.diff}>
            <span>{stat.diff==0? <Loader size={"sm"} />:stat.diff+"%"}</span>
            <DiffIcon size={16} stroke={1.5} />
          </Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <Navigation>
      <Container>
        <Title my={30} weight={100} order={2}>
          Welcome, Admin
        </Title>
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: "md", cols: 2 },
            { maxWidth: "xs", cols: 1 },
          ]}
        >
          {stats}
        </SimpleGrid>
      </Container>
    </Navigation>
  );
}
