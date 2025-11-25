"use client"

import { useState } from "react"
import { QrScanner } from "@/components/qr-scanner"
import { ScannedPassInfo } from "@/components/scanned-pass-info"
import { ScannerStats } from "@/components/scanner-stats"
import { AlertCircle, CheckCircle } from "lucide-react"

interface ScannedData {
  reference: string
  passenger: string
  passport: string
  date: string
  time: string
  type: string
}

export default function ScannerPage() {
  const [scannedData, setScannedData] = useState<ScannedData | null>(null)
  const [scanResult, setScanResult] = useState<"valid" | "invalid" | null>(null)
  const [stats, setStats] = useState({
    totalScanned: 1247,
    todayScanned: 342,
    averageWaitTime: "12 mins",
    currentQueue: 23,
  })

  const handleScan = (data: string) => {
    try {
      const parsed = JSON.parse(data)
      setScannedData(parsed)

      // Validate the pass (simple validation for demo)
      const isValid = parsed.reference && parsed.passenger && parsed.passport
      setScanResult(isValid ? "valid" : "invalid")

      // Update stats
      setStats((prev) => ({
        ...prev,
        totalScanned: prev.totalScanned + 1,
        todayScanned: prev.todayScanned + 1,
      }))
    } catch (error) {
      setScanResult("invalid")
      setScannedData(null)
    }
  }

  const handleClearScan = () => {
    setScannedData(null)
    setScanResult(null)
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">QR Pass Scanner</h1>
          <p className="text-slate-300">ICP Petrapole Immigration Counter</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scanner Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Scanner Interface</h2>
              </div>

              <div className="p-6">
                <QrScanner onScan={handleScan} />
              </div>
            </div>

            {/* Scan Result */}
            {scanResult && scannedData && (
              <div
                className={`rounded-lg p-6 border-l-4 ${
                  scanResult === "valid" ? "bg-emerald-50 border-emerald-600" : "bg-red-50 border-red-600"
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  {scanResult === "valid" ? (
                    <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <h3 className={`font-bold text-lg ${scanResult === "valid" ? "text-emerald-900" : "text-red-900"}`}>
                      {scanResult === "valid" ? "Pass Verified Successfully" : "Invalid or Expired Pass"}
                    </h3>
                    <p className={`text-sm mt-1 ${scanResult === "valid" ? "text-emerald-800" : "text-red-800"}`}>
                      {scanResult === "valid"
                        ? "Passenger is cleared to proceed. Allow entry."
                        : "Please contact supervisor for assistance."}
                    </p>
                  </div>
                </div>

                <ScannedPassInfo data={scannedData} />

                <button
                  onClick={handleClearScan}
                  className="mt-4 w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-semibold"
                >
                  Next Passenger
                </button>
              </div>
            )}
          </div>

          {/* Stats & Info Sidebar */}
          <div className="space-y-6">
            <ScannerStats stats={stats} />

            {/* Quick Instructions */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-l-4 border-blue-600">
                <h3 className="font-bold text-slate-900">Instructions</h3>
              </div>

              <div className="p-6 space-y-3 text-sm text-slate-600">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    1
                  </div>
                  <p>Position QR code in scanner frame</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    2
                  </div>
                  <p>Wait for automatic scanning to complete</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    3
                  </div>
                  <p>Review passenger information</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    4
                  </div>
                  <p>Allow or deny entry accordingly</p>
                </div>
              </div>
            </div>

            {/* Color Code Legend */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-l-4 border-blue-600">
                <h3 className="font-bold text-slate-900">Slot Codes</h3>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500"></div>
                  <span className="text-sm text-slate-700">
                    <strong>Green:</strong> Fast processing
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-slate-700">
                    <strong>Yellow:</strong> Standard processing
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500"></div>
                  <span className="text-sm text-slate-700">
                    <strong>Red:</strong> Peak hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
