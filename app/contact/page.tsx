"use client";

import { useState } from "react";
import Navigation from "@/components/header";
import Footer from "@/components/footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";

export default function Contact() {
  const { resolvedTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    alert("Thank you for your message. We&apos;ll get back to you soon!");
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+234 8091691064",
      detail: "Available Monday-Friday, 9AM-6PM EST",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@solarbloom.com",
      detail: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Eleganza garden, opposite VGC, Lekki, Lagos",
      detail: "Headquarters & Installation Hub",
    },
    {
      icon: Clock,
      label: "Hours",
      value: "9:00 AM - 6:00 PM WAT",
      detail: "Monday through Friday",
    },
  ];

  return (
    <main
      className={`min-h-screen text-white ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
    >
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-8">
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-32 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-center text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span
              className={`block mb-2 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              Get in
            </span>
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <p className="text-center text-zinc-400 text-lg max-w-2xl mx-auto">
            Have questions? We&apos;re here to help. Reach out to our team and
            let&apos;s discuss your solar journey.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section
        className={`px-6 md:px-8 py-20 ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  className={`p-6 rounded-2xl hover:border-amber-400/50 transition-all duration-300 ${resolvedTheme === "dark" ? themePalette.dark.chip_style : themePalette.light.chip_style}`}
                >
                  <Icon className="w-8 h-8 text-amber-400 mb-4" />
                  <h3
                    className={`font-bold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                  >
                    {info.label}
                  </h3>
                  <p className="text-sm text-amber-300 font-semibold mb-2">
                    {info.value}
                  </p>
                  <p className="text-xs text-zinc-400">{info.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section
        className={`px-6 md:px-8 py-20 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2
                className={`text-3xl font-bold mb-8 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
              >
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                  >
                    Full Name <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-colors ${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                  >
                    Email Address<span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-colors ${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                  >
                    Phone Number <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg transition-colors ${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                  >
                    Subject <span className="text-red-500"> *</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-colors ${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}
                  >
                    <option value="">Select a subject</option>
                    <option value="residential">Residential Solar</option>
                    <option value="commercial">Commercial Solar</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg transition-colors ${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold py-3 rounded-lg text-base">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Info & Map Placeholder */}
            <div className="space-y-8">
              <div>
                <h3
                  className={`text-2xl font-bold mb-4 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                >
                  Our Office is situated at:
                </h3>
                <p
                  className={`mb-6 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                >
                  With multiple installation hubs and local teams, GR-Tech
                  serves customers throughout the region. Contact your nearest
                  office for personalized service.
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-96 rounded-2xl bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border border-zinc-700/30 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <p className="text-zinc-400">Interactive map coming soon</p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/10 border border-emerald-500/30 backdrop-blur-sm">
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="/pricing"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      View Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      Our Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-8 py-20 bg-gradient-to-br from-amber-600/20 to-amber-700/10 border-t border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
          >
            Can&apos;t Wait to Start?
          </h2>
          <p
            className={`text-lg mb-8 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
          >
            Schedule a free consultation and get your solar journey started
            today.
          </p>
          <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-10 py-6 rounded-lg text-lg">
            Schedule Consultation
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
