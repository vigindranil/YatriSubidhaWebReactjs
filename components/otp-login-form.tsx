"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, ArrowRight, RotateCcw } from "lucide-react"
import { generateOTP, verifyOTP } from "./apis/auth"

interface OTPLoginFormProps {
  onSuccess?: () => void
}

export function OTPLoginForm({ onSuccess }: OTPLoginFormProps) {
  const [step, setStep] = useState<"contact" | "otp">("contact")
  const [contactType, setContactType] = useState<"phone" | "email">("phone")
  const [contact, setContact] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const response = await generateOTP(contactType, contact)

    console.log(`OTP sent to response`, response)
    setStep("otp")
    setLoading(false)
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const response = await verifyOTP(contact, otp)

    console.log(`OTP verified: ${response}`)
    setLoading(false)
    onSuccess?.()
  }

  const handleReset = () => {
    setStep("contact")
    setContact("")
    setOtp("")
  }

  return (
    <div className="space-y-4">
      {step === "contact" ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">Login Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setContactType("phone")}
                className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${contactType === "phone"
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-slate-300 bg-white hover:border-slate-400"
                  }`}
              >
                <Phone className="w-5 h-5" />
                <span className="text-sm font-medium">Phone & WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => setContactType("email")}
                className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${contactType === "email"
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-slate-300 bg-white hover:border-slate-400"
                  }`}
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">Email</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              {contactType === "phone" ? "Mobile Number" : "Email Address"}
            </label>
            <input
              type={contactType === "phone" ? "tel" : "email"}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={contactType === "phone" ? "+91 XXXXX XXXXX" : "your.email@example.com"}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-semibold mt-6 flex items-center justify-center gap-2"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <p className="text-sm text-slate-700">
              <strong>OTP sent to:</strong> {contactType === "phone" ? contact : contact}
            </p>
            <p className="text-xs text-slate-600 mt-2">
              Check your {contactType === "phone" ? "SMS/WhatsApp" : "email"} for the 6-digit code
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="0000"
              maxLength="4"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-2xl tracking-widest font-mono"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading || otp.length !== 4}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-semibold mt-6 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full text-slate-600 hover:text-slate-900 py-2 font-medium flex items-center justify-center gap-2 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Try Different Number
          </button>
        </form>
      )}
    </div>
  )
}
