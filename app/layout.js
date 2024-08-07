"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, session }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
