"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { useState } from "react"
import { BookOpen, Download, Video, HelpCircle, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UserManualPage() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <Navigation onLoginClick={() => setShowLogin(true)} />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-emerald-600" />
              <h1 className="text-4xl font-bold text-slate-900">User Manual</h1>
            </div>
            <p className="text-lg text-slate-600">
              Complete guide to using Yatri Subidha portal for smooth border crossing
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">Table of Contents</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li>
                <a href="#registration" className="text-blue-600 hover:text-blue-800">
                  1. Registration & Account Setup
                </a>
              </li>
              <li>
                <a href="#booking" className="text-blue-600 hover:text-blue-800">
                  2. How to Book Slots
                </a>
              </li>
              <li>
                <a href="#pass" className="text-blue-600 hover:text-blue-800">
                  3. Digital Pass & QR Code
                </a>
              </li>
              <li>
                <a href="#at-border" className="text-blue-600 hover:text-blue-800">
                  4. At the Border
                </a>
              </li>
              <li>
                <a href="#faq" className="text-blue-600 hover:text-blue-800">
                  5. Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#support" className="text-blue-600 hover:text-blue-800">
                  6. Support & Help
                </a>
              </li>
            </ul>
          </div>

          {/* Step 1 */}
          <section id="registration" className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                1
              </span>
              Registration & Account Setup
            </h2>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Create Your Account
                </h3>
                <p className="text-slate-600 mb-3">
                  Click on "Sign Up" and fill in your details including name, email, mobile number, and password.
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                  <li>Full Name (as per your passport)</li>
                  <li>Valid Email Address</li>
                  <li>Mobile Number (for notifications)</li>
                  <li>Strong Password</li>
                </ul>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Verify Your Details
                </h3>
                <p className="text-slate-600">
                  You'll receive a verification email. Click the verification link to activate your account.
                </p>
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section id="booking" className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                2
              </span>
              How to Book Slots
            </h2>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Step 1: Select Passenger Type</h3>
                <p className="text-slate-600 mb-3">Choose whether you are an Arrival or Departure passenger.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Step 2: Choose Your Date</h3>
                <p className="text-slate-600 mb-3">
                  Select your preferred travel date from the calendar. Slots are available up to 30 days in advance.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Step 3: Select Time Slot</h3>
                <p className="text-slate-600 mb-3">Choose from available time slots. Slots are color-coded:</p>
                <div className="space-y-2 ml-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-slate-600">
                      <strong>Green:</strong> Plenty of slots available
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-slate-600">
                      <strong>Yellow:</strong> Few slots remaining
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-slate-600">
                      <strong>Red:</strong> Slot full or closed
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Step 4: Confirm Booking</h3>
                <p className="text-slate-600">
                  Review your details and confirm your booking. You'll receive an instant confirmation.
                </p>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section id="pass" className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                3
              </span>
              Digital Pass & QR Code
            </h2>
            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
              <p className="text-slate-600">
                Your Yatri Subidha Pass will be automatically generated after successful booking.
              </p>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Download Your Pass:</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                  <li>Go to "My Bookings" in your dashboard</li>
                  <li>Click on the booking to view your pass</li>
                  <li>Download as PDF or take a screenshot</li>
                  <li>The pass contains a unique QR code</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Share Your Pass:</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                  <li>A copy will be sent to your registered email</li>
                  <li>Download link will be sent via SMS & WhatsApp</li>
                  <li>Share the link with family members traveling with you</li>
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Arrive at least 30 minutes before your slot time. Late arrivals may lose
                  their slot priority.
                </p>
              </div>
            </div>
          </section>

          {/* Step 4 */}
          <section id="at-border" className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                4
              </span>
              At the Border
            </h2>
            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
              <ol className="list-decimal list-inside space-y-3 text-slate-600">
                <li>Arrive at the Passenger Terminal, ICP Petrapole before your slot time</li>
                <li>Go to the counter corresponding to your pass color code</li>
                <li>Present your printed or digital pass with the QR code</li>
                <li>The authority will scan your QR code using the scanner</li>
                <li>Your information will be instantly verified</li>
                <li>Proceed for border clearance</li>
              </ol>
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <p className="text-sm text-green-800">
                  The QR scanner system reduces manual processing time and helps you get through faster.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-emerald-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Can I change my slot after booking?",
                  a: "Yes, you can modify your booking up to 24 hours before your slot time through the 'My Bookings' section.",
                },
                {
                  q: "What if I miss my slot?",
                  a: "You can book another slot from the available options. However, you may need to wait for the next available slot.",
                },
                {
                  q: "Can multiple family members use one pass?",
                  a: "No, each passenger needs their own individual pass and booking. Distribute the shared link to family members.",
                },
                {
                  q: "Is there a fee for using this portal?",
                  a: "The basic booking service is free. Any applicable border crossing fees are standard government charges.",
                },
                {
                  q: "What if I have technical issues?",
                  a: "Contact our support team via the 'Contact Us' page or call our helpline for immediate assistance.",
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Support */}
          <section id="support" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-slate-900 mb-2">Email Support</h3>
                <p className="text-emerald-600 font-medium">support@yatrisubidha.gov.in</p>
                <p className="text-sm text-slate-600 mt-2">Response within 24 hours</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-slate-900 mb-2">Phone Support</h3>
                <p className="text-blue-600 font-medium">+91-XXXX-XXXX-XXXX</p>
                <p className="text-sm text-slate-600 mt-2">Mon-Fri, 9 AM - 6 PM IST</p>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-slate-900 mb-2">WhatsApp Support</h3>
                <p className="text-teal-600 font-medium">+91-XXXX-XXXX-XXXX</p>
                <p className="text-sm text-slate-600 mt-2">Quick responses</p>
              </div>
            </div>
          </section>

          {/* Download Resources */}
          <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Download Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 flex items-center justify-center gap-2 py-6 bg-transparent"
              >
                <Download className="w-5 h-5" />
                User Manual PDF
              </Button>
              <Button
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 flex items-center justify-center gap-2 py-6 bg-transparent"
              >
                <Video className="w-5 h-5" />
                Video Tutorial
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}
