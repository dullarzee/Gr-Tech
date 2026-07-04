import Navigation from "@/components/header";
import Footer from "@/components/footer";
import {
  Zap,
  Home,
  Building2,
  Wrench,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Services | SolarBloom",
  description:
    "Comprehensive solar energy solutions for residential, commercial, and industrial applications.",
};

export default function Services() {
  const services = [
    {
      icon: Home,
      title: "Residential Solar",
      description:
        "Transform your home with clean, renewable energy. Our residential solar solutions reduce energy bills while increasing property value.",
      features: [
        "Roof-mounted systems",
        "Ground-mounted arrays",
        "Battery storage",
        "Net metering",
      ],
    },
    {
      icon: Building2,
      title: "Commercial Solar",
      description:
        "Scalable solar solutions designed for businesses of all sizes. Maximize ROI while demonstrating environmental commitment.",
      features: [
        "Large-scale systems",
        "Custom design",
        "Energy monitoring",
        "Maintenance plans",
      ],
    },
    {
      icon: Wrench,
      title: "Industrial Solutions",
      description:
        "Heavy-duty solar installations for industrial facilities. Reduce operational costs and carbon footprint at scale.",
      features: [
        "High-capacity systems",
        "Industrial-grade equipment",
        "Integration services",
        "Technical support",
      ],
    },
  ];

  const additionalServices = [
    {
      icon: TrendingUp,
      title: "Energy Consultation",
      description:
        "Expert analysis of your current energy usage and custom recommendations for maximum savings.",
    },
    {
      icon: ShieldCheck,
      title: "System Maintenance",
      description:
        "Regular maintenance and monitoring to ensure optimal performance and longevity of your system.",
    },
    {
      icon: Zap,
      title: "Installation & Support",
      description:
        "Professional installation by certified technicians with 24/7 customer support and warranty coverage.",
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
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs text-zinc-300">
                Our Complete Service Lineup
              </span>
            </div>
          </div>

          <h1 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block mb-2">Solar Solutions</span>
            <span className="bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              for Every Need
            </span>
          </h1>

          <p className="text-center text-zinc-400 text-lg max-w-2xl mx-auto mb-12">
            From residential rooftops to industrial facilities, we provide
            comprehensive solar solutions tailored to your specific
            requirements.
          </p>
        </div>
      </section>

      {/* Main Services - 3 Column */}
      <section className="px-6 md:px-8 py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group p-8 rounded-3xl bg-linear-to-br from-zinc-800/40 to-zinc-900/40 border border-zinc-700/30 backdrop-blur-sm hover:border-amber-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center mb-6 group-hover:bg-amber-400/30 transition-colors">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>

                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2 text-xs text-zinc-300"
                      >
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 shrink-0"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-600 hover:border-amber-400 font-semibold py-2 text-sm rounded-lg">
                    Learn More
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services - Bento Style */}
      <section className="px-6 md:px-8 py-20 bg-linear-to-b from-zinc-950 to-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-linear-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                Additional Services
              </span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Beyond installation, we provide comprehensive support to ensure
              your solar system operates at peak efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group p-6 rounded-2xl bg-linear-to-br from-emerald-500/15 to-emerald-600/10 border border-emerald-500/30 backdrop-blur-sm hover:border-emerald-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/10"
                >
                  <Icon className="w-8 h-8 text-emerald-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-zinc-400 text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 md:px-8 py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our Process
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Consultation",
                description:
                  "Initial assessment of your energy needs and goals.",
              },
              {
                step: 2,
                title: "Design",
                description:
                  "Custom system design optimized for your property.",
              },
              {
                step: 3,
                title: "Installation",
                description:
                  "Professional installation with minimal disruption.",
              },
              {
                step: 4,
                title: "Monitoring",
                description: "Continuous monitoring and maintenance support.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-400 text-zinc-950 font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-8 py-20 bg-linear-to-br from-emerald-600/20 to-emerald-700/10 border-t border-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Go Solar?
          </h2>
          <p className="text-zinc-300 text-lg mb-8 max-w-2xl mx-auto">
            Get a free consultation and custom quote from our solar energy
            experts.
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
