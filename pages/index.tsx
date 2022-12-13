import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Box,
  Button,
  Container,
  Grid,
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

export default function Home() {
  const activeClass = useRef(ClassNames({ selected: "active-carousel-class" }));
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const theme = useMantineTheme();
  useEffect(() => {
    console.log("inside effects");
    let queryy = query(
      collection(db, "theme"),
    );
    getDocs(queryy).then((q) => {
      q.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    });
  });
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
                    <Text
                      weight={100}
                      px={6}
                      color="#fff"
                      className="animated-section title-1"
                    >
                      WELCOME TO
                    </Text>
                    <Title
                      px={10}
                      className="animated-section title-2"
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
                    <Text
                      weight={100}
                      px={6}
                      mb={20}
                      color="#fff"
                      className="animated-section title-3"
                    >
                      RESORTS, WAGAMON
                    </Text>
                    <Text
                      weight={100}
                      px={6}
                      mb={10}
                      color="#fff"
                      size={13}
                      className="animated-section description-1"
                    >
                      One of the most popular FairMount Vagamon Resort, offers a
                      perfect blend of all modern luxuries and a comfortable
                      companionship of nature. we have provided premium resort
                      experience and a comfortable companionship of nature. we
                      have provided premium resort experience
                    </Text>
                    <Box px={6} className="animated-section description-2">
                      <Button variant="white" color="dark" size={"xs"}>
                        Read article
                      </Button>
                    </Box>
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
                    <Text
                      weight={100}
                      px={6}
                      color="#fff"
                      className="animated-section title-1"
                    >
                      WELCOME TO
                    </Text>
                    <Title
                      px={10}
                      className="animated-section title-2"
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
                    <Text
                      weight={100}
                      px={6}
                      mb={20}
                      color="#fff"
                      className="animated-section title-3"
                    >
                      RESORTS, WAGAMON
                    </Text>
                    <Text
                      weight={100}
                      px={6}
                      mb={10}
                      color="#fff"
                      size={13}
                      className="animated-section description-1"
                    >
                      One of the most popular FairMount Vagamon Resort, offers a
                      perfect blend of all modern luxuries and a comfortable
                      companionship of nature. we have provided premium resort
                      experience and a comfortable companionship of nature. we
                      have provided premium resort experience
                    </Text>
                    <Box px={6} className="animated-section description-2">
                      <Button variant="white" color="dark" size={"xs"}>
                        Read article
                      </Button>
                    </Box>
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
                    <Text
                      weight={100}
                      px={6}
                      color="#fff"
                      className="animated-section title-1"
                    >
                      WELCOME TO
                    </Text>
                    <Title
                      px={10}
                      className="animated-section title-2"
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
                    <Text
                      weight={100}
                      px={6}
                      mb={20}
                      color="#fff"
                      className="animated-section title-3"
                    >
                      RESORTS, WAGAMON
                    </Text>
                    <Text
                      weight={100}
                      px={6}
                      mb={10}
                      color="#fff"
                      size={13}
                      className="animated-section description-1"
                    >
                      One of the most popular FairMount Vagamon Resort, offers a
                      perfect blend of all modern luxuries and a comfortable
                      companionship of nature. we have provided premium resort
                      experience and a comfortable companionship of nature. we
                      have provided premium resort experience
                    </Text>
                    <Box px={6} className="animated-section description-2">
                      <Button variant="white" color="dark" size={"xs"}>
                        Read article
                      </Button>
                    </Box>
                  </Grid.Col>
                </Grid>
              </Container>
            </Carousel.Slide>
            {/* ...other slides */}
          </Carousel>
        </Container>
        <Container mt={60} mb={60} size="lg">
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
            }}
          >
            VAGAMON
          </Text>
        </Container>
        <Container mt={30} mb={30} size="lg">
          <Grid align="center">
            <Grid.Col span={12} xs={6}>
              <Title weight={100} order={2}>
                Fairmount Resort Vagamon
              </Title>
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
              <Text size={13}>
                One of the most popular{" "}
                <strong>Fairmount Vagamon Resort</strong>, offers a perfect
                blend of all modern luxuries and a comfortable companionship of
                nature. we have provided premium resort experience and a
                comfortable companionship of nature. we have provided premium
                resort experience.
              </Text>
            </Grid.Col>
          </Grid>
        </Container>
        <Container mt={30} mb={70} size="lg">
          <Image
            style={{
              borderRadius: 20,
            }}
            src={resort1}
            alt="Picture of the author"
            layout="responsive"
          />
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
        </Container>
        <Container
          mt={30}
          mb={30}
          py={80}
          fluid
          style={{ background: "#00000008" }}
        >
          <Container size={"lg"}>
            <Text style={{}}>EXPERIENCE</Text>
            <Title weight={100} order={2} mb={30}>
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
