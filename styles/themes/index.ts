import { DefaultMantineColor, MantineTheme } from "@mantine/core";
import typography from "./typography";

const primaryTheme: Partial<MantineTheme> = {
  ...typography,
  primaryColor: "green",
  colors: {
    "black-alpha": [
      "#00000000",
      "#00000020",
      "#00000040",
      "#00000060",
      "#00000080",
      "#000000a3",
      "#000000b3",
      "#000000c3",
      "#000000d3",
      "#000000f3",
    ],
    "white-alpha": [
      "#ffffff00",
      "#ffffff20",
      "#ffffff40",
      "#ffffff60",
      "#ffffff80",
      "#ffffffa3",
      "#ffffffb3",
      "#ffffffc3",
      "#ffffffd3",
      "#fffffff3",
    ],
  } as unknown as Record<
    DefaultMantineColor,
    [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  >,
  globalStyles: (theme) => ({
    body: {},
  }),
};

export default primaryTheme;
