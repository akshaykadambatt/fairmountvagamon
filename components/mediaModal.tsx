import { ref, listAll, uploadBytes } from "firebase/storage";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { storage } from "./data/firebaseConfig";
import { Box, Group, Button, Modal } from "@mantine/core";
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
  const selectModalImage = (e:MediaProps) => {
    setMedia(e)
  }
  return (
    <Modal size={"lg"} opened={opened} onClose={() => setOpened(false)} title="Media Manager">
      <MediaComponent selectImage={selectModalImage} />
      <Button onClick={media?()=>selectImage(media):()=>null}>Select media</Button>
    </Modal>
  );
}
