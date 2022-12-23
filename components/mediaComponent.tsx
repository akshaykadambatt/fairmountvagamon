import { ref, listAll, uploadBytes, getDownloadURL } from "firebase/storage";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { storage } from "./data/firebaseConfig";
import { Box, Group, Button, SimpleGrid, Image, Text, TextInput } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
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
    let downloadUrlVar = [] as any[];
    const listRef = ref(storage, "");
    const run = async () => {
      let listAllVar = await listAll(listRef);
      await listAllVar.items.forEach(async (itemRef) => {
        // console.log(itemRef.fullPath);
        data.push({
          name: itemRef.name,
          fullPath: itemRef.fullPath,
          url: "",
        });
        // downloadUrlVar.push(itemRef.fullPath)
        // await getDownloadURL(ref(storage, itemRef.fullPath)).then(r=>{
        //   data.push({
        //     name: itemRef.name,
        //     url: r
        //   })
        //   console.log(itemRef.name);

        // })
      });
      // downloadUrlVar.forEach(e=>{

      // })
      await setMediaData(data);
      await console.log(data);
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
            style={{ height: 150, width: 123, overflow: "hidden", display: "inline-block" }}
            mt={15}
            p={9} onClick={()=>{selectImage(e);setActive(e.fullPath)}}
          >
            <Image
              src={e.url ? e.url : null}
              height={100}
              width={100}
              alt="With default placeholder"
              withPlaceholder
              onMouseOver={() => (e.url ? null : loadThumb(e.fullPath))}
              style={{ borderRadius: 10, overflow: "hidden", border: active==e.fullPath?"2px solid red":"2px solid #00000030"}}
            />
            <Text
              size="sm"
              style={{
                width: "100%",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {e.name}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
