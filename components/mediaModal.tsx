import { ref, listAll, uploadBytes } from "firebase/storage";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { storage } from "./data/firebaseConfig";
import { Box, Group, Button, Modal } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import MediaComponent from "./mediaComponent";
interface MediaModalProps {
  opened: boolean;
  setOpened: (data: boolean) => void;
  setImages: (data: string[]) => void;
  setVideos: (data: string[]) => void;
}
export default function MediaModal({ opened, setOpened, setImages, setVideos }: MediaModalProps) {
  const [media, setMedia] = useState([]);
  useEffect(() => {}, []);

  return (
    <Modal size={"lg"} opened={opened} onClose={() => setOpened(false)} title="Media Manager">
      <MediaComponent setImages={setImages} setVideos={setVideos} />
      <Button>Select media</Button>
    </Modal>
  );
}
