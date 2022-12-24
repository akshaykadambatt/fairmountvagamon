import { ref, listAll, uploadBytes, getDownloadURL } from "firebase/storage";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { storage } from "./data/firebaseConfig";
import { Box, Group, Button, SimpleGrid, Image, Text, TextInput } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import ImageBlock from "./imageBlock";
interface MediaComponentProps {
  selectImage: (data: MediaProps) => void;
}
export default function MediaComponent({ selectImage }: MediaComponentProps) {
  const openRef = useRef<() => void>(null);
  const [mediaData, setMediaData] = useState<MediaProps[]>([]);
  const [filteredMediaData, setFilteredMediaData] = useState<MediaProps[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [active, setActive] = useState("");
  useEffect(() => {
    let data = [] as MediaProps[];
    const listRef = ref(storage, "");
    const run = async () => {
      let listAllVar = await listAll(listRef);
      await listAllVar.items.forEach(async (itemRef) => {
        data.push({
          name: itemRef.name,
          fullPath: itemRef.fullPath,
          url: "",
        });
      });
      await setMediaData(data);
    };
    run();
  }, []);
  useEffect(() => {
    if (mediaData.length > 0) {
      let data = mediaData;
      if (filterValue) data = data.filter((e) => e.fullPath.toLowerCase().match(filterValue.toLowerCase()));
      setFilteredMediaData(data);
    }
  }, [mediaData, filterValue]);
  const loadThumb = async (fullPath: string) => {
    console.log(fullPath);
    await getDownloadURL(ref(storage, fullPath)).then((r) => {
      setMediaData((p: MediaProps[]) => {
        return p.map((e) => {
          if (e?.fullPath) {
            if (e.fullPath == fullPath) e.url = r;
          }
          return e;
        }) as unknown as MediaProps[];
      });
    });
  };
  return (
    <Box>
      <Dropzone
        openRef={openRef}
        onDrop={(files) => {
          const mediasRef = ref(storage, files[0].name);
          uploadBytes(mediasRef, files[0]).then((snapshot) => {});
        }}
      >
        <Text size="sm">Drop media here / select files.</Text>
      </Dropzone>

      <Group position="center" mt="md">
        <Button
          onClick={() => {
            if (openRef != null) {
              (openRef as any).current();
            }
          }}
        >
          Select files
        </Button>
      </Group>
      <TextInput
        pt={19}
        value={filterValue}
        placeholder="Search for media"
        onChange={(value) => setFilterValue(value.currentTarget.value)}
      ></TextInput>
      <Box mt={20}>
        {filteredMediaData.map((e, i) => (
          <Box
            onClick={() => {
              selectImage(e);
              setActive(e.fullPath);
            }}
            key={e.name}
            style={{display:"inline"}}
            onMouseOver={() => (e.url ? null : loadThumb(e.fullPath))}
          >
            <ImageBlock data={e} active={active} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
