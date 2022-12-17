import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import HeaderComponent from "../components/header";
import Cardslider from "../components/cardslider";
import Book from "../components/book";
import resort1 from "../assets/resort1.jpg";
import resort2 from "../assets/resort2.jpg";
import resort3 from "../assets/resort3.jpg";
import resort4 from "../assets/resort4.jpg";
import { mrDafoe } from "../styles/themes/typography";
import FeaturesGrid from "../components/features";
import ClassNames from "embla-carousel-class-names";
import { useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { db } from "../components/data/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { keyframes } from "@emotion/react";
import { Reveal } from "react-awesome-reveal";
import { IoLocationOutline } from "react-icons/io5";
import useViewport from "../components/data/useViewport";

export default function Home() {
  const { desk, tab, mob } = useViewport();
  const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translatey(30px);
  }

  to {
    opacity: 1;
    transform: translatey(0);
  }
`;
  const activeClass = useRef(ClassNames({ selected: "active-carousel-class" }));
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const theme = useMantineTheme();
  useEffect(() => {
    let queryy = query(collection(db, "theme"));
    getDocs(queryy).then((q) => {
      q.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    });
  }, []);
  return (
    <div>
      <Head>
        <title>Fairmount Restorts</title>
        <meta name="description" content="Fairmount Restorts website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container size="lg" fluid p={0}>
          <Carousel
            mx="auto"
            plugins={[activeClass.current, autoplay.current]}
            withIndicators
            height={"90vh"}
            loop
            withControls={false}
          >
            <Carousel.Slide
              style={{
                background: `url(${resort4.src}) no-repeat fixed center`,
                backgroundSize: "cover",
                boxShadow: "inset 0 0 0 2000px #00000040",
              }}
            >
              <Container mt={130} mb={30} size="lg">
                <Grid>
                  <Grid.Col span={12} xs={8}>
                    <Reveal
                      keyframes={customAnimation}
                      cascade
                      duration={500}
                      damping={0.3}
                    >
                      <Text weight={100} px={6} color="#fff">
                        WELCOME TO
                      </Text>
                      <Title
                        px={10}
                        weight={300}
                        color="#fff"
                        style={{
                          lineHeight: "84px",
                          fontFamily: mrDafoe.style.fontFamily,
                          fontSize: "clamp(4rem, -1.5rem + 18vw, 6rem)",
                        }}
                      >
                        Fairmount
                      </Title>

                      <Text weight={100} px={6} mb={10} color="#fff">
                        RESORTS, WAGAMON
                      </Text>
                      <Text weight={100} px={6} mb={10} color="#fff" size={13}>
                        One of the most popular FairMount Vagamon Resort, offers
                        a perfect blend of all modern luxuries and a comfortable
                        companionship of nature. we have provided premium resort
                        experience and a comfortable companionship of nature. we
                        have provided premium resort experience
                      </Text>
                      <Box px={6}>
                        <Button variant="white" color="dark" size={"xs"}>
                          Read article
                        </Button>
                      </Box>
                    </Reveal>
                  </Grid.Col>
                </Grid>
              </Container>
            </Carousel.Slide>
            <Carousel.Slide
              style={{
                background: `url(${resort2.src}) no-repeat fixed center`,
                backgroundSize: "cover",
                boxShadow: "inset 0 0 0 2000px #00000040",
              }}
            >
              <Container mt={130} mb={30} size="lg">
                <Grid>
                  <Grid.Col span={12} xs={8}>
                    <Reveal
                      keyframes={customAnimation}
                      cascade
                      duration={500}
                      damping={0.3}
                    >
                      <Text weight={100} px={6} color="#fff">
                        WELCOME TO
                      </Text>
                      <Title
                        px={10}
                        weight={300}
                        color="#fff"
                        style={{
                          lineHeight: "84px",
                          fontFamily: mrDafoe.style.fontFamily,
                          fontSize: "clamp(4rem, -1.5rem + 18vw, 6rem)",
                        }}
                      >
                        Fairmount
                      </Title>

                      <Text weight={100} px={6} mb={10} color="#fff">
                        RESORTS, WAGAMON
                      </Text>
                      <Text weight={100} px={6} mb={10} color="#fff" size={13}>
                        One of the most popular FairMount Vagamon Resort, offers
                        a perfect blend of all modern luxuries and a comfortable
                        companionship of nature. we have provided premium resort
                        experience and a comfortable companionship of nature. we
                        have provided premium resort experience
                      </Text>
                      <Box px={6}>
                        <Button variant="white" color="dark" size={"xs"}>
                          Read article
                        </Button>
                      </Box>
                    </Reveal>
                  </Grid.Col>
                </Grid>
              </Container>
            </Carousel.Slide>
            <Carousel.Slide
              style={{
                background: `url(${resort3.src}) no-repeat fixed center`,
                backgroundSize: "cover",
                boxShadow: "inset 0 0 0 2000px #00000040",
              }}
            >
              <Container mt={130} mb={30} size="lg">
                <Grid>
                  <Grid.Col span={12} xs={8}>
                    <Reveal
                      keyframes={customAnimation}
                      cascade
                      duration={500}
                      damping={0.3}
                    >
                      <Text weight={100} px={6} color="#fff">
                        WELCOME TO
                      </Text>
                      <Title
                        px={10}
                        weight={300}
                        color="#fff"
                        style={{
                          lineHeight: "84px",
                          fontFamily: mrDafoe.style.fontFamily,
                          fontSize: "clamp(4rem, -1.5rem + 18vw, 6rem)",
                        }}
                      >
                        Fairmount
                      </Title>

                      <Text weight={100} px={6} mb={10} color="#fff">
                        RESORTS, WAGAMON
                      </Text>
                      <Text weight={100} px={6} mb={10} color="#fff" size={13}>
                        One of the most popular FairMount Vagamon Resort, offers
                        a perfect blend of all modern luxuries and a comfortable
                        companionship of nature. we have provided premium resort
                        experience and a comfortable companionship of nature. we
                        have provided premium resort experience
                      </Text>
                      <Box px={6}>
                        <Button variant="white" color="dark" size={"xs"}>
                          Read article
                        </Button>
                      </Box>
                    </Reveal>
                  </Grid.Col>
                </Grid>
              </Container>
            </Carousel.Slide>
            {/* ...other slides */}
          </Carousel>
        </Container>

        <Container my={100} size="lg">
          <Reveal
            keyframes={customAnimation}
            cascade
            delay={300}
            triggerOnce={true}
            duration={500}
            fraction={1}
            damping={0.5}
          >
            <Title
              weight={300}
              size={"10vw"}
              style={{
                lineHeight: "124px",
                textAlign: "center",
                fontFamily: mrDafoe.style.fontFamily,
                fontSize: "clamp(4rem, -1.5rem + 18vw, 8rem)",
              }}
            >
              Fairmount
            </Title>
            <Text
              style={{
                textAlign: "center",
                letterSpacing: 5,
              }}
            >
              VAGAMON
            </Text>
          </Reveal>
        </Container>
        <Container mt={30} mb={30} size="lg">
          <Grid align="center">
            <Grid.Col span={12} xs={6}>
              <Reveal
                keyframes={customAnimation}
                delay={600}
                triggerOnce={true}
                fraction={1}
                duration={500}
              >
                <Title weight={100} order={2}>
                  Fairmount Resort Vagamon
                </Title>
              </Reveal>
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
              <Reveal
                keyframes={customAnimation}
                triggerOnce={true}
                delay={1000}
                fraction={1}
                duration={500}
              >
                <Text size={13}>
                  One of the most popular{" "}
                  <strong>Fairmount Vagamon Resort</strong>, offers a perfect
                  blend of all modern luxuries and a comfortable companionship
                  of nature. we have provided premium resort experience and a
                  comfortable companionship of nature. we have provided premium
                  resort experience.
                </Text>
              </Reveal>
            </Grid.Col>
          </Grid>
        </Container>
        <Container mt={30} mb={70} size="lg">
          <Reveal
            keyframes={customAnimation}
            triggerOnce={true}
            delay={300}
            duration={500}
            fraction={0.3}
          >
            <Image
              style={{
                borderRadius: 20,
              }}
              src={resort1}
              alt="Picture of the author"
              layout="responsive"
            />
          </Reveal>
          <Reveal
            keyframes={customAnimation}
            triggerOnce={true}
            fraction={1}
            delay={100}
            duration={500}
          >
            <Box px={20} py={30}>
              <Box
                px={20}
                py={30}
                style={{
                  marginTop: "-50px",
                  background: "#fff",
                  width: "100%",
                  position: "relative",
                  zIndex: 3,
                  borderRadius: "10px",
                  boxShadow: "3px 4px 20px 20px #00000008",
                }}
              >
                <Book />
              </Box>
            </Box>
          </Reveal>
        </Container>
        <Container mt={70} mb={100} size="lg">
          <Reveal
            keyframes={customAnimation}
            triggerOnce={false}
            delay={100}
            duration={500}
          >
            <Text style={{ letterSpacing: 5 }}>ABOUT VAGAMON</Text>
            <Title mb={30} mt={10} weight={100} order={2} size={50}>
              The heavenly hills
            </Title>
            <Grid gutter={40}>
              <Grid.Col span={6}>
                <Text style={{ width: "90%" }} mb={20} size="sm">
                  One of the most popular{" "}
                  <strong>Fairmount Vagamon Resort</strong>, offers a perfect
                  blend of all modern luxuries and a comfortable companionship
                  of nature. we have provided premium resort experience and a
                  comfortable companionship of nature. we have provided premium
                  resort experience. ne of the most popular{" "}
                </Text>
                <Text style={{ width: "90%" }} mb={20} size="sm">
                  <strong>Fairmount Vagamon Resort</strong>, offers a perfect
                  blend of all modern luxuries and a comfortable companionship
                  of nature. we have provided premium resort experience and a
                  comfortable companionship of nature. we have provided premium
                  resort experience.
                </Text>
                <Box display={"flex"}>
                  <Button mr={15}>Check Availabliltiy</Button>
                  <Button variant="outline">Contact Us</Button>
                </Box>
              </Grid.Col>
              <Grid.Col span={6} pt={15}>
                <Reveal
                  keyframes={customAnimation}
                  triggerOnce={false}
                  delay={300}
                  duration={500}
                  cascade
                  damping={0.2}
                >
                  <Box
                    pb={15}
                    mb={15}
                    style={{ borderBottom: "1px solid #00000050" }}
                  >
                    <Grid>
                      <Grid.Col span={2}>
                        <Text mb={10} color="grey">
                          01 / 03
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={10}>
                        <Title order={6} mb={10}>
                          Thangalpara
                        </Title>
                        <Text size={13} color="gray">
                          Vast and beautiful. we have provided premium resort
                          experience and a comfortable companionship of nature.
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Box>
                  <Box
                    pb={15}
                    mb={15}
                    style={{ borderBottom: "1px solid #00000050" }}
                  >
                    <Grid>
                      <Grid.Col span={2}>
                        <Text mb={10} color="grey">
                          02 / 03
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={10}>
                        <Title order={6} mb={10}>
                          Vagamon Meadows
                        </Title>
                        <Text size={13} color="gray">
                          Vast and beautiful. we have provided premium resort
                          experience and a comfortable companionship of nature.
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Box>
                  <Box pb={15} mb={15}>
                    <Grid>
                      <Grid.Col span={2}>
                        <Text mb={10} color="grey">
                          03 / 03
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={10}>
                        <Title order={6} mb={10}>
                          Vagamon Meadows Lake
                        </Title>
                        <Text size={13} color="gray">
                          Vast and beautiful. we have provided premium resort
                          experience and a comfortable companionship of nature.
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Box>
                </Reveal>
              </Grid.Col>
            </Grid>
          </Reveal>
        </Container>
        <Reveal
          keyframes={customAnimation}
          triggerOnce={false}
          delay={100}
          duration={500}
        >
          <Container
            mt={30}
            mb={70}
            size="lg"
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: desk? 15:0,
            }}
          >
            <video
              src={"/resort-video.mp4"}
              autoPlay
              loop
              muted
              style={{
                width: "200%",
                height: "250%",
                position: "absolute",
                top: "-85%",
                left: "-45%",
              }}
            />

            <Container
              py={100}
              size="lg"
              style={{
                background: `transparent`,
                backgroundSize: "cover",
                boxShadow:
                  "rgb(0 0 0 / 90%) 870px 0px 430px -220px inset, rgb(0 0 0 / 9%) 0px 13px 20px 20px",
                borderRadius: desk? 15:0,
              }}
            >
              <Reveal
                keyframes={customAnimation}
                triggerOnce={false}
                delay={300}
                duration={500}
                cascade
                damping={0.2}
              >
                <Badge
                  sx={{ paddingLeft: 5 }}
                  size="sm"
                  mb={9}
                  pt={10}
                  pb={9}
                  variant="outline"
                  leftSection={<IoLocationOutline size={13} />}
                >
                  <Text>Idukki</Text>
                </Badge>
                <Text color={"white"} weight={100}>
                  More than
                </Text>
                <Title
                  color={"white"}
                  weight={100}
                  mb={15}
                  mt={10}
                  order={2}
                  size={60}
                >
                  50,000
                </Title>
                <Text color={"white"} weight={100}>
                  visitors per month in the village of Vagamon
                </Text>
              </Reveal>
            </Container>
          </Container>
        </Reveal>
        <Container
          mt={30}
          mb={30}
          py={80}
          fluid
          style={{ background: "#00000008" }}
        >
          <Container size={"lg"}>
            <Text style={{ letterSpacing: 5 }}>EXPERIENCE</Text>
            <Title weight={100} order={2} mb={50} mt={10} size={50}>
              Fairmount Resort, Vagamon
            </Title>
            <Cardslider />
          </Container>
        </Container>
        <FeaturesGrid
          title={"The Fairmount Experience"}
          description={
            "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma.This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit"
          }
        />
      </main>

      <footer></footer>
    </div>
  );
}
