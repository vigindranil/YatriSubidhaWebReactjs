"use client"

import { useState } from "react"
import { AdminNav } from "@/components/admin-nav"
import { AnalyticsCards } from "@/components/analytics-cards"
import { PassingTrend } from "@/components/passing-trend"
import { SlotUtilization } from "@/components/slot-utilization"
import { PassengerQueue } from "@/components/passenger-queue"
// import { DateRangePicker } from "@/components/date-range-picker" // Removed
import { Calendar } from "lucide-react" // Added for the icon

export default function AdminDashboard() {

  // State handles start and end, but we will set them to the same value
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  // Function to handle single date selection
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    // Set both start and end to the same selected date
    setDateRange({
      start: selectedDate,
      end: selectedDate
    });
  };

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

          {/* New Single Date Picker UI */}
          <div className="flex items-center gap-3 bg-slate-800 p-2 rounded-lg border border-slate-700 shadow-sm">
            <div className="flex items-center gap-2 px-2">
              <Calendar className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-slate-300">Select Date:</span>
            </div>
            <input
              type="date"
              onChange={handleDateChange}
              className="bg-slate-900 text-white border border-slate-600 rounded px-3 py-1.5 focus:outline-none focus:border-emerald-500 text-sm [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        </div>

        <AnalyticsCards dateRange={dateRange} />

        <div className="grid lg:grid-cols-1 gap-8 mb-8">
           <PassingTrend dateRange={dateRange} /> 
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* PassengerQueue will now receive the same date for start and end */}
            <PassengerQueue dateRange={dateRange} />
          </div>
          <div className="lg:col-span-1">
            <SlotUtilization dateRange={dateRange} />
          </div>
        </div>
      </div>
    </main>
  )
}