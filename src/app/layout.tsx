import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import LoadingScreen from "@/components/ui/LoadingScreen";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Elektora Team - Tech Community Platform",
  description: "Join the Elektora Team tech community for software and hardware enthusiasts",
  keywords: ["tech community", "software", "hardware", "elektora", "tech platform"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${dmSans.variable} antialiased font-inter`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <LoadingScreen>
              {children}
            </LoadingScreen>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
