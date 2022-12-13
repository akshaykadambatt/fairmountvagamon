import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Global, MantineProvider } from "@mantine/core";
import HeaderComponent from "../components/header";
import { Noto_Sans } from "@next/font/google";
import { Mrs_Saint_Delafield } from "@next/font/google";
import googleFontTheme from "../styles/themes/";
import FooterLinks from "../components/footer";
const natoSans = Noto_Sans({
  weight: ["100", "300", "400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
const mrsSaintDelafield = Mrs_Saint_Delafield({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={googleFontTheme}>
      <HeaderComponent />
      <Component {...pageProps} />
      <FooterLinks
        data={[
          {
            title: "About",
            links: [
              {
                label: "Features",
                link: "#",
              },
              {
                label: "Pricing",
                link: "#",
              },
              {
                label: "Support",
                link: "#",
              },
              {
                label: "Forums",
                link: "#",
              },
            ],
          },
          {
            title: "Project",
            links: [
              {
                label: "Contribute",
                link: "#",
              },
              {
                label: "Media assets",
                link: "#",
              },
              {
                label: "Changelog",
                link: "#",
              },
              {
                label: "Releases",
                link: "#",
              },
            ],
          },
          {
            title: "Community",
            links: [
              {
                label: "Join Discord",
                link: "#",
              },
              {
                label: "Follow on Twitter",
                link: "#",
              },
              {
                label: "Email newsletter",
                link: "#",
              },
              {
                label: "GitHub discussions",
                link: "#",
              },
            ],
          },
        ]}
      />
    </MantineProvider>
  );
}
