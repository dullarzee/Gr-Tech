"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, ShoppingCart } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { themePalette } from "@/lib/palette";
import { geistMono } from "@/lib/fonts";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";

export default function Navigation() {
  const [activeLink, setActiveLink] = useState("/");
  const pathname = usePathname();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { items } = useCart();

  const links = [
    { name: "home", path: "/" },
    { name: "shop", path: "/products" },
    { name: "resources", path: "/resources" },
    { name: "about", path: "/about" },
    { name: "contact", path: "/contact" },
    { name: "cart", path: "/cart" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname === links[0].path) setActiveLink(links[0].path);
    else if (pathname.includes(links[1].path)) setActiveLink(links[1].path);
    else if (pathname.includes(links[2].path)) setActiveLink(links[2].path);
    else if (pathname.includes(links[3].path)) setActiveLink(links[3].path);
    else if (pathname.includes(links[4].path)) setActiveLink(links[4].path);
    else setActiveLink("");
  }, [pathname]);

  const currentTheme = mounted ? (resolvedTheme ?? theme) : "light";
  const isDarkTheme = currentTheme === "dark";

  const handleLogout = () => {
    logout();
    setShowMobileMenu(false);
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md">
      <Link
        href="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {isDarkTheme ? (
          <Image
            alt="Gr tech logo"
            src="/images/gr-tech-bgless-logo-dark.png"
            width={65}
            height={65}
          />
        ) : (
          <Image
            alt="Gr tech logo"
            src="/images/gr-tech-bgless-logo.png"
            width={65}
            height={65}
          />
        )}
        <span
          className={`text-xl font-bold ${isDarkTheme ? themePalette.dark.text_light : themePalette.light.text_dark}`}
        >
          GR-Tech
        </span>
      </Link>

      <div
        className={`hidden md:flex items-center text-sm border-3 border-gray-500/50 p-1 rounded-lg ${isDarkTheme ? themePalette.dark.text_light : themePalette.light.text_dark}`}
      >
        {links.map((link, idx) => (
          <Link
            key={link.name}
            href={link.path}
            className={`hover:text-amber-400 transition-colors capitalize px-3 py-1 rounded-sm ${activeLink === link.path ? "bg-gray-500/50" : "bg-none"}`}
          >
            {idx < links.length - 1 ? (
              link.name
            ) : (
              <div className="relative inline-flex justify-center items-center">
                <ShoppingCart
                  className={`w-4.5 h-4.5 hover:text-amber-400 ${isDarkTheme ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                />

                {items.length > 0 && (
                  <span className="bg-amber-500 absolute -top-3.5 -right-4 text-white text-[0.65em] px-2.5 py-0.5 block rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
            variant={isDarkTheme ? "outline" : "secondary"}
            size="sm"
          >
            {isDarkTheme ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-950 " />
            )}
          </Button>
          <div className="md:hidden">
            <Button
              onClick={() => setShowMobileMenu((prev) => !prev)}
              size="sm"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {user ? (
          <>
            <span
              className={`hidden md:inline-flex text-sm font-semibold ${isDarkTheme ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              {user.name.length > 13
                ? `${user?.name.slice(0, 13)}...`
                : user?.name || "User"}
            </span>
            <Button
              onClick={handleLogout}
              variant={isDarkTheme ? "outline" : "secondary"}
              size="sm"
              className="hidden md:inline-flex"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => router.push("/auth/register")}
            className="hidden md:block bg-amber-400 text-zinc-950 hover:bg-amber-300 text-sm font-semibold"
          >
            Get Started
          </Button>
        )}
      </div>

      {/*mobile menu*/}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            exit={{ y: 1000, opacity: 0.5 }}
            initial={{ y: 1000, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`fixed flex flex-col lg:hidden top-0 left-0 h-screen z-100 w-screen pt-4 ${isDarkTheme ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Link href="/cart">
                <div className="relative inline-flex justify-center items-center">
                  <ShoppingCart
                    className={`w-6 h-6 ${isDarkTheme ? "text-white" : "text-zinc-900"}`}
                  />
                  <span className="bg-amber-500 absolute -top-5 -right-3 text-white text-[0.65em] px-2.5 py-0.5 block rounded-full">
                    {items.length}
                  </span>
                </div>
              </Link>
              {isDarkTheme ? (
                <Image
                  alt="Gr tech logo"
                  src="/images/gr-tech-bgless-logo-dark.png"
                  width={65}
                  height={65}
                />
              ) : (
                <Image
                  alt="Gr tech logo"
                  src="/images/gr-tech-bgless-logo.png"
                  width={65}
                  height={65}
                />
              )}
              <button onClick={() => setShowMobileMenu(false)} className="p-0">
                <X
                  className={`w-6 h-6 ${isDarkTheme ? "text-white" : "text-zinc-900"} text-amber-500`}
                />
              </button>
            </div>
            <section className="flex flex-col mt-8 gap-y-3 items-center">
              {links.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`hover:scale-[1.1] active:scale-[1.2] transition-colors capitalize px-3 py-1 rounded-sm text-xl ${activeLink === link.path ? "text-amber-500 text-4xl" : isDarkTheme ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                >
                  {idx !== links.length - 1 && link.name.toUpperCase()}
                </Link>
              ))}
            </section>
            <div
              className={`flex flex-col items-center justify-center gap-3 mt-10 ${geistMono.className} ${isDarkTheme ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
            >
              {isAuthenticated ? (
                <>
                  <span className="text-lg font-semibold">
                    {user?.name || "User"}
                  </span>
                  <Button
                    onClick={handleLogout}
                    className="bg-amber-400 text-zinc-950 hover:bg-amber-300 text-sm font-semibold"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link href="/auth/register">
                  <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 text-sm font-semibold">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
