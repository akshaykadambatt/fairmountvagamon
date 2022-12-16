import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button, Container, Grid, NumberInput, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import HeaderComponent from "../components/header";
import { DateRangePicker } from "@mantine/dates";
import { query, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./data/firebaseConfig";
import { CollectionName } from "./data/constants";
import { RangeCalendar } from '@mantine/dates';
export default function Book() {
  const theme = useMantineTheme();
  const [year, setYear] = useState(0)
  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ]);
  useEffect(() => {
    let queryy = query(
      collection(db, CollectionName.BOOKINGS),
    );
    getDocs(queryy).then((q) => {
      q.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    });
  },[]);
  useEffect(() => {
    //on year change get booking data of that year
  },[year]);
  function dateChange (value: Date) {
    // console.log(value);
  }
  function dayRenderer (value: Date) {
    if(year!=value.getFullYear()){
      setYear(value.getFullYear())
    }
  }
  return (
    <Grid align="center">
      <Grid.Col span={12} md={9}>
        <Grid>
          <Grid.Col span={12} md={8}>
          <RangeCalendar value={value} onChange={setValue} amountOfMonths={2} onMonthChange={dayRenderer}/>
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
