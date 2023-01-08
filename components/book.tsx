import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Grid,
  Group,
  NumberInput,
  Popover,
  Select,
  SimpleGrid,
  Skeleton,
  Text,
  TextInput,
  Textarea,
  Title,
  createStyles,
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
import {
  setNotification,
  setSelectedAddons,
  setSelectedDate,
  setSelectedEmail,
  setSelectedName,
  setSelectedNotes,
  setSelectedNumberOfOccupants,
  setSelectedPhone,
  setSelectedProduct,
  setSelectedTerms,
} from "./data/actions";
import { RootState } from "./data/configureStore";

const SelectItem = forwardRef<HTMLDivElement, ProductPropsWithValue>(
  ({ images, name, shortDescription, ...others }: ProductProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={images ? images[0].url : ""} />
        <Grid>
          <Grid.Col span={10}>
            <Text size="sm">{name}</Text>
            <Text size="xs" opacity={0.65}>
              {shortDescription}
            </Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text size="lg" weight={100}>
              ₹ {others.price}
            </Text>
          </Grid.Col>
        </Grid>
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
  useEffect(() => {
    dispatch(setSelectedDate(value));
  }, [value]);
  useEffect(() => {
    setValue(selectedDate);
  }, []);
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

export function BookSecondStep() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [value, setValue] = useState(`${adults} ${children}`);
  const [addons, setAddons] = useState<AddonProps[]>();
  const adultsRef = useClickOutside(() => setPopoverOpened(false));
  const dispatch = useDispatch();
  const {
    selectedName,
    selectedPhone,
    selectedEmail,
    selectedNumberOfOccupants,
    selectedAddons,
    selectedNotes,
    selectedTerms,
  } = useSelector((state: RootState) => state.actions);
  const incrementChildren = () => {
    setChildren((p) => {
      p++;
      return p;
    });
  };
  const decrementChildren = () => {
    setChildren((p) => {
      p--;
      return p;
    });
  };
  const incrementAdults = () => {
    setAdults((p) => {
      p++;
      return p;
    });
  };
  const decrementAdults = () => {
    setAdults((p) => {
      p--;
      return p;
    });
  };
  useEffect(() => {
    setValue(`${adults} adults, ${children} children`);
    dispatch(setSelectedNumberOfOccupants([adults, children]));
  }, [children, adults]);
  useEffect(() => {
    setAdults(selectedNumberOfOccupants[0]);
    setChildren(selectedNumberOfOccupants[1]);
    //get addons
    let queryy = query(collection(db, CollectionName.ADDONS), where("status", "==", true));
    let data: any[] = [];
    getDocs(queryy).then((addonsSnapshot) => {
      let queryData = addonsSnapshot.docs.map(
        (addon) => Object.assign({ ...addon.data() }, { id: addon.id }) as unknown as AddonProps
      );
      setAddons(queryData);
    });
  }, []);
  return (
    <Grid>
      <Grid.Col span={5}>
        <Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
          <Popover.Target>
            <div onFocusCapture={() => setPopoverOpened(true)}>
              <TextInput
                placeholder="Select the number of occupants"
                label="Number of occupants"
                description="Enter number of occupants as adults and children seperately"
                withAsterisk
                value={value}
              />
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <Box ref={adultsRef}>
              <Title order={6} mb={15}>
                Select the number of occupants
              </Title>
              <SimpleGrid cols={1}>
                <SimpleGrid cols={2}>
                  <Text size={"sm"}>Adults</Text>
                  <Box>
                    <Button
                      variant="default"
                      style={{ borderRadius: 100, height: 26, width: 26, padding: 0, margin: "0 7px 0 7px" }}
                      onClick={decrementAdults}
                    >
                      -
                    </Button>
                    <Text size={"sm"} style={{ display: "inline-block" }}>
                      {adults}
                    </Text>
                    <Button
                      variant="default"
                      style={{ borderRadius: 100, height: 26, width: 26, padding: 0, margin: "0 7px 0 7px" }}
                      onClick={incrementAdults}
                    >
                      +
                    </Button>
                  </Box>
                </SimpleGrid>
                <SimpleGrid cols={2}>
                  <Text size={"sm"}>Children</Text>
                  <Box>
                    <Button
                      variant="default"
                      style={{ borderRadius: 100, height: 26, width: 26, padding: 0, margin: "0 7px 0 7px" }}
                      onClick={decrementChildren}
                    >
                      -
                    </Button>
                    <Text size={"sm"} style={{ display: "inline-block" }}>
                      {children}
                    </Text>
                    <Button
                      variant="default"
                      style={{ borderRadius: 100, height: 26, width: 26, padding: 0, margin: "0 7px 0 7px" }}
                      onClick={incrementChildren}
                    >
                      +
                    </Button>
                  </Box>
                </SimpleGrid>
              </SimpleGrid>
            </Box>
          </Popover.Dropdown>
        </Popover>
      </Grid.Col>
      <Grid.Col span={7}>
        <Text size={"md"}>Addons</Text>
        <Text size={"xs"} color="dimmed">
          Select from the following addons to make your experience at Fairmount better
        </Text>
        <Chip.Group
          multiple
          mt={2}
          mb={5}
          value={selectedAddons.map((e) => `${e}`)}
          onChange={(value) => {
            dispatch(setSelectedAddons(value));
          }}
        >
          {addons?.map((e) => (
            <Chip value={e.id} size="xs" key={e.id}>
              {e.name}
            </Chip>
          ))}
          {!addons &&
            [1, 2, 2.5, 3.3].map((e) => (
              <Skeleton height={26} width={`${e * 10}%`} style={{ display: "inline-block" }} radius="xl" key={e} />
            ))}
        </Chip.Group>
        <Text size={"xs"} color="dimmed">
          Additional charges apply
        </Text>
      </Grid.Col>
      <Grid.Col span={12}>
        <Grid>
          <Grid.Col span={4}>
            <TextInput
              placeholder="Name"
              label="Enter your name name"
              value={selectedName}
              onChange={(value) => {
                dispatch(setSelectedName(value.currentTarget.value));
              }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              placeholder="Phone"
              label="Enter your phone"
              value={selectedPhone}
              error={!(/^\d{9,11}$/).test(selectedPhone||"1234567890")}
              onChange={(value) => {
                dispatch(setSelectedPhone(value.currentTarget.value));
              }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              placeholder="Email"
              label="Enter your email"
              value={selectedEmail}
              error={!(/\S+@\S+\.\S+/).test(selectedEmail||"a@a.a")}
              onChange={(value) => {
                dispatch(setSelectedEmail(value.currentTarget.value));
              }}
            />
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={12}>
        <Textarea
          label="Additional comments/notes"
          description="Add notes that we should keep in mind when accomodating you"
          placeholder="Add your notes here"
          value={selectedNotes}
          autosize
          minRows={3}
          maxRows={10}
          onChange={(v) => {
            dispatch(setSelectedNotes(v.currentTarget.value));
          }}
        ></Textarea>
      </Grid.Col>
      <Grid.Col span={12}>
        <Checkbox
          onChange={(value) => {
            dispatch(setSelectedTerms(value.currentTarget.checked));
          }}
          checked={selectedTerms}
          label="Accept terms and conditions"
        />
      </Grid.Col>
    </Grid>
  );
}

export function BookThirdStep() {
  const {
    selectedEmail,
    selectedPhone,
    selectedName,
    selectedProduct,
    selectedDate,
    selectedNumberOfOccupants,
    selectedAddons,
    selectedNotes,
    selectedTerms,
  } = useSelector((state: RootState) => state.actions);
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  return (
    <Grid>
      <Grid.Col span={12}>
        <Title order={5} className={classes.heading}>Confirm your reservation</Title>
        <Text>Here&apos;s a summary of all the selections you made on the previous steps.</Text>
        <BookingCard success={false} />
      </Grid.Col>
    </Grid>
  );
}
export function BookingCard({ success }: { success: boolean }) {
  const {
    selectedEmail,
    selectedPhone,
    selectedName,
    selectedProduct,
    selectedDate,
    selectedNumberOfOccupants,
    selectedAddons,
    selectedNotes,
    selectedTerms,
    selectedId,
  } = useSelector((state: RootState) => state.actions);
  const theme = useMantineTheme();
  return (
    <Box
      style={{
        borderRadius: 12,
        border: "2px solid green",
        borderColor: success ? theme.colors.green[8] : theme.colors.dark[2],
        background: success ? theme.fn.rgba(theme.colors.green[1],0.3) : theme.fn.rgba(theme.colors.dark[1],0.1),
      }}
      py={30}
      px={40}
      my={20}
    >
      <Box style={{ display: "flex", alignItems: "center", gap: "13px" }}>
        <Title order={5} pb={5}>
          {selectedProduct.name}
        </Title>
        <Badge color={success ? "green" : "gray"}>{success ? "Confirmed" : "To be confirmed"}</Badge>
      </Box>
      <Text color="dimmed">
        {selectedNumberOfOccupants[0]} Adults and {selectedNumberOfOccupants[1]} Children, from{" "}
        {dayjs(selectedDate[0]).format("DD-MMM-YYYY")}
        &nbsp;&nbsp;to {dayjs(selectedDate[1]).format("DD-MMM-YYYY")}
      </Text>
      <Text>
        Reservation to be made in the name of {selectedName} ( {selectedPhone || selectedEmail} )
      </Text>
      <Text align="right" color="dimmed">
        Approximate Price{" "}
      </Text>
      <Title align="right" order={5} weight={100}>
        ₹{selectedProduct.price}
      </Title>
      <Text align="right" color="dimmed">
        + addons
      </Text>
    </Box>
  );
}

const useStyles = createStyles((theme) => ({
  heading: {
    marginBlock:10
  },

}));
export function BookSuccess() {
  const { classes, cx } = useStyles();
  const {
    selectedId,
  } = useSelector((state: RootState) => state.actions);
  return (
    <Grid>
      <Grid.Col span={12}>
        <Title order={5} className={classes.heading}>
          Reservation Confirmed
        </Title>
        <Text >
          Reservation ID: <strong>{selectedId}</strong>
        </Text>
        <BookingCard success={true} />
        <Text mb={15}>
          We have recieved your reservation request and we will process the order as soon as possible. Expect a call
          from Fairmount within 3-5 business days. For any enquiries contact us on the website / phone / WhatsApp lines.
          We are ready to help.{" "}
          <Link href="/contact" style={{ textDecoration: "underline" }}>
            Contact Us
          </Link>
          . We have recieved your reservation request and we will process the order as soon as possible. Expect a call
          from Fairmount within 3-5 business days. For any enquiries contact us on the website/phone/WhatsApp lines. We
          are ready to help.
        </Text>
        <Button component={Link} href="/experiences">
          Explore Vagamon
        </Button>
        <Button component={Link} href="/contact" ml={10} variant="outline">
          Contact Us
        </Button>
      </Grid.Col>
    </Grid>
  );
}
