"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { About } from "@/components/about"
import { AboutICP } from "@/components/about-icp"
import { useState } from "react"
import { Award, CheckCircle, Lightbulb } from "lucide-react"

export default function AboutPage() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <Navigation onLoginClick={() => setShowLogin(true)} />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About YYatri Subidha</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Revolutionizing border crossing experience with modern technology and efficient queuing systems
            </p>
          </div>
        </div>

        {/* Main About Section */}
        <About />

        {/* ICP & LPAI Context Section */}
        <AboutICP />

        {/* Mission & Vision */}
        <section className="bg-gradient-to-b from-white to-slate-50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Mission */}
              <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  To streamline and optimize the border crossing process at ICP Petrapole through innovative digital
                  solutions, reducing congestion and wait times while maintaining the highest standards of security and
                  efficiency for international and domestic passengers.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white rounded-2xl p-8 border border-teal-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  To establish ICP Petrapole as a model for modern border management, setting benchmarks for efficiency,
                  transparency, and passenger satisfaction across all land border checkpoints in India and globally.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 border border-emerald-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Core Values</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Efficiency",
                    description:
                      "Fast processing with minimal wait times through smart slot allocation and QR technology",
                  },
                  {
                    title: "Security",
                    description: "Maintaining highest security standards while enabling smooth passenger flow",
                  },
                  {
                    title: "Accessibility",
                    description:
                      "User-friendly digital platform accessible to all passengers regardless of technical expertise",
                  },
                  {
                    title: "Transparency",
                    description: "Clear communication about processes, timings, and real-time queue information",
                  },
                  {
                    title: "Innovation",
                    description:
                      "Continuous improvement through technology and feedback from passengers and authorities",
                  },
                  {
                    title: "Reliability",
                    description: "24/7 system uptime and consistent performance under all conditions",
                  },
                ].map((value, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <h4 className="font-bold text-slate-900">{value.title}</h4>
                    </div>
                    <p className="text-slate-600 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Impact by Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { number: "5L+", label: "Annual Passengers" },
                { number: "70%", label: "Reduction in Wait Time" },
                { number: "15,000+", label: "Km Land Border" },
                { number: "24/7", label: "System Availability" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 text-center border border-emerald-100"
                >
                  <p className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">{stat.number}</p>
                  <p className="text-slate-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team & Support */}
        <section className="bg-slate-50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Commitment</h3>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                A dedicated team of experts works round the clock to ensure smooth operations and continuous
                improvements to the YYatri Subidha system. We are committed to providing the best experience for every
                traveler at ICP Petrapole.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Technology Team",
                  description: "Manages system development, maintenance, and security to ensure 99.9% uptime",
                },
                {
                  title: "Support Team",
                  description:
                    "Provides 24/7 assistance through multiple channels including phone, email, and WhatsApp",
                },
                {
                  title: "Operations Team",
                  description: "Coordinates with authorities and handles on-ground support at ICP Petrapole",
                },
              ].map((team, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                  <h4 className="text-lg font-bold text-slate-900 mb-3">{team.title}</h4>
                  <p className="text-slate-600">{team.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Experience Seamless Border Crossing?</h3>
            <p className="text-lg text-emerald-100 mb-8">
              Join thousands of passengers who are already benefiting from YYatri Subidha's efficient slot booking
              system.
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-3 px-8 rounded-lg transition inline-block"
            >
              Book Your Slot Now
            </button>
          </div>
        </section>
      </main>

      <Footer />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}
