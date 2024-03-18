"use client";

import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";

export default function SettingsMenu() {
  const { data: session } = useSession();
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  if (session?.user) {
    return (
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Settings">
          <IconButton
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              setAnchorElUser(e.currentTarget);
            }}
          >
            {session.user?.image && <ProfileAvatar />}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={!!anchorElUser}
          disableScrollLock
          onClose={() => {
            setAnchorElUser(null);
          }}
        >
          <MenuItem sx={{ gap: "12px" }}>
            {(session.user?.image || session.user?.name) && <ProfileAvatar />}
            <Stack>
              <Typography variant="subtitle2">{session.user?.name}</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: "400" }}>
                {session.user.email}
              </Typography>
            </Stack>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              setAnchorElUser(null);
              signOut();
            }}
          >
            <Typography>Sign out</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  }
}
