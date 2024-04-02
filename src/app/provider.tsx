"use client";

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

export const NextAuthProvider = ({ children }: { children: any }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const AlertProvider = ({ children }: { children: any }) => {
  return <SnackbarProvider>{children}</SnackbarProvider>;
};
