"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { themePalette } from "@/lib/palette";

export default function Navigation() {
  const [activeLink, setActiveLink] = useState("/");
  const pathname = usePathname();
  const { theme, resolvedTheme, setTheme } = useTheme();

  const links = {
    home: "/",
    shop: "products",
    resources: "resources",
    about: "about",
    contact: "contact",
  };

  useEffect(() => {
    if (pathname === links.home) setActiveLink(links.home);
    else if (pathname.includes(links.shop)) setActiveLink(links.shop);
    else if (pathname.includes(links.resources)) setActiveLink(links.resources);
    else if (pathname.includes(links.about)) setActiveLink(links.about);
    else if (pathname.includes(links.contact)) setActiveLink(links.contact);
    else setActiveLink("");
  }, [pathname]);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md">
      <Link
        href="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {theme === "light" ? (
          <Image
            alt="Gr tech logo"
            src="/images/gr-tech-bgless-logo.png"
            width={65}
            height={65}
          />
        ) : (
          <Image
            alt="Gr tech logo"
            src="/images/gr-tech-bgless-logo-dark.png"
            width={65}
            height={65}
          />
        )}
        <span
          className={`text-xl font-bold ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
        >
          GR-Tech
        </span>
      </Link>

      <div
        className={`hidden md:flex items-center text-sm border-3 border-gray-500/50 p-1 rounded-lg ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
      >
        <Link
          href="/"
          className={`hover:text-amber-400 transition-colors px-3 py-1 rounded-sm ${activeLink === links.home ? "bg-gray-500/50" : "bg-none"}`}
        >
          Home
        </Link>
        {/* <Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link> */}
        <Link
          href="/products"
          className={`hover:text-amber-400 transition-colors px-3 py-1 rounded-sm ${activeLink === links.shop ? "bg-gray-500/50" : "bg-none"}`}
        >
          Shop
        </Link>
        {/* <Link href="/calculator" className="hover:text-amber-400 transition-colors">Calculator</Link> */}
        <Link
          href="/resources"
          className={`hover:text-amber-400 transition-colors px-3 py-1 rounded-sm ${activeLink === links.resources ? "bg-gray-500/50" : "bg-none"}`}
        >
          Resources
        </Link>
        <Link
          href="/about"
          className={`hover:text-amber-400 transition-colors px-3 py-1 rounded-sm ${activeLink === links.about ? "bg-gray-500/50" : "bg-none"}`}
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className={`hover:text-amber-400 transition-colors px-3 py-1 rounded-sm ${activeLink === links.contact ? "bg-gray-500/50" : "bg-none"}`}
        >
          Contact
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant={theme === "dark" ? "outline" : "secondary"}
            size="sm"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-950 " />
            )}
          </Button>
          <div className="md:hidden">
            <Button>Menu</Button>
          </div>
        </div>
        <Button className="hidden md:block bg-amber-400 text-zinc-950 hover:bg-amber-300 text-sm font-semibold">
          Get Started
        </Button>
      </div>
    </nav>
  );
}
