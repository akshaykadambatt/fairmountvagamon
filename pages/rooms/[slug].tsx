import { Box, Text, Title, Container, Skeleton } from "@mantine/core";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CollectionName } from "../../components/data/constants";
import { db } from "../../components/data/firebaseConfig";
export default function Room() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState<ProductProps>();
  useEffect(() => {
    const run = async () => {
      if (slug) {
        const q = query(collection(db, CollectionName.PRODUCTS), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setProduct({ ...doc.data() } as ProductProps);
        });
      }
    };
    run();
  }, [slug]);
  return (
    <Box>
      <Container size="lg" mt={40}>
        <Title weight={100}>{product ? product?.name : <Skeleton height={100} />}</Title>
        <Text>{product ? product?.description : <Skeleton height={300} mt={30}/>}</Text>
      </Container>
    </Box>
  );
}
