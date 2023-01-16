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
import { doc, collection, setDoc, onSnapshot, query, where, deleteDoc, updateDoc } from "firebase/firestore";
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
import ImageBlock, { ImageBlockPlaceholder } from "../../../components/imageBlock";
import MediaModal from "../../../components/mediaModal";
import { showNotification } from "@mantine/notifications";
export default function Pages() {
  const [opened, setOpened] = useState(false);
  const [mediaModalOpened, setMediaModalOpened] = useState(false);
  const [experience, setExperience] = useState<ExperienceProps[]>([]);
  const [images, setImages] = useState<MediaProps[]>([]);
  const [experienceEditId, setExperienceEditId] = useState("");
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      name: "",
      content: "",
      images: [],
      status: true,
      order: 0,
    } as ExperienceProps,

    validate: {
      name: (value) => (value != "" ? null : "Enter name"),
    },
  });
  const handleFormSubmit = async (values: ExperienceProps) => {
    let q;
    if (experienceEditId) {
      q = doc(db, CollectionName.EXPERIENCES, experienceEditId);
    } else {
      q = doc(collection(db, CollectionName.EXPERIENCES));
    }
    await setDoc(q, values);
    setOpened(false);
    setExperienceEditId("");
  };
  const handleEditAction = (data: ExperienceProps) => {
    console.log(data);
    form.setFieldValue("name", data.name);
    form.setFieldValue("content", data.content);
    form.setFieldValue("status", data.status);
    form.setFieldValue("id", data.id);
    form.setFieldValue("images", data.images);
    setImages(data.images)
    setExperienceEditId(data.id ? data.id : "");
    setOpened(true);
  };

  useEffect(() => {
    const unsub1 = onSnapshot(query(collection(db, CollectionName.EXPERIENCES)), (collectionSnapshot) => {
      let data: ExperienceProps[] = [];
      collectionSnapshot.docs.map((doc) => {
        data.push(Object.assign({ ...doc.data() }, { id: doc.id }) as ExperienceProps);
      });
      setExperience(data);
    });
  }, []);
  useEffect(() => {
    if (!opened){
      form.reset();
      setImages([])
    }
  }, [opened]);
  const selectImage = (e: MediaProps) => {
    console.log("in root", e);
    let newVal: MediaProps[] = form.values["images"];
    newVal.push(e);
    form.setFieldValue("images", newVal);
    setImages(form.values['images'])
    console.log(form.values);
    showNotification({
      title: "Media added",
      message: "Close the popup or select more",
      styles: (theme) => ({
        title: {
          fontSize: 14,
        },
        description: {
          fontSize: 10,
        },
      }),
    });
  };
  const rows = experience.map((e) => <Row key={e.id} data={e} handleEditAction={handleEditAction} />);
  return (
    <Navigation>
      <Modal size={"lg"} opened={opened} onClose={() => setOpened(false)} title="Manage Experience">
        <form
          onSubmit={form.onSubmit((values) => {
            handleFormSubmit(values);
          })}
        >
          <TextInput withAsterisk label="Name" placeholder="Enter the name" {...form.getInputProps("name")} />
          <Textarea
            placeholder="Experience Description"
            label="Experience Description"
            description="Keep it short (100 characters)"
            withAsterisk
            {...form.getInputProps("content")}
            autosize
            minRows={5}
            maxRows={10}
          />
          <Text>Images</Text>
          <Box>
            {images.map((e) => (
              <ImageBlock data={e} key={e.name} controls images={images} setImages={setImages} />
            ))}
            <Box onClick={() => setMediaModalOpened(true)} style={{ display: "inline-block" }}>
              <ImageBlockPlaceholder />
            </Box>
          </Box>
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
          <Title order={2} weight={100}>
            Experiences
          </Title>
          <Button onClick={() => setOpened(true)}>Add New</Button>
        </Box>
        <Grid>
          <Grid.Col span={4}></Grid.Col>
          <Grid.Col span={8}></Grid.Col>
        </Grid>
        <Table
          highlightOnHover
          withColumnBorders
          verticalSpacing="xs"
          style={{ borderRadius: "5px", boxShadow: "0 0 0 1px #00000024", overflow: "hidden" }}
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
      <MediaModal opened={mediaModalOpened} setOpened={setMediaModalOpened} selectImage={selectImage} />
    </Navigation>
  );
}
interface RowProps {
  data: ExperienceProps;
  handleEditAction: (data: ExperienceProps) => void;
}
const Row = ({ data, handleEditAction }: RowProps) => {
  const theme = useMantineTheme();
  const [trashPopover, setTrashPopover] = useState(false);
  const deleteTestimonial = async (id: string) => {
    console.log(id);
    deleteDoc(doc(db, CollectionName.EXPERIENCES, id));
  };
  return (
    <>
      <tr key={data.id}>
        <td>{data.name}</td>
        <td>{data.content}</td>
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
                    Delete this experience?
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
