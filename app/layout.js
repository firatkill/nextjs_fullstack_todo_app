"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";

import SnackbarComponent from "@/components/global/snackbarComponent";
import ThemeProviderContainer from "@/containers/themeProviderContainer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, session }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProviderContainer>
          <SnackbarComponent />
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProviderContainer>
      </body>
    </html>
  );
}
