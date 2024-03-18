"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f1c849",
    },
    knownTerm: {
      main: "#33a314",
    },
    repeatableTerm: {
      main: "#eb3434",
    },
    greyColor: {
      main: "#b6b6b6",
      dark: "#919191",
      light: "#dedcdc",
    },
    background: {
      default: "#f9f9f9",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    highlighted: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "markedAsKnown" },
          style: {
            border: "none",
            color: "#33a314",
          },
        },
        {
          props: { variant: "markedAsRepeatable" },
          style: {
            border: "none",
            color: "#eb3434",
          },
        },
        {
          props: { variant: "notMarked" },
          style: {
            border: "1px solid #b6b6b6",
            color: "#797575",
          },
        },
      ],
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          highlighted: "p",
        },
      },
    },
  },
});

export default theme;
