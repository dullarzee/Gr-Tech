'use client'

import { Sun, Zap, Wrench } from 'lucide-react'

export default function ServicesGrid() {
  const services = [
    {
      icon: Sun,
      title: 'Residential Solar',
      description: 'High-performance and cost-saving solar installation for homes.',
      gradient: 'from-amber-500/20 to-amber-600/10',
      border: 'border-amber-500/30',
      bgColor: 'bg-amber-500/10',
    },
    {
      icon: Zap,
      title: 'Solar Inverter Solutions',
      description: 'Advanced inverter systems optimizing solar energy conversion.',
      gradient: 'from-emerald-500/20 to-emerald-600/10',
      border: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/10',
    },
    {
      icon: Wrench,
      title: 'Industrial & Commercial',
      description: 'Custom electrical and solar troubleshooting services.',
      gradient: 'from-cyan-500/20 to-cyan-600/10',
      border: 'border-cyan-500/30',
      bgColor: 'bg-cyan-500/10',
    },
  ]

  return (
    <section className="py-20 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs text-amber-400 font-semibold mb-3">Services</p>
          <h2 className="text-4xl font-bold">Our Services</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <div
                key={idx}
                className={`group p-8 rounded-2xl bg-gradient-to-br ${service.gradient} border ${service.border} backdrop-blur-md hover:border-amber-400/50 transition-all duration-300 cursor-pointer hover:translate-y-[-4px]`}
              >
                <div className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
