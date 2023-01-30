import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
} from "@mantine/core";
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
  TablerIcon,
} from "@tabler/icons";
import { mrDafoe } from "../styles/themes/typography";

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: "Free amenities",
    description:
      "Unwind and enjoy complimentary WiFi, parking, room service, a library, and more at Fairmount for a relaxing and comfortable stay.",
  },
  {
    icon: IconUser,
    title: "Privacy focused",
    description:
      "Experience ultimate privacy with our secluded cottages, private balconies, and serene surroundings at Fairmount.",
  },
  {
    icon: IconCookie,
    title: "Right in nature",
    description:
      "Indulge in the tranquility of nature right at your doorstep with Fairmount's secluded location amidst lush greenery and picturesque views.",
  },
  {
    icon: IconLock,
    title: "Secure by default",
    description:
      "Embrace the serenity of nature at Fairmount, where security is seamlessly integrated for a carefree, idyllic stay.",
  },
  {
    icon: IconMessage2,
    title: "24/7 Security and Support",
    description:
      "Relax and unwind with the peace of mind that comes with round-the-clock security and support at Fairmount.",
  },
  {
    icon: IconLock,
    title: "Pool and other facilities",
    description:
      "Where crystal waters gleam, and verdant landscapes beam, Fairmount's pool and facilities allow one to dream.",
  },
];

interface FeatureProps {
  icon: TablerIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>
        {title}
      </Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.md,
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },
}));

interface FeaturesGridProps {
  title: React.ReactNode;
  description: React.ReactNode;
  data?: FeatureProps[];
}

export default function FeaturesGrid({
  title,
  description,
  data = MOCKDATA,
}: FeaturesGridProps) {
  const { classes, theme } = useStyles();
  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <Container className={classes.wrapper}>
      <Title
        className={classes.title}
        style={{
          lineHeight: "84px",
          fontFamily: mrDafoe.style.fontFamily,
          fontSize: "clamp(4rem, -1.5rem + 18vw, 6rem)",
        }}
      >
        {title}
      </Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: "xl" },
          { maxWidth: 755, cols: 1, spacing: "xl" },
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
