import Head from "next/head";
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
import { Carousel } from "@mantine/carousel";
import Navigation from "../../../components/Navigation";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { doc, collection, setDoc, onSnapshot, query, where, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../../../components/data/firebaseConfig";
import { AmenitiesIds, CollectionName } from "../../../components/data/constants";
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
import { listAll, ref } from "firebase/storage";
import MediaComponent from "../../../components/mediaComponent";
import MediaModal from "../../../components/mediaModal";
import ImageBlock, { ImageBlockPlaceholder } from "../../../components/imageBlock";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
export default function Pages() {
  const [opened, setOpened] = useState(false);
  const [productsEditId, setProductsEditId] = useState("");
  const [images, setImages] = useState([""]);
  const [videos, setVideos] = useState([""]);
  const router = useRouter();
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      name: "",
      shortDescription: "",
      description: "",
      price: 0,
      amenities: [],
      images: [] as MediaProps[],
      videos: [] as MediaProps[],
      totalCapacity: 0,
      peoplePerRoom: 0,
      order: 0,
      status: true,
      sale: true,
      slug: "",
    },

    validate: {
      name: (value) => (value != "" ? null : "Enter name"),
    },
  });
  const handleFormSubmit = async (values: ProductProps) => {
    let q;
    if (router.query.editId) {
      q = doc(db, CollectionName.PRODUCTS, router.query.editId as string);
    } else {
      q = doc(collection(db, CollectionName.PRODUCTS));
    }
    await setDoc(q, values);
    setOpened(false);
    setProductsEditId("");
    showNotification({
      title: 'Product added',
      styles: () => ({
        title: {
          fontSize: 14,
        },
        description: {
          fontSize: 10,
        }
      }),
      message: undefined
    })
  };

  useEffect(() => {
    const run = async () => {
      if (router.query.editId) {
        const docRef = doc(db, CollectionName.PRODUCTS, router.query.editId as string);
        const docSnap = await getDoc(docRef);
        form.setValues({ ...docSnap.data() });
      }
    };
    run();
  }, [router.query.editId]);

  const selectImage = (e: MediaProps) => {
    console.log("in root", e);
    let newVal: MediaProps[] = form.values["images"];
    newVal.push(e);
    form.setFieldValue("images", newVal);
    console.log(form.values);
    showNotification({
      title: 'Media added',
      message: 'Close the popup or select more',
      styles: (theme) => ({
        title: {
          fontSize:14,
        },
        description: {
          fontSize:10,
        }
      }),
    })
  };
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
            {form.values.name ? form.values.name : "Products"}
          </Title>
        </Box>
        <form
          onSubmit={form.onSubmit((values) => {
            handleFormSubmit(values);
          })}
        >
          <Grid>
            <Grid.Col span={7}>
              <TextInput withAsterisk label="Name" placeholder="Enter the name" {...form.getInputProps("name")} />
            </Grid.Col>
            <Grid.Col span={5}>
              <TextInput
                withAsterisk
                label="Slug"
                placeholder="Enter the url"
                {...form.getInputProps("slug")}
                icon={<Text>/</Text>}
                leftSection={<>asdf</>}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Textarea
                placeholder="Short Description"
                label="Short Description"
                withAsterisk
                {...form.getInputProps("shortDescription")}
                autosize
                minRows={3}
                maxRows={5}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Textarea
                placeholder="Description"
                label="Description"
                withAsterisk
                {...form.getInputProps("description")}
                autosize
                minRows={3}
                maxRows={5}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <MultiSelect
                data={[
                  { value: AmenitiesIds.ROOMSERVICE, label: "Room service" },
                  { value: AmenitiesIds.RESTAURANT, label: "Restaurant" },
                  { value: AmenitiesIds.INDIANANDCHINESE, label: "Indian and Chinese Dishes" },
                  { value: AmenitiesIds.FREEWIFI, label: "Free WiFi" },
                  { value: AmenitiesIds.WAKEUP, label: "Wake-up Service" },
                  { value: AmenitiesIds.OUTDOORBUFFET, label: "Outdoor buffet" },
                  { value: AmenitiesIds.CAMPFIRE, label: "Campfire for groups" },
                  { value: AmenitiesIds.PARKING, label: "Parking" },
                  { value: AmenitiesIds.PETS, label: "Pets allowed" },
                ]}
                label="Amenities"
                placeholder="Pick all the available services"
                {...form.getInputProps("amenities")}
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <NumberInput
                placeholder="Price"
                label="Price"
                withAsterisk
                {...form.getInputProps("price")}
                icon={<Text>₹</Text>}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                placeholder="Total Capacity"
                label="Total Capacity"
                withAsterisk
                {...form.getInputProps("totalCapacity")}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                placeholder="People per room"
                label="People per room"
                withAsterisk
                {...form.getInputProps("peoplePerRoom")}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput placeholder="Order" label="Order" withAsterisk {...form.getInputProps("order")} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>Images</Text>
              <Box>
                {form.values["images"].map((e) => (
                  <ImageBlock data={e} key={e.name} />
                ))}
                <Box onClick={() => setOpened(true)} style={{ display: "inline-block" }}>
                  <ImageBlockPlaceholder />
                </Box>
              </Box>
            </Grid.Col>

            <Grid.Col span={3}>
              <Switch label="Sale badge" {...form.getInputProps("sale", { type: "checkbox" })} />
            </Grid.Col>
            <Grid.Col span={3}>
              <Switch label="Active" {...form.getInputProps("status", { type: "checkbox" })} />
            </Grid.Col>
            <Grid.Col span={6}>
              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Container>
      <MediaModal opened={opened} setOpened={setOpened} selectImage={selectImage} />
    </Navigation>
  );
}
