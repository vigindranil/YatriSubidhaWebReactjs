"use client"

import { useState } from "react"
import { AdminNav } from "@/components/admin-nav"
import { AnalyticsCards } from "@/components/analytics-cards"
import { PassingTrend } from "@/components/passing-trend"
import { SlotUtilization } from "@/components/slot-utilization"
import { PassengerQueue } from "@/components/passenger-queue"
import { DateRangePicker } from "@/components/date-range-picker"

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  const analytics = {
    totalPassengers: 12847,
    todayProcessed: 342,
    avgProcessingTime: "12 mins",
    occupancyRate: "72%",
    peakHour: "9:00 AM - 10:00 AM",
    arrivalsPercent: 58,
    departuresPercent: 42,
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Portal Analytics</h1>
            <p className="text-slate-300 mt-2">Real-time monitoring and statistics</p>
          </div>
          <DateRangePicker onDateChange={setDateRange} />
        </div>

        {/* KPI Cards */}
        <AnalyticsCards analytics={analytics} />

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <PassingTrend />
          <SlotUtilization />
        </div>

        {/* Detailed Tables */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PassengerQueue />
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <h3 className="text-lg font-bold text-white">Recent Activities</h3>
            </div>

            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {[
                { time: "12:45 PM", action: "Pass verified", user: "John Doe" },
                { time: "12:40 PM", action: "New booking", user: "Jane Smith" },
                { time: "12:35 PM", action: "Pass printed", user: "Mike Johnson" },
                { time: "12:30 PM", action: "Pass verified", user: "Sarah Williams" },
                { time: "12:25 PM", action: "New booking", user: "Robert Brown" },
              ].map((activity, index) => (
                <div key={index} className="border-l-4 border-emerald-500 pl-4 py-2">
                  <p className="text-xs font-semibold text-slate-500">{activity.time}</p>
                  <p className="font-semibold text-slate-900">{activity.action}</p>
                  <p className="text-sm text-slate-600">{activity.user}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
