import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  Modal,
  NumberInput,
  Popover,
  SimpleGrid,
  Switch,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Navigation from "../../../components/Navigation";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { doc, collection, setDoc, onSnapshot, query, where, deleteDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../components/data/firebaseConfig";
import { CollectionName } from "../../../components/data/constants";
import {
  IconChevronDown,
  IconChevronUp,
  IconChevronsDown,
  IconChevronsUp,
  IconPencil,
  IconSettings,
  IconTrash,
} from "@tabler/icons";
import { AiOutlineDelete } from "react-icons/ai";
import { FunctionDeclaration } from "typescript";
import { BookingAddonsSelector, BookingAdultChildrenSelector, BookingDatePicker, BookingProductsSelect } from "../../../components/book";
export default function Pages() {
  const [opened, setOpened] = useState(false);
  const [addon, setAddon] = useState<BookingData[]>([]);
  const [addonEditId, setAddonEditId] = useState("");
  const theme = useMantineTheme();
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [selectedAddonsState, setSelectedAddonsState] = useState<string[]>([]);
  const [selectedProductState, setSelectedProductState] = useState<ProductPropsWithValue>({} as ProductPropsWithValue);
  const [bookingDate, setBookingDate] = useState<BookingDate>([null, null]);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      numberOfOccupants: [adults, children], //[adults,children]
      addons: [] as string[], //[firestoreId,firestoreId,...]
      notes: "",
      date: [null, null],
      product: "",
      productData: {},
      shownPrice: 0, //productData.price
      deleted: false,
      referenceId: "",
      state: 0, //default: BookingState.PENDING (2)
      status: true,
    } as BookingData,
    validate: {
      name: (value) => (value != "" ? null : "Enter name"),
    },
  });
  const handleFormSubmit = async (values: BookingData) => {
    let q;
    if (addonEditId) {
      q = doc(db, CollectionName.BOOKINGS, addonEditId);
    } else {
      q = doc(collection(db, CollectionName.BOOKINGS));
    }
    await setDoc(q, values);
    setOpened(false);
    setAddonEditId("");
  };
  const handleEditAction = (data: BookingData) => {
    form.setFieldValue("name", data.name);
    form.setFieldValue("email", data.email);
    form.setFieldValue("phone", data.phone);
    form.setFieldValue("date", data.date);
    form.setFieldValue("notes", data.notes);
    form.setFieldValue("status", data.status);
    form.setFieldValue("id", data.id);
    form.setFieldValue("numberOfOccupants", [data.numberOfOccupants[0], data.numberOfOccupants[1]]);
    setBookingDate([(data.date[0] as unknown as Timestamp).toDate(), (data.date[1] as unknown as Timestamp).toDate()]);
    setAdults(data.numberOfOccupants[0]);
    setChildren(data.numberOfOccupants[1]);
    setAddonEditId(data.id ? data.id : "");
    setSelectedAddonsState(data.addons);
    setOpened(true);
  };
  useEffect(() => {
    form.setFieldValue("numberOfOccupants", [adults, children]);
    form.setFieldValue("addons", selectedAddonsState);
    form.setFieldValue("date", bookingDate);
  }, [adults, children, selectedAddonsState, bookingDate]);
  useEffect(() => {
    const unsub1 = onSnapshot(query(collection(db, CollectionName.BOOKINGS)), (collectionSnapshot) => {
      let data: BookingData[] = [];
      collectionSnapshot.docs.map((doc) => {
        data.push(Object.assign({ ...doc.data() }, { id: doc.id }) as BookingData);
      });
      setAddon(data);
    });
  }, []);
  useEffect(() => {
    if (!opened) form.reset();
  }, [opened]);
  const rows = addon.map((e) => <Row key={e.id} data={e} handleEditAction={handleEditAction} />);
  return (
    <Navigation>
      <Modal size={"xl"} opened={opened} onClose={() => setOpened(false)} title="Manage Booking">
        <form
          onSubmit={form.onSubmit((values) => {
            handleFormSubmit(values);
          })}
        >
          <TextInput label="Name" placeholder="Enter the name" {...form.getInputProps("name")} />
          <TextInput label="Email" placeholder="Enter the email" {...form.getInputProps("email")} />
          <TextInput label="Phone" placeholder="Enter the phone" {...form.getInputProps("phone")} />
          <BookingProductsSelect
              selectedProductState={selectedProductState}
              setSelectedProductState={setSelectedProductState}
              label={"Selected service"}
            />
          <BookingDatePicker value={bookingDate} setValue={setBookingDate} label="Date range" />
          <BookingAdultChildrenSelector
            label={"Occupants"}
            adults={adults}
            setAdults={setAdults}
            childrenCount={children}
            setChildren={setChildren}
          />
          <Text size={"md"}>Addons</Text>
          <BookingAddonsSelector selectedAddons={selectedAddonsState} addonChangeHandler={setSelectedAddonsState} />
          <Textarea
            placeholder="Booking notes from user"
            label="Booking notes from user"
            {...form.getInputProps("notes")}
            autosize
            minRows={3}
            maxRows={10}
          />
          <Switch label="Active" {...form.getInputProps("status", { type: "checkbox" })} />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
      <Container py={20} size="md">
        <Box
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
          pb={20}
        >
          <Title order={2} weight={100}>
            Bookings
          </Title>
        </Box>
        <Grid>
          <Grid.Col span={4}></Grid.Col>
          <Grid.Col span={8}></Grid.Col>
        </Grid>
        <Table
          highlightOnHover
          withColumnBorders
          verticalSpacing={5}
          style={{ borderRadius: "5px", boxShadow: "0 0 0 1px #00000024", overflow: "hidden" }}
        >
          <thead>
            <tr>
              <th> </th>
              <th style={{ minWidth: "130px" }}>Name</th>
              <th>Email/Phone</th>
              <th>Order</th>
              <th>Status</th>
              <th style={{ minWidth: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </Navigation>
  );
}
interface RowProps {
  data: BookingData;
  handleEditAction: (data: BookingData) => void;
}
const Row = ({ data, handleEditAction }: RowProps) => {
  const theme = useMantineTheme();
  const [trashPopover, setTrashPopover] = useState(false);
  const deleteTestimonial = async (id: string) => {
    console.log(id);
    deleteDoc(doc(db, CollectionName.BOOKINGS, id));
  };
  return (
    <>
      <tr key={data.id}>
        <td>
          <Checkbox
            value={data.id}
            onClick={(e) => {
              if (e.currentTarget.checked) {
                console.log(e.currentTarget.value);
              }
            }}
          />
        </td>
        <td>{data.name}</td>
        <td>{data.email || data.phone}</td>
        <td>{data.productData?.name}</td>
        <td>{data.status ? <Badge color="green">Active</Badge> : <Badge color="gray">Inactive</Badge>}</td>
        <td>
          <Button.Group>
            <Button size="xs" px={10} variant="light" onClick={() => handleEditAction(data)}>
              <IconPencil size={16} />
            </Button>
            <Popover
              closeOnClickOutside
              transition="pop"
              withArrow
              withRoles
              trapFocus
              position="bottom-end"
              opened={trashPopover}
            >
              <Popover.Target>
                <Button color="red" size="xs" px={10} variant="light" onClick={() => setTrashPopover((prev) => !prev)}>
                  <AiOutlineDelete size={16} />
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Box>
                  <Text size={"sm"} mb={10}>
                    Delete this testimonial?
                  </Text>
                  <Box>
                    <Button
                      size={"sm"}
                      compact
                      mr={8}
                      variant="light"
                      color="red"
                      onClick={() => {
                        deleteTestimonial(data.id ? data.id : "");
                        setTrashPopover((prev) => !prev);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      size={"sm"}
                      compact
                      mr={8}
                      variant="subtle"
                      onClick={() => setTrashPopover((prev) => !prev)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Popover.Dropdown>
            </Popover>
          </Button.Group>
        </td>
      </tr>
    </>
  );
};
