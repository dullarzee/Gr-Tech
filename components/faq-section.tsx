'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How long do solar panels last?',
      answer: 'Most solar panels last 25-30 years with minimal maintenance required.',
    },
    {
      question: 'How long does installation take?',
      answer: 'Standard residential installation typically takes 1-3 days depending on system size.',
    },
    {
      question: 'Does solar energy reduce electricity bills?',
      answer: 'Yes, solar energy can reduce your electricity bills by 50-90% depending on your system size.',
    },
    {
      question: 'Will solar work during a power outage?',
      answer: 'Without a battery backup system, solar panels do not work during outages for safety reasons.',
    },
    {
      question: 'Do solar panels require maintenance?',
      answer: 'Solar panels require minimal maintenance - occasional cleaning and annual inspections are recommended.',
    },
  ]

  return (
    <section className="py-20 px-6 bg-zinc-900/50 border-y border-zinc-800/50">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs text-amber-400 font-semibold mb-3">FAQ</p>
        <h2 className="text-4xl font-bold mb-12">Frequently Asked Questions</h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-zinc-800/30 border border-zinc-700/30 hover:border-amber-400/20 transition-all cursor-pointer"
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg flex-1">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 transition-transform flex-shrink-0 ${
                    expandedIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {expandedIdx === idx && (
                <p className="text-zinc-400 mt-4 leading-relaxed">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
