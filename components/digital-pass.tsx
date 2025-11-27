import { CheckCircle, Users, ArrowLeft } from "lucide-react"

interface Passenger {
  PassengerName: string
  passportNumber: string
}

interface DigitalPassProps {
  bookingId: string
  passengers: Passenger[] // 👈 Now supports multiple passengers
  date: string
  time: string
  type: "Arrival" | "Departure"
  slotColor: "green" | "yellow" | "red"
  reference: string
  qrCode: string
  slot: string
}

export function DigitalPass({
  bookingId,
  passengers,
  date,
  time,
  slot,
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
    <div className="max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden border border-slate-200 bg-white">
      {/* Top Header */}
      <div className={`${config.bg} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Yatri Suvidha</p>
            <h1 className="text-2xl font-bold">Border Clearance Pass</h1>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80">Ref.</p>
            <p className="text-lg font-bold">{reference}</p>
          </div>
        </div>
      </div>

      {/* Booking Summary (Single Use) */}
      <div className="px-6 py-4 border-b bg-slate-50">
        <div className="flex justify-between text-sm text-slate-700">
          <p><strong>Pass Type:</strong> <span className={config.text}>{type}</span></p>
          <p><strong>Slot:</strong> {slot}</p>
          <p><strong>Slot Timing:</strong> {time}</p>
          <p><strong>Date:</strong> {date ? new Date(date)?.toISOString()?.split("T")[0] : ""}</p>
        </div>
      </div>

      {/* QR Code + Info */}
      <div className="p-6 flex flex-col items-center text-center">
        <img src={qrCode} alt="QR Code" className="w-36 h-36 rounded-lg mb-3" />
        <p className="text-xs text-slate-500">Scan at ICP Petrapole for verification</p>
      </div>

      {/* Passenger List */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
          <Users className="w-5 h-5" /> Passenger Details ({passengers?.length})
        </h2>

        <div className="space-y-3">
          {passengers?.map((p, index) => (
            <div
              key={index}
              className="p-4 bg-slate-50 rounded-lg border border-slate-200"
            >
              <p className="text-sm font-semibold text-slate-800">
                Passenger {index + 1}: {p?.PasengerName}
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-slate-600">
                <p>
                  <span className="font-semibold">Nationality:</span> {p?.Nationality}
                </p>
                <p>
                  <span className="font-semibold">Mobile:</span> {p?.MobileNo}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {p?.EmailID}
                </p>
                <p>
                  <span className="font-semibold">Passport:</span> {p?.PassportNo}
                </p>
                <p>
                  <span className="font-semibold">Passport Valid Upto:</span>{" "}
                  {new Date(p?.PassportValidUpto).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Journey Date:</span>{" "}
                  {new Date(p?.JourneyDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Slot Name:</span> {p?.SlotName}
                </p>
                <p>
                  <span className="font-semibold">Slot Time:</span> {p?.SlotTime}
                </p>
                <p>
                  <span className="font-semibold">Attendance Status:</span> {p?.AttendanceStatus}
                </p>
                <p>
                  <span className="font-semibold">Attendance Date:</span>{" "}
                  {p?.AttendenceDate ? new Date(p.AttendenceDate).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Slot Info */}
      <div className={`${config.lightBg} p-4 border-t`}>
        <p className={`text-sm font-semibold ${config.text}`}>
          Slot Status:{" "}
          {slotColor === "green"
            ? "Fast Processing"
            : slotColor === "yellow"
              ? "Standard Processing"
              : "Peak Hours / High Waiting"}
        </p>
        <p className="text-xs text-slate-600 mt-1">
          {slotColor === "green" && "Minimal wait time expected."}
          {slotColor === "yellow" && "Moderate wait time expected."}
          {slotColor === "red" && "High congestion, expect delays."}
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 flex items-center text-emerald-700 bg-emerald-50 border-t">
        <CheckCircle className="w-5 h-5" />
        <p className="ml-2 text-sm font-semibold">Booking Confirmed & Valid</p>
      </div>

      {/* Terms Footer */}
      <div className={`${config.bg} text-white text-xs text-center py-3`}>
        Pass valid only for specified date and time. Arrive 15 minutes early with travel documents.
      </div>
    </div>
  )
}
