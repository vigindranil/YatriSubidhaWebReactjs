// ...existing code...
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CreditCard, ClipboardList, Users, ArrowUpRight, ArrowDownLeft, LogOut, UserCircle, FileText } from "lucide-react"
import { useState } from "react"
import { AdminNav } from "@/components/admin-nav"

export default function OperatorDashboardPage() {
  const [journeyType, setJourneyType] = useState<"arrival" | "departure">("departure")

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full -mr-32 -mt-32 opacity-30"></div>
          
          <div className="relative z-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <ClipboardList className="w-7 h-7 text-emerald-600" />
                Select Journey Type
              </h2>
              <p className="text-slate-600">Choose whether the passenger is arriving or departing</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                
              <div
                onClick={() => setJourneyType("departure")}
                className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 ${
                  journeyType === "departure"
                    ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg shadow-emerald-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    journeyType === "departure" 
                      ? "border-emerald-600 bg-emerald-600" 
                      : "border-slate-300 bg-white"
                  }`}>
                    {journeyType === "departure" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-2 rounded-lg ${
                        journeyType === "departure" ? "bg-emerald-100" : "bg-slate-100"
                      }`}>
                        <ArrowUpRight className={`w-6 h-6 ${
                          journeyType === "departure" ? "text-emerald-700" : "text-slate-600"
                        }`} />
                      </div>
                      <h3 className={`text-lg font-bold ${
                        journeyType === "departure" ? "text-emerald-900" : "text-slate-900"
                      }`}>
                        Departure
                      </h3>
                    </div>
                    <p className={`text-sm ${
                      journeyType === "departure" ? "text-emerald-700" : "text-slate-600"
                    }`}>
                      Passenger is leaving the facility
                    </p>
                  </div>
                </div>
                {journeyType === "departure" && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Selected
                    </div>
                  </div>
                )}
              </div>

              
              <div
                onClick={() => setJourneyType("arrival")}
                className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 ${
                  journeyType === "arrival"
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg shadow-blue-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    journeyType === "arrival" 
                      ? "border-blue-600 bg-blue-600" 
                      : "border-slate-300 bg-white"
                  }`}>
                    {journeyType === "arrival" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-2 rounded-lg ${
                        journeyType === "arrival" ? "bg-blue-100" : "bg-slate-100"
                      }`}>
                        <ArrowDownLeft className={`w-6 h-6 ${
                          journeyType === "arrival" ? "text-blue-700" : "text-slate-600"
                        }`} />
                      </div>
                      <h3 className={`text-lg font-bold ${
                        journeyType === "arrival" ? "text-blue-900" : "text-slate-900"
                      }`}>
                        Arrival
                      </h3>
                    </div>
                    <p className={`text-sm ${
                      journeyType === "arrival" ? "text-blue-700" : "text-slate-600"
                    }`}>
                      Passenger is entering the facility
                    </p>
                  </div>
                </div>
                {journeyType === "arrival" && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Selected
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div> */}

        
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Operator Tools</h1>
              <p className="text-sm text-slate-600">Quick access to essential functions</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 mb-8 border border-slate-200">
            <p className="text-slate-700 leading-relaxed">
              Use the menu to perform offline bookings for walk-in passengers without prior slot reservations. 
              Process payments, issue receipts, and generate boarding passes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin/operator/offline-booking" className="block group">
              <div className="relative border-2 border-slate-200 rounded-2xl p-6 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-emerald-100 to-green-100 inline-flex p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 border border-emerald-200">
                    <CreditCard className="w-7 h-7 text-emerald-700" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Offline Booking</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Cash or online payment, issue receipt and boarding pass instantly.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                    <span>Open</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            
            <Link href="/admin/operator/online-booking" className="block group">
              <div className="relative border-2 border-slate-200 rounded-2xl p-6 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-indigo-100 to-violet-100 inline-flex p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 border border-indigo-200">
                    <ClipboardList className="w-7 h-7 text-indigo-700" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Online Booking</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Lookup online reservations by booking number or QR, view payment status, and mark checked.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                    <span>Open</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            
            <Link href="/admin/admin-report" className="block group">
              <div className="relative border-2 border-slate-200 rounded-2xl p-6 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-indigo-100 to-violet-100 inline-flex p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 border border-indigo-200">
                    <ClipboardList className="w-7 h-7 text-indigo-700" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Reports</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Generate daily booking and transaction reports.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                    <span>Open</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </main>
  )
}