import "@/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Merriweather } from "next/font/google"; // Import a serif font
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "KAMP Dashboard",
  description: "Property management made expressive and friendly",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

// Load fonts
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${merriweather.variable}`}>
      <body className="font-sans bg-purple-50 text-stone-900 antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
