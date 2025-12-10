"use client"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import LanguageSelectorSafe from "@/components/LanguageSelector";

interface NavigationProps {
  onLoginClick: () => void
}

export function Navigation({ onLoginClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "User Manual", href: "/user-manual" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AS</span>
          </div>
          <span className="font-bold text-xl text-slate-900">Yatri Subidha</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 hover:text-emerald-600 transition font-medium text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onLoginClick}
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
          >
            Login
          </Button>
          <Link href="/admin/login">
            <Button className="bg-slate-700 hover:bg-slate-800 text-white">Admin Login</Button>
          </Link>
          <Button onClick={onLoginClick} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Book Slot
          </Button>

        </div>
        <LanguageSelectorSafe />
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-600 hover:text-emerald-600 transition font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onLoginClick()
                  setMobileMenuOpen(false)
                }}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 w-full"
              >
                Login
              </Button>
              <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-slate-700 hover:bg-slate-800 text-white w-full">Admin Login</Button>
              </Link>
              <Button
                onClick={() => {
                  onLoginClick()
                  setMobileMenuOpen(false)
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
              >
                Book Slot
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
