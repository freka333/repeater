import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import Navbar from "@/components/appbar/Navbar";
import { AlertProvider, NextAuthProvider } from "./provider";
import { CssBaseline } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { prisma } from "./prismaClient";
import authOptions from "@/lib/configs/authOptions";

export const metadata: Metadata = {
  title: "Repeater",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const collections = session
    ? await prisma.termCollection.findMany({
        where: { ownerId: session?.user.id },
      })
    : undefined;

  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline>
                <AlertProvider>
                  <Navbar collections={collections} userId={session?.user.id} />
                  {children}
                </AlertProvider>
              </CssBaseline>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
