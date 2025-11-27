"use client"

import { use, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { DigitalPass } from "@/components/digital-pass"
import { Download, Share2, Printer, ArrowLeft } from "lucide-react"
import { callApi } from "@/components/apis/commonApi"
import { useRouter } from "next/navigation"

export default function PassPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = use(params)
  const passRef = useRef(null)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<any>([])

  const getBookingDetailsByTokenNo = async () => {
    const response = await callApi("user/slot/get-departure-booking-details-by-token-number", { AuthInfo: "{}", TokenNo: bookingId })
    if (response.success) {
      console.log(response)
      setBookingDetails(response.data)
    }
  }

  useEffect(() => {
    getBookingDetailsByTokenNo()
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    window.print()
  }

  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8 print-hide">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Yatri Subidha Pass</h1>
          <p className="text-slate-600">
            Reference: <span className="font-semibold">{bookingId}</span>
          </p>
        </div>
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Pass Display */}
        <div className="mb-8 print-area" ref={passRef}>
          <DigitalPass
            bookingId={bookingDetails[0]?.BookingID}
            reference={bookingDetails[0]?.TokenNo}
            date={bookingDetails[0]?.JourneyDate}
            time={bookingDetails[0]?.SlotTime}
            slot={bookingDetails[0]?.SlotName}
            type="Arrival"
            slotColor="green"
            qrCode="/qr-code.png"
            passengers={bookingDetails || []}
          />

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 print-hide">
          <Button onClick={handlePrint} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            <Printer className="w-4 h-4" />
            Print Pass
          </Button>

          <Button onClick={handleDownload} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>

          <div className="relative">
            <Button onClick={() => setShowShareMenu(!showShareMenu)} variant="outline" className="w-full gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>

            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                <button className="w-full text-left px-4 py-2 hover:bg-slate-50 border-b border-slate-200">
                  Email
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-slate-50 border-b border-slate-200">
                  WhatsApp
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-slate-50">SMS</button>
              </div>
            )}
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 print-hide">
          <h3 className="font-bold text-blue-900 mb-2">Important Information</h3>
          <ul className="text-sm text-blue-900 space-y-1">
            <li>• Present this pass at the ICP Petrapole terminal entrance</li>
            <li>• Arrive 15 minutes before your scheduled time slot</li>
            <li>• Keep your passport and travel documents ready</li>
            <li>• The QR code will be scanned at the immigration counter</li>
            <li>• Your pass is valid only for the specified date and time</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
