"use client";

import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children }: { children: any }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
