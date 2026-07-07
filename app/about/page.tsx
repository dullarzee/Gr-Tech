import Navigation from "@/components/header";
import Footer from "@/components/footer";
import { Award, Users, Target, Zap, Globe, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About GR Tech | Our Mission & Values",
  description:
    "Learn about GR Tech's mission to make clean energy accessible to everyone.",
};

export default function About() {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "We're committed to reducing carbon emissions and promoting clean energy adoption worldwide.",
    },
    {
      icon: Users,
      title: "Innovation",
      description:
        "Continuous research and development to bring cutting-edge solar technology to our customers.",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "Highest quality standards in every installation, backed by expert technicians and rigorous testing.",
    },
    {
      icon: Award,
      title: "Reliability",
      description:
        "Industry-leading warranties, 24/7 support, and a track record of customer satisfaction.",
    },
  ];

  const stats = [
    { number: "15,000+", label: "Systems Installed" },
    { number: "45,000+", label: "Homes Powered" },
    { number: "500,000+", label: "MWh Generated" },
    { number: "12 Years", label: "Industry Experience" },
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      role: "CEO & Founder",
      bio: "Renewable energy visionary with 15+ years in the solar industry.",
    },
    {
      name: "James Chen",
      role: "Chief Technical Officer",
      bio: "Expert engineer specializing in system design and optimization.",
    },
    {
      name: "Maria Rodriguez",
      role: "Operations Manager",
      bio: "Ensures seamless execution of every project from start to finish.",
    },
    {
      name: "David Thompson",
      role: "Customer Relations",
      bio: "Dedicated to providing exceptional support and satisfaction.",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-8 bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-32 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-center text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block mb-2">About</span>
            <span className="bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              GR Technologies
            </span>
          </h1>

          <p className="text-center text-zinc-400 text-lg max-w-3xl mx-auto">
            Empowering homes and businesses with clean, renewable solar energy
            solutions since 2012.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-6 md:px-8 py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className="p-12 rounded-3xl bg-linear-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-zinc-200 leading-relaxed mb-6">
              At GR Tech, our mission is to make clean, renewable energy
              accessible and affordable for everyone. We believe that solar
              energy is the key to a sustainable future, and we&apos;re
              dedicated to helping individuals and businesses harness the power
              of the sun.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Through innovative technology, expert service, and unwavering
              commitment to our customers, we&apos;re transforming the way
              people power their lives.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-8 py-20 bg-linear-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our Impact
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-zinc-800/30 border border-zinc-700/30"
              >
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                  {stat.number}
                </div>
                <p className="text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 md:px-8 py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our Values
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="p-8 rounded-3xl bg-linear-to-br from-zinc-800/40 to-zinc-900/40 border border-zinc-700/30 backdrop-blur-sm hover:border-amber-400/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-zinc-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 md:px-8 py-20 bg-linear-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Meet Our Team
          </h2>
          <p className="text-center text-zinc-400 max-w-2xl mx-auto mb-16">
            Experienced professionals dedicated to delivering excellence in
            every solar project.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="group p-6 rounded-2xl bg-linear-to-br from-emerald-500/15 to-emerald-600/10 border border-emerald-500/30 backdrop-blur-sm hover:border-emerald-400/60 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-amber-400/40 to-amber-500/30 mb-4"></div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-emerald-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-zinc-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-8 py-20 bg-linear-to-br from-emerald-600/20 to-emerald-700/10 border-t border-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Solar Revolution
          </h2>
          <p className="text-zinc-300 text-lg mb-8">
            Become part of a global movement toward sustainable, clean energy.
          </p>
          <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-10 py-6 rounded-lg text-lg">
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
