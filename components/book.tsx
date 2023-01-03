import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Group,
  NumberInput,
  Popover,
  Select,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import HeaderComponent from "../components/header";
import { DateRangePicker } from "@mantine/dates";
import { query, collection, getDocs, where } from "firebase/firestore";
import { forwardRef, useEffect, useState } from "react";
import { db } from "./data/firebaseConfig";
import { CollectionName, CollectionStatus } from "./data/constants";
import { RangeCalendar } from "@mantine/dates";
import useViewport from "./data/useViewport";
import { useClickOutside } from "@mantine/hooks";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setNotification, setSelectedDate, setSelectedProduct } from "./data/actions";
import { RootState } from "./data/configureStore";

const SelectItem = forwardRef<HTMLDivElement, ProductPropsWithValue>(
  ({ images, name, shortDescription, ...others }: ProductProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={images[0].url} />
        <div>
          <Text size="sm">{name}</Text>
          <Text size="xs" opacity={0.65}>
            {shortDescription}
          </Text>
        </div>
      </Group>
    </div>
  )
);
SelectItem.displayName = "SelectItem";

export default function Book({ noCheckButton }: { noCheckButton?: boolean }) {
  const theme = useMantineTheme();
  const [year, setYear] = useState(new Date().getFullYear());
  const [popoverOpened, setPopoverOpened] = useState(false);
  const ref = useClickOutside(() => setPopoverOpened(false));
  const { desk, tab, mob } = useViewport();
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [beautifiedDate, setBeautifiedDate] = useState<string | undefined>();
  const [bookingData, setBookingData] = useState<any>();
  const dispatch = useDispatch();
  const { selectedProduct, selectedDate } = useSelector((state: RootState) => state.actions);
  const [productData, setProductData] = useState<ProductPropsWithValue[]>([selectedProduct]);
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
    let queryy = query(collection(db, CollectionName.PRODUCTS), where("status", "==", true));
    let data: any[] = [];
    getDocs(queryy).then((productsSnapshot) => {
      let queryData = productsSnapshot.docs.map(
        (product) =>
          Object.assign(
            { ...product.data() },
            { id: product.id, value: product.id, label: product.data().name }
          ) as unknown as ProductPropsWithValue
      );
      setProductData(queryData);
      console.log(queryData);
    });
  }, []);
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
  useEffect(()=>{
    dispatch(setSelectedDate(value));
  },[value])
  useEffect(()=>{
    setValue(selectedDate)
  },[])
  return (
    <Grid align="center">
      <Grid.Col span={12} md={noCheckButton ? 12 : 9}>
        <Grid>
          <Grid.Col span={12} md={7}>
            <Select
              label="Select a service"
              description="Pick a type of room or service that you'd like"
              placeholder="Pick one"
              itemComponent={SelectItem}
              data={productData}
              value={selectedProduct.value}
              onChange={(value) => {
                dispatch(
                  setSelectedProduct(
                    productData.filter((e) => {
                      return e.id == value;
                    })[0]
                  )
                );
              }}
              maxDropdownHeight={400}
              nothingFound="Nobody here"
              filter={(value, item) =>
                item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description.toLowerCase().includes(value.toLowerCase().trim())
              }
            />
          </Grid.Col>
          <Grid.Col span={12} md={5}>
            {/* <NumberInput
              defaultValue={1}
              description="Enter the number of people staying"
              placeholder="Number of people"
              label="Number of people"
              withAsterisk
            /> */}
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
                    value={selectedDate}
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
        </Grid>
      </Grid.Col>
      {!noCheckButton && (
        <Grid.Col span={12} md={3}>
          <Button fullWidth size={"md"}>
            Check availability
          </Button>
        </Grid.Col>
      )}
    </Grid>
  );
}
