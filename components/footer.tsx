'use client'

import { Sun } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800/50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sun className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-bold">SolarBloom</span>
            </div>
            <p className="text-sm text-zinc-500">Powering tomorrow, today.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-amber-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Services</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">About</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-amber-400 transition">Our Team</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Press</a></li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="mailto:hello@solarbloom.com" className="hover:text-amber-400 transition">hello@solarbloom.com</a></li>
              <li><a href="tel:+1234567890" className="hover:text-amber-400 transition">+1 (234) 567-8900</a></li>
              <li className="pt-2">Follow us on social</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
            <p>&copy; 2024 SolarBloom. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-amber-400 transition">Privacy policy</a>
              <a href="#" className="hover:text-amber-400 transition">Terms of use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
