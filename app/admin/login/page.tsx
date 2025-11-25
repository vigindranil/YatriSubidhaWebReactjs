"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import { Button } from "@/components/ui/button"
import { AdvancedCaptcha } from "@/components/advanced-captcha"
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    adminType: "",
    username: "",
    password: "",
    captcha: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha())

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const handleRefreshCaptcha = () => {
    setCaptchaCode(generateCaptcha())
    setFormData((prev) => ({
      ...prev,
      captcha: "",
    }))
    setError("")
  }

  const adminTypes = [
    { value: "1", label: "Super Admin" },
    { value: "2", label: "Counter Operator" },
    { value: "3", label: "BOI Login" },
    { value: "4", label: "Customs Login" },
    { value: "5", label: "BSF Login" },
    { value: "6", label: "LPAI Login" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!formData.adminType || !formData.username || !formData.password) {
      setError("Please fill in all fields.")
      setLoading(false)
      return
    }

    if (formData.captcha.toUpperCase().trim() !== captchaCode) {
      setError("Invalid CAPTCHA. Please try again.")
      setFormData((prev) => ({
        ...prev,
        captcha: "",
      }))
      setCaptchaCode(generateCaptcha())
      setLoading(false)
      return
    }

    const creds: Record<string, { user: string; pass: string; route: string }> = {
      "1": { user: "superadmin", pass: "admin123", route: "/admin/dashboard" },
      "2": { user: "operator", pass: "operator123", route: "/admin/operator" },
      "3": { user: "boi", pass: "boi123", route: "/admin/dashboard" },
      "4": { user: "customs", pass: "customs123", route: "/admin/dashboard" },
      "5": { user: "bsf", pass: "bsf123", route: "/admin/dashboard" },
      "6": { user: "lpai", pass: "lpai123", route: "/admin/dashboard" },
    }

    const cfg = creds[formData.adminType]
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (!cfg || formData.username !== cfg.user || formData.password !== cfg.pass) {
      setError("Invalid credentials")
      setLoading(false)
      return
    }

    router.push(cfg.route)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-emerald-200">Yatri Subidha Authority Login</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:px-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Your Position</label>
                <select
                  name="adminType"
                  value={formData.adminType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                >
                  <option value="">Select Your Position</option>
                  {adminTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-900"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <AdvancedCaptcha captchaCode={captchaCode} onRefresh={handleRefreshCaptcha} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Enter CAPTCHA</label>
                <input
                  type="text"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent uppercase tracking-widest"
                  placeholder="Enter letters & numbers shown above"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 font-medium flex items-center justify-center gap-2"
              >
                {loading ? "Logging in..." : "Login"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <div className="px-6 py-4 bg-amber-50 border-t border-amber-200">
            <p className="text-xs text-amber-800">
              <strong>Security Notice:</strong> This portal is restricted to authorized personnel only. Unauthorized
              access attempts will be logged and monitored.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-emerald-200 hover:text-white transition">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
