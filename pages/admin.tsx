import Head from "next/head";
import { Button, Container, Title } from "@mantine/core";
import { useEffect, useRef } from "react";
import { auth } from "../components/data/firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";
import router from "next/router";

export default function Contact() {
  // const user = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const createAccount = async () => {
    try {
      await auth.createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      console.log(error);
    }
  };
  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      console.log(error);
    }
  };
  const signOut = async () => {
    await auth.signOut();
  };
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      auth.signInWithPopup(provider).then((result) => {
        if (
          result.user?.email != "jmountvagamonresort@gmail.com" &&
          result.user?.email != "akshayakn6@gmail.com"
        ) {
          auth.signOut();
          console.log("wrong account credentials");
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/admin/dashboard");
      } else {
        router.push("/admin");
      }
    });
  }, []);
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Panel | JMount Resorts Vagamon - jmountvagamon.in</title>
        <meta name="description" content="JMount Resorts Vagamon - Website Admin Panel - jmountvagamon.in " />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <main>
        <Container style={{ textAlign: "center" }} my={50} py={10}>
          <Title weight={100}>Admin Panel</Title>
          <Button my={10} color="dark" onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </Container>
      </main>

      <footer></footer>
    </div>
  );
}
