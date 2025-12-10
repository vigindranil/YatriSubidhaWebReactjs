"use client"

import { use, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { DigitalPass } from "@/components/digital-pass"
import { Download, Share2, Printer, ArrowLeft, Mail, MessageCircle, MessageSquare } from "lucide-react"
import { callApi } from "@/components/apis/commonApi"
import { useRouter, useSearchParams } from "next/navigation"
// Switched to html-to-image to fix the 'lab' color error
import { toPng } from "html-to-image"
import jsPDF from "jspdf"

export default function PassPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = use(params)
  const decodedBookingId = atob(decodeURIComponent(bookingId));
  console.log(decodedBookingId)
  const passRef = useRef<HTMLDivElement>(null)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<any>([])
  const searchParams = useSearchParams()
  const type = (searchParams.get("type") as "Departure" | "Arrival") || "Departure"

  const getBookingDetailsByTokenNo = async () => {
    const response = await callApi("user/slot/get-departure-booking-details-by-token-number", { AuthInfo: "{}", TokenNo: decodeURIComponent(decodedBookingId) })
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

  const handleDownload = async () => {
    if (!passRef.current) return

    try {
      // Using toPng from html-to-image handles modern CSS colors correctly
      const dataUrl = await toPng(passRef.current, { cacheBust: true })

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgProperties = pdf.getImageProperties(dataUrl)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

      // Add image to PDF (x, y, width, height)
      pdf.addImage(dataUrl, "PNG", 0, 10, pdfWidth, pdfHeight)
      pdf.save(`Yatri-Subidha-Pass-${decodedBookingId}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const getShareText = () => {
    // Using \r\n ensures new lines work correctly on most mobile clients
    return `Here is my Yatri Subidha Pass.\r\n\r\nReference: ${bookingDetails[0]?.TokenNo || decodedBookingId}\r\nDate: ${bookingDetails[0]?.JourneyDate}\r\nTime: ${bookingDetails[0]?.SlotTime}`
  }

  const shareViaEmail = () => {
    const subject = "My Yatri Subidha Pass"
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(getShareText())}`
    setShowShareMenu(false)
  }

  const shareViaWhatsApp = () => {
    const text = getShareText()
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
    setShowShareMenu(false)
  }

  const shareViaSMS = () => {
    // ?& ensures compatibility with both iOS and Android
    window.location.href = `sms:?&body=${encodeURIComponent(getShareText())}`
    setShowShareMenu(false)
  }

  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8 print-hide">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Yatri Subidha Pass</h1>
          <p className="text-slate-600">
            Reference: {decodeURIComponent(decodedBookingId).split(",").map((item: string, index: number) => <span key={index} className="font-semibold mx-1 border border-slate-200 px-2 py-1 rounded-full ">{item}</span>)}
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
            bookingId={bookingDetails[0]?.decodedBookingId}
            reference={bookingDetails[0]?.TokenNo}
            date={bookingDetails[0]?.JourneyDate}
            time={bookingDetails[0]?.SlotTime}
            slot={bookingDetails[0]?.SlotName}
            type={type || "Departure"}
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
            <Button
              onClick={() => setShowShareMenu(!showShareMenu)}
              variant="outline"
              className="w-full gap-2 relative"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>

            {showShareMenu && (
              <div className="absolute right-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-1">
                  <button
                    onClick={shareViaEmail}
                    className="flex items-center w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 rounded-lg transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-3" />
                    Share via Email
                  </button>
                  <button
                    onClick={shareViaWhatsApp}
                    className="flex items-center w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-3" />
                    Share via WhatsApp
                  </button>
                  <button
                    onClick={shareViaSMS}
                    className="flex items-center w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 mr-3" />
                    Share via SMS
                  </button>
                </div>
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