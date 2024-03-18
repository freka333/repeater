import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import Navbar from "@/components/appbar/Navbar";
import { NextAuthProvider } from "./provider";
import { CssBaseline } from "@mui/material";

export const metadata: Metadata = {
  title: "Repeater",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline>
                <Navbar />
                {children}
              </CssBaseline>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
