"use client"

import { useRef, useEffect, useState } from "react"
import { AlertCircle, Loader } from "lucide-react"

interface QrScannerProps {
  onScan: (data: string) => void
}

export function QrScanner({ onScan }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMocked, setIsMocked] = useState(true) // Demo mode

  useEffect(() => {
    // In production, initialize real QR scanner
    // For demo, we'll show a mock scanner interface
    setIsLoading(false)
  }, [])

  // Mock scan for demo purposes
  const handleMockScan = () => {
    const mockData = {
      reference: "AS-2025-1847",
      passenger: "John Doe",
      passport: "N12345678",
      date: "15 Dec 2025",
      time: "09:00 AM",
      type: "arrival",
    }
    onScan(JSON.stringify(mockData))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-100 rounded-lg overflow-hidden relative h-96 flex items-center justify-center border-2 border-dashed border-slate-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-64 h-64 border-4 border-emerald-500 rounded-lg mx-auto mb-4 opacity-30"></div>
            <p className="text-slate-600 font-semibold">Position QR Code Here</p>
            <p className="text-slate-500 text-sm mt-1">Hold code steady for 2-3 seconds</p>
          </div>
        </div>
        <video ref={videoRef} className="w-full h-full object-cover hidden" />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Scanner Error</p>
            <p className="text-sm text-red-800 mt-1">{error}</p>
          </div>
        </div>
      )}

      {isMocked && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900 mb-3">Demo Mode: Click below to simulate a QR code scan</p>
          <button
            onClick={handleMockScan}
            className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition font-semibold"
          >
            Simulate Scan
          </button>
        </div>
      )}
    </div>
  )
}
