import { ref, listAll, uploadBytes, getDownloadURL } from "firebase/storage";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { storage } from "./data/firebaseConfig";
import { Box, Group, Button } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
interface MediaComponentProps {
  setImages: (data: string[]) => void;
  setVideos: (data: string[]) => void;
}
export default function MediaComponent({ setImages, setVideos }: MediaComponentProps) {
  const openRef = useRef<() => void>(null);
  const [mediaData, setMediaData] = useState<MediaProps[]>([]);
  const [counter, setCounter] = useState(true);
  useEffect(() => {
    const listRef = ref(storage, "");
    listAll(listRef)
    .then((res) => {
        let data= [] as MediaProps[];
        res.items.forEach((itemRef) => {
          console.log(data);
          getDownloadURL(ref(storage, itemRef.fullPath)).then(r=>{
            data.push({
              name: itemRef.name,
              url: r
            })
          })
        });
        setMediaData(data)
      }).then(()=>{
        setCounter(p=>!p)
      })
      .catch((error) => {});
    },[]);

  return (
    <Box>
      <Dropzone
        openRef={openRef}
        onDrop={(files) => {
          const mediasRef = ref(storage, files[0].name);
          uploadBytes(mediasRef, files[0]).then((snapshot) => {});
        }}
      >
        drop here
      </Dropzone>

      <Group position="center" mt="md">
        <Button onClick={() => setCounter(p=>!p)}>Select files</Button>
        <Button onClick={() => openRef.current()}>Select files</Button>
      </Group>{JSON.stringify(mediaData)}
    </Box>
  );
}
