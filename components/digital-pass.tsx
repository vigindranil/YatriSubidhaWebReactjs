import { CheckCircle, Users, ArrowLeft } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react";

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

  const slotTailwindColors: Record<string, { bg: string; text: string }> = {
    "SLOT-1": { bg: "bg-pink-400", text: "text-white" },      // #FF6EC7
    "SLOT-2": { bg: "bg-purple-400", text: "text-white" },    // #AA77FF
    "SLOT-3": { bg: "bg-blue-500", text: "text-white" },      // #068FFF
    "SLOT-4": { bg: "bg-red-500", text: "text-white" },       // #FF2965
    "SLOT-5": { bg: "bg-green-700", text: "text-white" },     // #2B7A0B
    "SLOT-6": { bg: "bg-teal-300", text: "text-white" },      // #2BE5A6
    "SLOT-7": { bg: "bg-pink-600", text: "text-gray-800" },      // #C84186
    "SLOT-8": { bg: "bg-purple-600", text: "text-gray-200" },    // #6F38C5
    "SLOT-9": { bg: "bg-yellow-400", text: "text-gray-800" },    // #FFD700
    "SLOT-10": { bg: "bg-sky-300", text: "text-gray-800" },      // #97DEFF
    "SLOT-11": { bg: "bg-orange-400", text: "text-gray-800" },   // #FF7256
    "SLOT-12": { bg: "bg-fuchsia-500", text: "text-gray-800" },  // #FF00FF
    "SLOT-13": { bg: "bg-indigo-600", text: "text-gray-800" },   // #6528F7
    "SLOT-14": { bg: "bg-red-500", text: "text-gray-800" },      // #FF2965
    "SLOT-15": { bg: "bg-lime-600", text: "text-gray-800" },     // #7A9D54
    "SLOT-16": { bg: "bg-teal-300", text: "text-gray-800" },     // #2BE5A6
    "SLOT-17": { bg: "bg-pink-600", text: "text-gray-800" },     // #C84186
    "SLOT-18": { bg: "bg-purple-600", text: "text-gray-200" },   // #6F38C5
    "SLOT-19": { bg: "bg-pink-400", text: "text-gray-800" },     // #FF1DCE
    "SLOT-20": { bg: "bg-yellow-400", text: "text-gray-800" },   // #FFD700
    "SLOT-21": { bg: "bg-orange-400", text: "text-gray-800" },   // #FF7256
    "SLOT-22": { bg: "bg-fuchsia-500", text: "text-gray-800" },  // #FF00FF
    "SLOT-23": { bg: "bg-pink-400", text: "text-gray-800" },     // #FF6EC7
    "SLOT-24": { bg: "bg-sky-200", text: "text-gray-800" },      // #7DF9FF
  }

  const colorConfig = {
    green: { bg: "bg-emerald-600", text: "text-emerald-600", lightBg: "bg-emerald-50" },
    yellow: { bg: "bg-amber-600", text: "text-amber-600", lightBg: "bg-amber-50" },
    red: { bg: "bg-red-600", text: "text-red-600", lightBg: "bg-red-50" },
  }

  const config = colorConfig[slotColor]

  return (
    <div className="max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden border border-slate-200 bg-white">
      {/* Top Header */}
      <div className={`${slotTailwindColors[slot]?.bg} p-6 ${slotTailwindColors[slot]?.text}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Yatri Suvidha</p>
            <h1 className="text-2xl font-bold">Border Clearance Pass</h1>
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

      <div className="p-6 flex flex-col items-center text-center">
        {/* QR Code generated using TokenNo */}
        {/* <QRCodeCanvas className="w-36 h-36 rounded-lg mb-3 border-2 " value={reference} size={100} level="H" includeMargin={true} /> */}
        {/* <img src={qrCode} alt="QR Code" className="w-36 h-36 rounded-lg mb-3" /> */}
        <p className="text-xs text-slate-500">Scan QRs at ICP Petrapole for verification</p>
      </div>

      {/* Passenger List */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
          <Users className="w-5 h-5" /> Passenger Details ({passengers?.length})
        </h2>

        <div className="space-y-3">
          {passengers?.map((p: any, index) => (
            <div
              key={index}
              className="p-4 bg-slate-50 rounded-lg border border-slate-200"
            >
              <QRCodeCanvas className="w-36 h-36 rounded-lg mb-3 border-2 " value={p?.TokenNo} size={100} level="H" includeMargin={true} />
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
                  <span className="font-semibold">Ticket No:</span>{" "}
                  {p?.TokenNo}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Slot Info */}
      <div className={`${slotTailwindColors[slot]?.lightBg} p-4 border-t`}>
        <p className={`text-sm font-semibold ${slotTailwindColors[slot]?.text}`}>
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
      <div className={`${slotTailwindColors[slot]?.bg} text-white text-xs text-center py-3`}>
        Pass valid only for specified date and time. Arrive 15 minutes early with travel documents.
      </div>
    </div>
  )
}
