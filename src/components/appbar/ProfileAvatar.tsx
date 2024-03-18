"use client";

import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";

export default function ProfileAvatar() {
  const { data: session } = useSession();

  return (
    <Avatar
      src={session?.user?.image || undefined}
      alt={session?.user?.name || undefined}
    />
  );
}
