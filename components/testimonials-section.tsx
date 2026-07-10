"use client";

import { Star } from "lucide-react";
import { themePalette } from "@/lib/palette";
import { useTheme } from "next-themes";

export default function TestimonialsSection() {
  const { theme } = useTheme();
  const testimonials = [
    {
      name: "John Anderson",
      role: "Homeowner",
      text: "Great company! Installing their solar system was the best decision I made. We've saved so much on electricity bills!",
      rating: 5,
    },
    {
      name: "Jane Robertson",
      role: "Business Owner",
      text: "The process was smooth and professional from start to finish. Highly recommend their services to anyone considering solar.",
      rating: 5,
    },
    {
      name: "Mike Thompson",
      role: "Farmer",
      text: "Switched to solar power two years ago and couldn't be happier. Their team provided excellent support throughout.",
      rating: 5,
    },
  ];

  return (
    <section
      className={`py-20 px-6 border-t ${theme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xs text-amber-400 font-semibold mb-3">
          Testimonials
        </p>
        <h2
          className={`text-4xl font-bold mb-12 ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
        >
          What Our Clients Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl hover:border-amber-400/20 transition-all ${theme === "dark" ? themePalette.dark.chip_style : themePalette.light.chip_style}`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="mb-6 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-zinc-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
