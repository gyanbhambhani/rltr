import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/LayoutWrapper";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-alt",
  weight: ["200", "300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RLTR — AI powered deal intelligence for realtors",
  description:
    "RLTR is AI powered deal intelligence for realtors. Close faster, smarter, and sharper.",
  metadataBase: new URL("https://rltr.local"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
