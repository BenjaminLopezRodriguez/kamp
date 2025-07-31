import "@/styles/globals.css";
import { type Metadata } from "next";
import { Geist, Rubik } from "next/font/google";
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

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${rubik.variable}`}>
      <body className="font-sans bg-purple-50 text-stone-900 antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
