"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Download, Share2, Printer } from "lucide-react"
import QRCode from "qrcode"

interface PassModalProps {
  isOpen: boolean
  onClose: () => void
  bookingData: {
    reference: string
    passengerName: string
    passportNumber: string
    date: string
    time: string
    type: "arrival" | "departure"
    slotColor: "green" | "yellow" | "red"
  }
}

export function PassModal({ isOpen, onClose, bookingData }: PassModalProps) {
  const [qrCode, setQrCode] = useState<string>("")

  React.useEffect(() => {
    if (isOpen && bookingData) {
      const qrData = JSON.stringify({
        reference: bookingData.reference,
        passenger: bookingData.passengerName,
        passport: bookingData.passportNumber,
        date: bookingData.date,
        time: bookingData.time,
        type: bookingData.type,
      })

      QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: "#000",
          light: "#FFF",
        },
      }).then((url) => setQrCode(url))
    }
  }, [isOpen, bookingData])

  if (!isOpen) return null

  const colorConfig = {
    green: { bg: "bg-emerald-600" },
    yellow: { bg: "bg-amber-600" },
    red: { bg: "bg-red-600" },
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div
          className={`${colorConfig[bookingData.slotColor].bg} p-6 text-white flex items-center justify-between sticky top-0`}
        >
          <div>
            <p className="text-sm font-semibold opacity-90">Yatri Subidha PASS</p>
            <h2 className="text-2xl font-bold">Border Clearance</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 mb-1">PASSENGER</p>
                <p className="text-xl font-bold text-slate-900">{bookingData.passengerName}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">PASSPORT</p>
                  <p className="font-mono font-semibold text-slate-900">{bookingData.passportNumber}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1">DATE</p>
                    <p className="font-semibold text-slate-900">{bookingData.date}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1">TIME</p>
                    <p className="font-semibold text-slate-900">{bookingData.time}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              {qrCode && (
                <img
                  src={qrCode || "/placeholder.svg"}
                  alt="QR Code"
                  className="w-48 h-48 border-4 border-slate-200 rounded-lg"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
              <Printer className="w-4 h-4" />
              Print Pass
            </Button>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
              <Download className="w-4 h-4" />
              Download Pass
            </Button>
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              Share via Email/WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
