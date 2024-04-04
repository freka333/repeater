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
  useMediaQuery,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { UserCollections } from "./UserCollections";
import Link from "next/link";
import { paths } from "@/paths";
import { TermCollection } from "@prisma/client";
import theme from "@/theme";
import { MobileMenu } from "./MobileMenu";

export default function Navbar({
  collections,
  userId,
}: {
  collections: TermCollection[] | undefined;
  userId: string | undefined;
}) {
  const { status } = useSession();

  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isMobile && userId && (
            <MobileMenu collections={collections} userId={userId} />
          )}
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
                flexGrow: !isMobile ? 1 : "initial",
              }}
            >
              {!isMobile && (
                <Stack direction="row">
                  <Button
                    sx={{ color: "inherit" }}
                    component={Link}
                    href={paths.irregularVerbs.path}
                  >
                    {paths.irregularVerbs.name}
                  </Button>
                  <UserCollections collections={collections} userId={userId} />
                </Stack>
              )}
              <SettingsMenu />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
}
