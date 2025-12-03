"use client"

import { useState, Fragment, useRef, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  ClipboardList,
  Users,
  LogOut,
  UserCircle,
  Search,
  Loader2,
  ChevronDown,
  ChevronUp,
  Filter,
  Check,
  FileText
} from "lucide-react";
import { callApi } from "@/components/apis/commonApi";
import { AdminNav } from '@/components/admin-nav';

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
  journeyType: string;
}

const SLOT_OPTIONS = [
  "SLOT-1", "SLOT-2", "SLOT-3", "SLOT-4", "SLOT-5", "SLOT-6",
  "SLOT-7", "SLOT-8", "SLOT-9", "SLOT-10", "SLOT-11", "SLOT-12"
];

export default function BookingReport() {
  const [formData, setFormData] = useState({
    journeyType: '2', // Default 2 for Arrival
    slot: '', // Empty string = All Slots
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const [isSlotDropdownOpen, setIsSlotDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSlotDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSlotSelect = (slotValue: string) => {
    setFormData(prev => ({ ...prev, slot: slotValue }));
    setIsSlotDropdownOpen(false);
  };

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const handleGetDetails = async () => {
    if (!formData.startDate || !formData.endDate) {
      alert("Please select both Start Date and End Date");
      return;
    }

    setLoading(true);
    setExpandedRows(new Set());

    try {
      const payload = {
        FromDate: formData.startDate,
        ToDate: formData.endDate,
        Type: typeValue,
        AuthInfo: "{}",
        PageNumber: 1,
        SlotName: formData.slot
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
          email: item.EmailID,
          journeyType: typeValue === 2 ? "Arrival" : "Departure"
        }));

        if (formData.slot) {
          const filtered = mappedData.filter((item: any) =>
            (item.slotName || "").trim().toUpperCase() === formData.slot.trim().toUpperCase()
          );
          setBookings(filtered);
        } else {
          setBookings(mappedData);
        }
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

      <AdminNav />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium border border-teal-200">
              Smart Border Crossing Solution
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Booking Report</h1>
          <p className="text-lg text-gray-600">View and manage booking details with advanced filtering options</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Type</label>
              <div className="relative">
                <select
                  name="journeyType"
                  value={formData.journeyType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all font-medium cursor-pointer"
                >
                  <option value="2">Arrival</option>
                  <option value="1">Departure</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-2" ref={dropdownRef}>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Select Slot</label>
              <div className="relative">
                <button
                  onClick={() => setIsSlotDropdownOpen(!isSlotDropdownOpen)}
                  className={`w-full px-4 py-3 text-left border rounded-lg flex items-center justify-between transition-all duration-200 ${isSlotDropdownOpen
                    ? 'border-teal-500 ring-2 ring-teal-500/20 bg-white'
                    : 'border-gray-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                >
                  <span className="font-medium text-gray-900">
                    {formData.slot || "All Slots"}
                  </span>
                  <ChevronDown className={`text-gray-400 transition-transform duration-200 ${isSlotDropdownOpen ? 'rotate-180' : ''}`} size={16} />
                </button>

                {isSlotDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <div className="max-h-64 overflow-y-auto custom-scrollbar">
                      <div className="p-1.5 space-y-0.5">
                        <button
                          onClick={() => handleSlotSelect('')}
                          className={`w-full px-3 py-2 text-sm rounded-md text-left flex items-center justify-between transition-colors ${formData.slot === '' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          All Slots
                          {formData.slot === '' && <Check size={14} />}
                        </button>
                        <div className="h-px bg-gray-100 my-1 mx-2"></div>
                        {SLOT_OPTIONS.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => handleSlotSelect(slot)}
                            className={`w-full px-3 py-2 text-sm rounded-md text-left flex items-center justify-between transition-colors ${formData.slot === slot ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                              }`}
                          >
                            {slot}
                            {formData.slot === slot && <Check size={14} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={handleGetDetails}
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Filter size={20} />}
              {loading ? "Processing..." : "Get Details"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200">
                  <th className="w-12 px-4 py-4"></th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Attendance Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Journey Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Slot Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Passport Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                          <Search size={32} className="opacity-40" />
                        </div>
                        <p className="text-lg font-medium text-gray-600">No records found</p>
                        <p className="text-sm mt-1 text-gray-500">
                          {formData.slot ? `No bookings found for ${formData.slot}.` : "Select filters and click 'Get Details'."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking, index) => {
                    const isExpanded = expandedRows.has(index);
                    return (
                      <Fragment key={index}>
                        <tr className={`hover:bg-slate-50 transition-colors cursor-pointer border-l-4 ${isExpanded ? 'bg-slate-50/80 border-l-teal-500' : 'border-l-transparent'}`} onClick={() => toggleRow(index)}>
                          <td className="px-4 py-4 text-center">
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-teal-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-bold truncate" title={booking.name}>{booking.name}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${booking.attendanceStatus !== 'NOT ATTENDED'
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-red-50 text-red-600 border border-red-100'
                              }`}>
                              {booking.attendanceStatus !== 'NOT ATTENDED' && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>}
                              {booking.attendanceStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-medium">{booking.journeyDate}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium text-xs border border-slate-200">
                              {booking.slotName}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-mono">{booking.passport}</td>
                        </tr>
                        {isExpanded && (
                          <tr className="bg-slate-50/50 border-b border-gray-100 shadow-inner">
                            <td colSpan={7} className="px-6 py-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-1 duration-200 pl-4">
                                <div className="space-y-1">
                                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Reference Number</p>
                                  <p className="text-sm font-mono text-teal-700 bg-white inline-block px-2 py-1 rounded border border-gray-200 shadow-sm">{booking.reference}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Slot Time</p>
                                  <p className="text-sm text-gray-700 font-medium">{booking.slotTime}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Attendance Date</p>
                                  <p className="text-sm text-gray-700 font-medium">{booking.attendanceDate}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Nationality</p>
                                  <p className="text-sm text-gray-700 font-medium">{booking.nationality}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Phone Number</p>
                                  <p className="text-sm text-gray-700 font-medium">{booking.phone}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Email ID</p>
                                  <p className="text-sm text-gray-700 font-medium">{booking.email}</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}