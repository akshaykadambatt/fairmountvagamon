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

export default function Contact() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const enterBookEntry = () => {
    nextStep()

  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let formD = new FormData();
    formD.append("name", "my name");
    formD.append("email", "my name");
    formD.append("message", "my name");
    fetch("/api/sendgrid", {
      method: "POST",
      body: formD,
    })
      .then((e) => e.json())
      .then((r) => console.log(r));
  };

  return (
    <Container my={30}>
      <Button onClick={handleSubmit}>send mail</Button>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="Select dates" description="Dates and service">
          <Book noCheckButton={true} />
        </Stepper.Step>
        <Stepper.Step label="Select occupants" description="Occupants and addons">
          <BookSecondStep />
        </Stepper.Step>
        <Stepper.Step label="Confirm booking" description="View booking summary">
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
            <Button onClick={enterBookEntry}>Confirm The Reservation</Button>
          ) : (
            <Button onClick={nextStep}>Next step</Button>
          ))}
      </Group>
    </Container>
  );
}
