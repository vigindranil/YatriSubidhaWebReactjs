"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowRight, ChevronUp, ChevronDown, Users } from "lucide-react"
import { callApi } from "./apis/commonApi"

interface Slot {
  id: string
  name: string
  timing: string
  capacity: number
  booked: number
  available: number
}

type SortField = "id" | "name" | "timing" | "capacity" | "booked" | "available"
type SortDirection = "asc" | "desc"

export function NewBooking() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const [slots, setSlots] = useState<Slot[]>([])

  const getAvailableSlotByDate = async () => {
    const response = await callApi("user/slot/get-available-slot-by-date", { JourneyDate: selectedDate, AuthInfo: "{}", Type: 2 })
    console.log(response);

    if (response.success) {
      setSlots(response.data)
    }
  }

  useEffect(() => {
    getAvailableSlotByDate()
  }, [])

  // Mock data for slots
  // const slots: Slot[] = [
  //   { id: "8", name: "SLOT-8", timing: "01:00 PM TO 01:59 PM", capacity: 100, booked: 0, available: 100 },
  //   { id: "9", name: "SLOT-9", timing: "02:00 PM TO 02:59 PM", capacity: 100, booked: 0, available: 100 },
  //   { id: "10", name: "SLOT-10", timing: "03:00 PM TO 03:59 PM", capacity: 100, booked: 0, available: 100 },
  //   { id: "11", name: "SLOT-11", timing: "04:00 PM TO 04:59 PM", capacity: 100, booked: 0, available: 100 },
  //   { id: "12", name: "SLOT-12", timing: "05:00 PM TO 05:59 PM", capacity: 100, booked: 0, available: 100 },
  // ]

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedSlots = [...slots]
    .filter((slot) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        slot.SlotID.toLowerCase().includes(query) ||
        slot.name.toLowerCase().includes(query) ||
        slot?.TimeRangeEng.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      if (!sortField) return 0
      let aValue: string | number
      let bValue: string | number

      switch (sortField) {
        case "id":
          aValue = parseInt(a.id)
          bValue = parseInt(b.id)
          break
        case "name":
          aValue = a.name
          bValue = b.name
          break
        case "timing":
          aValue = a.timing
          bValue = b.timing
          break
        case "capacity":
          aValue = a.capacity
          bValue = b.capacity
          break
        case "booked":
          aValue = a.booked
          bValue = b.booked
          break
        case "available":
          aValue = a.available
          bValue = b.available
          break
        default:
          return 0
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      } else {
        return sortDirection === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
      }
    })

  const handleCheckAvailability = () => {
    // This would trigger an API call to check availability for the selected date
    getAvailableSlotByDate();
  }

  const handleSelectSlot = (slotId: string) => {
    // Navigate to booking page with slot ID and date
    router.push(`/booking/${slotId}?date=${selectedDate}`)
  }

  return (
    <div className="bg-sky-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          {/* Date Selection Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 text-center mb-4">
              Select A Date For Checking Slot Availability
            </h2>
            <div className="flex items-center justify-center gap-4">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-64"
              />
              <Button
                onClick={handleCheckAvailability}
                className="bg-slate-700 hover:bg-slate-800 text-white gap-2"
              >
                Check Availability
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Slot Availability Table Section */}
          <div className="mt-8">
            <div className="flex justify-end mb-4">
              <div className="flex items-center gap-2">
                <label htmlFor="search" className="text-sm font-medium text-slate-700">
                  Search:
                </label>
                <Input
                  id="search"
                  type="text"
                  placeholder=""
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-700 hover:bg-slate-700">
                    <TableHead
                      className="text-white cursor-pointer select-none"
                      onClick={() => handleSort("id")}
                    >
                      <div className="flex items-center gap-2">
                        Slot ID
                        {sortField === "id" ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )
                        ) : (
                          <div className="flex flex-col">
                            <ChevronUp className="w-3 h-3 opacity-50" />
                            <ChevronDown className="w-3 h-3 opacity-50 -mt-1" />
                          </div>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-white cursor-pointer select-none"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-2">
                        Slot Name
                        {sortField === "name" ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )
                        ) : (
                          <div className="flex flex-col">
                            <ChevronUp className="w-3 h-3 opacity-50" />
                            <ChevronDown className="w-3 h-3 opacity-50 -mt-1" />
                          </div>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-white cursor-pointer select-none"
                      onClick={() => handleSort("timing")}
                    >
                      <div className="flex items-center gap-2">
                        Slot Timing
                        {sortField === "timing" ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )
                        ) : (
                          <div className="flex flex-col">
                            <ChevronUp className="w-3 h-3 opacity-50" />
                            <ChevronDown className="w-3 h-3 opacity-50 -mt-1" />
                          </div>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-white cursor-pointer select-none"
                      onClick={() => handleSort("capacity")}
                    >
                      <div className="flex items-center gap-2">
                        Slot Capacity
                        {sortField === "capacity" ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )
                        ) : (
                          <div className="flex flex-col">
                            <ChevronUp className="w-3 h-3 opacity-50" />
                            <ChevronDown className="w-3 h-3 opacity-50 -mt-1" />
                          </div>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-white cursor-pointer select-none"
                      onClick={() => handleSort("booked")}
                    >
                      <div className="flex items-center gap-2">
                        Slot Booked
                        {sortField === "booked" ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )
                        ) : (
                          <div className="flex flex-col">
                            <ChevronUp className="w-3 h-3 opacity-50" />
                            <ChevronDown className="w-3 h-3 opacity-50 -mt-1" />
                          </div>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-white cursor-pointer select-none"
                      onClick={() => handleSort("available")}
                    >
                      <div className="flex items-center gap-2">
                        Slot Available
                        {sortField === "available" ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )
                        ) : (
                          <div className="flex flex-col">
                            <ChevronUp className="w-3 h-3 opacity-50" />
                            <ChevronDown className="w-3 h-3 opacity-50 -mt-1" />
                          </div>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-white">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedSlots.map((slot: Slot) => (
                    <TableRow key={slot?.SlotID}>
                      <TableCell className="font-medium">{slot?.SlotID}</TableCell>
                      <TableCell>
                        <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded font-semibold text-sm">
                          {slot?.SlotNameEng}
                        </span>
                      </TableCell>
                      <TableCell>{slot?.TimeRangeEng}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-yellow-600" />
                          <span>{slot?.SlotCapacity}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-red-600" />
                          <span>{slot?.BookingCount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-green-600" />
                          <span>{slot?.AvailableTokenCount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleSelectSlot(slot?.SlotID)}
                          className="bg-violet-600 hover:bg-violet-700 text-white gap-2"
                          size="sm"
                        >
                          Select Slot
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-sm text-slate-600">
              Showing 1 to {filteredAndSortedSlots.length} of {filteredAndSortedSlots.length} entries
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
