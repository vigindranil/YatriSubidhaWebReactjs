"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X, CreditCard, Lock, CheckCircle } from "lucide-react"

interface PaymentGatewayProps {
  amount: number
  onPaymentSuccess: () => void
  onCancel: () => void
}

export function PaymentGateway({ amount, onPaymentSuccess, onCancel }: PaymentGatewayProps) {
  const [step, setStep] = useState<"details" | "processing" | "success">("details")
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    paymentMethod: "card",
  })

  const handleInputChange = (field: string, value: string) => {
    if (field === "cardNumber") {
      // Format card number with spaces
      const formatted = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim()
      if (formatted.replace(/\s/g, "").length <= 16) {
        setFormData({ ...formData, [field]: formatted })
      }
    } else if (field === "cvv") {
      // Limit CVV to 3-4 digits
      if (value.replace(/\D/g, "").length <= 4) {
        setFormData({ ...formData, [field]: value.replace(/\D/g, "") })
      }
    } else if (field === "cardHolder") {
      // Allow only letters and spaces
      setFormData({ ...formData, [field]: value.replace(/[^a-zA-Z\s]/g, "") })
    } else {
      setFormData({ ...formData, [field]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (
      !formData.cardNumber.replace(/\s/g, "") ||
      formData.cardNumber.replace(/\s/g, "").length !== 16 ||
      !formData.cardHolder ||
      !formData.expiryMonth ||
      !formData.expiryYear ||
      !formData.cvv ||
      formData.cvv.length < 3
    ) {
      alert("Please fill in all payment details correctly")
      return
    }

    setStep("processing")

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setStep("success")

    // Auto redirect after success
    setTimeout(() => {
      onPaymentSuccess()
    }, 1500)
  }

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0")
    return { value: month, label: month }
  })

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = (new Date().getFullYear() + i).toString()
    return { value: year, label: year }
  })

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6" />
            <div>
              <h2 className="text-2xl font-bold">Secure Payment</h2>
              <p className="text-blue-100 text-sm">Your payment is encrypted and secure</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {step === "details" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Amount</span>
                  <span className="text-2xl font-bold text-slate-900">₹{amount}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Payment Method
                </label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="netbanking">Net Banking</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.paymentMethod === "card" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        className="pl-10"
                        maxLength={19}
                        required
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Card Holder Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={formData.cardHolder}
                      onChange={(e) => handleInputChange("cardHolder", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Expiry Date
                      </label>
                      <div className="flex gap-2">
                        <Select
                          value={formData.expiryMonth}
                          onValueChange={(value) => setFormData({ ...formData, expiryMonth: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem key={month.value} value={month.value}>
                                {month.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={formData.expiryYear}
                          onValueChange={(value) => setFormData({ ...formData, expiryYear: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year.value} value={year.value}>
                                {year.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        CVV
                      </label>
                      <Input
                        type="text"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {formData.paymentMethod === "upi" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    UPI ID
                  </label>
                  <Input
                    type="text"
                    placeholder="yourname@upi"
                    required
                  />
                </div>
              )}

              {formData.paymentMethod === "netbanking" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Select Bank
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Pay ₹{amount}
                </Button>
              </div>
            </form>
          )}

          {step === "processing" && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-lg font-semibold text-slate-900">Processing Payment...</p>
              <p className="text-sm text-slate-600 mt-2">Please wait while we process your payment</p>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <p className="text-lg font-semibold text-slate-900">Payment Successful!</p>
              <p className="text-sm text-slate-600 mt-2">Your payment has been processed successfully</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
