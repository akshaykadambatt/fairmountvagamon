import Head from "next/head";
import { Container, Grid, SimpleGrid, Skeleton, Title } from "@mantine/core";
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
      setProducts(data);
    };
    run();
  }, []);
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fairmount Resorts - Experience the Best of Vagamon in Our Exquisite Rooms</title>
        <meta name="description" content="Taste the true essence of Vagamon at Fairmount Resorts. Our exquisite rooms offer the perfect blend of modern amenities and traditional charm, making it the ideal base for exploring the natural beauty and cultural treasures of Vagamon. Book your stay now to savor the best of Vagamon." />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="keywords" content="resort, Vagamon, Kerala, hill resort, accommodations, tree house, restaurant, room service, spa, outdoor pool, trekking, paragliding, rock climbing, resort at vagamon, fairmount vagamon, fairmount vagamon resorts, resort offers, experience resort, most popular resort, resort experience, resort nature, Vagamon resorts, Kerala hill resorts ,Western Ghats resorts ,Tea plantation resorts ,Nature resorts ,Adventure resorts ,Luxury resorts ,Relaxation resorts ,Spa resorts ,Romantic getaways ,Family vacations ,Hill station vacations ,Hill station getaways ,Western Ghats tourism ,Kerala tourism ,Tea plantation tours ,Nature tours ,Adventure tours ,Luxury travel ,Relaxation vacations ,Spa vacations ,Romantic holidays ,Family holidays ,Honeymoon destinations" />
        
        {/*<!-- Open Graph / Facebook -->*/}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fairmount Resorts - Experience the Best of Vagamon in Our Exquisite Rooms" />
        <meta property="og:description" content="Taste the true essence of Vagamon at Fairmount Resorts. Our exquisite rooms offer the perfect blend of modern amenities and traditional charm, making it the ideal base for exploring the natural beauty and cultural treasures of Vagamon. Book your stay now to savor the best of Vagamon." />
        <meta property="og:image" content="https://fairmountvagamon.com/og-image.jpg" />

        {/*<!-- Twitter -->*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Fairmount Resorts - Experience the Best of Vagamon in Our Exquisite Rooms" />
        <meta property="twitter:description" content="Taste the true essence of Vagamon at Fairmount Resorts. Our exquisite rooms offer the perfect blend of modern amenities and traditional charm, making it the ideal base for exploring the natural beauty and cultural treasures of Vagamon. Book your stay now to savor the best of Vagamon." />
        <meta property="twitter:image" content="https://fairmountvagamon.com/og-image.jpg" />

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
