"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardNav } from "@/components/dashboard-nav"
import { NewBooking } from "@/components/new-booking"
import { BookingHistory } from "@/components/booking-history"
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react"
import { callApi } from "@/components/apis/commonApi"

function DashboardContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<"book" | "history">("book")
  const [dashboardCount, setDashboardCount] = useState<any>({ totalDepartures: 0, totalArrivals: 0 })


  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "history") {
      setActiveTab("history")
    } else {
      setActiveTab("book")
    }
  }, [searchParams])

  const getDepartures = async () => {
    const response = await callApi("admin/arrival-departure-count", { AuthInfo: "{}", FromDate: new Date().toISOString().split("T")[0], ToDate: new Date().toISOString().split("T")[0], Type: 2 })
    if (response.success) {
      console.log(response)
      setDashboardCount({
        totalDepartures: response?.data[0]?.BookingCount,
        totalArrivals: response?.data[1]?.BookingCount
      })
    }
  }

  useEffect(() => {
    getDepartures()
  }, [])

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Departures Card */}
          <div className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:border-emerald-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-3 rounded-xl group-hover:bg-emerald-200 transition-colors">
                    <ArrowUpRight className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className="text-slate-700 text-sm font-semibold uppercase tracking-wide">Departures</p>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  <span>Active</span>
                </div>
              </div>
              <p className="text-5xl font-bold text-slate-900 mb-2">{dashboardCount?.totalDepartures || 0}</p>
              <p className="text-slate-500 text-sm">Total journeys departing</p>
            </div>
          </div>

          {/* Arrivals Card */}
          <div className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:border-blue-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
                    <ArrowDownLeft className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-slate-700 text-sm font-semibold uppercase tracking-wide">Arrivals</p>
                </div>
                <div className="flex items-center gap-1 text-blue-600 text-xs font-medium bg-blue-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  <span>Active</span>
                </div>
              </div>
              <p className="text-5xl font-bold text-slate-900 mb-2">{dashboardCount?.totalArrivals || 0}</p>
              <p className="text-slate-500 text-sm">Total journeys arriving</p>
            </div>
          </div>
        </div>

        {/* Content Area with smooth transitions */}
        <div className="transition-all duration-300">
          {activeTab === "book" && (
            <div className="animate-fadeIn">
              <NewBooking />
            </div>
          )}
          {activeTab === "history" && (
            <div className="animate-fadeIn">
              <BookingHistory />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <DashboardNav />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-slate-600 font-medium">Loading dashboard...</p>
          </div>
        </div>
      }>
        <DashboardContent />
      </Suspense>
    </main>
  )
}