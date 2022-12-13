import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button, Container, Grid, Text, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import HeaderComponent from "../components/header";

export default function Book() {
  return (
    <div>
        <Button>
            Book now
        </Button>
    </div>
  );
}
