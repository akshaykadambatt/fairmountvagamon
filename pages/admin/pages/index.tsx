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
  IconEye,
  IconPencil,
  IconSettings,
  IconTrash,
} from "@tabler/icons";
import { AiOutlineDelete } from "react-icons/ai";
import { FunctionDeclaration } from "typescript";
import Link from "next/link";
export default function Pages() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const orderShift = async (data: ProductProps, type: string) => {
    let order;
    switch (type) {
      case "up":
        order = data.order - 1;
        break;
      case "down":
        order = data.order + 1;
        break;
      default:
        break;
    }
    let q = doc(db, CollectionName.PRODUCTS, data.id ? data.id : "");
    await updateDoc(q, {
      order: order,
    });
  };
  useEffect(() => {
    const unsub1 = onSnapshot(query(collection(db, CollectionName.PRODUCTS)), (collectionSnapshot) => {
      let data: ProductProps[] = [];
      collectionSnapshot.docs.map((doc) => {
        data.push(Object.assign({ ...doc.data() }, { id: doc.id }) as ProductProps);
      });
      setProducts(data);
    });
  }, []);
  const rows = products.sort((a, b) => a.order - b.order).map((e) => <Row key={e.id} data={e} orderShift={orderShift} />);
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
            Pages
          </Title>
          <Button component={Link} href="/admin/products/manage-product">
            Add Page
          </Button>
        </Box>
        <Table
          highlightOnHover
          withColumnBorders
          verticalSpacing="xs"
          style={{ borderRadius: "5px", boxShadow: "0 0 0 1px #00000024", overflow: "hidden" }}
        >
          <thead>
            <tr>
              <th style={{ minWidth: "130px" }}>Name</th>
              <th>Short Description</th>
              <th>Price</th>
              <th>Capacity</th>
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
  data: ProductProps;
  orderShift: (data: ProductProps, type: string) => void;
}
const Row = ({ data, orderShift }: RowProps) => {
  const theme = useMantineTheme();
  const [trashPopover, setTrashPopover] = useState(false);
  const deleteTestimonial = async (id: string) => {
    console.log(id);
    deleteDoc(doc(db, CollectionName.PRODUCTS, id));
  };
  return (
    <>
      <tr key={data.id}>
        <td>{data.name}</td>
        <td>{data.shortDescription}</td>
        <td>₹{data.price}</td>
        <td>{data.totalCapacity}</td>
        <td>{data.status ? <Badge color="green">Active</Badge> : <Badge color="gray">Inactive</Badge>}</td>
        <td>
          <Button.Group>
            <Button size="xs" px={10} variant="light" component={Link} href={"/rooms/" + data.slug || ""} target="_blank">
              <IconEye size={16} />
            </Button>
            <Button size="xs" px={10} variant="light" onClick={() => orderShift(data, "up")}>
              <IconChevronUp size={16} />
            </Button>
            <Button size="xs" px={10} variant="light" onClick={() => orderShift(data, "down")}>
              <IconChevronDown size={16} />
            </Button>
            <Button
              size="xs"
              px={10}
              variant="light"
              component={Link}
              href={"/admin/products/manage-product?editId=" + data.id}
            >
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
                    Delete this page?
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
