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
  MultiSelect,
  NumberInput,
  Popover,
  SimpleGrid,
  Skeleton,
  Switch,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
  useMantineTheme,
  Notification,
} from "@mantine/core";
import Navigation from "../../../components/Navigation";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { doc, collection, setDoc, onSnapshot, query, where, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../../../components/data/firebaseConfig";
import { AmenitiesIds, CollectionName } from "../../../components/data/constants";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
export default function Pages() {
  const router = useRouter();
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      email: "",
      phone: "",
      address: "",
      hours: "",
      twitter: "",
      youtube: "",
      instagram: "",
      whatsapp: "",
      facebook: "",
      map: "",
      coordinatesx: "",
      coordinatesy: "",
      status: true,
    },

    validate: {
      email: (value) => (value != "" ? null : "Enter email"),
    },
  });
  const handleFormSubmit = async (values: ContactData) => {
    let q = doc(db, CollectionName.PAGES, "contacts");
    await setDoc(q, values);
    showNotification({
      title: "Contacts saved",
      styles: () => ({
        title: {
          fontSize: 14,
        },
        description: {
          fontSize: 10,
        },
      }),
      message: undefined,
    });
  };

  useEffect(() => {
    const run = async () => {
        const docRef = doc(db, CollectionName.PAGES, "contacts");
        const docSnap = await getDoc(docRef);
        form.setValues({ ...docSnap.data() });
    };
    run();
  }, []);

  return (
    <Navigation>
      <Container size="lg" py={20} px={50}>
        <Box
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
          pb={20}
        >
          <Title order={2} weight={100}>
            Contacts
          </Title>
        </Box>
        <form
          onSubmit={form.onSubmit((values) => {
            handleFormSubmit(values);
          })}
        >
          <Grid>
            <Grid.Col span={6}>
              <TextInput withAsterisk label="Email" placeholder="Enter the email" {...form.getInputProps("email")} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Phone" placeholder="Enter the phone" {...form.getInputProps("phone")} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea autosize label="Address" placeholder="Enter the address" {...form.getInputProps("address")} />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput label="Hours" placeholder="Enter the hours" {...form.getInputProps("hours")} />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput label="Twitter" placeholder="Enter the twitter" {...form.getInputProps("twitter")} />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput label="Youtube" placeholder="Enter the youtube" {...form.getInputProps("youtube")} />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput label="Instagram" placeholder="Enter the instagram" {...form.getInputProps("instagram")} />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput label="Whatsapp" placeholder="Enter the whatsapp" {...form.getInputProps("whatsapp")} />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput label="Facebook" placeholder="Enter the facebook" {...form.getInputProps("facebook")} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea autosize label="Map" placeholder="Enter the map" {...form.getInputProps("map")} />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text weight={600} size="sm">
                Coordinates
              </Text>
              <SimpleGrid cols={2}>
                <NumberInput precision={7} {...form.getInputProps("coordinatesx")} />
                <NumberInput precision={7} {...form.getInputProps("coordinatesy")} />
              </SimpleGrid>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Container>
    </Navigation>
  );
}
