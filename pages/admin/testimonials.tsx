import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  Modal,
  NumberInput,
  SimpleGrid,
  Switch,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Navigation from "../../components/Navigation";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { doc, collection, setDoc, onSnapshot, query, where } from "firebase/firestore";
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

export default function Pages() {
  const [opened, setOpened] = useState(false);
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
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
    const newTestimonial = doc(collection(db, "testimonials"));
    await setDoc(newTestimonial, values);
  };
  useEffect(() => {
    const unsub1 = onSnapshot(query(collection(db, CollectionName.TESTIMONIALS)), (collectionSnapshot) => {
      let data: TestimonialProps[] = [];
      collectionSnapshot.docs.map((doc) => {
        data.push(Object.assign({ ...doc.data() }, { id: doc.id }) as TestimonialProps);
      });
      setTestimonials(data);
    });
  }, []);
  const rows = testimonials
    .sort((a, b) => a.order - b.order)
    .map((element) => (
      <tr key={element.id}>
        <td>
          {element.name} {element.order}
        </td>
        <td>{element.content}</td>
        <td>{element.status ? "Active" : "Inactive"}</td>
        <td>
          <Button.Group>
            <Button size="xs" px={10} variant="default">
              <IconChevronUp size={16} />
            </Button>
            <Button size="xs" px={10} variant="default">
              <IconChevronDown size={16} />
            </Button>
            <Button size="xs" px={10} variant="default">
              <IconPencil size={16} />
            </Button>
            <Button size="xs" px={10} variant="default">
              <IconTrash size={16} />
            </Button>
          </Button.Group>
        </td>
      </tr>
    ));
  return (
    <Navigation>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Introduce yourself!">
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
          <TextInput withAsterisk label="Name" placeholder="Enter the name" {...form.getInputProps("name")} />
          <Textarea
            placeholder="Testimonail Body"
            label="Testimonail Body"
            withAsterisk
            {...form.getInputProps("content")}
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
          <Title order={2}>Testimonials</Title>
          <Button onClick={() => setOpened(true)}>Add Testimonial</Button>
        </Box>
        <Grid>
          <Grid.Col span={4}></Grid.Col>
          <Grid.Col span={8}></Grid.Col>
        </Grid>
        <Table highlightOnHover withBorder withColumnBorders verticalSpacing="xs" style={{ borderRadius: "20px" }}>
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
