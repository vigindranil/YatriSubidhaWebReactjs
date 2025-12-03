"use client"

import { useState } from 'react';
import { 
  Settings, 
  Save, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { AdminNav } from "@/components/admin-nav"

// Mock Data for the slots dropdown
const SLOT_TIME_OPTIONS = [
  "00:00 AM TO 00:59 AM",
  "01:00 AM TO 01:59 AM",
  "02:00 AM TO 02:59 AM",
  "03:00 AM TO 03:59 AM",
  "04:00 AM TO 04:59 AM",
  "05:00 AM TO 05:59 AM",
  "06:00 AM TO 06:59 AM",
  "07:00 AM TO 07:59 AM",
  "08:00 AM TO 08:59 AM",
  "09:00 AM TO 09:59 AM",
  "10:00 AM TO 10:59 AM",
  "11:00 AM TO 11:59 AM",
  "12:00 PM TO 12:59 PM",
  "13:00 PM TO 13:59 PM",
  "14:00 PM TO 14:59 PM",
  "15:00 PM TO 15:59 PM",
  "16:00 PM TO 16:59 PM",
  "17:00 PM TO 17:59 PM",
  "18:00 PM TO 18:59 PM",
  "19:00 PM TO 19:59 PM",
  "20:00 PM TO 20:59 PM",
  "21:00 PM TO 21:59 PM",
  "22:00 PM TO 22:59 PM",
  "23:00 PM TO 23:59 PM",
];

// Mock Data for the table below (to show current status)
const CURRENT_SLOT_STATUS = [
  { id: 1, time: "06:00 AM TO 06:59 AM", type: "Departure", capacity: 50, status: "Active" },
  { id: 2, time: "07:00 AM TO 07:59 AM", type: "Departure", capacity: 50, status: "Active" },
  { id: 3, time: "08:00 AM TO 08:59 AM", type: "Departure", capacity: 75, status: "High Demand" },
  { id: 4, time: "09:00 AM TO 09:59 AM", type: "Departure", capacity: 100, status: "Full" },
];

export default function ModifySlotCapacity() {
  const [formData, setFormData] = useState({
    journeyType: 'departure',
    slotTime: '',
    capacity: ''
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
    if(!formData.slotTime || !formData.capacity) {
      alert("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Capacity for ${formData.slotTime} updated to ${formData.capacity}`);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-green-50/30">
           <AdminNav />
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              System Configuration
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Modify Slot Capacity</h1>
          <p className="text-lg text-gray-600">Adjust the maximum passenger limit for specific time slots.</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-emerald-100/50 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none"></div>

          <div className="relative z-10">
            
            {/* Journey Type Selection */}
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

            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
              
              {/* Slot Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Choose Slot</label>
                <div className="relative group">
                  <select
                    name="slotTime"
                    value={formData.slotTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 pl-11 bg-emerald-50/30 border border-emerald-200 rounded-xl text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium cursor-pointer"
                  >
                    <option value="" disabled>Select a time range</option>
                    {SLOT_TIME_OPTIONS.map((slot, idx) => (
                      <option key={idx} value={slot}>{slot}</option>
                    ))}
                  </select>
                  <Clock className="absolute left-3.5 top-4 text-emerald-600/60 group-hover:text-emerald-600 transition-colors" size={20} />
                </div>
              </div>

              {/* Capacity Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Slot Capacity</label>
                <div className="relative group">
                  <input
                    type="number"
                    name="capacity"
                    placeholder="Enter Slot Capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 pl-11 bg-emerald-50/30 border border-emerald-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium placeholder:text-gray-400"
                  />
                  <Users className="absolute left-3.5 top-4 text-emerald-600/60 group-hover:text-emerald-600 transition-colors" size={20} />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Save size={22} />
                )}
                {loading ? "Updating..." : "Modify Slot Capacity"}
              </button>
            </div>

          </div>
        </div>

        {/* Current Status Table (Visual context) */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              Recently Modified Slots
            </h3>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Live Updates
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time Slot</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Current Capacity</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {CURRENT_SLOT_STATUS.map((row) => (
                  <tr key={row.id} className="hover:bg-green-50/30 transition-colors">
                    <td className="px-8 py-4 text-sm font-medium text-gray-900">{row.time}</td>
                    <td className="px-8 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        {row.type === 'Departure' ? <ArrowRight className="w-3 h-3" /> : <ArrowRight className="w-3 h-3 rotate-180" />}
                        {row.type}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-sm font-bold text-emerald-700">{row.capacity}</td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        {row.status === 'Active' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        {row.status !== 'Active' && <AlertCircle className="w-4 h-4 text-amber-500" />}
                        <span className={`text-sm ${row.status === 'Active' ? 'text-gray-600' : 'text-amber-600 font-medium'}`}>
                          {row.status}
                        </span>
                      </div>
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