"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";
import Link from "next/link";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer
      className={`border-t border-zinc-800/50 px-6 py-12 ${theme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {theme === "dark" ? (
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
                className={`text-xl font-bold ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
              >
                GR Tech
              </span>
            </div>
            <p className="text-sm text-zinc-500">Powering tomorrow, today.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`font-semibold mb-4 ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-amber-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-amber-400 transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-amber-400 transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className={`font-semibold mb-4 ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              Company
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link
                  href="/products"
                  className="hover:text-amber-400 transition"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="hover:text-amber-400 transition"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3
              className={`font-semibold mb-4 ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              Get In Touch
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a
                  href="mailto:hello@solarbloom.com"
                  className="hover:text-amber-400 transition"
                >
                  Grtechservices2@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+2348091691064"
                  className="hover:text-amber-400 transition"
                >
                  +234 80 9169 1064
                </a>
              </li>
              <li className="pt-2">Follow us on our socials</li>
              <section className="flex gap-4 mt-3">
                <a
                  target="_blank"
                  href={`https://instagram.com/gr_tech_services`}
                >
                  <FaInstagram className="w-8 h-8" />
                </a>
                <a target="_blank" href={`https://tiktok.com/@grtechservices1`}>
                  <FaTiktok className="w-8 h-8" />
                </a>
                <a target="_blank" href={`https://facebook.com`}>
                  <FaFacebook className="w-8 h-8" />
                </a>
              </section>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
            <p>
              &copy; {new Date().getFullYear()} Gr Technologies. All rights
              reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-amber-400 transition">
                Privacy policy
              </a>
              <a href="#" className="hover:text-amber-400 transition">
                Terms of use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
