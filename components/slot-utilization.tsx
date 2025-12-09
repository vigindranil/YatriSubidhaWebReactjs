"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2, AlertCircle } from "lucide-react"
import { callApi } from "@/components/apis/commonApi"

interface SlotUtilizationProps {
  dateRange?: {
    start: string
    end: string
  }
}

export function SlotUtilization({ dateRange }: SlotUtilizationProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Helper to get cookie
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setErrorMsg(null)

      try {
        // 1. Handle Date Logic (Default to today if empty)
        // Note: The API requires "CurrentDate". We use the start date or today.
        let targetDate = dateRange?.start;

        if (!targetDate) {
          const date = new Date();
          const todayStr = date.toISOString().split('T')[0];
          targetDate = todayStr;
        }

        // 2. Handle UserID Logic
        const cookieUserID = getCookie('userID');
        const dynamicUserID = cookieUserID ? parseInt(cookieUserID) : 0;

        // 3. Prepare Payload
        const payload = {
          CurrentDate: targetDate,
          UserID: dynamicUserID
        }

        // 4. Call API
        const response = await callApi("admin/get-admin-dashboard-count", payload);

        if (response.success && Array.isArray(response.data) && response.data.length > 0) {
          const raw = response.data[0];

          // Parse API data safely
          const attended = Number(raw.AttendedToday) || 0;
          const pending = Number(raw.PendingAttendance) || 0;
          const booked = Number(raw.TodaySlotBooked) || 0;
          const total = Number(raw.TotalPassenger) || 0;

          setStats({
            total,
            booked,
            attended,
            pending
          });

          // Map data for the Pie Chart (Visualizing Attended vs Pending)
          // We exclude 'Total' and 'Booked' from the pie slices to ensure the chart represents status distribution
          const formattedChartData = [
            { name: "Attended", value: attended, fill: "#10b981" }, // Emerald-500
            { name: "Pending", value: pending, fill: "#fbbf24" },   // Amber-400
          ];

          // Handle case where all values are 0 (to show an empty state or placeholder)
          if (attended === 0 && pending === 0) {
            setChartData([{ name: "No Activity", value: 1, fill: "#e2e8f0" }]);
          } else {
            setChartData(formattedChartData);
          }

        } else {
          setChartData([]);
          setStats(null);

          if (!response.success) {
            setErrorMsg(response.message || "Failed to fetch dashboard counts");
          }
        }
      } catch (error) {
        console.error("Error fetching slot utilization:", error);
        setErrorMsg("An error occurred while loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange?.start]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full min-h-[400px]">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Slot Utilization</h3>
        {loading && <Loader2 className="w-5 h-5 text-white animate-spin" />}
      </div>

      <div className="p-6 flex-1 flex flex-col items-center justify-center relative">
        {loading ? (
          <div className="flex flex-col items-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p>Loading stats...</p>
          </div>
        ) : errorMsg ? (
          <div className="flex flex-col items-center text-slate-400">
            <AlertCircle className="w-8 h-8 mb-2" />
            <p>{errorMsg}</p>
          </div>
        ) : !stats ? (
          <div className="text-slate-400">No data available.</div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Text for Total */}
            <div className="absolute top-[42%] left-0 right-0 text-center pointer-events-none">
              <p className="text-xs text-slate-400 font-medium uppercase">Total</p>
              <p className="text-2xl font-bold text-slate-700">{stats.total}</p>
            </div>
          </>
        )}
      </div>


      {!loading && stats && (
        <div className="px-6 pb-6 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-slate-600">
              Booked Slots: <strong>{stats.booked}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-slate-600">
              Attended: <strong>{stats.attended}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <span className="text-sm text-slate-600">
              Pending: <strong>{stats.pending}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-slate-400"></div>
            <span className="text-sm text-slate-600">
              Total Pax: <strong>{stats.total}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}