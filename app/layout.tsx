import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { geistMono, geistSans, notoSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "GR Tech | Solar Energy Solutions",
  description:
    "Powering Tomorrow, Today. Premium solar solutions for residential, commercial, and industrial applications.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#18181b" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSans.variable} bg-zinc-950`}
    >
      <body
        className={`font-sans antialiased bg-zinc-950 text-white ${geistMono.className}`}
      >
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
