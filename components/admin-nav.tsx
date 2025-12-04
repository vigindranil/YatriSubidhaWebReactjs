import { Button } from "@/components/ui/button"
import { Settings, Users, Bell, LogOut, UserCircle, CreditCard, ClipboardList } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react";
import Cookies from "react-cookies";
import { useRouter } from "next/navigation";

export function AdminNav() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    setFullName(Cookies.load("userFullName"));
    setUserType(Cookies.load("userType"));
  }, [])

  const handleLogout = () => {
   
    Cookies.remove("userFullName", { path: '/' });
    Cookies.remove("userType", { path: '/' });
    router.push("/");
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 backdrop-blur-lg shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          
      
          <Link href="/admin/dashboard">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"></div>
                <span className="relative text-white font-bold text-lg tracking-tight">AS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white leading-none">{userType == "1" ? "Super Admin" : userType == "2" ? "Counter Operator" : userType == "3" ? "" : ""}</span>
                <span className="text-xs text-emerald-400 font-medium">Service Desk Portal</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600">
              <UserCircle className="w-5 h-5 text-emerald-400" />
              <Link href= "/admin/dashboard "className="text-white font-medium text-sm">{fullName} </Link>
            </div>
            <Link href="/admin/operator/offline-booking">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 font-semibold">
                <CreditCard className="w-4 h-4" />
                Offline Booking
              </Button>
            </Link>
            <Link href="/admin/operator/online-booking">
              <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all duration-300 font-semibold">
                <ClipboardList className="w-4 h-4" />
                Online Booking
              </Button>
            </Link>

            <Link href="/admin/admin-credentials">
              <Button variant="outline" className="border-white/30 text-white bg-transparent gap-2">
                <Users className="w-4 h-4" />
                Credentials
              </Button>
            </Link>
            <Link href="/admin/modify-slot-capacity">
              <Button variant="outline" className="border-white/30 text-white bg-transparent gap-2">
                <Users className="w-4 h-4" />
                Slot Capacity
              </Button>
            </Link>
            <Link href="/admin/modify-slot-status">
              <Button variant="outline" className="border-white/30 text-white bg-transparent gap-2">
                <Users className="w-4 h-4" />
                Slot Status
              </Button>
            </Link>
            <Link href="/admin/admin-report">
              <Button variant="outline" className="border-white/30 text-white bg-transparent gap-2">
                <Users className="w-4 h-4" />
                Booking Report
              </Button>
            </Link>
            
          
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-slate-300 hover:text-white hover:bg-red-500/10 gap-2 transition-all duration-300 group"
            >
              <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}