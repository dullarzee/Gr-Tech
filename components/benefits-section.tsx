'use client'

import { TrendingDown, Leaf, Clock, Zap } from 'lucide-react'

export default function BenefitsSection() {
  const benefits = [
    { icon: TrendingDown, title: 'Lower electricity bills', color: 'text-amber-400' },
    { icon: Leaf, title: 'Eco-friendly energy', color: 'text-emerald-400' },
    { icon: Clock, title: 'Long-term cost savings', color: 'text-cyan-400' },
    { icon: Zap, title: 'Backup power during outages', color: 'text-amber-300' },
  ]

  return (
    <section className="py-20 px-6 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Benefits of Solar Energy</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-amber-400/30 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-amber-400/10 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <h3 className="font-semibold group-hover:text-amber-400 transition-colors">{benefit.title}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
