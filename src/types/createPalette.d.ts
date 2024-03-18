import * as createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  interface CustomPalette {
    greyColor: PaletteColorOptions;
    knownTerm: PaletteColorOptions;
    repeatableTerm: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}

  interface TypographyVariants {
    highlighted: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    highlighted?: React.CSSProperties;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    greyColor: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    highlighted: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    markedAsKnown: true;
    markedAsRepeatable: true;
    notMarked: true;
  }
}
