"use client"

import { useState, useEffect } from "react"
import { Users, Clock, TrendingUp, Zap, Loader2 } from "lucide-react"
import { callApi } from "@/components/apis/commonApi"

interface AnalyticsCardsProps {
  dateRange: {
    start: string
    end: string
  }
}

interface DashboardStats {
  TotalPassenger: number
  TodaySlotBooked: number
  AttendedToday: string
  PendingAttendance: string
}

export function AnalyticsCards({ dateRange }: AnalyticsCardsProps) {
  const [stats, setStats] = useState<DashboardStats>({
    TotalPassenger: 0,
    TodaySlotBooked: 0,
    AttendedToday: "0",
    PendingAttendance: "0"
  })
  const [loading, setLoading] = useState(true)
  
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      setLoading(true)
      try {
        
        let selectedDate = dateRange.start;
        if (!selectedDate) {
           const date = new Date();
           selectedDate = date.toISOString().split('T')[0];
        }

        
        const cookieUserID = getCookie('userID');
        const dynamicUserID = cookieUserID ? parseInt(cookieUserID) : 0;

        
        const payload = {
            CurrentDate: selectedDate,
            UserID: dynamicUserID
        }

        
        const response = await callApi("admin/get-admin-dashboard-count", payload);

        if (response.success && Array.isArray(response.data) && response.data.length > 0) {
            setStats(response.data[0]);
        } 
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardCounts()
  }, [dateRange.start]) // Re-run when date changes

  const cards = [
    {
      icon: Users,
      label: "Total Passengers",
      value: stats.TotalPassenger, 
      subLabel: "Registered", 
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: TrendingUp,
      label: "Processed Today",
      value: stats.AttendedToday,
      subLabel: "Attended",
      color: "from-emerald-600 to-teal-600",
    },
    {
      icon: Clock,
      label: "Pending Attendance", // Changed from Avg Processing
      value: stats.PendingAttendance,
      subLabel: "Remaining",
      color: "from-amber-600 to-orange-600",
    },
    {
      icon: Zap,
      label: "Slots Booked", 
      value: stats.TodaySlotBooked,
      subLabel: "For Selected Date",
      color: "from-purple-600 to-pink-600",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon

        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition relative overflow-hidden`}
          >
            {loading && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                </div>
            )}
            
            <div className="flex items-center justify-between mb-4">
              <Icon className="w-8 h-8 opacity-80" />
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/20">
                {card.subLabel}
              </span>
            </div>
            <p className="text-sm opacity-90 mb-1">{card.label}</p>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        )
      })}
    </div>
  )
}