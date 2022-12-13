import { MantineTheme } from "@mantine/core";
import typography from "./typography";

const primaryTheme: Partial<MantineTheme> = {
  ...typography,
  primaryColor:"green",
  globalStyles: (theme) => ({
    body: {
    },
  }),
};

export default primaryTheme;