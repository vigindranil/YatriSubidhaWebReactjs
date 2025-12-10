import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, UserCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react";
import Cookies from "react-cookies";
import { useRouter } from "next/navigation";
import LanguageSelectorSafe from "@/components/LanguageSelector";
export function AdminNav() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    setFullName(Cookies.load("userFullName"));
    setUserType(Cookies.load("userTypeID"));
  }, [])

  const handleLogout = () => {
    Cookies.remove("userFullName", { path: '/' });
    Cookies.remove("userTypeID", { path: '/' });
    router.push("/");
  };

  // Unified Button Style (Glass/Glow Effect)
  const buttonStyles = "bg-transparent border-white/20 text-white hover:bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all duration-300";

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 backdrop-blur-lg shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* Logo Section */}
          <Link href="/admin/dashboard">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"></div>
                <span className="relative text-white font-bold text-lg tracking-tight">AS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white leading-none">
                  {userType == "1" ? "Super Admin" : userType == "2" ? "Counter Operator" : ""}
                </span>
                <span className="text-xs text-emerald-400 font-medium">Service Desk Portal</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* User Profile Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600">
              <UserCircle className="w-5 h-5 text-emerald-400" />
              <Link href="/admin/dashboard" className="text-white font-medium text-sm">{fullName}</Link>
            </div>

            {/* --- DASHBOARD --- */}
            <Link href="/admin/dashboard">
              <Button variant="outline" className={buttonStyles}>
                Dashboard
              </Button>
            </Link>

            {/* --- DROPDOWN: BOOKING --- */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={buttonStyles}>
                  Bookings
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white">
                <Link href="/admin/operator/offline-booking">
                  <DropdownMenuItem className="cursor-pointer focus:bg-slate-700 focus:text-white">
                    Offline Booking
                  </DropdownMenuItem>
                </Link>
                <Link href="/admin/operator/online-booking">
                  <DropdownMenuItem className="cursor-pointer focus:bg-slate-700 focus:text-white">
                    Online Booking
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* --- DROPDOWN: MANAGE SLOTS (Super Admin Only) --- */}
            {userType == "1" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className={buttonStyles}>
                    Manage Slots
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white">
                  <Link href="/admin/modify-slot-capacity">
                    <DropdownMenuItem className="cursor-pointer focus:bg-slate-700 focus:text-white">
                      Slot Capacity
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/admin/modify-slot-status">
                    <DropdownMenuItem className="cursor-pointer focus:bg-slate-700 focus:text-white">
                      Slot Status
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* --- OTHER LINKS --- */}
            {userType == "1" && (
              <>
                <Link href="/admin/admin-credentials">
                  <Button variant="outline" className={buttonStyles}>
                    User Management
                  </Button>
                </Link>

                <Link href="/admin/admin-report">
                  <Button variant="outline" className={buttonStyles}>
                    Booking Report
                  </Button>
                </Link>
              </>
            )}

            {/* Fallback Booking Report Link */}
            {userType !== "1" && (
              <Link href="/admin/admin-report">
                <Button variant="outline" className={buttonStyles}>
                  Booking Report
                </Button>
              </Link>
            )}
            <LanguageSelectorSafe >
                          <Button variant="ghost" className={buttonStyles}>
                             Language
                          </Button>
                        </LanguageSelectorSafe>

            {/* Logout (Icon Only - Style kept distinct as it is an action icon) */}
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