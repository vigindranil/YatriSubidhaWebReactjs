"use client"

import { useState } from 'react';
import { 
  CalendarDays, 
  RefreshCw, 
  ToggleLeft, 
  History, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Clock,
  Loader2,
  AlertCircle
} from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import { callApi } from "@/components/apis/commonApi";

interface StatusChangeRecord {
  type: string;
  dateRange: string;
  status: string;
  slotName: string;
  timestamp: string;
}


const STATIC_SLOTS = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  label: `Slot ${i + 1}`
}));

export default function ChangeSlotStatus() {

  const [journeyTypeId, setJourneyTypeId] = useState<number>(1); 
  
  const [fromDate, setFromDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [activeStatus, setActiveStatus] = useState<string>(''); // "1" or "0"

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [recentChanges, setRecentChanges] = useState<StatusChangeRecord[]>([]);

  const handleSubmit = async () => {
    if(!selectedSlotId || !activeStatus || !fromDate || !toDate) {
      alert("Please fill in all fields (Slot, Status, and Date Range).");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        FromDate: fromDate,
        ToDate: toDate,
        SlotID: parseInt(selectedSlotId),
        ActiveStatus: parseInt(activeStatus),
        JourneyTypeID: journeyTypeId, // 1 for Departure, 2 for Arrival
        AuthInfo: "{}"
      };

      const response = await callApi("admin/update-slot-active-status", payload);

      if (response.success) {
        alert(response.message || "Slot status updated successfully.");

        const newRecord: StatusChangeRecord = {
          type: journeyTypeId === 2 ? "Arrival" : "Departure",
          dateRange: `${fromDate} to ${toDate}`,
          status: activeStatus === "1" ? "Active" : "Inactive",
          slotName: `Slot ${selectedSlotId}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setRecentChanges(prev => [newRecord, ...prev]);

      } else {
        alert(`Failed to update: ${response.message}`);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Server connection error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-green-50/30">
       <AdminNav />
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        <div className="mb-8">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200 flex items-center gap-2">
              <ToggleLeft className="w-4 h-4" />
              Slot Management
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Change Slot Status</h1>
          <p className="text-lg text-gray-600">Enable or disable booking slots for specific date ranges.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-emerald-100/50 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full opacity-60 pointer-events-none blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            
            <div className="flex flex-col items-center justify-center mb-10">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Journey Type</label>
              <div className="flex items-center gap-8 bg-gray-50/80 p-2 rounded-xl border border-gray-200">
                
                <button
                  onClick={() => setJourneyTypeId(2)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    journeyTypeId === 2 
                      ? 'bg-white text-emerald-700 shadow-md ring-1 ring-emerald-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    journeyTypeId === 2 ? 'border-emerald-500' : 'border-gray-400'
                  }`}>
                    {journeyTypeId === 2 && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                  </div>
                  <span className="font-semibold">Arrival</span>
                </button>

                {/* Departure Button (ID: 1) */}
                <button
                  onClick={() => setJourneyTypeId(1)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    journeyTypeId === 1
                      ? 'bg-white text-emerald-700 shadow-md ring-1 ring-emerald-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    journeyTypeId === 1 ? 'border-emerald-500' : 'border-gray-400'
                  }`}>
                    {journeyTypeId === 1 && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                  </div>
                  <span className="font-semibold">Departure</span>
                </button>

              </div>
            </div>

            {/* 2. Date Range Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">From Date</label>
                <div className="relative group">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-4 py-4 pl-11 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                  />
                  <CalendarDays className="absolute left-3.5 top-4 text-gray-400 group-hover:text-emerald-600 transition-colors" size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">To Date</label>
                <div className="relative group">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-4 py-4 pl-11 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                  />
                  <CalendarDays className="absolute left-3.5 top-4 text-gray-400 group-hover:text-emerald-600 transition-colors" size={20} />
                </div>
              </div>
            </div>

            {/* 3. Static Slot Selection & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              
              {/* Slot Dropdown (Static) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">
                  Select Slot
                </label>
                <div className="relative group">
                  <select
                    value={selectedSlotId}
                    onChange={(e) => setSelectedSlotId(e.target.value)}
                    className="w-full px-4 py-4 pl-11 bg-emerald-50/30 border border-emerald-200 rounded-xl text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium cursor-pointer"
                  >
                    <option value="" disabled>Select a Slot ID</option>
                    {STATIC_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                  <Clock className="absolute left-3.5 top-4 text-emerald-600/60 group-hover:text-emerald-600 transition-colors" size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">New Status</label>
                <div className="relative group">
                  <select
                    value={activeStatus}
                    onChange={(e) => setActiveStatus(e.target.value)}
                    className="w-full px-4 py-4 pl-11 bg-emerald-50/30 border border-emerald-200 rounded-xl text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium cursor-pointer"
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="1">Active (Open)</option>
                    <option value="0">Inactive (Closed)</option>
                  </select>
                  <ToggleLeft className="absolute left-3.5 top-4 text-emerald-600/60 group-hover:text-emerald-600 transition-colors" size={20} />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Updating...
                  </>
                ) : (
                  <>
                    <RefreshCw size={22} className="group-hover:rotate-180 transition-transform duration-500" />
                    Update Status
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-600" />
              Session Status Changes
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Slot</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date Range</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">New Status</th>
                  <th className="px-8 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentChanges.length === 0 ? (
                 <tr>
  <td colSpan={5} className="px-8 py-10 text-center text-gray-400 text-sm">
    <div className="flex flex-col items-center justify-center gap-2">
      <AlertCircle className="w-5 h-5 opacity-50" />
      No changes made in this session.
    </div>
  </td>
</tr>

                ) : (
                  recentChanges.map((row, index) => (
                    <tr key={index} className="hover:bg-green-50/30 transition-colors animate-in fade-in slide-in-from-top-2">
                      <td className="px-8 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          {row.type === 'Departure' ? <ArrowRight className="w-3 h-3" /> : <ArrowRight className="w-3 h-3 rotate-180" />}
                          {row.type}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-sm font-bold text-emerald-700">{row.slotName}</td>
                      <td className="px-8 py-4 text-sm font-mono text-gray-600">{row.dateRange}</td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2">
                          {row.status === 'Active' ? (
                            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-sm font-semibold border border-emerald-100">
                              <CheckCircle2 className="w-4 h-4" /> Active
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-red-700 bg-red-50 px-3 py-1 rounded-full text-sm font-semibold border border-red-100">
                              <XCircle className="w-4 h-4" /> Inactive
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-4 text-right text-xs text-gray-400 flex items-center justify-end gap-1">
                        <Clock size={12} />
                        {row.timestamp}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}