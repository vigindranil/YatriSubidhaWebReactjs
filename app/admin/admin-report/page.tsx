"use client"

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  ClipboardList, 
  Users, 
  LogOut, 
  UserCircle, 
  Search, 
  Loader2 
} from "lucide-react";
import { callApi } from "@/components/apis/commonApi";

interface BookingData {
  name: string;
  passport: string;
  reference: string;
  journeyDate: string;
  slotName: string;
  slotTime: string;
  attendanceStatus: string;
  attendanceDate: string;
  nationality: string;
  phone: string;
  email: string;
}

export default function BookingReport() {
  const [formData, setFormData] = useState({
    journeyType: '2', // Defaulting to 2 (Departure)
    slot: '',
    startDate: new Date().toISOString().split('T')[0], // Default to today
    endDate: new Date().toISOString().split('T')[0]
  });

  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGetDetails = async () => {
    if (!formData.startDate || !formData.endDate) {
      alert("Please select both Start Date and End Date");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        FromDate: formData.startDate,
        ToDate: formData.endDate,
        Type: parseInt(formData.journeyType) || 2,
        AuthInfo: "{}",
        PageNumber: 1
      };

      console.log("Sending Payload:", payload);

      const response = await callApi("admin/admin-booking-report-details", payload);

      if (response.success && response.data) {
        const mappedData = response.data.map((item: any) => ({
          name: item.PasengerName,
          passport: item.PassportNo,
          reference: item.TokenNo,
          journeyDate: new Date(item.JourneyDate).toLocaleDateString(),
          slotName: item.SlotName,
          slotTime: item.SlotTime,
          attendanceStatus: item.AttendanceStatus,
          attendanceDate: item.AttendenceDate ? new Date(item.AttendenceDate).toLocaleDateString() : 'N/A',
          nationality: item.Nationality,
          phone: item.MobileNo,
          email: item.EmailID
        }));

        setBookings(mappedData);
      } else {
        alert(response.message || "Failed to fetch booking reports");
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ----------------------------------------------------------------------- */}
      {/* Enhanced Navigation (Imported from OperatorDashboard) */}
      {/* ----------------------------------------------------------------------- */}
      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 backdrop-blur-lg shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"></div>
                <span className="relative text-white font-bold text-lg tracking-tight">AS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white leading-none">Counter Operator</span>
                <span className="text-xs text-emerald-400 font-medium">Service Desk Portal</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600">
                <UserCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-medium text-sm">Operator #12</span>
              </div>

              {/* Offline Booking */}
              <Link href="/admin/operator/offline-booking">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 font-semibold">
                  <CreditCard className="w-4 h-4" />
                  Offline Booking
                </Button>
              </Link>

              {/* Online Booking */}
              <Link href="/admin/operator/online-booking">
                <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all duration-300 font-semibold">
                  <ClipboardList className="w-4 h-4" />
                  Online Booking
                </Button>
              </Link>

              <Button className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50 gap-2 transition-all duration-300 bg-transparent border">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Queue</span>
              </Button>
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-red-500/10 gap-2 transition-all duration-300 group">
                <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* ----------------------------------------------------------------------- */}
      {/* Main Content (Booking Report Logic) */}
      {/* ----------------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Page Title Section */}
        <div className="mb-8">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium border border-teal-200">
              Smart Border Crossing Solution
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Booking Report</h1>
          <p className="text-lg text-gray-600">View and manage booking details with advanced filtering options</p>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Journey Type / Type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Type
              </label>
              <select
                name="journeyType"
                value={formData.journeyType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              >
                <option value="1">Arrival </option>
                <option value="2">Departure </option>
              </select>
            </div>

            {/* Select Slot */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Select Slot
              </label>
              <select
                name="slot"
                value={formData.slot}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              >
                <option value="">All Slots</option>
                <option value="SLOT-11">SLOT-11</option>
                <option value="SLOT-12">SLOT-12</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Get Details Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGetDetails}
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-teal-500 text-teal-600 font-medium rounded-lg transition-all shadow-sm hover:shadow-md hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              {loading ? "Fetching..." : "Get Details"}
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100/50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Passport Number</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Reference Number</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Journey Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Slot Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Slot Time</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Attendance Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Attendance Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Nationality</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Phone Number</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">Email ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <Search size={48} className="mb-4 opacity-30" />
                        <p className="text-lg font-medium text-gray-600">No bookings found</p>
                        <p className="text-sm mt-1 text-gray-500">Select filters and click "Get Details" to view bookings</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap font-medium">{booking.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{booking.passport}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap font-mono">{booking.reference}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{booking.journeyDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{booking.slotName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{booking.slotTime}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          booking.attendanceStatus !== 'NOT ATTENDED' 
                            ? 'bg-teal-100 text-teal-700' 
                            : 'bg-red-50 text-red-700'
                        }`}>
                          {booking.attendanceStatus !== 'NOT ATTENDED' && (
                            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                          )}
                          {booking.attendanceStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{booking.attendanceDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{booking.nationality}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{booking.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{booking.email}</td>
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