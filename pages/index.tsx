import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Badge,
  Blockquote,
  Box,
  Button,
  Container,
  Grid,
  SimpleGrid,
  Text,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
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
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { db } from "../components/data/firebaseConfig";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { keyframes } from "@emotion/react";
import { Reveal } from "react-awesome-reveal";
import { IoLocationOutline } from "react-icons/io5";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import useViewport from "../components/data/useViewport";
import { flushSync } from "react-dom";
import { CollectionName } from "../components/data/constants";

const useStyles = createStyles((theme) => ({
  arrows: {
    display: "Flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #00000082",
    color: theme.fn.rgba(theme.colors.dark[6], 0.9),
    borderRadius: "100px",
    height: "45px",
    width: "45px",
    transition: "all .1s",
    cursor: "pointer",
    ":hover": {
      background: theme.fn.rgba(theme.colors.dark[6], 0.2),
    },
  },
  testimonialSlide: {
    opacity: 0.3,
    transition: "opacity .2s",
    "&.active-carousel-class": {
      opacity: 1,
    },
  },
}));
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
  const [embla, setEmbla] = useState<Embla | null>(null);
  const theme = useMantineTheme();
  const [testimonials, setTestimonials] = useState<any>();
  const [testimonialSlideActive, setTestimonialSlideActive] = useState<number>(0);
  const { classes } = useStyles();
  useEffect(() => {
    let queryy = query(collection(db, "theme"));
    getDocs(queryy).then((q) => {
      q.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });
  }, []);
  function scrollTestimonial(direction: string) {
    if (!embla) return;
    switch (direction) {
      case "next":
        embla.scrollNext();
        break;
      case "previous":
        embla.scrollPrev();
        break;
      default:
        break;
    }
  }
  const throttle = (fn: Function, wait: number = 300) => {
    let inThrottle: boolean, lastFn: ReturnType<typeof setTimeout>, lastTime: number;
    return function (this: any) {
      const context = this,
        args = arguments;
      if (!inThrottle) {
        fn.apply(context, args);
        lastTime = Date.now();
        inThrottle = true;
      } else {
        clearTimeout(lastFn);
        lastFn = setTimeout(() => {
          if (Date.now() - lastTime >= wait) {
            fn.apply(context, args);
            lastTime = Date.now();
          }
        }, Math.max(wait - (Date.now() - lastTime), 0));
      }
    };
  };
  useEffect(() => {
    if (!embla) return;
    embla.on(
      "scroll",
      throttle(() => {
        setTestimonialSlideActive(embla.slidesInView()[Math.floor(embla.slidesInView().length / 2)]);
      }, 200)
    );
  }, [embla]);
  useEffect(() => {
    getDocs(query(collection(db, CollectionName.TESTIMONIALS), where("status", "==", true))).then((querySnapshot) => {
      let data: TestimonialProps[] = [];
      querySnapshot.forEach((doc) => {
        data.push(Object.assign({ ...doc.data() }, { id: doc.id }) as TestimonialProps);
      });
      setTestimonials(data);
    });
  }, []);
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fairmount Resorts</title>
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="keywords" content="Fair Mount, Vagamon, Resort, Stay, Honey Moon, Nature, Trip, Refereshment, Vacation, Holidays, Top, Hills, Camp, resort at vagamon, fairmount vagamon, fairmount vagamon resorts, resort offers, experience resort, most popular resort, resort experience, resort nature" />
        <meta name="description" content="Best resort admist of vagamon's beauty, experience the refreshing nature" />
        <meta name="author" content="Fairmount Vagamon" />
      </Head>
      <main>
        <div
          dangerouslySetInnerHTML={{
            __html: `<!--Start of Tawk.to Script-->
            <script type="text/javascript">
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/63a55b55daff0e1306de0427/1gkuupi6t';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
            </script>
            <!--End of Tawk.to Script-->`
          }}
        />
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
                    <Reveal keyframes={customAnimation} cascade duration={500} damping={0.3}>
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
                        One of the most popular FairMount Vagamon Resort, offers a perfect blend of all modern luxuries
                        and a comfortable companionship of nature. we have provided premium resort experience and a
                        comfortable companionship of nature. we have provided premium resort experience
                      </Text>
                      <Box px={6}>
                        <Button variant="white" color="dark" size={"xs"}>
                          Book now
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
                    <Reveal keyframes={customAnimation} cascade duration={500} damping={0.3}>
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
                        One of the most popular FairMount Vagamon Resort, offers a perfect blend of all modern luxuries
                        and a comfortable companionship of nature. we have provided premium resort experience and a
                        comfortable companionship of nature. we have provided premium resort experience
                      </Text>
                      <Box px={6}>
                        <Button variant="white" color="dark" size={"xs"}>
                          Book now
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
                    <Reveal keyframes={customAnimation} cascade duration={500} damping={0.3}>
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
                        One of the most popular FairMount Vagamon Resort, offers a perfect blend of all modern luxuries
                        and a comfortable companionship of nature. we have provided premium resort experience and a
                        comfortable companionship of nature. we have provided premium resort experience
                      </Text>
                      <Box px={6}>
                        <Button variant="white" color="dark" size={"xs"}>
                          Book now
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
              <Reveal keyframes={customAnimation} delay={600} triggerOnce={true} fraction={1} duration={500}>
                <Title weight={100} order={2}>
                  Fairmount Resort Vagamon
                </Title>
              </Reveal>
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
              <Reveal keyframes={customAnimation} triggerOnce={true} delay={1000} fraction={1} duration={500}>
                <Text size={13}>
                  One of the most popular <strong>Fairmount Vagamon Resort</strong>, offers a perfect blend of all
                  modern luxuries and a comfortable companionship of nature. we have provided premium resort experience
                  and a comfortable companionship of nature. we have provided premium resort experience.
                </Text>
              </Reveal>
            </Grid.Col>
          </Grid>
        </Container>
        <Container mt={30} mb={70} size="lg">
          <Reveal keyframes={customAnimation} triggerOnce={true} delay={300} duration={500} fraction={0.3}>
            <Image
              style={{
                borderRadius: 20,
              }}
              src={resort1}
              alt="Resort shot"
              layout="responsive"
              placeholder="blur"
            />
          </Reveal>
          <Reveal
            keyframes={customAnimation}
            triggerOnce={true}
            fraction={1}
            delay={100}
            duration={500}
            style={{
              marginTop: "-60px",
              width: "100%",
              position: "relative",
              zIndex: 3,
            }}
          >
            <Box px={20} py={30}>
              <Box
                px={20}
                py={30}
                style={{
                  background: "#fff",
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "3px 4px 20px 20px #00000008",
                }}
              >
                <Book/>
              </Box>
            </Box>
          </Reveal>
        </Container>
        <Container mt={70} mb={100} size="lg">
          <Reveal keyframes={customAnimation} triggerOnce={false} delay={100} duration={500}>
            <Text style={{ letterSpacing: 5 }}>ABOUT VAGAMON</Text>
            <Title mb={30} mt={10} weight={100} order={2} size={50}>
              The heavenly hills
            </Title>
            <Grid gutter={40}>
              <Grid.Col span={12} sm={6}>
                <Text style={{ width: "90%" }} mb={20} size="sm">
                  One of the most popular <strong>Fairmount Vagamon Resort</strong>, offers a perfect blend of all
                  modern luxuries and a comfortable companionship of nature. we have provided premium resort experience
                  and a comfortable companionship of nature. we have provided premium resort experience. ne of the most
                  popular{" "}
                </Text>
                <Text style={{ width: "90%" }} mb={20} size="sm">
                  <strong>Fairmount Vagamon Resort</strong>, offers a perfect blend of all modern luxuries and a
                  comfortable companionship of nature. we have provided premium resort experience and a comfortable
                  companionship of nature. we have provided premium resort experience.
                </Text>
                <Box display={"flex"} style={{ flexDirection: desk ? "row" : "column" }}>
                  <Button mr={15}>Check Availabliltiy</Button>
                  <Button variant="outline">Contact Us</Button>
                </Box>
              </Grid.Col>
              <Grid.Col span={12} sm={6} pt={15}>
                <Reveal
                  keyframes={customAnimation}
                  triggerOnce={false}
                  delay={300}
                  duration={500}
                  cascade
                  damping={0.2}
                >
                  <Box pb={15} mb={15} style={{ borderBottom: "1px solid #00000050" }}>
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
                          Vast and beautiful. we have provided premium resort experience and a comfortable companionship
                          of nature.
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Box>
                  <Box pb={15} mb={15} style={{ borderBottom: "1px solid #00000050" }}>
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
                          Vast and beautiful. we have provided premium resort experience and a comfortable companionship
                          of nature.
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
                          Vast and beautiful. we have provided premium resort experience and a comfortable companionship
                          of nature.
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Box>
                </Reveal>
              </Grid.Col>
            </Grid>
          </Reveal>
        </Container>
        <Reveal keyframes={customAnimation} triggerOnce={false} delay={100} duration={500}>
          <Container
            mt={30}
            mb={70}
            px={0}
            size="lg"
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: desk ? 15 : 0,
            }}
          >
            <video
              src={"/resort-video.mp4"}
              autoPlay
              loop
              muted
              style={{
                width: "118%",
                height: "203%",
                position: "absolute",
                top: "-52%",
                left: "-14%",
                zIndex: -1,
              }}
            />

            <Container
              py={100}
              fluid
              px={"10%"}
              style={{
                background: `transparent`,
                backgroundSize: "cover",
                boxShadow: "rgb(0 0 0 / 90%) 870px 0px 430px -220px inset, rgb(0 0 0 / 9%) 0px 13px 20px 20px",
                borderRadius: desk ? 15 : 0,
              }}
            >
              <Reveal keyframes={customAnimation} triggerOnce={false} delay={300} duration={500} cascade damping={0.2}>
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

                <Title color={"white"} weight={100} mb={15} mt={10} order={2} size={60}>
                  <Reveal duration={500} triggerOnce={false} cascade>
                    80,000
                  </Reveal>
                </Title>
                <Text color={"white"} weight={100}>
                  visitors per month in the village of Vagamon
                </Text>
              </Reveal>
            </Container>
          </Container>
        </Reveal>
        <Container mt={30} mb={30} py={80} fluid style={{ background: "#00000008" }}>
          <Container size={"lg"}>
            <Text style={{ letterSpacing: 5 }}>EXPERIENCE</Text>
            <Title weight={100} order={2} mb={50} mt={10} size={50}>
              Vagamon at Fairmount
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
        <Container
          mt={30}
          mb={70}
          px={0}
          fluid
          style={{
            background: theme.colors.green[7],
          }}
        >
          <Container mt={30} mb={70} py={40} size="lg">
            <Grid gutter={40}>
              <Grid.Col span={12} sm={12} md={3}>
                <Text style={{ letterSpacing: 5 }} color="white">
                  VAGAMON MEADOWS
                </Text>
                <Title weight={100} order={2} mb={50} mt={10} size={50} color="white">
                  Book your rooms now.
                </Title>
              </Grid.Col>
              <Grid.Col span={12} sm={6} md={4}>
                <Image
                  style={{
                    borderRadius: 20,
                    boxShadow: "3px 10px 20px 20px #00000020",
                  }}
                  src={resort1}
                  alt="Resort shot"
                  layout="responsive"
                  placeholder="blur"
                />
              </Grid.Col>
              <Grid.Col span={12} sm={6} md={5}>
                <Text style={{ width: "90%" }} mb={20} size="sm" color={"white"}>
                  <strong>Fairmount Vagamon Resort</strong>, offers a perfect blend of all modern luxuries and a
                  comfortable companionship of nature. we have provided premium resort experience and a comfortable
                  companionship of nature.{" "}
                </Text>
                <Text style={{ width: "90%" }} mb={20} size="sm" color={"white"}>
                  People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not
                  melt even
                </Text>
                <Box display={"flex"} style={{ flexDirection: desk ? "row" : "column" }}>
                  <Button mr={15} variant="white">
                    Check Availabliltiy
                  </Button>
                  <Button>Contact Us</Button>
                </Box>
              </Grid.Col>
            </Grid>
          </Container>
        </Container>
        <Container mt={30} mb={70} py={40} fluid px={0}>
          <Container size="lg">
            <Grid>
              <Grid.Col span={12} md={10}>
                <Text style={{ letterSpacing: 5 }}>REVIEWS, TESTIMONIALS</Text>
                <Title weight={100} order={2} mb={50} mt={10} size={50}>
                  What people say about us.
                </Title>
              </Grid.Col>
              <Grid.Col span={12} md={2}>
                <SimpleGrid
                  cols={2}
                  style={{
                    height: "100%",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                >
                  <Box className={classes.arrows} onClick={() => scrollTestimonial("previous")}>
                    <BsArrowLeft />
                  </Box>
                  <Box className={classes.arrows} onClick={() => scrollTestimonial("next")}>
                    <BsArrowRight />
                  </Box>
                </SimpleGrid>
              </Grid.Col>
            </Grid>
          </Container>
          {testimonials && (
            <Carousel
              mx="auto"
              slideSize="38%"
              slideGap={40}
              py={50}
              loop={true}
              withControls={false}
              getEmblaApi={setEmbla}
              inViewThreshold={1}
            >
              {testimonials.map((testimonial: TestimonialProps, index: number) => (
                <Carousel.Slide
                  key={testimonial.id}
                  className={`${classes.testimonialSlide} ${testimonialSlideActive == index && "active-carousel-class"}`}
                >
                  <Box>
                    <Box
                      style={{
                        border: "1px solid #00000030",
                        boxShadow: "0px 20px 30px 10px #00000010",
                        borderRadius: 13,
                      }}
                      py={10}
                      px={30}
                      m={20}
                      mb={49}
                    >
                      <Blockquote cite={testimonial.name}>{testimonial.content}</Blockquote>
                    </Box>
                  </Box>
                </Carousel.Slide>
              ))}
            </Carousel>
          )}
        </Container>
      </main>
      <footer></footer>
    </div>
  );
}
