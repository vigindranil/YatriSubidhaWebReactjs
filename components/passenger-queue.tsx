"use client"

import { useState, useEffect } from "react";
import { Clock, CheckCircle, AlertCircle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { callApi } from "@/components/apis/commonApi";
import { Button } from "@/components/ui/button"; // Assuming you have this, otherwise standard button works

interface QueueItem {
  PassengerName: string;
  SlotName: string;
  BookingType: string;
  PassengerStatus: string;
}

// 1. Define Props Interface
interface PassengerQueueProps {
  dateRange: {
    start: string;
    end: string;
  };
}

export function PassengerQueue({ dateRange }: PassengerQueueProps) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Helper function to get cookie value
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  useEffect(() => {
    const fetchQueueData = async () => {
      setLoading(true);
      try {
        // Use props if available, otherwise default to current month logic
        let fromDate = dateRange.start;
        let toDate = dateRange.end;

        if (!fromDate || !toDate) {
            const date = new Date();
            toDate = date.toISOString().split('T')[0];
            // Default: Start of current month
            fromDate = date.toISOString().split('T')[0];
        }

        // Get UserID dynamically from cookie
        const cookieUserID = getCookie('userID');
        const dynamicUserID = cookieUserID ? parseInt(cookieUserID) : 0;

        const payload = {
          FromDate: fromDate,
          ToDate: toDate,
          UserID: dynamicUserID 
        };

        const response = await callApi("admin/get-current-queue-report-details", payload);

        if (response.success && Array.isArray(response.data)) {
          setQueue(response.data);
          setErrorMsg(null);
        } else {
          setQueue([]);
          setErrorMsg(response.message || "No booking records found.");
        }
        // Reset to first page whenever new data is fetched
        setCurrentPage(1); 
      } catch (error) {
        console.error("Failed to fetch queue details:", error);
        setErrorMsg("Failed to load queue data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQueueData();

  }, [dateRange.start, dateRange.end]); 

  
  const statusConfig = {
    completed: { icon: CheckCircle, bg: "bg-emerald-50", text: "text-emerald-700", label: "Completed" },
    waiting: { icon: AlertCircle, bg: "bg-amber-50", text: "text-amber-700", label: "Waiting" },
    default: { icon: Clock, bg: "bg-blue-50", text: "text-blue-700", label: "Processing" },
  }

  const getStatusKey = (status: string) => {
    const s = status?.toUpperCase();
    if (s === 'ATTENDED') return 'completed';
    if (s === 'NOT ATTENDED') return 'waiting';
    return 'default';
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = queue.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(queue.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Current Queue</h3>
        {loading && <Loader2 className="w-5 h-5 text-emerald-100 animate-spin" />}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">PASSENGER</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">TIME SLOT</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">TYPE</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {!loading && queue.length === 0 && (
               <tr>
                 <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-slate-400" />
                      <span>{errorMsg || "No passengers in queue."}</span>
                    </div>
                 </td>
               </tr>
            )}
            
            {/* Map over currentItems instead of queue */}
            {currentItems.map((item, index) => {
              const statusKey = getStatusKey(item.PassengerStatus);
              const config = statusConfig[statusKey as keyof typeof statusConfig];
              const StatusIcon = config.icon;

              return (
                <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">{item.PassengerName}</td>
                  <td className="px-6 py-4 text-slate-600">{item.SlotName}</td>
                  <td className="px-6 py-4 text-slate-600">{item.BookingType}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
                      <StatusIcon className={`w-4 h-4 ${config.text}`} />
                      <span className={`text-sm font-semibold ${config.text}`}>{config.label}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {queue.length > 0 && !loading && (
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-sm text-slate-600">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, queue.length)}
            </span>{" "}
            of <span className="font-medium">{queue.length}</span> results
          </span>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-sm font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}