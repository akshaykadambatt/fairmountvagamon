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
        <MediaComponent/>
    </Navigation>
  );
}
