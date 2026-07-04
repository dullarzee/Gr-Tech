"use client";

import Navigation from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function CalculatorPage() {
  const [monthlyBill, setMonthlyBill] = useState(150);
  const [roofArea, setRoofArea] = useState(300);
  const [location, setLocation] = useState("temperate");
  const [panelSize, setPanelSize] = useState("400");

  // Calculate savings
  const sunHours =
    location === "temperate" ? 4.5 : location === "sunny" ? 6 : 3.5;
  const panelOutput = (parseInt(panelSize) / 1000) * sunHours * 30;
  const panelsNeeded = Math.ceil((monthlyBill * 12) / (panelOutput * 0.8));
  const systemSize = (panelsNeeded * parseInt(panelSize)) / 1000;
  const systemCost = systemSize * 2500;
  const federalTax = systemCost * 0.3;
  const netCost = systemCost - federalTax;
  const monthlyAnnualSavings = monthlyBill * 12 * 0.75;
  const paybackPeriod = Math.round((netCost / monthlyAnnualSavings) * 10) / 10;

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-zinc-950 pt-24">
        {/* Hero Section */}
        <section className="px-4 md:px-8 py-16 border-b border-zinc-800/30">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Solar Savings Calculator
            </h1>
            <p className="text-zinc-400 text-lg">
              Estimate your solar savings, system size, and ROI. Discover how
              much you can save with solar energy.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Input Form */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold mb-8">Your Information</h2>

                {/* Monthly Bill */}
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Average Monthly Electric Bill
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="range"
                        min="50"
                        max="500"
                        step="10"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>
                    <div className="text-3xl font-bold text-amber-400 min-w-20">
                      ${monthlyBill}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2">
                    Range: $50 - $500
                  </p>
                </div>

                {/* Roof Area */}
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Available Roof Area (sq ft)
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="range"
                        min="100"
                        max="1000"
                        step="50"
                        value={roofArea}
                        onChange={(e) => setRoofArea(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>
                    <div className="text-3xl font-bold text-amber-400 min-w-20">
                      {roofArea} sq ft
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2">
                    Range: 100 - 1000 sq ft
                  </p>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Your Location (Sun Exposure)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "limited", label: "Limited" },
                      { id: "temperate", label: "Temperate" },
                      { id: "sunny", label: "Very Sunny" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setLocation(opt.id)}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                          location === opt.id
                            ? "bg-amber-400 text-zinc-950"
                            : "bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Panel Size */}
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Solar Panel Size
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "400", label: "400W" },
                      { id: "550", label: "550W" },
                      { id: "600", label: "600W" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setPanelSize(opt.id)}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                          panelSize === opt.id
                            ? "bg-amber-400 text-zinc-950"
                            : "bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-8">Your Solar Estimate</h2>

                {/* System Size */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-400/15 to-amber-500/10 border border-amber-400/30">
                  <p className="text-sm text-zinc-400 mb-2">System Size</p>
                  <p className="text-4xl font-bold text-amber-400">
                    {systemSize.toFixed(2)} kW
                  </p>
                  <p className="text-xs text-zinc-400 mt-2">
                    {panelsNeeded} panels × {panelSize}W
                  </p>
                </div>

                {/* Panels Needed */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-400/15 to-emerald-500/10 border border-emerald-400/30">
                  <p className="text-sm text-zinc-400 mb-2">Panels Needed</p>
                  <p className="text-4xl font-bold text-emerald-400">
                    {panelsNeeded}
                  </p>
                  <p className="text-xs text-zinc-400 mt-2">
                    Based on your roof area
                  </p>
                </div>

                {/* System Cost */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-400/15 to-cyan-500/10 border border-cyan-400/30">
                  <p className="text-sm text-zinc-400 mb-2">
                    Estimated System Cost
                  </p>
                  <p className="text-3xl font-bold text-cyan-400">
                    ${(systemCost / 1000).toFixed(0)}k
                  </p>
                  <div className="space-y-2 mt-4 pt-4 border-t border-cyan-400/20 text-xs">
                    <div className="flex justify-between">
                      <span>Installation Cost:</span>
                      <span>${(systemCost / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Federal Tax Credit (30%):</span>
                      <span>-${(federalTax / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-cyan-400/20 font-bold">
                      <span>Net Cost:</span>
                      <span>${(netCost / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                </div>

                {/* Annual Savings */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-400/15 to-amber-500/10 border border-amber-400/30">
                  <p className="text-sm text-zinc-400 mb-2">
                    Estimated Annual Savings
                  </p>
                  <p className="text-4xl font-bold text-amber-400">
                    ${(monthlyAnnualSavings / 1000).toFixed(1)}k
                  </p>
                  <p className="text-xs text-zinc-400 mt-2">
                    ${(monthlyAnnualSavings / 12).toFixed(0)}/month
                  </p>
                </div>

                {/* Payback Period */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-400/15 to-emerald-500/10 border border-emerald-400/30">
                  <p className="text-sm text-zinc-400 mb-2">Payback Period</p>
                  <p className="text-4xl font-bold text-emerald-400">
                    {paybackPeriod.toFixed(1)} years
                  </p>
                  <p className="text-xs text-zinc-400 mt-2">
                    After 25 years: $
                    {(monthlyAnnualSavings * 25 - netCost).toLocaleString(
                      "en-US",
                      { maximumFractionDigits: 0 },
                    )}
                  </p>
                </div>

                {/* CTA */}
                <Button className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold py-6 text-base flex items-center justify-center gap-2">
                  Get Personalized Quote <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="px-4 md:px-8 py-16 border-t border-zinc-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              How Our Calculator Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-zinc-800/30 border border-zinc-700/30">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-bold mb-3">Accurate Estimates</h3>
                <p className="text-sm text-zinc-400">
                  Based on your location, roof area, and current electricity
                  usage to provide realistic projections.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-800/30 border border-zinc-700/30">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-bold mb-3">Tax Credits Included</h3>
                <p className="text-sm text-zinc-400">
                  We factor in the 30% federal tax credit and other incentives
                  available in your area.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-800/30 border border-zinc-700/30">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="font-bold mb-3">Long-term Value</h3>
                <p className="text-sm text-zinc-400">
                  See your total savings over 25 years and understand your
                  return on investment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
