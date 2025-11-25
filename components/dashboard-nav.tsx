"use client"

import { Suspense } from "react"
import { LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"

function DashboardNavContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home", active: pathname === "/" && !currentTab },
    { href: "/about", label: "About", active: pathname === "/about" },
    { 
      href: "/dashboard", 
      label: "New Booking", 
      active: currentTab !== "history" && pathname === "/dashboard" 
    },
    { 
      href: "/dashboard?tab=history", 
      label: "Booking History", 
      active: currentTab === "history" 
    },
  ]

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 backdrop-blur-lg sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-105">
              <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"></div>
              <span className="relative text-white font-bold text-lg tracking-tight">AS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white leading-none">Yatri Subidha</span>
              <span className="text-xs text-cyan-400 font-medium">Transport Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  link.active
                    ? "text-white bg-cyan-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                {link.active && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500"></span>
                )}
                {link.label}
              </Link>
            ))}
            
            <div className="ml-2 pl-2 border-l border-slate-700">
              <Button 
                variant="ghost" 
                className="text-slate-300 hover:text-white hover:bg-red-500/10 gap-2 transition-all duration-300 group"
              >
                <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Log Out</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/50 animate-slideDown">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                    link.active
                      ? "text-white bg-cyan-500/20 border-l-4 border-cyan-500"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <Button 
                variant="ghost" 
                className="text-slate-300 hover:text-white hover:bg-red-500/10 gap-2 justify-start mt-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </nav>
  )
}

export function DashboardNav() {
  return (
    <Suspense fallback={
      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 backdrop-blur-lg sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"></div>
                <span className="relative text-white font-bold text-lg tracking-tight">AS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white leading-none">Yatri Subidha</span>
                <span className="text-xs text-cyan-400 font-medium">Transport Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    }>
      <DashboardNavContent />
    </Suspense>
  )
}