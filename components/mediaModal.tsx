import { ref, listAll, uploadBytes } from "firebase/storage";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { storage } from "./data/firebaseConfig";
import { Box, Notification, Button, Modal } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import MediaComponent from "./mediaComponent";
interface MediaModalProps {
  opened: boolean;
  selectImage: (data: MediaProps) => void;
  setOpened: (data: boolean) => void;
}
export default function MediaModal({ opened, setOpened, selectImage }: MediaModalProps) {
  const [media, setMedia] = useState<MediaProps>();
  useEffect(() => {}, []);
  const selectModalImage = (e: MediaProps) => {
    setMedia(e);
  };
  return (
    <>
      <Modal size={"80vw"} overflow="inside" opened={opened} onClose={() => setOpened(false)} title="Media Manager">
        <MediaComponent selectImage={selectModalImage} />
        <Box style={{ position: "sticky", bottom: 0, background: "white" }} pt={15}>
          <Button onClick={media ? () => selectImage(media) : () => null}>Select media</Button>
        </Box>
      </Modal>
    </>
  );
}
