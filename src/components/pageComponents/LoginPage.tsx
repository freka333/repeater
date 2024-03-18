import { Button, Paper, Typography } from "@mui/material";

import { signIn } from "next-auth/react";

export const LoginPage = () => {
  return (
    <Paper
      sx={{
        width: "90%",
        maxWidth: "sm",
        my: 4,
        mx: "auto",
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h5">Welcome!</Typography>
      <Typography>
        Sign up if you want to improve your English skills!
      </Typography>
      <Button
        variant="contained"
        onClick={() => signIn("github")}
        sx={{ backgroundColor: "black" }}
      >
        Sign in with Github
      </Button>
    </Paper>
  );
};
