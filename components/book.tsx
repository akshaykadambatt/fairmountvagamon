import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button, Container, Grid, NumberInput, Text, TextInput, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import HeaderComponent from "../components/header";
import { DateRangePicker } from "@mantine/dates";

export default function Book() {
  return (
    <Grid align="center">
      <Grid.Col span={12} md={9}>
        <Grid>
          <Grid.Col span={12} md={8}>
          <DateRangePicker amountOfMonths={2} excludeDate={()=>(false)} minDate={new Date()}
      label="Book a stay"  description="Enter your desired stay length"
      placeholder="Pick dates range"
    /></Grid.Col>
          <Grid.Col span={12} md={4}>
          <NumberInput
      defaultValue={1} description="Enter the number of people staying"
      placeholder="Number of people"
      label="Number of people"
      withAsterisk
    /></Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={12} md={3}><Button fullWidth size={"md"}>Check availability</Button></Grid.Col>
    </Grid>
  );
}
