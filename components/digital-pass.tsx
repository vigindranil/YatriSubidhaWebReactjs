import { CheckCircle } from "lucide-react"

interface DigitalPassProps {
  bookingId: string
  passengerName: string
  passportNumber: string
  date: string
  time: string
  type: "Arrival" | "Departure"
  slotColor: "green" | "yellow" | "red"
  reference: string
  qrCode: string
}

export function DigitalPass({
  bookingId,
  passengerName,
  passportNumber,
  date,
  time,
  type,
  slotColor,
  reference,
  qrCode,
}: DigitalPassProps) {
  const colorConfig = {
    green: { bg: "bg-emerald-600", text: "text-emerald-600", lightBg: "bg-emerald-50" },
    yellow: { bg: "bg-amber-600", text: "text-amber-600", lightBg: "bg-amber-50" },
    red: { bg: "bg-red-600", text: "text-red-600", lightBg: "bg-red-50" },
  }

  const config = colorConfig[slotColor]

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`${config.bg} rounded-t-2xl p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold opacity-90">Yatri Subidha</p>
            <h1 className="text-2xl font-bold">Border Clearance Pass</h1>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-90">Ref.</p>
            <p className="text-lg font-bold">{reference}</p>
          </div>
        </div>

        <div className="h-1 bg-white/30 rounded-full"></div>
      </div>

      <div className="bg-white border-l-4 border-r-4 border-slate-300 p-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Passenger Info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-500 mb-1">PASSENGER NAME</p>
              <p className="text-2xl font-bold text-slate-900">{passengerName}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">PASSPORT NUMBER</p>
                <p className="text-lg font-bold text-slate-900 font-mono">{passportNumber}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">TRAVEL TYPE</p>
                <p className={`text-lg font-bold ${config.text} capitalize`}>{type}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">DATE</p>
                <p className="text-lg font-bold text-slate-900">{date}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">TIME SLOT</p>
                <p className={`text-lg font-bold ${config.text}`}>{time}</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center">
            <div className={`${config.lightBg} p-4 rounded-lg mb-4`}>
              <img src={qrCode || "/placeholder.svg"} alt="QR Code" className="w-32 h-32" />
            </div>
            <p className="text-xs text-slate-600 text-center">Scan for verification</p>
          </div>
        </div>

        {/* Slot Color Legend */}
        <div className={`${config.lightBg} rounded-lg p-4 mb-6 border-l-4 ${config.bg}`}>
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full ${config.bg}`}></div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Slot Status:{" "}
                <span className={config.text}>
                  {slotColor === "green"
                    ? "Available / Fast Processing"
                    : slotColor === "yellow"
                      ? "Limited / Standard Processing"
                      : "Peak Hours"}
                </span>
              </p>
              <p className="text-xs text-slate-600 mt-1">
                {slotColor === "green" && "This slot typically has minimal waiting time"}
                {slotColor === "yellow" && "This slot may have moderate waiting time"}
                {slotColor === "red" && "This slot experiences peak-hour congestion"}
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 text-emerald-700 font-semibold">
          <CheckCircle className="w-5 h-5" />
          <span>Booking Confirmed & Valid</span>
        </div>
      </div>

      <div className={`${config.bg} rounded-b-2xl px-6 py-4 text-white`}>
        <p className="text-xs opacity-90 text-center">
          This pass is valid only for the specified date and time. Please arrive 15 minutes early.
        </p>
      </div>

      {/* Tear Line */}
      <div className="flex items-center justify-center my-8">
        <div className="flex-1 border-t-2 border-dashed border-slate-300"></div>
        <p className="px-4 text-xs text-slate-500 font-semibold">TEAR HERE</p>
        <div className="flex-1 border-t-2 border-dashed border-slate-300"></div>
      </div>

      {/* Receipt Section */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-4">Booking Receipt</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-600 text-xs mb-1">BOOKING ID</p>
            <p className="font-mono font-semibold text-slate-900">{bookingId}</p>
          </div>
          <div>
            <p className="text-slate-600 text-xs mb-1">BOOKING DATE</p>
            <p className="font-semibold text-slate-900">11 Dec 2025</p>
          </div>
          <div>
            <p className="text-slate-600 text-xs mb-1">LOCATION</p>
            <p className="font-semibold text-slate-900">ICP Petrapole</p>
          </div>
          <div>
            <p className="text-slate-600 text-xs mb-1">CONTACT</p>
            <p className="font-semibold text-slate-900">+91-XXXXX-XXXXX</p>
          </div>
        </div>
      </div>
    </div>
  )
}
