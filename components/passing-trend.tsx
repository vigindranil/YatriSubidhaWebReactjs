"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Loader2, AlertCircle } from "lucide-react"
import { callApi } from "@/components/apis/commonApi"

interface PassingTrendProps {
  dateRange: {
    start: string
    end: string
  }
}

interface ApiSlotItem {
  SlotName: string
  SlotTimeRange: string
  NoOfDepartureBookings: string
  NoOfArrivalBookings: string
}

export function PassingTrend({ dateRange }: PassingTrendProps) {
  const [chartData, setChartData] = useState<any[]>([])
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
        let fromDate = dateRange.start;
        let toDate = dateRange.end;

        if (!fromDate || !toDate) {
            const date = new Date();
            const todayStr = date.toISOString().split('T')[0];
            fromDate = todayStr;
            toDate = todayStr;
        }

        // 2. Handle UserID Logic
        const cookieUserID = getCookie('userID');
        const dynamicUserID = cookieUserID ? parseInt(cookieUserID) : 0;

        // 3. Prepare Payload
        const payload = {
          FromDate: fromDate,
          ToDate: toDate,
          UserID: dynamicUserID
        }

        // 4. Call API
        const response = await callApi("admin/get-slot-wise-arrival-departure-booking-count", payload);

        if (response.success && Array.isArray(response.data)) {
          // Transform API data for Recharts
          const formattedData = response.data.map((item: ApiSlotItem) => ({
            time: item.SlotTimeRange || "Unknown",
            // Use Number() to safely handle strings/decimals and ensure 0 fallback
            arrivals: Number(item.NoOfArrivalBookings) || 0,
            departures: Number(item.NoOfDepartureBookings) || 0,
            rawSlot: item.SlotName 
          }));

          setChartData(formattedData);
        } else {
          setChartData([]);
          // Only show error if it's strictly not success, otherwise empty data is valid
          if (!response.success) {
            setErrorMsg(response.message || "Failed to fetch trend data");
          }
        }
      } catch (error) {
        console.error("Error fetching passing trend:", error);
        setErrorMsg("An error occurred while loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange.start, dateRange.end]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full min-h-[400px]">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Passenger Flow Trend</h3>
        {loading && <Loader2 className="w-5 h-5 text-white animate-spin" />}
      </div>

      <div className="p-6 flex-1 flex items-center justify-center">
        {loading ? (
            <div className="flex flex-col items-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <p>Loading analytics...</p>
            </div>
        ) : errorMsg ? (
            <div className="flex flex-col items-center text-slate-400">
                <AlertCircle className="w-8 h-8 mb-2" />
                <p>{errorMsg}</p>
            </div>
        ) : chartData.length === 0 ? (
            <div className="text-slate-400">No data available for this date.</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={chartData} 
              // Fixed margins so axes don't get cut off
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd" 
                minTickGap={10}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                allowDecimals={false} // Ensure we don't get 0.5 passengers
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar 
                name="Arrivals" 
                dataKey="arrivals" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
                // Removed fixed barSize to allow auto-scaling
              />
              <Bar 
                name="Departures" 
                dataKey="departures" 
                fill="#14b8a6" 
                radius={[4, 4, 0, 0]} 
                // Removed fixed barSize to allow auto-scaling
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}