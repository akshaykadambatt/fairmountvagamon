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
import Navigation from "../../components/Navigation";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { doc, collection, setDoc, onSnapshot, query, where, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../components/data/firebaseConfig";
import { CollectionName } from "../../components/data/constants";
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
export default function Pages() {
  const [opened, setOpened] = useState(false);
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [testimonialsEditId, setTestimonialsEditId] = useState("");
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      name: "",
      content: "",
      status: true,
      order: 0,
    },

    validate: {
      name: (value) => (value != "" ? null : "Enter name"),
      content: (value) => (value != "" ? null : "Enter the body of testimonial"),
    },
  });
  const handleFormSubmit = async (values: TestimonialProps) => {
    let q;
    if (testimonialsEditId) {
      q = doc(db, CollectionName.TESTIMONIALS, testimonialsEditId);
    } else {
      q = doc(collection(db, CollectionName.TESTIMONIALS));
    }
    await setDoc(q, values);
    setOpened(false);
    setTestimonialsEditId("");
  };
  const handleEditAction = (data: TestimonialProps) => {
    console.log(data);
    form.setFieldValue("name", data.name);
    form.setFieldValue("content", data.content);
    form.setFieldValue("status", data.status);
    form.setFieldValue("id", data.id);
    setTestimonialsEditId(data.id ? data.id : "");
    setOpened(true);
  };
  
  const orderShift= async (data: TestimonialProps, type: string) => {
    let order;
    switch (type){
      case "up":
        order = data.order-1;
        break;
      case "down":
        order = data.order+1;
        break;
      default:
        break;
    }
    let q = doc(db, CollectionName.TESTIMONIALS, data.id?data.id:"");
    await updateDoc(q, {
      order: order
    });
  }
  useEffect(() => {
    const unsub1 = onSnapshot(query(collection(db, CollectionName.TESTIMONIALS)), (collectionSnapshot) => {
      let data: TestimonialProps[] = [];
      collectionSnapshot.docs.map((doc) => {
        data.push(Object.assign({ ...doc.data() }, { id: doc.id }) as TestimonialProps);
      });
      setTestimonials(data);
    });
  }, []);
  useEffect(() => {
    if (!opened) form.reset();
  }, [opened]);
  const rows = testimonials
    .sort((a, b) => a.order - b.order)
    .map((e) => <Row data={e} handleEditAction={handleEditAction} orderShift={orderShift} />);
  return (
    <Navigation>
      <Modal size={"lg"} opened={opened} onClose={() => setOpened(false)} title="Manage Testimonial">
        <form
          onSubmit={form.onSubmit((values) => {
            handleFormSubmit(values);
          })}
        >
          <TextInput withAsterisk label="Name" placeholder="Enter the name" {...form.getInputProps("name")} />
          <Textarea
            placeholder="Testimonail Body"
            label="Testimonail Body"
            withAsterisk
            {...form.getInputProps("content")}
            autosize
            minRows={5}
          />
          <NumberInput placeholder="Order" label="Order" withAsterisk {...form.getInputProps("order")} />
          <Switch label="Active" {...form.getInputProps("status", { type: "checkbox" })} />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
      <Container py={20}>
        <Box
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
          pb={20}
        >
          <Title order={2} weight={100}>Products</Title>
          <Button onClick={() => setOpened(true)}>Add Product</Button>
        </Box>
        <Grid>
          <Grid.Col span={4}></Grid.Col>
          <Grid.Col span={8}></Grid.Col>
        </Grid>
        <Table 
          highlightOnHover
          withColumnBorders
          verticalSpacing="xs"
          style={{ borderRadius: "10px", boxShadow: "0 0 0 1px #00000024", overflow: "hidden" }}
        >
          <thead>
            <tr>
              <th style={{ minWidth: "130px" }}>Name</th>
              <th>Content</th>
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
  data: TestimonialProps;
  handleEditAction: (data: TestimonialProps) => void;
  orderShift: (data: TestimonialProps, type: string) => void;
}
const Row = ({ data, handleEditAction, orderShift }: RowProps) => {
  const theme = useMantineTheme();
  const [trashPopover, setTrashPopover] = useState(false);
  const deleteTestimonial = async (id: string) => {
    console.log(id);
    deleteDoc(doc(db, CollectionName.TESTIMONIALS, id));
  };
  return (
    <>
      <tr key={data.id}>
        <td>
          {data.name}
        </td>
        <td>{data.content}</td>
        <td>{data.status ? <Badge color="green">Active</Badge> : <Badge color="gray">Inactive</Badge>}</td>
        <td>
          <Button.Group>
            <Button size="xs" px={10} variant="light" onClick={() => orderShift(data, "up")}>
              <IconChevronUp size={16} />
            </Button>
            <Button size="xs" px={10} variant="light" onClick={() => orderShift(data, "down")}>
              <IconChevronDown size={16} />
            </Button>
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
