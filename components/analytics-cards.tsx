import { Users, Clock, TrendingUp, Zap } from "lucide-react"

interface AnalyticsCardProps {
  analytics: {
    totalPassengers: number
    todayProcessed: number
    avgProcessingTime: string
    occupancyRate: string
    peakHour: string
    arrivalsPercent: number
    departuresPercent: number
  }
}

export function AnalyticsCards({ analytics }: AnalyticsCardProps) {
  const cards = [
    {
      icon: Users,
      label: "Total Passengers",
      value: analytics.totalPassengers.toLocaleString(),
      change: "+12.5%",
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: TrendingUp,
      label: "Processed Today",
      value: analytics.todayProcessed,
      change: "+5.2%",
      color: "from-emerald-600 to-teal-600",
    },
    {
      icon: Clock,
      label: "Avg Processing",
      value: analytics.avgProcessingTime,
      change: "-2.1%",
      color: "from-amber-600 to-orange-600",
    },
    {
      icon: Zap,
      label: "Occupancy Rate",
      value: analytics.occupancyRate,
      change: "-8.3%",
      color: "from-purple-600 to-pink-600",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon
        const isNegative = card.change.startsWith("-")

        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition`}
          >
            <div className="flex items-center justify-between mb-4">
              <Icon className="w-8 h-8 opacity-80" />
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  isNegative ? "bg-red-500/20" : "bg-emerald-500/20"
                }`}
              >
                {card.change}
              </span>
            </div>
            <p className="text-sm opacity-90 mb-1">{card.label}</p>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        )
      })}
    </div>
  )
}
