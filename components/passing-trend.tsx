import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function PassingTrend() {
  const data = [
    { time: "6 AM", arrivals: 45, departures: 32 },
    { time: "9 AM", arrivals: 120, departures: 95 },
    { time: "12 PM", arrivals: 98, departures: 110 },
    { time: "3 PM", arrivals: 65, departures: 78 },
    { time: "6 PM", arrivals: 88, departures: 92 },
    { time: "9 PM", arrivals: 42, departures: 38 },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <h3 className="text-lg font-bold text-white">Passenger Flow Trend</h3>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="arrivals" fill="#10b981" />
            <Bar dataKey="departures" fill="#14b8a6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
