"use client"
import { useState } from "react"
import Link from "next/link"
import { QrScanner } from "@/components/qr-scanner"
import { ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, CreditCard, Printer, Users } from "lucide-react"
import { useRouter } from "next/navigation"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Payment = {
  method: string
  amount: number
  paid_at?: string
  transaction_number?: string
  payment_date?: string
}

type Booking = {
  booking_id?: number // Added to store BookingID for the update API
  booking_number: string
  customer_name: string
  mobile_number?: string
  passport_number?: string
  trip: string
  slot_date_time?: string
  status: string
  payment?: Payment
  checked_by?: string
  checked_at?: string
}

export default function OnlineBookingPage() {
  const [bookingNumber, setBookingNumber] = useState("")
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function fetchBooking(number: string) {
    if (!number) return
    setLoading(true)
    setError(null)
    setBooking(null)
    try {
      const response = await fetch(`${BASE_URL}user/slot/get-departure-booking-details-by-token-number`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "TokenNo": number,
          "AuthInfo": "{}"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();

      if (json.success && json.data && json.data.length > 0) {
        const apiData = json.data[0];

        // Map API response to your existing Booking type
        const mappedBooking: Booking = {
          booking_id: apiData.BookingID, // Capturing ID for the update call
          booking_number: apiData.TokenNo,
          customer_name: apiData.PasengerName,
          mobile_number: apiData.MobileNo,
          passport_number: apiData.PassportNo,
          trip: apiData.SlotName,
          slot_date_time: `${new Date(apiData.JourneyDate).toLocaleDateString()} ${apiData.SlotTime}`,
          status: apiData.AttendanceStatus === "NOT ATTENDED" ? "pending" : "checked",

          payment: {
            method: "Online", 
            amount: 200, 
            transaction_number: "TXN" + apiData?.TokenNo,
            payment_date: new Date(apiData.JourneyDate).toLocaleDateString() || "-"
          },
          checked_at: apiData.AttendenceDate,
          checked_by: apiData.AttendanceStatus === "NOT ATTENDED" ? undefined : "System"
        };

        setBooking(mappedBooking)
      } else {
        throw new Error(json.message || "Booking details not found");
      }

    } catch (err: any) {
      setError(err?.message ?? "Failed to fetch booking")
    } finally {
      setLoading(false)
    }
  }

  async function markChecked() {
    if (!booking || !booking.booking_id) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${BASE_URL}admin/update-booking-attendance`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          "BookingID": booking.booking_id,
          "AuthInfo": "{}"
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      
      const json = await response.json()
      
      if (json.success) {
        // Update local state to show checked status immediately
        setBooking(prev => prev ? ({
            ...prev,
            status: "checked",
            checked_by: "Operator",
            checked_at: new Date().toLocaleDateString()
        }) : null)
      } else {
        throw new Error(json.message || "Failed to update attendance")
      }

    } catch (err: any) {
      setError(err?.message ?? "Failed to update")
    } finally {
      setLoading(false)
    }
  }

  function handleScan(data: string | null) {
    if (!data) return
    try {
      const parsed = JSON.parse(data)
      const bn = parsed.booking_number ?? parsed.reference ?? parsed.id
      if (bn) {
        setBookingNumber(String(bn))
        fetchBooking(String(bn))
        return
      }
    } catch {
      // not JSON
    }
    setBookingNumber(data)
    fetchBooking(data)
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AS</span>
            </div>
            <span className="font-bold text-xl">Counter Operator</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/operator/offline-booking">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                <CreditCard className="w-4 h-4" />
                Offline Booking
              </Button>
            </Link>
            <Button variant="outline" className="border-white/30 text-white bg-transparent gap-2">
              <Users className="w-4 h-4" />
              Queue
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="max-w-5xl mx-auto space-y-6 mt-8">
          {/* Search Card */}
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Online Booking Verification</h2>
                  <p className="text-indigo-100 text-sm">Search or scan to verify customer bookings</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Search Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Booking Number</label>
                <div className="flex gap-3">
                  <input
                    className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                    placeholder="Enter booking number (e.g., BK-2024-001)"
                    value={bookingNumber}
                    onChange={(e) => setBookingNumber(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fetchBooking(bookingNumber)}
                  />
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
                    onClick={() => fetchBooking(bookingNumber)}
                    disabled={!bookingNumber || loading}
                  >
                    {loading ? "Searching..." : "Search"}
                  </button>
                </div>
              </div>

              {/* Status Messages */}
              {loading && (
                <div className="mt-6 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium text-blue-700">Searching / Updating...</span>
                </div>
              )}
              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-red-700">{error}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Details Card */}
          {booking && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header with Status */}
              <div className={`px-8 py-5 flex items-center justify-between ${booking.status === "checked"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                : "bg-gradient-to-r from-amber-500 to-orange-500"
                }`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    {booking.status === "checked" ? (
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{booking.booking_number}</h3>
                    <p className="text-white/90 text-sm font-medium">
                      {booking.status === "checked" ? "✓ Verified & Checked In" : "⏳ Pending Verification"}
                    </p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg font-bold text-sm ${booking.status === "checked"
                  ? "bg-white/20 text-white"
                  : "bg-white/20 text-white"
                  }`}>
                  {booking.status.toUpperCase()}
                </div>
              </div>

              <div className="p-8">
                {/* Customer Information */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Customer Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Full Name</div>
                      <div className="text-base font-semibold text-slate-900">{booking.customer_name}</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Mobile Number</div>
                      <div className="text-base font-semibold text-slate-900">{booking.mobile_number ?? "—"}</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Passport Number</div>
                      <div className="text-base font-semibold text-slate-900">{booking.passport_number ?? "—"}</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Slot Date & Time</div>
                      <div className="text-base font-semibold text-slate-900">{booking.slot_date_time ?? "—"}</div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Payment Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                      <div className="text-xs font-semibold text-emerald-700 mb-1">Payment Method</div>
                      <div className="text-base font-semibold text-emerald-900">{booking.payment?.method ?? "—"}</div>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                      <div className="text-xs font-semibold text-emerald-700 mb-1">Amount Paid</div>
                      <div className="text-base font-semibold text-emerald-900">
                        {booking.payment?.amount ? `₹${booking.payment.amount}` : "—"}
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Transaction Number</div>
                      <div className="text-base font-semibold text-slate-900">{booking?.payment?.transaction_number ?? "—"}</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Payment Date</div>
                      <div className="text-base font-semibold text-slate-900">{booking.payment?.payment_date ?? booking.payment?.paid_at ?? "—"}</div>
                    </div>
                  </div>
                </div>

                {/* Check-in Information */}
                {(booking.checked_by || booking.checked_at) && (
                  <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-2">Check-in Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {booking.checked_by && (
                        <div>
                          <span className="text-emerald-600 font-medium">Verified by:</span>
                          <span className="ml-2 text-emerald-900 font-semibold">{booking.checked_by}</span>
                        </div>
                      )}
                      {booking.checked_at && (
                        <div>
                          <span className="text-emerald-600 font-medium">Time:</span>
                          <span className="ml-2 text-emerald-900 font-semibold">{booking.checked_at}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex justify-end">
                  <button
                    className={`px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center gap-2 ${booking.status === "checked"
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:scale-105 active:scale-95 shadow-emerald-500/30"
                      }`}
                    onClick={markChecked}
                    disabled={loading || booking.status === "checked"}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : booking.status === "checked" ? (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Already Checked In
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verify & Check In
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}