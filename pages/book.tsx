import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  Container,
  Box,
  Stepper,
} from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from "@tabler/icons";
import { useState } from "react";
import Book, { BookSecondStep, BookSuccess, BookThirdStep } from "../components/book";
import { ContactIconsList } from "../components/ContactIcons";
import { doc, collection, setDoc } from "firebase/firestore";
import { BookingState, CollectionName } from "../components/data/constants";
import { db } from "../components/data/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../components/data/configureStore";
import { setSelectedId } from "../components/data/actions";
import Head from "next/head";

export default function Contact() {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const {
    selectedEmail,
    selectedPhone,
    selectedName,
    selectedProduct,
    selectedDate,
    selectedNumberOfOccupants,
    selectedAddons,
    selectedNotes,
    selectedTerms,
    selectedId,
  } = useSelector((state: RootState) => state.actions);
  const enterBookEntry = async () => {
    setLoading(true);
    let q = doc(collection(db, CollectionName.BOOKINGS));
    let referenceId = q.id.slice(0, 3) + q.id.slice(-3, -1);
    let data: BookingData = {
      email: selectedEmail,
      phone: selectedPhone,
      name: selectedName,
      status: true,
      numberOfOccupants: selectedNumberOfOccupants,
      addons: selectedAddons,
      notes: selectedNotes,
      date: selectedDate,
      product: selectedProduct.id || "",
      productData: selectedProduct,
      shownPrice: selectedProduct.price,
      deleted: false,
      referenceId: referenceId,
      state: BookingState.PENDING,
    };
    await setDoc(q, data);
    dispatch(setSelectedId(referenceId));
    setLoading(false);
    nextStep();
  };
  

  return (
    <>
    <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fairmount Resorts - Book your Stay to Experience the Enchanting Beauty of Vagamon</title>
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta
          name="keywords"
          content="resort, Vagamon, Kerala, hill resort, accommodations, tree house, restaurant, room service, spa, outdoor pool, trekking, paragliding, rock climbing, resort at vagamon, fairmount vagamon, fairmount vagamon resorts, resort offers, experience resort, most popular resort, resort experience, resort nature, Vagamon resorts, Kerala hill resorts ,Western Ghats resorts ,Tea plantation resorts ,Nature resorts ,Adventure resorts ,Luxury resorts ,Relaxation resorts ,Spa resorts ,Romantic getaways ,Family vacations ,Hill station vacations ,Hill station getaways ,Western Ghats tourism ,Kerala tourism ,Tea plantation tours ,Nature tours ,Adventure tours ,Luxury travel ,Relaxation vacations ,Spa vacations ,Romantic holidays ,Family holidays ,Honeymoon destinations"
        />
        <meta
          name="description"
          content="Discover the natural splendor of Vagamon at Fairmount Resorts. Our well-appointed rooms and unparalleled experiences will make your stay unforgettable. Book now to experience the enchanting beauty of Vagamon."
        />
        <meta name="author" content="Fairmount Vagamon" />
      </Head>
    <Container my={30}>
      <Stepper active={active} onStepClick={selectedId ? () => {} : setActive} breakpoint="sm">
        <Stepper.Step label="Select dates" description="Dates and service">
          <Book noCheckButton={true} />
        </Stepper.Step>
        <Stepper.Step disabled={(selectedProduct.id ? false : true) || (selectedDate[1] ? false : true)} label="Select occupants" description="Occupants and addons">
          <BookSecondStep />
        </Stepper.Step>
        <Stepper.Step disabled={
                (selectedNumberOfOccupants[0]>0?false:true)||
                (selectedEmail||selectedPhone?false:true)||
                (selectedName?false:true)||
                (selectedTerms?false:true)
              } label="Confirm booking" description="View booking summary">
          <BookThirdStep />
        </Stepper.Step>
        <Stepper.Completed>
          <BookSuccess />
        </Stepper.Completed>
      </Stepper>
      <Group position="right" mt="xl">
        {active != 0 && active != 3 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active < 3 &&
          (active == 2 ? (
            <Button onClick={enterBookEntry} loading={loading}>
              Confirm The Reservation
            </Button>
          ) : (
            <>
              {active == 0 && (
                <Button
                  onClick={nextStep}
                  disabled={(selectedProduct.id ? false : true) || (selectedDate[1] ? false : true)}
                >
                  Next step
                </Button>
              )}
              {active == 1 && <Button onClick={nextStep}
              disabled={
                (selectedNumberOfOccupants[0]>0?false:true)||
                (selectedEmail||selectedPhone?false:true)||
                (selectedName?false:true)||
                (selectedTerms?false:true)
              }
              >Next step</Button>}
            </>
          ))}
      </Group>
    </Container>
    </>
  );
}
