import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  Modal,
  NumberInput,
  Switch,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Navigation from "../../components/Navigation";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../../components/data/firebaseConfig";

export default function Pages() {
  const [opened, setOpened] = useState(false);
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
    console.log(values);
    const newCityRef = doc(collection(db, "testimonials"));
    await setDoc(newCityRef, values);
  };
  return (
    <Navigation>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Introduce yourself!">
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
          <TextInput withAsterisk label="Name" placeholder="Enter the name" {...form.getInputProps("name")} />
          <Textarea placeholder="Testimonail Body" label="Testimonail Body" withAsterisk {...form.getInputProps("content")} />
          <NumberInput placeholder="Order" label="Order" withAsterisk {...form.getInputProps("order")} />
          <Switch label="Active" {...form.getInputProps("status", { type: "checkbox" })} />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </Navigation>
  );
}
