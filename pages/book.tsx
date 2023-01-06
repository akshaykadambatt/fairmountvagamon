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
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons";
import { useState } from "react";
import Book, { BookSecondStep, BookSuccess, BookThirdStep } from "../components/book";
import { ContactIconsList } from "../components/ContactIcons";

export default function Contact() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  return <Container my={30}>
    <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First step" description="Create an account">
          <Book noCheckButton={true}/>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          <BookSecondStep/>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          <BookThirdStep/>
        </Stepper.Step>
        <Stepper.Completed>
          <BookSuccess/>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {(active!=0&&active!=3) && <Button variant="default" onClick={prevStep}>Back</Button>}
        {active<3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
  </Container>;
}
