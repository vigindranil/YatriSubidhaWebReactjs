"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"

interface TimeSlot {
  id: string
  time: string
  color: "green" | "yellow" | "red"
  available: number
  total: number
}

interface Day {
  date: Date
  slots: TimeSlot[]
}

export function SlotBooking() {
  const [passengerType, setPassengerType] = useState<"arrival" | "departure">("arrival")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date()
    today.setDate(today.getDate() - today.getDay())
    return today
  })

  const generateSlots = (): TimeSlot[] => {
    return [
      { id: "1", time: "06:00 AM", color: "green", available: 15, total: 20 },
      { id: "2", time: "07:00 AM", color: "green", available: 12, total: 20 },
      { id: "3", time: "08:00 AM", color: "green", available: 8, total: 20 },
      { id: "4", time: "09:00 AM", color: "yellow", available: 5, total: 20 },
      { id: "5", time: "10:00 AM", color: "yellow", available: 3, total: 20 },
      { id: "6", time: "11:00 AM", color: "red", available: 0, total: 20 },
      { id: "7", time: "12:00 PM", color: "green", available: 18, total: 20 },
      { id: "8", time: "01:00 PM", color: "green", available: 14, total: 20 },
      { id: "9", time: "02:00 PM", color: "yellow", available: 4, total: 20 },
      { id: "10", time: "03:00 PM", color: "red", available: 1, total: 20 },
      { id: "11", time: "04:00 PM", color: "green", available: 16, total: 20 },
      { id: "12", time: "05:00 PM", color: "green", available: 11, total: 20 },
    ]
  }

  const getWeekDays = () => {
    const days: Day[] = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart)
      date.setDate(date.getDate() + i)
      days.push({
        date,
        slots: generateSlots(),
      })
    }
    return days
  }

  const weekDays = getWeekDays()
  const colorConfig = {
    green: { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700", label: "Available" },
    yellow: { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700", label: "Limited" },
    red: { bg: "bg-red-50", border: "border-red-300", text: "text-red-700", label: "Full" },
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Travel Type</h2>
        <div className="grid grid-cols-2 gap-4">
          {["arrival", "departure"].map((type) => (
            <button
              key={type}
              onClick={() => setPassengerType(type as "arrival" | "departure")}
              className={`p-4 rounded-lg border-2 transition font-semibold capitalize ${
                passengerType === type
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Select Date & Time</h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const newDate = new Date(currentWeekStart)
                newDate.setDate(newDate.getDate() - 7)
                setCurrentWeekStart(newDate)
              }}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                const newDate = new Date(currentWeekStart)
                newDate.setDate(newDate.getDate() + 7)
                setCurrentWeekStart(newDate)
              }}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-7 gap-2 mb-8 pb-8 border-b border-slate-200">
          {weekDays.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(day.date)}
              className={`p-3 rounded-lg border-2 transition text-center ${
                selectedDate?.toDateString() === day.date.toDateString()
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <p className="text-xs font-semibold text-slate-600 mb-1">
                {day.date.toLocaleDateString("en-US", { weekday: "short" })}
              </p>
              <p className="text-lg font-bold text-slate-900">{day.date.getDate()}</p>
            </button>
          ))}
        </div>

        {/* Time Slot Legend */}
        <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-slate-200">
          {Object.entries(colorConfig).map(([color, config]) => (
            <div key={color} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded border-2 ${config.border} ${config.bg}`}></div>
              <span className="text-sm text-slate-600">
                {color === "green" ? "Available" : color === "yellow" ? "Limited Slots" : "No Slots"}
              </span>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <>
            <h3 className="font-semibold text-slate-900 mb-4">Available Slots for {formatDate(selectedDate)}</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {generateSlots().map((slot) => {
                const config = colorConfig[slot.color]
                const isSelected = selectedSlot === slot.id
                const isDisabled = slot.available === 0

                return (
                  <button
                    key={slot.id}
                    onClick={() => !isDisabled && setSelectedSlot(slot.id)}
                    disabled={isDisabled}
                    className={`p-3 rounded-lg border-2 transition ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-300"
                        : isDisabled
                          ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                          : `${config.border} ${config.bg} hover:shadow-md`
                    }`}
                  >
                    <p className="font-bold text-sm">{slot.time}</p>
                    <p className={`text-xs mt-1 ${isDisabled ? "text-slate-400" : config.text}`}>
                      {slot.available === 0 ? "Full" : `${slot.available}/${slot.total}`}
                    </p>
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>

      {selectedDate && selectedSlot && (
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-emerald-900 mb-2">Booking Summary</h3>
              <ul className="space-y-1 text-sm text-emerald-900">
                <li>
                  Type: <span className="font-semibold capitalize">{passengerType}</span>
                </li>
                <li>
                  Date: <span className="font-semibold">{formatDate(selectedDate)}</span>
                </li>
                <li>
                  Time:{" "}
                  <span className="font-semibold">{generateSlots().find((s) => s.id === selectedSlot)?.time}</span>
                </li>
              </ul>
            </div>
          </div>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-semibold">
            Confirm Booking
          </Button>
        </div>
      )}
    </div>
  )
}
