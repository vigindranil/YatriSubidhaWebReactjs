"use client"
import { ArrowRight, Users, Plane, Clock } from "lucide-react"

export function About() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-teal-50 border border-teal-200 rounded-full mb-6">
            <p className="text-teal-700 text-sm font-medium">About the Portal</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">About YYatri Subidha</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A modern queuing system designed to streamline border crossing at ICP Petrapole for international and
            domestic passengers
          </p>
        </div>

        {/* Main Description */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 border border-emerald-100 mb-12">
          <p className="text-lg text-slate-700 leading-relaxed">
            YYatri Subidha portal helps international passengers (both arrival and departure) apply for available time
            slots for smooth and faster clearance at the Passenger Terminal, ICP Petrapole (West Bengal). Passengers can
            select their preferable date and available slot from the portal. The system automatically generates a
            digital pass and sends a link with QR code to the registered mobile number, WhatsApp, and email. Passengers
            can download or print the pass directly from the portal, and also access it via the link sent to their
            registered contact information.
          </p>
        </div>

        {/* Service Types */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Arrival Section */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Arrival</h3>
                <p className="text-sm text-slate-600">For incoming passengers</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Arrival passengers can book their preferred time slots using this portal and receive their digital pass
              with QR code. This allows for streamlined entry processing and reduces waiting time at the immigration
              counter.
            </p>
            <div className="flex items-center gap-2 text-blue-600 mt-4 font-medium">
              Book Arrival Slot <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Departure Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-emerald-600 p-3 rounded-lg">
                <Plane className="w-6 h-6 text-white transform -rotate-180" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Departure</h3>
                <p className="text-sm text-slate-600">For outgoing passengers</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Departure passengers can book their preferred time slots using this portal and receive their digital pass
              with QR code. Enjoy faster customs clearance and a smoother exit process through ICP Petrapole.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 mt-4 font-medium">
              Book Departure Slot <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Save Time</h4>
            <p className="text-slate-600">
              Reduce waiting times and congestion at the border, resulting in faster processing
            </p>
          </div>

          <div className="text-center">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-teal-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Predictable Experience</h4>
            <p className="text-slate-600">
              Understand expected wait times and processing timelines for better travel planning
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Efficient Operations</h4>
            <p className="text-slate-600">
              QR code verification helps authorities process passengers quickly and accurately
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
