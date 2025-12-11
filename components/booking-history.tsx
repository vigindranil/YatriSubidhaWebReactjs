import { Button } from "@/components/ui/button"
import { Download, QrCode, Calendar, Clock, CheckCircle, AlertCircle, ArrowUpRight, ArrowDownLeft, ArrowRight, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { callApi } from "./apis/commonApi"
import Cookies from "react-cookies"
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"

interface Booking {
  id: string
  date: string
  time: string
  BookingTypeName: string
  status: string
  reference: string
}

export function BookingHistory() {

  const [bookings, setBookings] = useState<any>([]);
  const [startDate, setStartDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const getHistory = async () => {
    const userID = localStorage.getItem("userID")
    const response = await callApi("user/slot/get-slot-booking-details", { authInfo: "{}", StartDate: startDate, EndDate: endDate, UserID: userID })
    if (response.success) {
      setBookings(response?.data)
    } else {
      setBookings([])
    }
  }

  useEffect(() => {
    getHistory();
  }, [])

  const statusConfig = {
    "ATTENDED": {
      icon: CheckCircle,
      bg: "bg-gradient-to-r from-emerald-50 to-green-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      iconBg: "bg-emerald-100",
      label: "Attended"
    },
    "NOT ATTENDED": {
      icon: Clock,
      bg: "bg-gradient-to-r from-yellow-50 to-amber-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      iconBg: "bg-yellow-100",
      label: "Not Attended"
    },
  }

  const typeConfig = {
    "Arrival": {
      icon: ArrowDownLeft,
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "Arrival"
    },
    "Departure": {
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

        {/* Date Selection Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div>
              <Label>From Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-64"
                placeholder="From"
              />
            </div>

            <div>
              <Label>To Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-64"
                placeholder="To"
              />
            </div>
            <Button
              onClick={getHistory}
              className="bg-slate-700 cursor-pointer hover:bg-slate-800 text-white gap-2"
            >
              Search
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-lg font-medium">
          {bookings?.length} Total Bookings
        </div>
      </div>

      {bookings?.map((booking) => {
        const config = statusConfig[booking?.AttendanceStatus]
        const typeConf = typeConfig[booking?.BookingTypeName]
        const StatusIcon = config?.icon
        const TypeIcon = typeConf?.icon

        return (
          <div
            key={booking?.BookingID}
            className="group bg-white rounded-2xl p-6 shadow-md border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 relative overflow-hidden"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-slate-50 to-transparent rounded-full -mr-32 -mt-32 opacity-50"></div>

            <div className="relative z-10">
              {/* Header Section */}
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={`${typeConf?.bg} p-3 rounded-xl`}>
                    <TypeIcon className={`w-6 h-6 ${typeConf?.text}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Reference Number</p>
                    <p className="text-xl font-bold text-slate-900 tracking-tight">{booking?.TokenNo}</p>
                  </div>
                </div>

                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${config?.border} ${config?.bg} shadow-sm`}>
                  <div className={`${config?.iconBg} p-1 rounded-full`}>
                    <StatusIcon className={`w-4 h-4 ${config?.text}`} />
                  </div>
                  <span className={`text-sm font-bold ${config?.text}`}>{config?.label}</span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Date</p>
                  </div>
                  <p className="text-lg font-bold text-slate-900">{booking?.JourneyDate?.split("T")[0]}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Time</p>
                  </div>
                  <p className="text-lg font-bold text-slate-900">{booking?.SlotTime}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 rounded-full ${typeConf?.bg}`}></div>
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Journey Type</p>
                  </div>
                  <p className="text-lg font-bold text-slate-900 capitalize">{typeConf?.label}</p>
                </div>
              </div>

              {/* Action Buttons */}
              {booking?.status === "confirmed" && (
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

              {booking?.status === "completed" && (
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