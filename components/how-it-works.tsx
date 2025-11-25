import { User, Calendar, FileText, Send } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: User,
      title: "Register",
      description: "Create your account with passport details",
    },
    {
      icon: Calendar,
      title: "Select Slot",
      description: "Choose your preferred date and time",
    },
    {
      icon: FileText,
      title: "Get Pass",
      description: "Receive QR-coded digital pass",
    },
    {
      icon: Send,
      title: "Share & Print",
      description: "Access via email, WhatsApp, or print",
    },
  ]

  return (
    <section id="how" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Simple 4-Step Process</h2>
          <p className="text-xl text-slate-600">From registration to border crossing in just a few minutes</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4 text-white shadow-lg">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">{step.title}</h3>
                  <p className="text-slate-600 text-center text-sm">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-emerald-300 to-emerald-100"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
