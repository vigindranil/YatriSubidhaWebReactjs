"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { useState } from "react"
import { Zap, Shield, Clock, Users, FileText, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  const [showLogin, setShowLogin] = useState(false)

  const services = [
    {
      icon: Clock,
      title: "Fast Slot Booking",
      description:
        "Book your preferred time slot in seconds. Check real-time availability and select dates up to 30 days in advance.",
      features: ["Instant confirmation", "Real-time updates", "Easy rescheduling", "30-day advance booking"],
    },
    {
      icon: Shield,
      title: "Secure QR Pass System",
      description: "Get your unique QR-coded digital pass with encrypted information for safe and quick verification.",
      features: ["Encrypted data", "Unique QR code", "Digital & printable", "Share via email/SMS/WhatsApp"],
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Skip long queues with our streamlined QR scanning process. Get verified in seconds at the border.",
      features: ["QR scanning", "Instant verification", "Reduced wait times", "Priority lane access"],
    },
    {
      icon: Users,
      title: "Multi-Passenger Support",
      description: "Manage bookings for yourself and your family members all in one account.",
      features: ["Family bookings", "Shared passes", "Group management", "Bulk downloads"],
    },
    {
      icon: FileText,
      title: "Complete Documentation",
      description: "Download and print your pass anytime. Keep digital copies on your phone for convenience.",
      features: ["PDF download", "Mobile-friendly", "Print ready", "QR code included"],
    },
    {
      icon: TrendingUp,
      title: "Analytics & Tracking",
      description: "Track your booking status and get real-time updates on queue status and wait times.",
      features: ["Live tracking", "Queue updates", "Status notifications", "Performance metrics"],
    },
  ]

  return (
    <>
      <Navigation onLoginClick={() => setShowLogin(true)} />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive solutions for smooth and efficient border crossing at ICP Petrapole
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Additional Services */}
          <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Premium Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Priority Booking</h3>
                <p className="text-slate-600 mb-3">
                  Get priority access to premium time slots during peak hours. Reduces your wait time significantly.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Learn More</Button>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">24/7 Customer Support</h3>
                <p className="text-slate-600 mb-3">
                  Get instant assistance via phone, email, WhatsApp, and live chat at any time.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Contact Support</Button>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Family Group Booking</h3>
                <p className="text-slate-600 mb-3">
                  Book slots for your entire family with synchronized timings and group coordination.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Book Group Slot</Button>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Corporate Packages</h3>
                <p className="text-slate-600 mb-3">
                  Special rates for organizations with bulk bookings and administrative support.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Corporate Inquiry</Button>
              </div>
            </div>
          </section>

          {/* Benefits Summary */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Why Choose Yatri Subidha?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Faster Processing", value: "70% reduction in wait time" },
                { label: "Easy Booking", value: "3 clicks to book your slot" },
                { label: "Secure System", value: "Encrypted QR technology" },
                { label: "Mobile Support", value: "100% mobile-friendly platform" },
              ].map((benefit, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                  <p className="text-emerald-600 font-bold text-xl mb-1">{benefit.value}</p>
                  <p className="text-slate-600 text-sm">{benefit.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}
