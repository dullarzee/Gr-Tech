'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-emerald-950/50 to-zinc-950">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6">Switch to Solar Energy Today</h2>
        <p className="text-zinc-400 mb-8 text-lg">
          Join thousands of homeowners and businesses already saving with clean, renewable energy.
        </p>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg group">
          Get Started Now
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  )
}
