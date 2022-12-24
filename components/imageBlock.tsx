import { Box, Image, Text } from "@mantine/core";
import { IconSquarePlus } from "@tabler/icons";
import { ref, listAll, uploadBytes, getDownloadURL } from "firebase/storage";
interface ImageBlockProps {
  data: MediaProps;
  active?: string;
}
export default function ImageBlock({ data, active }: ImageBlockProps) {
  return (
    <Box style={{ height: 150, width: 123, overflow: "hidden", display: "inline-block" }} mt={15} p={9}>
      <Image
        src={data.url ? data.url : null}
        height={100}
        width={100}
        alt="With default placeholder"
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
  );
}

export function ImageBlockPlaceholder() {
  return (
    <Box style={{ height: 150, width: 123, overflow: "hidden", display: "inline-block", cursor:"pointer" }} mt={15} p={9}>
      <Box style={{ borderRadius: 10, overflow: "hidden", display: "flex", justifyContent: "center" }}>
        <IconSquarePlus size={99} stroke={0.6} color={"rgba(0, 0, 0, 0.59)"} />
      </Box>
    </Box>
  );
}
