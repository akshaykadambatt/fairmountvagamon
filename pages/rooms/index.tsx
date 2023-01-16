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
import useViewport from "../../components/data/useViewport";

export default function Rooms() {
  const { desk, tab, mob } = useViewport();
  const [products, setProducts] = useState<ProductProps[]>();
  useEffect(() => {
    const run = async () => {
      const q = query(collection(db, CollectionName.PRODUCTS), where("status", "==", true));
      const querySnapshot = await getDocs(q);
      let data: ProductProps[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() } as ProductProps);
      });
      data.sort((a,b) => a.order - b.order)
      console.log(data);
      
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
        <meta name="keywords" content="resort, Vagamon, Kerala, hill resort, accommodations, tree house, restaurant, room service, spa, outdoor pool, trekking, paragliding, rock climbing, resort at vagamon, fairmount vagamon, fairmount vagamon resorts, resort offers, experience resort, most popular resort, resort experience, resort nature, Vagamon resorts, Kerala hill resorts ,Western Ghats resorts ,Tea plantation resorts ,Nature resorts ,Adventure resorts ,Luxury resorts ,Relaxation resorts ,Spa resorts ,Romantic getaways ,Family vacations ,Hill station vacations ,Hill station getaways ,Western Ghats tourism ,Kerala tourism ,Tea plantation tours ,Nature tours ,Adventure tours ,Luxury travel ,Relaxation vacations ,Spa vacations ,Romantic holidays ,Family holidays ,Honeymoon destinations" />
        <meta name="description" content="Escape to the stunning beauty of Vagamon at Fairmount Residency. Our resort offers comfortable accommodations, a range of dining options, and a range of activities and amenities to ensure that our guests have a comfortable and enjoyable stay." />
        <meta name="author" content="Fairmount Vagamon" />
      </Head>
      <main>
        <Container my={20} py={40} size="lg">
          <Grid>
            <Grid.Col span={12}>
              <Title weight={100}>Rooms and Rates</Title>
            </Grid.Col>
            <Grid.Col span={12}>
              <SimpleGrid cols={desk?3:1} pt={30}>
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
