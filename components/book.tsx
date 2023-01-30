import Link from "next/link";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  Group,
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
import { query, collection, getDocs, where } from "firebase/firestore";
import { Dispatch, SetStateAction, forwardRef, useEffect, useState } from "react";
import { db } from "./data/firebaseConfig";
import { CollectionName, CollectionStatus } from "./data/constants";
import { RangeCalendar } from "@mantine/dates";
import useViewport from "./data/useViewport";
import { useClickOutside } from "@mantine/hooks";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddonsData,
  setCalculatedPrice,
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

const useStyles = createStyles((theme) => ({
  heading: {
    marginBlock: 10,
  },
}));

const SelectItem = forwardRef<HTMLDivElement, ProductPropsWithValue>(
  ({ images, name, shortDescription, ...others }: ProductProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={images ? images[0].url : ""} />
        <Grid style={{width:"100%"}}>
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
  const dispatch = useDispatch();
  const { desk, tab, mob } = useViewport();
  const { selectedProduct, selectedDate } = useSelector((state: RootState) => state.actions);
  const [value, setValue] = useState<BookingDate>([null, null]);
  const [selectedProductState, setSelectedProductState] = useState<ProductPropsWithValue>(selectedProduct);

  useEffect(() => {
    dispatch(setSelectedDate(value));
    dispatch(setSelectedProduct(selectedProductState));
  }, [value, selectedProductState]);
  useEffect(() => {
    setValue(selectedDate);
    setSelectedProductState(selectedProduct);
  }, []);
  return (
    <Grid align="center">
      <Grid.Col span={12} md={noCheckButton ? 12 : 9}>
        <Grid>
          <Grid.Col span={12} md={7}>
            <BookingProductsSelect
              selectedProductState={selectedProductState}
              setSelectedProductState={setSelectedProductState}
              label={"Select a service"}
              description={"Pick a type of room or service that you'd like"}
            />
          </Grid.Col>
          <Grid.Col span={12} md={5}>
            <BookingDatePicker
              value={value}
              setValue={setValue}
              productId={selectedProduct.id || ""}
              label={"Book a stay"}
              description={"Enter your desired stay length"}
            />
          </Grid.Col>
        </Grid>
      </Grid.Col>
      {!noCheckButton && (
        <Grid.Col span={12} md={3}>
          <Button fullWidth size={"md"} component={Link} href="/book">
            Check availability
          </Button>
        </Grid.Col>
      )}
    </Grid>
  );
}

export function BookingProductsSelect({
  selectedProductState,
  setSelectedProductState,
  label,
  description
}: {
  selectedProductState: ProductPropsWithValue;
  setSelectedProductState: Dispatch<SetStateAction<ProductPropsWithValue>>;
  label: string;
  description?: string;
}) {
  const [productData, setProductData] = useState<ProductPropsWithValue[]>([selectedProductState]);
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
  return (
    <Select
      label={label}
      description={description}
      placeholder="Pick one"
      itemComponent={SelectItem}
      data={productData}
      value={selectedProductState.value}
      onChange={(value) => {
        setSelectedProductState(
          productData.filter((e) => {
            return e.id == value;
          })[0]
        );
      }}
      maxDropdownHeight={400}
      nothingFound="Nobody here"
      filter={(value, item) =>
        item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}

export function BookSecondStep() {
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
  const { desk, tab, mob } = useViewport();
  const [selectedAddonsState, setSelectedAddonsState] = useState<string[]>([]);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  useEffect(() => {
    dispatch(setSelectedNumberOfOccupants([adults, children]));
  }, [children, adults]);
  useEffect(() => {
    setAdults(selectedNumberOfOccupants[0]);
    setChildren(selectedNumberOfOccupants[1]);
    setSelectedAddonsState(selectedAddons);
  }, []);
  useEffect(() => {
    dispatch(setSelectedAddons(selectedAddonsState));
  }, [selectedAddonsState]);
  return (
    <Grid>
      <Grid.Col span={12} sm={5}>
        <BookingAdultChildrenSelector
          adults={adults}
          setAdults={setAdults}
          childrenCount={children}
          withAsterisk
          setChildren={setChildren}
          label="Number of occupants"
          description="Enter number of occupants as adults and children seperately"
        />
      </Grid.Col>
      <Grid.Col span={12} sm={7}>
        <Text size={"md"}>Addons</Text>
        <Text size={"xs"} color="dimmed">
          Select from the following addons to make your experience at Fairmount better
        </Text>
        <BookingAddonsSelector selectedAddons={selectedAddonsState} addonChangeHandler={setSelectedAddonsState} />
        <Text size={"xs"} color="dimmed">
          Additional charges apply
        </Text>
      </Grid.Col>
      <Grid.Col span={12}>
        <Grid>
          <Grid.Col span={12} sm={4}>
            <TextInput
              placeholder="Name"
              label="Enter your name name"
              name="Name"
              value={selectedName}
              onChange={(value) => {
                dispatch(setSelectedName(value.currentTarget.value));
              }}
            />
          </Grid.Col>
          <Grid.Col span={12} sm={4}>
            <TextInput
              placeholder="Phone"
              label="Enter your phone"
              name="Phone"
              value={selectedPhone}
              error={!/^\d{9,11}$/.test(selectedPhone || "1234567890")}
              onChange={(value) => {
                dispatch(setSelectedPhone(value.currentTarget.value));
              }}
            />
          </Grid.Col>
          <Grid.Col span={12} sm={4}>
            <TextInput
              placeholder="Email"
              label="Enter your email"
              name="Email"
              value={selectedEmail}
              error={!/\S+@\S+\.\S+/.test(selectedEmail || "a@a.a")}
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
        <Title order={5} className={classes.heading}>
          Confirm your reservation
        </Title>
        <Text>Here&apos;s a summary of all the selections you made on the previous steps.</Text>
        <BookingCard success={false} />
      </Grid.Col>
    </Grid>
  );
}

export function BookSuccess() {
  const { classes, cx } = useStyles();
  const { selectedId } = useSelector((state: RootState) => state.actions);
  return (
    <Grid>
      <Grid.Col span={12}>
        <Title order={5} className={classes.heading}>
          Reservation Confirmed
        </Title>
        <Text>
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

export function BookingDatePicker({
  value,
  setValue,
  productId,
  label,
  description,
}: {
  value: BookingDate;
  setValue: Dispatch<SetStateAction<BookingDate>>;
  productId?: string;
  label: string;
  description?: string;
}) {
  const theme = useMantineTheme();
  const { selectedTerms } = useSelector((state: RootState) => state.actions);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const ref = useClickOutside(() => setPopoverOpened(false));
  const [beautifiedDate, setBeautifiedDate] = useState<string | undefined>();
  const [bookingData, setBookingData] = useState<any>();
  const { desk, tab, mob } = useViewport();
  const [year, setYear] = useState(new Date().getFullYear());
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
    if (!bookingData) return date.getDate();
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
    <Popover opened={popoverOpened} trapFocus position="bottom" withArrow transition={"pop-top-left"} shadow="md">
      <Popover.Target>
        <div onFocusCapture={() => setPopoverOpened(true)}>
          <TextInput
            autoComplete="off"
            value={beautifiedDate}
            label={label}
            description={description}
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
    selectedId, calculatedPrice
  } = useSelector((state: RootState) => state.actions);
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  useEffect(()=>{
    dispatch(setCalculatedPrice())
  },[])
  return (
    <Box
      style={{
        borderRadius: 12,
        border: "2px solid green",
        borderColor: success ? theme.colors.green[8] : theme.colors.dark[2],
        background: success ? theme.fn.rgba(theme.colors.green[1], 0.3) : theme.fn.rgba(theme.colors.dark[1], 0.1),
      }}
      py={30}
      className={`${success&&"booking-confirmed-card"} booking-card`}
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
        {dayjs(selectedDate[0]).format("MMM DD")}
        &nbsp;to {dayjs(selectedDate[1]).format("MMM DD, YYYY")}
      </Text>
      <Text>
        Reservation {success ? null : "to be"} made in the name of {selectedName} ({selectedPhone || selectedEmail})
      </Text>
      <Text align="right" color="dimmed" mt="md">
        Product and Service Price{" "}
      </Text>
      <Text align="right" color="dimmed">
        + addons added
      </Text>
      <Title align="right" order={5} weight={100}>
        ₹{calculatedPrice}
      </Title>
    </Box>
  );
}

export function BookingAdultChildrenSelector({
  adults,
  setAdults,
  childrenCount,
  setChildren,
  label,
  description,
  withAsterisk,
}: {
  adults: number;
  setAdults: Dispatch<SetStateAction<number>>;
  childrenCount: number;
  setChildren: Dispatch<SetStateAction<number>>;
  withAsterisk?: boolean;
  label: string;
  description?: string;
}) {
  const { selectedTerms } = useSelector((state: RootState) => state.actions);
  const [value, setValue] = useState(`0 0`);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const adultsRef = useClickOutside(() => setPopoverOpened(false));
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
    setValue(`${adults} adults, ${childrenCount} children`);
  }, [childrenCount, adults]);
  return (
    <Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
      <Popover.Target>
        <div onFocusCapture={() => setPopoverOpened(true)}>
          <TextInput
            placeholder="Select the number of occupants"
            label={label}
            description={description}
            withAsterisk={withAsterisk}
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
                  {childrenCount}
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
  );
}

export function BookingAddonsSelector({
  selectedAddons,
  addonChangeHandler,
}: {
  selectedAddons: string[];
  addonChangeHandler: Dispatch<SetStateAction<string[]>>;
}) {
  const { selectedTerms } = useSelector((state: RootState) => state.actions);
  const [addons, setAddons] = useState<AddonProps[]>();
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  useEffect(() => {
    //get addons
    let queryy = query(collection(db, CollectionName.ADDONS), where("status", "==", true));
    let data: any[] = [];
    getDocs(queryy).then((addonsSnapshot) => {
      let queryData = addonsSnapshot.docs.map(
        (addon) => Object.assign({ ...addon.data() }, { id: addon.id }) as unknown as AddonProps
      );
      setAddons(queryData); //set addons for component
      dispatch(setAddonsData(queryData)) //set addons for redux price calculation
    });
  }, []);
  return (
    <Chip.Group
      multiple
      mt={2}
      mb={5}
      value={selectedAddons.map((e) => `${e}`)}
      onChange={(value) => {
        console.log(value);
        addonChangeHandler(value);
      }}
    >
      {addons?.map((e) => (
        <Chip value={e.id} size="xs" key={e.id}>
          {e.name} {e.price? `: ₹${e.price}`:""}
        </Chip>
      ))}
      {!addons &&
        [1, 2, 2.5, 3.3].map((e) => (
          <Skeleton height={26} width={`${e * 10}%`} style={{ display: "inline-block" }} radius="xl" key={e} />
        ))}
    </Chip.Group>
  );
}
