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
  AlertTriangle,
  Clock
} from "lucide-react";
import { AdminNav } from "@/components/admin-nav"
// Mock Data for Status Options
const STATUS_OPTIONS = [
  { value: "Active", label: "Active (Open for Booking)" },
  { value: "Inactive", label: "Inactive (Closed)" },
  { value: "Maintenance", label: "Maintenance (System Hold)" },
  { value: "Reserved", label: "Reserved (VIP/Official)" },
];

// Mock Data for History Table
const RECENT_CHANGES = [
  { id: 1, type: "Departure", dateRange: "2023-10-25 to 2023-10-26", status: "Inactive", updatedBy: "Admin", timestamp: "10 mins ago" },
  { id: 2, type: "Arrival", dateRange: "2023-10-28 to 2023-10-28", status: "Active", updatedBy: "Supervisor", timestamp: "1 hour ago" },
  { id: 3, type: "Departure", dateRange: "2023-11-01 to 2023-11-05", status: "Maintenance", updatedBy: "Tech_Lead", timestamp: "Yesterday" },
];

export default function ChangeSlotStatus() {
  const [formData, setFormData] = useState({
    journeyType: 'departure',
    status: '',
    startDate: '',
    endDate: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, journeyType: value }));
  };

  const handleSubmit = () => {
    if(!formData.status || !formData.startDate || !formData.endDate) {
      alert("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Status updated to ${formData.status} for selected dates.`);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-green-50/30">
       <AdminNav />
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header Section */}
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

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-emerald-100/50 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full opacity-60 pointer-events-none blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            
            {/* 1. Journey Type Selection (Centered) */}
            <div className="flex flex-col items-center justify-center mb-10">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Journey Type</label>
              <div className="flex items-center gap-8 bg-gray-50/80 p-2 rounded-xl border border-gray-200">
                
                <label className={`flex items-center gap-3 px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  formData.journeyType === 'arrival' 
                    ? 'bg-white text-emerald-700 shadow-md ring-1 ring-emerald-200' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.journeyType === 'arrival' ? 'border-emerald-500' : 'border-gray-400'
                  }`}>
                    {formData.journeyType === 'arrival' && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                  </div>
                  <input 
                    type="radio" 
                    name="journeyType" 
                    value="arrival" 
                    checked={formData.journeyType === 'arrival'}
                    onChange={() => handleRadioChange('arrival')}
                    className="hidden" 
                  />
                  <span className="font-semibold">Arrival</span>
                </label>

                <label className={`flex items-center gap-3 px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  formData.journeyType === 'departure' 
                    ? 'bg-white text-emerald-700 shadow-md ring-1 ring-emerald-200' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.journeyType === 'departure' ? 'border-emerald-500' : 'border-gray-400'
                  }`}>
                    {formData.journeyType === 'departure' && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                  </div>
                  <input 
                    type="radio" 
                    name="journeyType" 
                    value="departure" 
                    checked={formData.journeyType === 'departure'}
                    onChange={() => handleRadioChange('departure')}
                    className="hidden" 
                  />
                  <span className="font-semibold">Departure</span>
                </label>

              </div>
            </div>

            {/* 2. Slot Status Dropdown */}
            <div className="mb-8">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1 mb-2 block">Choose Slot Status</label>
              <div className="relative group">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 pl-11 bg-emerald-50/30 border border-emerald-200 rounded-xl text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium cursor-pointer"
                >
                  <option value="" disabled>Select Status Type</option>
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ToggleLeft className="absolute left-3.5 top-4 text-emerald-600/60 group-hover:text-emerald-600 transition-colors" size={20} />
              </div>
            </div>

            {/* 3. Date Range Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Start Date</label>
                <div className="relative group">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 pl-11 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                  />
                  <CalendarDays className="absolute left-3.5 top-4 text-gray-400 group-hover:text-emerald-600 transition-colors" size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">End Date</label>
                <div className="relative group">
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 pl-11 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                  />
                  <CalendarDays className="absolute left-3.5 top-4 text-gray-400 group-hover:text-emerald-600 transition-colors" size={20} />
                </div>
              </div>
            </div>

            {/* 4. Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <RefreshCw className="animate-spin" size={22} />
                ) : (
                  <RefreshCw size={22} className="group-hover:rotate-180 transition-transform duration-500" />
                )}
                {loading ? "Updating Status..." : "Change Slot Status"}
              </button>
            </div>

          </div>
        </div>

        {/* Recent History Table (Added to match the UI density of other pages) */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-600" />
              Recent Status Changes
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date Range</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">New Status</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Updated By</th>
                  <th className="px-8 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RECENT_CHANGES.map((row) => (
                  <tr key={row.id} className="hover:bg-green-50/30 transition-colors">
                    <td className="px-8 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        {row.type === 'Departure' ? <ArrowRight className="w-3 h-3" /> : <ArrowRight className="w-3 h-3 rotate-180" />}
                        {row.type}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-sm font-mono text-gray-600">{row.dateRange}</td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        {row.status === 'Active' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        {row.status === 'Inactive' && <XCircle className="w-4 h-4 text-red-500" />}
                        {row.status === 'Maintenance' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                        <span className={`text-sm font-semibold ${
                          row.status === 'Active' ? 'text-emerald-700' : 
                          row.status === 'Inactive' ? 'text-red-700' : 'text-amber-700'
                        }`}>
                          {row.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-sm text-gray-700 font-medium">{row.updatedBy}</td>
                    <td className="px-8 py-4 text-right text-xs text-gray-400 flex items-center justify-end gap-1">
                      <Clock size={12} />
                      {row.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}