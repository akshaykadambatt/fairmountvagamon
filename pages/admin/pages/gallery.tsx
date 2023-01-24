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
import ImageBlock, { ImageBlockPlaceholder } from "../../../components/imageBlock";
import MediaModal from "../../../components/mediaModal";
export default function Pages() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const [images, setImages] = useState<MediaProps[]>([]);
  const form = useForm({
    initialValues: {
      images: [] as MediaProps[],
      status: true,
    },

    validate: {
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
        const docRef = doc(db, CollectionName.PAGES, "gallery");
        const docSnap = await getDoc(docRef);
        form.setValues({ ...docSnap.data() });
    };
    run();
  }, []);
  const selectImage = (e: MediaProps) => {
    console.log("in root", e);
    let newVal: MediaProps[] = form.values["images"];
    newVal.push(e);
    form.setFieldValue("images", newVal);
    setImages(newVal)
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
            Gallery
          </Title>
        </Box>
        <form
          onSubmit={form.onSubmit((values) => {
            // handleFormSubmit(values);
          })}
        >
          <Grid>
            <Grid.Col span={12}>
            <Text>Images</Text>
              <Box>
                {images.map((e) => (
                  <ImageBlock data={e} key={e.name} controls images={images} setImages={setImages} />
                ))}
                <Box onClick={() => setOpened(true)} style={{ display: "inline-block" }}>
                  <ImageBlockPlaceholder />
                </Box>
              </Box>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      <MediaModal opened={opened} setOpened={setOpened} selectImage={selectImage} />
      </Container>
    </Navigation>
  );
}
