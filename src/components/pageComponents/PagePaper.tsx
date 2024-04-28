import { Paper } from "@mui/material";
import { ReactNode } from "react";

export const PagePaper = ({ children }: { children: ReactNode }) => {
  return (
    <Paper
      sx={{
        width: "90%",
        maxWidth: "md",
        p: 4,
        mx: "auto",
        my: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {children}
    </Paper>
  );
};
