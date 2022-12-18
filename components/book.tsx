import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Box,
  Button,
  Container,
  Grid,
  NumberInput,
  Popover,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import HeaderComponent from "../components/header";
import { DateRangePicker } from "@mantine/dates";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./data/firebaseConfig";
import { CollectionName, CollectionStatus } from "./data/constants";
import { RangeCalendar } from "@mantine/dates";
import useViewport from "./data/useViewport";
import { useClickOutside } from "@mantine/hooks";
import dayjs from "dayjs";
export default function Book() {
  const theme = useMantineTheme();
  const [year, setYear] = useState(new Date().getFullYear());
  const [popoverOpened, setPopoverOpened] = useState(false);
  const ref = useClickOutside(() => setPopoverOpened(false));
  const { desk, tab, mob } = useViewport();
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [beautifiedDate, setBeautifiedDate] = useState<string | undefined>();
  const [bookingData, setBookingData] = useState<any>();
  useEffect(() => {
    //get this year's bookings
    let data;
    let weight = {} as any;
    let queryy = query(
      collection(db, CollectionName.BOOKINGS),
      where("year", "array-contains", year),
      where("status", "==", CollectionStatus.ACTIVE)
    );
    getDocs(queryy).then((bookingsSnapshot) => {
      data = bookingsSnapshot.docs.map((booking) => ({
        ...booking.data(),
      }));
      data.forEach((booking) => {
        let startDate = new Date(booking.startDate.toDate());
        let endDate = new Date(booking.endDate.toDate());
        while (startDate < endDate) {
          if (weight[startDate.toDateString()]) {
            weight[startDate.toDateString()] = weight[startDate.toDateString()] + booking.nos;
          } else {
            weight[startDate.toDateString()] = booking.nos;
          }
          startDate.setDate(startDate.getDate() + 1);
        }
        setBookingData(weight);
      });
    });
  }, [year]);
  useEffect(() => {
    if (value[0] || value[1]) {
      setBeautifiedDate(
        (value[0] ? dayjs(value[0]).format("MMMM D, YYYY") : "") +
          " - " +
          (value[1] ? dayjs(value[1]).format("MMMM D, YYYY") : "")
      );
    }
  }, [value]);
  function monthChangeHandler(value: Date) {
    if (year != value.getFullYear()) {
      setYear(value.getFullYear());
    }
  }
  function renderDayHandler(date: Date) {
    if (date < new Date()) {
      return date.getDate();
    } else if (bookingData[date.toDateString()] > 10) {
      return (
        <Box>
          <Box style={{ background: theme.fn.rgba(theme.colors.red[9], 0.3) }}>{date.getDate()}</Box>
        </Box>
      );
    } else if (bookingData[date.toDateString()] > 7) {
      return (
        <Box>
          <Box style={{ background: theme.fn.rgba(theme.colors.red[9], 0.2) }}>{date.getDate()}</Box>
        </Box>
      );
    } else if (bookingData[date.toDateString()] > 5) {
      return (
        <Box>
          <Box style={{ background: theme.fn.rgba(theme.colors.red[9], 0.1) }}>{date.getDate()}</Box>
        </Box>
      );
    } else {
      return date.getDate();
    }
  }

  return (
    <Grid align="center">
      <Grid.Col span={12} md={9}>
        <Grid>
          <Grid.Col span={12} md={8}>
            <Popover
              opened={popoverOpened}
              trapFocus
              position="bottom"
              withArrow
              transition={"pop-top-left"}
              shadow="md"
            >
              <Popover.Target>
                <div onFocusCapture={() => setPopoverOpened(true)}>
                  <TextInput
                    autoComplete="off"
                    value={beautifiedDate}
                    label="Book a stay"
                    description="Enter your desired stay length"
                    placeholder="Pick dates range"
                  ></TextInput>
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <Box ref={ref}>
                  <RangeCalendar
                    excludeDate={(date) => date < new Date()}
                    allowSingleDateInRange
                    value={value}
                    onChange={(value) => {
                      setValue([null, null]);
                      setValue(value);
                      if (value[1]) {
                        setPopoverOpened(false);
                      }
                    }}
                    amountOfMonths={desk ? 2 : 1}
                    renderDay={renderDayHandler}
                    onMonthChange={monthChangeHandler}
                    initialMonth={value[0] ? value[0] : new Date()}
                  />
                </Box>
              </Popover.Dropdown>
            </Popover>
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <NumberInput
              defaultValue={1}
              description="Enter the number of people staying"
              placeholder="Number of people"
              label="Number of people"
              withAsterisk
            />
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={12} md={3}>
        <Button fullWidth size={"md"}>
          Check availability
        </Button>
      </Grid.Col>
    </Grid>
  );
}
