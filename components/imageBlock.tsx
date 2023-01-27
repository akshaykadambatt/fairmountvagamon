import { ActionIcon, Box, HoverCard, Image, Text } from "@mantine/core";
import { IconSquarePlus, IconTrash } from "@tabler/icons";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
interface ImageBlockProps {
  data: MediaProps;
  active?: string;
  controls: boolean;
  images: MediaProps[];
  setImages: Dispatch<SetStateAction<MediaProps[]>>;
}
export default function ImageBlock({ data, active, controls, images, setImages }: ImageBlockProps) {
  // function arraymove(arr: MediaProps[], fromIndex: number, toIndex: number) {
  //   var element = arr[fromIndex];
  //   arr.splice(fromIndex, 1);
  //   arr.splice(toIndex, 0, element);
  //   return arr
  // }
  // const moveLeft = () => {
  //   console.log(images.map(e=>e.name));
  //   let temp = arraymove(images,images.findIndex((e) => e === data),images.findIndex((e) => e === data)-1 )
  //   setImages(temp);
  // };
  // const moveRight = () => {
  //   let temp = arraymove(images,images.findIndex((e) => e === data),images.findIndex((e) => e === data)+1 )
  //   setImages(temp);
  // };
  const trashThis = () => {
    images.splice(images.findIndex((e) => e === data),1)
    console.log(images,images.findIndex((e) => e === data),images.findIndex((e) => e === data)+1);
    
    let temp = [...images]
    console.log([...images]);
    
    setImages(temp)
  };
  return (
    <Box style={{ height: 150, width: 123, overflow: "hidden", display: "inline-block" }} mt={15} p={9}>
      <HoverCard width={280} shadow="md" openDelay={0} transition="pop" withArrow>
        <HoverCard.Target>
          <Box>
            <Image
              src={data.url ? data.url : null}
              height={100}
              width={100}
              alt={data.name}
              className={`media-image-component ${active == data.fullPath ? "active":null}`}
              withPlaceholder
              style={{
                borderRadius: 10,
                overflow: "hidden",
              }}
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
              {data.name}
            </Text>
          </Box>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm" weight={700}>
            {data.name}
          </Text>
          <Text
            size="xs"
            style={{ wordWrap: "break-word", lineHeight: 1 }}
            target="_blank"
            color="blue"
            component={Link}
            href={data.url}
          >
            {data.url}
          </Text>
          {controls && (
            <Box style={{ display: "flex", gap: 10 }} mt={10}>
              {/* <ActionIcon color="blue" variant="light" onClick={moveLeft}>
                <IconArrowLeft size={18} />
              </ActionIcon>
              <ActionIcon color="blue" variant="light" onClick={moveRight}>
                <IconArrowRight size={18} />
              </ActionIcon> */}
              <ActionIcon color="red" variant="light" onClick={trashThis}>
                <IconTrash size={18} />
              </ActionIcon>
            </Box>
          )}
        </HoverCard.Dropdown>
      </HoverCard>
    </Box>
  );
}

export function ImageBlockPlaceholder() {
  return (
    <Box
      style={{ height: 150, width: 123, overflow: "hidden", display: "inline-block", cursor: "pointer" }}
      mt={15}
      p={9}
    >
      <Box style={{ borderRadius: 10, overflow: "hidden", display: "flex", justifyContent: "center" }}>
        <IconSquarePlus size={99} stroke={0.6} color={"rgba(0, 0, 0, 0.59)"} />
      </Box>
    </Box>
  );
}
