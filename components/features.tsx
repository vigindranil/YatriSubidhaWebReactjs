import { Zap, Lock, Smartphone, BarChart3 } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Faster Processing",
      description: "Reduce average waiting time from 4 hours to 45 minutes with pre-booked slots.",
    },
    {
      icon: Lock,
      title: "Secure & Reliable",
      description: "Government-grade security with encrypted QR codes and verified passenger data.",
    },
    {
      icon: Smartphone,
      title: "Easy Access",
      description: "Access your pass anytime via email, WhatsApp, or directly from the app.",
    },
    {
      icon: BarChart3,
      title: "Real-time Updates",
      description: "Get live notifications about your slot, queue status, and clearance updates.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Choose Yatri Subidha?</h2>
          <p className="text-xl text-slate-600">A comprehensive solution for seamless border crossing</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-8 border border-slate-200 rounded-xl hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
