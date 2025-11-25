"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

interface HeroProps {
  onGetStarted: () => void
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
            <p className="text-emerald-700 text-sm font-medium">Smart Border Crossing Solution</p>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight text-balance">
            Faster, Smoother Border Clearance
          </h1>

          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Yatri Subidha is an intelligent queuing system for international and domestic passengers at ICP Petrapole,
            ensuring smooth and faster clearance with pre-booked time slots.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <span className="text-slate-700">Book preferred time slots in advance</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <span className="text-slate-700">Receive QR code via email and WhatsApp</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <span className="text-slate-700">Reduce waiting time by up to 80%</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onGetStarted}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-slate-200 text-slate-900 px-8 py-6 text-lg hover:bg-slate-50 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-100 rounded-full opacity-40 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-teal-100 rounded-full opacity-40 blur-3xl"></div>

          <div className="relative z-10 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <p className="text-xs font-semibold text-slate-500 mb-2">BOOKING REFERENCE</p>
                <p className="text-2xl font-bold text-slate-900">AS-2025-1847</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Date</p>
                  <p className="text-lg font-bold text-emerald-600">Dec 15, 2025</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Time Slot</p>
                  <p className="text-lg font-bold text-emerald-600">09:00 AM</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-md">
                <p className="text-xs font-semibold text-slate-500 mb-3">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <p className="font-semibold text-slate-900">Confirmed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
