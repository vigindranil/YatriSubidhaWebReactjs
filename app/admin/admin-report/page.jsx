"use client"

import { useState } from "react"
import { AdminNav } from "@/components/admin-nav"
import { DateRangePicker } from "@/components/date-range-picker"

export default function AdminDashboard() {
    const [dateRange, setDateRange] = useState({ start: "", end: "" })

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

            </div>
        </main>
    )
}
