import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

export function SlotUtilization() {
  const data = [
    { name: "Available", value: 28, fill: "#10b981" },
    { name: "Booked", value: 62, fill: "#fbbf24" },
    { name: "In Progress", value: 8, fill: "#f87171" },
    { name: "Completed", value: 2, fill: "#6366f1" },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <h3 className="text-lg font-bold text-white">Slot Utilization</h3>
      </div>

      <div className="p-6 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="px-6 pb-6 grid grid-cols-2 gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.fill }}></div>
            <span className="text-sm text-slate-600">
              {item.name}: <strong>{item.value}%</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
