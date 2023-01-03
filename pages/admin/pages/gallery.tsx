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
            Gallery
          </Title>
        </Box>
        <form
          onSubmit={form.onSubmit((values) => {
            // handleFormSubmit(values);
          })}
        >
          <Grid>
            <Grid.Col span={6}>
              <TextInput withAsterisk label="Email" placeholder="Enter the email" {...form.getInputProps("email")} />
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
