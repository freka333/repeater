import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { FC, ReactNode } from "react";
import theme from "@/theme";
import Link from "next/link";

export type displayedItems = {
  Unmarked: boolean;
  Known: boolean;
  Repeatable: boolean;
};

interface BasicTermsHeaderProps {
  title: string;
  filter: ReactNode;
  learningPath?: string;
}

export const BasicHeaderForTerms: FC<BasicTermsHeaderProps> = ({
  title,
  filter,
  learningPath,
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
      <Stack flexDirection="row" gap={2}>
        <Typography variant="h6" textAlign={isMobile ? "center" : "left"}>
          {title}
        </Typography>
        {learningPath && (
          <Button variant="contained" LinkComponent={Link} href={learningPath}>
            Learn
          </Button>
        )}
      </Stack>
      {filter}
    </Box>
  );
};
