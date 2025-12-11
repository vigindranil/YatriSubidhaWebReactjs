"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PaymentGateway } from "@/components/payment-gateway"
import { ArrowLeft, CheckCircle, CreditCard, Printer } from "lucide-react"
import { callApi } from "@/components/apis/commonApi"
import { AdminNav } from "@/components/admin-nav"

export default function OfflineBookingPage() {
  const router = useRouter()

  // --- Dropdown States ---
  const [journeyType, setJourneyType] = useState<string>("1") // Default "1" (Departure)
  const [slotList, setSlotList] = useState<any[]>([])
  const [selectedSlotId, setSelectedSlotId] = useState<string>("")
  // ---------------------------

  const [passportNumber, setPassportNumber] = useState("")
  const [fullName, setFullName] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [email, setEmail] = useState("")

  const [paymentMethod, setPaymentMethod] = useState<"online" | "offline">("offline")
  const [currency, setCurrency] = useState("INR")
  const [amount, setAmount] = useState<string>("100")
  const [paymentDone, setPaymentDone] = useState(false)
  const [showGateway, setShowGateway] = useState(false)

  const [receipt, setReceipt] = useState<null | {
    reference: string
    date: string
    time: string
    method: string
    currency?: string
    amount: string
  }>(null)

  const currencies = [
    { value: "INR", label: "INR – Indian Rupee" },
    { value: "BDT", label: "BDT – Bangladeshi Taka" },
    { value: "USD", label: "USD – US Dollar" },
    { value: "EUR", label: "EUR – Euro" },
  ]

  // --- IMPLEMENTED: Fetch Slots Logic from Reference Code ---
  useEffect(() => {
    const fetchSlots = async () => {
      const today = new Date().toISOString().split('T')[0];
      try {
        const payload = {
            JourneyDate: today,
            AuthInfo: "{}",
            Type: parseInt(journeyType) // Convert string "1"/"2" to number
        };

        const response = await callApi("user/slot/get-available-slot-by-date", payload);

        if (response && response.success && Array.isArray(response.data)) {
          setSlotList(response.data);
        } else {
          setSlotList([]);
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
        setSlotList([]);
      }
    }

    fetchSlots();
    setSelectedSlotId(""); // Reset selection on type change
  }, [journeyType]);
  // -------------------------------------

  const issueReceipt = (method: string, currencyCode?: string) => {
    const now = new Date()
    const reference = `PAY-${now.getTime()}`
    setReceipt({
      reference,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      method,
      currency: currencyCode,
      amount,
    })
  }

  const handlePay = () => {
    if (!passportNumber.trim()) {
      alert("Passport number is mandatory")
      return
    }

    if (paymentMethod === "online") {
      setShowGateway(true)
    } else {
      if (!amount || Number(amount) <= 0) {
        alert("Enter a valid amount")
        return
      }
      setPaymentDone(true)
      issueReceipt("Offline (Cash)", currency)
    }
  }

  const handlePaymentSuccess = () => {
    setPaymentDone(true)
    setShowGateway(false)
    issueReceipt("Online")
  }

  const savePassengerDetails = async () => {
    const userIdCookie = localStorage.getItem("userID");
    const userId = userIdCookie ? parseInt(userIdCookie) : 6669;
    const today = new Date().toISOString().split('T')[0];

    const formattedPassengers = [{
      FullName: fullName || "Walk-in Passenger",
      Address: "Counter Booking",
      Nationality: "Indian",
      DOB: "1990-01-01",
      Gender: "Male",
      MobileNo: mobileNumber || "0000000000",
      EmailID: email || "counter@example.com",
      PassportNo: passportNumber,
      PassportValidUpto: "2030-01-01",
      VisaNo: "A1234567",
      VisaValidUpto: "2025-12-31",
    }];

    // --- UPDATED: Payload structure ---
    const response = await callApi("user/save-passenger-details", {
      PrefferedSlotID: parseInt(selectedSlotId), 
      JourneyDate: today,
      PassengerInformation: formattedPassengers,
      Type: parseInt(journeyType),
      UserID: userId,
      AuthInfo: "{}"
    });
    return response;
  }

  const handleIssuePass = async () => {
    // --- Validation ---
    if (!selectedSlotId) {
      alert("Please select a slot first");
      return;
    }
    // -----------------------

    if (!paymentDone) {
      alert("Complete payment first")
      return
    }

    try {
      const result = await savePassengerDetails();

      if (result && result.success) {
        const tokenList = result?.data?.map((item: any) => item.TokenNo) || []
        const tokenString = tokenList.join(",")
        
        router.push(`/pass/${btoa(tokenString)}?type=${journeyType == "1" ? "Departure" : "Arrival"}`)
      } else {
        alert(result?.message || "Database Error: Please check if Passport Number already exists.");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred while connecting to the server.");
    }
  }

  const printReceipt = () => {
    window.print()
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <AdminNav />
      {showGateway && (
        <PaymentGateway amount={Number(amount)} onPaymentSuccess={handlePaymentSuccess} onCancel={() => setShowGateway(false)} />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Offline Booking</h1>
                <p className="text-emerald-100 text-sm">Walk-in passenger processing and payment</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-slate-600 mb-6">Passport number is mandatory. Other fields are optional.</p>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                
                {/* --- IMPLEMENTED: Journey Type & Slot Selection --- */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Journey Type *</label>
                    <Select value={journeyType} onValueChange={setJourneyType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Departure</SelectItem>
                        <SelectItem value="2">Arrival</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Slot *</label>
                    <Select value={selectedSlotId} onValueChange={setSelectedSlotId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {slotList.length > 0 ? (
                          slotList.map((slot: any) => (
                            <SelectItem key={slot.SlotID} value={String(slot.SlotID)}>
                              {/* Using SlotNameEng and TimeRangeEng from reference API */}
                              {slot.SlotNameEng} ({slot.TimeRangeEng})
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>No slots available</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* ------------------------------------------ */}

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Passport Number *</label>
                  <Input value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} placeholder="N12345678" required />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Mobile Number</label>
                  <Input value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="+91-XXXXXXXXXX" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Payment Method</label>
                  <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline (Cash)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentMethod === "offline" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Currency</label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((c) => (
                            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Amount</label>
                      <Input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                  </div>
                )}

                {paymentDone ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <p className="text-sm font-semibold text-emerald-700 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Payment Completed
                    </p>
                  </div>
                ) : (
                  <Button onClick={handlePay} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                    <CreditCard className="w-4 h-4" />
                    {paymentMethod === "online" ? "Pay Online" : "Record Cash Payment"}
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <h3 className="font-bold text-slate-900 mb-3">Passenger Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-600">Type</span><span className="font-semibold text-slate-900">{journeyType === "1" ? "Departure" : "Arrival"}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Passport</span><span className="font-mono font-semibold text-slate-900">{passportNumber || "—"}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Name</span><span className="font-semibold text-slate-900">{fullName || "—"}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Mobile</span><span className="font-semibold text-slate-900">{mobileNumber || "—"}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Email</span><span className="font-semibold text-slate-900">{email || "—"}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Payment</span><span className="font-semibold text-slate-900">{paymentDone ? "Completed" : "Pending"}</span></div>
                  </div>
                </div>
                {receipt && (
                  <div className="print-area">
                    <h2 className="text-lg font-bold text-slate-900 mb-3">Payment Receipt</h2>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600">Reference</p>
                          <p className="font-mono font-semibold text-slate-900">{receipt.reference}</p>
                        </div>
                        <div>
                          <p className="text-slate-600">Date & Time</p>
                          <p className="font-semibold text-slate-900">{receipt.date} {receipt.time}</p>
                        </div>
                        <div>
                          <p className="text-slate-600">Method</p>
                          <p className="font-semibold text-slate-900">{receipt.method}</p>
                        </div>
                        <div>
                          <p className="text-slate-600">Amount</p>
                          <p className="font-semibold text-slate-900">{receipt.currency ? `${receipt.currency} ${receipt.amount}` : `₹${receipt.amount}`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4 print-hide">
                      <Button onClick={printReceipt} variant="outline" className="gap-2">
                        <Printer className="w-4 h-4" />
                        Print Receipt
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <Button onClick={handleIssuePass} className="w-full bg-violet-600 hover:bg-violet-700 text-white gap-2" size="lg" disabled={!paymentDone}>
                <CheckCircle className="w-5 h-5" />
                Issue Pass
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}