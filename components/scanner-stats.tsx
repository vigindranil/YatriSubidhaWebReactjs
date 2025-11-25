import { BarChart3, Users, Clock, TrendingUp } from "lucide-react"

interface ScannerStatsProps {
  stats: {
    totalScanned: number
    todayScanned: number
    averageWaitTime: string
    currentQueue: number
  }
}

export function ScannerStats({ stats }: ScannerStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white">Live Statistics</h3>
      </div>

      <div className="p-6 space-y-4">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-slate-600">Total Scanned</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.totalScanned}</p>
          </div>
          <p className="text-xs text-slate-500">This month</p>
        </div>

        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm text-slate-600">Today Scanned</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.todayScanned}</p>
          </div>
          <p className="text-xs text-slate-500">Updated in real-time</p>
        </div>

        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm text-slate-600">Avg Wait Time</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.averageWaitTime}</p>
          </div>
          <p className="text-xs text-slate-500">Processing time</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm text-slate-600">Current Queue</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.currentQueue}</p>
          </div>
          <p className="text-xs text-slate-500">Passengers waiting</p>
        </div>
      </div>
    </div>
  )
}
