import { useEffect, useState } from "react";
import { Box, Button, Modal } from "@mantine/core";
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
