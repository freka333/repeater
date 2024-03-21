"use client";

import SettingsMenu from "./SettingsMenu";
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { UserCollections } from "./UserCollections";
import Link from "next/link";
import { paths } from "@/paths";
import { TermCollection } from "@prisma/client";

export default function Navbar({
  collections,
  userId,
}: {
  collections: TermCollection[] | undefined;
  userId: string | undefined;
}) {
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
          {status === "authenticated" && userId && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            >
              <Stack direction="row">
                <Button
                  sx={{ color: "white" }}
                  component={Link}
                  href={paths.irregularVerbs.path}
                >
                  {paths.irregularVerbs.name}
                </Button>
                <UserCollections collections={collections} userId={userId} />
              </Stack>
              <SettingsMenu />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
}
