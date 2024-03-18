import { Paper, Typography } from "@mui/material";

export const MainPage = ({ name }: { name: string }) => {
  return (
    <Paper
      sx={{
        width: "90%",
        maxWidth: "md",
        p: 4,
        mx: "auto",
        my: 4,
        display: "flex",
      }}
    >
      <Typography variant="h5">Welcome, {name}!</Typography>
    </Paper>
  );
};
