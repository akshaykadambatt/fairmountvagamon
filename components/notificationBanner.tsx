import { Box, Notification } from "@mantine/core";
import Head from "next/head";
import { useContext } from "react";
interface NotificationBannerProps {
    title: string;
    body?: string;
}
export default function NotificationBanner({title, body}: NotificationBannerProps) {
    
  return (
    <Box style={{ position: "fixed", bottom: 20, left: 20, zIndex: 220 }}>
      <Notification title={title}>{body}</Notification>
    </Box>
  );
}
