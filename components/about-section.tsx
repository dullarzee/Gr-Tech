"use client";

export default function AboutSection() {
  return (
    <section className="py-20 px-6 bg-zinc-900/50 border-t border-zinc-800/50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-xs text-amber-400 font-semibold mb-3">
            About GR-Tech
          </p>
          <h2 className="text-4xl font-bold mb-6">
            We are trusted solar energy solutions provider
          </h2>
          <p className="text-zinc-400 mb-4">
            delivering modern and efficient solar systems for residential,
            commercial, and industrial needs.
          </p>
        </div>

        <p className="text-zinc-400 leading-relaxed">
          Our team of expert engineers and technicians ensures customized system
          design, precise planning, and safe installation tailored to each
          project&apos;s unique requirements. We incorporate cutting-edge
          components to guarantee reliable performance and long-term efficiency.
        </p>
      </div>
    </section>
  );
}
