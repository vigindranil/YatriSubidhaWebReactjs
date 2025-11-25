import { Clock, CheckCircle, AlertCircle } from "lucide-react"

export function PassengerQueue() {
  const queue = [
    { id: 1, name: "John Doe", time: "09:00 AM", status: "in-progress", slotType: "Arrival" },
    { id: 2, name: "Jane Smith", time: "09:15 AM", status: "waiting", slotType: "Departure" },
    { id: 3, name: "Mike Johnson", time: "09:30 AM", status: "completed", slotType: "Arrival" },
    { id: 4, name: "Sarah Williams", time: "09:45 AM", status: "waiting", slotType: "Arrival" },
    { id: 5, name: "Robert Brown", time: "10:00 AM", status: "waiting", slotType: "Departure" },
    { id: 6, name: "Emily Davis", time: "10:15 AM", status: "waiting", slotType: "Arrival" },
  ]

  const statusConfig = {
    completed: { icon: CheckCircle, bg: "bg-emerald-50", text: "text-emerald-700", label: "Completed" },
    "in-progress": { icon: Clock, bg: "bg-blue-50", text: "text-blue-700", label: "Processing" },
    waiting: { icon: AlertCircle, bg: "bg-amber-50", text: "text-amber-700", label: "Waiting" },
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <h3 className="text-lg font-bold text-white">Current Queue</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">PASSENGER</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">TIME SLOT</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">TYPE</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((item, index) => {
              const config = statusConfig[item.status as keyof typeof statusConfig]
              const StatusIcon = config.icon

              return (
                <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.time}</td>
                  <td className="px-6 py-4 text-slate-600">{item.slotType}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
                      <StatusIcon className={`w-4 h-4 ${config.text}`} />
                      <span className={`text-sm font-semibold ${config.text}`}>{config.label}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
