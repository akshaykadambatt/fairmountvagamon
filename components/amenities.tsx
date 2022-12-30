import { Box, Text, Title, Container, Skeleton, createStyles, SimpleGrid } from "@mantine/core";
import { AmenitiesIds } from "./data/constants";

export default function AmenitiesComponent({ data }: any) {
  return (
    <>
      {data.amenities.map((e: any) => (
        <Box>{AmenitiesIds[e]}</Box>
      ))}
    </>
  );
}
