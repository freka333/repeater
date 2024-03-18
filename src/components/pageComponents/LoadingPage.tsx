import { Box, CircularProgress, Paper } from "@mui/material";

export const LoadingPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        p: 4,
      }}
    >
      <CircularProgress />
    </Box>
  );
};
