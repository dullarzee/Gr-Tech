import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { geistMono, geistSans, notoSans } from "@/lib/fonts";
import { useTheme } from "next-themes";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "sonner";
import ThemeProvider from "@/components/ui/themeProvider";
import axios from "axios";
import { themePalette } from "@/lib/palette";
import { SharedContextProvider } from "@/components/ui/sharedContextProvider";

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

const scriptProps =
  typeof window === "undefined"
    ? undefined
    : ({ type: "application/json" } as const);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  axios.defaults.withCredentials = true;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoSans.variable} bg-zinc-950`}
    >
      <body
        className={`font-sans antialiased bg-zinc-950 text-white **:transition-colors **:ease-out  **:duration-100 ${geistMono.className}`}
      >
        <AuthProvider>
          <CartProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={true}
              scriptProps={scriptProps}
            >
              {children}
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>

        <Toaster
          position="top-right"
          richColors
          //theme={theme === "dark" ? "dark" : "light"}
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
