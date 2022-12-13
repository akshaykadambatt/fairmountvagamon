import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Button,
  Grid,
  Paper,Text, SimpleGrid
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
import { auth } from "../../components/data/firebaseConfig";
import Navigation from "../../components/Navigation";
import {
    IconUserPlus,
    IconDiscount2,
    IconReceipt2,
    IconCoin,
    IconArrowUpRight,
    IconArrowDownRight,
  } from '@tabler/icons';

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
      display: 'flex',
      alignItems: 'center',
    },
  
    icon: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },
  
    title: {
      fontWeight: 700,
      textTransform: 'uppercase',
    },
  }));
  
  const data = [
    {
      "title": "Revenue",
      "icon": "receipt",
      "value": "13,456",
      "diff": 34
    },
    {
      "title": "Profit",
      "icon": "coin",
      "value": "4,145",
      "diff": -13
    },
    {
      "title": "Coupons usage",
      "icon": "discount",
      "value": "745",
      "diff": 18
    },
    {
      "title": "New customers",
      "icon": "user",
      "value": "188",
      "diff": -30
    }
  ] as StatsGridProps[];
  const icons = {
    user: IconUserPlus,
    discount: IconDiscount2,
    receipt: IconReceipt2,
    coin: IconCoin,
  };
  
  interface StatsGridProps {
     title: string; icon: keyof typeof icons; value: string; diff: number;
  }
export default function NavbarNested(children: React.ReactNode) {
  const signOut = async () => {
    await auth.signOut();
  };
  
  const stats = data.map((stat) => {
    const { classes } = useStyles();
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
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            color={stat.diff > 0 ? 'teal' : 'red'}
            size="sm"
            weight={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
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
        <SimpleGrid
        my={100}
        p={30}
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {stats}</SimpleGrid>
    </Navigation>
  );
}
