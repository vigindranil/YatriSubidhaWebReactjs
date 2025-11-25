"use client"
import { OTPLoginForm } from "@/components/otp-login-form"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

interface LoginModalProps {
  onClose: () => void
}

export function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter()

  const handleLoginSuccess = () => {
    onClose()
    router.push("/dashboard")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition z-10">
          <X className="w-5 h-5" />
        </button>

        <div className="bg-emerald-50 border-b border-emerald-200 p-6">
          <h2 className="text-2xl font-bold text-slate-900">Passenger Login</h2>
          <p className="text-slate-600 text-sm mt-1">Sign in with OTP verification</p>
        </div>

        <div className="p-8">
          <OTPLoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>
    </div>
  )
}
