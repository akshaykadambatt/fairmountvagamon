import { MantineTheme } from "@mantine/core";
import { Mr_Dafoe } from "@next/font/google";
import { Open_Sans } from "@next/font/google";

const sono = Open_Sans({
  subsets: ["latin"],
});

export const mrDafoe = Mr_Dafoe({
  weight: ["400"],
  subsets: ["latin"],
});

const typography: Partial<MantineTheme> = {
    fontFamily: sono.style.fontFamily,
    colorScheme: "light",
  headings: {
    fontFamily: sono.style.fontFamily,
    fontWeight: 400,
    sizes: {
      h1: {
        fontSize: "68px",
        fontWeight: 400,
        lineHeight: "74px",
      },
      h2: {
        fontSize: "40px",
        fontWeight: 500,
        lineHeight: "54px",
      },
      h3: {
        fontSize: "32px",
        fontWeight: 400,
        lineHeight: "36px",
      },
      h4: {
        fontSize: "28px",
        fontWeight: 300,
        lineHeight: "32px",
      },
      h5: {
        fontSize: "24px",
        fontWeight: 300,
        lineHeight: "28px",
      },
      h6: {
        fontSize: "20px",
        fontWeight: 300,
        lineHeight: "24px",
      },
    },
  },
};

export default typography;