"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RefreshCcw, UserPlus, CheckCircle, CreditCard, ArrowLeft } from "lucide-react"
import { PaymentGateway } from "@/components/payment-gateway"
import { callApi } from "@/components/apis/commonApi"
import Cookies from "react-cookies";

interface Passenger {
  id: string
  fullName: string
  mobileNumber: string
  countryCode: string
  email: string
  nationality: string
  passportNumber: string
  passportValidUpto: string
  address: string
  intendedTravelDate: string
}

function BookingContent() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const slotId = params.slotId as string
  const date = searchParams.get("date") || "2025-11-25"

  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: "1",
      fullName: "",
      mobileNumber: "",
      countryCode: "IN",
      email: "",
      nationality: "Indian",
      passportNumber: "",
      passportValidUpto: "",
      address: "",
      intendedTravelDate: date,
    },
  ])
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentDone, setPaymentDone] = useState(false)

  // Mock slot data
  const slotData: { [key: string]: { name: string; timing: string } } = {
    "8": { name: "SLOT-8", timing: "01:00 PM TO 01:59 PM" },
    "9": { name: "SLOT-9", timing: "02:00 PM TO 02:59 PM" },
    "10": { name: "SLOT-10", timing: "03:00 PM TO 03:59 PM" },
    "11": { name: "SLOT-11", timing: "04:00 PM TO 04:59 PM" },
    "12": { name: "SLOT-12", timing: "05:00 PM TO 05:59 PM" },
  }

  useEffect(() => {
    if (slotId && slotData[slotId]) {
      setSelectedSlot(slotData[slotId])
    }
  }, [slotId])

  const handleAddExistingDetails = () => {
    // This would fetch existing passenger details from the backend
    // For now, we'll just populate with dummy data
    setPassengers([
      {
        id: "1",
        fullName: "John Doe",
        mobileNumber: "9876543210",
        countryCode: "IN",
        email: "john.doe@example.com",
        nationality: "Indian",
        passportNumber: "A12345678",
        address: "123 Main Street, City, State",
        intendedTravelDate: date,
        passportValidUpto: "2025-12-31"
      },
    ])
  }

  const handleAddNewPerson = () => {
    setPassengers([
      ...passengers,
      {
        id: Date.now().toString(),
        fullName: "",
        mobileNumber: "",
        countryCode: "IN",
        email: "",
        nationality: "Indian",
        passportNumber: "",
        address: "",
        intendedTravelDate: date,
        passportValidUpto: date
      },
    ])
  }

  const handleRemovePerson = (id: string) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((p) => p.id !== id))
    }
  }

  const savePassengerDetails = async () => {
    const userId = Cookies.load("userID");

    // Convert to proper API format
    const formattedPassengers = passengers?.map((p) => ({
      FullName: p.fullName,
      Address: p.address,
      Nationality: p.nationality,
      DOB: "1990-01-01",
      Gender: "Male",
      MobileNo: p.mobileNumber,
      EmailID: p.email,
      PassportNo: p.passportNumber,
      PassportValidUpto: p.passportValidUpto,
      VisaNo: "A1234567",
      VisaValidUpto: "2025-12-31",
    }));

    console.log(formattedPassengers)

    const response = await callApi("user/save-passenger-details", {
      PrefferedSlotID: slotId,
      JourneyDate: date,
      PassengerInformation: formattedPassengers,
      Type: 2,
      UserID: userId,
      AuthInfo: "{}"
    });
    return response;
  }

  const handlePassengerChange = (id: string, field: keyof Passenger, value: string) => {
    setPassengers(
      passengers.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    )
  }

  const handlePaymentDone = () => {
    setPaymentDone(true)
    setShowPayment(false)
  }

  const handleBookSlot = async () => {

    if (!paymentDone) {
      setShowPayment(true)
      return
    }

    // Validate all passenger fields
    const isValid = passengers.every(
      (p) =>
        p.fullName &&
        p.mobileNumber &&
        p.email &&
        p.nationality &&
        p.passportNumber &&
        p.address
    )

    if (!isValid) {
      alert("Please fill in all required fields for all passengers")
      return
    }

    // Here you would make an API call to book the slot
    console.log("Booking slot:", { slotId, date, passengers })

    // Generate a booking ID and redirect to pass page
    const result = await savePassengerDetails();
    console.log(result)

    if (result.success) {
      const bookingId = result?.data[0]?.TokenNo;
      router.push(`/pass/${bookingId}`)
    } else {
      alert(result.message)
    }
  }

  const countryCodes = [
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  ]

  const nationalities = ["Indian", "Bangladeshi", "American", "British", "Other"]

  // Slot will be available after useEffect runs
  if (!selectedSlot) {
    return null
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <DashboardNav />

      {showPayment && (
        <PaymentGateway
          amount={passengers.length * 100}
          onPaymentSuccess={handlePaymentDone}
          onCancel={() => setShowPayment(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Section - Passenger Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              {/* Slot Information */}
              <div className="mb-6">
                <span className="text-2xl font-bold text-violet-600">
                  {selectedSlot.name}
                </span>
                <span className="text-slate-700 ml-2">
                  ( {date}, {selectedSlot.timing} )
                </span>
              </div>

              <Button
                variant="outline"
                onClick={handleAddExistingDetails}
                className="mb-6 gap-2"
                size="sm"
              >
                <RefreshCcw className="w-4 h-4" />
                Add Existing Details
              </Button>

              {/* Passenger Forms */}
              <div className="space-y-8">
                {passengers.map((passenger, index) => (
                  <div key={passenger.id} className="border-b border-slate-200 pb-6 last:border-b-0">
                    {passengers.length > 1 && (
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-slate-900">
                          Passenger {index + 1}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemovePerson(passenger.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="Full Name"
                          value={passenger.fullName}
                          onChange={(e) =>
                            handlePassengerChange(passenger.id, "fullName", e.target.value)
                          }
                          required
                        />
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <Select
                            value={passenger.countryCode}
                            onValueChange={(value) =>
                              handlePassengerChange(passenger.id, "countryCode", value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue>
                                {countryCodes.find((c) => c.code === passenger.countryCode)?.flag}{" "}
                                {passenger.countryCode}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {countryCodes.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  {country.flag} {country.name} ({country.code})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            type="tel"
                            placeholder="Mobile Number"
                            value={passenger.mobileNumber}
                            onChange={(e) =>
                              handlePassengerChange(
                                passenger.id,
                                "mobileNumber",
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                            className="flex-1"
                            required
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          (Note: Enter mobile number first then country code)
                        </p>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          value={passenger.email}
                          onChange={(e) =>
                            handlePassengerChange(passenger.id, "email", e.target.value)
                          }
                          required
                        />
                      </div>

                      {/* Nationality */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Nationality <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={passenger.nationality}
                          onValueChange={(value) =>
                            handlePassengerChange(passenger.id, "nationality", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {nationalities.map((nat) => (
                              <SelectItem key={nat} value={nat}>
                                {nat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Passport Number */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Passport Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="Passport Number"
                          value={passenger.passportNumber}
                          onChange={(e) =>
                            handlePassengerChange(
                              passenger.id,
                              "passportNumber",
                              e.target.value.toUpperCase()
                            )
                          }
                          required
                        />
                      </div>

                      {/* Passport Valid Upto */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Passport Valid Upto <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="date"
                          value={passenger.passportValidUpto}
                          onChange={(e) =>
                            handlePassengerChange(
                              passenger.id,
                              "passportValidUpto",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>

                      {/* Intended Travel Date */}
                      {/* <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Intended Travel Date <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="date"
                          value={passenger.intendedTravelDate}
                          onChange={(e) =>
                            handlePassengerChange(
                              passenger.id,
                              "intendedTravelDate",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div> */}
                    </div>


                    {/* Address */}
                    < div className="mt-4" >
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Address"
                        value={passenger.address}
                        onChange={(e) =>
                          handlePassengerChange(passenger.id, "address", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Person Button */}
              < Button
                variant="outline"
                onClick={handleAddNewPerson}
                className="mt-6 gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add New Person
              </Button>
            </div>
          </div>

          {/* Right Section - Summary & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-20">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Passenger Information
              </h2>

              <div className="space-y-4 mb-6">
                <div className="text-sm">
                  <span className="text-slate-600">Total Passengers:</span>
                  <span className="font-semibold text-slate-900 ml-2">
                    {passengers.length}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-slate-600">Slot:</span>
                  <span className="font-semibold text-slate-900 ml-2">
                    {selectedSlot.name}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-slate-600">Date:</span>
                  <span className="font-semibold text-slate-900 ml-2">{date}</span>
                </div>
                <div className="text-sm">
                  <span className="text-slate-600">Time:</span>
                  <span className="font-semibold text-slate-900 ml-2">
                    {selectedSlot.timing}
                  </span>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-lg">
                    <span className="text-slate-600">Total Amount:</span>
                    <span className="font-bold text-slate-900 ml-2">
                      ₹{passengers.length * 100}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleBookSlot}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white gap-2 py-3"
                  size="lg"
                  disabled={!paymentDone}
                >
                  <CheckCircle className="w-5 h-5" />
                  {paymentDone ? "Book Slot" : "Complete Payment First"}
                </Button>

                {!paymentDone && (
                  <Button
                    onClick={() => setShowPayment(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 py-3"
                    size="lg"
                  >
                    <CreditCard className="w-5 h-5" />
                    Payment Done
                  </Button>
                )}

                {paymentDone && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-emerald-700 flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Payment Completed
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div >
    </main >
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-50">
        <DashboardNav />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </main>
    }>
      <BookingContent />
    </Suspense>
  )
}
