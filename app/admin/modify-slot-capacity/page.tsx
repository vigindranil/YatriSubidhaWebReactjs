"use client"

import { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  CalendarDays,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import { callApi } from "@/components/apis/commonApi";

// Interface for the data coming from the GET API
interface SlotData {
  SlotID: number;
  SlotNameEng: string;
  TimeRangeEng: string;
  SlotCapacity: string;
  AvailableTokenCount: string;
}

interface SlotUpdateRecord {
  slotName: string;
  time: string;
  type: string;
  capacity: number;
  status: string;
  timestamp: Date;
}

export default function ModifySlotCapacity() {
  // --- State Management ---
  
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [journeyTypeId, setJourneyTypeId] = useState<number>(2); 

  // Data State
  const [slotList, setSlotList] = useState<SlotData[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // Form Input State
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [capacity, setCapacity] = useState<string>('');
  
  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [recentUpdates, setRecentUpdates] = useState<SlotUpdateRecord[]>([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 5;

  // --- API: Fetch Slots ---
  const fetchSlots = async () => {
    setLoadingSlots(true);
    
    try {
      const payload = {
        JourneyDate: selectedDate,
        AuthInfo: "{}",
        Type: journeyTypeId 
      };

      const response = await callApi("user/slot/get-available-slot-by-date", payload);

      if (response.success && Array.isArray(response.data)) {
        setSlotList(response.data);
      } else {
        if(!response.success && response.message) {
            console.warn("Fetch warning:", response.message);
        }
        setSlotList([]);
      }
    } catch (error) {
      console.error("API Error fetching slots:", error);
    } finally {
      setLoadingSlots(false);
    }
  };

  // --- useEffect: Debounced Fetch ---
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSlots();
      setSelectedSlotId('');
      setCapacity('');
    }, 800); 

    return () => clearTimeout(timer);
  }, [selectedDate, journeyTypeId]);


  // --- Handlers ---
  const handleSlotSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedSlotId(id);
    
    const selectedSlotData = slotList.find(s => s.SlotID === parseInt(id));
    if (selectedSlotData) {
      setCapacity(selectedSlotData.SlotCapacity);
    }
  };

  // Logic: Handle Capacity Input (No text, No negatives, No < 1)
  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty string to let user clear input
    if (value === '') {
      setCapacity('');
      return;
    }

    // Convert to number
    const numValue = parseInt(value, 10);

    // Only set state if it's a valid number and >= 1
    // (NaN check handles non-numeric paste attempts that bypass type="number")
    if (!isNaN(numValue) && numValue >= 1) {
      setCapacity(numValue.toString());
    }
  };

  // Logic: Block invalid keys (-, +, e, .)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', '+', 'e', 'E', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async () => {
    if(!selectedSlotId || !capacity) {
      alert("Please select a slot and enter capacity.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        SlotID: parseInt(selectedSlotId),
        SlotCapacity: parseInt(capacity),
        AuthInfo: "{}",
        JourneyTypeID: journeyTypeId,
        JourneyDate: selectedDate 
      };

      const response = await callApi("admin/update-slot-capacity", payload);

      if (response.success) {
        alert("Slot capacity updated successfully.");
        
        const targetSlotId = parseInt(selectedSlotId);
        const newCapacityStr = capacity.toString();

        // 1. Update Local Log
        const selectedSlotData = slotList.find(s => s.SlotID === targetSlotId);
        const newRecord: SlotUpdateRecord = {
          slotName: selectedSlotData ? selectedSlotData.SlotNameEng : "Unknown",
          time: selectedSlotData ? selectedSlotData.TimeRangeEng : "-",
          type: journeyTypeId === 1 ? "Arrival" : "Departure",
          capacity: parseInt(capacity),
          status: "Updated",
          timestamp: new Date()
        };
        
        setRecentUpdates(prev => [newRecord, ...prev]);
        
        // Reset pagination to first page when new item is added
        setCurrentPage(1);

        // 2. Optimistic Update 
        setSlotList(prevList => prevList.map(slot => 
          slot.SlotID === targetSlotId 
            ? { ...slot, SlotCapacity: newCapacityStr } 
            : slot
        ));

        // 3. Delay refetch
        setTimeout(() => {
          fetchSlots();
        }, 500); 
        
      } else {
        alert(`Failed to update: ${response.message}`);
      }
    } catch (error) {
      console.error("API Error updating:", error);
      alert("Server connection error.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- Pagination Logic ---
  const totalPages = Math.ceil(recentUpdates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTableData = recentUpdates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-green-50/30">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              System Configuration
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Modify Slot Capacity</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-emerald-100/50 relative overflow-hidden">
          <div className="relative z-10">
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
              
              {/* Toggle Buttons */}
              <div className="flex flex-col items-center">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Journey Type</label>
                <div className="flex items-center gap-4 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                  <button 
                    onClick={() => setJourneyTypeId(1)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${
                      journeyTypeId === 1
                        ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-200 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                     <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        journeyTypeId === 1 ? 'border-emerald-500' : 'border-gray-400'
                      }`}>
                        {journeyTypeId === 1 && <div className="w-2 h-2 bg-emerald-500 rounded-full" />}
                      </div>
                      Arrival
                  </button>

                  <button 
                    onClick={() => setJourneyTypeId(2)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 ${
                      journeyTypeId === 2 
                        ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-200 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        journeyTypeId === 2 ? 'border-emerald-500' : 'border-gray-400'
                      }`}>
                        {journeyTypeId === 2 && <div className="w-2 h-2 bg-emerald-500 rounded-full" />}
                      </div>
                      Departure
                  </button>
                </div>
              </div>

              {/* Date Picker */}
              <div className="flex flex-col items-center w-full md:w-auto">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Journey Date</label>
                <div className="relative group w-full md:w-64">
                   <input 
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2.5 pl-10 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-gray-700 font-medium cursor-pointer"
                   />
                   <CalendarDays className="absolute left-3 top-3 text-gray-400" size={18} />
                </div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
              
              {/* Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">
                  Select Slot Name {loadingSlots && <span className="text-emerald-500 animate-pulse ml-2">Loading...</span>}
                </label>
                <div className="relative group">
                  <select
                    value={selectedSlotId}
                    onChange={handleSlotSelection}
                    disabled={loadingSlots}
                    className="w-full px-4 py-4 pl-11 bg-emerald-50/30 border border-emerald-200 rounded-xl text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium cursor-pointer disabled:opacity-50"
                  >
                    <option value="" disabled>
                      {loadingSlots ? "Loading Slots..." : "Select Slot Name"}
                    </option>
                    {slotList.map((slot) => (
                      <option key={slot.SlotID} value={slot.SlotID}>
                        {slot.SlotNameEng} - {slot.TimeRangeEng}
                      </option>
                    ))}
                  </select>
                  <Clock className="absolute left-3.5 top-4 text-emerald-600/60 group-hover:text-emerald-600 transition-colors" size={20} />
                </div>
              </div>

              {/* Capacity Input - Updated */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">New Capacity</label>
                <div className="relative group">
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter new capacity "
                    value={capacity}
                    onKeyDown={handleKeyDown}
                    onChange={handleCapacityChange}
                    className="w-full px-4 py-4 pl-11 bg-emerald-50/30 border border-emerald-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium placeholder:text-gray-400"
                  />
                  <Users className="absolute left-3.5 top-4 text-emerald-600/60 group-hover:text-emerald-600 transition-colors" size={20} />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={submitting || loadingSlots}
                className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={22} />
                    Update Capacity
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Live Logs with Pagination */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              Session Updates
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Slot Name</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Capacity</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentUpdates.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-10 text-center text-gray-400 text-sm">
                      No updates in this session.
                    </td>
                  </tr>
                ) : (
                  currentTableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-green-50/30 transition-colors animate-in fade-in slide-in-from-top-2">
                      <td className="px-8 py-4 text-sm font-bold text-emerald-700">{row.slotName}</td>
                      <td className="px-8 py-4 text-sm text-gray-600">{row.time}</td>
                      <td className="px-8 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          {row.type === 'Departure' ? <ArrowRight className="w-3 h-3" /> : <ArrowRight className="w-3 h-3 rotate-180" />}
                          {row.type}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-sm font-bold text-gray-900">{row.capacity}</td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm text-gray-600">Updated</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {recentUpdates.length > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-between px-8 py-4 border-t border-gray-100 bg-gray-50/30">
              <span className="text-sm text-gray-500 font-medium">
                Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, recentUpdates.length)} of {recentUpdates.length} updates
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent text-gray-600 transition-colors"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-emerald-700">
                  {currentPage} / {totalPages}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent text-gray-600 transition-colors"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}