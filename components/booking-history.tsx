import { Button } from "@/components/ui/button"
import { Download, QrCode, Calendar, Clock, CheckCircle, AlertCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface Booking {
  id: string
  date: string
  time: string
  type: "arrival" | "departure"
  status: "confirmed" | "completed" | "cancelled"
  reference: string
}

export function BookingHistory() {
  const bookings: Booking[] = [
    {
      id: "1",
      date: "Dec 15, 2025",
      time: "09:00 AM",
      type: "arrival",
      status: "confirmed",
      reference: "AS-2025-1847",
    },
    {
      id: "2",
      date: "Dec 10, 2025",
      time: "02:00 PM",
      type: "departure",
      status: "completed",
      reference: "AS-2025-1823",
    },
    {
      id: "3",
      date: "Dec 05, 2025",
      time: "11:00 AM",
      type: "arrival",
      status: "cancelled",
      reference: "AS-2025-1801",
    },
  ]

  const statusConfig = {
    confirmed: { 
      icon: CheckCircle, 
      bg: "bg-gradient-to-r from-emerald-50 to-green-50", 
      border: "border-emerald-200",
      text: "text-emerald-700", 
      iconBg: "bg-emerald-100",
      label: "Confirmed" 
    },
    completed: { 
      icon: CheckCircle, 
      bg: "bg-gradient-to-r from-blue-50 to-cyan-50", 
      border: "border-blue-200",
      text: "text-blue-700", 
      iconBg: "bg-blue-100",
      label: "Completed" 
    },
    cancelled: { 
      icon: AlertCircle, 
      bg: "bg-gradient-to-r from-red-50 to-rose-50", 
      border: "border-red-200",
      text: "text-red-700", 
      iconBg: "bg-red-100",
      label: "Cancelled" 
    },
  }

  const typeConfig = {
    arrival: {
      icon: ArrowDownLeft,
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "Arrival"
    },
    departure: {
      icon: ArrowUpRight,
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      label: "Departure"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Booking History</h2>
          <p className="text-slate-600 text-sm mt-1">View and manage your past bookings</p>
        </div>
        <div className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-lg font-medium">
          {bookings.length} Total Bookings
        </div>
      </div>

      {bookings.map((booking) => {
        const config = statusConfig[booking.status]
        const typeConf = typeConfig[booking.type]
        const StatusIcon = config.icon
        const TypeIcon = typeConf.icon

        return (
          <div
            key={booking.id}
            className="group bg-white rounded-2xl p-6 shadow-md border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 relative overflow-hidden"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-slate-50 to-transparent rounded-full -mr-32 -mt-32 opacity-50"></div>
            
            <div className="relative z-10">
              {/* Header Section */}
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={`${typeConf.bg} p-3 rounded-xl`}>
                    <TypeIcon className={`w-6 h-6 ${typeConf.text}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Reference Number</p>
                    <p className="text-xl font-bold text-slate-900 tracking-tight">{booking.reference}</p>
                  </div>
                </div>

                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${config.border} ${config.bg} shadow-sm`}>
                  <div className={`${config.iconBg} p-1 rounded-full`}>
                    <StatusIcon className={`w-4 h-4 ${config.text}`} />
                  </div>
                  <span className={`text-sm font-bold ${config.text}`}>{config.label}</span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Date</p>
                  </div>
                  <p className="text-lg font-bold text-slate-900">{booking.date}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Time</p>
                  </div>
                  <p className="text-lg font-bold text-slate-900">{booking.time}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 rounded-full ${typeConf.bg}`}></div>
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Journey Type</p>
                  </div>
                  <p className="text-lg font-bold text-slate-900 capitalize">{typeConf.label}</p>
                </div>
              </div>

              {/* Action Buttons */}
              {booking.status === "confirmed" && (
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <Button
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 gap-2 font-semibold"
                  >
                    <QrCode className="w-5 h-5" />
                    View QR Code
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 gap-2 font-semibold"
                  >
                    <Download className="w-5 h-5" />
                    Download Pass
                  </Button>
                </div>
              )}

              {booking.status === "completed" && (
                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 gap-2 font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </Button>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}