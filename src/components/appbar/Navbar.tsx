"use client";

import SettingsMenu from "./SettingsMenu";
import { AppBar, Box, Toolbar, Typography, styled } from "@mui/material";
import { useSession } from "next-auth/react";
import { UserCollections } from "./UserCollections";
import Link from "next/link";

export default function Navbar() {
  const { status } = useSession();

  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            component={Link}
            href="/"
            variant="h5"
            sx={{ color: "inherit", textDecoration: "none", mr: 2 }}
          >
            Repeater
          </Typography>
          {status === "authenticated" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            >
              <UserCollections />
              <SettingsMenu />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
}
