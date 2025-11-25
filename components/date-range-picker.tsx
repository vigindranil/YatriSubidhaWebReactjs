"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface DateRangePickerProps {
  onDateChange: (range: { start: string; end: string }) => void
}

export function DateRangePicker({ onDateChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleApply = () => {
    onDateChange({ start: startDate, end: endDate })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button onClick={() => setIsOpen(!isOpen)} className="bg-white text-slate-900 hover:bg-slate-100 gap-2">
        <Calendar className="w-4 h-4" />
        Select Date Range
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 min-w-80">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleApply} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                Apply
              </Button>
              <Button onClick={() => setIsOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
