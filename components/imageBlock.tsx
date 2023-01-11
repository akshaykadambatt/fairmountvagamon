import { ActionIcon, Box, Button, HoverCard, Image, Text,SimpleGrid } from "@mantine/core";
import { IconAdjustments, IconArrowLeft, IconArrowRight, IconSignLeft, IconSquarePlus, IconTrash } from "@tabler/icons";
import { ref, listAll, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";
interface ImageBlockProps {
  data: MediaProps;
  active?: string;
}
export default function ImageBlock({ data, active }: ImageBlockProps) {
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
              withPlaceholder
              style={{
                borderRadius: 10,
                overflow: "hidden",
                border: active == data.fullPath ? "2px solid red" : "2px solid #00000030",
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
          <Box style={{display:"flex",gap:10}} mt={10}>
          <ActionIcon color="blue" variant="light">
            <IconArrowLeft size={18} />
          </ActionIcon>
          <ActionIcon color="blue" variant="light">
            <IconArrowRight size={18} />
          </ActionIcon>
          <ActionIcon color="red" variant="light">
            <IconTrash size={18} />
          </ActionIcon>
          </Box>
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
