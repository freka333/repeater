"use client";

import { LoadingPage } from "@/components/pageComponents/LoadingPage";
import { LoginPage } from "@/components/pageComponents/LoginPage";
import { MainPage } from "@/components/pageComponents/MainPage";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return <LoginPage />;
  }

  if (status === "authenticated" && session.user) {
    return <MainPage name={session.user.name} />;
  }

  return <LoadingPage />;
}
