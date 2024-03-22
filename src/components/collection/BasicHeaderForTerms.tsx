import { Box, Typography, useMediaQuery } from "@mui/material";
import { FC, ReactNode } from "react";
import theme from "@/theme";

export type displayedItems = {
  Unmarked: boolean;
  Known: boolean;
  Repeatable: boolean;
};

interface BasicTermsHeaderProps {
  title: string;
  filter: ReactNode;
}

export const BasicHeaderForTerms: FC<BasicTermsHeaderProps> = ({
  title,
  filter,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        gap: 2,
      }}
    >
      <Typography variant="h6" textAlign={isMobile ? "center" : "left"}>
        {title}
      </Typography>
      {filter}
    </Box>
  );
};
