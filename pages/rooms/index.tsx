import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box, Container, Grid, SimpleGrid, Skeleton, Text, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import HeaderComponent from "../../components/header";
import { query, collection, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CollectionName } from "../../components/data/constants";
import { db } from "../../components/data/firebaseConfig";
import { CarouselCard } from "../../components/CarouselCard";
import { ProductProps } from "../../components/data/types";

export default function Rooms() {
  const [products, setProducts] = useState<ProductProps[]>();
  useEffect(() => {
    const run = async () => {
      const q = query(collection(db, CollectionName.PRODUCTS), where("status", "==", true));
      const querySnapshot = await getDocs(q);
      let data: ProductProps[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() } as ProductProps);
      });
      setProducts(data);
    };
    run();
  }, []);
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fairmount Resorts</title>
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="keywords" content="Fair Mount, Vagamon, Resort, Stay, Honey Moon, Nature, Trip, Refereshment, Vacation, Holidays, Top, Hills, Camp, resort at vagamon, fairmount vagamon, fairmount vagamon resorts, resort offers, experience resort, most popular resort, resort experience, resort nature" />
        <meta name="description" content="Best resort admist of vagamon's beauty, experience the refreshing nature" />
        <meta name="author" content="Fairmount Vagamon" />
      </Head>
      <main>
        <Container my={20} py={40} size="lg">
          <Grid>
            <Grid.Col span={12}>
              <Title weight={100}>Rooms and Rates</Title>
            </Grid.Col>
            <Grid.Col span={12}>
              <SimpleGrid cols={3} pt={30}>
                {products?.map((data: ProductProps) => (
                    <CarouselCard key={data.name} data={data}/>
                ))}
                {!products && <>
                <Skeleton height={400}/>
                <Skeleton height={400}/>
                <Skeleton height={400}/>
                </>}
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        </Container>
      </main>

      <footer></footer>
    </div>
  );
}
