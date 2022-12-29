import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container, Grid, Text, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Navigation from "../../components/Navigation";
import MediaComponent from "../../components/mediaComponent";

export default function Media() {
  return (
    <Navigation>
      <Container pt={50} mb={100}>
        <Title order={2} weight={100} mb={20}>
          Media
        </Title>
        <MediaComponent
          selectImage={function (data: MediaProps): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Container>
    </Navigation>
  );
}
